export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      cms: {
        Row: {
          api_support: boolean | null
          auto_updates: boolean | null
          backup_restore: boolean | null
          cdn_integration: boolean | null
          cloud_hosting: boolean | null
          community_size: number | null
          created_at: string | null
          dedicated_hosting: boolean | null
          description: string | null
          development_platform: string[] | null
          documentation_quality: string | null
          enterprise_ready: boolean | null
          featured: boolean | null
          free_ssl: boolean | null
          github_stars: number | null
          hosting_options: string[] | null
          id: string
          image_url: string | null
          is_published: boolean | null
          last_major_release: string | null
          learning_curve: string | null
          market_share: number | null
          meta_canonical: string | null
          meta_description: string | null
          meta_keywords: string[] | null
          meta_og_description: string | null
          meta_og_image: string | null
          meta_og_title: string | null
          meta_robots: string | null
          meta_title: string | null
          meta_twitter_card: string | null
          meta_twitter_description: string | null
          meta_twitter_image: string | null
          meta_twitter_title: string | null
          migration_tools: string[] | null
          multilingual_support: boolean | null
          name: string
          plugin_ecosystem: string | null
          published_at: string | null
          release_frequency: string | null
          self_hosting: boolean | null
          seo_description: string | null
          seo_keywords: string[] | null
          seo_title: string | null
          setup_difficulty: string | null
          slug: string
          support_channels: string[] | null
          tags: string[] | null
          template_engine: string | null
          training_resources: string[] | null
          updated_at: string | null
          website: string | null
        }
        Insert: {
          api_support?: boolean | null
          auto_updates?: boolean | null
          backup_restore?: boolean | null
          cdn_integration?: boolean | null
          cloud_hosting?: boolean | null
          community_size?: number | null
          created_at?: string | null
          dedicated_hosting?: boolean | null
          description?: string | null
          development_platform?: string[] | null
          documentation_quality?: string | null
          enterprise_ready?: boolean | null
          featured?: boolean | null
          free_ssl?: boolean | null
          github_stars?: number | null
          hosting_options?: string[] | null
          id?: string
          image_url?: string | null
          is_published?: boolean | null
          last_major_release?: string | null
          learning_curve?: string | null
          market_share?: number | null
          meta_canonical?: string | null
          meta_description?: string | null
          meta_keywords?: string[] | null
          meta_og_description?: string | null
          meta_og_image?: string | null
          meta_og_title?: string | null
          meta_robots?: string | null
          meta_title?: string | null
          meta_twitter_card?: string | null
          meta_twitter_description?: string | null
          meta_twitter_image?: string | null
          meta_twitter_title?: string | null
          migration_tools?: string[] | null
          multilingual_support?: boolean | null
          name: string
          plugin_ecosystem?: string | null
          published_at?: string | null
          release_frequency?: string | null
          self_hosting?: boolean | null
          seo_description?: string | null
          seo_keywords?: string[] | null
          seo_title?: string | null
          setup_difficulty?: string | null
          slug: string
          support_channels?: string[] | null
          tags?: string[] | null
          template_engine?: string | null
          training_resources?: string[] | null
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          api_support?: boolean | null
          auto_updates?: boolean | null
          backup_restore?: boolean | null
          cdn_integration?: boolean | null
          cloud_hosting?: boolean | null
          community_size?: number | null
          created_at?: string | null
          dedicated_hosting?: boolean | null
          description?: string | null
          development_platform?: string[] | null
          documentation_quality?: string | null
          enterprise_ready?: boolean | null
          featured?: boolean | null
          free_ssl?: boolean | null
          github_stars?: number | null
          hosting_options?: string[] | null
          id?: string
          image_url?: string | null
          is_published?: boolean | null
          last_major_release?: string | null
          learning_curve?: string | null
          market_share?: number | null
          meta_canonical?: string | null
          meta_description?: string | null
          meta_keywords?: string[] | null
          meta_og_description?: string | null
          meta_og_image?: string | null
          meta_og_title?: string | null
          meta_robots?: string | null
          meta_title?: string | null
          meta_twitter_card?: string | null
          meta_twitter_description?: string | null
          meta_twitter_image?: string | null
          meta_twitter_title?: string | null
          migration_tools?: string[] | null
          multilingual_support?: boolean | null
          name?: string
          plugin_ecosystem?: string | null
          published_at?: string | null
          release_frequency?: string | null
          self_hosting?: boolean | null
          seo_description?: string | null
          seo_keywords?: string[] | null
          seo_title?: string | null
          setup_difficulty?: string | null
          slug?: string
          support_channels?: string[] | null
          tags?: string[] | null
          template_engine?: string | null
          training_resources?: string[] | null
          updated_at?: string | null
          website?: string | null
        }
        Relationships: []
      }
      cms_additional_info: {
        Row: {
          cms_id: string | null
          community_support: string | null
          created_at: string | null
          customization: string | null
          ease_of_use: string | null
          id: string
          official_support: string | null
          scalability: string | null
          security: string | null
          seo_and_performance: string | null
          updated_at: string | null
        }
        Insert: {
          cms_id?: string | null
          community_support?: string | null
          created_at?: string | null
          customization?: string | null
          ease_of_use?: string | null
          id?: string
          official_support?: string | null
          scalability?: string | null
          security?: string | null
          seo_and_performance?: string | null
          updated_at?: string | null
        }
        Update: {
          cms_id?: string | null
          community_support?: string | null
          created_at?: string | null
          customization?: string | null
          ease_of_use?: string | null
          id?: string
          official_support?: string | null
          scalability?: string | null
          security?: string | null
          seo_and_performance?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cms_additional_info_cms_id_fkey"
            columns: ["cms_id"]
            isOneToOne: false
            referencedRelation: "cms"
            referencedColumns: ["id"]
          },
        ]
      }
      cms_imports: {
        Row: {
          created_at: string | null
          error_message: string | null
          filename: string
          id: string
          records_failed: number | null
          records_processed: number | null
          status: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          error_message?: string | null
          filename: string
          id?: string
          records_failed?: number | null
          records_processed?: number | null
          status?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          error_message?: string | null
          filename?: string
          id?: string
          records_failed?: number | null
          records_processed?: number | null
          status?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      cms_tags: {
        Row: {
          cms_id: string
          tag_id: string
        }
        Insert: {
          cms_id: string
          tag_id: string
        }
        Update: {
          cms_id?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cms_tags_cms_id_fkey"
            columns: ["cms_id"]
            isOneToOne: false
            referencedRelation: "cms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cms_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
        ]
      }
      cons: {
        Row: {
          cms_id: string | null
          created_at: string | null
          description: string
          id: string
          updated_at: string | null
        }
        Insert: {
          cms_id?: string | null
          created_at?: string | null
          description: string
          id?: string
          updated_at?: string | null
        }
        Update: {
          cms_id?: string | null
          created_at?: string | null
          description?: string
          id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cons_cms_id_fkey"
            columns: ["cms_id"]
            isOneToOne: false
            referencedRelation: "cms"
            referencedColumns: ["id"]
          },
        ]
      }
      faqs: {
        Row: {
          answer: string
          created_at: string | null
          id: string
          order_index: number | null
          question: string
          tag_id: string | null
          updated_at: string | null
        }
        Insert: {
          answer: string
          created_at?: string | null
          id?: string
          order_index?: number | null
          question: string
          tag_id?: string | null
          updated_at?: string | null
        }
        Update: {
          answer?: string
          created_at?: string | null
          id?: string
          order_index?: number | null
          question?: string
          tag_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "faqs_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
        ]
      }
      features: {
        Row: {
          cms_id: string | null
          description: string | null
          icon: string | null
          id: string
          title: string
        }
        Insert: {
          cms_id?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          title: string
        }
        Update: {
          cms_id?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "features_cms_id_fkey"
            columns: ["cms_id"]
            isOneToOne: false
            referencedRelation: "cms"
            referencedColumns: ["id"]
          },
        ]
      }
      page_seo: {
        Row: {
          changefreq: string | null
          created_at: string | null
          id: string
          meta_canonical: string | null
          meta_description: string | null
          meta_keywords: string[] | null
          meta_og_description: string | null
          meta_og_image: string | null
          meta_og_title: string | null
          meta_robots: string | null
          meta_title: string | null
          meta_twitter_card: string | null
          meta_twitter_description: string | null
          meta_twitter_image: string | null
          meta_twitter_title: string | null
          priority: number | null
          updated_at: string | null
          url_pattern: string
        }
        Insert: {
          changefreq?: string | null
          created_at?: string | null
          id?: string
          meta_canonical?: string | null
          meta_description?: string | null
          meta_keywords?: string[] | null
          meta_og_description?: string | null
          meta_og_image?: string | null
          meta_og_title?: string | null
          meta_robots?: string | null
          meta_title?: string | null
          meta_twitter_card?: string | null
          meta_twitter_description?: string | null
          meta_twitter_image?: string | null
          meta_twitter_title?: string | null
          priority?: number | null
          updated_at?: string | null
          url_pattern: string
        }
        Update: {
          changefreq?: string | null
          created_at?: string | null
          id?: string
          meta_canonical?: string | null
          meta_description?: string | null
          meta_keywords?: string[] | null
          meta_og_description?: string | null
          meta_og_image?: string | null
          meta_og_title?: string | null
          meta_robots?: string | null
          meta_title?: string | null
          meta_twitter_card?: string | null
          meta_twitter_description?: string | null
          meta_twitter_image?: string | null
          meta_twitter_title?: string | null
          priority?: number | null
          updated_at?: string | null
          url_pattern?: string
        }
        Relationships: []
      }
      performance_metrics: {
        Row: {
          cms_id: string | null
          id: string
          metric_name: string
          unit: string | null
          value: number
        }
        Insert: {
          cms_id?: string | null
          id?: string
          metric_name: string
          unit?: string | null
          value: number
        }
        Update: {
          cms_id?: string | null
          id?: string
          metric_name?: string
          unit?: string | null
          value?: number
        }
        Relationships: [
          {
            foreignKeyName: "performance_metrics_cms_id_fkey"
            columns: ["cms_id"]
            isOneToOne: false
            referencedRelation: "cms"
            referencedColumns: ["id"]
          },
        ]
      }
      pricing: {
        Row: {
          billing_period: string | null
          cms_id: string | null
          features: string[] | null
          id: string
          plan_name: string
          price: number | null
        }
        Insert: {
          billing_period?: string | null
          cms_id?: string | null
          features?: string[] | null
          id?: string
          plan_name: string
          price?: number | null
        }
        Update: {
          billing_period?: string | null
          cms_id?: string | null
          features?: string[] | null
          id?: string
          plan_name?: string
          price?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "pricing_cms_id_fkey"
            columns: ["cms_id"]
            isOneToOne: false
            referencedRelation: "cms"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          id: string
          role: string
        }
        Insert: {
          created_at?: string | null
          id: string
          role?: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: string
        }
        Relationships: []
      }
      pros: {
        Row: {
          cms_id: string | null
          created_at: string | null
          description: string
          id: string
          updated_at: string | null
        }
        Insert: {
          cms_id?: string | null
          created_at?: string | null
          description: string
          id?: string
          updated_at?: string | null
        }
        Update: {
          cms_id?: string | null
          created_at?: string | null
          description?: string
          id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pros_cms_id_fkey"
            columns: ["cms_id"]
            isOneToOne: false
            referencedRelation: "cms"
            referencedColumns: ["id"]
          },
        ]
      }
      ratings: {
        Row: {
          category: string
          cms_id: string | null
          id: string
          score: number
          weight: number | null
        }
        Insert: {
          category: string
          cms_id?: string | null
          id?: string
          score: number
          weight?: number | null
        }
        Update: {
          category?: string
          cms_id?: string | null
          id?: string
          score?: number
          weight?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "ratings_cms_id_fkey"
            columns: ["cms_id"]
            isOneToOne: false
            referencedRelation: "cms"
            referencedColumns: ["id"]
          },
        ]
      }
      tag_content: {
        Row: {
          banner_subtitle: string | null
          banner_title: string | null
          category_benefits: string[] | null
          content: string | null
          content_type: string
          created_at: string | null
          id: string
          introduction_text: string | null
          meta_description: string | null
          meta_og_description: string | null
          meta_og_image: string | null
          meta_og_title: string | null
          meta_title: string | null
          meta_twitter_description: string | null
          meta_twitter_image: string | null
          meta_twitter_title: string | null
          seo_description: string | null
          seo_keywords: string[] | null
          seo_title: string | null
          tag_id: string | null
          title: string | null
          updated_at: string | null
        }
        Insert: {
          banner_subtitle?: string | null
          banner_title?: string | null
          category_benefits?: string[] | null
          content?: string | null
          content_type: string
          created_at?: string | null
          id?: string
          introduction_text?: string | null
          meta_description?: string | null
          meta_og_description?: string | null
          meta_og_image?: string | null
          meta_og_title?: string | null
          meta_title?: string | null
          meta_twitter_description?: string | null
          meta_twitter_image?: string | null
          meta_twitter_title?: string | null
          seo_description?: string | null
          seo_keywords?: string[] | null
          seo_title?: string | null
          tag_id?: string | null
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          banner_subtitle?: string | null
          banner_title?: string | null
          category_benefits?: string[] | null
          content?: string | null
          content_type?: string
          created_at?: string | null
          id?: string
          introduction_text?: string | null
          meta_description?: string | null
          meta_og_description?: string | null
          meta_og_image?: string | null
          meta_og_title?: string | null
          meta_title?: string | null
          meta_twitter_description?: string | null
          meta_twitter_image?: string | null
          meta_twitter_title?: string | null
          seo_description?: string | null
          seo_keywords?: string[] | null
          seo_title?: string | null
          tag_id?: string | null
          title?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tag_content_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
        ]
      }
      tags: {
        Row: {
          banner_subtitle: string | null
          banner_title: string | null
          description: string | null
          header_image: string | null
          id: string
          name: string
          seo_description: string | null
          seo_title: string | null
          slug: string
        }
        Insert: {
          banner_subtitle?: string | null
          banner_title?: string | null
          description?: string | null
          header_image?: string | null
          id?: string
          name: string
          seo_description?: string | null
          seo_title?: string | null
          slug: string
        }
        Update: {
          banner_subtitle?: string | null
          banner_title?: string | null
          description?: string | null
          header_image?: string | null
          id?: string
          name?: string
          seo_description?: string | null
          seo_title?: string | null
          slug?: string
        }
        Relationships: []
      }
      tech_stack: {
        Row: {
          cms_id: string | null
          id: string
          name: string
        }
        Insert: {
          cms_id?: string | null
          id?: string
          name: string
        }
        Update: {
          cms_id?: string | null
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "tech_stack_cms_id_fkey"
            columns: ["cms_id"]
            isOneToOne: false
            referencedRelation: "cms"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
