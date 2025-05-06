
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, FileSpreadsheet, Download, Users } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Button } from '@/components/ui/button';
import { toast } from "sonner";
import { Search } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const AdminDashboard = () => {
  const isMobile = useIsMobile();
  const [selectedClass, setSelectedClass] = useState<string>('All Classes');
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  
  // Mock data
  const classes = ['All Classes', 'CS101', 'CS202', 'CS303', 'MATH201', 'ENG101'];
  
  const allStudents = [
    { id: 'S12345', name: 'Emma Johnson', studentId: 'S12345', class: 'CS101', registeredDate: '2023-09-01' },
    { id: 'S12346', name: 'James Smith', studentId: 'S12346', class: 'CS101', registeredDate: '2023-09-01' },
    { id: 'S12347', name: 'Sophia Williams', studentId: 'S12347', class: 'CS101', registeredDate: '2023-09-02' },
    { id: 'S12348', name: 'Noah Brown', studentId: 'S12348', class: 'CS202', registeredDate: '2023-09-02' },
    { id: 'S12349', name: 'Olivia Davis', studentId: 'S12349', class: 'CS202', registeredDate: '2023-09-03' },
    { id: 'S12350', name: 'Ethan Wilson', studentId: 'S12350', class: 'CS303', registeredDate: '2023-09-03' },
    { id: 'S12351', name: 'Ava Miller', studentId: 'S12351', class: 'CS303', registeredDate: '2023-09-04' },
    { id: 'S12352', name: 'Liam Taylor', studentId: 'S12352', class: 'CS101', registeredDate: '2023-09-04' },
  ];
  
  const attendanceRecords = [
    { id: '1', studentId: 'S12345', name: 'Emma Johnson', class: 'CS101', time: '09:15:23' },
    { id: '2', studentId: 'S12346', name: 'James Smith', class: 'CS101', time: '09:17:45' },
    { id: '3', studentId: 'S12347', name: 'Sophia Williams', class: 'CS101', time: '09:20:12' },
    { id: '4', studentId: 'S12348', name: 'Noah Brown', class: 'CS202', time: '09:22:35' },
    { id: '5', studentId: 'S12349', name: 'Olivia Davis', class: 'CS202', time: '09:25:18' },
    { id: '6', studentId: 'S12350', name: 'Ethan Wilson', class: 'CS303', time: '09:30:42' },
  ];
  
  // Filter students by class and search query
  const filteredStudents = allStudents
    .filter(student => selectedClass === 'All Classes' || student.class === selectedClass)
    .filter(student => 
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      student.studentId.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
  // Filter attendance records by class
  const filteredAttendance = attendanceRecords
    .filter(record => selectedClass === 'All Classes' || record.class === selectedClass);
  
  // Pagination for students
  const totalStudentPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const startStudentIndex = (currentPage - 1) * itemsPerPage;
  const paginatedStudents = filteredStudents.slice(startStudentIndex, startStudentIndex + itemsPerPage);
  
  // Pagination for attendance
  const totalAttendancePages = Math.ceil(filteredAttendance.length / itemsPerPage);
  const startAttendanceIndex = (currentPage - 1) * itemsPerPage;
  const paginatedAttendance = filteredAttendance.slice(startAttendanceIndex, startAttendanceIndex + itemsPerPage);
  
  const stats = [
    { title: 'Total Students', value: allStudents.length },
    { title: 'Today\'s Attendance', value: attendanceRecords.length },
    { title: 'Classes', value: [...new Set(allStudents.map(s => s.class))].length },
  ];
  
  const [isExporting, setIsExporting] = useState(false);
  const [exportType, setExportType] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  
  const handleExport = (format: 'excel' | 'pdf') => {
    setIsExporting(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setIsExporting(false);
      
      let message = '';
      if (exportType === 'daily') {
        message = `${format.toUpperCase()} report for ${selectedDate} exported successfully`;
      } else if (exportType === 'weekly') {
        message = `Weekly ${format.toUpperCase()} report including ${selectedDate} exported successfully`;
      } else {
        message = `Monthly ${format.toUpperCase()} report for ${new Date(selectedDate).toLocaleString('default', { month: 'long' })} exported successfully`;
      }
      
      toast.success(message);
    }, 1500);
  };

  return (
    <div className="space-y-6 md:space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-1">Manage students and attendance records</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
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
      
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="w-full sm:w-auto">
          <Select value={selectedClass} onValueChange={setSelectedClass}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Select Class" />
            </SelectTrigger>
            <SelectContent>
              {classes.map((classItem) => (
                <SelectItem key={classItem} value={classItem}>
                  {classItem}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
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
      
      <Tabs defaultValue="attendance" className="w-full">
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
              <div className="space-y-4">
                <div className="relative w-full max-w-sm">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by name or ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <div className="rounded-md border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Student ID</TableHead>
                        <TableHead>Class</TableHead>
                        <TableHead>Time</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedAttendance.length > 0 ? (
                        paginatedAttendance.map((record) => (
                          <TableRow key={record.id}>
                            <TableCell className="font-medium">{record.name}</TableCell>
                            <TableCell>{record.studentId}</TableCell>
                            <TableCell>{record.class}</TableCell>
                            <TableCell>{record.time}</TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center py-6 text-gray-500">
                            No attendance records found
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
                
                {totalAttendancePages > 1 && (
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious 
                          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                          disabled={currentPage === 1}
                        />
                      </PaginationItem>
                      
                      {[...Array(totalAttendancePages)].map((_, i) => (
                        <PaginationItem key={i}>
                          <PaginationLink
                            onClick={() => setCurrentPage(i + 1)}
                            isActive={currentPage === i + 1}
                          >
                            {i + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      
                      <PaginationItem>
                        <PaginationNext 
                          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalAttendancePages))}
                          disabled={currentPage === totalAttendancePages}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                )}
              </div>
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
              <div className="space-y-4">
                <div className="relative w-full max-w-sm">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by name or ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <div className="rounded-md border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Student ID</TableHead>
                        <TableHead>Class</TableHead>
                        <TableHead className="hidden md:table-cell">Registered Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedStudents.length > 0 ? (
                        paginatedStudents.map((student) => (
                          <TableRow key={student.id}>
                            <TableCell className="font-medium">{student.name}</TableCell>
                            <TableCell>{student.studentId}</TableCell>
                            <TableCell>{student.class}</TableCell>
                            <TableCell className="hidden md:table-cell">{student.registeredDate}</TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center py-6 text-gray-500">
                            No students found
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
                
                {totalStudentPages > 1 && (
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious 
                          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                          disabled={currentPage === 1}
                        />
                      </PaginationItem>
                      
                      {[...Array(totalStudentPages)].map((_, i) => (
                        <PaginationItem key={i}>
                          <PaginationLink
                            onClick={() => setCurrentPage(i + 1)}
                            isActive={currentPage === i + 1}
                          >
                            {i + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      
                      <PaginationItem>
                        <PaginationNext 
                          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalStudentPages))}
                          disabled={currentPage === totalStudentPages}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                )}
              </div>
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
              <div className="space-y-6">
                <Tabs defaultValue="daily" onValueChange={(v) => setExportType(v as any)}>
                  <TabsList className="grid w-full grid-cols-3 mb-4">
                    <TabsTrigger value="daily" className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>Daily</span>
                    </TabsTrigger>
                    <TabsTrigger value="weekly" className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>Weekly</span>
                    </TabsTrigger>
                    <TabsTrigger value="monthly" className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>Monthly</span>
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="daily" className="space-y-4">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-center mb-4">
                          <h3 className="font-medium text-lg">Daily Report</h3>
                          <p className="text-sm text-gray-500">Export attendance for {selectedDate}</p>
                          {selectedClass !== 'All Classes' && (
                            <p className="text-sm text-faceflow-600 font-medium mt-1">Class: {selectedClass}</p>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="weekly" className="space-y-4">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-center mb-4">
                          <h3 className="font-medium text-lg">Weekly Report</h3>
                          <p className="text-sm text-gray-500">Export attendance for the week of {selectedDate}</p>
                          {selectedClass !== 'All Classes' && (
                            <p className="text-sm text-faceflow-600 font-medium mt-1">Class: {selectedClass}</p>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="monthly" className="space-y-4">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-center mb-4">
                          <h3 className="font-medium text-lg">Monthly Report</h3>
                          <p className="text-sm text-gray-500">
                            Export attendance for {new Date(selectedDate).toLocaleString('default', { month: 'long', year: 'numeric' })}
                          </p>
                          {selectedClass !== 'All Classes' && (
                            <p className="text-sm text-faceflow-600 font-medium mt-1">Class: {selectedClass}</p>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
                
                <div className={`grid ${isMobile ? 'grid-cols-1 gap-3' : 'grid-cols-2 gap-4'}`}>
                  <Button 
                    onClick={() => handleExport('excel')}
                    disabled={isExporting}
                    className="h-12 bg-green-600 hover:bg-green-700 text-white"
                  >
                    <FileSpreadsheet className="h-5 w-5 mr-2" />
                    <span>Export Excel</span>
                    {isExporting && <span className="ml-2 h-4 w-4 rounded-full border-2 border-white border-r-transparent animate-spin"></span>}
                  </Button>
                  
                  <Button 
                    onClick={() => handleExport('pdf')}
                    disabled={isExporting}
                    className="h-12 bg-red-600 hover:bg-red-700 text-white"
                  >
                    <Download className="h-5 w-5 mr-2" />
                    <span>Export PDF</span>
                    {isExporting && <span className="ml-2 h-4 w-4 rounded-full border-2 border-white border-r-transparent animate-spin"></span>}
                  </Button>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                  <h4 className="text-sm font-medium text-blue-800 mb-2 flex items-center">
                    <Download className="h-4 w-4 mr-2" />
                    About Reports
                  </h4>
                  <p className="text-xs text-blue-700">
                    Reports include student names, IDs, class information, timestamps, and attendance statuses.
                    {exportType === 'daily' 
                      ? ' Daily reports show data for a single day.'
                      : exportType === 'weekly'
                        ? ' Weekly reports show data for seven consecutive days starting from the selected date.'
                        : ' Monthly reports show data for the entire month of the selected date.'
                    }
                  </p>
                </div>
              </div>
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
              onClick={() => document.querySelector('[data-value="reports"]')?.click()}
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
