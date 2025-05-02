
import React from 'react';
import { MessageType } from '@/utils/types';
import { cn } from '@/lib/utils';
import { Book, User } from 'lucide-react';

type MessageProps = {
  message: MessageType;
};

const Message: React.FC<MessageProps> = ({ message }) => {
  const isBot = message.sender === 'bot';
  
  return (
    <div
      className={cn(
        'flex gap-3 max-w-[80%] mb-4',
        isBot ? 'self-start' : 'self-end ml-auto'
      )}
    >
      {isBot && (
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
          <Book className="h-4 w-4 text-primary-foreground" />
        </div>
      )}
      
      <div
        className={cn(
          'p-3 rounded-lg',
          isBot ? 'bg-accent text-accent-foreground' : 'bg-primary text-primary-foreground'
        )}
      >
        <p className="text-sm">{message.content}</p>
        <p className="text-xs opacity-70 mt-1">
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
      
      {!isBot && (
        <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
          <User className="h-4 w-4 text-secondary-foreground" />
        </div>
      )}
    </div>
  );
};

export default Message;
