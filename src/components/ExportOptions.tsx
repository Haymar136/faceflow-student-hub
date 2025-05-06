
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileSpreadsheet, FilePdf, Calendar, Download, CalendarDays } from 'lucide-react';
import { toast } from "sonner";
import { useIsMobile } from '@/hooks/use-mobile';

interface ExportOptionsProps {
  selectedClass: string;
  selectedDate: string;
}

const ExportOptions: React.FC<ExportOptionsProps> = ({ selectedClass, selectedDate }) => {
  const isMobile = useIsMobile();
  const [exportType, setExportType] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [isExporting, setIsExporting] = useState(false);
  
  // This would connect to your backend in a real app
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
    <div className="space-y-6">
      <Tabs defaultValue="daily" onValueChange={(v) => setExportType(v as any)}>
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="daily" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>Daily</span>
          </TabsTrigger>
          <TabsTrigger value="weekly" className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4" />
            <span>Weekly</span>
          </TabsTrigger>
          <TabsTrigger value="monthly" className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4" />
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
          <FilePdf className="h-5 w-5 mr-2" />
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
  );
};

export default ExportOptions;
