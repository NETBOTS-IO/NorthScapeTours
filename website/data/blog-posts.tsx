import Image from "next/image";
import type { ReactNode } from "react";

export interface BlogPost {
  slug?: any;
  id: number;
  title: string;
  excerpt: string;
  content: ReactNode;
  coverImage: string;
  date: string;
  author: string;
  category: string;
  tags?: string[];
}
