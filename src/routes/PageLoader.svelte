<script lang="ts">
	import { Spinner } from "flowbite-svelte";

	export let show: boolean;
</script>

{#if show}
	<div class="fixed flex h-screen w-full items-center justify-center bg-slate-900">
		<div class="text-center">
			<Spinner size="80" color="yellow" />
		</div>
	</div>
{/if}
