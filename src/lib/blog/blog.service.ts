import { doc, getDoc, setDoc } from 'firebase/firestore';
import { Blog, Category } from './blog';
import { firestore } from '$lib/firebase/firebase.app';

export async function get(uid: string): Promise<Blog> {
    const postRef = doc(firestore, 'posts', uid);
    const postDoc = await getDoc(postRef);
    const postData = postDoc.exists() ? postDoc.data() : {};


    return new Blog(
        postData?.uid,
        postData?.title,
        postData?.content,
        postData?.created_at,
        new Category(),
        postData?.cover,
        new 
        )
}