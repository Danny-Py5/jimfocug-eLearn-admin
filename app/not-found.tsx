"use client";

import { ArrowLeft, Home, SearchX } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen w-full items-center justify-center px-6">
      <div className="flex max-w-md flex-col items-center text-center">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-muted">
          <SearchX className="h-10 w-10 text-muted-foreground" />
        </div>

        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-teal-300/70">
          404 Error
        </p>

        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Page not found
        </h1>

        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          The page you are looking for doesn&apos;t exist or may have been moved
          somewhere else.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition hover:bg-muted"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </button>

          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 rounded-lg bg-teal-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-teal-600"
          >
            <Home className="h-4 w-4" />
            Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
