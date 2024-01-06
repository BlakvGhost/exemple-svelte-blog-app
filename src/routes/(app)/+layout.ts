import { authUser } from '$lib/authStore';
import { redirect } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async () => {

    const unsubscribe = authUser.subscribe((user) => {

        if (!import.meta.env.SSR) {
            if (!user) {
                throw redirect(302, '/auth/login');
            }
        }
    });

    unsubscribe();

    return {};
};