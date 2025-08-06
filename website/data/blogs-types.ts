
export interface EditorBlock {
  id?: string;
  type: string;
  data: Record<string, any>;
}

export interface EditorContent {
  time: number;
  blocks: EditorBlock[];
  version?: string;
}

export interface BlogAPIResponse {
  success: boolean;
  message?: string;
  data?: Blog;
  error?: string;
  validationErrors?: Record<string, string>;
}

// Main Blog interface
export interface Blog {
  _id: string;
  slug?: string;
  title: string;
  author: string;
  coverImage: string;
  content: EditorContent;
  category:
    | "Destinations"
    | "Travel Tips"
    | "Cultural Guides"
    | "Adventure"
    | "Food & Places"
    | "Luxury"
    | "Trekking"
    | "Wildlife"
    | "Culture";
  isFeatured: boolean;
  status: "draft" | "published";
  summary: string;
  tags: string[];
  readTime: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface BlogListResponse {
  blogs: Blog[];
  total: number;
  page: number;
  limit: number;
}
export interface SearchBlogsResponse {
  success: boolean;
  message?: string;
  blogs: Blog[];
}
