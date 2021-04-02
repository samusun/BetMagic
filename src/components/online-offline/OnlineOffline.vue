<template>
  <div class="online-offline">
    <li class="offline" v-if="off">Offline</li>
    <li class="online" v-if="on">Online</li>
  </div>
</template>
<script>
  export default {
    name: 'OnlineOffline',

    data() {
      return {
        on: true,
        off: false
      }
    },
    mounted() {
      addEventListener('offline', () => {
        this.off = true
        this.on = false
      })
      addEventListener('online', () => {
        this.on = true
        this.off = false
      })
    }
  }
</script>
<style scoped>
  .online-offline {
    display: flex;
    align-items: center;
    justify-content: center;
    justify-items: center;
    position: fixed;
    left: 45%;
    bottom: 10px;
  }
  li {
    list-style-type: none;
  }
  .offline {
    color: tomato;
  }
</style>
