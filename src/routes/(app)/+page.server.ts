export const prerender = true;

import { lastOpenedPost } from '$lib/blog/blog';
import { getAll as getAllPost } from '$lib/blog/blog.service';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    let posts = await getAllPost();
    posts = typeof posts === 'string' ? [] : posts;

    const serializedPosts = posts.map(blog => ({
        uid: blog.uid,
        title: blog.title,
        content: blog.content,
        created_at: blog.created_at,
        cover: blog.cover,
        category: blog.category,
        user: blog.user,
    }));

    lastOpenedPost.subscribe($post => {
        if ($post == null) {
            const randomIndex = Math.floor(Math.random() * posts.length);
            lastOpenedPost.set(serializedPosts[randomIndex]);
        }
    })

    return {
        posts: serializedPosts,
        popularPosts: serializedPosts?.slice(2, -1),
        recentPosts: serializedPosts?.slice(0, 2),
    };
};