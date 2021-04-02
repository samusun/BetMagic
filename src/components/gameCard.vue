<template>
  <div>
    <div class="card" :class="{ open: open && active }" @click="open = !open">
      <div class="img" :style="backgroundImage" />
      <div class="title">{{ item.title }}</div>
      <div class="submit-btn">
        <router-link :to="item.routerlink">
          <input class="play-button" type="Button" value="PLAY GAME"
        /></router-link>
      </div>
      <div class="description">{{ item.description }}</div>
    </div>
  </div>
</template>

<script>
  export default {
    data: () => {
      return {
        open: false
      }
    },
    props: ['item', 'active'],
    computed: {
      backgroundImage() {
        return {
          'background-image':
            'url(' + require('../assets' + this.item.img) + ')'
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .card {
    margin-top: 40px;
    position: relative, center;
    max-width: 80vw;
    height: 400px;
    overflow: hidden;
    transition: all 0.5s ease;
    &.open {
      height: auto;
      transform: translateY(-20px);
    }
    .img {
      width: 80vw;
      height: 400px;
      background-position: center;
      background-size: cover;
    }
    .title {
      text-align: center;
      position: relative;
      bottom: 70px;
      padding: 5px;
      width: 100%;
      height: 30px;
      font-size: 1.6rem;
      color: black;
      background-color: rgba($color: #ffffff, $alpha: 0.8);
    }
    .submit-btn {
      margin-top: 20px;
      text-align: center;
      position: relative;
      bottom: 40px;
    }
    .play-button {
      background-color: transparent;
      padding: 10px;
      font-family: 'Arcade', Avenir, Helvetica, Arial, sans-serif;
      width: 100px;
      margin-left: auto;
      margin-right: auto;
      border-radius: 6px;
    }
    a {
      text-decoration: none;
    }
    .description {
      bottom: 20px;
      padding: 20px;
      position: relative;
      text-align: left;
    }
  }
  @media screen and (min-width: 900px) {
    .container {
      display: flex;
      flex-grow: 1;
    }
    .card {
      max-width: 300px;
      margin-top: 40px;
      position: relative;
      height: 300px;
      overflow: hidden;
      transition: all 0.5s ease;
      &.open {
        height: auto;
        transform: translateY(-20px);
      }
      .img {
        width: 100%;
        height: 300px;
        background-position: center;
        background-size: cover;
      }
      .title {
        text-align: center;
        position: relative;
        bottom: 50px;
        padding: 5px;
        width: 100%;
        height: 30px;
        font-size: 1.4rem;
        color: black;
        background-color: rgba($color: #ffffff, $alpha: 0.8);
      }
      .submit-btn {
        margin-top: 20px;
        text-align: center;
        position: relative;
        bottom: 40px;
      }
      .play-button {
        background-color: transparent;
        padding: 10px;
        font-family: 'Arcade', Avenir, Helvetica, Arial, sans-serif;
        width: 100px;
        margin-left: auto;
        margin-right: auto;
        border-radius: 6px;
      }
      a {
        text-decoration: none;
      }
      .description {
        bottom: 40px;
        position: relative;
        padding: 25px;
        text-align: left;
      }
    }
  }
</style>
