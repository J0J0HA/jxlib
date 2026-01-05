<script lang="ts">
    import feather from "feather-icons";

    let {
        icon,
        blinking = false,
        rotating = false,
    }: {
        icon: keyof typeof feather.icons;
        blinking?: boolean;
        rotating?: boolean;
    } = $props();
</script>

<span class="jx icon" class:blinking class:rotating>
    {@html feather.icons[icon].toSvg()}
</span>

<style>
    span {
        display: grid;
        place-items: center;
        width: var(--fi-size, 1.2em);
        height: var(--fi-size, 1.2em);
        min-width: var(--fi-size, 1.2em);
        min-height: var(--fi-size, 1.2em);
        max-width: var(--fi-size, 1.2em);
        max-height: var(--fi-size, 1.2em);

        :global(.feather) {
            color: var(--fi-col, var(--fore));
            width: var(--fi-isize, 1.2em);
            height: var(--fi-isize, 1.2em);
        }
    }

    .blinking {
        animation: blink var(---itv, 1s) step-end infinite;
    }

    @keyframes blink {
        50% {
            opacity: 0;
        }
    }

    .rotating {
        animation: rotate var(---itv, 1s) linear infinite;
    }

    @keyframes rotate {
        0% {
            rotate: 0turn;
        }
        100% {
            rotate: 1turn;
        }
    }
</style>
