import { getAll as getAllPost } from '$lib/blog/blog.service';
import { getAll as getAllCategories } from '$lib/category/category.service';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    let posts = await getAllPost();
    posts = typeof posts === 'string' ? [] : posts;

    let categories = await getAllCategories();
    categories = typeof categories === 'string' ? [] : categories;

    const serializedCategories = categories.slice(0, 4).map(category => ({
        slug: category.slug,
        uid: category.uid,
        desc: category.desc,
        created_at: category.created_at,
        user: {
            uid: category.user.uid,
            first_name: category.user.first_name,
            last_name: category.user.last_name,
            email: category.user.email,
            avatar: category.user.avatar,
        },
    }));

    const serializedPosts = posts.map(blog => ({
        uid: blog.uid,
        title: blog.title,
        content: blog.content,
        created_at: blog.created_at,
        cover: blog.cover,
        category: {
            slug: blog.category.slug,
            uid: blog.category.uid,
            desc: blog.category.desc,
            created_at: blog.category.created_at,
            user: {
                uid: blog.category.user.uid,
                first_name: blog.category.user.first_name,
                last_name: blog.category.user.last_name,
                email: blog.category.user.email,
                avatar: blog.category.user.avatar,
            },
        },
        user: {
            uid: blog.user.uid,
            first_name: blog.user.first_name,
            last_name: blog.user.last_name,
            email: blog.user.email,
            avatar: blog.user.avatar,
        },
    }));

    return {
        posts: serializedPosts,
        recentPosts: serializedPosts?.slice(2, 12),
        popularPosts: serializedPosts?.slice(0, 2),
        trendingCategories: serializedCategories,
    };
};