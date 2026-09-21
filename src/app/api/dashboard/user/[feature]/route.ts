import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(req:Request, {params}:{params:Promise<{feature:string}>}) {
    const {feature} = await params
    console.log(feature)
    const session = await auth()

    if(!session?.user?.id){
        return NextResponse.json({message:"unauthorized"})
    }

    let data;

    switch(feature){
        case "CoverLetter":
            data = await prisma.coverLetter.findMany({where:{userId: session?.user?.id}})
            break;
        case "ResumeAnalysis":
            data = await prisma.resume.findMany({where:{userId: session?.user?.id}})
            break;

        case "JobMatcher":
            data = await prisma.jobMatch.findMany({where:{userId: session?.user?.id}})
            break
        case "coldMails":
            data = await prisma.coldMail.findMany({where:{userId: session?.user?.id}})
            break
        case "linkedInOpt":
            data = await prisma.linkedInOpt.findMany({where:{userId: session?.user?.id}})

            break;
            default: return NextResponse.json({message: "Invalid feature"}, {status: 400})
        
    }
    return NextResponse.json(data)
}