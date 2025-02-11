
export interface TagContent {
  id: string;
  tag_id: string | null;
  title: string | null;
  content: string | null;
  content_type: string;
  meta_title: string | null;
  meta_description: string | null;
  created_at: string | null;
  updated_at: string | null;
  banner_title: string | null;
  banner_subtitle: string | null;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  tag_id: string | null;
  order_index: number | null;
  created_at: string | null;
  updated_at: string | null;
}
