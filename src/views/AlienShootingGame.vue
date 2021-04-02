<template>
  <div id="Alien-shooting">
    <header>
      <logo-icon class="logo-btn" :logoIcon="true" />
      <Return class="menu-btn" :return="true" />
    </header>
    <h1>Alien Shooting Game</h1>

    <AlienShooting />
  </div>
</template>

<script>
  import AlienShooting from '@/components/AlienShooting/AlienShooting.vue'
  import Return from '@/components/return.vue'
  import LogoIcon from '@/components/LogoIcon.vue'

  export default {
    components: {
      AlienShooting,
      Return,
      LogoIcon
    }
  }
</script>
<style scoped lang="scss">
  #Alien-shooting {
    text-align: center;
  }
</style>
