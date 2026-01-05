<script lang="ts">
    import type { Snippet } from "svelte";
    import "../style/common.css";
    import type { Alignment } from "../utils/types.ts";

    let {
        children = null,

        // Alignment
        justify = "center",
        align = "center",

        // General
        fw = false,
        fh = false,
        fx = false,
    }: {
        children?: Snippet | null;
        justify?: Alignment;
        align?: Alignment;
        fw?: boolean;
        fh?: boolean;
        fx?: boolean;
    } = $props();
</script>

<div
    class="jx row"
    class:fw
    class:fh
    class:fx
    style:justify-content={justify}
    style:align-items={align}
>
    {@render children?.()}
</div>

<style>
    .row {
        display: flex;

        &:not(.fw) {
            width: fit-content;
        }

        flex-direction: row;
        justify-content: center;
        align-items: center;

        gap: 5px;
    }
</style>
