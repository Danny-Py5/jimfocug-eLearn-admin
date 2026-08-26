import { Search } from "lucide-react";
import { useState } from "react";

export default function FilterBar({
  type,
  onClear,
  onChange,
}: {
  type: "courses" | "people";
  onClear: () => void;
  onChange: (query: string, category: string, status: string) => void;
}) {
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [status, setStatus] = useState("All");
  const update = (next: { q?: string; category?: string; status?: string }) => {
    const values = { q, ...next };
    if (values.q !== undefined) setQ(values.q);
    if (values.category !== undefined) setCategory(values.category);
    if (values.status !== undefined) setStatus(values.status);
    onChange(values.q, values.category as string, values.status as string);
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
          onChange={(e) => update({ category: e.target.value })}
          className="h-9 rounded-lg border bg-background px-3 text-[10px] text-muted-foreground"
        >
          {[
            "All Categories",
            "Development",
            "Data Science",
            "Design",
            "Business",
          ].map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      )}
      <select
        aria-label="Status"
        value={status}
        onChange={(e) => update({ status: e.target.value })}
        className="h-9 rounded-lg border bg-background px-3 text-[10px] text-muted-foreground"
      >
        {["All", "Published", "Pending", "Draft", "Archived"].map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
      {type === "courses" && <Select label="Year" options={["2026", "2025"]} />}
      <button
        onClick={() => {
          setQ("");
          setCategory("All Categories");
          setStatus("All");
          onClear();
        }}
        className="px-2 text-[10px] font-semibold text-destructive"
      >
        Clear All
      </button>
    </div>
  );
}

function Select({ label, options }: { label: string; options: string[] }) {
  return (
    <select
      aria-label={label}
      className="h-9 rounded-lg border bg-background px-3 text-[10px] text-muted-foreground"
    >
      {options.map((o) => (
        <option key={o}>{o}</option>
      ))}
    </select>
  );
}
