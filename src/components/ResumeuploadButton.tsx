'use client'

import { UploadButton } from '@/lib/uploadthing'
import React, { useState } from 'react'


function ResumeuploadButton() {
const [resumeFile, setResumeFile] = useState('')

    const uploadResume = async (resume:String) => {
        try {
            const uploadRes = await fetch(`/api/user/me`, 
               { method:"PATCH",
                body:JSON.stringify({resume:resume})
                }
            )
            
        } catch (error) {
            
        }
    }
  return (
    <>
    <UploadButton endpoint="resumeUploader" 
            onClientUploadComplete={ (res) => {
                const fileUrl = res[0].ufsUrl
                setResumeFile(fileUrl)
                 uploadResume(fileUrl)
            
            }
            
            }
            className='bg-blue-500 rounded-2xl mt-5 hover:bg-blue-700 p-4' />
    </>
  )
}

export default ResumeuploadButton