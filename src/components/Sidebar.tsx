
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Book, BookOpen, Menu } from 'lucide-react';
import { useChat } from '@/context/ChatContext';
import { CourseType } from '@/utils/types';

export const Sidebar = () => {
  const { courses, isSidebarOpen, toggleSidebar, departmentName, universityLogo } = useChat();

  if (!isSidebarOpen) {
    return (
      <div className="fixed top-0 left-0 h-full z-10">
        <Button 
          onClick={toggleSidebar} 
          variant="ghost" 
          className="p-2 m-2 h-10 w-10"
          aria-label="Open sidebar"
        >
          <Menu size={20} />
        </Button>
      </div>
    );
  }

  return (
    <div className="w-64 bg-sidebar h-screen border-r border-border flex flex-col">
      <div className="p-4 flex flex-col items-center justify-between">
        {universityLogo && (
          <div className="w-full flex justify-center mb-3">
            <img 
              src={universityLogo} 
              alt="University Logo" 
              className="h-16 w-auto object-contain"
            />
          </div>
        )}
        <div className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-primary" />
          <h1 className="text-lg font-bold">BookWorm Bot</h1>
        </div>
        {departmentName && (
          <p className="text-sm text-muted-foreground mt-1">{departmentName}</p>
        )}
        <Button 
          onClick={toggleSidebar} 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 absolute top-4 right-4"
          aria-label="Close sidebar"
        >
          <Menu size={18} />
        </Button>
      </div>
      
      <Separator />
      
      <ScrollArea className="flex-1 p-4">
        <CoursesList courses={courses} />
      </ScrollArea>
    </div>
  );
};

const CoursesList = ({ courses }: { courses: CourseType[] }) => {
  if (courses.length === 0) {
    return <div className="text-muted-foreground text-sm py-4">No courses available</div>;
  }

  return (
    <div className="space-y-4">
      {courses.map((course) => (
        <div key={course.id} className="p-3 border rounded-md bg-card hover:bg-accent cursor-pointer transition-colors">
          <div className="flex items-start gap-2">
            <Book className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <h3 className="font-medium">{course.name}</h3>
              {course.description && (
                <p className="text-sm text-muted-foreground">{course.description}</p>
              )}
              <p className="text-xs text-muted-foreground mt-1">{course.files.length} files</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
