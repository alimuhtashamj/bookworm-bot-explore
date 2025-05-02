
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChatProvider } from '@/context/ChatContext';
import Sidebar from '@/components/Sidebar';
import ChatInterface from '@/components/ChatInterface';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

const Index = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(!isMobile);
  
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  
  return (
    <ChatProvider>
      <div className="flex h-screen w-full overflow-hidden bg-[#f5f1e9]">
        {showSidebar && !isMobile && <Sidebar />}
        {showSidebar && isMobile && (
          <div className="absolute inset-0 z-50 bg-black/20">
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
              className="h-10 w-10 text-[#6b5b46] hover:bg-[#e0d6c8]" 
              aria-label="Menu"
              onClick={toggleSidebar}
            >
              <Menu size={20} />
            </Button>
          </div>
          
          <div className="absolute top-4 right-4 z-10">
            <Button 
              variant="outline" 
              size="sm" 
              className="border-[#d4c8b8] bg-[#fcf9f3] text-[#6b5b46] hover:bg-[#e0d6c8]"
              onClick={() => navigate('/signup')}
            >
              Sign Up
            </Button>
          </div>
          
          <ChatInterface />
        </div>
      </div>
    </ChatProvider>
  );
};

export default Index;
