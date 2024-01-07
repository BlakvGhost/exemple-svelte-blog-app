import { addDoc, collection, doc, getDoc, getDocs, orderBy, query } from 'firebase/firestore';
import { firestore } from '$lib/firebase/firebase.app';
import { Category } from '$lib/category/category';
import { ALL_OBJECT_ERROR_MESSAGE, CREATE_OBJECT_ERROR_MESSAGE } from '$lib/message';

const action = 'categories';

export async function get(uid: string): Promise<Category> {
    const catRef = doc(firestore, action, uid);
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
        const catRef = doc(firestore, action, uid);
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

export async function create(category: Category): Promise<Category | string> {
    try {
        const postsCollection = collection(firestore, action);
        await addDoc(postsCollection, {
            slug: category.slug,
            desc: category.desc,
            created_at: category.created_at,
        });

        return category;
    } catch (error) {
        return CREATE_OBJECT_ERROR_MESSAGE + action + `: ${error}`;
    }
}

export async function getAll(): Promise<Category[] | string> {
    try {
        const postsCollection = collection(firestore, action);
        const q = query(postsCollection, orderBy('created_at', 'desc'));
        const querySnapshot = await getDocs(q);

        const cats: Category[] = [];

        querySnapshot.forEach(async (doc) => {
            const postData = doc.data();

            const cat = new Category(
                postData?.uid,
                postData?.slug,
                postData?.desc,
                postData?.created_at,
            );

            cats.push(cat);
        });

        return cats;
    } catch (error) {
        return ALL_OBJECT_ERROR_MESSAGE;
    }
}
