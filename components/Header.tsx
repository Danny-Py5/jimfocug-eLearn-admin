"use client";

import { Bell, ChevronDown, Search } from "lucide-react";
import Avatar from "./Avatar";
import { useUser } from "@/lib/providers/UserProvider";
import { capitalizeEachWord } from "@/lib/utils";

export default function Header() {
  const { user } = useUser();
  if (!user) {
    return <></>;
  }
  return (
    <header className="flex h-18 items-center justify-between border-b bg-card px-5 md:px-8">
      <div className="relative sm:ml-0 ml-12">
        <Search className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
        <input
          placeholder="Search courses, instructors, reviews..."
          className="h-9 w-72 rounded-full border bg-background pl-9 pr-3 text-xs outline-none focus:ring-2 focus:ring-ring"
        />
      </div>
      <div className="flex items-center  gap-4">
        <Bell className="size-4 text-muted-foreground" />
        <div className="h-6 w-px bg-border" />
        <Avatar name={`${user.fullName.toUpperCase()}`} />
        <div className="hidden sm:block">
          <p className="font-semibold">{capitalizeEachWord(user.fullName)}</p>
          <p className="text-[10px] text-teal-300">
            {user.role.toUpperCase()} USER
          </p>
        </div>
        <ChevronDown className="size-3 text-muted-foreground" />
      </div>
    </header>
  );
}
