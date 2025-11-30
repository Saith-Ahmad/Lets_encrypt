"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface UserType {
  userId: string;
  name: string;
  image: string;
}

interface UsersListProps {
  users: UserType[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onAddUser: (userId: string) => void;
  sendingUserId: string | null; // ✅ Correct prop name
  allowedUsers: string[];
}

export default function UsersList({
  users,
  searchQuery,
  setSearchQuery,
  onAddUser,
  sendingUserId, // ✅ Use this
  allowedUsers
}: UsersListProps) {
  return (
    <div className="mt-6 bg-[#303335] max-w-md p-4 rounded-md border-accent border-1 max-h-[500px] mb-20">
      <Input
        placeholder="Search users..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="bg-[#0f172a] text-gray-200 border-gray-700 mb-2"
      />

      <div className="max-h-64 overflow-y-auto space-y-2">
        {users.map((u) => {
          const isAlreadySent = allowedUsers.includes(u.userId); // ✅ define here

          return (
            <div
              key={u.userId}
              className="flex items-center justify-between p-2 bg-[#0f172a] rounded-lg"
            >
              <div className="flex items-center gap-2">
                <img src={u.image} className="w-8 h-8 rounded-full" />
                <span>{u.name}</span>
              </div>

              <Button
                onClick={() => onAddUser(u.userId)}
                size="sm"
                disabled={isAlreadySent || sendingUserId === u.userId} // ✅ correct
                className={isAlreadySent ? "opacity-50 cursor-not-allowed" : ""}
              >
                {isAlreadySent
                  ? "Sent"
                  : sendingUserId === u.userId
                  ? "Sending..."
                  : "Send"} {/* ✅ correct */}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
