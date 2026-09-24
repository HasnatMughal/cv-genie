"use client"

import { useState } from "react"
import { toast } from "sonner"

export default function RedeemPage() {
    const [code, setCode] = useState("")
    const [loading, setLoading] = useState(false)

    const handleRedeem = async () => {
        setLoading(true)
        try {
            const res = await fetch("/api/redeem", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code }),
            })
            const data = await res.json()

            if (res.ok) {
                toast.success(data.message)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error("Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-md mx-auto py-16 px-4 flex flex-col gap-4">
            <h1 className="text-2xl font-bold text-center">Redeem Your Code</h1>
            <p className="text-gray-500 text-center text-sm">
                Enter the code you received from AppSumo to unlock lifetime access.
            </p>
            <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter your code"
                className="border rounded-md p-3 text-center"
            />
            <button
                onClick={handleRedeem}
                disabled={loading}
                className="bg-blue-500 hover:bg-blue-700 text-white rounded-md p-3"
            >
                {loading ? "Redeeming..." : "Redeem Code"}
            </button>
        </div>
    )
}