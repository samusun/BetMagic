<template>
  <div class="cardList">
    <button
      class="card-container"
      v-if="isMatched === false"
      @click="$emit('reveal-card')"
      :class="{
        first: id === firstId,
        second: id === secondId
      }"
    >
      <div class="flip-card">
        <div class="back-face">
          <img
            src="svg/backside.jpg"
            alt="back of card"
            :aria-hidden="toggleCardName"
          />
        </div>
        <div class="front-face">
          <img
            :src="`svg/${pic}.svg`"
            :alt="cardName"
            :aria-hidden="!toggleCardName"
          />
        </div>
      </div>
    </button>
  </div>
</template>
<script>
  export default {
    name: 'CardList',
    computed: {
      toggleCardName() {
        return this.id === this.firstId || this.id === this.secondId
      }
    },
    props: {
      cardName: {
        type: String,
        required: true
      },
      firstId: {
        type: String,
        default: ''
      },
      id: {
        type: String,
        required: true
      },
      isMatched: {
        type: Boolean,
        required: true
      },
      pic: {
        type: String,
        required: true
      },
      secondId: {
        type: String,
        default: ''
      }
    }
  }
</script>
<style scoped>
  .card-container {
    perspective: 1000px;
    position: relative;
    background: transparent;
    border: none;
    outline: none;
    width: 111px;
    height: 163px;
  }
  .back-face,
  .front-face {
    width: 111px;
    height: 124px;
    cursor: pointer;
  }
  .card-container.first .flip-card,
  .card-container.second .flip-card,
  .card-container.all .flip-card {
    transform: rotateY(180deg);
  }
  .flip-card {
    width: 100%;
    height: 76%;
    transition: 0.6s;
    transform-style: preserve-3d;
    position: relative;
    border-radius: 4px;
  }
  .flip-card img {
    height: 8rem;
    width: 6rem;
  }
  .front-face,
  .back-face {
    backface-visibility: hidden; /* NOT TO SHOW THE FRONT */
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
  }
  .front-face {
    z-index: 2;
    transform: rotateY(180deg);
  }
  .back-face {
    transform: rotateY(0deg);
  }
</style>
