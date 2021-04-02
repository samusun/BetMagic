<template>
  <div>
    <collectScore v-if="showMe" />
    <canvas
      ref="board"
      id="snake-canvas"
      :width="boardSizePx"
      :height="boardSizePx"
    />
    <p class="note" v-if="this.score === 5">You got it!</p>
    <p class="note" v-if="this.score === 10">Good job!</p>
    <constants />
    <div id="hidden-items">
      <audio ref="audio">
        <source src="../../assets/SnakeGame/eat.wav" type="audio/wav" />
      </audio>
    </div>
    <button class="action-buttons">
      <button @click="handleClick('top')" id="U">▲</button>
      <button @click="handleClick('bottom')" id="D">▼</button>
      <button @click="handleClick('right')" id="R">►</button>
      <button @click="handleClick('left')" id="L">◄</button>
      <button id="play-btn" @click="isPlaying ? stop() : start()">
        {{ isPlaying ? 'Pause' : 'Play' }}
      </button>
    </button>
    <section class="scores">
      <p>Score: {{ score }}</p>
      <p>Highscore: {{ snakeHighscore }}</p>
      <h2>Latest game: {{ latestSnakeScore }}</h2>
      <div class="zoom-text">
        Zoom
        <input type="number" min="12" v-model.number="boardSize" />
      </div>
    </section>
    <h1>{{ gameover }}</h1>
  </div>
</template>
<script>
  import collectScore from '../collectScore.vue'
  import Constants from './Constants.vue'
  import Store from '../../store/modules/moduleC.js'
  import { mapGetters, mapMutations } from 'vuex'

  export default {
    components: { Constants, collectScore },
    data() {
      return {
        gameover: '',
        isPlaying: false
      }
    },
    name: 'SnakeCanvas',
    props: {
      cellSize: Number,
      boardSize: Number
    },
    computed: {
      score() {
        return Store.state.score
      },
      speed() {
        return Store.state.getters.speed
      },
      boardSizePx() {
        return this.cellSize * this.boardSize
      },
      ...mapGetters('playerData', {
        showMe: 'showMe',
        speed: 'speed',
        snakeHighscore: 'snakeHighscore',
        latestSnakeScore: 'latestSnakeScore',
        latestHigh: 'latestHigh'
      })
    },
    mounted() {
      this.boardContext = this.$refs.board.getContext('2d')
      window.addEventListener('keydown', this.onKeyPress)
    },
    created() {
      this.resetSnake()
    },
    beforeDestroy() {
      window.removeEventListener('keydown', this.onKeyPress)
    },
    watch: {
      isPlaying(value) {
        this.clear()
        if (value) {
          this.resetSnake()
          this.move()
        }
      }
    },
    methods: {
      start() {
        this.isPlaying = true
      },
      stop() {
        this.isPlaying = false
      },
      // To make the snake move in directions
      resetSnake() {
        this.gameover = ''
        this.snake = [
          {
            x: this.getMiddleCell(),
            y: this.getMiddleCell()
          }
        ]
        const randomDirectionIndex = Math.floor(Math.random() * 4)
        this.direction = Constants[randomDirectionIndex]
        this.targetCell = null
      },
      getMiddleCell() {
        return Math.round(this.boardSize / 2)
      },
      // To add and reset scores
      addScores() {
        Store.commit('increment')
      },
      resetScores() {
        Store.commit('reset')
      },
      ...mapMutations('playerData', {
        newSnakeScore: 'newSnakeScore'
      }),
      // To make the snake move
      move() {
        if (!this.isPlaying) {
          return
        }

        this.clear()
        this.setTargetCell()
        // level1
        if (Store.state.score === 5) {
          this.drawCell({ x: 1, y: 2, color: 'orange' })
        }
        // level2
        if (Store.state.score === 10) {
          this.drawCell({ x: 9, y: 7, color: 'yellow' })
        }
        // To create newhead and also direction

        const newHeadCell = {
          x: this.snake[0].x + this.direction.move.x,
          y: this.snake[0].y + this.direction.move.y
        }

        if (
          this.isCellOutOfBoard(newHeadCell) ||
          this.amountCellsInSnake(this.snake[0]) > 1
        ) {
          this.stop()
          this.gameover = 'Game over!'
          if (Store.state.score > 2) {
            // Ifall man samlat ihop mer än 2 poäng så dyker en popup upp som ger användaren poäng genom att playerData.show blir 'true'.
            this.$store.state.playerData.show = true
            this.newSnakeScore(Store.state.score) // Här skickas data från vuex-modulen moduleC(Store.state.score) till en funktion i vuex-modulen playerData.
          }
          this.resetScores()
        }
        // To make snake eat the food and make it long
        if (this.isTargetNewHead()) {
          this.snake.unshift(this.targetCell)
          // To play the sound while eating food
          this.$refs.audio.play()
          this.targetCell = null
          this.addScores()
        } else {
          this.snake.unshift(newHeadCell)
          this.snake.pop()
        }

        this.boardContext.beginPath()
        this.snake.forEach(this.drawCell)
        this.boardContext.closePath()

        setTimeout(this.move, this.getMoveDelay())
      },
      clear() {
        this.boardContext.clearRect(0, 0, this.boardSizePx, this.boardSizePx)
      },
      // to build the white blocks or snake body
      drawCell({ x, y, color }) {
        this.boardContext.rect(
          x * this.cellSize,
          y * this.cellSize,
          this.cellSize,
          this.cellSize
        )
        this.boardContext.fillStyle = color
        this.boardContext.fill()
      },
      getMoveDelay() {
        return (2 / Number(this.speed)) * 1000
      },
      isCellOutOfBoard({ x, y }) {
        return x < 0 || y < 0 || x >= this.boardSize || y >= this.boardSize
      },
      // keypress and button
      changeDirection(key, value) {
        const direction = Constants.find(c => c[key] === value)

        if (!direction) {
          return
        }

        if (Math.abs(direction.keyCode - this.direction.keyCode) !== 2) {
          this.direction = direction
        }
      },
      onKeyPress(event) {
        event.preventDefault()
        this.changeDirection('keyCode', event.keyCode)
      },
      handleClick(direction) {
        this.changeDirection('direction', direction)
        console.log('btn direction: ' + direction)
      },
      // to create the food
      setTargetCell() {
        if (!this.targetCell) {
          let targetCell = this.getRandomCell()
          while (this.amountCellsInSnake(targetCell) > 0) {
            targetCell = this.getRandomCell
          }
          this.targetCell = targetCell
        }

        this.boardContext.beginPath()
        this.boardContext.rect(
          this.targetCell.x * this.cellSize,
          this.targetCell.y * this.cellSize,
          this.cellSize,
          this.cellSize
        )
        this.boardContext.fillStyle = 'blue'
        this.boardContext.fill()
        this.boardContext.closePath()
      },
      // to make the food come randomly
      getRandomCell() {
        return {
          x: Math.floor(Math.random() * this.boardSize),
          y: Math.floor(Math.random() * this.boardSize)
        }
      },
      amountCellsInSnake(cell) {
        return this.snake.filter(({ x, y }) => x === cell.x && y === cell.y)
          .length
      },
      isTargetNewHead() {
        return (
          this.snake[0].x + this.direction.move.x === this.targetCell.x &&
          this.snake[0].y + this.direction.move.y === this.targetCell.y
        )
      }
    }
  }
</script>
<style scoped>
  #snake-canvas {
    border: 10px solid rgb(51, 76, 156);
    height: 320px;
    width: 320px;
    margin: 30px 0;
  }

  .scores {
    display: flex;
    flex-direction: column;
  }
  .zoom-text input {
    width: 38px;
    border: none;
    background: transparent;
    line-height: 20px;
    font-size: 17px;
    font-family: 'Arcade', Avenir, Helvetica, Arial, sans-serif;
  }
  #play-btn {
    color: white;
    font-size: 20px;
    cursor: pointer;
    font-family: 'Arcade', Avenir, Helvetica, Arial, sans-serif;
    display: inline-block;
    background: rgb(51, 76, 156);
    cursor: pointer;
    border-radius: 90%;
    width: 80px;
    height: 50px;
    border-radius: 20%;
    border: 2px solid rgb(21, 5, 43);
    position: relative;
    top: -16px;
  }
  #play-btn:hover {
    background-color: white;
    color: black;
  }
  .action-buttons {
    width: 180px;
    height: 180px;
    border-radius: 90%;
    border: none;
    background: transparent;
    position: relative;
    top: -25%;
  }
  h1 {
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    top: -60%;
  }
  #U {
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    border-radius: 20%;
    background: rgb(51, 76, 156);
    cursor: pointer;
    border: 2px solid rgb(21, 5, 43);
  }
  #U:hover {
    background-color: white;
    color: black;
  }
  #R {
    top: 40%;
    right: -18px;
    transform: translateY(-50%);
    width: 60px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    border-radius: 20%;
    background: rgb(51, 76, 156);
    cursor: pointer;
    border: 2px solid rgb(21, 5, 43);
  }

  #R:hover {
    background-color: white;
    color: black;
  }

  #D {
    bottom: 25px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    border-radius: 20%;
    background: rgb(51, 76, 156);
    cursor: pointer;
    border: 2px solid rgb(21, 5, 43);
  }

  #D:hover {
    background-color: white;
    color: black;
  }

  #L {
    top: 40%;
    left: -18px;
    transform: translateY(-50%);
    width: 60px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    border-radius: 20%;
    background: rgb(51, 76, 156);
    cursor: pointer;
    font-size: 30px;
    border: 2px solid rgb(21, 5, 43);
  }

  #L:hover {
    background-color: white;
    color: black;
  }

  .note {
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    top: -180px;
  }

  @media screen and (min-width: 800px) and (max-width: 999px) {
    #snake-canvas {
      height: 500px;
      width: 500px;
    }
  }
</style>
