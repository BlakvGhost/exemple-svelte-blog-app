import { getAll as getAllCategories } from '$lib/category/category.service';
import { get } from '$lib/blog/blog.service';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { Blog } from '$lib/blog/blog';

export const load: PageServerLoad = async ({ params }) => {
    let categories = await getAllCategories();
    categories = typeof categories === 'string' ? [] : categories;

    const serializedCategories = categories.map(category => ({
        uid: category.uid,
        slug: category.slug,
        desc: category.desc,
        created_at: category.created_at,
    }));
    
    let post = await get(params.uid);
    
    const blog = post ?? new Blog();

    post = {
        uid: blog.uid,
        title: blog.title,
        content: blog.content,
        created_at: blog.created_at,
        cover: blog.cover,
        category: {
            slug: blog.category.slug,
            uid: blog.category.uid,
            desc: blog.category.desc,
            created_at: blog.category.created_at
        },
        user: {
            uid: blog.user.uid,
            first_name: blog.user.first_name,
            last_name: blog.user.last_name,
            email: blog.user.email,
            avatar: blog.user.avatar,
        },
    };
    
    return {
        post: post.uid? post: error(404, "Edit Post Not Found"),
        categories: serializedCategories,
    };
};