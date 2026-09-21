import { Paddle,EventName } from "@paddle/paddle-node-sdk"

const paddle = new Paddle(process.env.PADDLE_API_KEY as string)

export async function POST(req: Request){
    const signature =  req.headers.get('paddle-signature') as string
    const rawText = await req.text()

    
}