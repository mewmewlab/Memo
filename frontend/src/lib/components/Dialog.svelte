<script lang="ts">
    let {children, dialog} = $props();
</script>

<dialog bind:this={dialog} on:close>
    {#if children}
        {@render children()}
    {:else}
        <p>fallback content</p>
    {/if}
</dialog>