"use client";
import {
  FileText,
  LayoutDashboard,
  PlayCircle,
  Sparkles,
  UserRound,
  Users,
  WalletCards,
} from "lucide-react";
import Button from "./Button";
import { useScreen } from "@/lib/ScreenProvider";
import Image from "next/image";

export default function Sidebar() {
  const { activeScreen, setActiveScreen } = useScreen();
  const nav = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "courses", label: "Course Approvals", icon: FileText, badge: 12 },
    { id: "lessons", label: "Lessons", icon: PlayCircle },
    { id: "assignments", label: "Assignments", icon: FileText },
    { id: "live-classes", label: "Live Classes", icon: WalletCards },
    { id: "users", label: "Users", icon: Users },
  ];

  return (
    <aside className="hidden w-56 min-h-full shrink-0 border-r bg-card  lg:flex lg:flex-col">
      <div className="flex h-18 items-center gap-3 border-b px-5">
        <div
          className="flex items-center justify-center rounded-lg p-2
         bg-black "
        >
          <Image
            src={"/jimfocug-logo-1.png"}
            alt="company logo"
            width={25}
            height={25}
          />
        </div>
        <div>
          <p className="font-bold">Jimfocug</p>
          <p className="text-[10px] font-bold tracking-widest text-primary">
            E-LEARNING
          </p>
        </div>
      </div>
      <nav className="flex flex-col gap-1 px-3 py-5">
        {nav.map((item) => (
          <Button
            key={item.id}
            onClick={() => setActiveScreen(item.id)}
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-xs ${activeScreen === item.id || (item.id === "users" && ["students", "tutors", "admins"].includes(activeScreen)) ? "bg-accent text-primary" : "text-muted-foreground hover:bg-muted"}`}
          >
            <item.icon className="size-4" />
            {item.label}

            {item.badge && (
              <span className="ml-auto rounded-full bg-destructive px-1.5 py-0.5 text-[9px] font-bold text-destructive-foreground">
                {item.badge}
              </span>
            )}
          </Button>
        ))}
      </nav>
      <div className="mt-auto border-t p-4">
        <button className="flex items-center gap-3 px-2 py-2 text-xs text-muted-foreground">
          <UserRound className="size-4" />
          Logout
        </button>
      </div>
    </aside>
  );
}
