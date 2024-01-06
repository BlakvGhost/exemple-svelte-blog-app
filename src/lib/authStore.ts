// authStore.ts

import { PUBLIC_LOCAL_STORAGE_KEY } from "$env/static/public";
import { writable } from "svelte/store";

class AuthUser {
    constructor(
        public uid: string = '',
        public email: string = '',
        public first_name: string = '',
        public last_name: string = '',
        public avatar: string = '',
    ) {

    }
}

const getStoredUser = (): AuthUser | null => {
    if (!import.meta.env.SSR) {
        const storedUserData = localStorage.getItem(PUBLIC_LOCAL_STORAGE_KEY);
        return storedUserData ? JSON.parse(storedUserData) : null;
    }

    return null;
};

const authUser = writable<AuthUser | null>(getStoredUser());

authUser.subscribe(($authUser) => {
    if (!import.meta.env.SSR) {
        if ($authUser) {
            localStorage.setItem(PUBLIC_LOCAL_STORAGE_KEY, JSON.stringify($authUser));
        } else {
            localStorage.removeItem(PUBLIC_LOCAL_STORAGE_KEY);
        }
    }
});

export { authUser, AuthUser };