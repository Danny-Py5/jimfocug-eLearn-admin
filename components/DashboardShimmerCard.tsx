export function DashboardShimmerCard() {
  return (
    <div className="p-6 space-y-6">
      {/* Header Shimmer */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div className="space-y-2">
          <div className="h-7 w-64 rounded bg-muted animate-pulse" />
          <div className="h-4 w-48 rounded bg-muted/60 animate-pulse" />
          <div className="h-3 w-72 rounded bg-muted/50 animate-pulse" />
        </div>
        <div className="h-9 w-28 rounded-lg bg-muted animate-pulse" />
      </div>

      {/* Metrics Shimmer */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-3 rounded-xl border bg-card p-4"
          >
            <div className="size-10 shrink-0 rounded-lg bg-muted animate-pulse" />
            <div className="space-y-2 flex-1">
              <div className="h-3 w-16 rounded bg-muted/60 animate-pulse" />
              <div className="flex items-center gap-2">
                <div className="h-6 w-12 rounded bg-muted animate-pulse" />
                <div className="h-4 w-10 rounded bg-muted/50 animate-pulse" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row Shimmer */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.7fr_1fr] gap-5">
        <div className="rounded-xl border bg-card p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1.5">
              <div className="h-4 w-48 rounded bg-muted animate-pulse" />
              <div className="h-3 w-52 rounded bg-muted/50 animate-pulse" />
            </div>
            <div className="h-8 w-20 rounded bg-muted animate-pulse" />
          </div>
          <div className="flex h-48 items-end gap-2 border-b border-l bg-muted/20 px-3 pb-0 pt-5">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="flex-1 h-full flex items-end">
                <div
                  className="w-full rounded-t-sm bg-muted animate-pulse"
                  style={{ height: `${30}%` }}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border bg-card p-4 space-y-4">
          <div className="h-4 w-40 rounded bg-muted animate-pulse" />
          <div className="flex items-center gap-5">
            <div className="size-32 shrink-0 rounded-full bg-muted animate-pulse" />
            <div className="flex-1 space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="h-3 w-16 rounded bg-muted/60 animate-pulse" />
                  <div className="h-3 w-8 rounded bg-muted/50 animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row Shimmer */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.35fr_1fr] gap-5">
        <div className="rounded-xl border bg-card p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="h-4 w-48 rounded bg-muted animate-pulse" />
            <div className="h-4 w-28 rounded bg-muted/60 animate-pulse" />
          </div>
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="h-4 w-32 rounded bg-muted animate-pulse" />
                <div className="h-4 w-24 rounded bg-muted/60 animate-pulse" />
                <div className="h-4 w-20 rounded bg-muted/50 animate-pulse" />
                <div className="h-5 w-16 rounded-full bg-muted/40 animate-pulse" />
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border bg-card p-4 space-y-4">
          <div className="h-4 w-40 rounded bg-muted animate-pulse" />
          <div className="space-y-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-lg bg-muted/40 p-2"
              >
                <div className="size-8 rounded-md bg-muted animate-pulse" />
                <div className="flex-1 space-y-1.5">
                  <div className="h-3 w-32 rounded bg-muted animate-pulse" />
                  <div className="h-2.5 w-24 rounded bg-muted/50 animate-pulse" />
                </div>
                <div className="h-5 w-12 rounded bg-muted/40 animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
