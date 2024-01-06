import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '$lib/firebase/firebase.app';
import { Category } from '$lib/category/category';

export async function get(uid: string): Promise<Category> {
    const catRef = doc(firestore, 'posts', uid);
    const catDoc = await getDoc(catRef);

    const catData = catDoc.data();


    return new Category(
        catData?.uid,
        catData?.slug,
        catData?.desc,
        catData?.created_at,
    )
}

export async function getIfExist(uid: string): Promise<Category | null> {
    try {
        const catRef = doc(firestore, 'posts', uid);
        const catDoc = await getDoc(catRef);

        if (!catDoc.exists()) {
            return null;
        }

        const catData = catDoc.data();


        return new Category(
            catData?.uid,
            catData?.slug,
            catData?.desc,
            catData?.created_at,
        )
    } catch (error) {
        return null;
    }
}
