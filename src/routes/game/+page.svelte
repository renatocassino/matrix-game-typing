<script>
  import { onMount } from 'svelte';

  // add type to component using jsdocs to avoid typescript errors
  /** @type {typeof import('../../page/game/game.svelte').default} */
  let MyComponent;
  onMount(async () => {
    const module = await import('../../page/game/game.svelte');
    MyComponent = module.default;
  });
</script>

<div class="text-white text-center" style="min-height: 200px;">
  <svelte:component this={MyComponent} />
</div>
