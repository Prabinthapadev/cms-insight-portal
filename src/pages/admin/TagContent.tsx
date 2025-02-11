
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Save, Plus, Delete } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const TagContent = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [editingFaqId, setEditingFaqId] = useState<string | null>(null);
  const [newFaq, setNewFaq] = useState({ question: "", answer: "" });
  
  const { data: tags } = useQuery({
    queryKey: ["tags"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tags')
        .select('*');
      if (error) throw error;
      return data;
    },
  });

  const { data: tagContent } = useQuery({
    queryKey: ["tag-content", selectedTag],
    queryFn: async () => {
      if (!selectedTag) return null;
      const { data, error } = await supabase
        .from('tag_content')
        .select('*')
        .eq('tag_id', selectedTag)
        .single();
      if (error && error.code !== 'PGRST116') throw error;
      return data;
    },
    enabled: !!selectedTag,
  });

  const { data: faqs } = useQuery({
    queryKey: ["tag-faqs", selectedTag],
    queryFn: async () => {
      if (!selectedTag) return [];
      const { data, error } = await supabase
        .from('faqs')
        .select('*')
        .eq('tag_id', selectedTag)
        .order('order_index', { ascending: true });
      if (error) throw error;
      return data;
    },
    enabled: !!selectedTag,
  });

  const updateTagContentMutation = useMutation({
    mutationFn: async (updates: any) => {
      const { error } = await supabase
        .from('tag_content')
        .upsert({
          tag_id: selectedTag,
          ...updates,
        });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tag-content", selectedTag] });
      toast({
        title: "Content Updated",
        description: "The tag content has been updated successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Update Failed",
        description: "There was an error updating the content.",
        variant: "destructive",
      });
    },
  });

  const updateFaqMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: any }) => {
      const { error } = await supabase
        .from('faqs')
        .update(updates)
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tag-faqs", selectedTag] });
      setEditingFaqId(null);
      toast({
        title: "FAQ Updated",
        description: "The FAQ has been updated successfully.",
      });
    },
  });

  const addFaqMutation = useMutation({
    mutationFn: async (faq: { question: string; answer: string }) => {
      const { error } = await supabase
        .from('faqs')
        .insert({
          tag_id: selectedTag,
          question: faq.question,
          answer: faq.answer,
        });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tag-faqs", selectedTag] });
      setNewFaq({ question: "", answer: "" });
      toast({
        title: "FAQ Added",
        description: "The new FAQ has been added successfully.",
      });
    },
  });

  const deleteFaqMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('faqs')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tag-faqs", selectedTag] });
      toast({
        title: "FAQ Deleted",
        description: "The FAQ has been deleted successfully.",
      });
    },
  });

  const handleContentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    updateTagContentMutation.mutate({
      title: formData.get('title'),
      content: formData.get('content'),
      meta_title: formData.get('meta_title'),
      meta_description: formData.get('meta_description'),
      banner_title: formData.get('banner_title'),
      banner_subtitle: formData.get('banner_subtitle'),
      content_type: 'main',
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Tag Content Management</h1>

      <div className="grid md:grid-cols-4 gap-6">
        <Card className="p-6 md:col-span-1">
          <h2 className="text-xl font-semibold mb-4">Select Tag</h2>
          <div className="space-y-2">
            {tags?.map((tag) => (
              <Button
                key={tag.id}
                variant={selectedTag === tag.id ? "default" : "outline"}
                className="w-full justify-start"
                onClick={() => setSelectedTag(tag.id)}
              >
                {tag.name}
              </Button>
            ))}
          </div>
        </Card>

        {selectedTag && (
          <div className="md:col-span-3 space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">Edit Content</h2>
              <form onSubmit={handleContentSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="banner_title">Banner Title</Label>
                    <Input
                      id="banner_title"
                      name="banner_title"
                      defaultValue={tagContent?.banner_title || ""}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="banner_subtitle">Banner Subtitle</Label>
                    <Input
                      id="banner_subtitle"
                      name="banner_subtitle"
                      defaultValue={tagContent?.banner_subtitle || ""}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Main Content</Label>
                  <Textarea
                    id="content"
                    name="content"
                    rows={10}
                    defaultValue={tagContent?.content || ""}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="meta_title">Meta Title</Label>
                    <Input
                      id="meta_title"
                      name="meta_title"
                      defaultValue={tagContent?.meta_title || ""}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="meta_description">Meta Description</Label>
                    <Input
                      id="meta_description"
                      name="meta_description"
                      defaultValue={tagContent?.meta_description || ""}
                    />
                  </div>
                </div>

                <Button type="submit">Save Content</Button>
              </form>
            </Card>

            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">FAQs</h2>
              </div>

              <div className="space-y-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Question</TableHead>
                      <TableHead>Answer</TableHead>
                      <TableHead className="w-[100px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {faqs?.map((faq) => (
                      <TableRow key={faq.id}>
                        <TableCell>
                          {editingFaqId === faq.id ? (
                            <Input
                              value={faq.question}
                              onChange={(e) =>
                                updateFaqMutation.mutate({
                                  id: faq.id,
                                  updates: { question: e.target.value },
                                })
                              }
                            />
                          ) : (
                            faq.question
                          )}
                        </TableCell>
                        <TableCell>
                          {editingFaqId === faq.id ? (
                            <Input
                              value={faq.answer}
                              onChange={(e) =>
                                updateFaqMutation.mutate({
                                  id: faq.id,
                                  updates: { answer: e.target.value },
                                })
                              }
                            />
                          ) : (
                            faq.answer
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            {editingFaqId === faq.id ? (
                              <Button
                                size="sm"
                                onClick={() => setEditingFaqId(null)}
                              >
                                <Save className="h-4 w-4" />
                              </Button>
                            ) : (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setEditingFaqId(faq.id)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => deleteFaqMutation.mutate(faq.id)}
                            >
                              <Delete className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <Card className="p-4 bg-gray-50">
                  <h3 className="text-lg font-semibold mb-4">Add New FAQ</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="new-question">Question</Label>
                      <Input
                        id="new-question"
                        value={newFaq.question}
                        onChange={(e) =>
                          setNewFaq({ ...newFaq, question: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="new-answer">Answer</Label>
                      <Textarea
                        id="new-answer"
                        value={newFaq.answer}
                        onChange={(e) =>
                          setNewFaq({ ...newFaq, answer: e.target.value })
                        }
                      />
                    </div>
                    <Button
                      onClick={() => addFaqMutation.mutate(newFaq)}
                      disabled={!newFaq.question || !newFaq.answer}
                    >
                      <Plus className="h-4 w-4 mr-2" /> Add FAQ
                    </Button>
                  </div>
                </Card>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default TagContent;
