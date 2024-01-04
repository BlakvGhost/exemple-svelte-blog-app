<script>
	import '../../app.pcss';
	import './../styles.css';
</script>

<div class="app flex flex-col min-h-screen w-full">

	<main class="flex-1 flex flex-col p-2 w-full mx-auto my-0 bg-primary-900 text-white">
		<slot />
	</main>

	<footer class="flex flex-col justify-center items-center p-2">
		<p>not this is <a href="https://kabirou-alassane.com" class="font-bold">BlakvGhost</a> BlogApp to learn SvelteKit</p>
	</footer>
</div>