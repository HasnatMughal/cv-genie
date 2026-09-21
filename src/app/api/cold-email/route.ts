import { auth } from "@/lib/auth"
import pdfToText from "@/lib/pdfparse"
import prisma from "@/lib/prisma"
import Groq from "groq-sdk"
import { NextResponse } from "next/server"

export async function POST(request:any){
    const {company, purpose} = await request.json()
     const session = await auth()
    
        const user = await prisma.user.findUnique({
            where: {id: session?.user?.id}
        })
    
        if(!user?.resume){
            return NextResponse.json({message:"No resume found"})
        }
    
        const pdfText = await pdfToText(user?.resume)
    

    const groq = new Groq({
        apiKey:process.env.GROQ_API_KEY
    })

    const completions = await groq.chat.completions.create({
        messages:[
            {
                role:'system',
                content: `You are an expert at writing cold outreach emails for job applications. 
Based on the candidate's resume and the target role/company, write a compelling cold email. Return strictly valid JSON:
{
  "subject": "...",
  "body": "..."
}`
            },
            {
                role:'user',
                content:`Resume: ${pdfText}\n\nTarget Role/Company: ${company}`
            }
        ],
        model:'openai/gpt-oss-120b',
        response_format:{type:'json_object'}
    })

    const response = JSON.parse(completions.choices[0].message.content ?? "{}")

    const coldMail = await prisma.coldMail.create({
        data:{
            subject: response.subject,
            body:response.body,
            userId: user?.id,
            company: company,
            purpose:purpose

        }
    })

    return NextResponse.json(coldMail)

}