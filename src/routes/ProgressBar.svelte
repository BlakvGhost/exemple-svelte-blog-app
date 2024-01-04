<script lang="ts">
	import { Progressbar } from 'flowbite-svelte';

    export let progress: number;
</script>

<div>
	<Progressbar progress="{progress}" color="primary" />
</div>
