<script lang="ts">
	import { register as rg } from '$lib/auth.service';
	import { type AuthUser } from '$lib/authStore';
	import { EMPTY_FIELDS_MESSAGE } from '$lib/message';
	import { Alert } from 'flowbite-svelte';
	import { InfoCircleSolid } from 'flowbite-svelte-icons';

	let user: AuthUser;
	let password: {
		password1: string;
		password2: string;
	};
	let error: string | Promise<string | undefined>;

	$: {
		user;
		password;
		error;
	}

	function register(event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement }) {
		if (user.email && user.first_name && user.last_name && password.password1) {
			if (password.password1 === password.password2) {
				return (error = rg(user.first_name, password.password1, user));
			}
			return (error = EMPTY_FIELDS_MESSAGE);
		}
	}
</script>

{#if error}
	<Alert color="red" border>
		<InfoCircleSolid slot="icon" class="h-4 w-4" />
		<span class="font-medium">Error!</span>
		{error}
	</Alert>
{/if}
<form class="space-y-2" on:submit|preventDefault={register}>
	<div class="block items-center justify-center gap-2 md:flex">
		<div>
			<label class="font-medium" for="first_name">First Name</label>
			<input
				id="first_name"
				type="text"
				required
				class="w-full rounded-lg border bg-transparent px-3 py-2 text-gray-500 shadow-sm outline-none focus:border-indigo-600"
			/>
		</div>
		<div>
			<label for="last_name" class="font-medium">Last Name</label>
			<input
				id="last_name"
				type="text"
				required
				class="w-full rounded-lg border bg-transparent px-3 py-2 text-gray-500 shadow-sm outline-none focus:border-indigo-600"
			/>
		</div>
	</div>
	<div>
		<label for="email" class="font-medium">Email</label>
		<input
			id="email"
			type="email"
			required
			class="w-full rounded-lg border bg-transparent px-3 py-2 text-gray-500 shadow-sm outline-none focus:border-indigo-600"
		/>
	</div>
	<div class="block items-center justify-center gap-2 md:flex">
		<div>
			<label for="password" class="font-medium">Password</label>
			<input
				id="password"
				type="password"
				required
				class="w-full rounded-lg border bg-transparent px-3 py-2 text-gray-500 shadow-sm outline-none focus:border-indigo-600"
			/>
		</div>
		<div>
			<label for="password_confirm" class="font-medium">Confirm Password</label>
			<input
				id="password_confirm"
				type="password"
				required
				class="w-full rounded-lg border bg-transparent px-3 py-2 text-gray-500 shadow-sm outline-none focus:border-indigo-600"
			/>
		</div>
	</div>

	<div class="pt-3">
		<button
			class="w-full rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white duration-150 hover:bg-indigo-500 active:bg-indigo-600"
		>
			Sign Up
		</button>
	</div>
</form>
