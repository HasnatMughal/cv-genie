'use client'

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import {initializePaddle, Paddle} from "@paddle/paddle-js"
import { toast } from "sonner"

export default function UpgradeToPro(){
    const {data: session} = useSession()
    const [paddle, setPaddle] = useState<Paddle>()

    useEffect(() => {
        initializePaddle({
            environment:"sandbox",
            token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN as string,

        }).then((paddleInstance) => {setPaddle(paddleInstance)})
    }, [])

    const handleSubmit = async () => {
        if(!session?.user?.id){
            toast.error("Please login First")
        }

        if(!paddle){
            toast.error('Payment system is still loading, Try again in a few moments')
        }
        paddle?.Checkout.open({
            items:[
                {
                    priceId: process.env.NEXT_PUBLIC_PADDLE_PRICE_ID as string,
                    quantity:1
                }
            ],
            customData:{
                userId: session?.user?.id
            }
        })
    }
    return(
        <div className="max-w-4xl mx-auto py-16 px-4">
            <h1 className="text-3xl font-bold text-center mb-2">Choose Your Plan</h1>
            <p className="text-gray-500 text-center mb-10">
                Start free, upgrade when you need more.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Free Plan */}
                <div className="border rounded-2xl p-8 flex flex-col gap-4">
                    <h2 className="text-xl font-semibold">Free</h2>
                    <p className="text-3xl font-bold">$0<span className="text-base font-normal text-gray-500">/month</span></p>

                    <ul className="flex flex-col gap-3 mt-4 text-sm">
                        <li className="flex items-center gap-2">
                            ✅ Unlimited Cover Letters
                        </li>
                        <li className="flex items-center gap-2 text-gray-400">
                            ❌ Resume Analyzer
                        </li>
                        <li className="flex items-center gap-2 text-gray-400">
                            ❌ Job Matcher
                        </li>
                        <li className="flex items-center gap-2 text-gray-400">
                            ❌ LinkedIn Generator
                        </li>
                        <li className="flex items-center gap-2 text-gray-400">
                            ❌ Cold Email Generator
                        </li>
                        <li className="flex items-center gap-2 text-gray-400">
                            ❌ Interview Prep
                        </li>
                    </ul>

                    <button
                        disabled
                        className="mt-auto bg-gray-100 text-gray-500 rounded-md p-2 cursor-not-allowed"
                    >
                        Current Plan
                    </button>
                </div>

                {/* Pro Plan */}
                <div className="border-2 border-blue-500 rounded-2xl p-8 flex flex-col gap-4 relative">
                    <span className="absolute -top-3 left-6 bg-blue-500 text-white text-xs px-3 py-1 rounded-full">
                        Most Popular
                    </span>
                    <h2 className="text-xl font-semibold">Pro</h2>
                    <p className="text-3xl font-bold">$5<span className="text-base font-normal text-gray-500">/month</span></p>

                    <ul className="flex flex-col gap-3 mt-4 text-sm">
                        <li className="flex items-center gap-2">✅ Unlimited Cover Letters</li>
                        <li className="flex items-center gap-2">✅ Resume Analyzer</li>
                        <li className="flex items-center gap-2">✅ Job Matcher</li>
                        <li className="flex items-center gap-2">✅ LinkedIn Generator</li>
                        <li className="flex items-center gap-2">✅ Cold Email Generator</li>
                        <li className="flex items-center gap-2">✅ Interview Prep</li>
                    </ul>

                    <button
                        onClick={() => handleSubmit()}
                        className="mt-auto bg-blue-500 hover:bg-blue-700 text-white rounded-md p-2"
                    >
                        Upgrade to Pro
                    </button>
                </div>
            </div>
        </div>
    )
}