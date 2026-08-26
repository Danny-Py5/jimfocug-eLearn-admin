"use client";
import Header from "@/components/Header";
import HomeTree from "@/components/HomeTree";
import Sidebar from "@/components/sidebar/Sidebar";
// import AuthGuard from "@/components/AuthGuard";
import { ScreenProvider } from "@/lib/providers/ScreenProvider";
import { CourseProvider } from "@/lib/providers/CourseProvider";

export default function Home() {
  return (
    <CourseProvider>
      <ScreenProvider>
        <Sidebar />

        <div className="flex-1">
          <Header />
          <HomeTree />
        </div>
      </ScreenProvider>
    </CourseProvider>
  );
}
