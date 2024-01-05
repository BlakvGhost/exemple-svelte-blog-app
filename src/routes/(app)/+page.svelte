<script>
	import authBgImg from '$lib/images/auth-bg.jpg';
	import Post from './Post.svelte';
</script>

<div class="">
	<div class="h-screen w-full overflow-hidden">
		<div class="h-full w-full" style="background-image: url('{authBgImg}');">
			<div class="flex h-full w-full items-center justify-between bg-slate-900/60 px-10">
				<div class="mx-4 w-2/4">
					<div class="w-fit bg-gray-900 p-2">
						<h1>Robotics</h1>
					</div>
					<div class="my-3">
						<h1 class="text-6xl">Hello World.</h1>
					</div>
					<div class="my-6">
						<button
							class="my-4 border bg-transparent p-3 font-bold
							transition hover:border-primary-900 hover:bg-primary-900">Continue Reading</button
						>
					</div>
				</div>
				<div class="my-5 w-1/4 overflow-hidden">
					<div class="container">
						<div class="w-full border-b-2 py-2">
							<h1 class="text-2xl">Populars Posts</h1>
						</div>
						<div class="my-2">
							<div class="flex w-full flex-col gap-3 overflow-auto">
								{#each Array(2) as _, index}
									<Post type={true} custom_class="w-full bg-primary-600 border-0 text-white"></Post>
								{/each}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="container mx-auto">
		<div class="py-3">
			<h1 class="border-b py-3 text-2xl">Recents Posts</h1>
		</div>
		<div class="my-4 grid grid-cols-4 gap-4">
			{#each Array(10) as _, index}
				<Post type={false}></Post>
			{/each}
		</div>
	</div>
</div>
