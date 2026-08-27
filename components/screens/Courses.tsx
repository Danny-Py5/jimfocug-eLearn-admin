import { MoreVertical } from "lucide-react";
import Pager from "../utils/Pager";
import Status from "../utils/Status";
import Avatar from "../Avatar";
import Heading from "../Heading";
import FilterBar from "../utils/FilterBar";
import { useCourses } from "@/lib/providers/CourseProvider";
import { useMemo, useState } from "react";
import { useUser } from "@/lib/providers/UserProvider";
import Button from "../Button";
import { toast } from "sonner";
import { CourseCategory, CourseStatus } from "@/enums";
import { capitalizeEachWord } from "@/lib/utils";
import { Course } from "@/types";

export default function Courses() {
  const { courses } = useCourses();

  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const [filters, setFilters] = useState({
    query: "",
    category: CourseCategory.ALL,
    status: CourseStatus.ALL,
  });
  const user = useUser();
  const [page, setPage] = useState(1);
  // const [modal, setModal] = useState(false);
  const filtered = useMemo(
    () =>
      courses.filter(
        (c) =>
          `${c.title} ${c._id} ${c.instructor.fullName}`
            .toLowerCase()
            .includes(filters.query.toLowerCase()) &&
          (filters.category === CourseCategory.ALL ||
            c.category === filters.category) &&
          (filters.status === CourseStatus.ALL || c.status === filters.status),
      ),
    [courses, filters],
  );
  const rows = filtered.slice((page - 1) * 5, page * 5);
  return (
    <>
      <Heading
        title="All Courses"
        description="Manage and filter active courses on your platform."
        action="Add Course"
        onAction={() => {
          toast.info("Not implemented contact the Developer");
        }}
        exportData={courses}
      />
      <div className="mt-5">
        <FilterBar
          type="courses"
          onChange={(query, category: CourseCategory, status: CourseStatus) => {
            setFilters({ query, category, status });
            setPage(1);
          }}
          onClear={() => {
            setFilters({
              query: "",
              category: CourseCategory.ALL,
              status: CourseStatus.ALL,
            });
            setPage(1);
          }}
        />
      </div>
      <div className="mt-5 overflow-hidden rounded-xl border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[780px] text-left text-[0.85rem]">
            <thead>
              <tr className="border-b bg-muted/30 text-muted-foreground">
                <th className="px-4 py-3">Course Title & Details</th>
                <th className="px-2 py-3">Tutor</th>
                <th className="px-2 py-3">Category</th>
                <th className="px-2 py-3">Enrolled Total</th>
                <th className="px-2 py-3">Resources</th>
                <th className="px-2 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((c) => (
                <tr
                  key={c._id}
                  className="border-b last:border-0 hover:bg-muted/20"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Avatar name={capitalizeEachWord(c.title)} />
                      <div>
                        <p className="max-w-48 truncate font-semibold">
                          {capitalizeEachWord(c.title)}
                        </p>
                        <p className="text-[0.75rem] text-muted-foreground">
                          ID: {c._id}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-2 py-3">
                    {capitalizeEachWord(c.instructor.fullName)}
                  </td>
                  <td className="px-2 py-3">
                    <span className="rounded-full bg-muted px-2 py-1">
                      {capitalizeEachWord(c.category)}
                    </span>
                  </td>
                  <td className="px-2 py-3">
                    {c.enrolledCount}{" "}
                    {c.enrolledCount < 2 ? "Student" : "Students"}
                  </td>
                  <td className="px-2 py-3 font-semibold">
                    {computeCourseResources(c)}
                  </td>
                  <td className="px-2 py-3">
                    <Status value={c.status} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="absolute">
                      <button
                        type="button"
                        onClick={() =>
                          setOpenMenu(openMenu === c._id ? null : c._id)
                        }
                        className="rounded-md p-1 hover:bg-muted"
                      >
                        <MoreVertical className="size-3.5 text-muted-foreground" />
                      </button>

                      {openMenu === c._id && (
                        <>
                          {/* Click outside */}
                          <div
                            className="fixed inset-0 z-10"
                            onClick={() => setOpenMenu(null)}
                          />

                          {/* Menu */}
                          <div className="absolute right-0 z-20 mt-1 flex w-32 flex-col rounded-lg border bg-card p-1 shadow-lg">
                            <Button
                              onClick={() => {
                                console.log("Publish", c._id);
                                setOpenMenu(null);
                              }}
                              className="rounded px-2 py-1.5 text-left  hover:bg-muted"
                            >
                              Publish
                            </Button>

                            <Button
                              onClick={() => {
                                console.log("Mark pending", c._id);
                                setOpenMenu(null);
                              }}
                              className="rounded px-2 py-1.5 text-left  hover:bg-muted"
                            >
                              Mark pending
                            </Button>

                            <Button
                              onClick={() => {
                                console.log("Reject", c._id);
                                setOpenMenu(null);
                              }}
                              className="rounded px-2 py-1.5 text-red-500 text-left  hover:text-red-600"
                            >
                              Reject
                            </Button>
                          </div>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pager page={page} setPage={setPage} total={filtered.length} />
      </div>
      {/* {modal && <AddCourse onClose={() => setModal(false)} />} */}
    </>
  );
}

function computeCourseResources(c: Course) {
  const totalResources = c.videoCount + c.liveClassCount + c.assignmentCount;
  return totalResources < 2
    ? totalResources + " Resource"
    : totalResources + " Resources";
}

// function AddCourse({ onClose }: { onClose: () => void }) {
//   const { addCourse } = useAdmin();
//   const [form, setForm] = useState({
//     title: "",
//     code: "",
//     description: "",
//     category: "Development" as const,
//     instructor: "Daniel",
//     price: "0",
//     imageUrl: "",
//     imagePublicId: "",
//     freeAccessWeeks: "2",
//     modules: "Foundations",
//     whatYouWillLearn: "Build practical skills",
//   });
//   const update = (key: string, value: string) =>
//     setForm((v) => ({ ...v, [key]: value }));
//   return (
//     <Modal title="Add course" onClose={onClose}>
//       <div className="max-h-[70vh] overflow-y-auto pr-1">
//         <div className="grid gap-3 md:grid-cols-2">
//           {[
//             ["title", "Course title"],
//             ["code", "Course ID"],
//             ["description", "Description"],
//             ["imageUrl", "Image URL"],
//             ["imagePublicId", "Image public ID"],
//             ["instructor", "Instructor"],
//             ["price", "Price"],
//             ["freeAccessWeeks", "Free access weeks"],
//             ["modules", "Modules (one title per line)"],
//             [
//               "whatYouWillLearn",
//               "What students will learn (one item per line)",
//             ],
//           ].map(([key, label]) => (
//             <label
//               key={key}
//               className="flex flex-col gap-2 text-xs font-medium md:col-span={key==='description'||key==='modules'||key==='whatYouWillLearn'?'2':'1'}"
//             >
//               {label}
//               {key === "description" ||
//               key === "modules" ||
//               key === "whatYouWillLearn" ? (
//                 <textarea
//                   value={form[key as keyof typeof form]}
//                   onChange={(e) => update(key, e.target.value)}
//                   className="min-h-20 rounded-lg border bg-background px-3 py-2 text-sm outline-none"
//                 />
//               ) : (
//                 <input
//                   type={
//                     key === "price" || key === "freeAccessWeeks"
//                       ? "number"
//                       : "text"
//                   }
//                   value={form[key as keyof typeof form]}
//                   onChange={(e) => update(key, e.target.value)}
//                   className="h-10 rounded-lg border bg-background px-3 text-sm outline-none"
//                 />
//               )}
//             </label>
//           ))}
//           <label className="flex flex-col gap-2 text-xs font-medium">
//             Category
//             <select
//               value={form.category}
//               onChange={(e) => update("category", e.target.value)}
//               className="h-10 rounded-lg border bg-background px-3 text-sm"
//             >
//               <option>Development</option>
//               <option>Data Science</option>
//               <option>Design</option>
//               <option>Business</option>
//             </select>
//           </label>
//         </div>
//       </div>
//       <button
//         disabled={
//           !form.title.trim() || !form.code.trim() || !form.description.trim()
//         }
//         onClick={() => {
//           addCourse({
//             title: form.title,
//             code: form.code,
//             description: form.description,
//             category: form.category,
//             instructor: form.instructor,
//             price: Number(form.price),
//             imageUrl: form.imageUrl,
//             imagePublicId: form.imagePublicId,
//             freeAccessWeeks: Number(form.freeAccessWeeks),
//             modules: form.modules
//               .split("\n")
//               .filter(Boolean)
//               .map((title, i) => ({ weekNumber: i + 1, title })),
//             whatYouWillLearn: form.whatYouWillLearn
//               .split("\n")
//               .filter(Boolean)
//               .map((text) => ({ text })),
//             status: "pending_review",
//             rejectionReason: null,
//           });
//           onClose();
//         }}
//         className="mt-5 h-10 w-full rounded-lg bg-primary text-sm font-semibold text-primary-foreground disabled:opacity-50"
//       >
//         Create course for review
//       </button>
//     </Modal>
//   );
// }
