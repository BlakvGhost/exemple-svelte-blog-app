<script lang="ts">
</script>

<form class="space-y-2">
	<div class="md:flex block items-center justify-center gap-2">
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
	<div class="md:flex block items-center justify-center gap-2">
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
