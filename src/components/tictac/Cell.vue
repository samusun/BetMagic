<template>
  <div
    :class="['cell', isDisabled ? 'cell--disabled' : '']"
    @click="toggleCell(index)"
  >
    <transition name="bounce">
      <span v-if="position" :class="['cell--toggle', activeToggleClass]">{{
        position
      }}</span>
    </transition>
    <audio id="enter" ref="enter" volume="1" preload="auto">
      <source src="../../assets/TicTac/enter.wav" type="audio/wav" />
      <!-- Här importerar jag en ljudfil som nu finns på varje cell i tictac. -->
    </audio>
  </div>
</template>

<script>
  import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'

  export default {
    name: 'Cell',
    props: {
      index: {
        type: Number,
        required: true
      },
      position: {
        type: String,
        required: false,
        default: ''
      },
      replay: {
        type: Boolean,
        required: true
      }
    },

    computed: {
      ...mapState({
        winner: 'a/winner'
      }),

      ...mapGetters({
        getMarker: 'a/getMarker'
      }),

      isDisabled() {
        return this.position || this.winner || this.replay
      },

      getPosition() {
        return this.position || this.getMarker(this.index)
      },

      activeToggleClass() {
        if (this.getPosition === 'X') {
          return 'cell--toggle-one'
        } else if (this.getPosition === 'O') {
          return 'cell--toggle-two'
        }

        return null
      }
    },

    methods: {
      ...mapActions({
        addMarker: 'a/addMarker'
      }),

      ...mapMutations({
        checkWinning: 'a/checkWinning'
      }),

      toggleCell(index) {
        if (!this.isDisabled) {
          this.$refs.enter.play() // Här aktiveras ljudet då en spelare klickar på just den rutan
          this.$refs.enter.currentTime = 0

          this.addMarker({ index })
          this.checkWinning({
            player: this.getMarker(this.index)
          })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .cell {
    flex-grow: 3;
    display: flex;
    width: 32%;
    height: 33%;
    cursor: pointer;
    user-select: none;
    box-sizing: border-box;
    border: 1px solid;
    background-color: 'gray';

    &--toggle {
      width: 100%;
      height: 100%;
      outline: none;
      display: block;
      font-size: 50px;
      user-select: none;
      display: flex;
      justify-content: center;
      align-items: center;

      &-one {
        color: 'blue';
      }

      &-two {
        color: 'red';
      }
    }

    &--disabled {
      cursor: not-allowed !important;
    }
  }
</style>
