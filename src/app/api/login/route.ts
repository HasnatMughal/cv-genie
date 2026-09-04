import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(request:any){
    const {email, password} = await request.json()

    const existingUser = await prisma.user.findUnique({where: email})   

    if(!existingUser) return NextResponse.json({message: "User not found. Create a new account"})

    if(password === existingUser.password) return NextResponse.json({message: "Login success"})
}