<template>
  <span>
    <button class="btn-return" @click="backa">Back</button>
  </span>
</template>

<script>
  export default {
    methods: {
      backa() {
        return this.$router.go(-1) // Eftersom Returnkomponenten används på samtliga sidor i appen så valde jag att göra funktionen universell med go.(-1) istället för att anpassa komponenten till varje sida.
      }
    }
  }
</script>

<style scoped lang="scss">
  .btn-return {
    padding: 5px 10px;
    border-radius: 4px;
    font-size: 20px;
    cursor: pointer;
    margin-top: 0.9em;
    font-family: 'Arcade', Avenir, Helvetica, Arial, sans-serif;
  }
</style>
