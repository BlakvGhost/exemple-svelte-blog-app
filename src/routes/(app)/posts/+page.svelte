<script lang="ts">
	import Post from './../Post.svelte';
	import type { PageData } from './$types';
	import { getAppName } from '$lib/helpers';

	export let data: PageData;
</script>

<svelte:head>
	<title> Toutes les postes de blog | { getAppName() }</title>
</svelte:head>
<div class="">
	<div class="md:-p container mx-auto px-3">
		<div class="py-3">
			<h1 class="border-b py-3 text-2xl">All Posts</h1>
		</div>
		<div class="my-4 grid grid-cols-1 gap-4 md:grid-cols-3">
			{#each data.post as post}
				<Post blog_page={true} {post} type={false} custom_class="bg-primary-600 border-0 text-white"
				></Post>
			{/each}
		</div>
	</div>
</div>
