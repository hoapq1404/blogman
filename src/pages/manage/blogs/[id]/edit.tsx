import { useRouter } from 'next/router';
import BlogForm from '@/components/BlogForm';
import { useBlog } from '@/hooks/useBlog';
import { AsyncBoundary } from '@/components/AsyncBoundary';

export default function Page() {
    const router = useRouter();
    const pageId = router.query.id as string;
    const { blog, loading, error } = useBlog(pageId);

    return (
        <div>
            <AsyncBoundary
                isLoading={loading}
                error={error}
                loadingFallback={<p>Loading blog...</p>}
                errorFallback={<p>Error loading blog: {error?.message || 'Blog not found'}</p>}
            >
                {blog ? (
                    <BlogForm mode="edit" initialData={blog} />
                ) : (
                    <p>Blog not found</p>
                )}
            </AsyncBoundary>
        </div>
    );  
}