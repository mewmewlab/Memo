<script lang="ts">
	import "../app.css";
	let { children } = $props();

	import { Toaster, toast } from "svelte-sonner";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";

	import { user, pb } from "$lib";

	let isOpen = $state(false);

	const signOut = () => {
		isOpen = false;
		toast.success("Sign out success");
		pb.authStore.clear();
		user.set(null)
		console.log(user)
	};
</script>

<div class="flex flex-col font-bold bg-white">
	<Toaster richColors position="top-right" />
	<header
		class="p-4 flex items-center justify-center border-b border-gray-300"
	>
		<div class="w-2/3 flex items-center justify-between">
			{#if user}
				<a href="/" class="text-2xl text-pink-500">Memo</a>
			{:else}
				<a href="/" class="text-2xl">Memo</a>
			{/if}
			<nav class="flex items-center gap-10">
				<a href="/files">Files</a>
				<a href="/notes">Notes</a>
				{#if user}
					<DropdownMenu.Root>
						<DropdownMenu.Trigger class="text-blue-700">
							User
						</DropdownMenu.Trigger>
						<DropdownMenu.Content>
							<DropdownMenu.Group>
								<DropdownMenu.Item>
									<button onclick={signOut}>Log out</button>
								</DropdownMenu.Item>
							</DropdownMenu.Group>
						</DropdownMenu.Content>
					</DropdownMenu.Root>
				{:else}
					<a href="/signin">Signin</a>
				{/if}
			</nav>
		</div>
	</header>
	<main class="flex-1 overflow-y-auto p-4 w-2/3 mx-auto flex justify-center">
		{#if children}
			{@render children()}
		{:else}
			<p>fallback content</p>
		{/if}
	</main>
</div>
