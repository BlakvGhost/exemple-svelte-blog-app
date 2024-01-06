<script lang="ts">
</script>

<form class="space-y-5">
	<div>
		<label for="email" class="font-medium">Email</label>
		<input
			id="email"
			type="email"
			required
			class="w-full rounded-lg border bg-transparent px-3 py-2 text-gray-500 shadow-sm outline-none focus:border-indigo-600"
		/>
	</div>
	<div>
		<label for="password" class="font-medium">Password</label>
		<input
			id="password"
			type="password"
			required
			class="w-full rounded-lg border bg-transparent px-3 py-2 text-gray-500 shadow-sm outline-none focus:border-indigo-600"
		/>
	</div>
	<button
		class="w-full rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white duration-150 hover:bg-indigo-500 active:bg-indigo-600"
	>
		Sign in
	</button>
</form>
