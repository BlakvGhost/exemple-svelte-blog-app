<script lang="ts">
	import { Card, Button, Modal, Tooltip } from 'flowbite-svelte';
	import {
		ArrowRightOutline,
		EditOutline,
		TrashBinOutline,
		ExclamationCircleOutline
	} from 'flowbite-svelte-icons';
	import { Success } from '$lib/blog/blog';
	import { getColorBySlug, urlify } from '$lib/helpers';
	import { authUser } from '$lib/authStore';
	import { remove } from '$lib/category/category.service';
	import type { Category } from '$lib/category/category';

	let postStatus = new Success();
	let process = false;
	let canShowSecondModal = false;

	let popupModal = false;

	export let type: boolean;

	export let custom_class: string = `w-full bg-primary-700 border-0 text-white `;

	export let category: Category;

	export let cat_page = false;

	const hasPermission = cat_page && category.user.uid === $authUser?.uid;

	const deletePost = async () => {
		if (hasPermission) {
			process = true;
			postStatus = await remove(category.uid);

			process = false;
		}
	};

	$: {
		postStatus;
		process;
		canShowSecondModal = postStatus.status != 202;
	}
</script>

{#if type}
	<Card
		title={category.slug}
		class={custom_class + getColorBySlug(category.uid)}
		href="/category/{category.uid}/{urlify(category.slug)}"
	>
		<h5 class="mb-2 font-bold tracking-tight text-gray-300 dark:text-white">
			{category.slug}
		</h5>
	</Card>
{:else if postStatus.status != 200}
	<Card class="mb-4 {custom_class + getColorBySlug(category.uid)}">
		<h5 class="mb-2 font-bold tracking-tight text-gray-300 dark:text-white">
			{category.slug}
		</h5>
		<p class="mb-3 font-normal leading-tight text-gray-900 dark:text-gray-400">
			{category.desc}
		</p>
		<div class="flex gap-3">
			<Button class="w-fit bg-gray-500" href="/category/{category.uid}/{urlify(category.slug)}">
				Show posts <ArrowRightOutline class="ms-2 h-3.5 w-3.5 text-white" />
			</Button>
			{#if hasPermission}
				<Button class="w-fit bg-blue-900" href="/category/edit/{category.uid}">
					<EditOutline class="ms-2 h-3.5 w-3.5 text-white" />
					<Tooltip>Edit</Tooltip>
				</Button>
				<Button class="w-fit bg-red-800" on:click={() => (popupModal = true)}>
					<TrashBinOutline class="ms-2 h-3.5 w-3.5 text-white" />
					<Tooltip>Delete</Tooltip>
				</Button>

				<Modal
					class="modal bg-gray-700 {!popupModal ?? 'active'}"
					bind:open={popupModal}
					size="xs"
					autoclose
					outsideclose
				>
					<div class="text-center">
						<ExclamationCircleOutline class="mx-auto mb-4 h-12 w-12 text-gray-200" />
						<h3 class="mb-5 text-lg font-normal text-gray-400">
							Are you sure you want to delete {category.slug} ?
						</h3>
						<Button color="red" class="me-2" on:click={deletePost}>Yes, I'm sure</Button>
						<Button color="alternative">No, cancel</Button>
					</div>
				</Modal>
			{/if}
		</div>
	</Card>
{/if}
<!-- <Modal
	class="modal bg-gray-700 {!popupModal ?? 'active'}"
	bind:open={canShowSecondModal}
	autoclose
	outsideclose
>
	<p class="text-center text-base leading-relaxed text-gray-400">
		{category.slug}
		{postStatus.message}
	</p>
</Modal> -->
