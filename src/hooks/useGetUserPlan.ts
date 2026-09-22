import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function useGetUserPlan() {
  const [userPlan, setUserPlan] = useState<string | null>('free')
  const [checking, setChecking] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const getUserPlan = async() => {
        try {
            const res = await fetch(`/api/user/me`,{
                method:"GET"
            })
            if(res.ok){
                const data = await res.json()
                setUserPlan(data?.body?.plan)
            }
        } catch (error) {
            console.log(error)
        }
        finally{
            setChecking(false)
        }
    }
   getUserPlan()
  }, [])

  return {checking, userPlan}
}



export default useGetUserPlan