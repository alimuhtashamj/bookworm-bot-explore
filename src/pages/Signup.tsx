
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const signupSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  rollNo: z.string().min(1, { message: 'University Roll No is required' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number' }),
});

type SignupFormValues = z.infer<typeof signupSchema>;

const Signup: React.FC = () => {
  const navigate = useNavigate();
  
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      rollNo: '',
      phone: '',
    },
  });

  const onSubmit = (data: SignupFormValues) => {
    // In a real app, you would handle signup with backend
    console.log('Signup data:', data);
    // Redirect to chat after signup
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f1e9] p-4">
      <Card className="w-full max-w-md border-[#d4c8b8] shadow-md bg-[#fcf9f3]">
        <CardHeader className="space-y-1 text-center border-b border-[#e0d6c8] pb-6">
          <div className="flex justify-center mb-4">
            <img 
              src="/placeholder.svg" 
              alt="University Logo" 
              className="h-16 w-16" 
            />
          </div>
          <CardTitle className="text-2xl font-serif text-[#6b5b46]">BookWorm Academic Access</CardTitle>
          <CardDescription className="text-[#8c7d65]">
            Create an account to access your course materials
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#6b5b46]">Full Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter your full name" 
                        className="border-[#d4c8b8] bg-[#fefcf9] focus-visible:ring-[#a39179]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage className="text-[#9d6a63]" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="rollNo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#6b5b46]">University Roll No.</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter your roll number" 
                        className="border-[#d4c8b8] bg-[#fefcf9] focus-visible:ring-[#a39179]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage className="text-[#9d6a63]" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#6b5b46]">Phone Number</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter your phone number" 
                        className="border-[#d4c8b8] bg-[#fefcf9] focus-visible:ring-[#a39179]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage className="text-[#9d6a63]" />
                  </FormItem>
                )}
              />
              <Button 
                type="submit" 
                className="w-full bg-[#a39179] hover:bg-[#8c7d65] text-white"
              >
                Create Account
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center border-t border-[#e0d6c8] pt-4">
          <Button 
            variant="link" 
            onClick={() => navigate('/')} 
            className="text-[#a39179]"
          >
            Already have an account? Sign in
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Signup;
