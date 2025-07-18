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
    <div>
      <nav >
        <Link 
          to="/personal/blog" 
        >
          ← Back to Blog
        </Link>
      </nav>
      
      <article >
        <header >
          <div >
            {post.featured && (
              <span>
                Featured
              </span>
            )}
            <span >
              {formatDate(post.publishDate)}
            </span>
            <span >•</span>
            <span >
              {post.readingTime} min read
            </span>
          </div>
          
          <h1 >
            {post.title}
          </h1>
          
          <div >
            <span >
              by {post.author}
            </span>
            <div >
              {post.tags.map((tag) => (
                <span
                  key={tag}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </header>
        
        <div >
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
      <div>
        <p>Loading</p>
      </div>
    );
  }

  if (error || !post) {
    return <NotFound />;
  }

  return <BlogPostDisplay post={post} />;
};

export default Post;