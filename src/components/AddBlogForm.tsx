import BlogForm from './BlogForm';
import { MODE } from '@/constants/mode';

export default function AddBlogForm() {
  return <BlogForm mode={MODE.ADD} />;
}
