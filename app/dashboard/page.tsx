"use client";

import FeatureCards from "@/components/pages/dashboard/FeatureCards";
import SecurityStats from "@/components/pages/dashboard/SecurityStats";
import { useUser } from "@clerk/nextjs";


export default function DashboardPage() {
  const { user } = useUser();
  return (
    <div className="min-h-screen bg-[#0f172a] text-gray-100 p-6 md:p-10 rounded-lg">
      <h1 className="text-3xl font-bold mb-8 text-yellow-400">{user ? `Welcome, ${user?.firstName}` : "Dashboard"}</h1>

      {/* Analytics Section */}
      <SecurityStats />

      {/* Cards Section */}
      <div className="mt-10">
        <FeatureCards />
      </div>
    </div>
  );
}
