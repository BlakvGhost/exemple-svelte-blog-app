<script lang="ts">
	import Post from './../../../Post.svelte';
	import type { PageData } from './$types';
	import { page } from '$app/stores';

	export let data: PageData;
</script>

<div class="">
	<div class="md:-p container mx-auto px-3">
		<div class="py-3">
			<h1 class="border-b py-3 text-2xl">All Posts on {$page.params.uid} Category</h1>
		</div>
		{#if data.posts.length < 1}
			<div class="text-center mt-10">
				<h1 class="font-bold text-red-600 text-2xl">No posts related to this category</h1>
			</div>
		{/if}
		<div class="my-4 grid grid-cols-1 gap-4 md:grid-cols-3">
			{#each data.posts as post}
				<Post blog_page={true} {post} type={false} custom_class="bg-primary-600 border-0 text-white"
				></Post>
			{/each}
		</div>
	</div>
</div>
