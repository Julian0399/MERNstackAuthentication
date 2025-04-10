"use client"
import { UseUserContext } from "@/context/userContext"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const useRedirect = (redirect : string) => {
    const {userLoginStatus} = UseUserContext()
    const router = useRouter()

    useEffect(() =>{
        const redirectUser = async () => {
            try {
                const isLoggedIn = await userLoginStatus()
                console.log("isLoggedIn 2",isLoggedIn)
                if(!isLoggedIn) {
                    router.push(redirect)
                }
            } catch (error) {
                console.error("Error redirecting User:", error)
            }
        }
        redirectUser()
    },[redirect,userLoginStatus,router])
}

export default useRedirect