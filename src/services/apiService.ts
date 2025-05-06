
// This service simulates calls to a Flask backend
// In a real application, this would use axios or fetch to make HTTP requests

const API_BASE_URL = 'http://localhost:5000/api';

export const apiService = {
  // Register a new student with the backend
  registerStudent: async (studentData: any, faceImage: string) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // In a real app, this would be:
    // return await fetch(`${API_BASE_URL}/register`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     ...studentData,
    //     faceImage,
    //   }),
    // }).then(response => response.json());
    
    console.log('Registering student:', studentData);
    console.log('Face image length:', faceImage.length);
    
    // Return mock success response
    return {
      success: true,
      message: 'Student registered successfully',
      studentId: Math.random().toString(36).substring(2, 10).toUpperCase(),
    };
  },
  
  // Send face data for recognition
  recognizeFace: async (faceImage: string) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real app, this would be:
    // return await fetch(`${API_BASE_URL}/recognize`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ faceImage }),
    // }).then(response => response.json());
    
    // Randomly succeed or fail to simulate real-world conditions
    const success = Math.random() > 0.3;
    
    if (success) {
      // Mock student data
      const students = [
        { id: 'S12345', name: 'Emma Johnson', studentId: 'S12345', class: 'CS101' },
        { id: 'S12346', name: 'James Smith', studentId: 'S12346', class: 'CS101' },
        { id: 'S12347', name: 'Sophia Williams', studentId: 'S12347', class: 'CS101' },
      ];
      
      const student = students[Math.floor(Math.random() * students.length)];
      
      return {
        success: true,
        recognized: true,
        student,
        confidence: 0.92 + (Math.random() * 0.07),
      };
    }
    
    return {
      success: true,
      recognized: false,
      message: 'No matching face found',
    };
  },
  
  // Get attendance records
  getAttendanceRecords: async (date?: string) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Mock attendance data
    const today = new Date().toISOString().split('T')[0];
    const requestDate = date || today;
    
    return {
      success: true,
      date: requestDate,
      records: [
        { id: '1', studentId: 'S12345', name: 'Emma Johnson', class: 'CS101', time: '09:15:23' },
        { id: '2', studentId: 'S12346', name: 'James Smith', class: 'CS101', time: '09:17:45' },
        { id: '3', studentId: 'S12347', name: 'Sophia Williams', class: 'CS101', time: '09:20:12' },
      ],
    };
  },
};
