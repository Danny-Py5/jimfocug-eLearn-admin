import Header from "@/components/Header";
import HomeTree from "@/components/HomeTree";
import Sidebar from "@/components/Sidebar";
import AuthGuard from "@/components/AuthGuard";
import { ScreenProvider } from "@/lib/providers/ScreenProvider";

export default function Home() {
  return (
    <ScreenProvider>
      <Sidebar />

      <div className="flex-1">
        <Header />
        <HomeTree />
      </div>
    </ScreenProvider>
  );
}
