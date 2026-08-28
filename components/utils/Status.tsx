export default function Status({ value }: { value?: string | null }) {
  const safeValue = value?.toLowerCase() ?? "unknown";

  const config = {
    pending_review: {
      className: "bg-amber-100 text-amber-700",
      label: "Pending Review",
    },
    published: {
      className: "bg-emerald-100 text-emerald-700",
      label: "Published",
    },
    approved: {
      className: "bg-emerald-100 text-emerald-700",
      label: "Approved",
    },
    rejected: {
      className: "bg-red-100 text-red-700",
      label: "Rejected",
    },
    verified: {
      className: "bg-emerald-100 text-emerald-700",
      label: "Verified",
    },
    pending: {
      className: "bg-amber-100 text-amber-700",
      label: "Pending",
    },
    in_progress: {
      className: "bg-blue-100 text-blue-700",
      label: "In Progress",
    },
    certified: {
      className: "bg-purple-100 text-purple-700",
      label: "Certified",
    },
    unknown: {
      className: "bg-muted text-muted-foreground",
      label: "Unknown",
    },
  }[safeValue] ?? {
    className: "bg-muted text-muted-foreground",
    label: safeValue.charAt(0).toUpperCase() + safeValue.slice(1),
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
