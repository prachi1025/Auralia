import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { Outlet } from "react-router-dom"

const MainLayout = () => {

    const isMobile = false;
  return (
    <div className="min-h-screen flex flex-col">
        <ResizablePanelGroup direction="horizontal" className="flex-1 flex h-full overflow-hidden">
            
            {/* left sidebar */}
            <ResizablePanel defaultSize={20} minSize={isMobile ? 0 : 10} maxSize={30}>
                Left Sidebar
            </ResizablePanel>

            <ResizableHandle className="w-1 bg-transparent rounded-lg transition-colors" />

            {/* main content */}
            <ResizablePanel defaultSize={isMobile? 80 : 60}>
                <Outlet />
            </ResizablePanel>

            <ResizableHandle className="w-1 bg-transparent rounded-lg transition-colors" />
          
            {/* right sidebar */}
            <ResizablePanel defaultSize={20} minSize={0} maxSize={25} collapsedSize={0}>
                Right Sidebar   
            </ResizablePanel>
        </ResizablePanelGroup>
    </div>
  )
}

export default MainLayout