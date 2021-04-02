<template>
  <div id="app">
    <router-view />
    <themeSwitch />
    <online-offline />
    <playerScore />
  </div>
</template>

<script>
  import playerScore from '@/components/playerScore.vue'
  import ThemeSwitch from '@/components/ThemeSwitch.vue'
  import OnlineOffline from '@/components/online-offline/OnlineOffline.vue'

  export default {
    name: 'App',
    components: {
      playerScore,
      ThemeSwitch,
      OnlineOffline
    }
  }
</script>

<style lang="scss">
  @font-face {
    font-family: 'Arcade';
    src: url('./assets/fonts/ARCADECLASSIC.TTF') format('truetype');
  }
  #app {
    position: relative;
    letter-spacing: 0.06em;
  }
</style>
