import { writable } from "svelte/store";

interface AuthUser {
    uid: string;
    email: string;
    first_name: string,
    last_name: string,
}

const authUser = writable<AuthUser | undefined>(undefined);

export { authUser };
export type { AuthUser };
