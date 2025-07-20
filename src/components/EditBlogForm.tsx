import BlogForm from '@/components/BlogForm';
import { Blog } from '@/types/blog';
import { MODE } from '@/constants/common';

interface EditBlogFormProps {
  blog: Blog;
}

export default function EditBlogForm({ blog }: EditBlogFormProps) {
  return <BlogForm mode={MODE.EDIT} initialData={blog} />;
}
