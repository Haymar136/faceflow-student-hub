
import React, { ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
      <header className="border-b bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-faceflow-400 to-faceflow-600 flex items-center justify-center">
                <svg 
                  className="h-6 w-6 text-white" 
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
              <div>
                <h1 className="text-xl font-bold text-gray-900">FaceFlow</h1>
                <p className="text-sm text-gray-500">Student Hub</p>
              </div>
            </div>
            
            <nav className="flex items-center gap-1">
              <button 
                onClick={() => navigate('/')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive('/') 
                    ? 'bg-faceflow-100 text-faceflow-800' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Dashboard
              </button>
              <button 
                onClick={() => navigate('/register')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive('/register') 
                    ? 'bg-faceflow-100 text-faceflow-800' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Register Student
              </button>
              <button 
                onClick={() => navigate('/attendance')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive('/attendance') 
                    ? 'bg-faceflow-100 text-faceflow-800' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Mark Attendance
              </button>
            </nav>
          </div>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {children}
      </main>
      
      <footer className="bg-white border-t py-4">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} FaceFlow Student Hub. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
