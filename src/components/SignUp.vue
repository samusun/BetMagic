<template>
  <div>
    <div v-if="signedUp">
      <!-- OM användaren är inloggad, eller BLIR inloggad så får din instruktioner från Vuex att Profilepage ska visas ist för SignUp -->
      <ProfilePage />
    </div>
    <div v-else class="Signup">
      <header>
        <logo-icon class="logo-btn" :logoIcon="true" />
        <menu-btn class="menu-btn" :MenuBtn="true" />
      </header>
      <main>
        <form @submit.prevent class="signup-form">
          <h1 class="signup-title">Sign Up</h1>
          <div class="textgroup">
            <input
              id="alias"
              type="text"
              placeholder="Alias"
              v-model="alias"
              required
            />
          </div>
          <div class="textgroup">
            <input
              id="firstname"
              type="text"
              placeholder="First Name"
              v-model="firstname"
              required
            />
          </div>
          <div class="textgroup">
            <input
              id="lastname"
              type="text"
              placeholder="Last Name"
              v-model="lastname"
              required
            />
          </div>
          <div class="textgroup">
            <input
              id="emailid"
              type="text"
              placeholder="Email Id"
              v-model="emailid"
              required
            />
          </div>
          <div class="textgroup">
            <input
              id="password"
              autocomplete="Password"
              type="password"
              placeholder="Password"
              v-model="password"
              required
            />
          </div>
          <div>
            <input
              class="form-btn"
              @click="
                setUser({
                  Förnamn: firstname,
                  Efternamn: lastname,
                  Email: emailid,
                  Password: password,
                  Alias: alias
                }) /* Här tar setUser-funktionen emot ett objekt som den skickar vidare till playerData-modulen i Vuex */
              "
              type="button"
              value="Sign Up"
            />
            Already have an account?<router-link to="/login">
              Login here</router-link
            >
          </div>
        </form>
      </main>
    </div>
  </div>
</template>

<script>
  import MenuBtn from '@/components/MenuBtn.vue'
  import LogoIcon from '@/components/LogoIcon.vue'
  import ProfilePage from '@/views/ProfilePage.vue'
  import { mapMutations, mapGetters } from 'vuex'

  export default {
    name: 'SignUp',
    components: { MenuBtn, LogoIcon, ProfilePage },

    data: function() {
      return {
        alias: '',
        firstname: '',
        lastname: '',
        emailid: '',
        password: '',
        confirmpassword: ''
      }
    },
    methods: {
      ...mapMutations('playerData', {
        setUser: 'setUser'
      })

      /*      start(SignUp) {
        this.setUser(SignUp)
      } */
    },
    computed: {
      ...mapGetters('playerData', {
        // mapGetters är responsiva datavärden som här ligger i kontakt med playerData-modulen i Vuex
        hasPlayers: 'hasPlayers',
        signedUp: 'signedUp'
      })
    }
  }
</script>
<style scoped lang="scss">
  main {
    display: flex;
    justify-content: center;
  }

  h1 {
    font-size: 40px;
    text-align: center;
  }
  .signup-form {
    padding: 2rem;
    height: auto;
    width: 19rem;
    margin-left: 6px;
    border-radius: 6px;
  }

  .textgroup {
    overflow: hidden;
    padding: 17px 9px;
  }

  .textgroup input {
    font-family: 'Arcade', Avenir, Helvetica, Arial, sans-serif;
    background: transparent;
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
    background: none;
    padding: 9px 11px;
    font-size: 23px;
    cursor: pointer;
    margin: 0px;
    border-radius: 6px;
  }

  /** Form Settings for desktop
------------------------------------------------------------*/
  @media (min-width: 700px) {
    header {
      justify-content: space-evenly;
    }
    .signup-form {
      width: 36rem;
    }
    .signup-title {
      margin: 3rem;
    }
    .textgroup input {
      min-width: 31rem;
    }
    .form-btn {
      margin: 10px 0 10px 0;
    }
  }
</style>
