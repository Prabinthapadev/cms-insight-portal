
import { useAuth } from "@/contexts/AuthContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Upload, FileSpreadsheet, AlertCircle } from "lucide-react";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{
    processed: number;
    failed: number;
  } | null>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    setIsUploading(true);
    try {
      // Create import record
      const { data: importRecord, error: importError } = await supabase
        .from('cms_imports')
        .insert({
          filename: file.name,
          user_id: user.id,
        })
        .select()
        .single();

      if (importError) throw importError;

      const formData = new FormData();
      formData.append('file', file);
      formData.append('userId', user.id);
      formData.append('importId', importRecord.id);

      const { data, error } = await supabase.functions.invoke('process-cms-import', {
        body: formData,
      });

      if (error) throw error;

      setUploadProgress({
        processed: data.processed,
        failed: data.failed,
      });

      toast({
        title: "Import completed",
        description: `Successfully processed ${data.processed} records. Failed: ${data.failed}`,
      });
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Import failed",
        description: "There was an error processing your file. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  if (!user || user.role !== 'admin') {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="p-6">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p>You don't have permission to access this page.</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Upload className="mr-2 h-5 w-5" />
            Bulk Import CMS Profiles
          </h2>
          <p className="text-gray-600 mb-4">
            Upload a CSV file with CMS profile data. The file should include columns for name,
            description, website, market share, and tags.
          </p>
          <Input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            disabled={isUploading}
            className="mb-4"
          />
          {uploadProgress && (
            <div className="text-sm text-gray-600">
              Processed: {uploadProgress.processed} | Failed: {uploadProgress.failed}
            </div>
          )}
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <FileSpreadsheet className="mr-2 h-5 w-5" />
            CSV Template
          </h2>
          <p className="text-gray-600 mb-4">
            Download the CSV template to ensure your data is formatted correctly.
          </p>
          <Button variant="outline">
            Download Template
          </Button>
        </Card>
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Imports</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Filename</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Processed</TableHead>
              <TableHead>Failed</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Add import history data here */}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default Dashboard;
