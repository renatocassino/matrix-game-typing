<script>
  import Footer from '../page/components/Footer.svelte';
  import Header from '../page/components/Header.svelte';
  import './styles.css';
</script>

<svelte:head>
  <meta charset="UTF-8" />

  <meta http-equiv="X-UA-Compatible" content="IE=edge" />

  <link rel="icon" type="image/png" href="/favicon.png" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>MatrixTyper: The Ultimate Typing Game</title>

  <meta name="google-adsense-account" content="ca-pub-5565264719549091" />

  <meta
    name="description"
    content="Master the art of typing with MatrixTyper! Dive into a challenging datilography experience and enhance your typing speed and accuracy."
  />
  <meta
    name="keywords"
    content="MatrixTyper, typing game, datilography game, learn typing, improve typing speed, typing challenge, typing practice"
  />

  <!-- OpenGraph Tags for Social Media -->
  <meta property="og:title" content="MatrixTyper: Master Typing in a Fun Way!" />
  <meta
    property="og:description"
    content="Join MatrixTyper and embark on a typing journey! Improve your datilography skills, speed, and accuracy with exciting challenges."
  />
  <meta property="og:image" content="https://matrixtyper.com/media1.jpg" />
  <meta property="og:url" content="https://matrixtyper.com" />
  <meta property="og:type" content="website" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="MatrixTyper: Dive into the Ultimate Typing Challenge!" />
  <meta
    name="twitter:description"
    content="Discover MatrixTyper - where you can hone your datilography skills with thrilling and interactive typing challenges."
  />
  <meta name="twitter:image" content="https://matrixtyper.com/media1.jpg" />

  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="true" />
  <link
    href="https://fonts.googleapis.com/css2?family=Orbitron&family=Roboto+Slab&display=swap"
    rel="stylesheet"
  />
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-HDC35FH828"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    gtag('js', new Date());

    gtag('config', 'G-HDC35FH828');
  </script>
  <script
    async
    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5565264719549091"
    crossorigin="anonymous"
  ></script>
</svelte:head>

<div class="app">
  <Header />

  <main>
    <slot />
  </main>

  <!-- <script
    data-name="BMC-Widget"
    data-cfasync="false"
    src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"
    data-id="cassinodev"
    data-description="Support me on Buy me a coffee!"
    data-message="Thank you for playing! 😊 If you'd like to support me, buying me a coffee would make my day! ☕️"
    data-color="#40DCA5"
    data-position="Right"
    data-x_margin="18"
    data-y_margin="18"
  ></script>
  <script
    src="https://cdn.jsdelivr.net/npm/phaser@3.60.0/dist/phaser-arcade-physics.min.js"
  ></script>-->

  <div style="text-align: center; width: 100%; padding: 1rem;">
    <script type="text/javascript" src="https://cdnjs.buymeacoffee.com/1.0.0/button.prod.min.js" data-name="bmc-button" data-slug="cassinodev" data-color="#40DCA5" data-emoji="☕"  data-font="Cookie" data-text="Buy me a coffee" data-outline-color="#000000" data-font-color="#ffffff" data-coffee-color="#FFDD00" ></script>
  </div>

  <Footer />
</div>
