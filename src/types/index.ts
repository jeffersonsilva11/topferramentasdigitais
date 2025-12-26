export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: string;
  slug: string;
  category: string;
  keywords: string[];
  metaDescription: string;
}

export interface ToolMetadata {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  canonical: string;
}
