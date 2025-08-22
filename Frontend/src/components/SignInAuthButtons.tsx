import { useSignIn } from "@clerk/clerk-react"
import { Button } from "./ui/button"

const SignInAuthButtons = () => {
    const { signIn, isLoaded } = useSignIn()

    if (!isLoaded) {
        return null
    }   

    const signInWithGoogle = async () => {
        await signIn.authenticateWithRedirect({
            strategy: "oauth_google",
            redirectUrl: `/sso-callback`,
            redirectUrlComplete: `/auth-callback`,
        })
    }

  return (
    <Button onClick={signInWithGoogle} variant={"secondary"} className="relative overflow-hidden rounded-xl px-3 py-2 font-medium text-white bg-gradient-to-r from-pink-500 via-purple-500 to-sky-500 shadow-[0_0_12px_rgba(168,85,247,0.6)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(168,85,247,0.9)] active:scale-95">
        <img src="Google-Logo-Blue.png" alt="Google Logo" className="h-5 w-5 inline-block" />
        <span className="relative z-10 hidden sm:inline">Continue with Google</span>
      {/* Subtle glowing overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-400 via-purple-400 to-sky-400 opacity-30 blur-xl animate-pulse"></div>
    </Button>
  )
}

export default SignInAuthButtons