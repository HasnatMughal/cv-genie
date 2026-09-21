import { auth } from "@/lib/auth";
import pdfToText from "@/lib/pdfparse";
import prisma from "@/lib/prisma";
import Groq from "groq-sdk";
import { NextResponse } from "next/server";

export async function POST() {
    const session = await auth();
    if (!session?.user?.id) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({ where: { id: session.user.id } });
    if (!user?.resume) {
        return NextResponse.json({ message: "No resume uploaded" }, { status: 400 });
    }

    const resumeText = await pdfToText(user.resume);

    const groq = new Groq({
        apiKey: process.env.GROQ_API_KEY
    })

    const completion = await groq.chat.completions.create({
        messages: [
            {
                role: "system",
                content: `You are an expert LinkedIn profile writer. Based on the candidate's resume, write a compelling LinkedIn headline and About section. Return strictly valid JSON:
{
  "headline": "...",
  "about": "..."
}`,
            },
            { role: "user", content: `Resume:\n${resumeText}` },
        ],
        model: "openai/gpt-oss-120b",
        response_format: { type: "json_object" },
    });

    const result = JSON.parse(completion.choices[0].message.content ?? "{}");

    const linkedInProfile = await prisma.linkedInOpt.create({
        data: {
            headline: result.headline,
            about: result.about,
            userId: session.user.id,
        },
    });

    return NextResponse.json(linkedInProfile);
}