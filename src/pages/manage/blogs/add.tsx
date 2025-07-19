import AddBlogForm from '@/components/BlogForm';
import Link from 'next/link';
import React from 'react';

export default function Page() {
  return (
    <React.Fragment>
      <h1>Add Blog</h1>
      <Link href="/manage/blogs">
        <button>Back</button>
      </Link>
      <AddBlogForm />
    </React.Fragment>
  );
}
