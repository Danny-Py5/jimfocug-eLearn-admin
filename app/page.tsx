"use client";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { ScreenProvider, useScreen } from "@/lib/ScreenProvider";
import Assignments from "@/lib/screens/Assignment";
import Courses from "@/lib/screens/Courses";
import Dashboard from "@/lib/screens/Dashboard";
import LiveClasses from "@/lib/screens/LiveClasses";
import Image from "next/image";

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

function HomeTree() {
  const { activeScreen } = useScreen();
  return (
    <main className="flex-1 overflow-auto py-7 md:px-8 lg:px-10">
      {activeScreen === "dashboard" ? (
        <Dashboard />
      ) : // <h1>Dashboard</h1>
      activeScreen === "courses" ? (
        <Courses />
      ) : // <h1>Courses</h1>
      activeScreen === "lessons" ? (
        // <Lessons />
        <h1>Lesson</h1>
      ) : activeScreen === "assignments" ? (
        <Assignments />
      ) : // <h1>Assignment</h1>
      activeScreen === "live-classes" ? (
        <LiveClasses />
      ) : (
        // <h1>LIve classes</h1>
        // <People />
        <h1>People</h1>
      )}
    </main>
  );
}
