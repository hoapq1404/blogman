import { useState, useEffect } from 'react';
import { getBlog } from '../services/blogService';
import { Blog } from '@/types/blog';

export function useBlog(id: string) {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchBlog = async () => {
      setLoading(true);
      setError(null);
      try {
        const blogData = await getBlog(id);
        setBlog(blogData);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  return { blog, loading, error };
}
