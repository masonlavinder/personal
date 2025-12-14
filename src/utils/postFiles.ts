// config/posts-config.ts
// Use Vite's glob import to automatically discover all markdown files in public/posts/
// This is evaluated at build time, so new posts are automatically included
const postModules = import.meta.glob('/public/posts/*.md', { eager: false });

// Extract filenames from the glob import paths
export const postFiles = Object.keys(postModules).map(path => {
  // Convert '/public/posts/post-1.md' to 'post-1.md'
  return path.replace('/public/posts/', '');
});

// Helper to get slug from filename
export const getSlugFromFilename = (filename: string): string => {
  return filename.replace(/^\//, '').replace(/\.md$/, '');
};

// Helper to get filename from slug
export const getFilenameFromSlug = (slug: string): string => {
  return `/${slug}.md`;
};