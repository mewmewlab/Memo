<script>
    let { children } = $props()
</script>
<div class="flex flex-1 items-center justify-center font-normal">
    <div class="p-6 ">
        {@render children?.()}
    </div>
</div>