import { authUser } from '$lib/authStore';
import type { LayoutLoad } from './$types';
import { goto } from '$app/navigation';

export const load: LayoutLoad = async () => {
    const unsubscribe = authUser.subscribe((user) => {

        if (!import.meta.env.SSR) {
            if (user) {
                goto('/');
            }
        }
    });

    unsubscribe();

    return {};
};
