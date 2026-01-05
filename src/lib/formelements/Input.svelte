<script lang="ts">
    import type { Snippet } from "svelte";
    import "../style/common.css";
    import {
        inputmodePatterns,
        typePatterns,
    } from "$lib/utils/formvalidators.ts";

    let {
        name,
        children = null,
        placeholder = null,
        value = $bindable(""),
        type = "text",
        inputmode = null,
        required = false,
        pattern = null,

        disabled = false,
        invalid = $bindable(false),

        // General
        fx = false,
        fh = false,
        fw = false,
    }: {
        name: string;
        children?: Snippet | null;
        value?: string;
        type?:
            | "text"
            | "password"
            | "email"
            | "tel"
            | "number"
            | "time"
            | "url"
            | "date";
        inputmode?:
            | "text"
            | "none"
            | "tel"
            | "url"
            | "email"
            | "numeric"
            | "decimal"
            | null;
        placeholder?: string | null;
        fh?: boolean;
        fw?: boolean;
        fx?: boolean;
        required?: boolean;
        pattern?: RegExp | null;
        disabled?: boolean;
        invalid?: boolean;
    } = $props();

    const validateValidity = () => {
        if (required && !value) invalid = true;
        else if (pattern && !pattern.test(value)) invalid = true;
        else if (!required && !value) invalid = false;
        else if (inputmode && !inputmodePatterns[inputmode].test(value))
            invalid = true;
        else if (!typePatterns[type].test(value)) invalid = true;
        else invalid = false;
    };
</script>

<div class="jx input" class:fh class:fw class:fx>
    {#if children}
        <label for={name}>
            {@render children()}
        </label>
    {/if}
    <input
        {type}
        {inputmode}
        {name}
        id="--input-{name}"
        {placeholder}
        bind:value
        {required}
        pattern={pattern?.toString()}
        {disabled}
        class:invalid
        oninvalid={(e) => {
            invalid = true;
        }}
        onkeyup={validateValidity}
        onchange={validateValidity}
    />
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

    input {
        all: unset;

        width: 100%;

        box-sizing: border-box;

        user-select: contain;

        border-radius: var(--bdrad);
        padding: calc(10px + var(---bdf));

        ---fg: var(--tertiary-fg);
        ---bg: color-mix(in srgb, var(--tertiary-bg), var(--tertiary-fg) 4%);
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

        &:disabled {
            cursor: default;
            ---bg: color-mix(
                in srgb,
                var(--tertiary-bg),
                var(--tertiary-fg) 20%
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

        &.invalid {
            ---bd: var(--danger);
        }
    }
</style>
