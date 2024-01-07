<script lang="ts">
	import authBgImg from '$lib/images/auth-bg.jpg';
	import Post from './Post.svelte';
	import { getAll } from '$lib/blog/blog.service';
	import { lastOpenedPost, Blog } from '$lib/blog/blog';
	import { onMount } from 'svelte';
	import { reduceText, urlify } from '$lib/helpers';

	let error: string;
	let posts: Blog[] = [];
	let popularPosts: Blog[] = [];
	let recentPosts: Blog[] = [];
	let lastOpened: Blog | null = new Blog();

	$: {
		popularPosts = posts?.slice(2, -1);
		recentPosts = posts?.slice(0, 2);
		lastOpened = $lastOpenedPost;
	}

	async function getPosts() {
		const post = await getAll();

		if (typeof post == 'string') {
			return (error = post);
		}
		posts = post;

		if ($lastOpenedPost == null) {
			const randomIndex = Math.floor(Math.random() * posts.length);
			lastOpenedPost.set(posts[randomIndex]);
		}
	}

	onMount(() => {
		getPosts();
	});
</script>

<div class="">
	<div class="h-screen w-full overflow-hidden">
		<div class="h-full w-full" style="background-image: url('{lastOpened?.cover}');">
			<div class="flex h-full w-full items-center justify-between bg-slate-900/60 px-10">
				<div class="mx-4 w-full md:w-2/4">
					<div class="w-fit bg-gray-900 p-2">
						<h1>{lastOpened?.category.slug}</h1>
					</div>
					<div class="my-3">
						<h1 class="text-6xl">{reduceText(lastOpened?.title ?? '', 10)}</h1>
					</div>
					<div class="my-6">
						<a href="/posts/{urlify(lastOpened?.title ?? '')}"
							class="my-4 border bg-transparent p-3 font-bold
							transition hover:border-primary-900 hover:bg-primary-900">Continue Reading</a
						>
					</div>
				</div>
				<div class="my-5 hidden w-1/4 overflow-hidden md:block">
					<div class="container">
						<div class="w-full border-b-2 py-2">
							<h1 class="text-2xl">Populars Posts</h1>
						</div>
						<div class="my-2">
							<div class="flex w-full flex-col gap-3 overflow-auto">
								{#each popularPosts as post}
									<Post {post} type={true} custom_class="w-full bg-primary-600 border-0 text-white"
									></Post>
								{/each}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="md:-p container mx-auto block px-3 md:hidden">
		<div class="py-3">
			<h1 class="border-b py-3 text-2xl">Populars Posts</h1>
		</div>
		<div class="my-4 flex flex-col items-center gap-4">
			{#each popularPosts as post}
				<Post {post} type={true} custom_class="bg-primary-600 w-full border-0 text-white"></Post>
			{/each}
		</div>
	</div>
	<div class="md:-p container mx-auto px-3">
		<div class="py-3">
			<h1 class="border-b py-3 text-2xl">Recents Posts</h1>
		</div>
		<div class="my-4 grid grid-cols-2 gap-4 md:grid-cols-4">
			{#each recentPosts as post}
				<Post {post} type={false}></Post>
			{/each}
		</div>
	</div>
</div>
