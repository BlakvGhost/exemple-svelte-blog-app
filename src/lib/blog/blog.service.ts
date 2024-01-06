import { doc, getDoc } from 'firebase/firestore';
import { Blog } from './blog';
import { firestore } from '$lib/firebase/firebase.app';
import { get as getCat } from '$lib/category/category.service';
import { getUserDataFromFirestore } from '$lib/auth.service';

export async function get(uid: string): Promise<Blog | null> {
    try {
        const postRef = doc(firestore, 'posts', uid);
        const postDoc = await getDoc(postRef);

        if (!postDoc.exists()) {
            return null;
        }

        const postData = postDoc.data();

        const relatedCategory = await getCat(postData?.uid);
        const relatedUser = await getUserDataFromFirestore(postData?.uid);

        return new Blog(
            postData?.uid,
            postData?.title,
            postData?.content,
            postData?.created_at,
            relatedCategory,
            postData?.cover,
            relatedUser
        );
    } catch (error) {
        return null;
    }
}
