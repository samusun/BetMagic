<template>
  <div id="tic-tac-vue">
    <transition name="fade" mode="out-in" :duration="120">
      <div class="page-wrapper" v-if="hasPlayers">
        <transition name="fade" mode="out-in" :duration="120">
          <Game />
        </transition>
      </div>
      <Players v-else />
    </transition>
  </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  import Game from './Game'
  import Players from './Players'

  export default {
    name: 'TicTacVue',
    components: {
      Players,
      Game
    },

    computed: {
      ...mapState({
        gameHistory: 'a/gameHistory'
      }),
      ...mapGetters({
        hasPlayers: 'a/hasPlayers'
      })
    }
  }
</script>

<style scoped></style>
