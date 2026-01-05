<script lang="ts">
    import type { Snippet } from "svelte";
    import "../style/common.css";
    import type { MouseEventHandler } from "svelte/elements";
    import FIcon from "$lib/misc/FIcon.svelte";
    import feather from "feather-icons";
    import { allButtons, heavyWrap } from "../utils/heavyHandler.svelte.ts";
    let {
        children = null,

        // Handlers
        onclick = null,
        href = null,
        submit = false,
        formaction = null,
        disabled = false,
        icon = null,
        loadingIcon = "loader",

        blocksAllButtons = false,
        loading = $bindable(false),

        // Styles
        secondary = false,
        danger = false,

        // General
        fx = false,
        fh = false,
        fw = false,
    }:
        | {
              children?: Snippet | null;
              onclick?: MouseEventHandler<HTMLAnchorElement> | null;
              href: string;
              icon?: keyof typeof feather.icons | null;
              loadingIcon?: keyof typeof feather.icons;

              disabled?: boolean;
              blocksAllButtons?: boolean;
              loading?: boolean;

              submit?: false;
              formaction?: null;

              secondary?: boolean;
              danger?: boolean;

              fx?: boolean;
              fh?: boolean;
              fw?: boolean;
          }
        | {
              children?: Snippet | null;
              onclick?: MouseEventHandler<HTMLButtonElement> | null;
              href?: null;
              icon?: keyof typeof feather.icons | null;
              loadingIcon?: keyof typeof feather.icons;

              disabled?: boolean;
              blocksAllButtons?: boolean;
              loading?: boolean;

              submit?: boolean;
              formaction?: string | null;

              secondary?: boolean;
              danger?: boolean;

              fx?: boolean;
              fh?: boolean;
              fw?: boolean;
          } = $props();

    let isDisabled = $derived(disabled || allButtons.disabled || loading);
    const customOnclick = async (e: MouseEvent) => {
        if (!onclick) return;
        if (isDisabled) return;

        let promise = Promise.resolve(onclick(e as any));

        if (blocksAllButtons) allButtons.disabled = true;
        loading = true;
        return await promise
            .then((res) => {
                if (blocksAllButtons) allButtons.disabled = false;
                loading = false;
                return res;
            })
            .catch((err) => {
                if (blocksAllButtons) allButtons.disabled = false;
                loading = false;
                throw err;
            });
    };
</script>

{#if href}
    <a
        href={isDisabled ? "#" : href}
        onclick={customOnclick}
        class="jx button"
        class:secondary
        class:danger
        class:fx
        class:fh
        class:fw
        class:disabled={isDisabled}
    >
        {#if icon}
            <FIcon icon={loading ? loadingIcon : icon} rotating={loading} />
        {/if}
        {#if children}
            <span>
                {@render children()}
            </span>
        {/if}
    </a>
{:else}
    <button
        onclick={customOnclick}
        class="jx button"
        class:secondary
        class:danger
        class:fx
        class:fh
        class:fw
        class:disabled={isDisabled}
        type={submit ? "submit" : "button"}
        disabled={isDisabled}
        {formaction}
    >
        {#if icon}
            <FIcon icon={loading ? "loader" : icon} rotating={loading} />
        {/if}
        {#if children}
            <span>
                {@render children()}
            </span>
        {/if}
    </button>
{/if}

<style>
    .button {
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

        ---fg: var(--primary-fg);
        ---bg: var(--primary-bg);
        ---bd: var(--primary-bd);
        ---bdw: var(--primary-bdw);
        ---bdf: var(--primary-bdf);

        color: var(---fg);
        background-color: var(---bg);
        border: var(---bdw) solid var(---bd);

        transition: all 100ms;

        &:has(> :global(.jx.icon:first-child)) {
            padding-left: calc(10px + var(---bdf));
        }

        &:has(> :global(.jx.icon:last-child)) {
            padding-right: calc(10px + var(---bdf));
        }

        &.danger {
            ---bg: var(--danger);
            ---bd: var(--danger);
        }

        &.secondary {
            ---fg: var(--secondary-fg);
            ---bg: var(--secondary-bg);
            ---bd: var(--secondary-bd);
            ---bdw: var(--secondary-bdw);
            ---bdf: var(--secondary-bdf);

            &.danger {
                ---fg: var(--danger);
                ---bd: var(--danger);
            }
        }

        &:hover {
            background-color: color-mix(in srgb, var(---bg), black 15%);
            border-color: color-mix(in srgb, var(---bd), black 30%);
        }

        &:active {
            background-color: color-mix(in srgb, var(---bg), black 30%);
            border-color: color-mix(in srgb, var(---bd), black 60%);
        }

        &.disabled {
            background-color: color-mix(in srgb, var(---bg), black 50%);
            border-color: color-mix(in srgb, var(---bd), black 50%);
            color: color-mix(in srgb, var(---fg), black 50%);
            cursor: default;
        }
    }
</style>
