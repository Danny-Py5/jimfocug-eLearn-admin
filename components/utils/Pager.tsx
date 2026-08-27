import Button from "../Button";

export default function Pager({
  page,
  setPage,
  total,
  pageSize = 5,
}: {
  page: number;
  setPage: (n: number) => void;
  total: number;
  pageSize?: number;
}) {
  const pages = Math.max(1, Math.ceil(total / pageSize));
  return (
    <div className="flex items-center justify-between border-t px-4 py-4 text-[10px] text-muted-foreground">
      <span>
        Showing{" "}
        {total
          ? `${Math.min((page - 1) * pageSize + 1, total)}–${Math.min(page * pageSize, total)} of ${total}`
          : "0"}{" "}
        records
      </span>
      <div className="flex items-center gap-1">
        <Button
          isDefault={true}
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="rounded-md border px-2 py-1.5 disabled:opacity-40"
        >
          Prev
        </Button>
        {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
          <Button
            key={n}
            onClick={() => setPage(n)}
            className={`rounded-md border px-2.5 py-1.5 ${page === n ? "bg-primary text-primary-foreground" : ""}`}
          >
            {n}
          </Button>
        ))}
        <Button
          disabled={page === pages}
          isDefault={true}
          onClick={() => setPage(page + 1)}
          className="rounded-md border px-2 py-1.5 disabled:opacity-40"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
