"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import JimfocugLogo from "./JimfocugLogo";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkAuthentication() {
      try {
        let response = await fetch("/api/auth/me", {
          method: "GET",
          credentials: "include",
        });

        if (response.status === 401) {
          console.log("Access token expired. Attempting refresh...");

          const refreshResponse = await fetch("/api/auth/refresh-token", {
            method: "POST",
            credentials: "include",
          });

          if (!refreshResponse.ok) {
            router.replace("/login");
            return;
          }

          console.log("Token refreshed");

          response = await fetch("/api/auth/me", {
            method: "GET",
            credentials: "include",
          });
        }

        if (!response.ok) {
          router.replace("/login");
          return;
        }

        // Authentication succeeded
        setIsLoading(false);

        console.log(await response.json());
      } catch (error) {
        console.error("Authentication error:", error);
        router.replace("/login");
      }
    }

    checkAuthentication();
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen w-screen items-center justify-center">
        <JimfocugLogo />
        Loading...
      </div>
    );
  }

  return children;
}
