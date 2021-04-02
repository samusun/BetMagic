<template>
  <div class="page-game">
    <Cells
      style="background-color: green; font-size: 70px"
      :positions="positions"
    />
    <div class="row">
      <div class="col">
        <h3 class="footer__player">
          <span v-if="winner">
            <strong>{{ getWinnerName }}</strong> wins!
          </span>
          <span v-else-if="!winner && hasEmptyCells"
            >{{ getPlayerName }} plays!</span
          >
          <span v-else>Draw!</span>
        </h3>
      </div>
      <div class="col">
        <div class="text--right">
          <transition name="bounce">
            <button
              class="playAgain"
              v-if="winner || !hasEmptyCells"
              @click="$store.dispatch('a/newGame')"
            >
              <span>Play again</span>
            </button>
          </transition>
        </div>
      </div>
      <div class="playerScore">
        <h2>{{ $store.state.a.players.O }}: {{ $store.state.a.scoreO }}</h2>
        <h2>{{ $store.state.a.players.X }}: {{ $store.state.a.scoreX }}</h2>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'

  import Cells from './Cells'

  export default {
    name: 'Game',
    components: {
      Cells
    },

    computed: {
      ...mapState('a', {
        player: 'player',
        winner: 'winner',
        positions: 'positions'
      }),

      ...mapGetters({
        getPlayerName: 'a/getPlayerName',
        getWinnerName: 'a/getWinnerName',
        hasEmptyCells: 'a/hasEmptyCells'
      })
    },

    beforeCreate() {
      document.title = 'Game'
    }
  }
</script>

<style scoped lang="scss">
  @import '@/assets/scss/global.scss';
  .page-game {
    background-image: '../assets/Background.svg';
    width: 100%;
    color: whitesmoke;
    font-size: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: 400%;
  }
  .playerScore {
    margin-top: 30px;
  }
  .playAgain {
    font-weight: bold;
    padding: 10%;
    border-radius: 8%;
  }
</style>
