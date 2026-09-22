import prisma from "@/lib/prisma"
import { Paddle,EventName } from "@paddle/paddle-node-sdk"
import { NextResponse } from "next/server"

const paddle = new Paddle(process.env.PADDLE_API_KEY as string)

export async function POST(req: Request){
    const signature =  req.headers.get('paddle-signature') as string
    const rawText = await req.text()

    try {
        const event = await paddle.webhooks.unmarshal(
            rawText,
            process.env.PADDLE_WEBHOOK_SECRET as string,
            signature
        )

        if(event.eventType === EventName.TransactionCompleted){
            const userId = event.data.customData?.userId as string

            if(userId){
                await prisma?.user?.update({
                    where:{id:userId},
                    data:{plan:'paid'}
                })
            }
        }
        if(event.eventType === EventName.TransactionCanceled){
            const userId = event.data.customData?.userId as string

            if(userId){
                await prisma?.user?.update({
                    where:{id:userId},
                    data:{plan:'free'}
                })
            }
        }
        return NextResponse.json({received:true})
    } catch (error) {
        return NextResponse.json({error:"Invalid signature"}, {status:400})
    }

}