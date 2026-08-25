"use client";

import { FormEvent, useState } from "react";
import { Lock, Eye, EyeOff, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import JimfocugLogo from "@/components/JimfocugLogo";
import Button from "@/components/Button";

export default function LoginScreen() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.msg || "Invalid userName or password");
        return;
      }
      console.log({ data });

      router.replace("/");
      return;
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex items-center w-[500] justify-center bg-muted/30 px-4 py-8 m-auto">
      <div className="w-full max-w-md rounded-2xl  border bg-card p-8 shadow-lg">
        {/* Logo / Brand */}
        <div className="mb-8 text-center">
          <div className="justify-self-center">
            <JimfocugLogo />
          </div>

          <h1 className="text-2xl font-bold tracking-tight">
            Jimfocug eLearn <span className="text-teal-500">Admin</span>
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Login to your account to continue
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-5 rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* username */}
          <div className="space-y-1.5">
            <label htmlFor="userName" className="text-sm font-medium">
              Username
            </label>

            <div className="relative">
              <User className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

              <input
                id="userName"
                type="userName"
                placeholder="dannypy"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full rounded-lg border bg-background py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>

              <Link
                href="/forgot-password"
                className="text-xs text-primary hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-lg border bg-background py-2.5 pl-10 pr-10 text-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
              />

              <button
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-teal-500 py-2.5 text-sm font-semibold text-primary-foreground transition-all  hover:bg-teal-600 disabled:opacity-70"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Logging in...
              </>
            ) : (
              "Login In"
            )}
          </Button>

          {/* <button
            type="submit"
            disabled={isLoading}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:opacity-70"
          ></button> */}
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="font-medium text-primary hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
