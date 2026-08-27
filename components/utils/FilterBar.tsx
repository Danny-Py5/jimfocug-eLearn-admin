import { CourseCategory, CourseStatus } from "@/enums";
import { capitalizeEachWord } from "@/lib/utils";
import { Search } from "lucide-react";
import { useState } from "react";

export default function FilterBar({
  type,
  onClear,
  onChange,
}: {
  type: "courses" | "people";
  onClear: () => void;
  onChange: (
    query: string,
    category: CourseCategory,
    status: CourseStatus,
  ) => void;
}) {
  const [q, setQ] = useState("");
  const [category, setCategory] = useState(CourseCategory.ALL);
  const [status, setStatus] = useState(CourseStatus.ALL);
  const update = (next: {
    q?: string;
    category?: CourseCategory;
    status?: CourseStatus;
  }) => {
    const values = {
      q,
      category,
      status,
      ...next,
    };

    setQ(values.q);
    setCategory(values.category);
    setStatus(values.status);

    onChange(values.q, values.category, values.status);
  };
  return (
    <div className="flex flex-wrap items-center gap-2 rounded-xl border bg-card p-2">
      <div className="relative min-w-44 flex-1">
        <Search className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
        <input
          value={q}
          onChange={(e) => update({ q: e.target.value })}
          placeholder={
            type === "courses"
              ? "Search course ID or title..."
              : "Search by name"
          }
          className="h-9 w-full rounded-lg border bg-background pl-9 pr-3 text-[11px] outline-none"
        />
      </div>
      {type === "courses" && (
        <select
          aria-label="Category"
          value={category}
          onChange={(e) =>
            update({ category: e.target.value as CourseCategory })
          }
          className="h-9 cursor-pointer rounded-lg border bg-background px-3 text-[10px] text-muted-foreground"
        >
          {Object.values(CourseCategory).map((o) => (
            <option key={o} value={o}>
              {o === CourseCategory.ALL
                ? "All Levels"
                : capitalizeEachWord(o.replace("_", " "))}
            </option>
          ))}
        </select>
      )}
      <select
        aria-label="Status"
        value={status}
        onChange={(e) => update({ status: e.target.value as CourseStatus })}
        className="h-9 cursor-pointer rounded-lg border bg-background px-3 text-[10px] text-muted-foreground"
      >
        {Object.values(CourseStatus).map((o) => (
          <option key={o} value={o}>
            {capitalizeEachWord(o.replace("_", " "))}
          </option>
        ))}
      </select>
      {/* {type === "courses" && (
        <select
          aria-label="Year"
          className="h-9 rounded-lg border bg-background px-3 text-[10px] text-muted-foreground"
        >
          {["2026", "2025"].map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      )} */}
      <button
        onClick={() => {
          setQ("");
          setCategory(CourseCategory.ALL);
          setStatus(CourseStatus.ALL);
          onClear();
        }}
        className="px-2 text-[10px] font-semibold text-destructive"
      >
        Clear All
      </button>
    </div>
  );
}
