<script lang="ts">
	import { page } from '$app/stores';

	import '../../app.pcss';
	import bgAuthImage from '$lib/images/auth-bg.jpg';
	import { CompressOutline, InfoCircleSolid } from 'flowbite-svelte-icons';
	import { Alert, Button, Spinner } from 'flowbite-svelte';
	import { loginWithGoogle } from '$lib/auth.service';
	import { getAppName } from '$lib/helpers';

	let error: string | undefined;
	let process = false;

	$: isPage = function (page: string = 'login') {
		return $page.route.id?.includes(page);
	};

	$: {
		error;
		process;
	}

	async function lg() {
		process = true;
		error = await loginWithGoogle();
		process = false;
	}
</script>

{#if error}
	<Alert color="red" border>
		<InfoCircleSolid slot="icon" class="h-4 w-4" />
		<span class="font-medium">{error}</span>
	</Alert>
{/if}
<svelte:head>
	<title>{isPage() ? 'Se Connecter ' : 'Creer un compte '} | {getAppName()}</title>
</svelte:head>
<div class="min-h-screen bg-cover bg-no-repeat" style="background-image: url('{bgAuthImage}');">
	<div class="app flex w-full flex-col">
		<main class="mx-auto my-0 flex w-full flex-1 flex-col p-2 text-white">
			<div class="flex w-full flex-col items-center justify-center overflow-hidden sm:px-4">
				<div
					class="w-full space-y-6 rounded-lg bg-primary-900 p-4 py-6 text-gray-500 shadow sm:max-w-xl sm:rounded-lg sm:p-6"
				>
					<div class="text-center">
						<div class="flex justify-center text-white">
							<CompressOutline class="mx-2 self-center" />
							<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-red-800">
								{getAppName()}
							</span>
						</div>
						{#if isPage()}
							<div class="mt- space-y-2">
								<h3 class="text-2xl font-bold text-gray-400 sm:text-3xl">Log in to your account</h3>
								<p class="">
									Don't have an account?
									<a
										href="/auth/register"
										class="font-medium text-indigo-600 hover:text-indigo-500"
									>
										Sign up
									</a>
								</p>
							</div>
						{/if}
						{#if isPage('register')}
							<div class="mt- space-y-2">
								<h3 class="text-2xl font-bold text-gray-400 sm:text-3xl">Create your account</h3>
								<p class="">
									Already have an account?
									<a href="/auth/login" class="font-medium text-indigo-600 hover:text-indigo-500">
										Sign in
									</a>
								</p>
							</div>
						{/if}
					</div>
					<div class="space-y-6 p-4 py-6 sm:px-4 sm:py-0">
						<div class="grid grid-cols-1 gap-x-3 sm:px-6">
							{#if process}
								<Button class="w-full">
									<img
										src="https://raw.githubusercontent.com/sidiDev/remote-assets/7cd06bf1d8859c578c2efbfda2c68bd6bedc66d8/google-icon.svg"
										alt="Google"
										class="h-5 w-5"
									/>
									<Spinner class="mx-3" size="4" color="white" />Login with Google ...
								</Button>
							{:else}
								<button
									on:click={lg}
									class="flex items-center justify-center rounded-lg border py-2.5 duration-150 hover:bg-gray-50 active:bg-gray-100"
								>
									<!-- Comment: Google Icon SVG here -->
									<img
										src="https://raw.githubusercontent.com/sidiDev/remote-assets/7cd06bf1d8859c578c2efbfda2c68bd6bedc66d8/google-icon.svg"
										alt="Google"
										class="h-5 w-5"
									/>
									{#if isPage('register')}
										<span class="mx-2 font-bold">Sign up with Google</span>
									{/if}
									{#if isPage()}
										<span class="mx-2 font-bold">Sign in with Google</span>
									{/if}
								</button>
							{/if}
						</div>
						<div class="relative">
							<span class="block h-px w-full bg-gray-300"></span>
							<p
								class="absolute inset-x-0 -top-2 mx-auto inline-block w-fit bg-gray-500 px-2 text-sm text-gray-300"
							>
								Or continue with
							</p>
						</div>
						<slot />
					</div>
					<div class="text-center">
						<a href="auth/forgot-password" class="hover:text-indigo-600">Forgot password?</a>
					</div>
				</div>
			</div>
		</main>
	</div>
</div>
