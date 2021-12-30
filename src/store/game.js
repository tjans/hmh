const game = {
  namespaced: true,
  state: () => ({
      period: 1,
      homeScore: 0,
      awayScore: 0,
      homeFouls: 0,
      awayFouls: 0,
      possession: 'home'
    }),
    mutations: {
      update (state, newState) {
        Object.assign(state, newState)
      }
    }
  };

export {game}