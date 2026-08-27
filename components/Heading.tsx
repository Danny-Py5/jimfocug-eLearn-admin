import { Download, Plus } from "lucide-react";
import Button from "./Button";

export default function Heading({
  title,
  description,
  action,
  onAction,
  exportData,
}: {
  title: string;
  description: string;
  action: string;
  onAction: () => void;
  exportData: unknown[];
}) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        <p className="mt-1 text-xs text-muted-foreground">{description}</p>
      </div>
      <div className="flex gap-2">
        <Button
          onClick={() => download(exportData)}
          className="flex items-center gap-2 rounded-full border bg-card px-4 py-2 text-[11px] font-semibold"
        >
          <Download className="size-3.5" />
          Export All
        </Button>
        <Button
          isDefault={true}
          onClick={onAction}
          className="flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-[11px] font-semibold text-primary-foreground"
        >
          <Plus className="size-3.5" />
          {action}
        </Button>
      </div>
    </div>
  );
}
function download(data: unknown[]) {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "jimfocug-export.json";
  a.click();
  URL.revokeObjectURL(url);
}
