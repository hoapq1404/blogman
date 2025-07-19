import { Blog } from '@/types/blog';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table';
import React from 'react';
import { AsyncBoundary } from './AsyncBoundary';
import { useDeleteBlog } from '@/hooks/useDeleteBlog';
import { useRouter } from 'next/router';

export default function BlogTable({ Blogs }: { Blogs: Blog[] }) {
  const [globalFilter] = React.useState('');
  const [posts, setPosts] = React.useState<Blog[]>(Blogs);
  const { submit: deleteBlog, loading: isDeleting, error: deleteError } = useDeleteBlog();
  const router = useRouter();

  const handleDelete = React.useCallback(async (id: string) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this post?'
    );
    if (!confirmed) return;
    
    try {
        await deleteBlog(id);
        // Remove the deleted post from local state after successful deletion
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    } catch (error) {
        console.error('Error deleting post:', error);
    }
  }, [deleteBlog]);

  const handleRowClick = (id: string) => {
    router.push(`/manage/blogs/${id}/edit`);
  };

  const columns = React.useMemo<ColumnDef<Blog>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
      },
      {
        accessorKey: 'name',
        header: 'Name',
      },
      {
        accessorKey: 'createdAt',
        header: 'Created At',
        cell: (info) => {
          const value = info.getValue() as Date | { toDate: () => Date };
          return value instanceof Date
            ? value.toLocaleDateString()
            : value.toDate().toLocaleDateString();
        },
      },
      {
        header: '',
        id: 'actions',
        cell: (info) => {
          const row = info.row.original;
          return (
            <div>
              <button 
                onClick={(e) => {
                  e.stopPropagation(); // Prevent row click when clicking delete
                  handleDelete(row.id);
                }}
              >
                Delete
              </button>
            </div>
          );
        },
      },
    ],
    [handleDelete]
  );

  const table = useReactTable({
    data: posts,
    columns,
    state: {
      globalFilter,
    },
    // onGlobalFilterChange: setGlobalFilter,
    // globalFilterFn: makeSearchFilter<Blog>(['name']),
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <AsyncBoundary
      isLoading={isDeleting}
      error={deleteError}
      loadingFallback={<p>Deleting post...</p>}
      errorFallback={<p>Error: {deleteError?.message || 'Something went wrong'}</p>}
    >
      <React.Fragment>
        <input
          type='text'
          placeholder='Search name...'
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={(e) =>
            table.getColumn('name')?.setFilterValue(e.target.value)
          }
        />

        <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map((row) => (
                <tr 
                key={row.id}
                onClick={() => handleRowClick(row.original.id)}
                style={{ cursor: 'pointer' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f5f5f5';
                  e.currentTarget.style.color = '#0066cc';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'inherit';
                }}
                >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
                </tr>
            ))}
            {table.getRowModel().rows.length === 0 && (
              <tr>
                <td colSpan={columns.length}>No posts found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </React.Fragment>
    </AsyncBoundary>
  );
}
