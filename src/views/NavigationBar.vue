<template>
  <div class="background-nav">
    <logo-icon class="logo-btn" :logoIcon="true" />
    <nav>
      <ul class="menu-items">
        <li class="nav-item" v-if="loggedIn">
          <router-link class="nav-link" to="/login">PROFILE</router-link>
        </li>

        <li class="nav-item" v-else>
          <router-link class="nav-link" to="/login">LOGIN</router-link>
        </li>

        <li class="nav-item">
          <router-link class="nav-link" to="/our-games">OUR GAMES</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/faq">FAQ</router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script>
  import LogoIcon from '@/components/LogoIcon.vue'

  export default {
    name: 'NavigationBar',
    components: {
      LogoIcon
    },
    data() {
      return {
        loggedIn: localStorage.getItem('Registered')
      }
    }
  }
</script>

<style scoped lang="scss">
  .background-nav {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
  }
  .logo-btn {
    margin-left: auto;
    margin-right: auto;
  }
  .menu-items {
    text-align: center;
    list-style-type: none;
    padding: 4rem;
  }
  .nav-link {
    text-decoration: none;
    font-size: 25px;
  }
  .nav-item {
    padding: 1.3rem;
  }

  @media (min-width: 700px) {
    .nav-link {
      padding: 3rem;
      font-size: 30px;
    }
    .nav-item {
      padding: 2rem;
    }
  }
</style>
