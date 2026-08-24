import Header from "@/components/Header";
import HomeTree from "@/components/HomeTree";
import Sidebar from "@/components/Sidebar";
import { getAuthenticatedUser } from "@/lib/auth";
import { ScreenProvider, useScreen } from "@/lib/ScreenProvider";
import Assignments from "@/lib/screens/Assignment";
import Courses from "@/lib/screens/Courses";
import Dashboard from "@/lib/screens/Dashboard";
import LiveClasses from "@/lib/screens/LiveClasses";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getAuthenticatedUser();
  console.log("this line in main page is reashed");

  // if (!user) {
  //   redirect("/login");
  // }

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
