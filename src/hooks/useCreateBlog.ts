import { useState } from 'react';
import { createBlog } from '../services/blogService';
import { NewBlog } from '@/types/blog';

export function useCreateBlog() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const submit = async (newBlog: NewBlog) => {
    setLoading(true);
    setError(null);
    try {
      await createBlog(newBlog);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  return { submit, loading, error };
}
