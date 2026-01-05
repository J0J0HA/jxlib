<script lang="ts">
    import Spacer from "../alignment/Spacer.svelte";

    let { m }: { m: string } = $props();
</script>

<Spacer h={m} />
<hr class="jx" />
<Spacer h={m} />

<style>
    hr {
        width: calc(100% - 1px);
        height: 0;
        border: 0.5px solid var(--tertiary-bd);
        margin: 5px 0;
    }
</style>
