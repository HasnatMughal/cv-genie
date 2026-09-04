import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request:any){
    const {name, email, password} = await request.json()

    const existingUser = await prisma.user.findUnique({where: {email}})

    if(existingUser) return NextResponse.json({message:"User already exists"})

    const hashedPassword = await bcrypt.hash(password, 15)

    const user = await prisma.user.create({data: {name, email, password: hashedPassword}})

    return NextResponse.json({message:"User registered successfully"})
}