"use client";
import Header from "@/components/Header";
import HomeTree from "@/components/HomeTree";
import Sidebar from "@/components/sidebar/Sidebar";
// import AuthGuard from "@/components/AuthGuard";
import { ScreenProvider } from "@/lib/providers/ScreenProvider";
import { CourseProvider } from "@/lib/providers/CourseProvider";
import { UsersProvider } from "@/lib/providers/UsersProvider";

export default function Home() {
  return (
    <CourseProvider>
      <UsersProvider>
        <ScreenProvider>
          <Sidebar />

          <div className="flex-1">
            <Header />
            <HomeTree />
          </div>
        </ScreenProvider>
      </UsersProvider>
    </CourseProvider>
  );
}
