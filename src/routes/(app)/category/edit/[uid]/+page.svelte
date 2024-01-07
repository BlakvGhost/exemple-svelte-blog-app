<script lang="ts">
	import { Label, Input, Alert, Button, Spinner, Textarea } from 'flowbite-svelte';
	import { GridOutline, InfoCircleSolid } from 'flowbite-svelte-icons';
	import { Success } from '$lib/blog/blog';
	import type { PageData } from './$types';
	import { update } from '$lib/category/category.service';
	import { EMPTY_FIELDS_MESSAGE } from '$lib/message';
	import { scroll } from '$lib/helpers';
	import { onMount } from 'svelte';

	let postStatus = new Success();
	let process = false;
	let title: string;

	$: {
		postStatus;
		process;
	}

	const updateCategory = async () => {
		if (data.slug && data.desc) {
			process = true;

			postStatus = await update(data);

			scroll();
			return (process = false);
		}
		scroll();
		return (postStatus = new Success(404, EMPTY_FIELDS_MESSAGE));
	};

	onMount(() => {
		title = data.slug;
		document.title = 'Editer ' + title;
	});

	export let data: PageData;
</script>

<div class="container mx-auto">
	<div class="my-3 flex justify-between">
		<h1 class="w-auto items-center border-b px-1 py-3 text-2xl md:w-2/4">Edit {data.slug}</h1>
		<div class="items-center self-center px-2 py-3">
			<a href="/category" class="flex items-center gap-3">
				<GridOutline></GridOutline>
				<span class="hidden md:block">View categories</span>
			</a>
		</div>
	</div>
	{#if postStatus.status == 200}
		<Alert color="blue" border class="mx-auto mt-4 w-full text-center md:w-2/4">
			<InfoCircleSolid slot="icon" class="h-4 w-4" />
			<span class="font-medium">{postStatus.message}</span>
		</Alert>
	{:else if postStatus.status == 404}
		<Alert color="red" border class="mx-auto mt-4 w-full text-center md:w-2/4">
			<InfoCircleSolid slot="icon" class="h-4 w-4" />
			<span class="font-medium">{postStatus.message}</span>
		</Alert>
	{/if}
	<div class="my-2">
		<form
			on:submit|preventDefault={updateCategory}
			method="post"
			class="flex flex-wrap items-center pb-8 pt-2"
		>
			<div class="mx-auto w-full p-3 md:w-2/4 md:p-0">
				<div class="mb-6">
					<Label for="title_id" class="mb-2 block text-gray-300">Slug</Label>
					<Input id="title_id" placeholder="Title" bind:value={data.slug} />
				</div>
				<div class="mb-6">
					<Label for="desc_id" class="mb-2 block text-gray-300">Description</Label>
					<Textarea id="desc_id" placeholder="Some description..." bind:value={data.desc} />
				</div>
			</div>
			<div class="w-full text-center">
				{#if process}
					<Button disabled class="my-5 w-2/4">
						<Spinner class="me-3" size="4" color="white" />Processing ...
					</Button>
				{:else}
					<button
						type="submit"
						class="my-5 w-2/4 bg-primary-500 p-3 transition hover:bg-primary-800"
					>
						Update
					</button>
				{/if}
			</div>
		</form>
	</div>
</div>
