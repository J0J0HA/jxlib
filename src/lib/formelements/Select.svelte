<script lang="ts">
    import type { Snippet } from "svelte";
    import "../style/common.css";

    let {
        name,
        children = null,
        fx = false,
        fh = false,
        fw = false,
        placeholder = null,
        value = $bindable(""),
        options = {},
    }: {
        name: string;
        children?: Snippet | null;
        fx?: boolean;
        fh?: boolean;
        fw?: boolean;
        placeholder?: string | null;
        value?: string | null;
        options: Record<string, string>;
    } = $props();
</script>

<div class="jx input" class:fh class:fw class:fx>
    {#if children}
        <label for={name}>
            {@render children()}
        </label>
    {/if}
    <select {name} id="--input-{name}" {placeholder} bind:value>
        {#each Object.entries(options) as [key, label]}
            <option value={key}>{label}</option>
        {/each}
    </select>
</div>

<style>
    .input {
        display: flex;
        flex-direction: column;

        justify-content: center;
        align-items: flex-start;
    }

    label {
        font-size: 0.9em;
        translate: 4px 0px;

        user-select: none;

        color: var(--tertiary-fg);
    }

    select {
        font-size: unset;

        width: 100%;

        box-sizing: border-box;

        user-select: contain;

        border-radius: var(--bdrad);
        padding: calc(10px + var(---bdf));

        ---fg: var(--tertiary-fg);
        ---bg: var(--tertiary-bg);
        ---bd: var(--tertiary-bd);
        ---bdw: var(--tertiary-bdw);
        ---bdf: var(--tertiary-bdf);

        color: var(---fg);
        background-color: var(---bg);
        border: var(---bdw) solid var(---bd);

        &:hover {
            ---bg: color-mix(
                in srgb,
                var(--tertiary-bg),
                var(--tertiary-fg) 2%
            );
            ---bd: color-mix(
                in srgb,
                var(--tertiary-bd),
                var(--tertiary-bg) 15%
            );
        }

        &:focus {
            ---bg: color-mix(
                in srgb,
                var(--tertiary-bg),
                var(--tertiary-fg) 7%
            );
            ---bd: color-mix(
                in srgb,
                var(--tertiary-bd),
                var(--tertiary-bg) 40%
            );
        }

        outline: 0px solid var(---bd);
        transition: outline 50ms;

        &:focus-visible {
            outline-width: 2px;
        }
    }
</style>
