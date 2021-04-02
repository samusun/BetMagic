<template>
  <div
    class="lives"
    :class="{
      'lives--flashing': loosingLifeStatus,
      'lives--completed': status
    }"
  >
    <div class="lives--panel">
      <span class="status-heart">&#9825;</span>
      <input
        class="livesNum"
        readonly="readonly"
        disabled="disabled"
        v-model="lives"
        name="lives"
      />
    </div>
  </div>
</template>
<script>
  import { mapState } from 'vuex'
  export default {
    name: 'StatusLives',
    computed: {
      ...mapState('b', ['loosingLifeStatus', 'lives'])
    },
    props: {
      status: Boolean
    }
  }
</script>
<style lang="scss" scoped>
  .status-heart {
    content: '\2661';
    font-size: 1.3rem;
  }
  .lives input {
    background: transparent;
    outline: none;
    border: none;
    width: 20px;
    margin-left: 2px;
  }
  .lives {
    width: 150px;
    opacity: 1;
    z-index: 3;
    transition: opacity 0.5s ease-out;
    &--flashing {
      animation: decreaseLivesFlash 0.75s infinite;
    }
    &--panel {
      display: flex;
      justify-content: flex-end;
    }
  }
  @keyframes decreaseLivesFlash {
    0% {
      color: white;
    }
    25% {
      color: red;
    }
    100% {
      color: white;
    }
  }
</style>
