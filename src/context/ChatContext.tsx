
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { MessageType, FileType, CourseType } from '../utils/types';

interface ChatContextProps {
  messages: MessageType[];
  files: FileType[];
  courses: CourseType[];
  addMessage: (message: Omit<MessageType, 'id' | 'timestamp'>) => void;
  uploadFile: (file: Omit<FileType, 'id' | 'uploadDate'>) => void;
  addCourse: (course: Omit<CourseType, 'id' | 'files'>) => void;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  departmentName: string;
  universityLogo: string;
  isAdmin: boolean;
}

const ChatContext = createContext<ChatContextProps | undefined>(undefined);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<MessageType[]>([
    {
      id: '1',
      content: 'Welcome to BookWorm Bot! I can help you explore your course materials. Ask me questions about your courses and I\'ll find relevant information for you.',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);

  const [files, setFiles] = useState<FileType[]>([]);
  const [courses, setCourses] = useState<CourseType[]>([
    { id: '1', name: 'Introduction to Computer Science', description: 'CS101', files: [] },
    { id: '2', name: 'Advanced Mathematics', description: 'MATH202', files: [] },
    { id: '3', name: 'Literature Studies', description: 'LIT303', files: [] },
  ]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // University information
  const departmentName = "Department of Computer Science";
  const universityLogo = "https://images.unsplash.com/photo-1551038247-3d9af20df552?auto=format&fit=crop&w=400&h=400";
  
  // For development/demo purposes, set isAdmin to true
  // In a real-world application, this would be determined by authentication
  const isAdmin = true;

  const addMessage = (message: Omit<MessageType, 'id' | 'timestamp'>) => {
    const newMessage: MessageType = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, newMessage]);
    
    // Simple bot response simulation
    if (message.sender === 'user') {
      setTimeout(() => {
        // Check if the message is asking about files/materials
        const query = message.content.toLowerCase();
        
        if (query.includes('material') || query.includes('book') || query.includes('file') || query.includes('document')) {
          // Show relevant files based on the query
          const fileResponse = files.length > 0 
            ? `I found these materials that might be relevant to your query:\n\n${files.map(file => `- ${file.name}`).join('\n')}`
            : `I couldn't find any materials related to your query. Please ask your instructor to upload relevant materials.`;
            
          const botResponse: MessageType = {
            id: (Date.now() + 1).toString(),
            content: fileResponse,
            sender: 'bot',
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, botResponse]);
        } else {
          const botResponse: MessageType = {
            id: (Date.now() + 1).toString(),
            content: `I'm processing your question about "${message.content}". In a real implementation, this would query your uploaded materials.`,
            sender: 'bot',
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, botResponse]);
        }
      }, 1000);
    }
  };

  const uploadFile = (file: Omit<FileType, 'id' | 'uploadDate'>) => {
    const newFile: FileType = {
      ...file,
      id: Date.now().toString(),
      uploadDate: new Date(),
    };
    setFiles((prev) => [...prev, newFile]);
    
    // Add confirmation message
    const botResponse: MessageType = {
      id: (Date.now() + 1).toString(),
      content: `I've successfully uploaded "${file.name}". You can now ask questions about this material.`,
      sender: 'bot',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, botResponse]);
  };

  const addCourse = (course: Omit<CourseType, 'id' | 'files'>) => {
    const newCourse: CourseType = {
      ...course,
      id: Date.now().toString(),
      files: [],
    };
    setCourses((prev) => [...prev, newCourse]);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        files,
        courses,
        addMessage,
        uploadFile,
        addCourse,
        isSidebarOpen,
        toggleSidebar,
        departmentName,
        universityLogo,
        isAdmin,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = (): ChatContextProps => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
