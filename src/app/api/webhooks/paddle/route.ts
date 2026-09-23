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

        switch (event.eventType){
            case EventName.TransactionCompleted : {
                const userId = event.data.customData?.userId as string
                const customerId = event.data.customerId as string
                const subscriptionId = event.data.subscriptionId as string;

                if(userId){
                    await prisma.user?.update({
                        where:{id:userId},
                        data:{
                            plan:'paid',
                            paddleCustomerId:customerId,
                            paddleSubscriptionId:subscriptionId
                            
                        }
                    })
                }
                break
            }

            case EventName.TransactionCanceled : {
                const subscriptionId = event.data.id

                await prisma.user.updateMany({
                    where:{ paddleSubscriptionId: subscriptionId },
                    data:{plan:'free'}
                })
                break
            }
            case EventName.SubscriptionPastDue : {
                 const subscriptionId = event.data.id

                await prisma.user.updateMany({
                    where: { paddleSubscriptionId: subscriptionId },
                    data: { plan: "free" }, 
                })
                break
            }
default:

break
        }

        return NextResponse.json({received:true})
    } catch (error) {
        return NextResponse.json({error:"Invalid signature"}, {status:400})
    }

}