import { writable } from "svelte/store";

interface AuthUser {
    uid: string;
    email: string;
    first_name: string,
    last_name: string,
}

const AuthUser = writable<AuthUser | undefined>(undefined);

export { AuthUser }