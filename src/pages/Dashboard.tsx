
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  
  // Mock data - in a real app this would come from API
  const recentAttendance = [
    { id: '1', name: 'Emma Johnson', studentId: 'S12345', class: 'CS101', time: '09:15 AM' },
    { id: '2', name: 'James Smith', studentId: 'S12346', class: 'CS101', time: '09:17 AM' },
    { id: '3', name: 'Sophia Williams', studentId: 'S12347', class: 'CS101', time: '09:20 AM' },
  ];
  
  const stats = [
    { title: 'Registered Students', value: '156' },
    { title: 'Today\'s Attendance', value: '43' },
    { title: 'Classes', value: '8' },
  ];

  return (
    <div className="space-y-6 md:space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome to FaceFlow Student Hub</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-gray-600">{stat.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl md:text-4xl font-bold text-faceflow-700">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Quick Actions</CardTitle>
            <CardDescription>Common tasks you can perform</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3 md:gap-4">
            <button
              onClick={() => navigate('/register')}
              className="w-full py-3 px-4 text-left rounded-lg bg-gradient-to-r from-faceflow-500 to-faceflow-600 text-white font-medium hover:from-faceflow-600 hover:to-faceflow-700 transition-colors"
            >
              Register New Student
            </button>
            <button
              onClick={() => navigate('/attendance')}
              className="w-full py-3 px-4 text-left rounded-lg bg-gradient-to-r from-faceflow-400 to-faceflow-500 text-white font-medium hover:from-faceflow-500 hover:to-faceflow-600 transition-colors"
            >
              Mark Attendance
            </button>
            <button
              className="w-full py-3 px-4 text-left rounded-lg border border-gray-200 font-medium hover:bg-gray-50 transition-colors"
            >
              View Reports
            </button>
          </CardContent>
        </Card>
        
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="text-xl">Recent Attendance</CardTitle>
            <CardDescription>Students who recently checked in</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="space-y-3 md:space-y-4">
              {recentAttendance.map((student) => (
                <div key={student.id} className="flex items-center justify-between border-b pb-3">
                  <div>
                    <p className="font-medium text-gray-800">{student.name}</p>
                    <p className="text-sm text-gray-500">{student.studentId} • {student.class}</p>
                  </div>
                  <span className="text-sm text-gray-500">{student.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="text-sm text-blue-600 hover:underline cursor-pointer mt-auto">
            View all attendance records
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
