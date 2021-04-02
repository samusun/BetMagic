<template>
  <div class="return--back">
    <div class="return">
      <button class="btn-return-back">
        back
      </button>
    </div>
    <status-lives :status="true" />
  </div>
</template>
<script>
  import { mapGetters, mapState } from 'vuex'
  import StatusLives from './StatusLives.vue'
  export default {
    components: { StatusLives },
    name: 'ReturnBack',
    computed: {
      ...mapState('b', ['lives']),
      ...mapGetters('b', ['getLivesStatus'])
    }
  }
</script>

<style scoped>
  .return--back {
    z-index: 3;
    display: flex;
    align-items: baseline;
    flex-direction: row;
  }
  .btn-return-back {
    padding: 5px 10px;
    border-radius: 3px;
    font-size: 20px;
    cursor: pointer;
    margin-top: 0.9em;
    font-family: 'Arcade', Avenir, Helvetica, Arial, sans-serif;
  }
  .btn-return-back:hover {
    background: white;
    color: black;
  }
</style>
