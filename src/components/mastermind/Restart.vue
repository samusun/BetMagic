<template>
  <button @click="startNewGame" class="btn-return">
    Restart
  </button>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    name: 'restart',
    methods: {
      ...mapActions('d', {
        startNewGame: 'startNewGame'
      })
    }
  }
</script>

<style scoped lang="scss">
  @import '@/assets/scss/global.scss';
  .btn-return {
    padding: 5px 10px;
    border-radius: 4px;
    font-size: 20px;
    cursor: pointer;
    margin-top: 0.9em;
    font-family: 'Arcade', Avenir, Helvetica, Arial, sans-serif;
  }
</style>
