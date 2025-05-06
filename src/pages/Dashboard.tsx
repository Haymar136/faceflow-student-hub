
import React, { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const { isAdmin, isStudent, user } = useAuth();
  
  useEffect(() => {
    // If admin, redirect to admin dashboard
    if (isAdmin) {
      navigate('/admin');
    }
    
    // If student, redirect to attendance page
    if (isStudent) {
      navigate('/attendance');
    }
  }, [isAdmin, isStudent, navigate]);

  // This component shouldn't render anything as it will redirect
  // But just in case there's a delay, show a loading state
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <div className="h-10 w-10 border-4 border-faceflow-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="mt-4 text-gray-600">Redirecting...</p>
      </div>
    </div>
  );
};

export default Dashboard;
