<script lang="ts">
	import "../app.css";
	let { children } = $props();
</script>

<div class="flex flex-col h-screen font-bold bg-gray-100">
	<header
		class="p-4 flex items-center justify-center border-b border-gray-300"
	>
		<div class="w-2/3 flex items-center justify-between">
			<a href="/" class="text-2xl">Memo</a>
			<nav class="flex items-center gap-10">
				<a href="/files">Files</a>
				<a href="/notes">Notes</a>
			</nav>
		</div>
	</header>
	<main
		class="flex-1 overflow-y-auto p-4 w-2/3 mx-auto flex items-center justify-center"
	>
		{#if children}
			{@render children()}
		{:else}
			<p>fallback content</p>
		{/if}
	</main>
</div>
