
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface StudentsListProps {
  selectedClass: string;
}

const StudentsList: React.FC<StudentsListProps> = ({ selectedClass }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  // Mock data - in a real app this would come from API
  const allStudents = [
    { id: 'S12345', name: 'Emma Johnson', studentId: 'S12345', class: 'CS101', registeredDate: '2023-09-01' },
    { id: 'S12346', name: 'James Smith', studentId: 'S12346', class: 'CS101', registeredDate: '2023-09-01' },
    { id: 'S12347', name: 'Sophia Williams', studentId: 'S12347', class: 'CS101', registeredDate: '2023-09-02' },
    { id: 'S12348', name: 'Noah Brown', studentId: 'S12348', class: 'CS202', registeredDate: '2023-09-02' },
    { id: 'S12349', name: 'Olivia Davis', studentId: 'S12349', class: 'CS202', registeredDate: '2023-09-03' },
    { id: 'S12350', name: 'Ethan Wilson', studentId: 'S12350', class: 'CS303', registeredDate: '2023-09-03' },
    { id: 'S12351', name: 'Ava Miller', studentId: 'S12351', class: 'CS303', registeredDate: '2023-09-04' },
    { id: 'S12352', name: 'Liam Taylor', studentId: 'S12352', class: 'CS101', registeredDate: '2023-09-04' },
    { id: 'S12353', name: 'Charlotte Anderson', studentId: 'S12353', class: 'CS202', registeredDate: '2023-09-05' },
    { id: 'S12354', name: 'Mason Martinez', studentId: 'S12354', class: 'CS303', registeredDate: '2023-09-05' },
    { id: 'S12355', name: 'Amelia Rodriguez', studentId: 'S12355', class: 'CS101', registeredDate: '2023-09-06' },
    { id: 'S12356', name: 'Elijah Garcia', studentId: 'S12356', class: 'CS202', registeredDate: '2023-09-06' },
  ];
  
  // Filter students by class and search query
  const filteredStudents = allStudents
    .filter(student => selectedClass === 'All Classes' || student.class === selectedClass)
    .filter(student => 
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      student.studentId.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
  // Pagination
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedStudents = filteredStudents.slice(startIndex, startIndex + itemsPerPage);
  
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

export default StudentsList;
