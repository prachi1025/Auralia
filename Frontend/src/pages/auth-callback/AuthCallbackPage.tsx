import { Card, CardContent } from "@/components/ui/card"
import { useUser } from "@clerk/clerk-react"
import { useNavigate } from "react-router-dom"
import Loader from "@/components/Loader"
import { useEffect, useRef } from "react"
import { axiosInstance } from "@/lib/axios"

const AuthCallbackPage = () => {
    const { user, isLoaded } = useUser()
    const navigate = useNavigate()

    const syncAttempted = useRef(false)

    useEffect(() => {
        const syncUser = async () => {
            try {
                if (!isLoaded || !user || syncAttempted.current) {
                    return; // Wait until user is loaded
                }
                await axiosInstance.post("/auth/callback", {
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    imageUrl: user.imageUrl,
                })

                syncAttempted.current = true; // Mark as attempted to prevent multiple calls
                } catch (error) {
                console.error("Error syncing user data in auth callback:", error)
            } finally {
                navigate("/"); // Redirect to home after syncing
            }
        }

        syncUser()
    }, [isLoaded, user, navigate])
  return (
    <div className="min-h-screen w-full flex justify-center items-center">
        <Card className="w-[90%] max-w-md">
            <CardContent className="flex flex-col items-center gap-4 pt-6">
               <Loader />
               <h3 className="text-xl font-bold text-sky-200"> Logging you in </h3>
               <p className="text-sm text-slate-300"> Redirecting... </p>
            </CardContent>
        </Card>
    </div>
  )
}

export default AuthCallbackPage