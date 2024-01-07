import { PUBLIC_LAST_POST_LOCAL_STORAGE_KEY } from "$env/static/public";
import { AuthUser as User } from "$lib/authStore";
import { Category } from "$lib/category/category";
import { writable } from "svelte/store";

export class Blog {
    constructor(
        public uid: string = '',
        public title: string = '',
        public content: string = '',
        public created_at: string = '',
        public category = new Category(),
        public cover: string = '',
        public user = new User(),
    ) { }
}

const getLastOpenedPost = (): Blog | null => {
    if (!import.meta.env.SSR) {
        const storedUserData = localStorage.getItem(PUBLIC_LAST_POST_LOCAL_STORAGE_KEY);
        return storedUserData ? JSON.parse(storedUserData) : null;
    }

    return null;
};

const lastOpenedPost = writable<Blog | null>(getLastOpenedPost());

lastOpenedPost.subscribe(($lastOpenedPost) => {
    if (!import.meta.env.SSR) {
        if ($lastOpenedPost) {
            localStorage.setItem(PUBLIC_LAST_POST_LOCAL_STORAGE_KEY, JSON.stringify($lastOpenedPost));
        } else {
            localStorage.removeItem(PUBLIC_LAST_POST_LOCAL_STORAGE_KEY);
        }
    }
});

export { lastOpenedPost }