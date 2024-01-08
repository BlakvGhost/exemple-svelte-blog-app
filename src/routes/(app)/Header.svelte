<script lang="ts">
	// @ts-nocheck

	import { page } from '$app/stores';
	import {
		Navbar,
		NavBrand,
		NavLi,
		NavUl,
		NavHamburger,
		Avatar,
		Dropdown,
		DropdownItem,
		DropdownHeader,
		DropdownDivider,
		DarkMode
	} from 'flowbite-svelte';
	import { CompressOutline } from 'flowbite-svelte-icons';
	import SearchBar from './SearchBar.svelte';
	import { logout } from '$lib/auth.service';
	import { authUser } from '$lib/authStore';
	import { getAppName } from '$lib/helpers';

	export let style;

	$: user = $authUser;
	$: avatar =
		user?.avatar ??
		'data:image/png;base64,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';
</script>

<header class="{style} z-[5000]">
	<Navbar let:hidden let:toggle color="primary-900">
		<NavBrand href="/">
			<CompressOutline class="mx-2 dark:text-gray-100" />

			<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-gray-100">
				{getAppName()}
			</span>
		</NavBrand>
		<div class="flex items-center gap-5 md:order-2">
			<SearchBar />
			<Avatar class="" id="avatar-menu" src={avatar} />
			<NavHamburger
				class1="w-full md:flex md:w-auto md:order-1"
				class="dark:text-gray-100"
				on:click={toggle}
			/>
			<DarkMode class="border text-primary-500 dark:border-gray-700 dark:text-primary-600" />
		</div>
		<Dropdown placement="bottom" triggeredBy="#avatar-menu">
			<DropdownHeader>
				<span class="block text-sm"> {user?.last_name} {user?.first_name} </span>
				<span class="block truncate text-sm font-medium"> {user?.email} </span>
			</DropdownHeader>
			<DropdownItem>Profile</DropdownItem>
			<DropdownItem>Settings</DropdownItem>
			<DropdownDivider />
			<DropdownItem class="text-red-900" on:click={logout}>Sign out</DropdownItem>
		</Dropdown>
		<NavUl {hidden} class="order-1">
			<NavLi href="/" active={true} aria-current={$page.url.pathname === '/' ? 'page' : undefined}
				>Home</NavLi
			>
			<NavLi href="/posts">Blog</NavLi>
			<NavLi href="/posts/new">Add Post</NavLi>
			<NavLi href="/category">Categories</NavLi>
		</NavUl>
	</Navbar>
</header>
