import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import useUserStore from "@/stores/useUserStore"
import { useUser } from "@clerk/clerk-react";
import { HeadphonesIcon, Music, User } from "lucide-react";
import { useEffect } from "react";

const FriendsActivityPanel = () => {
const { users, fetchUsers } = useUserStore();
const { user } = useUser()

const isPlaying = true
const isOnline = true

useEffect(() => {
    if(user) fetchUsers();
  }, [user,fetchUsers]);


  return (
    <div className="h-full rounded-lg flex flex-col bg-gradient-to-b from-[#0f172a]/80 via-[#1e1b4b]/80 to-[#0f172a]/80 shadow-lg"> 
        <div className="p-4 flex justify-between items-center border-b">
            <div className="flex items-center gap-2">
                <User className="size-5 shrink-0"/>
                <h2 className="font-semibold">What they're listening to</h2>
            </div>
        </div>

        {!user && <LoginPrompt />} 

        <ScrollArea className="flex-1">
            <div className="p-4 space-y-4S">
                {users.map((user) => (
                    <div key={user._id} className="p-3 hover:bg-white/5 cursor-pointer rounded-md transition-colors group">
                        <div className="flex items-start gap-3">
                            <div className="relative">
                                <Avatar className="size-10 border border-[#16142a]">
                                    <AvatarImage src={user.imageUrl} alt={user.fullName} />
                                    <AvatarFallback className="text-xs">{user.fullName[0]}</AvatarFallback>
                                </Avatar>

                                {isOnline ? (<div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-[#16142a] rounded-full" />) : (<div className="absolute bottom-0 right-0 w-3 h-3 bg-zinc-500 border-2 border-[#16142a] rounded-full" />)}

                                

                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium">{user.fullName}</span>
                                    {isPlaying && <Music className="size-3.5 text-pink-500 shrink-0" />}
                                </div>

                                {isPlaying ? (
                                    <div className="mt-1">
                                        <div className="mt-1 text-sm text-white font-medium truncate">
                                            Watermelon Sugar
                                        </div>
                                        <div className="mt-1 text-xs text-zinc-400 truncate">
                                            by Harry Styles
                                        </div>
                                    </div>
                                ) : (
                                    <div className="mt-1 text-sm text-zinc-400">
                                        Not listening to music right now
                                    </div> 
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </ScrollArea>
    </div>
  )
}

export default FriendsActivityPanel

const LoginPrompt = () => (
	<div className='h-full flex flex-col items-center justify-center p-6 text-center space-y-4'>
		<div className='relative'>
			<div
				className='absolute -inset-1 bg-gradient-to-r from-pink-600 to-sky-500 rounded-full blur-lg
       opacity-75 animate-pulse'
				aria-hidden='true'
			/>
			<div className='relative bg-[#16142a] rounded-full p-4'>
				<HeadphonesIcon className='size-8 text-purple-500' />
			</div>
		</div>

		<div className='space-y-2 max-w-[250px]'>
			<h3 className='text-lg font-semibold text-white'>See What Friends Are Playing</h3>
			<p className='text-sm text-zinc-400'>
				Login to discover what music your friends are enjoying right now
			</p>
		</div>
	</div>
);
