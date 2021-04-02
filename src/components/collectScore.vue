<template>
  <span id="winner">
    <h1>GOOD JOB! You earned 100 points!</h1>
    <button id="myBtn" @click="increaseAndClose">
      Collect Points
    </button>
  </span>
</template>

<script>
  import { mapMutations, mapActions } from 'vuex' // Här importerar jag funktioner från två olika moduler i Vuex, en specifik modul för spelet, en från modulen som håller spelardata, som namn och poäng.

  export default {
    data() {
      return {
        current: null,
        toNum: null
      }
    },
    methods: {
      ...mapMutations('playerData', {
        increaseScore: 'closeCollect'
      }),
      ...mapActions('d', {
        startNewGame: 'startNewGame'
      }),
      increaseAndClose() {
        localStorage.setItem('Temporary', 'true')
        if (localStorage.getItem('localScore')) {
          // Om spelaren har ett score i Localstorage så adderas poängen till den.
          this.current = localStorage.getItem('localScore')
          this.toNum = parseInt(this.current) // I localstorage sparas datan som sträng, här gör jag om den till number
        } else {
          this.toNum = 0 // Finns inget värde i Localstorage så börjar spelaren på 0.
        }
        this.toNum += 100
        this.toNum.toString()
        localStorage.setItem('localScore', this.toNum) // Nu är värdet en sträng igen så den kan sparas i Localstorage
        this.$store.state.playerData.show = false //Här blir denna komponent osynlig igen
        this.startNewGame() // Spelet startas om ifall man spelar Mastermind, på de andra spelen finns en knapp där man väljer att starta nytt spel.
      }
    }
  }
</script>

<style>
  #winner {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    z-index: 1;
    top: 20vh;
    height: 250px;
    width: 250px;
    padding: 5px 10px;
    border: 1px solid white;
    border-radius: 4px;
    font-size: 5vh;
    cursor: pointer;
    margin-top: 0.9em;
    background-color: black;
    color: white;
    font-family: 'Arcade', Avenir, Helvetica, Arial, sans-serif;
  }
  #myBtn {
    width: 150px;
    height: 70px;
    background-color: gold;
    font-family: 'Arcade', Avenir, Helvetica, Arial, sans-serif;
  }
</style>
