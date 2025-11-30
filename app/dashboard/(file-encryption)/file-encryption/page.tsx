"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Lock } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import EncryptActions from "@/components/pages/fileencryption/EncryptActions";
import FileUpload from "@/components/pages/fileencryption/FileUpload";
import KeyInput from "@/components/pages/fileencryption/KeyInput";
import UsersList from "@/components/pages/fileencryption/UsersList";


export default function FileEncryptionPage() {
    const { user } = useUser();
    const [file, setFile] = useState<File | null>(null);
    const [fileId, setFileId] = useState<string | null>(null);
const [sendingUserId, setSendingUserId] = useState<string | null>(null);
    const [key, setKey] = useState("");
    const [loading, setLoading] = useState(false);
    const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
    const [allowedUsers, setAllowedUsers] = useState<string[]>([]);
    const [allUsers, setAllUsers] = useState<UserType[]>([]);
    const [searchQuery, setSearchQuery] = useState("");

    type UserType = {
        userId: string;
        name: string;
        image: string;
    };

    if (!user) return null;

    // Fetch all users
    useEffect(() => {
        async function fetchUsers() {
            try {
                const res = await fetch("/api/users");
                const data = await res.json();
                if (res.ok) setAllUsers(data);
                // console.log("Fetched users:", allUsers);
            } catch (err) {
                console.error("Failed to fetch users", err);
            }
        }
        fetchUsers();
    }, []);

    // Auto-generate key
    const handleAutoGenerate = () => {
        const randomKey = Array.from(crypto.getRandomValues(new Uint8Array(8)))
            .map((b) => b.toString(16).padStart(2, "0"))
            .join("");
        setKey(randomKey);
        toast.success("Auto-generated secure key!");
    };

    // Encrypt file
    const handleEncrypt = async () => {
        if (!file) return toast.error("Please upload a file!");
        if (!key.trim()) return toast.error("Please provide an encryption key!");
        if (key.trim().length < 8) return toast.error("Key must be at least 8 characters long!");

        setLoading(true);

        try {
            console.log("🔹 Step 1: Encrypting file...");
            const formData = new FormData();
            formData.append("file", file);
            formData.append("key", key);

            const res = await fetch("/api/file/encrypt", { method: "POST", body: formData });
            const data = await res.json();

            console.log("🔹 Encryption Response:", data);

            if (!res.ok) throw new Error(data.error || "Encryption failed");

            const binary = Uint8Array.from(atob(data.encrypted), (c) => c.charCodeAt(0));
            const encryptedBlob = new Blob([binary], { type: "text/plain" });

            console.log("🔹 Step 2: Uploading to Cloudinary...");
            const cloudinaryForm = new FormData();
            cloudinaryForm.append("file", encryptedBlob, file.name + ".enc.txt");

            const uploadRes = await fetch("/api/files/upload", { method: "POST", body: cloudinaryForm });
            const uploadData = await uploadRes.json();

            console.log("🔹 Cloudinary Response:", uploadData);

            if (!uploadRes.ok) throw new Error(uploadData.error);

            // ⭐ FIX — THIS LINE WAS MISSING
            setDownloadUrl(uploadData.secure_url);

            console.log("✔️ Download URL Set:", uploadData.secure_url);

            console.log("🔹 Step 3: Creating DB document...");
            const createRes = await fetch("/api/files", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    filename: file.name,
                    cloudinaryFileUrl: uploadData.secure_url,
                    cloudinaryId: uploadData.public_id,
                    owner: user.id,
                    allowedUsers: [],
                }),
            });

            const createData = await createRes.json();
            const fileId = createData._id;
            console.log("FILE ID:", fileId);
            setFileId(fileId);



            if (!createRes.ok) throw new Error(createData.error);

            toast.success("File encrypted & saved!");
        } catch (err: any) {
            console.error("❌ Encryption Error:", err);
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };


    // Manual download
    const handleDownload = () => {
        if (!downloadUrl || !file) return;
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = `${file.name}.enc.txt`;
        link.click();
        toast.success("File downloaded!");
    };

    // Filter users for search
    const filteredUsers = allUsers.filter(
        (u) => u.userId !== user.id && u.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleAddUser = async (userId: string) => {
    if (!fileId) return toast.error("File not created yet!");

    setSendingUserId(userId); // ⭐ Only this user shows "Sending..."

    try {
        const res = await fetch(`/api/files/${fileId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId }),
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.error);

        toast.success("User added!");

        setAllowedUsers((prev) => [...prev, userId]);
    } catch (err: any) {
        toast.error(err.message);
    } finally {
        setSendingUserId(null);
    }
};



    return (
        <div className="w-full flex justify-start items-center text-gray-100">
            <Card className="w-full bg-[#1e293b] border border-gray-700 max-w-6xl text-gray-200 shadow-xl">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-accent text-2xl font-bold">
                        <Lock className="text-yellow-400" /> File Encryption
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <FileUpload file={file} setFile={setFile} />
                    <KeyInput keyValue={key} setKey={setKey} onAutoGenerate={handleAutoGenerate} />
                    <EncryptActions
                        loading={loading}
                        onEncrypt={handleEncrypt}
                        onDownload={handleDownload}
                        downloadUrl={downloadUrl}
                    />
                    {downloadUrl && (
                        <UsersList
                            users={filteredUsers}
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                            sendingUserId={sendingUserId}
                            allowedUsers={allowedUsers}
                            onAddUser={handleAddUser}
                        />
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
