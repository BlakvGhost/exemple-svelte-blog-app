import { getAll } from '../../../lib/category/category.service';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    let categories = await getAll();
    console.log(categories)
    categories = typeof categories === 'string' ? [] : categories;

    const serializedCategories = categories.map(category => ({
        slug: category.slug,
        uid: category.uid,
        desc: category.desc,
        created_at: category.created_at,
        user: {
            uid: category.user?.uid,
            first_name: category.user?.first_name,
            last_name: category.user?.last_name,
            email: category.user?.email,
            avatar: category.user?.avatar,
        },
    }));
    console.log(serializedCategories);
    
    return { categories: serializedCategories }
};