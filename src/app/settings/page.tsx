"use client"

import Logout from "@/components/Logout";
import UpgradeToPro from "@/components/UpgradeToPro";
import { UploadButton } from "@/lib/uploadthing";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import { toast } from "sonner";
type User = {
    id: string;
    name: string | null;
    email: string;
    plan: string;
    resume: string | null;
    coverLetters: any[];
    resumes: any[]; 
    jobMatches: any[];
    interviewPrep: any[];
    linkedInOpt: any[];
    coldMails: any[];
};

export default function Setting(){

     const [user, setUser] = useState<User | null>(null)
    const [fetching, setFetching] = useState(true)
    const [openLogoutOption , setOpenLogoutOption] = useState(false)

    const getUser = async () => {
        try {
            const res = await fetch("/api/user/me")
            if (res.ok) {
                const data = await res.json()
                setUser(data.body)
            }
        } catch (error) {
            console.error(error)
        } finally {
            setFetching(false)
        }
    }

    useEffect(() => {
        getUser()
    }, [])

     const { data: session, status } = useSession()
    const router = useRouter()

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login")
        }
    }, [status, router])

    if (status === "loading") return <div>Loading...</div>

    if (fetching) {
        return <div className="flex justify-center items-center min-h-screen">Loading...</div>
    }

   
    if (!session) return null

    return (
    <div className="max-w-2xl mx-auto py-10 px-4 flex flex-col gap-8">
        <h1 className="text-2xl font-bold">Settings</h1>

        {/* Profile Section - display only */}
        <div className="border rounded-xl p-6 flex flex-col gap-4">
            <h2 className="text-lg font-semibold">Profile</h2>

            <div className="flex flex-col gap-1">
                <span className="text-sm text-gray-500">Name</span>
                <p className="font-medium">{user?.name ?? "Not set"}</p>
            </div>

            <div className="flex flex-col gap-1">
                <span className="text-sm text-gray-500">Email</span>
                <p className="font-medium">{user?.email}</p>
            </div>
        </div>

        {/* Resume Section */}
        <div className="border rounded-xl p-6 flex flex-col gap-4">
            <h2 className="text-lg font-semibold">Resume</h2>

            {user?.resume ? (
                <a
                    href={user.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline w-fit"
                >
                    View Current Resume
                </a>
            ) : (
                <p className="text-gray-500">No resume uploaded yet.</p>
            )
            
            }
            <Link href={"/UploadResume"} className="text-blue-500 hover:text-blue-700">Upload Resume</Link>


        </div>

        {/* Billing Section */}
        <div className="border rounded-xl p-6 flex flex-col gap-4">
            <h2 className="text-lg font-semibold">Billing</h2>
            <p className="text-gray-500">
                Current Plan: <span className="font-semibold capitalize">{user?.plan}</span>
            </p>
            {user?.plan === "free" && <UpgradeToPro />}
        </div>
        <div>
            <button className='px-4 py-2 bg-red-500 hover:bg-red-700 text-white rounded-xl' onClick={() => setOpenLogoutOption(true)} >Logout</button>
            {openLogoutOption === true ? <>
                <div className=" fixed inset-0   bg-black/40 flex items-center justify-center z-50  rounded-2xl  ">
                <div className="bg-white w-full max-w-md p-6 rounded-2xl flex flex-col gap-4">
                <p className="text-lg font-medium"> Are you sure want to Logout?</p>
                <div className="flex gap-3 justify-end">
                     <button className="bg-gray-500 py-2 px-4 hover:bg-gray-700" onClick={() =>setOpenLogoutOption(false)}>Cancel</button>
                    <Logout />
                </div>
                </div>
                   
                   
                    
                     </div>
            </> : ""}
        </div>
    </div>
)
}