
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send } from 'lucide-react';
import Message from './Message';
import FileUpload from './FileUpload';
import { useChat } from '@/context/ChatContext';

const ChatInterface: React.FC = () => {
  const { messages, addMessage, isAdmin } = useChat();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = () => {
    if (input.trim() === '') return;
    
    addMessage({
      content: input.trim(),
      sender: 'user',
    });
    
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-full bg-[#f5f1e9]">
      <div className="flex items-center justify-between p-4 border-b border-[#d4c8b8] bg-[#fcf9f3]">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-serif font-semibold text-[#6b5b46]">BookWorm Academic Chat</h2>
          <span className="text-xs font-medium text-[#a39179] px-2 py-1 rounded-full bg-[#f0e8d9]">Literature Department</span>
        </div>
        {isAdmin && <FileUpload />}
      </div>
      
      <ScrollArea className="flex-1 p-4 bg-[#f5f1e9] bg-opacity-60">
        <div className="flex flex-col space-y-4">
          {messages.map((message) => (
            <Message key={message.id} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      
      <div className="p-4 border-t border-[#d4c8b8] bg-[#fcf9f3]">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about your course materials..."
            className="flex-1 border-[#d4c8b8] bg-[#fefcf9] text-[#6b5b46] placeholder:text-[#a39179]/70 focus-visible:ring-[#a39179]"
          />
          <Button 
            onClick={handleSendMessage} 
            size="icon" 
            disabled={input.trim() === ''} 
            className="bg-[#a39179] hover:bg-[#8c7d65] text-white"
          >
            <Send size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
