import {
  CourseCategory,
  CourseStatus,
  FilterBarType,
  UserStatus,
} from "@/enums";
import { capitalizeEachWord } from "@/lib/utils";
import { Search } from "lucide-react";
import { useState } from "react";

type CategoryType = CourseCategory | null;
type StatusType = CourseStatus | UserStatus;

interface FilterBarProps {
  type: FilterBarType;
  onClear: () => void;
  onChange: (query: string, category: CategoryType, status: StatusType) => void;
}

export default function FilterBar({ type, onClear, onChange }: FilterBarProps) {
  const [q, setQ] = useState("");
  const [category, setCategory] = useState<CategoryType>(
    type === FilterBarType.COURSE ? CourseCategory.ALL : null,
  );
  const [status, setStatus] = useState<StatusType>(
    type === FilterBarType.COURSE ? CourseStatus.ALL : UserStatus.ALL,
  );

  const isCourse = type === FilterBarType.COURSE;
  const isUser = type === FilterBarType.USER;

  const update = (next: {
    q?: string;
    category?: CategoryType;
    status?: StatusType;
  }) => {
    const values = {
      q,
      category,
      status,
      ...next,
    };

    setQ(values.q);
    if (values.category !== undefined) setCategory(values.category);
    if (values.status !== undefined) setStatus(values.status);

    onChange(values.q, values.category, values.status);
  };

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-xl border bg-card p-2">
      {/* Search Input */}
      <div className="relative min-w-44 flex-1">
        <Search className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
        <input
          value={q}
          onChange={(e) => update({ q: e.target.value })}
          placeholder={
            isCourse
              ? "Search course ID or title..."
              : isUser
                ? "Search by name, username or email..."
                : "Search..."
          }
          className="h-9 w-full rounded-lg border bg-background pl-9 pr-3 text-[11px] outline-none"
        />
      </div>

      {/* Category Filter - Only for Courses */}
      {isCourse && (
        <select
          aria-label="Category"
          value={category as CourseCategory}
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

      {/* Status Filter - Works for both Courses and Users */}
      <select
        aria-label="Status"
        value={status as string}
        onChange={(e) => {
          if (isCourse) {
            update({ status: e.target.value as CourseStatus });
          } else {
            update({ status: e.target.value as UserStatus });
          }
        }}
        className="h-9 cursor-pointer rounded-lg border bg-background px-3 text-[10px] text-muted-foreground"
      >
        {isCourse
          ? Object.values(CourseStatus).map((o) => (
              <option key={o} value={o}>
                {capitalizeEachWord(o.replace("_", " "))}
              </option>
            ))
          : Object.values(UserStatus).map((o) => (
              <option key={o} value={o}>
                {capitalizeEachWord(o.replace("_", " "))}
              </option>
            ))}
      </select>

      {/* Clear All Button */}
      <button
        onClick={() => {
          setQ("");
          if (isCourse) {
            setCategory(CourseCategory.ALL);
            setStatus(CourseStatus.ALL);
          } else {
            setCategory(null);
            setStatus(UserStatus.ALL);
          }
          onClear();
        }}
        className="px-2 text-[10px] font-semibold text-destructive"
      >
        Clear All
      </button>
    </div>
  );
}
