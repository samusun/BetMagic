<template>
  <div id="ThemeSwitch">
    <label class="switch">
      <input type="checkbox" class="switch-input" v-model="darkMode" />
      <span class="switch-label" data-on="Dark" data-off="Light" />
    </label>
  </div>
</template>

<script>
  export default {
    name: 'ThemeSwitch',

    data() {
      return {
        darkMode: false
      }
    },
    mounted() {
      // set 'app-background' class to body tag
      let bodyElement = document.body
      bodyElement.classList.add('app-background')

      // check for active theme
      let htmlElement = document.documentElement
      let theme = localStorage.getItem('theme')

      if (theme === 'dark') {
        htmlElement.setAttribute('theme', 'dark')
        this.darkMode = true
      } else {
        htmlElement.setAttribute('theme', 'light')
        this.darkMode = false
      }
    },
    watch: {
      darkMode: function() {
        // add/remove class to/from html tag
        let htmlElement = document.documentElement

        if (this.darkMode) {
          localStorage.setItem('theme', 'dark')
          htmlElement.setAttribute('theme', 'dark')
        } else {
          localStorage.setItem('theme', 'light')
          htmlElement.setAttribute('theme', 'light')
        }
      }
    }
  }
</script>

<style lang="scss">
  #ThemeSwitch {
    margin-left: 10px;
    position: fixed;
    bottom: 10px;
    z-index: 1000;
  }
</style>
