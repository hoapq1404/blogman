import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { NewBlog, Blog } from '@/types/blog';

const collectionName = 'demo-doc';

/**
 * Fetches all Blogs from the Firestore collection.
 * @returns Promise<Blog[]>
 * This function should retrieve all Blogs from the Firestore collection.
 * @example
 * getAllBlogs().then(Blogs => console.log(Blogs));
 */
export async function getAllBlogs(): Promise<Blog[]> {
  const querySnapshot = await getDocs(collection(db, collectionName));
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Blog[];
}

/**
 * Creates a new Blog in the Firestore collection.
 * @param Blog Blog data to create
 * @returns Promise<void>
 * This function should add a new Blog to the Firestore collection.
 * @example
 * createBlog({ name: 'New Blog' });
 */
export async function createBlog(Blog: NewBlog): Promise<void> {
  await addDoc(collection(db, collectionName), {
    ...Blog,
    createdAt: serverTimestamp(),
  });
}

/**
 * Fetches a single Blog from the Firestore collection by ID.
 * @param id ID of the Blog to fetch
 * @returns Promise<Blog | null>
 * This function should retrieve a single Blog from the Firestore collection.
 * @example
 * getBlog('BlogId123').then(blog => console.log(blog));
 */
export async function getBlog(id: string): Promise<Blog | null> {
  const BlogRef = doc(db, collectionName, id);
  const docSnap = await getDoc(BlogRef);
  
  if (docSnap.exists()) {
    return {
      id: docSnap.id,
      ...docSnap.data(),
    } as Blog;
  } else {
    return null;
  }
}

/**
 * Updates an existing Blog in the Firestore collection.
 * @param id ID of the Blog to update
 * @param Blog Partial Blog data to update
 * @returns Promise<void>
 * This function should update an existing Blog in the Firestore collection.
 * It takes the Blog ID and the partial Blog data to update the existing document.
 * @example
 * updateBlog('BlogId123', { name: 'Updated Blog Name' });
 */
export async function updateBlog(
  id: string,
  Blog: Partial<Blog>
): Promise<void> {
  const BlogRef = doc(db, collectionName, id);
  await updateDoc(BlogRef, Blog);
}

/**
 * Deletes a Blog from the Firestore collection.
 * @param id ID of the Blog to delete
 * @returns Promise<void>
 * This function should delete a Blog from the Firestore collection.
 * It takes the Blog ID and removes the corresponding document.
 * @example
 * deleteBlog('BlogId123');
 */
export async function deleteBlog(id: string): Promise<void> {
  const BlogRef = doc(db, collectionName, id);
  await deleteDoc(BlogRef);
}