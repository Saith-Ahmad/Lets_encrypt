"use client";

import { MenuIcon, SearchIcon } from "lucide-react";
import {SignedIn, UserButton } from '@clerk/nextjs'

type HeaderProps = {
  onToggleSidebar?: () => void;
};

export function DashboardTopBar({ onToggleSidebar }: HeaderProps) {
  return (
    <header className="w-full top-0 z-10 flex items-center justify-between border-b border-[#1f2937] bg-[#0f172a] px-4 py-5 shadow-md md:px-5 2xl:px-10">
      {/* Sidebar Toggle (Mobile) */}
      <button
        onClick={onToggleSidebar}
        className="rounded-lg border border-[#1e293b] bg-[#1e293b] hover:bg-[#334155] p-2 transition-colors lg:hidden"
      >
        <MenuIcon className="text-gray-200" />
        <span className="sr-only">Toggle Sidebar</span>
      </button>

      {/* Title */}
      <div className="max-xl:hidden">
        <h1 className="font-poppins text-xl font-semibold text-white">
          Dashboard
        </h1>
        <p className="text-sm text-gray-400">Let’s Encrypt Panel</p>
      </div>

      {/* Right Section */}
      <div className="flex flex-1 items-center justify-end gap-3 min-[375px]:gap-4">
        {/* Search */}
        <div className="relative w-full max-w-[280px]">
          <input
            type="search"
            placeholder="Search"
            className="w-full rounded-full border border-[#1e293b] bg-[#1e293b] py-2.5 pl-10 pr-5 text-gray-100 placeholder:text-gray-500 outline-none focus:border-[#facc15] focus:ring-1 focus:ring-[#facc15] transition-all"
          />
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        </div>

        {/* User Info */}
        <div className="flex items-center gap-2">
          
           <SignedIn>
              <UserButton />
            </SignedIn>
        </div>
      </div>
    </header>
  );
}
