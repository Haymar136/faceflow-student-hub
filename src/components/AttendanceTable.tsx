
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Search } from 'lucide-react';
import { apiService } from '@/services/apiService';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';

interface AttendanceTableProps {
  selectedClass: string;
  selectedDate: string;
}

const AttendanceTable: React.FC<AttendanceTableProps> = ({ selectedClass, selectedDate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  // Fetch attendance records using React Query
  const { data: attendanceData, isLoading } = useQuery({
    queryKey: ['attendance', selectedDate, selectedClass],
    queryFn: () => apiService.getAttendanceRecords(selectedDate),
  });
  
  const records = attendanceData?.records || [];
  
  // Filter records by class and search query
  const filteredRecords = records
    .filter(record => selectedClass === 'All Classes' || record.class === selectedClass)
    .filter(record => 
      record.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      record.studentId.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
  // Pagination
  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedRecords = filteredRecords.slice(startIndex, startIndex + itemsPerPage);
  
  return (
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
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-6">
                  <div className="flex items-center justify-center space-x-2">
                    <div className="h-4 w-4 rounded-full bg-faceflow-600 animate-bounce"></div>
                    <div className="h-4 w-4 rounded-full bg-faceflow-500 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="h-4 w-4 rounded-full bg-faceflow-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </TableCell>
              </TableRow>
            ) : paginatedRecords.length > 0 ? (
              paginatedRecords.map((record) => (
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
      
      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <Button 
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="cursor-pointer"
              >
                <PaginationPrevious />
              </Button>
            </PaginationItem>
            
            {[...Array(totalPages)].map((_, i) => (
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
              <Button 
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="cursor-pointer"
              >
                <PaginationNext />
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default AttendanceTable;
