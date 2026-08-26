import { BookOpen, Users, UserRound, WalletCards, Copy } from "lucide-react";
import { useUser } from "../../lib/providers/UserProvider";
import {
  capitalizeEachWord,
  formatDateTime,
  getGreeting,
} from "../../lib/utils";
import { toast } from "sonner";
import { useCourses } from "@/lib/providers/CourseProvider";
import { DashboardStats } from "@/types";
import { useEffect, useState } from "react";
import { interceptorFetch } from "@/lib/interceptor-fetch";
import { DashboardShimmerCard } from "../DashboardShimmerCard";
import ErrorComponent from "../ErrorComponent";
import Button from "../Button";
import Status from "../utils/Status";

export default function Dashboard() {
  const { user } = useUser();
  const { courses } = useCourses();

  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardStats = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await interceptorFetch("/api/admins/dashboard-stats");

      if (!response.ok) {
        throw new Error("Failed to fetch dashboard statistics");
      }

      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error("Dashboard stats error:", error);
      setError("Failed to load dashboard statistics");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    function x() {
      fetchDashboardStats();
    }
    x();
  }, []);

  if (isLoading) {
    return <DashboardShimmerCard />;
  }

  if (error || !stats) {
    return (
      <ErrorComponent
        onRefresh={fetchDashboardStats}
        title="Error fetching dashboard"
        msg={error ?? "Failed to load dashboard stats. Please retry"}
      />
    );
  }

  if (!user) return <div>Error: User not found</div>;

  // Build metric items from real stats
  const metricItems = [
    {
      Icon: BookOpen,
      label: "Total Courses",
      value: stats.summary.totalCourses,
      growth: `+${stats.growth.courses}%`,
    },
    {
      Icon: Users,
      label: "Total Students",
      value: stats.summary.totalStudents.toLocaleString(),
      growth: `+${stats.growth.students}%`,
    },
    {
      Icon: UserRound,
      label: "Active Tutors",
      value: stats.summary.activeTutors,
      growth: `+${stats.growth.tutors}%`,
    },
    {
      Icon: WalletCards,
      label: "Monthly Revenue",
      value: `₦${stats.summary.monthlyRevenue.toLocaleString()}`,
      growth: `+${stats.growth.revenue}%`,
    },
  ];

  // Category distribution from real stats
  const categories = stats.categoryDistribution.map((item) => ({
    name: item.category.charAt(0).toUpperCase() + item.category.slice(1),
    percent: Math.round(item.percentage),
  }));

  // Enrollment trends data
  const trendData = stats.enrollmentTrends;
  const maxCount = Math.max(...trendData.map((d) => d.count), 1);
  const trendHeights = trendData.map((d) =>
    maxCount > 0 ? Math.round((d.count / maxCount) * 100) : 5,
  );
  const monthLabels = trendData.map((d) => d.monthName);

  // Top performing courses from real courses data
  const topCourses = [...(courses || [])]
    .filter((c) => c.rating && c.rating > 0)
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 5)
    .map((course) => ({
      id: course._id,
      title: course.title,
      code: course.title.slice(0, 2).toUpperCase(),
      category:
        course.category.charAt(0).toUpperCase() + course.category.slice(1),
      rating: course.rating || 0,
      students: course.enrolledCount || 0,
    }));

  // If no courses with ratings, use first 5
  const fallbackTopCourses =
    topCourses.length > 0
      ? topCourses
      : (courses || []).slice(0, 5).map((course) => ({
          id: course._id,
          title: course.title,
          code: course.title.slice(0, 2).toUpperCase(),
          category:
            course.category.charAt(0).toUpperCase() + course.category.slice(1),
          rating: course.rating || 0,
          students: course.enrolledCount || 0,
        }));

  return (
    <div className="flex flex-col gap-5 p-3 md:p-0">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            {getGreeting()}, {capitalizeEachWord(user.fullName)}
          </h1>
          <div className="flex items-center gap-2 mb-2">
            <small className="text-muted-foreground">ID: {user.id}</small>
            <button
              onClick={() => {
                navigator.clipboard.writeText(user.id);
                toast.success("ID copied!");
              }}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Copy className="size-3.5" />
            </button>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Here&apos;s what is happening on Jimfocug E-Learning today.
          </p>
        </div>
        <select className="h-9 w-fit rounded-lg border bg-card px-3 text-xs">
          <option>Year 2026</option>
          <option>Year 2025</option>
        </select>
      </div>

      {/* metricItems */}
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {metricItems.map(({ Icon, label, value, growth }) => (
          <div
            key={label}
            className="flex items-center gap-3 rounded-xl border bg-card p-4 shadow-sm"
          >
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Icon className="size-5" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] text-muted-foreground">{label}</p>
              <div className="flex items-center gap-2">
                <p className="text-lg font-bold">{value}</p>
                <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-[9px] font-bold text-emerald-700">
                  {growth}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.7fr_1fr]">
        <section className="rounded-xl border bg-card p-4 py-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold">
                Enrollment Trends{" "}
                <span className="font-normal text-muted-foreground">
                  (Last 12 Months)
                </span>
              </h2>
              <p className="mt-1 text-[10px] text-muted-foreground">
                Monthly student enrollment across all courses
              </p>
            </div>
            <button className="rounded-lg border px-3 py-2 text-[10px] text-muted-foreground">
              Year 2026
            </button>
          </div>
          <div className="mt-5 flex h-48 items-end gap-2 border-b border-l bg-muted/20 px-3 pb-0 pt-5">
            {trendHeights.map((height, index) => (
              <div
                key={index}
                className="group relative flex h-full flex-1 items-end"
              >
                <div
                  className="w-full rounded-t-sm bg-primary/75 transition-all group-hover:bg-primary"
                  style={{ height: `${height}%` }}
                />
                <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[8px] text-muted-foreground">
                  {monthLabels[index]}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* category distribution */}
        <section className="rounded-xl border bg-card p-4 shadow-sm">
          <h2 className="text-sm font-bold">Category Distribution</h2>
          <div className="mt-5 flex items-center gap-5">
            <div
              className="relative flex size-32 shrink-0 items-center justify-center rounded-full"
              style={{ background: getConicGradient(categories) }}
            >
              <div className="flex size-20 flex-col items-center justify-center rounded-full bg-card">
                <strong className="text-lg">100%</strong>
                <span className="text-[9px] text-muted-foreground">
                  Allocated
                </span>
              </div>
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-3">
              {categories.slice(0, 4).map((item, index) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between gap-2 text-[10px]"
                >
                  <span className="flex items-center gap-2 truncate">
                    <i
                      className={`size-2 rounded-full ${getDotColor(index)}`}
                    />
                    {item.name}
                  </span>
                  <strong>{item.percent}%</strong>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Recent Course Submissions */}
      <div className="grid gap-5 lg:grid-cols-[1.35fr_1fr]">
        <section className="rounded-xl border bg-card p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold">Recent Course Submissions</h2>
            <Button
              onClick={() => {
                toast.info("Not implemented. Contact the developer");
                console.log("Navigate to courses");
              }}
              className="text-[10px] font-semibold text-primary"
            >
              View All Approvals
            </Button>
          </div>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[500px] text-left text-[10px]">
              <thead className="text-muted-foreground">
                <tr className="border-b">
                  <th className="pb-2">Course Title</th>
                  <th className="pb-2">Tutor</th>
                  <th className="pb-2">Date</th>
                  <th className="pb-2">Status</th>
                </tr>
              </thead>
              {/* reverse the courses as they are returning in time of creation from backend 
              making latest course appear last */}
              <tbody>
                {courses
                  .slice(0, 5)
                  .toReversed()
                  .map((row) => (
                    <tr key={row._id} className="border-b last:border-0">
                      <td className="py-3 font-semibold">
                        {capitalizeEachWord(row.title)}
                      </td>
                      <td className="py-3 text-muted-foreground">
                        {capitalizeEachWord(row.instructor.fullName)}
                      </td>
                      <td className="py-3 text-muted-foreground">
                        {formatDateTime(row.createdAt)}
                      </td>
                      <td className="py-3">
                        <Status value={row.status} />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* top performing courses */}
        <section className="rounded-xl border bg-card p-4 shadow-sm">
          <h2 className="text-sm font-bold">Top Performing Courses</h2>
          <div className="mt-4 flex flex-col gap-2">
            {fallbackTopCourses.map((course) => (
              <div
                key={course.id}
                className="flex items-center gap-3 rounded-lg bg-muted/40 p-2"
              >
                <span
                  className={`flex size-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-[9px] font-bold text-primary`}
                >
                  {course.code}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[10px] font-semibold">
                    {capitalizeEachWord(course.title)}
                  </p>
                  <p className="text-[9px] text-muted-foreground">
                    {course.students.toLocaleString()}{" "}
                    {course.students < 2 ? "student" : "students"} ·{" "}
                    {course.category}
                  </p>
                </div>
                <span className="rounded border bg-card px-2 py-1 text-[9px] font-bold">
                  ★ {course.rating.toFixed(1)}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

const categoryColors = [
  "oklch(0.72 0.12 280)", // purple
  "oklch(0.78 0.14 75)", // yellow
  "oklch(0.68 0.14 155)", // green
  "oklch(0.72 0.12 340)", // pink
  "oklch(0.75 0.13 200)", // blue
  "oklch(0.77 0.12 20)", // orange
];

const dotColors = [
  "bg-[#8B5CF6]", // purple
  "bg-[#FBBF24]", // yellow
  "bg-[#34D399]", // green
  "bg-[#F472B6]", // pink
  "bg-[#60A5FA]", // blue
  "bg-[#FB923C]", // orange
];

function getConicGradient(categories: { name: string; percent: number }[]) {
  return `conic-gradient(${categories
    .map((item, index) => {
      const start = categories
        .slice(0, index)
        .reduce((sum, c) => sum + c.percent, 0);
      const end = start + item.percent;
      return `${categoryColors[index % categoryColors.length]} ${start}% ${end}%`;
    })
    .join(", ")})`;
}

function getDotColor(index: number) {
  return dotColors[index % dotColors.length];
}
