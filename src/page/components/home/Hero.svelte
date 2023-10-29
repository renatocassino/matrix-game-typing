<script>
  import heroUrl from '$lib/images/hero.webp';
</script>

<section
  class="bg-gray-900 text-white w-screen bg-cover hero bg-bottom bg-opacity-5"
  style="background-image: url({heroUrl})"
>
  <div
    class="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center hero-inner z-10"
  >
    <div class="mx-auto max-w-3xl text-center">
      <h1
        class="bg-gradient-to-r from-slate-200 to-white bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl shadow-lg"
      >
        The Matrix Typer Game
      </h1>

      <p class="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
        Master the art of typing with MatrixTyper! Dive into a challenging datilography experience
        and enhance your typing speed and accuracy.
      </p>

      <div class="mt-8 flex flex-wrap justify-center gap-4">
        <a
          class="block w-full rounded border border-green-600 bg-green-600 px-12 py-3 text-lg text-white hover:bg-white hover:text-green-600 focus:outline-none focus:ring active:text-opacity-75 sm:w-auto font-bold transition-colors"
          href="/game"
          style="font-we"
        >
          Play game
        </a>
      </div>
    </div>
  </div>
</section>

<style scoped>
  @media (min-width: 1024px) {
    .hero-inner {
      height: calc(100vh - 10rem);
      position: relative;
      overflow: hidden;
    }

    .hero {
      position: relative;
    }
    .hero::before {
      content: '';
      background: #000;
      opacity: 0.3;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      position: absolute;
      z-index: 0;
    }
  }
</style>
