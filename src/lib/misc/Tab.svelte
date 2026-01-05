<script>
    import { getContext } from "svelte";

    let { key, children } = $props();

    let selectedTab = getContext("selectedTab");
</script>

{#if selectedTab?.() === key}
    {@render children?.()}
{/if}
