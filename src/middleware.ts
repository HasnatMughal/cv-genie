export {auth as middleware} from '@/lib/auth';

export const config = 
    {
        matcher: [
             "/dashboard/:path*",
        "/settings/:path*",
        "/CoverLetter/:path*",
        "/ResumeAnalysis/:path*",
        "/JobMatcher/:path*",
        "/interViewPrep/:path*",
        "/LinkedInOpt/:path*",
        "/cold-email/:path*",
        ]
    }
