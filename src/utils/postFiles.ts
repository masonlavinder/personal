// config/posts-config.ts
export const postFiles = [
    '/post-1.md',
    '/post-2.md',
];
  
// Helper to get slug from filename
export const getSlugFromFilename = (filename: string): string => {
return filename.replace(/^\//, '').replace(/\.md$/, '');
};

// Helper to get filename from slug
export const getFilenameFromSlug = (slug: string): string => {
return `/${slug}.md`;
};