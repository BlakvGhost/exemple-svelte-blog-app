<script lang="ts">
	import { lastOpenedPost } from '$lib/blog/blog';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { getAppName } from '$lib/helpers';

	export let data: PageData;

	onMount(() => {
		if (data.uid) {
			lastOpenedPost.set(data);
		}
	});
</script>

<svelte:head>
	<title> {data?.title} | { getAppName() }</title>
</svelte:head>
<div class="container mx-auto px-4 text-gray-100 lg:px-12">
	<header class="mt-8 md:flex block justify-between">
		<h1 class="text-3xl my-2 font-bold text-gray-100">{data?.title}</h1>
		<span class="my-2">
			Posted on {data?.created_at} by
			<span class="text-gray-300 underline">{data?.user.first_name} {data?.user.last_name}</span>
		</span>
	</header>
	<main class="mt-4">
		<section class="mb-4">
			<h2 class="my-3 text-2xl font-bold text-red-800 underline">
				Category: {data?.category.slug}
			</h2>
			<img src={data?.cover} class="mx-auto mb-4 h-auto w-full" alt="Image de {data?.title}" />
			<p class="text-lg leading-relaxed text-gray-100">{@html data?.content}</p>
		</section>
	</main>
</div>
