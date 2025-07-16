// types/blog.ts
export interface BlogPostFrontmatter {
    id: string;
    title: string;
    slug: string;
    author: string;
    publishDate: string;
    tags: string[];
    featured: boolean;
    excerpt: string;
  }
  
  export interface BlogPost extends BlogPostFrontmatter {
    content: string;
    readingTime: number;
    filename: string;
  }
  
  export interface BlogPostSummary extends BlogPostFrontmatter {
    readingTime: number;
    filename: string;
  }
  
  // types/markdown.ts
  export interface MarkdownFile {
    frontmatter: BlogPostFrontmatter;
    content: string;
    filename: string;
  }

  