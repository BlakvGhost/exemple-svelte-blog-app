// authStore.ts

import { PUBLIC_LOCAL_STORAGE_KEY } from "$env/static/public";
import { writable } from "svelte/store";

interface AuthUser {
    uid: string;
    email: string;
    first_name: string;
    last_name: string;
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

export { authUser };
export type { AuthUser };
