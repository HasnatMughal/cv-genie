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

    const {answers, jobTitle, questions} = await request.json()
   

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

   const completion = await groq.chat.completions.create({
    messages: [
        {
            role: "system",
            content: `You are an expert interview coach. You will be given a set of interview questions and the candidate's answers to them. Evaluate the answers based on clarity, relevance, depth, and use of specific examples. Return strictly valid JSON, with no extra text before or after it, in this exact format:
{
  "score": <number between 0-100>,
  "feedback": [
    { "question": "...", "answer": "...", "comment": "specific feedback on this answer" }
  ],
  "overallSuggestions": ["suggestion 1", "suggestion 2", "suggestion 3"]
}`,
        },
        {
            role: "user",
            content: `Job Title: ${jobTitle}\n\nQuestions and Answers:\n${questions
                .map((q: string, i: number) => `Q${i + 1}: ${q}\nA${i + 1}: ${answers[i]}`)
                .join("\n\n")}`,
        },
    ],
    model: "openai/gpt-oss-120b",
    response_format: { type: "json_object" },
})

    const result = await JSON.parse(completion.choices[0].message.content ?? "{}")
    console.log(result)

   return NextResponse.json({
    score: result.score,
    feedback: result.feedback,
    overallSuggestions: result.overallSuggestions,
})
}