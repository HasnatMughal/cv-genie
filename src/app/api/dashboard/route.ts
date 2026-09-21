import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(){
    const session = await auth()

    if(!session?.user?.id){
        return NextResponse.json({message: "Unauthorized"})
    }

    const user = await prisma.user.findUnique({where:{id:session?.user?.id},
        include:{
            coldMails:true,
            coverLetters:true,
            interviewPrep:true,
            jobMatches:true,
            linkedInOpt:true,
            resumes:true
        }
    
    })

    return NextResponse.json(user)
}