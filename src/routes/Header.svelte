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
	<Navbar let:hidden let:toggle color="primary-900">
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
