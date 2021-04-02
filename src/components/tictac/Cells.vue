<template>
  <div style="background-color: blue; font-size: 46px" class="cells">
    <Cell
      v-for="(position, i) in positions"
      :key="i"
      :index="i"
      :position="position"
      :replay="replay"
    />
  </div>
</template>

<script>
  import Cell from './Cell'

  export default {
    name: 'Cells',
    components: {
      Cell
    },

    props: {
      positions: {
        type: Array,
        required: true
      },
      replay: {
        type: Boolean,
        required: false,
        default: false
      }
    }
  }
</script>

<style scoped>
  .cells {
    width: 90%;
    height: 45vh;
    display: flex;
    flex-wrap: wrap;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 10px;
    text-align: center;
    border: 1px solid lightslategray;
  }

  @media screen and (min-width: 600px) {
    .cells {
      height: 400px;
      width: 400px;
    }
  }
</style>
