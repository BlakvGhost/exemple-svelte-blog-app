<script lang="ts">
	import { register as rg } from '$lib/auth.service';
	import { AuthUser as User } from '$lib/authStore';
	import { EMPTY_FIELDS_MESSAGE, PASSWORD_NOT_SAME_MESSAGE } from '$lib/message';
	import { Alert } from 'flowbite-svelte';
	import { InfoCircleSolid } from 'flowbite-svelte-icons';

	let user = new User();

	let password = { password1: '', password2: '' };

	let error: string | undefined;

	let process = false;

	$: {
		user;
		password;
		error;
		process;
	}

	async function register(event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement }) {
		if (user.email && user.first_name && user.last_name && password.password1) {
			if (password.password1 === password.password2) {
				process = true;
				error = await rg(user.email, password.password1, user);
				return (process = false);
			}
			return (error = PASSWORD_NOT_SAME_MESSAGE);
		}
		return (error = EMPTY_FIELDS_MESSAGE);
	}
</script>

{#if error}
	<Alert color="red" border>
		<InfoCircleSolid slot="icon" class="h-4 w-4" />
		<span class="font-medium">{error}</span>
	</Alert>
{/if}
<form class="space-y-2" on:submit|preventDefault={register}>
	<div class="block items-center justify-center gap-2 md:flex">
		<div>
			<label class="font-medium" for="first_name">First Name</label>
			<input
				bind:value={user.first_name}
				id="first_name"
				type="text"
				required
				class="w-full rounded-lg border bg-transparent px-3 py-2 text-gray-500 shadow-sm outline-none focus:border-indigo-600"
			/>
		</div>
		<div>
			<label for="last_name" class="font-medium">Last Name</label>
			<input
				bind:value={user.last_name}
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
			bind:value={user.email}
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
				bind:value={password.password1}
				id="password"
				type="password"
				required
				class="w-full rounded-lg border bg-transparent px-3 py-2 text-gray-500 shadow-sm outline-none focus:border-indigo-600"
			/>
		</div>
		<div>
			<label for="password_confirm" class="font-medium">Confirm Password</label>
			<input
				bind:value={password.password2}
				id="password_confirm"
				type="password"
				required
				class="w-full rounded-lg border bg-transparent px-3 py-2 text-gray-500 shadow-sm outline-none focus:border-indigo-600"
			/>
		</div>
	</div>

	<div class="pt-3">
		{#if process}
			<button
				type="button"
				class="w-full rounded-lg bg-indigo-400 px-4 py-2 font-medium text-white"
				disabled
			>
				<span class="mr-3 h-5 w-5 animate-spin"> </span>
				Processing...
			</button>
		{:else}
			<button
				class="w-full rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white duration-150 hover:bg-indigo-500 active:bg-indigo-600"
			>
				Sign Up
			</button>
		{/if}
	</div>
</form>
