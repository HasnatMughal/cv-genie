import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req:Request){
    const session = await auth()
    if(!session?.user?.id){
        return NextResponse.json({message: "Unauthorized"}, {status:401})
    }

    const {code} = await req.json()

    const redeemCode = await prisma.radeemCode.findUnique({
        where:{
            code
        }
    })

    if(!redeemCode){
        return NextResponse.json({message:"Invalid code"},{status:400})
    }

    if(redeemCode.isUsed){
        return NextResponse.json({message:"Redeem code used already."},{status:400})
    }

    await prisma.$transaction(
        [
            prisma.radeemCode.update({
                where:{code},
                data:{
                    isUsed:true,
                    usedById:session.user.id,
                    usedAt:new Date
                }
            }),
            prisma.user.update({
                where:{id:session?.user?.id},
                data:{
                    plan:'lifetime'
                }
            })
        ]
        
    )

    return NextResponse.json({message:"Code redeemed successfully."},{status:201})

}