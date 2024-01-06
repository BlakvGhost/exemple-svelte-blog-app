<script lang="ts">
	import '../../app.pcss';
	import Header from './Header.svelte';
	import './../styles.css';
	import { onMount } from 'svelte';

	$: custom_class = '';

	onMount(() => {
		const $header = document.querySelector('header');
		const headerHeight = $header?.clientHeight ?? 0;

		window.addEventListener('scroll', (e: Event) => {
			if (headerHeight < window.scrollY) {
				return (custom_class = 'fixed top-0 w-full left-0 bg-primary-50 transition fadeInDownBox');
			}
			custom_class = '';
		});
	});
	
</script>

<div class="app flex min-h-screen w-full flex-col">
	<Header style={custom_class}></Header>

	<main class="mx-auto my-0 flex w-full flex-1 flex-col bg-primary-900 text-white">
		<slot />
	</main>

	<footer class="flex flex-col items-center justify-center p-2">
		<p>
			this is <a href="https://kabirou-alassane.com" class="font-bold">BlakvGhost</a> BlogApp to learn
			SvelteKit
		</p>
	</footer>
</div>
