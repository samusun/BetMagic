<template>
  <div class="game-finish" v-if="status">
    <div class="player-choices">
      <span class="fail" v-if="status === 'GAMEOVER'">
        GAME OVER!
      </span>

      <span class="win" v-else-if="status === 'WINNER'">
        winner!
      </span>
      <div class="finish-btns">
        <button class="play-again" @click="$emit('play-again')">
          play Again
        </button>
        <button class="back-home" @click="$emit('back-home')">Home</button>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'GameFinish',
    computed: {
      ...mapGetters('b', {
        status: 'getStatus'
      })
    }
  }
</script>
<style scoped>
  .player-choices,
  .game-finish {
    display: flex;
    text-align: center;
    flex-direction: column;
    margin-top: 2rem;
  }
  .game-finish {
    background: transparent;
    width: 100vw;
    height: 60vh;
    z-index: 3;
    animation: messageComingIn 5s ease-out;
  }
  .finish-btns {
    padding: 2rem;
  }
  .play-again,
  .back-home {
    cursor: pointer;
    background: transparent;
    margin: 15px;
    border-radius: 4px;
    font-family: 'Arcade', Avenir, Helvetica, Arial, sans-serif;
  }
  .play-again:hover,
  .back-home:hover {
    background: #fff;
    color: #000;
  }

  .play-again {
    padding: 0.9rem 2.2rem;
    font-size: 1.4rem;
  }
  .back-home {
    padding: 0.7rem 3.9rem;
    font-size: 1.7rem;
  }
  .win,
  .fail {
    font-size: 5rem;
  }
  .fail {
    color: red;
    margin-left: 30px;
  }
  .win {
    color: hsl(118, 95%, 32%);
    margin-left: 25px;
  }
  @keyframes messageComingIn {
    0% {
      transform: translateY(200px);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
  @media (min-width: 900px) {
    .player-choices,
    .game-finish {
      margin-top: 3rem;
    }
    .win,
    .fail {
      font-size: 8rem;
    }
  }
</style>
