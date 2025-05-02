
import React from 'react';
import { ChatProvider } from '@/context/ChatContext';
import Sidebar from '@/components/Sidebar';
import ChatInterface from '@/components/ChatInterface';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

const Index = () => {
  const isMobile = useIsMobile();
  const [showSidebar, setShowSidebar] = React.useState(!isMobile);
  
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  
  return (
    <ChatProvider>
      <div className="flex h-screen w-full overflow-hidden bg-background">
        {showSidebar && !isMobile && <Sidebar />}
        {showSidebar && isMobile && (
          <div className="absolute inset-0 z-50 bg-black/10">
            <div className="h-full w-3/4 max-w-xs">
              <Sidebar />
            </div>
            <div className="absolute inset-0 z-[-1]" onClick={toggleSidebar}></div>
          </div>
        )}
        
        <div className="flex-1 flex flex-col h-full relative">
          <div className="absolute top-4 left-4 z-10">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-9 w-9" 
              aria-label="Menu"
              onClick={toggleSidebar}
            >
              <Menu size={18} />
            </Button>
          </div>
          
          <ChatInterface />
        </div>
      </div>
    </ChatProvider>
  );
};

export default Index;
