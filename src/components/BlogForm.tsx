import { useCreateBlog } from '@/hooks/useCreateBlog';
import { useUpdateBlog } from '@/hooks/useUpdateBlog';
import { NewBlog, Blog } from '@/types/blog';
import { useForm } from '@tanstack/react-form';
import { useRouter } from 'next/router'
import { AsyncBoundary } from './AsyncBoundary';
import { ImageUpload } from './ImageUpload';
import { MODE, Mode } from '@/constants/mode';

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
                                <input
                                    id='name'
                                    type='text'
                                    value={field.state.value as string}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    placeholder='Enter blog name'
                                    required
                                    style={{ 
                                        width: '100%', 
                                        padding: '8px', 
                                        marginTop: '4px',
                                        border: '1px solid #ddd',
                                        borderRadius: '4px'
                                    }}
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
                                <input
                                    id='title'
                                    type='text'
                                    value={(field.state.value as string) || ''}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    placeholder='Enter blog title'
                                    style={{ 
                                        width: '100%', 
                                        padding: '8px', 
                                        marginTop: '4px',
                                        border: '1px solid #ddd',
                                        borderRadius: '4px'
                                    }}
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
                                    style={{ 
                                        width: '100%', 
                                        padding: '8px', 
                                        marginTop: '4px',
                                        border: '1px solid #ddd',
                                        borderRadius: '4px',
                                        resize: 'vertical'
                                    }}
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
                                        onChange={(imageUrl) => field.handleChange(imageUrl || '')}
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
                    
                    <div>
                        <button 
                            type='submit' 
                            disabled={loading}
                            style={{
                                padding: '10px 20px',
                                backgroundColor: '#007bff',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: loading ? 'not-allowed' : 'pointer',
                                opacity: loading ? 0.6 : 1
                            }}
                        >
                            {loading ? (isEditMode ? 'Updating...' : 'Creating...') : (isEditMode ? 'Update Blog' : 'Create Blog')}
                        </button>
                        <button 
                            type='button' 
                            onClick={() => router.push('/manage/blogs')}
                            disabled={loading}
                            style={{
                                padding: '10px 20px',
                                backgroundColor: '#6c757d',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: loading ? 'not-allowed' : 'pointer',
                                opacity: loading ? 0.6 : 1
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </AsyncBoundary>
        </div>
    );
}