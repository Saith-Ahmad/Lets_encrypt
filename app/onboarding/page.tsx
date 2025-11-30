"use client";

import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, User as UserIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function OnboardingForm() {
  const { user } = useUser();
  const router = useRouter();

  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  // ✅ Check if user already exists
  useEffect(() => {
    const checkUser = async () => {
      if (!user) return;

      try {
        const email = user.primaryEmailAddress?.emailAddress;

        const res = await fetch(`/api/users/check?email=${email}`);
        const data = await res.json();

        if (data.exists) {
          router.push("/dashboard");
        }
      } catch (err) {
        console.log("Check failed:", err);
      } finally {
        setChecking(false);
      }
    };

    checkUser();
  }, [user, router]);

  if (checking) {
  return (
    <div className="flex bg-gray-950 min-h-screen py-5 justify-center items-center bg-cover bg-center relative" >
      <div className="w-full max-w-md space-y-4 p-6">
        <Skeleton className="h-10 w-1/2 bg-primary" />
        <Skeleton className="h-16 w-full bg-primary" />
        <Skeleton className="h-10 w-full bg-primary" />
        <Skeleton className="h-32 w-full bg-primary" />
        <Skeleton className="h-12 w-full bg-primary" />
      </div>
    </div>
  );
}



  const handleSubmit = async () => {
    if (!user) return toast.error("User not logged in");

    if (bio.trim().split(" ").length < 2)
      return toast.error("Bio must contain at least 2 words!");

    setLoading(true);

    try {
      const payload = {
        userId: user.id,
        email: user.primaryEmailAddress?.emailAddress || "",
        name: user.fullName || "",
        image: user.imageUrl,
        bio,
      };

      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to create user");
      }

      toast.success("Profile created successfully!");

      // Redirect to dashboard
      router.push("/dashboard");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex min-h-screen py-5 justify-center items-center bg-cover bg-center relative"
      style={{ backgroundImage: "url('/assets/encrypt1.png')" }}
    >
      <div className="w-full flex justify-center items-center text-gray-100">
        <Card className="w-full bg-[#1e293b] border border-gray-700 max-w-3xl text-gray-200 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-accent text-2xl font-bold">
              <UserIcon className="text-yellow-400" /> Complete Your Profile
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Profile Image */}
            <div className="flex items-center gap-4">
              <img
                src={user?.imageUrl}
                alt="profile"
                className="w-16 h-16 rounded-full border border-gray-700"
              />
            </div>

            {/* Username */}
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Username</label>
              <Input
                type="text"
                value={user?.username || user?.fullName || ""}
                readOnly
                className="bg-[#0f172a] text-gray-200 border-gray-700 focus-visible:ring-yellow-400"
              />
            </div>

            {/* Bio */}
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Bio</label>
              <textarea
                placeholder="Write at least 2 words..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full h-32 bg-[#0f172a] text-gray-200 p-3 rounded-lg border border-gray-700 focus-visible:ring-yellow-400"
              />
            </div>

            <Button
              onClick={handleSubmit}
              disabled={loading}
              className={cn(
                "w-full py-5 text-base bg-yellow-500 hover:bg-yellow-400 text-black font-medium transition",
                loading && "opacity-70 cursor-not-allowed"
              )}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin" /> Saving...
                </span>
              ) : (
                "Create Profile"
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
