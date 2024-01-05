<script lang="ts">
	import { Card, Button } from 'flowbite-svelte';
	import { ArrowRightOutline } from 'flowbite-svelte-icons';
	import blogImg from '$lib/images/auth-bg.jpg';

	export let type: boolean;

	export let custom_class: string = 'w-full bg-primary-700 border-0 text-white';
</script>

{#if type}
	<Card class={custom_class}>
		<h5 class="mb-2 font-bold tracking-tight text-gray-300 dark:text-white">
			Noteworthy technology acquisitions 2021
		</h5>
		<p class="mb-3 font-normal leading-tight text-gray-900 dark:text-gray-400">
			Here are the biggest enterprise....
		</p>
		<Button class="w-fit">
			Read more <ArrowRightOutline class="ms-2 h-3.5 w-3.5 text-white" />
		</Button>
	</Card>
{:else}
	<Card img={blogImg} class="mb-4 {custom_class}">
		<h5 class="mb-2 font-bold tracking-tight text-gray-300 dark:text-white">
			Noteworthy technology acquisitions 2021
			<div class="my-2">
				<a href="/" class="bg-primary-400 px-2 py-1">Category</a>
			</div>
		</h5>
		<p class="mb-3 font-normal leading-tight text-gray-900 dark:text-gray-400">
			Here are the biggest enterprise technology acquisitions of 20...
		</p>
		<Button class="bg-gray-900">
			Read more <ArrowRightOutline class="ms-2 h-3.5 w-3.5 text-white" />
		</Button>
	</Card>
{/if}
