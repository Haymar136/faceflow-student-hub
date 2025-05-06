
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import WebcamCapture from '@/components/WebcamCapture';
import { toast } from "sonner";

interface RecognizedStudent {
  id: string;
  name: string;
  studentId: string;
  class: string;
  timestamp: string;
}

const MarkAttendance = () => {
  const [recognizing, setRecognizing] = useState(false);
  const [recognizedStudents, setRecognizedStudents] = useState<RecognizedStudent[]>([]);
  
  // Simulate face recognition process for demo purposes
  useEffect(() => {
    const recognitionInterval = setInterval(() => {
      // 15% chance of recognizing a student for demo purposes
      if (Math.random() < 0.15) {
        simulateRecognition();
      }
    }, 3000);
    
    return () => clearInterval(recognitionInterval);
  }, []);
  
  const simulateRecognition = () => {
    setRecognizing(true);
    
    // Fake student data for demo
    const fakeStudents = [
      { id: 'S12345', name: 'Emma Johnson', studentId: 'S12345', class: 'CS101' },
      { id: 'S12346', name: 'James Smith', studentId: 'S12346', class: 'CS101' },
      { id: 'S12347', name: 'Sophia Williams', studentId: 'S12347', class: 'CS101' },
      { id: 'S12348', name: 'Noah Brown', studentId: 'S12348', class: 'CS202' },
      { id: 'S12349', name: 'Olivia Davis', studentId: 'S12349', class: 'CS202' },
      { id: 'S12350', name: 'Ethan Wilson', studentId: 'S12350', class: 'CS303' },
    ];
    
    // Choose random student
    const student = fakeStudents[Math.floor(Math.random() * fakeStudents.length)];
    
    // Check if student already recognized
    const alreadyRecognized = recognizedStudents.some(s => s.id === student.id);
    
    setTimeout(() => {
      setRecognizing(false);
      
      if (alreadyRecognized) {
        // Don't add duplicate, just show toast
        toast(`${student.name} already marked present!`, {
          description: `Student ID: ${student.studentId}`,
        });
      } else {
        // Format current time
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedTime = `${hours % 12 || 12}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;
        
        // Add recognized student
        const newRecognizedStudent = {
          ...student,
          timestamp: formattedTime
        };
        
        setRecognizedStudents(prev => [newRecognizedStudent, ...prev]);
        
        toast.success(`Successfully recognized ${student.name}!`, {
          description: `Attendance marked at ${formattedTime}`,
        });
      }
    }, 1500);
  };
  
  return (
    <div className="max-w-5xl mx-auto animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Mark Attendance</h1>
        <p className="text-gray-600 mt-1">Students will be automatically recognized as they appear on camera</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Camera Feed</CardTitle>
            <CardDescription>Position students in front of the camera for recognition</CardDescription>
          </CardHeader>
          <CardContent>
            <WebcamCapture showControls={false} isAttendanceMode={true} />
            
            <div className="mt-6 text-center">
              <div className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 rounded-full">
                <div 
                  className={`h-3 w-3 rounded-full ${recognizing 
                    ? 'bg-yellow-400 animate-pulse' 
                    : 'bg-green-400'
                  }`}
                ></div>
                <span className="text-sm font-medium">
                  {recognizing ? 'Processing...' : 'Ready to recognize'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Today's Attendance</CardTitle>
              <CardDescription>Students who have been marked present</CardDescription>
            </div>
            <div className="text-2xl font-bold text-faceflow-600">
              {recognizedStudents.length}
            </div>
          </CardHeader>
          <CardContent>
            <div className="max-h-[400px] overflow-auto pr-2 space-y-2">
              {recognizedStudents.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No students recognized yet
                </div>
              ) : (
                recognizedStudents.map((student, index) => (
                  <div 
                    key={student.id + index}
                    className="flex items-center justify-between p-3 bg-white border rounded-lg shadow-sm"
                  >
                    <div>
                      <p className="font-medium">{student.name}</p>
                      <p className="text-sm text-gray-500">{student.studentId} • {student.class}</p>
                    </div>
                    <span className="text-sm font-medium text-gray-500">{student.timestamp}</span>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MarkAttendance;
