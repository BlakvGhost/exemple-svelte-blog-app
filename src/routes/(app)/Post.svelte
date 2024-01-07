<script lang="ts">
	import { Card, Button } from 'flowbite-svelte';
	import { ArrowRightOutline } from 'flowbite-svelte-icons';
	import { Blog } from '$lib/blog/blog';
	import { reduceText, urlify } from '$lib/helpers';

	export let type: boolean;

	export let custom_class: string = 'w-full bg-primary-700 border-0 text-white';

	export let post: Blog;
</script>

{#if type}
	<Card class={custom_class}>
		<h5 class="mb-2 font-bold tracking-tight text-gray-300 dark:text-white">
			{reduceText(post.title, 20)}
		</h5>
		<p class="mb-3 font-normal leading-tight text-gray-900 dark:text-gray-400">
			{reduceText(post.content, 30)}
		</p>
		<Button class="w-fit" href="/posts/{post.uid}/{urlify(post.title)}">
			Read more <ArrowRightOutline class="ms-2 h-3.5 w-3.5 text-white" />
		</Button>
	</Card>
{:else}
	<Card img={post.cover} class="mb-4 {custom_class}">
		<h5 class="mb-2 font-bold tracking-tight text-gray-300 dark:text-white">
			{reduceText(post.title, 20)}
			<div class="my-2">
				<a href="/" class="bg-primary-400 px-2 py-1" title={post.category?.desc}>
					{post.category.slug}
				</a>
			</div>
		</h5>
		<p class="mb-3 font-normal leading-tight text-gray-900 dark:text-gray-400">
			{reduceText(post.content, 30)}
		</p>
		<Button class="w-fit" href="/posts/{post.uid}/{urlify(post.title)}">
			Read more <ArrowRightOutline class="ms-2 h-3.5 w-3.5 text-white" />
		</Button>
	</Card>
{/if}
