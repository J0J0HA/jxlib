<script lang="ts">
    import "$lib/style/themes/default.css";

    let { themeColor }: { themeColor: string } = $props();
</script>

<svelte:head>
    {@html `
    <style>
        :root{
            --theme: ${themeColor}
        }
    </style>
    `}
</svelte:head>
