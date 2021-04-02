<template>
  <div>
    <div v-if="signedUp || signedUp2">
      <ProfilePage />
    </div>
    <div v-else class="login">
      <header>
        <logo-icon class="logo-btn" :logoIcon="true" />

        <menu-btn class="menu-btn" :menuBtn="true" />
      </header>
      <main>
        <form @submit.prevent class="login-form">
          <h1 class="login-title">Login</h1>
          <div class="textbox">
            <input
              type="email"
              class="email"
              placeholder="email"
              v-model="username"
            />
          </div>
          <div class="textbox">
            <input
              type="password"
              class="Password"
              placeholder="password"
              v-model="password"
            />
          </div>
          <div class="check-box">
            <input class="check-box" type="checkbox" name="remember" />
            <label for="remember">REMEMBER ME</label>
          </div>
          <div class="submit-btn">
            <input
              @click="loginUser()"
              class="form-btn"
              type="submit"
              value="LOG IN"
            />
          </div>
          <div class="submit-btn">
            <router-link to="/signup"
              ><input class="form-btn" type="submit" value="SIGN UP"
            /></router-link>
          </div>
          <p id="error-message" v-show="showError">
            Incorrect username or password. Please try again!
          </p>
        </form>
      </main>
    </div>
  </div>
</template>
<script>
  import MenuBtn from '@/components/MenuBtn.vue'
  import LogoIcon from '@/components/LogoIcon.vue'
  import ProfilePage from '../views/ProfilePage.vue'
  import { mapGetters } from 'vuex'

  export default {
    components: { MenuBtn, LogoIcon, ProfilePage },
    name: 'LoginPage',
    data() {
      return {
        username: '',
        password: '',
        showError: false,
        storageEmail: localStorage.getItem('Email'),
        storagePassword: localStorage.getItem('Password'),
        signedUp2: localStorage.getItem('Registered')
      }
    },
    computed: {
      ...mapGetters('playerData', {
        signedUp: 'signedUp'
      })
    },
    methods: {
      loginUser() {
        if (
          this.username === this.storageEmail &&
          this.password === this.storagePassword
        ) {
          localStorage.setItem('auth', this.username)
          localStorage.setItem('Registered', 'in')
          this.$store.state.playerData.signedUp = true
          this.showError = false
          // this.$router.replace({ path: '/profile' })
        } else {
          this.showError = true
        }
      }
    }
  }
</script>
<style scoped lang="scss">
  main {
    display: flex;
    justify-content: center;
  }
  /* 1. Variables */
  $h1: 40px;

  h1 {
    font-size: $h1;
    text-align: center;
  }
  .login-form {
    padding: 2rem;
    height: auto;
    width: 19rem;
    margin-left: 6px;
    border-radius: 6px;
  }
  .textbox,
  .submit-btn {
    overflow: hidden;
    padding: 17px 9px;
  }
  .textbox input {
    font-family: 'Arcade', Avenir, Helvetica, Arial, sans-serif;
    font-size: 15px;
    border-radius: 6px;
    max-width: 100%;
    height: 2.5em;
    outline: none;
    padding-left: 6px;
  }
  .form-btn {
    font-family: 'Arcade', Avenir, Helvetica, Arial, sans-serif;
    min-width: 100%;
    padding: 9px 11px;
    font-size: 23px;
    cursor: pointer;
    margin: 0px;
    border-radius: 6px;
  }
  .check-box {
    margin: 0 9px;
  }

  /** Form Settings for desktop
------------------------------------------------------------*/
  @media (min-width: 700px) {
    header {
      justify-content: space-evenly;
    }
    .login-form,
    .signup-form {
      width: 36rem;
    }
    .login-title,
    .signup-title {
      margin: 3rem;
    }
    .textbox input,
    .textgroup input {
      min-width: 31rem;
    }
    .form-btn {
      margin: 10px 0 10px 0;
    }
  }
</style>
