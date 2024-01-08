import { getFilteredPosts } from '$lib/blog/blog.service';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const posts = await getFilteredPosts(params.slug);
	console.log(posts);
	

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
	}))

	return { posts: serializedPosts }
};