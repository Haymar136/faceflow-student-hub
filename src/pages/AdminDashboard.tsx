
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, FileSpreadsheet, Download, Users } from 'lucide-react';
import StudentsList from '@/components/StudentsList';
import AttendanceTable from '@/components/AttendanceTable';
import ExportOptions from '@/components/ExportOptions';
import ClassSelector from '@/components/ClassSelector';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';

const AdminDashboard = () => {
  const isMobile = useIsMobile();
  const [selectedClass, setSelectedClass] = useState<string>('All Classes');
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [activeTab, setActiveTab] = useState('attendance');

  // Handler for mobile reports button
  const handleShowReports = () => {
    setActiveTab('reports');
  };

  return (
    <div className="space-y-6 md:space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-1">Manage students and attendance records</p>
      </div>
      
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <ClassSelector 
          selectedClass={selectedClass} 
          onClassChange={setSelectedClass} 
        />
        
        <div className="flex items-center space-x-2">
          <label htmlFor="date-select" className="text-sm font-medium text-gray-700">Date:</label>
          <input 
            id="date-select"
            type="date" 
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="rounded-md border border-gray-300 px-3 py-1 text-sm"
          />
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 mb-4">
          <TabsTrigger value="attendance" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>Attendance</span>
          </TabsTrigger>
          <TabsTrigger value="students" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>Students</span>
          </TabsTrigger>
          <TabsTrigger value="reports" className="hidden md:flex items-center gap-2">
            <FileSpreadsheet className="h-4 w-4" />
            <span>Reports</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="attendance" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl flex items-center justify-between">
                <span>Attendance Records</span>
                <span className="text-sm font-normal text-gray-500">{selectedClass} • {selectedDate}</span>
              </CardTitle>
              <CardDescription>View and manage student attendance</CardDescription>
            </CardHeader>
            <CardContent>
              <AttendanceTable selectedClass={selectedClass} selectedDate={selectedDate} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="students" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Registered Students</CardTitle>
              <CardDescription>View and manage student profiles</CardDescription>
            </CardHeader>
            <CardContent>
              <StudentsList selectedClass={selectedClass} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Export Reports</CardTitle>
              <CardDescription>Generate and download attendance reports</CardDescription>
            </CardHeader>
            <CardContent>
              <ExportOptions selectedClass={selectedClass} selectedDate={selectedDate} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Mobile Reports Tab Button */}
      {isMobile && (
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <Button 
              variant="ghost"
              onClick={handleShowReports}
              className="w-full flex items-center justify-between py-2"
            >
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="h-5 w-5 text-faceflow-600" />
                <span className="font-medium">Export Reports</span>
              </div>
              <Download className="h-5 w-5 text-faceflow-600" />
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminDashboard;
