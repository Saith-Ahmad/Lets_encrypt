// "use client";

// import FeatureCards from "@/components/pages/dashboard/FeatureCards";
// import SecurityStats from "@/components/pages/dashboard/SecurityStats";
// import { useUser } from "@clerk/nextjs";


// export default function DashboardPage() {
//   const { user } = useUser();
//   return (
//     <div className="min-h-screen bg-[#0f172a] text-gray-100 p-6 md:p-10 rounded-lg">
//       <h1 className="text-3xl font-bold mb-8 text-yellow-400">{user ? `Welcome, ${user?.firstName}` : "Dashboard"}</h1>

//       {/* Analytics Section */}
//       <SecurityStats />

//       {/* Cards Section */}
//       <div className="mt-10">
//         <FeatureCards />
//       </div>
//     </div>
//   );
// }


"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FeatureCards from "@/components/pages/dashboard/FeatureCards";
import SecurityStats from "@/components/pages/dashboard/SecurityStats";
import { Loader2 } from "lucide-react";

export default function DashboardPage() {
  const { user } = useUser();
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkUserInDB = async () => {
      if (!user) return;

      try {
        const email = user.primaryEmailAddress?.emailAddress;
        const res = await fetch(`/api/users/check?email=${email}`);
        const data = await res.json();

        if (!data.exists) {
          router.replace("/onboarding"); // redirect if user not in DB
        }
      } catch (err) {
        console.error("Error checking user:", err);
      } finally {
        setChecking(false);
      }
    };

    checkUserInDB();
  }, [user, router]);

  if (checking) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-100">
        <Loader2 className="w-8 h-8 animate-spin text-yellow-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-gray-100 p-6 md:p-10 rounded-lg">
      <h1 className="text-3xl font-bold mb-8 text-yellow-400">
        {user ? `Welcome, ${user.firstName}` : "Dashboard"}
      </h1>

      {/* Analytics Section */}
      <SecurityStats />

      {/* Cards Section */}
      <div className="mt-10">
        <FeatureCards />
      </div>
    </div>
  );
}
