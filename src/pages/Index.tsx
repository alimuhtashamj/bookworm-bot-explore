
import React from 'react';
import { ChatProvider } from '@/context/ChatContext';
import Sidebar from '@/components/Sidebar';
import ChatInterface from '@/components/ChatInterface';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

const Index = () => {
  const isMobile = useIsMobile();
  
  return (
    <ChatProvider>
      <div className="flex h-screen w-full overflow-hidden">
        {!isMobile && <Sidebar />}
        <div className="flex-1 flex flex-col h-full relative">
          {isMobile && (
            <div className="absolute top-4 left-4 z-10">
              <Button variant="ghost" size="icon" className="h-10 w-10" aria-label="Menu">
                <Menu size={20} />
              </Button>
            </div>
          )}
          <ChatInterface />
        </div>
      </div>
    </ChatProvider>
  );
};

export default Index;
