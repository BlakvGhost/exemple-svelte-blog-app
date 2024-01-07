import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, updateDoc } from 'firebase/firestore';
import { Blog } from './blog';
import { firestore } from '$lib/firebase/firebase.app';
import { get as getCat } from '$lib/category/category.service';
import { getUserDataFromFirestore } from '$lib/auth.service';
import { ALL_OBJECT_ERROR_MESSAGE, CREATE_OBJECT_ERROR_MESSAGE, REMOVE_OBJECT_ERROR_MESSAGE, UPDATE_OBJECT_ERROR_MESSAGE } from '$lib/message';

const action = 'posts';

export async function get(uid: string): Promise<Blog | null> {
    try {
        const postRef = doc(firestore, action, uid);
        const postDoc = await getDoc(postRef);

        if (!postDoc.exists()) {
            return null;
        }

        const postData = postDoc.data();

        const relatedCategory = await getCat(postData?.category.uid);
        const relatedUser = await getUserDataFromFirestore(postData?.user.uid);

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

export async function create(blog: Blog): Promise<Blog | string> {
    try {
        const postsCollection = collection(firestore, action);
        await addDoc(postsCollection, {
            uid: blog.uid,
            title: blog.title,
            content: blog.content,
            created_at: blog.created_at,
            cover: blog.cover,
            category_uid: blog.category.uid,
            user_uid: blog.user.uid,
        });

        return blog;
    } catch (error) {
        return CREATE_OBJECT_ERROR_MESSAGE + action;
    }
}

export async function update(blog: Blog): Promise<Blog | string> {
    try {
        const postRef = doc(firestore, action, blog.uid);
        await updateDoc(postRef, {
            uid: blog.uid,
            title: blog.title,
            content: blog.content,
            created_at: blog.created_at,
            cover: blog.cover,
            category_uid: blog.category.uid,
            user_uid: blog.user.uid,
        });

        return blog;
    } catch (error) {
        return UPDATE_OBJECT_ERROR_MESSAGE + action;
    }
}

export async function remove(uid: string): Promise<void | string> {
    try {
        const postRef = doc(firestore, action, uid);
        await deleteDoc(postRef);
    } catch (error) {
        return REMOVE_OBJECT_ERROR_MESSAGE + action;
    }
}

export async function getAll(): Promise<Blog[] | string> {
    try {
        const postsCollection = collection(firestore, 'posts');
        const q = query(postsCollection, orderBy('created_at', 'desc'));
        const querySnapshot = await getDocs(q);

        const blogs: Blog[] = [];

        querySnapshot.forEach(async (doc) => {
            const postData = doc.data();
            const relatedCategory = await getCat(postData?.uid);
            const relatedUser = await getUserDataFromFirestore(postData?.uid);

            const blog = new Blog(
                postData?.uid,
                postData?.title,
                postData?.content,
                postData?.created_at,
                relatedCategory,
                postData?.cover,
                relatedUser
            );

            blogs.push(blog);
        });

        return blogs;
    } catch (error) {
        return ALL_OBJECT_ERROR_MESSAGE;
    }
}