"use client"

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Login(){

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { data: session} = useSession()
    const [error, setError] = useState('')
    const router = useRouter()

    const handleSubmit = async () => {
        setError('')
        try {
            if(session){
                router.push('/')
            } 
           const result = await signIn("credentials", {
                email,
                password,
                redirect:false
            })

            if(result?.error){
                setError("Invalid credentials")
            }

            router.push('/')
            router.refresh()
        } catch (error) {
            
        }
    }
    if(session){
        router.push('/')
    } else if(!session){
         return( 
   <div className=" flex items-center justify-center">
    <div className="w-full max-w-sm bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col gap-6">
        <div className="text-center">
            <h1 className="text-3xl font-bold text-black">Login</h1>
        </div>
        <form className="flex flex-col gap-4" onSubmit={(e) => { e.preventDefault();
             handleSubmit() }}>
            <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-600">Email</label>
                <input 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:border-gray-400"
                />
            </div>
            <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-600">Password</label>
                <input 
                    value={password} 
                    type="password" 
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:border-gray-400"
                />
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium mt-2" type="submit">
                Login
            </button>
        </form>
        {error ? <p>{error}</p> : ""}
        <p className="text-center text-sm text-gray-400">
            Don't have an account? <a href="/signup" className="text-blue-600 hover:underline">Login</a>
        </p>
    </div>
</div>)
    }
  
}