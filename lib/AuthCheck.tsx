"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthCheck({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const isAuthenticated = false; // Replace with actual auth check

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null; // or loading spinner
  }

  return children;
}
