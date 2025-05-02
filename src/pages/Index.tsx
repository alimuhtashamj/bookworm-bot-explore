
import React from 'react';
import { ChatProvider } from '@/context/ChatContext';
import Sidebar from '@/components/Sidebar';
import ChatInterface from '@/components/ChatInterface';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const isMobile = useIsMobile();
  
  return (
    <ChatProvider>
      <div className="flex h-screen w-full overflow-hidden">
        {!isMobile && <Sidebar />}
        <div className="flex-1 flex flex-col h-full">
          <ChatInterface />
        </div>
      </div>
    </ChatProvider>
  );
};

export default Index;
