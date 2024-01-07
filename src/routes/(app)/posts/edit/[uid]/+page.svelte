<script lang="ts">
	import { Label, Input, Fileupload, Alert, Button, Spinner } from 'flowbite-svelte';
	import { GridOutline, InfoCircleSolid } from 'flowbite-svelte-icons';
	import Editor from '@tinymce/tinymce-svelte';
	import { Success } from '$lib/blog/blog';
	import type { PageData } from './$types';
	import { update } from '$lib/blog/blog.service';
	import { EMPTY_FIELDS_MESSAGE } from '$lib/message';
	import { authUser } from '$lib/authStore';
	import { scroll } from '$lib/helpers';
	import { onMount } from 'svelte';
	import PageLoader from '../../../../PageLoader.svelte';

	let postStatus = new Success();
	let selectedFile: File | undefined;
	let process = false;
	let title: string;

	$: {
		postStatus;
		process;
	}

	const updatePost = async () => {
		const blog = data.post;

		if (blog.title && blog.content) {
			process = true;
			blog.user.uid = $authUser?.uid ?? '';
			postStatus = await update(blog, selectedFile, data.post.category.uid);
			title = blog.title;
			scroll();
			return (process = false);
		}
		scroll();
		return (postStatus = new Success(404, EMPTY_FIELDS_MESSAGE));
	};

	const handleFileChange = (event: any) => {
		selectedFile = event.target.files[0] ?? undefined;
	};

	onMount(() => {
		title = data.post.title;
		document.title = 'Editer ' + title;
	});

	export let data: PageData;
</script>

<PageLoader show={!data.post.uid} />
<div class="container mx-auto">
	<div class="my-3 flex justify-between">
		<h1 class="w-auto items-center border-b px-1 py-3 text-2xl md:w-2/4">Edit {title}</h1>
		<div class="items-center self-center px-2 py-3">
			<a href="/posts" class="flex items-center gap-3">
				<GridOutline></GridOutline>
				<span class="hidden md:block">Voir les posts</span>
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
			on:submit|preventDefault={updatePost}
			method="post"
			class="flex flex-wrap items-center pb-8 pt-2"
		>
			<div class="w-full p-3 md:w-2/4 md:p-0">
				<div class="mb-6">
					<Label for="title_id" class="mb-2 block text-gray-300">Title</Label>
					<Input id="title_id" placeholder="Title" bind:value={data.post.title} />
				</div>
				<div class="mb-6">
					<Label for="cat_id" class="mb-2 block text-gray-300">Category</Label>
					<select
						bind:value={data.post.category.uid}
						name="cat"
						id="cat_id"
						class="mt-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
					>
						{#each data.categories as cat}
							<option value={cat.uid} title={cat.desc}>
								{cat.slug}
							</option>
						{/each}
					</select>
				</div>
				<div class="mb-6">
					<Label for="cover_id" class="mb-2 block text-gray-300">Attached Image</Label>
					<Fileupload on:change={handleFileChange} class="mb-3" />
					<a href={data.post.cover} target="_blank" class="font-medium text-blue-700 underline"
						>Preview old cover</a
					>
				</div>
			</div>
			<div class="w-full p-3 md:w-2/4 md:ps-5">
				<label for="content" class="mb-2 block text-gray-300">Content</label>
				<Editor
					apiKey="n3w6swvi4w96q4o74th2p77fos0znlf4vki56r6tfbutu7az"
					channel="6"
					id="content"
					modelEvents="input change undo redo"
					bind:value={data.post.content}
				/>
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
