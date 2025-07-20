import { useCreateBlog } from '@/hooks/useCreateBlog';
import { useUpdateBlog } from '@/hooks/useUpdateBlog';
import { NewBlog, Blog } from '@/types/blog';
// import { useForm } from '@tanstack/react-form';
import { useAppForm } from '@/components/ui/tanstack-form';
import { useRouter } from 'next/router';
import { AsyncBoundary } from '@/components/AsyncBoundary';
import ImageUpload from '@/components/ImageUpload';
import { MODE, Mode } from '@/constants/common';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface BlogFormProps {
  mode: Mode;
  initialData?: Blog;
}

export default function BlogForm({ mode, initialData }: BlogFormProps) {
  const router = useRouter();
  const {
    submit: createBlogSubmit,
    loading: createLoading,
    error: createError,
  } = useCreateBlog();
  const {
    submit: updateBlogSubmit,
    loading: updateLoading,
    error: updateError,
  } = useUpdateBlog();

  const isEditMode = mode === MODE.EDIT;
  const loading = isEditMode ? updateLoading : createLoading;
  const error = isEditMode ? updateError : createError;

  const blogForm = useAppForm({
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
    },
  });

  return (
    <blogForm.AppForm>
      <h1>{isEditMode ? 'Edit Blog' : 'Add Blog'}</h1>
      <AsyncBoundary isLoading={loading} error={error}>
        <form onSubmit={blogForm.handleSubmit}>
          <blogForm.AppField name="name">
            {(field) => (
              <field.FormItem>
                <field.FormLabel htmlFor="name">Blog Name:</field.FormLabel>
                <field.FormControl>
                  <Input
                    id="name"
                    type="text"
                    value={field.state.value as string}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Enter blog name"
                  />
                </field.FormControl>
                {field.state.meta.errors && (
                  <field.FormItem>
                    {field.state.meta.errors.join(', ')}
                  </field.FormItem>
                )}
              </field.FormItem>
            )}
          </blogForm.AppField>

          <blogForm.AppField name="title">
            {(field) => (
              <field.FormItem>
                <field.FormLabel htmlFor="title">Blog Title:</field.FormLabel>
                <field.FormControl>
                  <Input
                    id="title"
                    type="text"
                    value={(field.state.value as string) || ''}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Enter blog title"
                  />
                </field.FormControl>
                {field.state.meta.errors && (
                  <field.FormItem>
                    {field.state.meta.errors.join(', ')}
                  </field.FormItem>
                )}
              </field.FormItem>
            )}
          </blogForm.AppField>

          <blogForm.AppField name="content">
            {(field) => (
              <field.FormItem>
                <field.FormLabel htmlFor="content">Content:</field.FormLabel>
                <field.FormControl>
                  <textarea
                    id="content"
                    value={(field.state.value as string) || ''}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Enter blog content"
                    rows={5}
                  />
                </field.FormControl>
                {field.state.meta.errors && (
                  <field.FormItem>
                    {field.state.meta.errors.join(', ')}
                  </field.FormItem>
                )}
              </field.FormItem>
            )}
          </blogForm.AppField>

          <blogForm.AppField name="image">
            {(field) => (
              <field.FormItem>
                <field.FormLabel htmlFor="image">Blog Image:</field.FormLabel>
                <ImageUpload
                  value={(field.state.value as string) || ''}
                  onChange={(imageUrl: string | null) =>
                    field.handleChange(imageUrl || '')
                  }
                  disabled={loading}
                  placeholder="Choose a blog image..."
                />
                {field.state.meta.errors && (
                  <field.FormItem>
                    {field.state.meta.errors.join(', ')}
                  </field.FormItem>
                )}
              </field.FormItem>
            )}
          </blogForm.AppField>

          <blogForm.AppField name="author">
            {(field) => (
              <field.FormItem>
                <field.FormLabel htmlFor="author">Author:</field.FormLabel>
                <field.FormControl>
                  <Input
                    id="author"
                    type="text"
                    value={(field.state.value as string) || ''}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </field.FormControl>
                {field.state.meta.errors && (
                  <field.FormItem>
                    {field.state.meta.errors.join(', ')}
                  </field.FormItem>
                )}
              </field.FormItem>
            )}
          </blogForm.AppField>

          <blogForm.AppField name="author">
            {(field) => (
              <field.FormItem>
                <field.FormLabel htmlFor="author">Author:</field.FormLabel>
                <field.FormControl>
                  <Input
                    id="author"
                    type="text"
                    value={(field.state.value as string) || ''}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Enter author name or ID"
                  />
                </field.FormControl>
                {field.state.meta.errors && (
                  <field.FormItem>
                    {field.state.meta.errors.join(', ')}
                  </field.FormItem>
                )}
              </field.FormItem>
            )}
          </blogForm.AppField>

          <div>
            <Button type="submit" disabled={loading}>
              {loading
                ? isEditMode
                  ? 'Updating...'
                  : 'Creating...'
                : isEditMode
                ? 'Update Blog'
                : 'Create Blog'}
            </Button>
            <Button
              type="button"
              onClick={() => router.push('/manage/blogs')}
              disabled={loading}
            >
              Cancel
            </Button>
          </div>
        </form>
      </AsyncBoundary>
    </blogForm.AppForm>
  );
}
