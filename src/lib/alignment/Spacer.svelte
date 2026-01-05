<script lang="ts">
    let {
        h = null,
        w = null,
    }:
        | {
              h: string;
              w?: null;
          }
        | {
              h?: null;
              w: string;
          } = $props();
</script>

<div class="jx space" style:---h={h} style:---w={w}></div>

<style>
    .space {
        display: block;
        width: var(---w, 1em);
        height: var(---h, 1em);
    }
</style>
