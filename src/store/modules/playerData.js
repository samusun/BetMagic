import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default {
  namespaced: true,
  state: {
    userScore: localStorage.getItem('localScore'),
    players: true,
    Mastermind: 0,
    signedUp: false,
    show: false,
    latestSnakeScore: '',
    snakeHighscore: '0',
    Registered: false
  },

  mutations: {
    setUser(state, payload) {
      state.players = false
      state.signedUp = true
      localStorage.setItem('Alias', payload.Alias)
      localStorage.setItem('Förnamn', payload.Förnamn)
      localStorage.setItem('Efternamn', payload.Efternamn)
      localStorage.setItem('Email', payload.Email)
      localStorage.setItem('Password', payload.Password)
      localStorage.setItem('localScore', '1000')
      localStorage.setItem('Registered', 'true')
      localStorage.setItem('snakeHighscore', '1')
    },
    newSnakeScore(state, x) {
      // Denna funktion tar reda på om den nya poängen från snake är personligt rekord för spelaren, isf sparar den det som Highscore. Annars lägger den bara in det som "latestScore" så att användaren kan se sin senaste poäng i efterhand.
      if (!localStorage.getItem('snakeHighscore')) {
        localStorage.setItem('snakeHighscore', '1')
      }
      if (x > parseInt(localStorage.getItem('snakeHighscore'))) {
        localStorage.setItem('snakeHighscore', x)
        state.snakeHighscore = x
      }
      state.latestSnakeScore = x
    }
  },
  getters: {
    hasPlayers: state => state.players,
    showMe: state => state.show,
    snakeHighscore: state => state.snakeHighscore,
    latestSnakeScore: state => state.latestSnakeScore,
    signedUp: state => state.signedUp,
    speed: state => Math.ceil(state.score / 22) || 12
  }
}
