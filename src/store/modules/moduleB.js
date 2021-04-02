import axios from 'axios'

export default {
  namespaced: true,
  state: {
    cardNumOne: null,
    cardNumTwo: null,
    cardsList: [],
    gameFinishStatus: false,
    gameLoadStatus: false,
    lives: 0,
    livesMax: 20,
    loosingLifeStatus: false,
    status: 'SUIT'
  },
  getters: {
    getCardNumOne(state) {
      return state.cardNumOne
    },
    getCardNumTwo(state) {
      return state.cardNumTwo
    },
    getCards(state) {
      return state.cardsList
    },
    getGameLoadStatus(state) {
      return state.gameLoadStatus
    },
    getLivesNum(state) {
      return state.lives
    },
    getStatus(state) {
      return state.status
    },
    getUnMatchedCards(state) {
      return (
        state.cardsList &&
        state.cardsList.filter(card => card.isMatched === false)
      )
    }
  },
  mutations: {
    COMPLETE_GAME(state, payload) {
      state.gameFinishStatus = payload
    },
    UPDATE_CARD_NUM_ONE(state, payload) {
      state.cardNumOne = payload
    },
    UPDATE_CARD_NUM_TWO(state, payload) {
      state.cardNumTwo = payload
    },
    UPDATE_CARDS: (state, cardsList) => {
      state.cardsList = cardsList
    },
    UPDATE_GAME_LOAD(state, payload) {
      state.gameLoadStatus = payload
    },
    UPDATE_STATUS(state, payload) {
      state.status = payload
    },
    // LIFE
    DECREASE_LIVES(state) {
      state.lives = state.lives - 1
    },
    LOOSING_LIFE(state, payload) {
      state.loosingLifeStatus = payload
    },
    SET_LIVES(state) {
      state.lives = state.livesMax
    }
  },
  actions: {
    checkCards({ commit, getters, state }) {
      const { cardsList, cardNumOne, cardNumTwo } = state
      commit('UPDATE_STATUS', 'COMPARE')
      if (cardNumOne.name === cardNumTwo.name) {
        // Update cards
        const copy = [...cardsList]
        const firstIndex = cardsList.findIndex(
          card => card.id === cardNumOne.id
        )
        const secondIndex = cardsList.findIndex(
          card => card.id === cardNumTwo.id
        )
        copy[firstIndex].isMatched = true
        copy[secondIndex].isMatched = true
        commit('UPDATE_CARDS', copy)
        commit('LOOSING_LIFE', false)
      }
      if (cardNumOne.name !== cardNumTwo.name) {
        commit('DECREASE_LIVES')
        commit('LOOSING_LIFE', true)
      }
      // Reset selected cards
      commit('UPDATE_CARD_NUM_ONE', null)
      commit('UPDATE_CARD_NUM_TWO', null)
      if (getters.getUnMatchedCards && getters.getUnMatchedCards.length === 0) {
        commit('COMPLETE_GAME', true)
        commit('UPDATE_STATUS', 'WINNER')
      } else if (getters.getLivesNum === 0) {
        commit('COMPLETE_GAME', true)
        commit('UPDATE_STATUS', 'GAMEOVER')
      } else {
        commit('UPDATE_STATUS', 'SUIT')
      } // TO SEE THE GAME FINISHES
    },
    setDeck(context) {
      //TO SHUFFLE WE NEED THE PROMISE
      return new Promise((resolve, reject) => {
        context.commit('UPDATE_GAME_LOAD', true)
        axios
          .get('data.json')
          .then(res => {
            context.commit('UPDATE_CARDS', res.data)
            resolve(res.data)
          })
          .catch(err => {
            return reject(err)
          })
      })
    },
    showCard({ commit, dispatch, state }, card) {
      if (state.cardNumOne && state.cardNumTwo) {
        return
      }
      if (!state.cardNumOne) {
        commit('UPDATE_CARD_NUM_ONE', card)
      } else if (state.cardNumOne && !state.cardNumTwo) {
        if (state.cardNumOne.id === card.id) {
          return
        }
        commit('UPDATE_CARD_NUM_TWO', card)

        setTimeout(() => {
          dispatch('checkCards')
          commit('COMPLETE_GAME', true)
        }, 800)
      }
    },
    shuffleCards({ commit, state }) {
      // WE USE THE PROMISE TO SEE THE 24 CARDS
      return new Promise((resolve, reject) => {
        if (!state.cardsList) {
          reject()
          return
        }
        const copyCards = [...state.cardsList]
        copyCards.sort(() => Math.random() - 0.5)
        commit('UPDATE_CARDS', copyCards)
        resolve(copyCards)
      })
    },
    async updateDeck({ dispatch, commit }) {
      await dispatch('setDeck')
      await dispatch('shuffleCards')
      commit('SET_LIVES')
      commit('UPDATE_STATUS', 'SUIT') //THIS COMMIT IS FOR RESTATING THE GAME
      commit('COMPLETE_GAME', false)
      setTimeout(() => {
        commit('UPDATE_GAME_LOAD', false)
      }, 1600)
    }
  }
}
