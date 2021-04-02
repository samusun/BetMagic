<template>
  <section class="turn">
    <Pippolo
      v-for="x in 4"
      v-bind:key="x"
      v-bind:isDisabled="index !== current"
      v-bind:index="x"
    />
  </section>
</template>

<script>
  import { mapState } from 'vuex'

  import Pippolo from './Pippolo.vue'

  export default {
    name: 'Turn',
    props: {
      index: {
        type: Number,
        required: true
      }
    },
    components: {
      Pippolo
    },
    computed: {
      ...mapState('d', {
        current: 'current'
      })
    }
  }
</script>

<style lang="scss">
  .turn {
    height: 48px;
    line-height: 48px;
    border-radius: 1%;
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    transition: opacity 0.4s ease;
    opacity: 0.1;

    &.active {
      opacity: 1;
    }
  }
</style>
