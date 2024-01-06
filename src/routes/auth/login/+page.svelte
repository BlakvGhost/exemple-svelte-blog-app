<script lang="ts">
	import { login as lg } from '$lib/auth.service';
	import { EMPTY_FIELDS_MESSAGE } from '$lib/message';
	import { Alert } from 'flowbite-svelte';
	import { InfoCircleSolid } from 'flowbite-svelte-icons';

	let email = '';
	let password = '';

	let error: string | undefined;

	let process = false;

	$: {
		email;
		password;
		error;
		process;
	}

	async function login(event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement }) {
		if (email && password) {
			process = true;
			error = await lg(email, password);
			return (process = false);
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
<form class="space-y-5" on:submit|preventDefault={login}>
	<div>
		<label for="email" class="font-medium">Email</label>
		<input
			bind:value={email}
			id="email"
			type="email"
			required
			class="w-full rounded-lg border bg-transparent px-3 py-2 text-gray-500 shadow-sm outline-none focus:border-indigo-600"
		/>
	</div>
	<div>
		<label for="password" class="font-medium">Password</label>
		<input
			bind:value={password}
			id="password"
			type="password"
			required
			class="w-full rounded-lg border bg-transparent px-3 py-2 text-gray-500 shadow-sm outline-none focus:border-indigo-600"
		/>
	</div>
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
			Sign In
		</button>
	{/if}
</form>
