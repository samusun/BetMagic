import Vuex from 'vuex'
import moduleA from './modules/moduleA'
import moduleB from './modules/moduleB'
import moduleC from './modules/moduleC'
import moduleD from './modules/moduleD'
import playerData from './modules/playerData'

export default new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB,
    c: moduleC,
    d: moduleD,

    playerData
  },
  state: {
    /* här startar PlayerScore data */
    playerName: 'BigSpender',
    playerScore: 100,
    currentIndex: 0,
    /* här slutar PlayerScore data */
    /* HÄR BÖRJAR GAMING CARDSEN */
    cards: [
      {
        title: 'Tic tac toe',
        description:
          'Play with your friend and see which gets three of their sign vertical or horizontal ',
        img: '/tictactoe.png',
        routerlink: 'tictac'
      },
      {
        title: 'Alien Shooter',
        description:
          'This Game makes you work on your aiming skills, try shoot as many aliens as possible on the given time. ',
        img: '/space-invadors.png',
        routerlink: 'alien-shooting'
      },
      {
        title: 'Mastermind',
        description: ' Find the right color combination with the given clues. ',
        img: '/mastermind.png',
        routerlink: 'Mastermind'
      },
      {
        title: 'Memory',
        description: 'Find all the matching pairs before your lives is out ',
        img: '/cardBack.jpg',
        routerlink: 'Memory-card'
      },
      {
        title: 'Snake Game',
        description:
          'A simple game with levels to play while you are waiting for websites to load! Move the snake around with the arrow keys, eat the red dots to grow bigger, and avoid hitting your own tail. ',
        img: '/snakegame.png',
        routerlink: 'SnakeGame'
      }
    ]
    /* HÄR SLUTAR GAMING CARDSEN */
  },
  getters: {
    /* HÄR BÖRJAR GAMING CARDSEN */
    currentIndex: state => {
      return state.currentIndex
    },
    cards: state => {
      return state.cards
    }
  },
  /* HÄR SLUTAR GAMING CARDSEN */
  mutations: {
    /* HÄR BÖRJAR GAMING CARDSEN */
    nextIndex: state => {
      if (state.currentIndex < state.cards.length - 1) state.currentIndex++
    },
    prevIndex: state => {
      if (state.currentIndex > 0) state.currentIndex--
    }
  }
  /* HÄR SLUTAR GAMING CARDSEN */
})
