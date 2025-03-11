<script lang="ts">
    import type { PageData } from "./$types";
    const { data } = $props<{ data: PageData }>();
</script>

<div class="flex flex-col gap-10 content-center items-center">
    {#if data.error}
        <div class="flex flex-col items-left pb-32 gap-3">
            <h1 class="text-5xl text-gray-600">404</h1>
            <p class="text-m text-gray-400">
                {data.id} IS NOT FOUND
            </p>
        </div>
    {:else}
        <span>{data.name}</span>
        <button
            class="bg-sky-500 hover:bg-sky-700 cursor-pointer
        text-white px-4 py-2 rounded-md w-1/2"
            onclick={() => window.open(`${data.url}?download=1`)}
        >
            Download
        </button>
    {/if}
</div>
