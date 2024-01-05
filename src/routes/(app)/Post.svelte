<script lang="ts">
	import { Card, Button } from 'flowbite-svelte';
	import { ArrowRightOutline } from 'flowbite-svelte-icons';

	export let type: boolean;

	export let custom_class: string = '';
</script>

<Card class={custom_class}>
	{#if type}
		<h5 class="mb-2 font-bold tracking-tight text-gray-300 dark:text-white">
			Noteworthy technology acquisitions 2021
		</h5>
		<p class="mb-3 font-normal leading-tight text-gray-900 dark:text-gray-400">
			Here are the biggest enterprise....
		</p>
		<Button class="w-fit">
			Read more <ArrowRightOutline class="ms-2 h-3.5 w-3.5 text-white" />
		</Button>
	{:else}
		<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
			Noteworthy technology acquisitions 2021
		</h5>
	{/if}
</Card>
