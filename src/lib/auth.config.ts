import { NextAuthConfig } from "next-auth";
import { redirect } from "next/navigation";

export const authConfig : NextAuthConfig = {
    providers:[],
    pages:{
        signIn:'/login'
    },
    callbacks:{
        authorized({auth, request}){
            const isLoggedIn = !!auth?.user
            const isOnProtectedRoute = request.nextUrl.pathname.startsWith('/dashboard') || 
            request.nextUrl.pathname.startsWith('/settings') ||
            request.nextUrl.pathname.startsWith('/CoverLetter') ||
            request.nextUrl.pathname.startsWith('/ResumeAnalysis') ||
            request.nextUrl.pathname.startsWith('/interViewPrep') ||
            request.nextUrl.pathname.startsWith('/cold-email') ||
            request.nextUrl.pathname.startsWith('/LinkedInOpt') ||
            request.nextUrl.pathname.startsWith('/UploadResume') ||
            request.nextUrl.pathname.startsWith('/JobMatcher') ||
            request.nextUrl.pathname.startsWith('/UpgradeToPro') 

            

            if(isOnProtectedRoute && !isLoggedIn){
                return false
            }

          

            return true
        }
    }
} 