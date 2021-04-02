<template>
  <div>
    <span v-if="Registered">
      <!-- IF spelaren är inloggad så visas denna komponent nere i höger hörn på vår apps alla sidor. -->
      <h1 id="playerScore">
        {{ localAlias }}
        {{ localScore }}
      </h1>
    </span>
    <span v-else-if="Temporary">
      <h1 id="playerScore">
        {{ localScore }}
      </h1>
    </span>
  </div>
</template>

<script>
  export default {
    created() {
      setInterval(() => {
        this.localAlias = localStorage.getItem('Alias')
        this.localScore = localStorage.getItem('localScore')
        this.Registered = localStorage.getItem('Registered')
        this.Temporary = localStorage.getItem('Temporary')
        this.$forceUpdate() // Då komponenten skapas hämtar den data från Localstorage, och för att bli något sånär responsiv så uppdateras den varje sekund och kollar i lokalstorage igen.
      }, 1000)
    },
    data() {
      return {
        localAlias: localStorage.getItem('Alias'),
        localScore: localStorage.getItem('localScore'),
        Registered: localStorage.getItem('Registered'),
        Temporary: localStorage.getItem('Temporary')
      }
    }
  }
</script>

<style scoped lang="scss">
  #playerScore {
    position: fixed;
    bottom: 10px;
    display: flex;
    justify-content: flex-end;
    align-items: right;
    font-size: 2.5vh;
    right: 10px;
    font-family: 'Arcade', Avenir, Helvetica, Arial, sans-serif;
  }
</style>
