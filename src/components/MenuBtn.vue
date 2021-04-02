<template>
  <span>
    <button class="btn-menu" @click="menu">menu</button>
  </span>
</template>
<script>
  export default {
    name: 'MenuBtn',
    props: {
      menuBtn: {
        type: Boolean
      }
    },
    methods: {
      menu() {
        return this.$router.go(-1)
      }
    }
  }
</script>

<style lang="scss">
  header {
    height: 80px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }

  .btn-menu {
    padding: 5px 10px;
    border-radius: 4px;
    font-size: 20px;
    cursor: pointer;
    margin-top: 20px;
    font-family: 'Arcade', Avenir, Helvetica, Arial, sans-serif;
  }
  .menu-link {
    color: white;
    text-decoration: none;
  }
</style>
