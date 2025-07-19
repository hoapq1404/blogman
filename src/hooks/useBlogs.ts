import { useEffect, useState } from 'react';
import { getAllBlogs } from '../services/blogService';
import { Blog } from '@/types/blog';

export function useBlogs() {
  const [Blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    getAllBlogs()
      .then((data) => {
        setBlogs(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err as Error);
        setLoading(false);
      });
  }, []);

  return { Blogs, loading, error };
}
