
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useChat } from '@/context/ChatContext';
import { FileText, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const FileUpload: React.FC = () => {
  const { uploadFile, courses } = useChat();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!selectedFile || !selectedCourse) {
      toast({
        title: "Error",
        description: "Please select a file and course",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    // In a real implementation, we would upload to a server
    // For now, we'll simulate an upload delay
    setTimeout(() => {
      uploadFile({
        name: selectedFile.name,
        size: selectedFile.size,
        type: selectedFile.type,
      });
      
      setIsUploading(false);
      setSelectedFile(null);
      setSelectedCourse('');
      setIsOpen(false);
      
      toast({
        title: "Success",
        description: "File uploaded successfully",
      });
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Upload size={16} />
          Upload Material
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Course Materials</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="course">Select Course</Label>
            <Select value={selectedCourse} onValueChange={setSelectedCourse}>
              <SelectTrigger>
                <SelectValue placeholder="Select a course" />
              </SelectTrigger>
              <SelectContent>
                {courses.map((course) => (
                  <SelectItem key={course.id} value={course.id}>
                    {course.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="file">Upload File</Label>
            <div className="border border-dashed rounded-lg p-6 flex flex-col items-center justify-center bg-muted/40">
              {!selectedFile ? (
                <>
                  <FileText className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Drag & drop your file here, or click to browse
                  </p>
                  <input
                    id="file"
                    type="file"
                    className="hidden"
                    accept=".pdf,.doc,.docx,.txt"
                    onChange={handleFileChange}
                  />
                  <Button
                    variant="outline"
                    onClick={() => document.getElementById('file')?.click()}
                    type="button"
                  >
                    Browse Files
                  </Button>
                </>
              ) : (
                <>
                  <FileText className="h-8 w-8 text-primary mb-2" />
                  <p className="text-sm font-medium mb-1">{selectedFile.name}</p>
                  <p className="text-xs text-muted-foreground mb-2">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setSelectedFile(null)}
                    type="button"
                    size="sm"
                  >
                    Change File
                  </Button>
                </>
              )}
            </div>
          </div>
          
          <Button 
            onClick={handleUpload} 
            disabled={!selectedFile || !selectedCourse || isUploading} 
            className="w-full"
          >
            {isUploading ? 'Uploading...' : 'Upload File'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FileUpload;
