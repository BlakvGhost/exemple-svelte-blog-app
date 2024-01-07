<script lang="ts">
	import Category from './../Category.svelte';
	import { CirclePlusSolid } from 'flowbite-svelte-icons';
	import type { PageData } from './$types';
	import { Tooltip } from 'flowbite-svelte';

	export let data: PageData;
</script>

<div class="">
	<div class="md:-p container mx-auto px-3">
		<div class="my-4 border-b py-3 flex justify-between">
			<h1 class="text-2xl">All Categories</h1>
			<a href="/category/new">
				<CirclePlusSolid></CirclePlusSolid>
			</a>
			<Tooltip> Create </Tooltip>
		</div>
		<div class="my-4 grid grid-cols-2 gap-4 md:grid-cols-3">
			{#each data.categories as category}
				<Category
					cat_page={true}
					{category}
					type={false}
					custom_class="bg-primary-600 border-0 text-white "
				></Category>
			{/each}
		</div>
	</div>
</div>
