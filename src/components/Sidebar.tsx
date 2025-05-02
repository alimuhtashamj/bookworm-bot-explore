
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Book, BookOpen, FileText, Menu } from 'lucide-react';
import { useChat } from '@/context/ChatContext';
import { CourseType, FileType } from '@/utils/types';

export const Sidebar = () => {
  const { files, courses, isSidebarOpen, toggleSidebar } = useChat();
  const [activeTab, setActiveTab] = useState<'courses' | 'files'>('courses');

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
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-primary" />
          <h1 className="text-lg font-bold">BookWorm Bot</h1>
        </div>
        <Button 
          onClick={toggleSidebar} 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8"
          aria-label="Close sidebar"
        >
          <Menu size={18} />
        </Button>
      </div>
      
      <div className="flex border-b">
        <Button
          variant={activeTab === 'courses' ? 'secondary' : 'ghost'}
          className="flex-1 rounded-none"
          onClick={() => setActiveTab('courses')}
        >
          Courses
        </Button>
        <Button
          variant={activeTab === 'files' ? 'secondary' : 'ghost'}
          className="flex-1 rounded-none"
          onClick={() => setActiveTab('files')}
        >
          Files
        </Button>
      </div>

      <ScrollArea className="flex-1 p-4">
        {activeTab === 'courses' ? (
          <CoursesList courses={courses} />
        ) : (
          <FilesList files={files} />
        )}
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

const FilesList = ({ files }: { files: FileType[] }) => {
  if (files.length === 0) {
    return <div className="text-muted-foreground text-sm py-4">No files uploaded yet</div>;
  }

  return (
    <div className="space-y-2">
      {files.map((file) => (
        <div key={file.id} className="flex items-center gap-2 p-2 rounded-md hover:bg-accent cursor-pointer">
          <FileText className="h-4 w-4 text-primary" />
          <div className="overflow-hidden">
            <p className="truncate text-sm">{file.name}</p>
            <p className="text-xs text-muted-foreground">
              {formatFileSize(file.size)} • {new Date(file.uploadDate).toLocaleDateString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return bytes + ' B';
  else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
  else return (bytes / 1048576).toFixed(1) + ' MB';
};

export default Sidebar;
