<script>
	import { page } from '$app/stores';
	import {
		Button,
		Alert,
		Card,
		Navbar,
		NavBrand,
		NavLi,
		NavUl,
		NavHamburger,
		Toast
	} from 'flowbite-svelte';
	import { CompressOutline } from 'flowbite-svelte-icons';

</script>

<header>
	<!-- <Button color="primary">Primary</Button>
	<Alert color="primary">Primary</Alert> -->
	<!-- <Card href="/cards" color="primary">
		<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-red-800">
			Noteworthy technology acquisitions 2021
		</h5>
		<p class="font-normal leading-tight text-gray-700 dark:text-gray-700">
			Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse
			chronological order.
		</p>
	</Card> -->
	<Navbar let:hidden let:toggle color="primary">
		<NavBrand href="/">
			<CompressOutline class="mx-2" />

			<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-red-800"
				>Fiona</span
			>
		</NavBrand>
		<NavHamburger on:click={toggle} />
		<NavUl {hidden}>
			<NavLi href="/" active={true} aria-current={$page.url.pathname === '/' ? 'page' : undefined}>Home</NavLi>
			<NavLi href="/posts">Blog</NavLi>
			<NavLi href="/posts/new">Add Post</NavLi>
			<NavLi href="/pricing">Account</NavLi>
			<NavLi href="/contact">Contact</NavLi>
		</NavUl>
	</Navbar>
</header>
