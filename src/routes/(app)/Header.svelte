<script>
	// @ts-nocheck

	import { page } from '$app/stores';
	import {
		Button,
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
		Input
	} from 'flowbite-svelte';
	import { CompressOutline, SearchOutline } from 'flowbite-svelte-icons';

</script>

<header>
	<Navbar let:hidden let:toggle color="primary-900">
		<NavBrand href="/">
			<CompressOutline class="mx-2" />

			<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-red-800"
				>Fiona</span
			>
		</NavBrand>
		<div class="flex items-center gap-5 md:order-2">
			<Button
				color="none"
				data-collapse-toggle="mobile-menu-3"
				aria-controls="mobile-menu-3"
				aria-expanded="false"
				class="me-1 rounded-lg p-2.5 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 md:hidden dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
			>
				<SearchOutline class="h-5 w-5" />
			</Button>
			<div class="relative hidden md:block">
				<div class="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
					<SearchOutline class="h-4 w-4" />
				</div>
				<Input id="search-navbar" class="ps-10" placeholder="Search..." />
			</div>
			<Avatar
				class=""
				id="avatar-menu"
				src="https://res.cloudinary.com/practicaldev/image/fetch/s--SS3dXHtQ--/c_fill,f_auto,fl_progressive,h_320,q_auto,w_320/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/1017666/5f9a5856-af9f-4cd6-8f85-73a774e1f779.jpeg"
			/>
			<NavHamburger class1="w-full md:flex md:w-auto md:order-1" on:click={toggle} />
		</div>
		<Dropdown placement="bottom" triggeredBy="#avatar-menu">
			<DropdownHeader>
				<span class="block text-sm">John DOE</span>
				<span class="block truncate text-sm font-medium">kabirou2001@gmail.com</span>
			</DropdownHeader>
			<DropdownItem>Profile</DropdownItem>
			<DropdownItem>Settings</DropdownItem>
			<DropdownDivider />
			<DropdownItem class="text-red-900">Sign out</DropdownItem>
		</Dropdown>
		<NavUl {hidden} class="order-1">
			<NavLi href="/" active={true} aria-current={$page.url.pathname === '/' ? 'page' : undefined}
				>Home</NavLi
			>
			<NavLi href="/posts">Blog</NavLi>
			<NavLi href="/posts/new">Add Post</NavLi>
			<NavLi href="/contact">Contact</NavLi>
		</NavUl>
	</Navbar>
</header>
