"use client";

import { Sidebar } from "@/components/pages/dashboard/Sidebar";
import { SidebarProvider } from "@/components/pages/dashboard/sidebar-context";
import { DashboardTopBar } from "@/components/pages/dashboard/TopBar";
import NextTopLoader from "nextjs-toploader";
import React from "react";

function Student_layout({ children }: { children: React.ReactNode }) {
    return (
        <html>
            <SidebarProvider>
                <NextTopLoader color="#F4B400" showSpinner={false} height={2}/>

                <div className="flex min-h-screen">
                    <Sidebar  />

                    <div className="w-full :bg-[#020d1a]">
                        <DashboardTopBar />  
                        
                        <main className="isolate bg-[#122031] text-gray-200 min-h-[90vh] mx-auto w-full overflow-hidden p-4 md:p-6 2xl:p-10">
                            {children}
                        </main>
                    </div>
                </div>
            </SidebarProvider>
        </html>
    );
}

export default Student_layout;
