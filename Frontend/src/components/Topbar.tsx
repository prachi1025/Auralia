import { SignedIn, SignedOut, SignOutButton } from "@clerk/clerk-react"
import { LayoutDashboardIcon } from "lucide-react"
import { Link } from "react-router-dom"
import SignInAuthButtons from "./SignInAuthButtons.tsx"

const Topbar = () => {
    const isAdmin = true
  return (
    <div className="flex items-center justify-between p-2 sticky top-0 bg-gradient-to-r from-[#0f172a] via-[#1e1b4b] to-[#0f172a] border-b border-white/10 backdrop:blur-md">
        <div className="flex gap-2 items-center">
            <img src= "Auralia-Logo.png" alt="Auralia Logo" className="h-10 w-auto object-contain"/> 

            <span className="text-xl font-semibold bg-gradient-to-r from-pink-500 via-purple-400 to-sky-400 bg-clip-text text-transparent drop-shadow-[0_0_6px_rgba(168,85,247,0.7)]">
                Auralia
            </span>
        </div>

        <div className="flex items-center gap-4">
            {isAdmin && (
                <Link to={"/admin"}>
                    <LayoutDashboardIcon className="size-4 mr-2" /> Admin Dashboard 
                </Link>
            )}

            <SignedOut>
                <SignInAuthButtons />
            </SignedOut>

            <SignedIn>
                <SignOutButton />
            </SignedIn>
        </div>

    </div>
  )
}

export default Topbar