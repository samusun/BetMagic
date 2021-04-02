<template>
  <div>
    <header>
      <logo-icon class="logo-btn" :logoIcon="true" />
      <Return class="menu-btn" :return="true" />
    </header>
    <h1>TicTacToe</h1>
    <TicTacVue />
  </div>
</template>

<script>
  import TicTacVue from '@/components/tictac/TicTacVue.vue'
  import Return from '@/components/return.vue'
  import LogoIcon from '@/components/LogoIcon.vue'

  export default {
    name: 'Tictac',
    components: {
      TicTacVue,
      Return,
      LogoIcon
    }
  }
</script>
