import { auth } from "@/lib/auth";
import pdfToText from "@/lib/pdfparse";
import prisma from "@/lib/prisma";
import Groq from "groq-sdk";
import { NextResponse } from "next/server";

export async function POST(request:any){
    const {jobTitle, description, company} = await request.json()
    const session = await auth()
    const userID = session?.user?.id

    const user = await prisma.user.findUnique({where:{id: userID}})

    if(!user?.resume){
        return NextResponse.json({message:"No Resume Found"}, {status:404})
    }

   const pdfText = await pdfToText(user?.resume)

   console.log(pdfText)

   const groq = new Groq({
    apiKey : process.env.GROQ_API_KEY
   })

   const completions = await groq.chat.completions.create({
    messages: [
        {
            role:"system",
            content: `You are a professional Cover Letter writer, write a concise and tailored cover letter based on the candidate's resume and the job description.`
        },
        {
            role:"user",
            content: `Write a cover letter for Resume:${pdfText}, jobTitle:${jobTitle} and description:${description} and companyName: ${company}`
        }
    ],
    model:"openai/gpt-oss-120b"
   })

   const content = completions.choices[0].message.content;

   const coverLetter = await prisma.coverLetter.create({
    data: {
        content: content?? "",
        jobTitle,
        userId: user.id,
        company:company
    }
   })
return NextResponse.json(coverLetter)



}