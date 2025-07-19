import BlogForm from './BlogForm';
import { Blog } from '@/types/blog';
import { MODE } from '@/constants/mode';

interface EditBlogFormProps {
  blog: Blog;
}

export default function EditBlogForm({ blog }: EditBlogFormProps) {
  return <BlogForm mode={MODE.EDIT} initialData={blog} />;
}
