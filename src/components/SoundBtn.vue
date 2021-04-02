<template>
  <div id="sound">
    <label class="switch">
      <input type="checkbox" class="switch-input" v-model="SoundOn" />
      <span class="switch-label" data-on="On" data-off="Off" />
    </label>
  </div>
</template>

<script>
  export default {
    name: 'Sound',

    data() {
      return {
        SoundOn: false
      }
    }
  }
</script>

<style lang="scss">
  #sound {
    margin-left: 90px;
    position: fixed;
    bottom: 10px;
  }
</style>
