<template>
  <main>
    <h1>Memory Card</h1>
    <return-back @click.native="back" />
    <game-load v-if="gameLoadStatus" />
    <background-deck />
    <game-finish
      class="finish"
      v-if="status !== 'SUIT'"
      @play-again="$store.dispatch('b/updateDeck')"
      @back-home="back"
    />
    <div v-else-if="status === 'SUIT'" class="main-deck">
      <div v-for="card in cardsList" :key="card.id">
        <Card-list
          :card-name="card.name"
          :first-id="cardNumOne && cardNumOne.id"
          :id="card.id"
          :is-matched="card.isMatched"
          :pic="cardImg(card.name)"
          :second-id="cardNumTwo && cardNumTwo.id"
          @reveal-card="$store.dispatch('b/showCard', card)"
        />
      </div>
    </div>
  </main>
</template>
<script>
  import BackgroundDeck from '@/components/memory/BackgroundDeck.vue'
  import CardList from '@/components/memory/CardList.vue'
  import GameFinish from '@/components/memory/GameFinish.vue'
  import GameLoad from '@/components/memory/GameLoad.vue'
  import ReturnBack from '@/components/memory/ReturnBack.vue'
  import { mapGetters } from 'vuex'

  export default {
    name: 'MemoryCard',
    components: {
      BackgroundDeck,
      CardList,
      GameFinish,
      GameLoad,
      ReturnBack
    },
    computed: {
      ...mapGetters('b', {
        cardsList: 'getCards',
        gameLoadStatus: 'getGameLoadStatus',
        cardNumOne: 'getCardNumOne',
        cardNumTwo: 'getCardNumTwo',
        status: 'getStatus'
      })
    },
    created() {
      this.$store.dispatch('b/updateDeck')
    },
    //TO SEE THE FRONT CARD
    methods: {
      back() {
        this.$router.push('/')
      },
      cardImg(image) {
        if (image) {
          return image.replace(/\s/g, '-')
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1rem;
  }
  .main-deck {
    display: grid;
    grid-template-columns: repeat(3, 3fr);
    grid-template-rows: auto;
    grid-gap: 1px;
    justify-content: center;
    text-align: center;
    box-sizing: border-box;
    background: transparent;
  }
  .finish {
    cursor: pointer;
  }

  @media screen and (min-width: 547px) and (max-width: 626px) {
    .main-deck {
      grid-template-columns: repeat(4, 120px);
    }
  }
  @media screen and (min-width: 627px) and (max-width: 807px) {
    .main-deck {
      grid-template-columns: repeat(4, 140px);
    }
  }
  @media screen and (min-width: 808px) and (max-width: 899px) {
    .heading {
      font-size: 4rem;
    }
    .main-deck {
      grid-template-columns: repeat(4, 142px);
      padding: 3rem;
    }
  }
  @media (min-width: 900px) {
    .main-deck {
      grid-template-columns: repeat(6, 150px);
      padding: 3rem;
    }
  }
</style>
