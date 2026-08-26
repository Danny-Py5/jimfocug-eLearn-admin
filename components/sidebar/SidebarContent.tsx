import { LogOut, X, type LucideIcon } from "lucide-react";
import Button from "../Button";
import JimfocugLogo from "../JimfocugLogo";

export interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  badge?: number;
}

interface SidebarContentProps {
  nav: NavItem[];
  activeScreen: string;
  onNavigate: (id: string) => void;
  onLogout: () => void;
  onClose: () => void;
}

export const SidebarContent = ({
  nav,
  activeScreen,
  onNavigate,
  onLogout,
  onClose,
}: SidebarContentProps) => (
  <>
    <div className="flex h-18 items-center gap-3 border-b px-5">
      <JimfocugLogo />

      <div>
        <p className="font-bold">Jimfocug</p>
        <p className="text-[10px] font-bold tracking-widest text-primary">
          E-LEARNING
        </p>
      </div>

      {/* Mobile close button */}
      <button
        onClick={onClose}
        className="ml-auto rounded-md p-2 text-muted-foreground hover:bg-muted lg:hidden"
      >
        <X className="size-5" />
      </button>
    </div>

    <nav className="flex flex-col gap-1 px-3 py-5">
      {nav.map((item) => {
        const isActive =
          activeScreen === item.id ||
          (item.id === "users" &&
            ["students", "tutors", "admins"].includes(activeScreen));

        return (
          <Button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-xs ${
              isActive
                ? "bg-accent text-primary"
                : "text-muted-foreground hover:bg-muted"
            }`}
          >
            <item.icon className="size-4" />

            {item.label}

            {item.badge && (
              <span className="ml-auto rounded-full bg-destructive px-1.5 py-0.5 text-[9px] font-bold text-destructive-foreground">
                {item.badge}
              </span>
            )}
          </Button>
        );
      })}
    </nav>

    <div className="mt-auto border-t p-4">
      <Button
        onClick={onLogout}
        className="flex items-center gap-3 px-2 py-2 text-xs text-muted-foreground"
      >
        <LogOut className="size-4" />
        Logout
      </Button>
    </div>
  </>
);
