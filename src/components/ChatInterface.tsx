
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
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold">BookWorm Chat</h2>
        {isAdmin && <FileUpload />}
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <div className="flex flex-col">
          {messages.map((message) => (
            <Message key={message.id} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about your course materials..."
            className="flex-1"
          />
          <Button onClick={handleSendMessage} size="icon" disabled={input.trim() === ''}>
            <Send size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
