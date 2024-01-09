<script lang="ts">
	import { searchWithAlgoria } from '$lib/algoria';
	import { Button, Input, Modal } from 'flowbite-svelte';
	import { SearchOutline } from 'flowbite-svelte-icons';

	let showModal = false;
	let query = '';
	let results: string | any[];

	const search = async () => {
		if (query.length > 3) {
			results = await searchWithAlgoria(query);
		}
	};
</script>

<Button
	on:click={() => (showModal = true)}
	color="none"
	data-collapse-toggle="mobile-menu-3"
	aria-controls="mobile-menu-3"
	aria-expanded="false"
	class="me-1 rounded-lg p-2.5 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 md:hidden dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
>
	<SearchOutline class="h-5 w-5 dark:text-gray-300" />
</Button>
<div class="relative hidden md:block">
	<div class="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
		<SearchOutline class="h-4 w-4 dark:text-gray-300" />
	</div>
	<Input
		id="search-navbar"
		class="ps-10"
		placeholder="Search..."
		on:click={() => (showModal = true)}
	/>
</div>

<Modal class="modal {!showModal ?? 'active'}" bind:open={showModal} autoclose outsideclose>
	<div class="px-4 pb-6">
		<div class="my-3">
			<div class="relative">
				<div class="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
					<SearchOutline class="h-4 w-4 dark:text-gray-300" />
				</div>
				<Input
					bind:value={query}
					id="search-modal"
					class="ps-10 focus:outline-none"
					placeholder="Enter a query..."
					on:input={search}
				/>
			</div>
		</div>
		{#if query.length > 3}
			<div class="fadeIn">
				<h2 class="mb-4 text-2xl font-semibold">Search Results</h2>

				{#if results?.length > 0}
					<ul class="pl-4">
						{#each results as result (result.title)}
							<li>
								<a
									href="/"
									class="block w-full list-none border-b px-4 py-2
                             text-sm
                              font-medium hover:bg-gray-100 hover:text-primary-700
                               focus:z-40 focus:text-primary-700 focus:outline-none
                                focus:ring-2 focus:ring-primary-700 dark:hover:bg-gray-600
                                 dark:hover:text-white dark:focus:text-white dark:focus:ring-gray-500"
								>
									{result.title}
								</a>
							</li>
						{/each}
					</ul>
				{:else}
					<p>No results found</p>
				{/if}
			</div>
		{/if}
	</div>
	<svelte:fragment slot="footer">
		<div class="w-full text-end text-sm text-gray-500">
			<span>Powered with Algolia</span>
		</div>
	</svelte:fragment>
</Modal>
