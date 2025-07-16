import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { blogService, formatDate } from '../services/blogService';
import { BlogPost } from '../types/blog';
import NotFound from './NotFound';

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        code: ({ children, className }) => (
          <code className={`${className} bg-gray-100 px-1 py-0.5 rounded text-sm`}>
            {children}
          </code>
        ),
        pre: ({ children }) => (
          <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
            {children}
          </pre>
        ),
        h1: ({ children }) => (
          <h1 className="text-3xl font-bold mb-6 mt-8 text-gray-900">
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-2xl font-semibold mb-4 mt-6 text-gray-800">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-xl font-semibold mb-3 mt-5 text-gray-800">
            {children}
          </h3>
        ),
        p: ({ children }) => (
          <p className="mb-4 text-gray-700 leading-relaxed">
            {children}
          </p>
        ),
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600 my-4">
            {children}
          </blockquote>
        ),
        ul: ({ children }) => (
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal pl-6 mb-4 text-gray-700">
            {children}
          </ol>
        ),
        a: ({ children, href }) => (
          <a
            href={href}
            className="text-blue-600 hover:text-blue-800 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </a>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

interface BlogPostDisplayProps {
  post: BlogPost;
}

const BlogPostDisplay: React.FC<BlogPostDisplayProps> = ({ post }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <nav className="mb-8">
        <Link 
          to="/blog" 
          className="text-blue-600 hover:text-blue-800 transition-colors inline-flex items-center gap-1"
        >
          ← Back to Blog
        </Link>
      </nav>
      
      <article className="bg-white rounded-lg shadow-sm p-8">
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            {post.featured && (
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
                Featured
              </span>
            )}
            <span className="text-sm text-gray-500">
              {formatDate(post.publishDate)}
            </span>
            <span className="text-sm text-gray-500">•</span>
            <span className="text-sm text-gray-500">
              {post.readingTime} min read
            </span>
          </div>
          
          <h1 className="text-4xl font-bold mb-4 text-gray-900">
            {post.title}
          </h1>
          
          <div className="flex items-center justify-between pb-6 border-b">
            <span className="text-gray-600 font-medium">
              by {post.author}
            </span>
            <div className="flex flex-wrap gap-1">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </header>
        
        <div className="prose-content">
          <MarkdownRenderer content={post.content} />
        </div>
      </article>
    </div>
  );
};

const Post: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  console.log(`Loading post with slug: ${slug}`)
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPost = async () => {
      if (!slug) {
        setError('Post slug is required');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const foundPost = await blogService.getPostBySlug(slug);
        
        if (!foundPost) {
          setError('Post not found');
          setPost(null);
        } else {
          setPost(foundPost);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load post');
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return <NotFound />;
  }

  return <BlogPostDisplay post={post} />;
};

export default Post;