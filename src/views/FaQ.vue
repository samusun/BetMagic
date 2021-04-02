<template>
  <div class="body">
    <header>
      <logo-icon class="logo-btn" :logoIcon="true" />
      <menu-btn class="menu-btn" :menuBtn="true" />
    </header>
    <h1>FAQ</h1>
    <!-- FIRST QUESTION -->
    <div id="items">
      <div class="item">
        <div v-on:click="toggle('item1')">
          How many games does bet-magic have?
          <span class="toggleIcon" id="toggleIcon">{{ toggleIcon }}</span>
        </div>
        <div class="title1" v-show="hideItem['item1']">
          <slot
            >We have 5 games on our app.
            <ul>
              <li>
                Tic Tac Toe is an interesting game played between two players.
              </li>
              <li>
                Alien Shooter is an fun game with shooting the alien with
                sounds.
              </li>
              <li>
                Mastermind game makes you think logically and fun playing with
                colors.
              </li>
              <li>
                Memory game sharpens your memory and lives make it more
                interesting to play.
              </li>
              <li>
                Snake game makes it interesting to play with sounds and levels.
              </li>
            </ul>
          </slot>
        </div>
      </div>
      <!-- SECOND QUESTION -->
      <div class="item">
        <div v-on:click="toggle('item2')">
          How do I edit my password?
          <span class="toggleIcon" id="toggleIcon">{{ toggleIcon }}</span>
        </div>
        <div class="title1" v-show="hideItem['item2']">
          <slot
            >You can use the edit option in the profile page which is right next
            to profile and password button.</slot
          >
        </div>
      </div>
      <!-- THIRD QUESTION -->
      <div class="item">
        <div v-on:click="toggle('item3')">
          Can I adjust the sound?
          <span class="toggleIcon" id="toggleIcon">{{ toggleIcon }}</span>
        </div>
        <div class="title1" v-show="hideItem['item3']">
          <slot>You can always use the sound option on profile page.</slot>
        </div>
      </div>
      <!-- FOURTH QUESTION -->
      <div class="item">
        <div v-on:click="toggle('item4')">
          Do you have lives on your app?
          <span class="toggleIcon" id="toggleIcon">{{ toggleIcon }}</span>
        </div>
        <div class="title1" v-show="hideItem['item4']">
          <slot
            >Yes, we have lives option in our memory game to make the player
            enjoy our game.</slot
          >
        </div>
      </div>
      <!-- FIFTH QUESTION -->
      <div class="item">
        <div v-on:click="toggle('item5')">
          How can a first-time user use the app?
          <span class="toggleIcon" id="toggleIcon">{{ toggleIcon }}</span>
        </div>
        <div class="title1" v-show="hideItem['item5']">
          <slot
            >You can signup on our signup page as a first-time user and can come
            back and use our login option to login and check your profile and
            play on our bet-magic.</slot
          >
        </div>
      </div>
      <!-- SIXTH QUESTION -->
      <div class="item">
        <div v-on:click="toggle('item6')">
          Can I share my game score with my friends?
          <span class="toggleIcon" id="toggleIcon">{{ toggleIcon }}</span>
        </div>
        <div class="title1" v-show="hideItem['item6']">
          <slot
            >Yes, absolutely. You can use the share option which is on the
            profile page when you login.</slot
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import MenuBtn from '@/components/MenuBtn.vue'
  import LogoIcon from '@/components/LogoIcon.vue'

  export default {
    components: {
      MenuBtn,
      LogoIcon
    },
    data() {
      return {
        toggleIcon: '+',
        hideItem: {
          item1: false,
          item2: false,
          item3: false,
          item4: false,
          item5: false,
          item6: false
        }
      }
    },
    methods: {
      toggle: function(item) {
        this.hideItem[item] = !this.hideItem[item]
      }
    }
  }
</script>
<style scoped lang="scss">
  h1 {
    margin-bottom: 30px;
  }
  .item {
    padding: 1rem;
    text-align: left;
    max-width: 450px;
    margin: 0 auto;
  }

  // .item6{
  //   display: flex;
  //   justify-content: center;
  //   background: red;

  // }
</style>
