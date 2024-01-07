import { getAll as getAllCategories } from '$lib/category/category.service';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    let categories = await getAllCategories();
    categories = typeof categories === 'string' ? [] : categories;

    const serializedCategories = categories.map(category => ({
        uid: category.uid,
        slug: category.slug,
        desc: category.desc,
        created_at: category.created_at,
    }));

    return {
        categories: serializedCategories,
    };
};