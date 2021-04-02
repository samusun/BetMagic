<template>
  <section class="dialog">
    <div class="message">
      <p v-text="status === 'happy' ? 'You won :)' : 'You lost :('" />
      <div class="secretRevealed" v-bind:class="status">
        <Pippolo
          v-for="i in 4"
          v-bind:key="i"
          v-bind:isDisabled="true"
          v-bind:color="secret[i - 1]"
        />
      </div>
      <button
        class="cta"
        @click="startNewGame"
        v-text="status === 'happy' ? 'New Game' : 'Try Again'"
      />
    </div>
  </section>
</template>

<script>
  import { mapState, mapActions } from 'vuex'

  import Pippolo from './Pippolo.vue'

  export default {
    name: 'Dialog',
    components: {
      Pippolo
    },
    props: {
      status: {
        type: String,
        required: true
      }
    },
    computed: {
      ...mapState('d', {
        secret: 'secret'
      })
    },
    methods: {
      ...mapActions('d', {
        startNewGame: 'startNewGame'
      })
    }
  }
</script>

<style scoped>
  .dialog {
    size: 100%;
    background-color: rgba(purple, 0.94);
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
  }

  .message {
    box-shadow: 0 0 6px 0 rgba(black, 0.2);
    background-color: white;
    padding: 40px;
    border-radius: 1%;
    font-size: 32px;
    text-align: center;
  }

  .secretRevealed {
    margin-top: 40px;
  }

  .cta {
    background-color: seashell;
    border-radius: 1px;
    font-size: 14px;
    font-weight: bold;
    letter-spacing: 1px;
    padding: 10px 10px;
    margin-top: 40px;
    text-transform: uppercase;
  }
</style>
