// services/blogService.ts
import matter from 'gray-matter';
import { BlogPost, BlogPostSummary, BlogPostFrontmatter } from '../types/blog';
import { Buffer } from 'buffer';
import { postFiles } from '../utils/postFiles'; // Assuming you have a file that exports the list of post filenames

declare global {
  interface Window {
    Buffer: typeof Buffer;
  }
}

if (typeof window !== 'undefined') {
  (window as any).Buffer = Buffer; // this is needed for browser environments for md parsing
}

class BlogService {
  private posts: BlogPost[] = [];
  private postsLoaded = false;

  // Calculate reading time (average 200 words per minute)
  private calculateReadingTime(content: string): number {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).filter(word => word.length > 0).length;
    return Math.ceil(words / wordsPerMinute);
  }

  // Load all markdown posts
  async loadPosts(): Promise<void> {
    if (this.postsLoaded) return;

    try {
      
      const loadedPosts: BlogPost[] = [];

      for (const filename of postFiles) {
        try {
          const response = await fetch(`/personal/posts/${filename}`);
          if (!response.ok) continue;
          
          const markdownContent = await response.text();
          const { data, content } = matter(markdownContent);
          
          const frontmatter = data as BlogPostFrontmatter;
          const readingTime = this.calculateReadingTime(content);

          loadedPosts.push({
            ...frontmatter,
            content,
            readingTime,
            filename
          });
        } catch (error) {
          console.warn(`Failed to load post ${filename}:`, error);
        }
      }

      // Sort by publish date (newest first)
      this.posts = loadedPosts.sort((a, b) => 
        new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
      );

      this.postsLoaded = true;
    } catch (error) {
      console.error('Failed to load blog posts:', error);
      throw new Error('Failed to load blog posts');
    }
  }

  // Get all posts (summaries)
  async getAllPosts(): Promise<BlogPostSummary[]> {
    await this.loadPosts();
    return this.posts.map(({ content, ...post }) => post);
  }

  // Get featured posts
  async getFeaturedPosts(): Promise<BlogPostSummary[]> {
    await this.loadPosts();
    return this.posts
      .filter(post => post.featured)
      .map(({ content, ...post }) => post);
  }

  // Get post by ID
  async getPostById(id: string): Promise<BlogPost | null> {
    await this.loadPosts();
    return this.posts.find(post => post.id === id) || null;
  }

  // Get post by slug
  async getPostBySlug(slug: string): Promise<BlogPost | null> {
    await this.loadPosts();
    return this.posts.find(post => post.slug === slug) || null;
  }

  // Get posts by tag
  async getPostsByTag(tag: string): Promise<BlogPostSummary[]> {
    await this.loadPosts();
    return this.posts
      .filter(post => post.tags.includes(tag))
      .map(({ content, ...post }) => post);
  }

  // Get all unique tags
  async getAllTags(): Promise<string[]> {
    await this.loadPosts();
    const tagSet = new Set<string>();
    this.posts.forEach(post => {
      post.tags.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }

  // Search posts
  async searchPosts(query: string): Promise<BlogPostSummary[]> {
    await this.loadPosts();
    const lowercaseQuery = query.toLowerCase();
    
    return this.posts
      .filter(post => 
        post.title.toLowerCase().includes(lowercaseQuery) ||
        post.excerpt.toLowerCase().includes(lowercaseQuery) ||
        post.content.toLowerCase().includes(lowercaseQuery) ||
        post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
      )
      .map(({ content, ...post }) => post);
  }
}

// Export singleton instance
export const blogService = new BlogService();

// Utility functions
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const formatDateShort = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};