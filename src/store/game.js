  // setup defaults, this is temporary as we'll have this created before we get here next time
  const defaultState = {
    homeTeamId: 1,
    awayTeamId: 2,
    period: 1,
    seconds: 720,
    homeScore: 2,
    awayScore: 3,
    homeFouls: 2,
    awayFouls: 4,
    selectedPosition:null,
    possession: 'h',
    homePG: null,
    homeSG: null,
    homePF: null,
    homeSF: null,
    homeC: null,
    awayPG: null,
    awaySG: null,
    awaySF: null,
    awayPF: null,
    awayC: null,
    homeStats: [],
    awayStats: []
  }

const game = {
  namespaced: true,
  state: () => (defaultState),
    mutations: {
      stat(state, payload) {
        let side = null;
        if(['homePG','homePF','homeSG', 'homeSF', 'homeC'].includes(state.selectedPosition)) {
          side = 'homeStats';
        }
        else if(['awayPG','awayPF','awaySG', 'awaySF', 'awayC'].includes(state.selectedPosition)) {
          side = 'awayStats'
        }

        if(side && payload.id)
        {
          // find the player
          let player = state[side].find(p=>p.id == payload.id)

          if(player) {
            console.log(player)
            // player has stats already, update the ones from the payload
          }
          else {
            state[side].push(payload)
          }
        }
      },

      update (state, newState) {
        Object.assign(state, newState)
        //persistentStore.save('game',newState)
      },

      tick(state, seconds) {
        let newSeconds = state.seconds + seconds;
        if(newSeconds < 0)
        {
          state.seconds = 0
        }
        else if(newSeconds > 720)
        {
          state.seconds = 720
        }
        else
        {
          state.seconds = newSeconds;
        }

        //persistentStore.save('game', state)
      },

      newPeriod(state) {
        state.seconds = 720
        state.homeFouls = 0
        state.awayFouls = 0
        
        let period = state.period;
        period++;
        if(period > 4) period = 1;
        state.period = period;

        //persistentStore.save('game', state)
      }
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