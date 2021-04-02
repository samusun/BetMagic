<template>
  <div class="body">
    <header>
      <logo-icon class="logo-btn" :logoIcon="true" />
      <menu-btn class="menu-btn" :menuBtn="true" />
    </header>
    <h1>Games</h1>
    <gameList />
  </div>
</template>
<script>
  import MenuBtn from '@/components/MenuBtn.vue'
  import LogoIcon from '@/components/LogoIcon.vue'
  import gameList from '@/components/gameList.vue'

  export default {
    components: {
      gameList,
      MenuBtn,
      LogoIcon
    }
  }
</script>
<style lang="scss">
  h1 {
    text-align: center;
    font-size: 40px;
  }
  * {
    font-size: 1rem;
    margin: 0;
    padding: 0;
  }
  body {
    width: 100%;
    margin: 0;
    padding: 0;
  }

  #app {
    position: relative;
    padding: 20px 0;
    overflow: hidden;
  }
  .nav-link {
    text-decoration: none;
    font-size: 30px;
  }
  .menu {
    padding: 2rem;
    text-align: center;
    list-style-type: none;
  }
</style>
