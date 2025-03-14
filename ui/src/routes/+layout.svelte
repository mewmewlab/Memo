<script lang="ts">
	import "../app.css";
	let { children } = $props();

	import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";

	import { pb, user } from "$lib/stores/pocketbase";
    import { goto } from "$app/navigation";
    import { currentUser } from "$lib/stores/auth";
    import { onMount } from "svelte";

	const loadUserData = async () => {
		if (pb.authStore.isValid && pb.authStore.record?.id) {
			try {
				const user = await pb.collection('users').getOne(pb.authStore.record.id)
				currentUser.set(user)
			} catch (e) {
				pb.authStore.clear()
				goto("/signin")
			}
		}
	}

	onMount(async () => {
		if (!pb.authStore.isValid) {
			await goto('signin')
			return
		}
		loadUserData()
	})

	const signOut = async () => {
		pb.authStore.clear();
		await goto("/signin")
	};
</script>

<div class="flex flex-col font-bold bg-white">
	<header
		class="p-4 flex items-center justify-center border-b border-gray-300"
	>
		<div class="w-2/3 flex items-center justify-between">
			{#if $user}
				<a href="/" class="text-2xl text-pink-500">Memo</a>
			{:else}
				<a href="/" class="text-2xl">Memo</a>
			{/if}
			<nav class="flex items-center gap-10">
				<a href="/files">Files</a>
				<a href="/notes">Notes</a>
				{#if $user}
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
