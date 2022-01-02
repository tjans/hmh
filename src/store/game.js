  // setup defaults, this is temporary as we'll have this created before we get here next time
  const defaultState = {
    homeTeamId: 1,
    awayTeamId: 2,
    period: 1,
    seconds: 719,
    homeScore: 2,
    awayScore: 3,
    homeFouls: 2,
    awayFouls: 4,
    possession: 'h',
    homePositions: {
      PG: null,
      PF: null,
      SG: null,
      SF: null,
      C: null
    },
    awayPositions: {
      PG: null,
      PF: null,
      SG: null,
      SF: null,
      C: null
    }
  }

const game = {
  namespaced: true,
  state: () => (defaultState),
    mutations: {
      update (state, newState) {
        Object.assign(state, newState)
        //persistentStore.save('game',newState)
      },
    },
    getters: {
      clockDisplay(state) {
        let minutes = Math.floor(state.seconds/60);
        let secondsRemain = state.seconds - (minutes * 60)
        return minutes + ":" + secondsRemain.toString().padStart('2', '0');
      }
    }
  };

export {game}