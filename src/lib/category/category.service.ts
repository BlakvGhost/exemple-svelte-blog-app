import { collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, setDoc, updateDoc } from 'firebase/firestore';
import { firestore } from '$lib/firebase/firebase.app';
import { Category } from '$lib/category/category';
import { ALL_OBJECT_ERROR_MESSAGE, CREATE_OBJECT_ERROR_MESSAGE, CREATE_OBJECT_SUCCESS_MESSAGE, REMOVE_OBJECT_ERROR_MESSAGE, REMOVE_OBJECT_SUCCESS_MESSAGE, UPDATE_OBJECT_ERROR_MESSAGE, UPDATE_OBJECT_SUCCESS_MESSAGE } from '$lib/message';
import { Success as Response } from '$lib/blog/blog';
import { getUserDataFromFirestore } from '$lib/auth.service';

const action = 'categories';

export async function get(uid: string): Promise<Category> {
    const catRef = doc(firestore, action, uid);
    const catDoc = await getDoc(catRef);

    const catData = catDoc.data();

    const relatedUser = await getUserDataFromFirestore(catData?.user_uid);

    return new Category(
        uid,
        catData?.slug,
        catData?.desc,
        relatedUser,
        catData?.created_at
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
            uid,
            catData?.slug,
            catData?.desc,
            catData?.created_at,
        )
    } catch (error) {
        return null;
    }
}

export async function create(category: Category): Promise<Response> {
    try {
        const postsCollection = collection(firestore, action);
        const newDocRef = doc(postsCollection);

        await setDoc(newDocRef, {
            slug: category.slug,
            desc: category.desc,
            created_at: category.created_at,
            user_uid: category.user.uid
        });

        return new Response(200, CREATE_OBJECT_SUCCESS_MESSAGE);
    } catch (error) {
        return new Response(404, CREATE_OBJECT_ERROR_MESSAGE + action);
    }
}

export async function update(category: Category): Promise<Response> {
    try {
        const postRef = doc(firestore, action, category.uid);

        await updateDoc(postRef, {
            slug: category.slug,
            desc: category.desc,
            created_at: category.created_at,
        });

        return new Response(200, UPDATE_OBJECT_SUCCESS_MESSAGE);
    } catch (error) {
        return new Response(404, UPDATE_OBJECT_ERROR_MESSAGE + action);
    }
}

export async function remove(uid: string): Promise<Response> {
    try {
        const postRef = doc(firestore, action, uid);
        await deleteDoc(postRef);
        return new Response(200, REMOVE_OBJECT_SUCCESS_MESSAGE);
    } catch (error) {
        return new Response(404, REMOVE_OBJECT_ERROR_MESSAGE + "votre categorie");
    }
}

export async function getAll(): Promise<Category[] | string> {
    try {
        const postsCollection = collection(firestore, action);
        const q = query(postsCollection, orderBy('created_at', 'desc'));
        const querySnapshot = await getDocs(q);

        const cats: Category[] = [];

        for (const doc of querySnapshot.docs) {
            const postData = doc.data();

            const relatedUser = await getUserDataFromFirestore(postData?.user_uid ?? '');            

            const cat = new Category(
                doc.id,
                postData.slug,
                postData.desc,
                relatedUser,
                postData.created_at,
            );

            cats.push(cat);
        }
        return cats;

    } catch (error) {
        return ALL_OBJECT_ERROR_MESSAGE;
    }
}
