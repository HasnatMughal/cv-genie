import Credentials from "next-auth/providers/credentials"
import NextAuth from "next-auth"
import prisma from "./prisma"
import bcrypt from "bcryptjs"



export const {handlers, signIn, signOut, auth} = NextAuth({
    providers:[
        Credentials({
            credentials: {
                email: {label: "Email", type: "email"},
                password: {label: "Password", type: "password"}
            },
            authorize: async(credentials:any) => {
               const user:any = await prisma.user.findUnique({where: {email:credentials?.email}})

               if(!user) return null

               const isMatch = await bcrypt.compare(credentials?.password,user?.password)

               if(!isMatch) return null

               return user
                
            },
            
        }),
        
    ],
    callbacks:{
        async jwt({token, user}) {
            if(user){
                token.id = user.id
            }
            return token
        },
        async session({session, token}){
            if(session.user){
                session.user.id = token.id as string
            }
            return session
        }
    }

})