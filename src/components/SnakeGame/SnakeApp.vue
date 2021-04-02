<template>
  <div id="snake-canvas">
    <snake-canvas :cellSize="cellSize" :boardSize="boardSize" />
  </div>
</template>
<script>
  import SnakeCanvas from './SnakeCanvas.vue'

  export default {
    name: 'SnakeApp',
    components: {
      SnakeCanvas
    },

    data() {
      return {
        cellSize: 25,
        boardSize: 15,
        isPlaying: false
      }
    },
    computed: {},
    methods: {}
  }
</script>
<style scoped lang="scss">
  @import '@/assets/scss/global.scss';
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  body {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background: transparent;
  }
  header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  #snake-canvas {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: white;
  }
</style>
