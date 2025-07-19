import { deleteBlog } from '@/services/blogService';
import { useState } from 'react';

export function useDeleteBlog() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const submit = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await deleteBlog(id);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  return { submit, loading, error };
}