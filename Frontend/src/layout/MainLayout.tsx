import { useState } from "react"
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable"
import { Outlet } from "react-router-dom"
import LeftSidebar from "./components/LeftSidebar"
import FriendsActivityPanel from "./components/FriendsActivityPanel"
import AudioPlayer from "./components/AudioPlayer"
import PlaybackControls from "./components/PlaybackControls"

const MainLayout = () => {
	const isMobile = false
	const [isCompact, setIsCompact] = useState(false)

	return (
		<div className='h-screen flex flex-col overflow-hidden'>
			<ResizablePanelGroup
				direction='horizontal'
				className='flex-1 flex overflow-hidden'>
				<AudioPlayer />

				{/* left sidebar */}
				<ResizablePanel
					defaultSize={15}
					minSize={isMobile ? 0 : 6}
					maxSize={20}
					onResize={(size) => {
						setIsCompact(size <= 9)
					}}>
					<LeftSidebar isCompact={isCompact} />
				</ResizablePanel>

				<ResizableHandle className='w-1 bg-transparent rounded-lg transition-colors' />

				{/* main content */}
				<ResizablePanel
					defaultSize={isMobile ? 80 : 69}
					className='overflow-hidden'>
					<div className='h-full overflow-y-auto'>
						<Outlet />
					</div>
				</ResizablePanel>

				<ResizableHandle className='w-1 bg-transparent rounded-lg transition-colors' />

				{/* right sidebar */}
				<ResizablePanel
					defaultSize={16}
					minSize={0}
					maxSize={20}
					collapsedSize={0}>
					<FriendsActivityPanel />
				</ResizablePanel>
			</ResizablePanelGroup>

			<div className='shrink-0'>
				<PlaybackControls />
			</div>
		</div>
	)
}

export default MainLayout
