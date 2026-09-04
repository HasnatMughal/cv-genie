
import  { auth } from "@/lib/auth"
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(){
    const session = await auth()
    
    console.log("Session", session)
    if(!session?.user?.id ){
       return NextResponse.json({message: "Unauthorized", }, {status:401})
    }

    const user = await prisma.user.findUnique({where: {id: session?.user?.id},
    select: {
        id:true,
        name: true,
        email: true,
        plan: true,
        coverLetters:true,
        resume:true,
        resumes:true,
        jobMatches:true,
        interviewPrep:true,
        linkedInOpt:true,
        coldMails:true

        
    }})

    return NextResponse.json({message:"Useer get success", body: user})
}

export async function PATCH(request:any){
    const {name, email, plan, coverLetters, resume, resumes, linkedInOpt, interviewPrep, coldMails, jobMatches} = await request.json()
    const session = await auth()

    if(!session?.user?.id || session?.user?.id === null){
       return NextResponse.json({message: "Unauthorized"})
    }

    const updatedUser = await prisma.user.update({where:{id:session.user.id},
    data: {
        name:name, email:email, plan:plan, coverLetters:coverLetters, resume:resume, resumes:resumes, linkedInOpt:linkedInOpt, interviewPrep:interviewPrep, coldMails:coldMails, jobMatches:jobMatches
    }})


    return NextResponse.json({message:"User's data updated",updatedUserData: updatedUser  })
}