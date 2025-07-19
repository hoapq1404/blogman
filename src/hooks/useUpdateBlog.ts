import { useState } from 'react';
import { updateBlog } from '../services/blogService';
import { Blog } from '@/types/blog';

export function useUpdateBlog() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const submit = async (id: string, blogData: Partial<Blog>) => {
    setLoading(true);
    setError(null);
    try {
      await updateBlog(id, blogData);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  return { submit, loading, error };
}
