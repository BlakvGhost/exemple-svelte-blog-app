<script lang="ts">
	import { Label, Input, Fileupload, Alert } from 'flowbite-svelte';
	import { GridOutline, InfoCircleSolid } from 'flowbite-svelte-icons';
	import Editor from '@tinymce/tinymce-svelte';
	import { Blog, Success } from '$lib/blog/blog';
	import type { PageData } from './$types';
	import { create } from '$lib/blog/blog.service';
	import { EMPTY_FIELDS_MESSAGE } from '$lib/message';

	let blog = new Blog();

	let postStatus = new Success();

	$: postStatus;

	async function createPost() {
		console.log(blog);
		
		if (blog.title && blog.category.uid && blog.content && blog.user.uid) {
			postStatus = await create(blog);
		} else {
			postStatus = new Success(404, EMPTY_FIELDS_MESSAGE);
		}
	}

	export let data: PageData;
</script>

<div class="container mx-auto">
	<div class="my-3 flex justify-between">
		<h1 class="w-auto items-center border-b py-3 text-2xl md:w-2/4">Create a new blog post</h1>
		<div class="items-center self-center px-2 py-3">
			<a href="/" class="flex items-center gap-3">
				<GridOutline></GridOutline>
				<span class="hidden md:block">Voir les posts</span>
			</a>
		</div>
	</div>
	{#if postStatus.status == 200}
		<Alert color="blue" border class="mx-auto my-3 w-2/4 text-center">
			<InfoCircleSolid slot="icon" class="h-4 w-4" />
			<span class="font-medium">{postStatus.message}</span>
		</Alert>
	{:else if postStatus.status == 404}
		<Alert color="red" border class="mx-auto my-3 w-2/4 text-center">
			<InfoCircleSolid slot="icon" class="h-4 w-4" />
			<span class="font-medium">{postStatus.message}</span>
		</Alert>
	{/if}
	<div class="my-2">
		<form
			on:submit|preventDefault={createPost}
			method="post"
			class="flex flex-wrap items-center py-8"
		>
			<div class="w-full p-3 md:w-2/4 md:p-0">
				<div class="mb-6">
					<Label for="title_id" class="mb-2 block text-gray-300">Title</Label>
					<Input id="title_id" placeholder="Title" bind:value={blog.title} />
				</div>
				<div class="mb-6">
					<Label for="cat_id" class="mb-2 block text-gray-300">Category</Label>
					<select
						bind:value={blog.category}
						name="cat"
						id="cat_id"
						class="mt-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
					>
						{#each data.categories as cat}
							<option value={cat.uid} title={cat.desc}> {cat.slug} </option>
						{/each}
					</select>
				</div>
				<div class="mb-6">
					<Label for="cover_id" class="mb-2 block text-gray-300">Attached Image</Label>
					<Fileupload />
				</div>
			</div>
			<div class="w-full p-3 md:w-2/4 md:ps-5">
				<label for="content" class="mb-2 block text-gray-300">Content</label>
				<Editor
					apiKey="n3w6swvi4w96q4o74th2p77fos0znlf4vki56r6tfbutu7az"
					channel="6"
					id="content"
					modelEvents="input change undo redo"
					bind:value={blog.content}
				/>
			</div>
			<div class="w-full text-center">
				<button type="submit" class="my-5 w-2/4 bg-primary-500 p-3 transition hover:bg-primary-800"
					>Save</button
				>
			</div>
		</form>
	</div>
</div>
