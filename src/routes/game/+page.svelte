<script>
  import { onMount } from 'svelte';

  // add type to component using jsdocs to avoid typescript errors
  /** @type {typeof import('../../page/game/game.svelte').default} */
  let MyComponent;
  onMount(async () => {
    document.getElementById('header')?.remove();
    document.getElementById('footer')?.remove();
    const module = await import('../../page/game/game.svelte');
    MyComponent = module.default;
  });
</script>

<div
  class="text-white text-center w-screen flex justify-center items-center h-screen"
  style="min-height: 200px;"
>
  <svelte:component this={MyComponent} />
</div>
