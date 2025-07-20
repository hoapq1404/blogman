/** Used for representing a blog Blog */
export type Blog = {
  id: string;
  name?: string;
  title?: string;
  content?: string;
  author?: string; // Optional, can be used to store the author's name or ID
  image?: string; // URL or base64 string for the image
  createdAt?: Date;
  [key: string]: unknown; // Allows for additional properties if needed
};

/** Used for creating a new Blog */
export type NewBlog = Omit<Blog, 'id' | 'createdAt'>; 
