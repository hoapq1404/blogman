import { AsyncBoundary } from '@/components/AsyncBoundary';
import BlogTable from '@/components/BlogTable';
import { Button } from '@/components/ui/button';
import { useBlogs } from '@/hooks/useBlogs';
import Link from 'next/link';
import React from 'react';

export default function Page() {
  const { Blogs, loading, error } = useBlogs();

  return (
    <React.Fragment>
      <h1>Firestore Data</h1>
      <Link href="/manage/blogs/add">
        <Button>Add Blog</Button>
      </Link>
      <AsyncBoundary isLoading={loading} error={error}>
        <BlogTable Blogs={Blogs} />
      </AsyncBoundary>
    </React.Fragment>
  );
}
