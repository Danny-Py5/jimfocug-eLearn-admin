"use client";

import {
  FileText,
  LayoutDashboard,
  Menu,
  PlayCircle,
  Users,
  WalletCards,
  X,
} from "lucide-react";
import Button from "../Button";
import { useScreen } from "@/lib/providers/ScreenProvider";
import Modal from "../Modal";
import { useState } from "react";
import { interceptorFetch } from "@/lib/interceptor-fetch";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { SidebarContent } from "./SidebarContent";

export default function Sidebar() {
  const router = useRouter();
  const { activeScreen, setActiveScreen } = useScreen();

  const [showLogOutModal, setShowLogoutModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const response = await interceptorFetch("/api/auth/logout", {
        method: "POST",
      });

      if (!response.ok) {
        toast.error("Logout fail!");
        console.error("Logout failed....");
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

  const isActive = (id: string) =>
    activeScreen === id ||
    (id === "users" && ["students", "tutors", "admins"].includes(activeScreen));

  const handleNavigation = (id: string) => {
    setActiveScreen(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setIsMobileMenuOpen((prev) => !prev)}
        className="fixed left-4 top-4 z-50 rounded-lg border bg-card p-2.5 shadow-sm transition hover:bg-muted lg:hidden"
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? (
          <X className="size-5" />
        ) : (
          <Menu className="size-5" />
        )}
      </button>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px] lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Desktop sidebar */}
      <aside className="hidden min-h-full w-56 shrink-0 border-r bg-card lg:flex lg:flex-col">
        <SidebarContent
          nav={nav}
          activeScreen={activeScreen}
          onNavigate={handleNavigation}
          onLogout={() => {
            setShowLogoutModal(true);
            setIsMobileMenuOpen(false);
          }}
          onClose={() => setIsMobileMenuOpen(false)}
        />
      </aside>

      {/* Mobile sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r bg-card shadow-xl transition-transform duration-300 lg:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarContent
          nav={nav}
          activeScreen={activeScreen}
          onNavigate={handleNavigation}
          onLogout={() => {
            setShowLogoutModal(true);
            setIsMobileMenuOpen(false);
          }}
          onClose={() => setIsMobileMenuOpen(false)}
        />
      </aside>

      {/* Logout modal */}
      {showLogOutModal && (
        <Modal title="Logout" onClose={() => setShowLogoutModal(false)}>
          <p>Are you sure you want to logout?</p>

          <div className="mt-6 flex justify-end gap-3 border-t border-border/50 pt-6">
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
    </>
  );
}
