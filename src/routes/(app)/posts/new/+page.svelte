<script lang="ts">
	import { Label, Input, Select, Fileupload } from 'flowbite-svelte';
	import { GridOutline } from 'flowbite-svelte-icons';
	import { onMount } from 'svelte';

	let category: string;

	let categories = [
		{ value: 'Robotics', name: 'Robotics' },
		{ value: 'ca', name: 'Canada' },
		{ value: 'fr', name: 'France' }
	];

	onMount(() => {
		window.tinymce.init({
			selector: 'textarea', // Sélectionnez les zones de texte à transformer en éditeur
			plugins: 'advlist autolink lists link image charmap print preview hr anchor pagebreak',
			toolbar:
				'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
			height: 300 // Hauteur de l'éditeur
		});
	});
</script>

<div class="container mx-auto">
	<script
		src="https://cdnjs.cloudflare.com/ajax/libs/tinymce/6.2.0/tinymce.min.js"
		integrity="sha512-tofxIFo8lTkPN/ggZgV89daDZkgh1DunsMYBq41usfs3HbxMRVHWFAjSi/MXrT+Vw5XElng9vAfMmOWdLg0YbA=="
		crossorigin="anonymous"
		referrerpolicy="no-referrer"
	></script><link
		rel="stylesheet"
		type="text/css"
		id="mce-u0"
		href="https://cdnjs.cloudflare.com/ajax/libs/tinymce/6.2.0/skins/ui/oxide/skin.min.css"
	/>
	<div class="my-3 flex justify-between">
		<h1 class="md:w-2/4 w-auto items-center border-b py-3 text-2xl">Create a new blog post</h1>
		<div class="items-center py-3 self-center px-2">
			<a href="/" class="flex gap-3 items-center">
				<GridOutline></GridOutline>
				<span class="hidden md:block">Voir les posts</span>
			</a>
		</div>
	</div>
	<div class="my-2">
		<form action="" method="post" class="flex py-8 flex-wrap">
			<div class="w-full md:w-2/4 p-3 md:p-0">
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
			<div class="w-full md:w-2/4 p-3 md:ps-5">
				<label for="content" class="mb-2 block text-gray-300">Content</label>
				<textarea name="" id="content" cols="30" rows="10"></textarea>
			</div>
            <div class="w-full text-center">
                <button type="submit" class="my-5 bg-primary-500 p-3 w-2/4 hover:bg-primary-800 transition">Save</button>
            </div>            
		</form>
	</div>
</div>
