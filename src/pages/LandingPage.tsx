
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CalendarCheck, UserPlus } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center relative">
        {/* Background with gradient overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center z-0" 
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=1920')`,
            filter: 'brightness(0.4)'
          }} 
        />
        
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/80 to-black/90 z-0" />
        
        {/* Content */}
        <div className="container mx-auto px-4 py-16 z-10 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="mb-6">
              <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-faceflow-400 to-faceflow-600 flex items-center justify-center mx-auto mb-6">
                <svg 
                  className="h-8 w-8 text-white" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
                  />
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" 
                  />
                </svg>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                Student Attendance Management System
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Track and manage your attendance efficiently
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-md mx-auto">
              <Button 
                className="bg-faceflow-600 hover:bg-faceflow-700 text-white py-6 text-lg flex items-center justify-center gap-2"
                onClick={() => navigate('/register')}
              >
                <UserPlus className="h-5 w-5" />
                Register
              </Button>
              <Button 
                className="bg-faceflow-600 hover:bg-faceflow-700 text-white py-6 text-lg flex items-center justify-center gap-2"
                onClick={() => navigate('/attendance')}
              >
                <CalendarCheck className="h-5 w-5" />
                Mark Attendance
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <footer className="bg-white border-t py-4 relative z-10">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} FaceFlow Student Hub. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
