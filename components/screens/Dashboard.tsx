import {
  BookOpen,
  Users,
  UserRound,
  WalletCards,
  LucideIcon,
  Copy,
} from "lucide-react";
import Link from "next/link";
import { useUser } from "../../lib/providers/UserProvider";
import { capitalizeEachWord, getGreeting } from "../../lib/utils";
import { toast } from "sonner";
import { useCourses } from "@/lib/providers/CourseProvider";

const metrics = {
  totalCourses: 24,
  totalStudents: 1842,
  activeTutors: 8,
  monthlyRevenue: 128450,
};
const metricItems = [
  {
    Icon: BookOpen,
    label: "Total Courses",
    value: metrics.totalCourses,
    growth: "+12%",
  },
  {
    Icon: Users,
    label: "Total Students",
    value: metrics.totalStudents.toLocaleString(),
    growth: "+8.4%",
  },
  {
    Icon: UserRound,
    label: "Active Tutors",
    value: metrics.activeTutors,
    growth: "+14.2%",
  },
  {
    Icon: WalletCards,
    label: "Monthly Revenue",
    value: `₦${metrics.monthlyRevenue.toLocaleString()}`,
    growth: "+15.1%",
  },
];

const courses = [
  {
    id: 1,
    title: "Mastering React JS",
    code: "REACT101",
    category: "Web Dev",
    rating: 4.8,
    students: 342,
  },
  {
    id: 2,
    title: "Complete Python Bootcamp",
    code: "PYTHON101",
    category: "Programming",
    rating: 4.7,
    students: 289,
  },
  {
    id: 3,
    title: "UI/UX Design Fundamentals",
    code: "UX101",
    category: "Design",
    rating: 4.9,
    students: 198,
  },
  {
    id: 4,
    title: "Data Science & ML",
    code: "DS101",
    category: "Data Science",
    rating: 4.6,
    students: 156,
  },
  {
    id: 5,
    title: "Flutter Mobile Dev",
    code: "FLUTTER101",
    category: "Mobile Dev",
    rating: 4.8,
    students: 134,
  },
  {
    id: 6,
    title: "DevOps Masterclass",
    code: "DEVOPS101",
    category: "DevOps",
    rating: 4.5,
    students: 98,
  },
  {
    id: 7,
    title: "Cybersecurity Essentials",
    code: "CYBER101",
    category: "Security",
    rating: 4.4,
    students: 76,
  },
  {
    id: 8,
    title: "Cloud Computing AWS",
    code: "AWS101",
    category: "Cloud",
    rating: 4.7,
    students: 89,
  },
];

const submissions = [
  {
    id: 1,
    title: "Advanced React Patterns",
    tutor: "David Johnson",
    date: "2026-08-20",
    status: "Pending",
  },
  {
    id: 2,
    title: "Python for Data Analysis",
    tutor: "Sarah Williams",
    date: "2026-08-19",
    status: "Approved",
  },
  {
    id: 3,
    title: "UI/UX Case Studies",
    tutor: "Michael Chen",
    date: "2026-08-18",
    status: "Rejected",
  },
  {
    id: 4,
    title: "Machine Learning 101",
    tutor: "Emily Rodriguez",
    date: "2026-08-17",
    status: "Pending",
  },
  {
    id: 5,
    title: "Flutter State Management",
    tutor: "James Otun",
    date: "2026-08-16",
    status: "Approved",
  },
  {
    id: 6,
    title: "DevOps CI/CD Pipeline",
    tutor: "Robert Kim",
    date: "2026-08-15",
    status: "Pending",
  },
];

const setActiveScreen = (screen: string) => {
  console.log("Navigate to:", screen);
};

// Compute categories without useMemo
const counts = courses.reduce<Record<string, number>>((a, c) => {
  a[c.category] = (a[c.category] || 0) + 1;
  return a;
}, {});
const total = courses.length || 1;
const categories = Object.entries(counts)
  .map(([name, count]) => ({
    name,
    count,
    percent: Math.round((count / total) * 100),
  }))
  .sort((a, b) => b.count - a.count);

const topCourses = [...courses].sort((a, b) => b.rating - a.rating).slice(0, 5);

const trend = [42, 55, 49, 68, 61, 72, 66, 78, 71, 84, 79, 91];

function Status({ value }: { value: string }) {
  const good = ["active", "published", "approved", "certified"].includes(
    value.toLowerCase(),
  );
  const warn = ["pending", "in-progress", "deactivated"].includes(
    value.toLowerCase(),
  );
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-semibold capitalize ${good ? "bg-emerald-100 text-emerald-700" : warn ? "bg-amber-100 text-amber-700" : "bg-muted text-muted-foreground"}`}
    >
      <span className="size-1 rounded-full bg-current" />
      {value.replace("-", " ")}
    </span>
  );
}

export default function Dashboard() {
  const { user } = useUser();
  const { courses } = useCourses();

  if (!user) return <div>Error: User not found</div>;

  return (
    <div className="flex flex-col gap-5">
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
            <small>
              cOurse totallllllllll................... {courses.length}
            </small>
          </p>
          {/* <Link href={"/courses/courseId"}> GO course description page</Link> */}
        </div>
        <select className="h-9 w-fit rounded-lg border bg-card px-3 text-xs">
          <option>Year 2026</option>
          <option>Year 2025</option>
        </select>
      </div>

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
              Year 2026⌄
            </button>
          </div>
          <div className="mt-5 flex h-48 items-end gap-2 border-b border-l bg-muted/20 px-3 pb-0 pt-5">
            {trend.map((height, index) => (
              <div
                key={index}
                className="group relative flex h-full flex-1 items-end"
              >
                <div
                  className="w-full rounded-t-sm bg-primary/75 transition-all group-hover:bg-primary"
                  style={{ height: `${height}%` }}
                />
                <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[8px] text-muted-foreground">
                  {
                    [
                      "Jan",
                      "Feb",
                      "Mar",
                      "Apr",
                      "May",
                      "Jun",
                      "Jul",
                      "Aug",
                      "Sep",
                      "Oct",
                      "Nov",
                      "Dec",
                    ][index]
                  }
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl border bg-card p-4 shadow-sm">
          <h2 className="text-sm font-bold">Category Distribution</h2>
          <div className="mt-5 flex items-center gap-5">
            <div
              className="relative flex size-32 shrink-0 items-center justify-center rounded-full"
              style={{
                background: `conic-gradient(var(--primary) 0 ${categories[0]?.percent || 42}%, oklch(0.72 0.12 280) ${categories[0]?.percent || 42}% 70%, oklch(0.78 0.14 75) 70% 88%, oklch(0.68 0.14 155) 88% 100%)`,
              }}
            >
              <div className="flex size-20 flex-col items-center justify-center rounded-full bg-card">
                <strong className="text-lg">100%</strong>
                <span className="text-[9px] text-muted-foreground">
                  Allocated
                </span>
              </div>
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-3">
              {categories.slice(0, 4).map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between gap-2 text-[10px]"
                >
                  <span className="flex items-center gap-2 truncate">
                    <i className="size-2 rounded-full bg-primary" />
                    {item.name}
                  </span>
                  <strong>{item.percent}%</strong>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.35fr_1fr]">
        <section className="rounded-xl border bg-card p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold">Recent Course Submissions</h2>
            <button
              onClick={() => setActiveScreen("courses")}
              className="text-[10px] font-semibold text-primary"
            >
              View All Approvals
            </button>
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
              <tbody>
                {submissions.slice(0, 5).map((row) => (
                  <tr key={row.id} className="border-b last:border-0">
                    <td className="py-3 font-semibold">{row.title}</td>
                    <td className="py-3 text-muted-foreground">{row.tutor}</td>
                    <td className="py-3 text-muted-foreground">{row.date}</td>
                    <td className="py-3">
                      <Status value={row.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-xl border bg-card p-4 shadow-sm">
          <h2 className="text-sm font-bold">Top Performing Courses</h2>
          <div className="mt-4 flex flex-col gap-2">
            {topCourses.map((course) => (
              <div
                key={course.id}
                className="flex items-center gap-3 rounded-lg bg-muted/40 p-2"
              >
                <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-[9px] font-bold text-primary">
                  {course.code.slice(0, 2)}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[10px] font-semibold">
                    {course.title}
                  </p>
                  <p className="text-[9px] text-muted-foreground">
                    {course.students.toLocaleString()} students ·{" "}
                    {course.category}
                  </p>
                </div>
                <span className="rounded border bg-card px-2 py-1 text-[9px] font-bold">
                  ★ {course.rating}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
