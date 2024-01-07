import { getIfExist } from '$lib/category/category.service';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
    const category = await getIfExist(params.uid);

    if(!category?.uid) {
        return error(404, "Edit Category Not Found")
    }

    return {
        uid: category?.uid,
        slug: category?.slug,
        desc: category?.desc,
        created_at: category?.created_at,
        user: {
            uid: category?.user.uid,
            first_name: category?.user.first_name,
            last_name: category?.user.last_name,
            email: category?.user.email,
            avatar: category?.user.avatar,
        },
    };
};