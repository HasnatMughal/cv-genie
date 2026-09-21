"use client"

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function Signup(){
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()
    const {data:session} = useSession()

    const handleSubmit = async () => {
        try {
            const signUpRes = await fetch(`/api/signup`,{
                method:"POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify({email, password, name})
            })
            if(signUpRes.ok){
                router.push('/login')
                setName('')
                setEmail('')
                setPassword('')
            }
        } catch (error) {
            
        }
    }
    if(session){
        router.push('/')
    }

    return(
<div className=" flex items-center bg-gray-500 min-h-screen justify-center w-full">
    <div className="w-full max-w-sm bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col gap-6">
        <div className="text-center">
            <h1 className="text-3xl font-bold text-black">Create Account</h1>
            
        </div>
        <form className="flex flex-col gap-4 text-black" onSubmit={(e) => { e.preventDefault(); handleSubmit() }}>
            <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-600">Name</label>
                <input 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Hasnat Ahmed"
                    className="w-full border border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:border-gray-400"
                />
            </div>
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
                Register
            </button>
        </form>
        <p className="text-center text-sm text-gray-400">
            Already have an account? <a href="/login" className="text-blue-600 hover:underline">Login</a>
        </p>
    </div>
</div>
    )
}