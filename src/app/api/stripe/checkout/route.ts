import { auth } from "@/lib/auth";
import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";

export async function POST(){
    const session = await auth()
    if(!session?.user?.id){
        return NextResponse.json({message:"Unauthorized"}, {status:401})
    }
    const checkOutSession = await stripe.checkout.sessions.create({
        
        mode:'subscription',
        payment_method_types:['card'],
        line_items:[
            {
                price:process.env.STRIPE_PRO_PRICE_ID,
                quantity:1
            }
        ],
        success_url:`${process.env.APP_URL}/dashboard?success=true`,
        cancel_url:`${process.env.APP_URL}/dashboard?canceled=true`,

        metadata:{
            userId:session?.user?.id
        }
    })

    return NextResponse.json({url:checkOutSession.url})
}