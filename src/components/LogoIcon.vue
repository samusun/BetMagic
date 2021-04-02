<template>
  <router-link to="/">
    <img
      v-if="logoIcon"
      class="logo-img"
      src="../assets/logo-dark.svg"
      alt="bet-magic-logo"
    />
  </router-link>
</template>

<script>
  export default {
    name: 'LogoIcon',
    props: {
      logoIcon: {
        type: Boolean
      }
    }
  }
</script>

<style lang="scss">
  a {
    background: transparent;
    border: none;
    cursor: pointer;
  }

  .logo-img {
    width: 109px;
    margin-top: 0px;
  }
</style>
