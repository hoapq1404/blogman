import { useCreateBlog } from '@/hooks/useCreateBlog';
import { useUpdateBlog } from '@/hooks/useUpdateBlog';
import { NewBlog, Blog } from '@/types/blog';
import { useForm } from '@tanstack/react-form';
import { useRouter } from 'next/router'
import { AsyncBoundary } from '@/components/AsyncBoundary';
import  ImageUpload from '@/components/ImageUpload';
import { MODE, Mode } from '@/constants/common';
import { Input } from '@/components/ui/input';

interface BlogFormProps {
  mode: Mode,
  initialData?: Blog;
}

export default function BlogForm({ mode, initialData }: BlogFormProps) {
    const router = useRouter();
    const { submit: createBlogSubmit, loading: createLoading, error: createError } = useCreateBlog();
    const { submit: updateBlogSubmit, loading: updateLoading, error: updateError } = useUpdateBlog();
    
    const isEditMode = mode === MODE.EDIT
    const loading = isEditMode ? updateLoading : createLoading;
    const error = isEditMode ? updateError : createError;

    const blogForm = useForm({
        defaultValues: {
            name: initialData?.name || '',
            title: initialData?.title || '',
            content: initialData?.content || '',
            image: initialData?.image || '',
        } as NewBlog,
        onSubmit: async ({ value }) => {
            try {
                if (isEditMode && initialData?.id) {
                    await updateBlogSubmit(initialData.id, value);
                } else {
                    await createBlogSubmit(value);
                }
                // Navigate back to blogs list on success
                router.push('/manage/blogs');
            } catch (error) {
                console.error('Error saving blog:', error);
            }
        }
    });
    
    return (
        <div>
            <h1>{isEditMode ? 'Edit Blog' : 'Add Blog'}</h1>
            <AsyncBoundary isLoading={loading} error={error}>
                <form onSubmit={blogForm.handleSubmit}>
                    <blogForm.Field name='name'>
                        {(field) => (
                            <div>
                                <label htmlFor='name'>Blog Name:</label>
                                <Input
                                    id='name'
                                    type='text'
                                    value={field.state.value as string}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    placeholder='Enter blog name'
                                    required
                                />
                                {field.state.meta.errors && (
                                    <div>
                                        {field.state.meta.errors.join(', ')}
                                    </div>
                                )}
                            </div>
                        )}
                    </blogForm.Field>
                    
                    <blogForm.Field name='title'>
                        {(field) => (
                            <div>
                                <label htmlFor='title'>Blog Title:</label>
                                <Input
                                    id='title'
                                    type='text'
                                    value={(field.state.value as string) || ''}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    placeholder='Enter blog title'
                                />
                                {field.state.meta.errors && (
                                    <div>
                                        {field.state.meta.errors.join(', ')}
                                    </div>
                                )}
                            </div>
                        )}
                    </blogForm.Field>
                    
                    <blogForm.Field name='content'>
                        {(field) => (
                            <div>
                                <label htmlFor='content'>Content:</label>
                                <textarea
                                    id='content'
                                    value={(field.state.value as string) || ''}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    placeholder='Enter blog content'
                                    rows={5}
                                />
                                {field.state.meta.errors && (
                                    <div>
                                        {field.state.meta.errors.join(', ')}
                                    </div>
                                )}
                            </div>
                        )}
                    </blogForm.Field>
                    
                    <blogForm.Field name='image'>
                        {(field) => (
                            <div>
                                <label htmlFor='image'>Blog Image:</label>
                                <div>
                                    <ImageUpload
                                        value={(field.state.value as string) || ''}
                                        onChange={(imageUrl: string | null) => field.handleChange(imageUrl || '')}
                                        disabled={loading}
                                        placeholder='Choose a blog image...'
                                    />
                                </div>
                                {field.state.meta.errors && (
                                    <div>
                                        {field.state.meta.errors.join(', ')}
                                    </div>
                                )}
                            </div>
                        )}
                    </blogForm.Field>

                    <blogForm.Field name='author'>
                        {(field) => (
                            <div>
                                <label htmlFor='author'>Author:</label>
                                <Input
                                    id='author'
                                    type='text'
                                    value={(field.state.value as string) || ''}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    placeholder='Enter author name or ID'
                                />
                                {field.state.meta.errors && (
                                    <div>
                                        {field.state.meta.errors.join(', ')}
                                    </div>
                                )}
                            </div>
                        )}
                    </blogForm.Field>

                    <div>
                        <button 
                            type='submit' 
                            disabled={loading}
                        >
                            {loading ? (isEditMode ? 'Updating...' : 'Creating...') : (isEditMode ? 'Update Blog' : 'Create Blog')}
                        </button>
                        <button 
                            type='button' 
                            onClick={() => router.push('/manage/blogs')}
                            disabled={loading}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </AsyncBoundary>
        </div>
    );
}