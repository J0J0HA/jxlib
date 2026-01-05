<script lang="ts">
    import "../style/common.css";
    import feather from "feather-icons";
    import type { Snippet } from "svelte";
    import { setContext } from "svelte";
    import FIcon from "./FIcon.svelte";

    let {
        children,
        tabs,
        fx,
        fh,
        fw,
    }: {
        children: Snippet;
        tabs: Record<
            string,
            {
                label: string;
                danger?: boolean;
                disabled?: boolean;
                icon?: keyof typeof feather.icons;
            }
        >;
        fh?: boolean;
        fw?: boolean;
        fx?: boolean;
    } = $props();

    // svelte-ignore state_referenced_locally
    let selectedTab: string = $state(Object.keys(tabs)[0] || "--never--");

    $effect(() => {
        const tabKeys = Object.keys(tabs);
        if (tabKeys.length === 0) return;
        if (!tabKeys.includes(selectedTab)) selectedTab = tabKeys[0];
    });

    setContext("selectedTab", () => selectedTab);
</script>

<div class="jx wrapper" class:fw class:fh class:fx>
    <div class="jx selector">
        {#each Object.entries(tabs) as [key, tabInfo] (key)}
            <button
                type="button"
                class="jx tab-button"
                onclick={() => {
                    selectedTab = key;
                }}
                disabled={tabInfo.disabled}
                class:danger={tabInfo.danger}
                class:selected={selectedTab === key}
            >
                {#if tabInfo.icon}
                    <FIcon icon={tabInfo.icon} />
                {/if}
                {tabInfo.label ?? key}
            </button>
        {/each}
    </div>

    <div class="jx content-wrapper fx">
        {@render children?.()}
    </div>
</div>

<style>
    .selector {
        display: flex;
        flex-direction: row;
        justify-content: start;
        align-items: end;

        gap: 2.5px;
        padding: 5px;
        padding-bottom: 0;
    }
    .content-wrapper {
        display: block;
        padding: 10px;
        background-color: color-mix(in srgb, transparent, var(--fg) 10%);
        border: var(--secondary-bdw) solid var(--secondary-bd);
        border-radius: var(--bdrad);
    }

    .tab-button {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
        gap: 7.5px;

        cursor: pointer;

        box-sizing: border-box;

        user-select: none;

        border-radius: var(--bdrad);
        padding: calc(10px + var(---bdf)) calc(15px + var(---bdf));

        ---fg: var(--tertiary-fg);
        ---bg: var(--tertiary-bg);
        ---bd: var(--tertiary-bd);
        ---bdw: var(--tertiary-bdw);
        ---bdf: var(--tertiary-bdf);

        color: var(---fg);
        background-color: var(---bg);
        border: var(---bdw) solid var(---bd);
        border-bottom: none;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;

        transition: all 100ms;

        &.danger {
            ---bg: color-mix(in srgb, var(--bg), var(--danger) 25%);
        }

        &:has(> :global(.jx.icon:first-child)) {
            padding-left: calc(10px + var(---bdf));
        }

        &:has(> :global(.jx.icon:last-child)) {
            padding-right: calc(10px + var(---bdf));
        }

        &:hover {
            background-color: color-mix(in srgb, var(---bg), black 15%);
            border-color: color-mix(in srgb, var(---bd), black 30%);
        }

        &.selected {
            background-color: color-mix(in srgb, var(---bg), var(--fg) 30%);
        }

        &:active {
            background-color: color-mix(in srgb, var(---bg), var(--fg) 35%);
            border-color: color-mix(in srgb, var(---bd), var(--fg) 60%);
        }

        &:disabled {
            background-color: color-mix(in srgb, var(---bg), black 50%);
            border-color: color-mix(in srgb, var(---bd), black 50%);
            color: color-mix(in srgb, var(---fg), white 20%);
            cursor: default;
        }
    }
</style>
