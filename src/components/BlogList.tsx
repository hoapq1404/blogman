import { Blog } from '@/types/blog';

export function BlogList({ Blogs }: { Blogs: Blog[] }) {
  if (Blogs.length === 0) return <p>No Blogs found.</p>;

  return (
    <ul className="mt-4 space-y-2">
      {Blogs.map((Blog) => (
        <li key={Blog.id}>{Blog.name}</li>
      ))}
    </ul>
  );
}
