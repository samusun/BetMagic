<template>
  <div class="feedback">
    <i
      class="led"
      v-for="x in 4"
      v-bind:key="x"
      v-bind:class="fbClass(x - 1)"
    />
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'Feedback',
    props: {
      fb: {
        type: String
      }
    },
    computed: {
      ...mapState('d', {
        current: 'current',
        currentTurn: 'currentTurn',
        feedback: 'feedback'
      }),
      fbClass() {
        return x => {
          if (this.fb === undefined) return null
          const fb = this.fb.trim()[x]
          return fb === undefined ? null : `fb-${fb}`
        }
      }
    }
  }
</script>

<style lang="scss">
  .feedback {
    height: 48px;
    width: 40px;
    margin-left: 20px;
    margin-top: 10px;
    display: grid;
    grid-template: 1fr 1fr / 1fr 1fr;
    transition: opacity 0.4s ease;
    opacity: 0.1;

    &.active {
      opacity: 1;
    }
  }

  .led {
    height: 10px;
    width: 10px;
    background-color: seashell;
    border-radius: 8px;
    display: block;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: all 0.4s;

    &.fb-1 {
      height: 10px;
      width: 10px;
      background-color: black;
      box-shadow: 0 0 2px 2px rgba(black, 0.4);
    }
    &.fb-0 {
      height: 10px;
      width: 10px;
      background-color: #ff4057;
      box-shadow: 0 0 2px 2px rgba(#ff4057, 0.4);
    }
  }
</style>
