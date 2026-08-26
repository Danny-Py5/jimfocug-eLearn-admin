export default function Status({ value }: { value: string }) {
  const config = {
    pending_review: {
      className: "bg-amber-100 text-amber-700",
      label: "Pending Review",
    },
    published: {
      className: "bg-emerald-100 text-emerald-700",
      label: "Published",
    },
    rejected: {
      className: "bg-red-100 text-red-700",
      label: "Rejected",
    },
    unknown: {
      className: "bg-muted text-muted-foreground",
      label: "Unknown",
    },
  }[value.toLowerCase()] ?? {
    className: "bg-muted text-muted-foreground",
    label: "Unknown",
  };

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-semibold ${config.className}`}
    >
      <span className="size-1 rounded-full bg-current" />
      {config.label}
    </span>
  );
}
