"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Pages that render without Header & Sidebar layout
  const isAuthPage = pathname === "/login" || pathname === "/signup";

  if (isAuthPage) {
    return <main className="min-h-screen bg-[#14163A] text-[#EEF0FF]">{children}</main>;
  }

  return (
    <div className="min-h-screen bg-[#14163A] text-[#EEF0FF] flex flex-col">
      <Header
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        isSidebarOpen={isSidebarOpen}
      />
      
      <div className="flex flex-1 pt-[70px]">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        
        <main className="flex-1 md:ml-[280px] p-4 md:p-8 min-h-[calc(100vh-70px)] overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
