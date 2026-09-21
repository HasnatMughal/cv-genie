import { auth } from "@/lib/auth";
import { createUploadthing,FileRouter } from "uploadthing/server";



const f = createUploadthing()

export const ourFileRouter = {
    resumeUploader:f({
        pdf:{
            maxFileSize: "4MB"
        }
    }).onUploadComplete(async ({file}:any) => console.log(file.url))
} satisfies FileRouter

export type ourFileRouter = typeof ourFileRouter

// export const ourImageRouter = {
//     imageRouter:f({
//         image:{
//             maxFileSize:"4MB"
//         }
//     }).middleware(async () => {
//         const session = await auth()
//         if(!session?.user?.id) throw new Error("Unauthorized")
//             return {userId:session?.user?.id}
//     })
//     .onUploadComplete(async ({metadata, file}:any) => {
//         console.log(file.url)
//     })
// }