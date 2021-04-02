<template>
  <div>
    <div id="alien-game">
      <br />
      <collectScore v-if="showMe" />
      <canvas id="myCanvas" v-show="!ended" ref="canvas" @click="shoot" />
      <canvas id="myCanvas" v-show="ended" ref="endCanvas" />

      <div id="health" v-show="!ended">
        <div v-bind:style="{ width: health + '%' }" />
      </div>

      <div class="text-center">
        <h4 class="score">Points : {{ points }}</h4>
      </div>

      <div id="controls">
        <button @click="start" v-show="!ended" class="btn-primary">
          Play
        </button>
        <button @click="restart" class="btn-default">Restart</button>
      </div>

      <div id="hidden-items">
        <img src="../../assets/AlienShooting/alien-purple.png" ref="image" />
        <audio id="audio" ref="audio" volume="1" preload="auto">
          <source src="../../assets/AlienShooting/shoot.wav" type="audio/wav" />
        </audio>
      </div>
    </div>
  </div>
</template>

<script>
  import collectScore from '../collectScore.vue'
  import { mapGetters } from 'vuex'
  import _ from 'lodash'
  export default {
    name: 'AlienShooting',
    components: {
      collectScore
    },
    data() {
      return {
        canvas: '',
        ctx: '',
        img: '',
        imgX: '',
        imgY: '',
        x: '',
        y: '',
        points: 0,
        health: 100,
        started: false,
        ended: false,
        collectScores: false
      }
    },
    methods: {
      start() {
        this.started = true
      },
      shoot(event) {
        if (this.health > 0 && this.started == true) {
          this.$refs.audio.play() // Play Shooting Sound
          this.$refs.audio.currentTime = 0

          // Get the absolute X and Y position of mouse pointer related to our canvas
          let rect = this.canvas.getBoundingClientRect() // abs. size of element
          let scaleX = this.canvas.width / rect.width // relationship bitmap vs. element for X
          let scaleY = this.canvas.height / rect.height // relationship bitmap vs. element for Y
          ;(this.x = (event.clientX - rect.left) * scaleX), // scale mouse coordinates after they have
            (this.y = (event.clientY - rect.top) * scaleY) // been adjusted to be relative to element

          // Check Whether Click is inside Alien Image
          if (
            _.inRange(this.x, this.imgX, this.imgX + 50) &&
            _.inRange(this.y, this.imgY, this.imgY + 50)
          ) {
            this.points += 1 // Increment Point to 1

            // Draw a rectangular gun shooting image on top of Alien Image
            this.canvas = this.$refs.canvas
            this.ctx = this.canvas.getContext('2d')

            this.ctx.fillStyle = 'red'
            this.ctx.fillRect(this.x, this.y, 5, 5)
          }
        } else {
          if (this.points > 5) {
            this.$store.state.playerData.show = true
            if (this.health <= 0) {
              alert('Game Finished Please Restart')
            }
          } else {
            alert('Game Not Yet Started !')
          }
        }
      },
      regenerate() {
        if (this.health > 0 && this.started == true) {
          this.canvas = this.$refs.canvas
          this.ctx = this.canvas.getContext('2d')

          // Clear Old ALien Image
          this.ctx.clearRect(
            this.imgX,
            this.imgY,
            this.imgX + 100,
            this.imgY + 100
          )

          // Get a random X and Y axis relative to our canvas height and width

          this.imgX = _.random(0, this.canvas.width - 50, false)

          this.imgY = _.random(0, this.canvas.height - 50, false)

          this.img = this.$refs.image // Get Image Element

          this.ctx.drawImage(this.img, this.imgX, this.imgY) // Draw Image in Canvas

          this.health -= 2
        } else if (this.health <= 0) {
          this.ended = true
          // Draw Game over in Secound Canvas
          this.canvas = this.$refs.endCanvas
          this.ctx = this.canvas.getContext('2d')
          this.ctx.font = '20px Arcade, Avenir, Helvetica, Arial, sans-serif'
          this.ctx.fillStyle = 'white'
          this.ctx.textAlign = 'center'
          this.ctx.fillText(
            'Game Over!',
            this.canvas.width / 2,
            this.canvas.height / 2
          )
        }
      },
      restart() {
        this.started = false
        this.ended = false
        this.health = 100
        this.points = 0
        this.ctx.clearRect(
          this.imgX,
          this.imgY,
          this.imgX + 100,
          this.imgY + 100
        )
      }
    },

    computed: {
      ...mapGetters('playerData', {
        showMe: 'showMe'
      })
    },
    mounted() {
      let self = this
      setInterval(function() {
        self.regenerate()
      }, 1000)
    }
  }
</script>
<style scoped lang="scss">
  h4 {
    font-family: 'Arcade', Avenir, Helvetica, Arial, sans-serif;
    font-weight: bolder;
  }
  #myCanvas {
    width: 100%;
    height: 250px;
    background-color: black;
    margin: 0 auto;
    border: 2px solid #e6e6e6;
  }
  #health {
    width: 300px;
    border: 2px solid #e6e6e6;
    margin: 20px auto 20px auto;
  }
  #health div {
    height: 20px;
    background: linear-gradient(
      to bottom,
      rgb(128, 30, 153) 33%,
      rgb(140, 48, 168) 46%,
      rgba(193, 119, 227, 0.7) 96%,
      rgba(189, 125, 232, 0) 100%
    );
  }
  #controls {
    width: 100%;
    margin: 20px auto;
    text-align: center;
  }
  #hidden-items {
    display: none;
  }
  .btn-primary {
    padding: 5px 10px;
    margin-right: 10px;
    border-radius: 4px;
    font-size: 20px;
    cursor: pointer;
    margin-top: 0.9em;
    font-family: 'Arcade', Avenir, Helvetica, Arial, sans-serif;
  }
  .btn-default {
    padding: 5px 10px;
    border-radius: 4px;
    font-size: 20px;
    cursor: pointer;
    margin-top: 0.9em;
    font-family: 'Arcade', Avenir, Helvetica, Arial, sans-serif;
  }
  @media screen and (min-width: 760px) {
    #myCanvas {
      width: 70%;
      height: 70%;
    }
    #health {
      width: 70%;
      border: 2px solid #e6e6e6;
      margin: 20px auto 20px auto;
    }
  }
</style>
