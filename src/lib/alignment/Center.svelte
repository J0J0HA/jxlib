<script lang="ts">
    import type { Snippet } from "svelte";
    import "../style/common.css";

    let {
        children = null,

        // General
        fw = false,
        fh = false,
        fx = false,
    }: {
        children?: Snippet | null;
        fw?: boolean;
        fh?: boolean;
        fx?: boolean;
    } = $props();
</script>

<div class="jx ct" class:fh class:fw class:fx>
    {@render children?.()}
</div>

<style>
    .ct {
        display: flex;

        flex-direction: column;
        justify-content: center;
        align-items: center;

        gap: 5px;

        &:not(.fw) {
            width: fit-content;
        }
    }
</style>
