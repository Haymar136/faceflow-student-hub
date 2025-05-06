
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import WebcamCapture from '@/components/WebcamCapture';
import { Button } from '@/components/ui/button';
import { toast } from "sonner";

const RegisterStudent = () => {
  const [studentData, setStudentData] = useState({
    fullName: '',
    studentId: '',
    classSection: '',
  });
  
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStudentData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  
  const handleCapture = (imageSrc: string | null) => {
    setCapturedImage(imageSrc);
  };
  
  const handleRegister = async () => {
    // Validate form
    if (!studentData.fullName || !studentData.studentId || !studentData.classSection) {
      toast.error("Please fill all required fields");
      return;
    }
    
    if (!capturedImage) {
      toast.error("Please capture a photo first");
      return;
    }
    
    setIsSubmitting(true);
    
    // In a real app, this would send data to the Flask API
    try {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Reset form on success
      setStudentData({
        fullName: '',
        studentId: '',
        classSection: '',
      });
      setCapturedImage(null);
      
      toast.success("Student registered successfully!");
    } catch (error) {
      toast.error("Failed to register student. Please try again.");
      console.error("Registration error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Register New Student</h1>
        <p className="text-gray-600 mt-1">Add a new student to the face recognition database</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Student Information</CardTitle>
            <CardDescription>Enter the student details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                placeholder="Enter student's full name"
                value={studentData.fullName}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="studentId">Student ID</Label>
              <Input
                id="studentId"
                name="studentId"
                placeholder="Enter student's ID"
                value={studentData.studentId}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="classSection">Class/Section</Label>
              <Input
                id="classSection"
                name="classSection"
                placeholder="Enter class or section"
                value={studentData.classSection}
                onChange={handleInputChange}
                required
              />
            </div>
          </CardContent>
        </Card>
        
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Facial Recognition</CardTitle>
              <CardDescription>Capture student's photo for registration</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              {capturedImage ? (
                <div className="space-y-4">
                  <div className="webcam-container">
                    <img 
                      src={capturedImage} 
                      alt="Captured" 
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <Button 
                    variant="outline"
                    onClick={() => setCapturedImage(null)}
                  >
                    Retake Photo
                  </Button>
                </div>
              ) : (
                <WebcamCapture onCapture={handleCapture} />
              )}
            </CardContent>
          </Card>
          
          <Button 
            className="w-full py-6 text-lg bg-faceflow-600 hover:bg-faceflow-700"
            onClick={handleRegister}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Registering...
              </>
            ) : "Register Student"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RegisterStudent;
