import { useState } from "react";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { Outlet } from "react-router-dom"
import LeftSidebar from "./components/LeftSidebar";

const MainLayout = () => {
  const isMobile = false;
  const [isCompact, setIsCompact] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <ResizablePanelGroup direction="horizontal" className="flex-1 flex h-full overflow-hidden">
        
        {/* left sidebar */}
        <ResizablePanel 
          defaultSize={20} 
          minSize={isMobile ? 0 : 12} 
          maxSize={30}
          onResize={(size) => {
            // 👇 agar sidebar size ≤ 20% hai toh compact mode on
            setIsCompact(size <= 20);
          }}
        >
          <LeftSidebar isCompact={isCompact} />
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
