<template>
  <div class="game-setup">
    <span class="game__text">LOADING GAME</span>
    <span class="game__load">.</span>
    <span class="game__load">.</span>
    <span class="game__load">.</span>
  </div>
</template>
<script>
  export default {
    name: 'GameLoad'
  }
</script>
<style lang="scss" scoped>
  $background: #131212;
  $font: rgb(252, 242, 242);

  .game-setup {
    display: flex;
    justify-content: center;
    align-items: baseline;
    background: $background;
    z-index: 9999;
    height: 100%;
    width: 100%;
    top: 0;
    position: absolute;
    padding-top: 19rem;
    color: $font;
    span {
      font-size: 2.4rem;
    }
    @media (min-width: 800px) {
      .game-setup {
        height: 100vh;
      }
    }
    .game__load:nth-child(2) {
      opacity: 0;
      animation: loadFade1 1.5s infinite;
    }
    .game__load:nth-child(3) {
      opacity: 0;
      animation: loadFade2 1.5s infinite;
    }
    .game__load:nth-child(4) {
      opacity: 0;
      animation: loadFade3 1.5s infinite;
    }
  }
  @keyframes loadFade1 {
    24% {
      opacity: 0;
    }
    25% {
      opacity: 1;
    }
    99% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  @keyframes loadFade2 {
    49% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    99% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  @keyframes loadFade3 {
    74% {
      opacity: 0;
    }
    75% {
      opacity: 1;
    }
    99% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
</style>
