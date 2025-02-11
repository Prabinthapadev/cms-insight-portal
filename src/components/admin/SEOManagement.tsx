
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PageSEO, getPageSEO, updatePageSEO } from "@/services/seo";
import { supabase } from "@/integrations/supabase/client";

export const SEOManagement = () => {
  const [seoEntries, setSeoEntries] = useState<PageSEO[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<PageSEO | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadSEOData();
  }, []);

  const loadSEOData = async () => {
    const { data, error } = await supabase
      .from('page_seo')
      .select('*')
      .order('url_pattern');

    if (error) {
      toast({
        title: "Error loading SEO data",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    setSeoEntries(data);
  };

  const handleEdit = (entry: PageSEO) => {
    setEditingId(entry.id);
    setEditForm(entry);
  };

  const handleSave = async () => {
    if (!editForm) return;

    try {
      await updatePageSEO(editForm);
      toast({
        title: "SEO Updated",
        description: "The SEO settings have been updated successfully.",
      });
      setEditingId(null);
      loadSEOData();
    } catch (error) {
      toast({
        title: "Update failed",
        description: "Failed to update SEO settings. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (field: keyof PageSEO, value: any) => {
    if (!editForm) return;
    setEditForm({ ...editForm, [field]: value });
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">SEO Management</h2>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>URL Pattern</TableHead>
              <TableHead>Meta Title</TableHead>
              <TableHead>Meta Description</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {seoEntries.map((entry) => (
              <TableRow key={entry.id}>
                <TableCell className="font-mono text-sm">
                  {entry.url_pattern}
                </TableCell>
                <TableCell>
                  {editingId === entry.id ? (
                    <Input
                      value={editForm?.meta_title || ""}
                      onChange={(e) => handleInputChange("meta_title", e.target.value)}
                      className="w-full"
                    />
                  ) : (
                    entry.meta_title
                  )}
                </TableCell>
                <TableCell>
                  {editingId === entry.id ? (
                    <Textarea
                      value={editForm?.meta_description || ""}
                      onChange={(e) => handleInputChange("meta_description", e.target.value)}
                      className="w-full"
                    />
                  ) : (
                    entry.meta_description
                  )}
                </TableCell>
                <TableCell>
                  {editingId === entry.id ? (
                    <Button
                      onClick={handleSave}
                      size="sm"
                      className="mr-2"
                    >
                      Save
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleEdit(entry)}
                      variant="outline"
                      size="sm"
                    >
                      Edit
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};
