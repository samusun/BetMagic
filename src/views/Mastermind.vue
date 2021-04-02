<template>
  <div class="mastermind">
    <Mastermind />
  </div>
</template>

<script>
  import Mastermind from '../components/mastermind/Mastermind.vue'

  export default {
    name: 'Game',
    components: {
      Mastermind
    }
  }
</script>

<style scoped lang="scss"></style>
