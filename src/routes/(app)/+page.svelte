<script lang="ts">
	import Post from './Post.svelte';
	import { lastOpenedPost } from '$lib/blog/blog';
	import { reduceText, urlify } from '$lib/helpers';
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import { Spinner } from 'flowbite-svelte';

	$: lastOpened = $lastOpenedPost;

	onMount(() => {
		if ($lastOpenedPost == null) {
			const posts = data.posts;
			const randomIndex = Math.floor(Math.random() * posts.length);
			lastOpenedPost.set(posts[randomIndex]);
		}
	});

	export let data: PageData;
</script>

{#if !lastOpened}
	<div class="fixed flex h-screen w-full items-center justify-center bg-slate-900">
		<div class="text-center">
			<Spinner size="80" color="yellow" />
		</div>
	</div>
{/if}
<div class="">
	<div class="h-screen w-full overflow-hidden">
		<div class="h-full w-full" style="background-image: url('{lastOpened?.cover ?? ''}');">
			<div class="flex h-full w-full items-center justify-between bg-slate-900/60 md:px-10 px-4">
				<div class="md:mx-4 mx-0 w-full md:w-2/4">
					<div class="w-fit bg-gray-900 p-2">
						<h1>{lastOpened?.category.slug}</h1>
					</div>
					<div class="my-4">
						<h1 class="text-6xl">{reduceText(lastOpened?.title ?? '', 20)}</h1>
					</div>
					<div class="my-10">
						<a
							href="/posts/{lastOpened?.uid ?? 'x'}/{urlify(lastOpened?.title ?? 'x')}"
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
								{#each data.popularPosts as post}
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
			{#each data.popularPosts as post}
				<Post {post} type={true} custom_class="bg-primary-600 w-full border-0 text-white"></Post>
			{/each}
		</div>
	</div>
	<div class="md:-p container mx-auto px-3">
		<div class="py-3">
			<h1 class="border-b py-3 text-2xl">Recents Posts</h1>
		</div>
		<div class="my-4 grid grid-cols-2 gap-4 md:grid-cols-4">
			{#each data.recentPosts as post}
				<Post {post} type={false}></Post>
			{/each}
		</div>
	</div>
</div>
