import { SignedIn, SignedOut, SignOutButton } from "@clerk/clerk-react"
import { LayoutDashboardIcon, LogOut } from "lucide-react"
import { Link } from "react-router-dom"
import SignInAuthButtons from "./SignInAuthButtons.tsx"
import { Button } from "./ui/button.tsx"

import AuraliaLogo from "../assets/Auralia-Logo.png"

const Topbar = () => {
    const isAdmin = false
  return (
    <div className="flex items-center justify-between p-2 sticky top-0 bg-gradient-to-r from-[#0f172a] via-[#1e1b4b] to-[#0f172a] border-b border-white/10 backdrop:blur-md">
        <div className="flex gap-2 items-center">
            <img src= {AuraliaLogo} alt="Auralia Logo" className="h-10 w-auto object-contain"/> 

            <span className="text-xl font-semibold bg-gradient-to-r from-pink-500 via-purple-400 to-sky-400 bg-clip-text text-transparent drop-shadow-[0_0_6px_rgba(168,85,247,0.7)]">
                Auralia
            </span>
        </div>

        <div className="flex items-center gap-4">
            {isAdmin && (
                <Link to={"/admin"} className="relative whitespace-nowrap flex items-center gap-2 px-3 py-2 rounded-xl 
               bg-slate-900/70 hover:bg-slate-800/80 
               border border-white/10 
               text-slate-200 
               font-medium text-sm 
               transition-all duration-300 
               hover:scale-105 active:scale-95
               shadow-[0_0_12px_rgba(56,189,248,0.25)] 
               hover:shadow-[0_0_20px_rgba(56,189,248,0.4)]">
                {/* Glowing overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r 
                    from-sky-400/20 via-purple-400/20 to-pink-400/20 
                    opacity-30 blur-xl animate-pulse rounded-xl"></div>

                    <LayoutDashboardIcon className="size-5 relative z-10" /> 
                    <span className="relative z-10 hidden md:inline">Admin Dashboard</span> 
                </Link>
            )}

            <SignedOut>
                <SignInAuthButtons />
            </SignedOut>

            <SignedIn>
                <SignOutButton>
                    <Button
                        className="relative whitespace-nowrap flex items-center gap-2 px-3 py-2 rounded-xl 
                                bg-slate-900/70 hover:bg-slate-800/80 
                                border border-white/10 
                                text-slate-200 
                                font-medium text-sm 
                                transition-all duration-300 
                                hover:scale-105 active:scale-95
                                shadow-[0_0_12px_rgba(56,189,248,0.25)] 
                                hover:shadow-[0_0_20px_rgba(56,189,248,0.4)]"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r 
                                        from-pink-400/20 via-purple-400/20 to-sky-400/20 
                                        opacity-30 blur-xl animate-pulse rounded-xl"></div>

                        <LogOut className="size-5 relative z-10" />
                        <span className="relative z-10 hidden md:inline">Sign Out</span>
                    </Button>
                </SignOutButton>
            </SignedIn>
        </div>
    </div>
  )
}

export default Topbar