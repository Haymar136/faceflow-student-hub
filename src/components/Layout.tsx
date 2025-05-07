
import React, { ReactNode, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, LogOut, Home } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from "sonner";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout, isAdmin } = useAuth();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
      <header className="border-b bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
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
            
            <div className="flex items-center gap-4">
              {user && (
                <div className="hidden md:block text-right">
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-faceflow-600 capitalize">{user.role}</p>
                </div>
              )}
              
              {isMobile ? (
                <button 
                  onClick={toggleMobileMenu}
                  className="p-2 rounded-lg text-gray-600 hover:bg-gray-100"
                >
                  <Menu className="h-6 w-6" />
                </button>
              ) : (
                <nav className="flex items-center gap-1">
                  {isAdmin ? (
                    // Admin navigation
                    <>
                      <button 
                        onClick={() => navigate('/')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          isActive('/') 
                            ? 'bg-faceflow-100 text-faceflow-800' 
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <span className="flex items-center gap-1">
                          <Home className="h-4 w-4" />
                          Home
                        </span>
                      </button>
                      <button 
                        onClick={() => navigate('/admin')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          isActive('/admin') 
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
                    </>
                  ) : (
                    // Student navigation
                    <>
                      <button 
                        onClick={() => navigate('/')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          isActive('/') 
                            ? 'bg-faceflow-100 text-faceflow-800' 
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <span className="flex items-center gap-1">
                          <Home className="h-4 w-4" />
                          Home
                        </span>
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
                    </>
                  )}
                  
                  <button 
                    onClick={handleLogout}
                    className="ml-2 px-4 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors flex items-center gap-1"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </nav>
              )}
            </div>
          </div>
          
          {/* Mobile menu */}
          {isMobile && mobileMenuOpen && (
            <div className="mt-4 border-t pt-4 animate-fade-in">
              {user && (
                <div className="mb-3 px-2">
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-faceflow-600 capitalize">{user.role}</p>
                </div>
              )}
              <nav className="flex flex-col space-y-2">
                {isAdmin ? (
                  // Admin mobile navigation
                  <>
                    <button 
                      onClick={() => {
                        navigate('/');
                        setMobileMenuOpen(false);
                      }}
                      className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                        isActive('/') 
                          ? 'bg-faceflow-100 text-faceflow-800' 
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <Home className="h-4 w-4" />
                      Home
                    </button>
                    <button 
                      onClick={() => {
                        navigate('/admin');
                        setMobileMenuOpen(false);
                      }}
                      className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                        isActive('/admin') 
                          ? 'bg-faceflow-100 text-faceflow-800' 
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      Dashboard
                    </button>
                    <button 
                      onClick={() => {
                        navigate('/register');
                        setMobileMenuOpen(false);
                      }}
                      className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                        isActive('/register') 
                          ? 'bg-faceflow-100 text-faceflow-800' 
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      Register Student
                    </button>
                    <button 
                      onClick={() => {
                        navigate('/attendance');
                        setMobileMenuOpen(false);
                      }}
                      className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                        isActive('/attendance') 
                          ? 'bg-faceflow-100 text-faceflow-800' 
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      Mark Attendance
                    </button>
                  </>
                ) : (
                  // Student mobile navigation 
                  <>
                    <button 
                      onClick={() => {
                        navigate('/');
                        setMobileMenuOpen(false);
                      }}
                      className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                        isActive('/') 
                          ? 'bg-faceflow-100 text-faceflow-800' 
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <Home className="h-4 w-4" />
                      Home
                    </button>
                    <button 
                      onClick={() => {
                        navigate('/register');
                        setMobileMenuOpen(false);
                      }}
                      className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                        isActive('/register') 
                          ? 'bg-faceflow-100 text-faceflow-800' 
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      Register Student
                    </button>
                    <button 
                      onClick={() => {
                        navigate('/attendance');
                        setMobileMenuOpen(false);
                      }}
                      className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                        isActive('/attendance') 
                          ? 'bg-faceflow-100 text-faceflow-800' 
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      Mark Attendance
                    </button>
                  </>
                )}
                
                <button 
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </nav>
            </div>
          )}
        </div>
      </header>
      
      <main className="flex-1 container mx-auto px-4 py-6 md:py-8">
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
