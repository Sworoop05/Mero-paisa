"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { Appbar } from "@repo/ui/appbar";
import React from "react";
import Sidebar from "./_components/Sidebar";
const Layout = ({ children }: { children: React.ReactNode }) => {
  const session = useSession();
  return (
    <div className="">
      <Appbar onSignin={signIn} onSignout={signOut} user={session.data?.user} />
      <div className="flex">
        <Sidebar />
        {children}
      </div>
    </div>
  );
};

export default Layout;
