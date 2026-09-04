import { auth } from "@/lib/auth";
import pdfToText from "@/lib/pdfparse";
import prisma from "@/lib/prisma";
import Groq from "groq-sdk";
import { NextResponse } from "next/server";

export async function POST(){
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

    const response = await groq.chat.completions.create({
        messages: [
            {
                role: 'system',
                content: `You are an expert ATS (Applicant Tracking System) resume reviewer and career coach.Analyze the given resume and return your evaluation strictly as valid JSON, with no extra text before or after it, in this exact format:

{
  "score": <number between 0-100>,
  "strengths": ["point 1", "point 2", ...],
  "weaknesses": ["point 1", "point 2", ...],
  "suggestions": ["actionable suggestion 1", "actionable suggestion 2", ...],
  "missingKeywords": ["keyword1", "keyword2", ...]
}

Score based on: ATS-friendliness (formatting, parseable sections), use of quantified 
achievements, strong action verbs, keyword relevance, and overall clarity. Be honest 
and specific — avoid generic feedback.`
                
            },
            {
                role: "user",
                content: `Analyze this resume:\n\n${pdfText}`
            }
        
        ],
        model: 'openai/gpt-oss-120b',
        response_format: {type: "json_object"}
    })

    const result = JSON.parse(response.choices[0].message.content ?? "{}")

    const analysis = await prisma.resume.create({
        data: {
            content : pdfText,
            score: result.score,
            feedback:JSON.stringify({
                strengths: result.strengths,
                weaknesses: result.weaknesses,
            suggestions: result.suggestions,
            missingKeywords: result.missingKeywords,
            }),
            userId: user?.id
        }
    })

    return NextResponse.json(analysis)
}

