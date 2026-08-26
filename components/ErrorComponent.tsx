import Button from "./Button";

export default function ErrorComponent({
  msg,
  title,
  onRefresh,
}: {
  msg?: string;
  title: string;
  onRefresh: () => void;
}) {
  return (
    <div className="flex min-h-[300px] w-full items-center justify-center px-4">
      <div className="flex max-w-md flex-col items-center text-center">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-500/10">
          <svg
            className="h-7 w-7 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.8}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m0 3.75h.008M10.29 3.86 2.82 17a1.5 1.5 0 0 0 1.3 2.25h15.76a1.5 1.5 0 0 0 1.3-2.25L13.71 3.86a1.97 1.97 0 0 0-3.42 0Z"
            />
          </svg>
        </div>

        <h2 className="text-lg font-semibold">{title}</h2>

        <p className="mt-1 text-sm text-muted-foreground">
          {msg ?? "Hmm... Something went wrong"}
          {/* Something went wrong while fetching your courses. Please try again. */}
        </p>

        <Button
          onClick={onRefresh}
          className="mt-5 rounded-lg bg-teal-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-teal-600 active:scale-[0.98]"
        >
          Try again
        </Button>
      </div>
    </div>
  );
}
