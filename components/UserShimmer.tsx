export default function UserShimmer() {
  return (
    <div className="mt-5 overflow-hidden rounded-xl border bg-card">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-[10px]">
          <thead>
            <tr className="border-b bg-muted/30 text-muted-foreground">
              <th className="px-4 py-3">User</th>
              <th className="px-2 py-3">Details</th>
              <th className="px-2 py-3">Info</th>
              <th className="px-2 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, i) => (
              <tr key={i} className="border-b last:border-0">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="size-8 rounded-full bg-muted animate-pulse" />
                    <div className="space-y-1.5">
                      <div className="h-3.5 w-32 rounded bg-muted animate-pulse" />
                      <div className="h-2.5 w-24 rounded bg-muted/60 animate-pulse" />
                    </div>
                  </div>
                </td>
                <td className="px-2 py-3">
                  <div className="h-3.5 w-28 rounded bg-muted animate-pulse" />
                </td>
                <td className="px-2 py-3">
                  <div className="h-3.5 w-20 rounded bg-muted animate-pulse" />
                </td>
                <td className="px-2 py-3">
                  <div className="h-6 w-16 rounded-full bg-muted animate-pulse" />
                </td>
                <td className="px-4 py-3">
                  <div className="size-3.5 rounded bg-muted animate-pulse" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between border-t px-4 py-3">
        <div className="h-3.5 w-32 rounded bg-muted animate-pulse" />
        <div className="flex gap-1">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-8 w-8 rounded bg-muted animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}
