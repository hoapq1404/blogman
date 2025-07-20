import BlogForm from './BlogForm';
import { MODE } from '@/constants/common';

export default function AddBlogForm() {
  return <BlogForm mode={MODE.ADD} />;
}
