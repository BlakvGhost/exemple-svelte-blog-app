import { Category } from '$lib/category/category';
import { create, getAll as getAllCategories } from '$lib/category/category.service';
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

    // create(new Category(undefined, 'Math', 'Les merveilles de la Math')).then((res) => {
    //     console.log(res);
    // });

    return {
        categories: serializedCategories,
    };
};