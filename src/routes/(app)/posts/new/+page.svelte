<script lang="ts">
	import { Label, Input, Select, Fileupload } from 'flowbite-svelte';
	import { GridOutline } from 'flowbite-svelte-icons';
	import { onMount } from 'svelte';
	import Editor from '@tinymce/tinymce-svelte';

	let category: string;

	let categories = [
		{ value: 'Robotics', name: 'Robotics' },
		{ value: 'ca', name: 'Canada' },
		{ value: 'fr', name: 'France' }
	];

	onMount(() => {});
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
	<div class="my-2">
		<form action="" method="post" class="flex flex-wrap items-center py-8">
			<div class="w-full p-3 md:w-2/4 md:p-0">
				<div class="mb-6">
					<Label for="title_id" class="mb-2 block text-gray-300">Title</Label>
					<Input id="title_id" placeholder="Title" />
				</div>
				<div class="mb-6">
					<Label for="title_id" class="mb-2 block text-gray-300">Category</Label>
					<Select class="mt-2" items={categories} bind:value={category} />
				</div>
				<div class="mb-6">
					<Label for="title_id" class="mb-2 block text-gray-300">Attached Image</Label>
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
