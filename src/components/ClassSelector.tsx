
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ClassSelectorProps {
  selectedClass: string;
  onClassChange: (value: string) => void;
}

const ClassSelector: React.FC<ClassSelectorProps> = ({ selectedClass, onClassChange }) => {
  // Mock class data - in a real app this would come from API
  const classes = ['All Classes', 'CS101', 'CS202', 'CS303', 'MATH201', 'ENG101'];
  
  return (
    <div className="w-full sm:w-auto">
      <Select value={selectedClass} onValueChange={onClassChange}>
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
  );
};

export default ClassSelector;
