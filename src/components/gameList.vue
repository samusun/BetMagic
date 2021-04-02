<template>
  <div>
    <div class="card-list">
      <ul :style="listLength">
        <li v-for="(card, index) in cards" :key="index" :style="listPosition">
          <gameCard :item="card" :active="index == currentIndex" />
        </li>
      </ul>
    </div>

    <div class="card-list-desktop">
      <ul :style="listLength">
        <li v-for="(card, index) in cards" :key="index">
          <gameCard :item="card" active="index == currentIndex" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import gameCard from './gameCard.vue'
  export default {
    components: {
      gameCard
    },
    data: () => {
      return {
        touch: {
          startX: 0,
          endX: 0
        }
      }
    },
    computed: {
      cards() {
        return this.$store.getters.cards
      },
      currentIndex() {
        return this.$store.getters.currentIndex
      },
      listLength() {
        return { width: this.cards.length * 100 + '%' }
      },
      listPosition() {
        return { transform: 'translateX(-' + this.currentIndex * 100 + '%)' }
      }
    },
    methods: {
      touchstart(event) {
        this.touch.startX = event.touches[0].clientX
        this.touch.endX = 0
      },
      touchmove(event) {
        this.touch.endX = event.touches[0].clientX
      },
      touchend() {
        if (
          !this.touch.endX ||
          Math.abs(this.touch.endX - this.touch.startX) < 20
        )
          return

        if (this.touch.endX < this.touch.startX) this.$store.commit('nextIndex')
        else this.$store.commit('prevIndex')
      }
    },
    mounted() {
      this.$el.addEventListener('touchstart', event => this.touchstart(event))
      this.$el.addEventListener('touchmove', event => this.touchmove(event))
      this.$el.addEventListener('touchend', () => this.touchend())
    }
  }
</script>

<style lang="scss" scoped>
  @media screen and (max-width: 759px) {
    .card-list-desktop {
      display: none;
    }
    .card-list {
      height: auto;
      margin: 0 30px;
      ul {
        display: flex;
        list-style: none;
      }
      li {
        padding: 10px;
        transition: all 0.5s ease;
      }
    }
  }
  @media screen and (min-width: 760px) {
    .card-list {
      display: none;
    }

    .card-list-desktop {
      min-width: 100%;
      height: auto;
      padding: 10px;
      display: flex;
      flex-grow: 1;
      margin: 0 auto;
      ul {
        display: flex;
        list-style: none;
      }
      li {
        padding: 10px;
        transition: all 0.5s ease;
      }
    }
  }
</style>
