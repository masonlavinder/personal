import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { blogService, formatDate } from '../../services/blogService';
import { BlogPost } from '../../types/blog';
import NotFound from '../NotFound';
import styles from './Post.module.css'

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  return (
    <div className={styles.content}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

interface BlogPostDisplayProps {
  post: BlogPost;
}

const BlogPostDisplay: React.FC<BlogPostDisplayProps> = ({ post }) => {
  return (
      <div>
        <article className={styles.article}>
          <header className={styles.header}>
            <div className={styles.metadata}>
              {post.featured && (
                <span className={styles.featuredBadge}>
                  Featured
                </span>
              )}
              <span className={styles.publishDate}>
                {formatDate(post.publishDate)}
              </span>
              <span className={styles.separator}>•</span>
              <span className={styles.readingTime}>
                {post.readingTime} min read
              </span>
            </div>

            <h1 className={styles.title}>
              {post.title}
            </h1>

            <div className={styles.authorInfo}>
              <span className={styles.author}>
                by {post.author}
              </span>
              <div className={styles.tags}>
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className={styles.tag}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </header>
          <MarkdownRenderer content={post.content} />
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
      <div className={styles.loadingContainer}>
        <p>Loading...</p>
      </div>
    );
  }

  if (error || !post) {
    return <NotFound />;
  }

  return <BlogPostDisplay post={post} />;
};

export default Post;