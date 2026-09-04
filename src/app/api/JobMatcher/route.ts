import { auth } from "@/lib/auth"
import pdfToText from "@/lib/pdfparse"
import prisma from "@/lib/prisma"
import Groq from "groq-sdk"
import { NextResponse } from "next/server"

export async function POST(request:any){
    const {jobTitle, description} = await request.json()
     const session = await auth()

    const user = await prisma.user.findUnique({
        where: {id: session?.user?.id}
    })

    if(!user?.resume){
        return NextResponse.json({message:"No resume found"})
    }

    const pdfText = await pdfToText(user?.resume)

    const groq = new Groq({
        apiKey: process.env.GROQ_API_KEY
    })

    const completions = await groq.chat.completions.create({
        messages: [
            {
                role:'system',
                content: `You are an expert recruiter and ATS analyst. Compare the candidate's resume against the job description and return strictly valid JSON:
                {
                "matchScore": <0-100>,
                "matchingSkills": [...],
                "missingSkills": [...],
                "suggestions": [...]
}`
            },
            {
                role:'user',
                content: `Resume: ${pdfText} \n\n jobTitle:${jobTitle} \n\n jobDesc: ${description}`
            }
        ],
        model:'openai/gpt-oss-120b',
        response_format:{type:'json_object'}
    })

    const response =  completions.choices[0].message.content

    return NextResponse.json(response)



}