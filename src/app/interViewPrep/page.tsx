"use client"

import ResultView from "@/components/ResultView"
import useGetUserPlan from "@/hooks/useGetUserPlan"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "sonner"



export default function InterviewPrep(){

 

    const [jobTitle, setJobTitle] = useState('')
    const [userResume , setUserResume] = useState('')
    const [questions, setQuestions] = useState([])
    const [answers, setAnswers] = useState<string[]>(Array(7).fill(''))
    const [result, setResult] = useState('')
    const [answer,setAnswer] = useState('')

    const { data: session, status } = useSession()
        const router = useRouter()
    
        
       const userPlan = useGetUserPlan()
    
        useEffect(() => {
            if (status === "unauthenticated") {
                router.push("/login")
            }
            if(userPlan.userPlan === 'free'){
                router.push('/UpgradeToPro')
            }
        }, [status, router, userPlan.userPlan])

    const handleAnswer = (index:number, value:string) =>{
        const updated = [...answers]
        updated[index] = value
        setAnswers(updated)
        //  console.log('success')
    }

    const getUser = async () => {
        try {
            const res = await fetch(`/api/user/me`,{
                method:"GET"
            })
            if(res.ok){
                const data = await res.json()
               setUserResume(data.body.resume)
            }
        } catch (error) {
            
        }
    }

    useEffect(() => {
        getUser()
    })

    const handleQuestionsReq = async() => {
        try {
            const res = await fetch(`/api/interview-prep/questions`,{
                method:"POST",
                body: JSON.stringify({jobTitle})
            })
            if(res.ok){
                const data = await res.json()
                // console.log(data)
                setQuestions(data.questions)
            }
        } catch (error) {
            
        }
    }

    const getFeedback = async() => {
        try {
            const res = await fetch(`/api/interview-prep/answers`, {
                method: "POST",
                body: JSON.stringify({jobTitle, answers, questions})
            })

            if(res.ok){
                const data = await res.json()
                console.log(data)
                setResult(data)
            }
        } catch (error) {
            
        }
    }


    if (status === "loading") return <div>Loading...</div>
    if (!session) return null
    
    return(
       <div className="min-h-screen w-full">
    <h1 className="text-3xl font-semibold text-center">Interview Preparation</h1>

    <div className="flex md:flex-row flex-col items-start justify-between gap-2">
      
        <div className="flex flex-col gap-4 w-full md:w-1/3 md:min-h-screen border border-gray-200 shadow-md self-start items-center ">
            <form
                className="flex flex-col justify-center p-4 items-start gap-4"
                onSubmit={(e) => {
                    e.preventDefault()
                    handleQuestionsReq()
                }}
            >
                <div>
                    <p>Job Title</p>
                    <input
                        type="text"
                        value={jobTitle}
                        onChange={(e: any) => setJobTitle(e.target.value)}
                        className="min-w-72 border-gray-200 w-full border p-2"
                    />
                </div>

                {userResume ? (
                    <p className="text-xs">
                        We have your resume — we&apos;ll generate interview questions based on it and current market expectations.
                    </p>
                ) : null}

                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white w-full py-2"
                >
                    Submit
                </button>
            </form>
        </div>

      
        <div className="border border-gray-200 p-4 w-full md:w-2/3 flex flex-col md:min-h-screen">
            {result ? (
                <ResultView result={result} />
            ) : (
                <>
                    <h1 className="font-semibold text-2xl">
                       Your interview questions will appear here.
                    </h1>
                    <p className="text-sm mb-4">
                        Enter your target job title, and we'll generate personalized questions based on your resume.
                    </p>

                    {questions.map((q, i) => (
                        <div className="w-full mb-6" key={i}>
                            <textarea
                                value={q}
                                className="min-w-72 w-full border border-gray-200 p-4 min-h-32 h-auto"
                                readOnly
                            />

                            <form
                                className="flex gap-2 items-center mt-2"
                                onSubmit={(e: any) => {
                                    e.preventDefault()
                                    handleAnswer(i, answer)
                                }}
                            >
                                <textarea
                                    onChange={(e: any) => setAnswer(e.target.value)}
                                    className="min-w-72 w-full border border-gray-200 p-4 min-h-32 h-auto"
                                    placeholder="Type your answer here..."
                                />
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 px-4 py-2 text-white rounded-xl"
                                    type="submit"
                                >
                                    Submit
                                </button>
                            </form>
                        </div>
                    ))}

                    {questions.length > 0 && (
                        <button
                            onClick={() => {
                                if (answers.some((a) => a.trim() === "")) {
                                    toast.error("Please answer all questions before ending the test")
                                    return
                                }
                                getFeedback()
                            }}
                            className="w-full px-4 py-2 text-white bg-blue-500 hover:bg-blue-700 mt-5"
                        >
                            End Test
                        </button>
                    )}
                </>
            )}
        </div>
    </div>
</div>) }