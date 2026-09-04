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