import BlogForm from './BlogForm';
import { Blog } from '@/types/blog';

interface EditBlogFormProps {
  blog: Blog;
}

export default function EditBlogForm({ blog }: EditBlogFormProps) {
  return <BlogForm mode="edit" initialData={blog} />;
}
