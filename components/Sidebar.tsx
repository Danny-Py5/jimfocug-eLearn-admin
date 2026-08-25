"use client";
import {
  FileText,
  LayoutDashboard,
  LogOut,
  PlayCircle,
  Sparkles,
  UserRound,
  Users,
  WalletCards,
} from "lucide-react";
import Button from "./Button";
import { useScreen } from "@/lib/providers/ScreenProvider";
import Image from "next/image";
import JimfocugLogo from "./JimfocugLogo";
import Modal from "./Modal";
import { useState } from "react";
import { interceptorFetch } from "@/lib/interceptor-fetch";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Sidebar() {
  const router = useRouter();
  const { activeScreen, setActiveScreen } = useScreen();
  const [showLogOutModal, setShowLogoutModal] = useState(false);

  const handleLogout = async () => {
    try {
      const response = await interceptorFetch("/api/auth/logout", {
        method: "POST",
      });

      if (!response.ok) {
        toast.error("Logout fail!");
        console.error(
          "Logout failed....",
          // await response.clone().json(),
        );
        return;
      }
      toast.success("Logout successful!");
      router.replace("/login");
    } catch (error) {
      toast.error("Logout fail!");
      console.error("Logout error:", error);
    } finally {
      setShowLogoutModal(false);
    }
  };

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
      {showLogOutModal && (
        <Modal title="Logout" onClose={() => setShowLogoutModal(false)}>
          <p>Are you sure you want to logout?</p>

          <div className="flex justify-end gap-3 mt-6 border-t border-border/50 pt-6">
            <Button
              className="rounded-lg border-2 border-border bg-background p-3 text-foreground transition-all duration-200 hover:border-muted-foreground/30 hover:bg-muted/80"
              onClick={() => setShowLogoutModal(false)}
            >
              Cancel
            </Button>

            <Button
              className="rounded-lg bg-red-600 p-3 text-white transition-all duration-200 hover:bg-red-700 hover:shadow-lg hover:shadow-red-600/25 active:scale-[0.97]"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </Modal>
      )}

      <div className="flex h-18 items-center gap-3 border-b px-5">
        <JimfocugLogo />
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
        <Button
          onClick={() => {
            setShowLogoutModal(true);
          }}
          className="flex items-center gap-3 px-2 py-2 text-xs text-muted-foreground"
        >
          <UserRound className="size-4" />
          Logout
        </Button>
      </div>
    </aside>
  );
}
