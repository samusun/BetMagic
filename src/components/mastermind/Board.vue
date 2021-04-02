<template>
  <section id="board">
    <section id="secret">
      Secret combination
    </section>
    <Turn
      v-for="turn in total"
      v-bind:class="{ active: isActive(total - turn) }"
      v-bind:key="total - turn + 1"
      v-bind:index="total - turn + 1"
    />
  </section>
</template>

<script>
  import { mapGetters, mapState } from 'vuex'

  import Turn from './Turn.vue'

  export default {
    name: 'Board',
    components: {
      Turn
    },
    computed: {
      ...mapGetters('d', {
        isActive: 'isActive'
      }),
      ...mapState('d', {
        total: 'total'
      })
    }
  }
</script>

<style lang="scss">
  #secret {
    height: 48px;
    line-height: 48px;
    border-radius: 3%;
    background-color: rgb(76, 238, 89);
    box-shadow: inset 0 0 4px 0 rgba(black, 0.2);
    display: flex;
    justify-content: center;
  }

  #board {
    width: 230px;
    background-color: rgb(246, 246, 246);
    border-radius: 1%;
    display: flex;
    flex-direction: column;
    padding: 3%;
  }
  section {
    display: block;
  }
</style>
