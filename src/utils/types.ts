
export type MessageType = {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};

export type FileType = {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadDate: Date;
  url?: string;
};

export type CourseType = {
  id: string;
  name: string;
  description?: string;
  files: FileType[];
};
