import Header from "@/components/Header";
import HomeTree from "@/components/HomeTree";
import Sidebar from "@/components/Sidebar";
import { getAuthenticatedUser } from "@/lib/auth";
import { ScreenProvider, useScreen } from "@/lib/ScreenProvider";

import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getAuthenticatedUser();
  console.log({ user });

  if (user == null) {
    redirect("/login");
  }

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
