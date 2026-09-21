import { auth } from "@/lib/auth";
import pdfToText from "@/lib/pdfparse";
import prisma from "@/lib/prisma";
import Groq from "groq-sdk";
import { NextResponse } from "next/server";

export async function POST(request:any){
    const session =  await auth()

    if(!session?.user?.id){
        return NextResponse.json({message:"Unauthorized"})
    }

    const {jobTitle} = await request.json()

    const user = await prisma.user?.findUnique({
        where: {id:session?.user?.id}
    })

    if (!user?.resume) {
        return NextResponse.json({ message: "No resume uploaded" }, { status: 400 })
    }

    const resumeText = await pdfToText(user?.resume)

    const groq = new Groq({
        apiKey: process.env.GROQ_API_KEY
    })

    const completions = await groq.chat.completions.create({
        messages:[
            {
                role:'system',
                content: `Generate exactly 7 interview questions for the role of {jobTitle}. Use the resume 
to ask 3 in random index specific, in-depth questions about the candidate's actual projects and 
experience (to test their genuine understanding of what they built). Use the 
remaining questions to test broader role-relevant knowledge that goes beyond what's 
explicitly listed in the resume, to challenge the candidate's depth of understanding. Give the questions in this json format:
{
  "questions": ["question 1", "question 2", "question 3", "question 4", "question 5", "question 6", "question 7"]
}`,
            },
            {
                role:'user',
                content:`Resume:\n${resumeText}\n\nTarget Role: ${jobTitle}`,
            },
            
        ],
        model:'openai/gpt-oss-120b',
        response_format: { type: "json_object" },
    })

    const result = await JSON.parse(completions.choices[0].message.content ?? "{}")
    console.log(result)

    return NextResponse.json({ jobTitle, questions: result.questions })
}