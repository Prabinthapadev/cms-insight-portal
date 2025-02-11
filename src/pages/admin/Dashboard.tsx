
import { useAuth } from "@/contexts/AuthContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Upload, FileSpreadsheet, Edit, Save } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCMSList } from "@/services/cms";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/auth');
      toast({
        title: "Access Denied",
        description: "You must be an admin to view this page.",
        variant: "destructive",
      });
    }
  }, [user, navigate, toast]);

  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{
    processed: number;
    failed: number;
  } | null>(null);
  const queryClient = useQueryClient();

  const { data: cmsList } = useQuery({
    queryKey: ["cms-list"],
    queryFn: getCMSList,
  });

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    name: "",
    description: "",
    website: "",
  });

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

      queryClient.invalidateQueries({ queryKey: ["cms-list"] });

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

  const downloadTemplate = () => {
    const template = `name,description,website,market_share,tags
Example CMS,A powerful content management system,https://example.com,5.2,"headless,enterprise,nodejs"`;
    
    const blob = new Blob([template], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cms_template.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const updateCMSMutation = useMutation({
    mutationFn: async (data: { id: string; updates: any }) => {
      const { error } = await supabase
        .from('cms')
        .update(data.updates)
        .eq('id', data.id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cms-list"] });
      toast({
        title: "CMS Updated",
        description: "The CMS entry has been updated successfully.",
      });
      setEditingId(null);
    },
    onError: (error) => {
      toast({
        title: "Update failed",
        description: "There was an error updating the CMS entry.",
        variant: "destructive",
      });
    },
  });

  const handleEdit = (cms: any) => {
    setEditingId(cms.id);
    setEditForm({
      name: cms.name,
      description: cms.description,
      website: cms.website || "",
    });
  };

  const handleSave = async (id: string) => {
    updateCMSMutation.mutate({
      id,
      updates: editForm,
    });
  };

  if (!user || user.role !== 'admin') {
    return null;
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
          <Button variant="outline" onClick={downloadTemplate}>
            Download Template
          </Button>
        </Card>
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">CMS Entries</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Website</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cmsList?.map((cms) => (
              <TableRow key={cms.id}>
                <TableCell>
                  {editingId === cms.id ? (
                    <Input
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    />
                  ) : (
                    cms.name
                  )}
                </TableCell>
                <TableCell>
                  {editingId === cms.id ? (
                    <Input
                      value={editForm.description}
                      onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                    />
                  ) : (
                    cms.description
                  )}
                </TableCell>
                <TableCell>
                  {editingId === cms.id ? (
                    <Input
                      value={editForm.website}
                      onChange={(e) => setEditForm({ ...editForm, website: e.target.value })}
                    />
                  ) : (
                    cms.website
                  )}
                </TableCell>
                <TableCell>
                  {editingId === cms.id ? (
                    <Button
                      size="sm"
                      onClick={() => handleSave(cms.id)}
                      className="mr-2"
                    >
                      <Save className="h-4 w-4 mr-1" /> Save
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(cms)}
                    >
                      <Edit className="h-4 w-4 mr-1" /> Edit
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default Dashboard;
