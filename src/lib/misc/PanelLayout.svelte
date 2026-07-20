<script lang="ts">
    import { page } from "$app/state";
    import type { Action } from "svelte/action";
    import FIcon from "$lib/misc/FIcon.svelte";
    import type { Snippet } from "svelte";
    import feather from "feather-icons";

    let {
        children,
        pages,
    }: {
        children: Snippet;
        pages: Record<
            string,
            Record<
                string,
                {
                    icon: keyof typeof feather.icons;
                    link: string;
                }
            >
        >;
    } = $props();

    const hightlightIfOpen: Action = (node) => {
        if (!(node instanceof HTMLAnchorElement)) return;
        const target = new URL(node.href);

        $effect(() => {
            console.log(target, page.url.pathname === target.pathname);
            if (page.url.pathname === target.pathname)
                node.classList.add("open");
            else node.classList.remove("open");
        });
    };
</script>

<div class="wrapper">
    <nav>
        {#each Object.entries(pages) as [category, subpages] ("cat" + category)}
            <h2>{category}</h2>
            <ul>
                {#each Object.entries(subpages) as [subpage, { link, icon }] ("pg" + subpage)}
                    <li>
                        <a href={link} use:hightlightIfOpen>
                            <FIcon {icon} />
                            {subpage}
                        </a>
                    </li>
                {/each}
            </ul>
        {/each}
    </nav>
    <section>
        {@render children?.()}
    </section>
</div>

<style>
    .wrapper {
        display: flex;
        justify-content: stretch;
        align-items: stretch;
        height: 100%;
        width: 100%;
    }

    nav {
        width: fit-content;
        min-width: 100px;
        border-right: 1px solid lightgray;
        padding-top: 1.5rem;
        height: 100%;
        max-height: 100%;
        overflow-y: auto;
    }

    nav ul {
        list-style: none;
        padding: 0;
        margin-inline: 1rem;
    }

    nav a {
        border-radius: 4px;
        margin-bottom: 0.25rem;

        text-decoration: none;
        color: inherit;
        display: flex;
        align-items: center;
        gap: 0.5rem;

        padding-block: 0.62rem;
        padding-inline: 0.9rem;
        padding-right: 3rem;
    }

    nav a:hover {
        background-color: color-mix(in srgb, lightgray, transparent 60%);
    }

    nav a:global(.open) {
        background-color: color-mix(in srgb, lightgray, transparent 80%);
    }

    nav h2 {
        margin-top: -0.5rem;
        margin-bottom: -0.75rem;
        margin-inline: 1.5rem;
        padding: 0;
        font-size: 0.78rem;
    }

    section {
        display: block;

        padding: 4rem;
        border-radius: 8px;

        height: 100%;
        width: 100%;
        max-height: 100%;
        overflow-y: auto;
    }
</style>
