  // setup defaults, this is temporary as we'll have this created before we get here next time
  const defaultState = {
    homeTeamId: 1,
    awayTeamId: 2,
    period: 1,
    seconds: 720,
    homeScore: 0,
    awayScore: 0,
    homeFouls: 0,
    awayFouls: 0,
    selectedPosition:'homePF',
    possession: 'h',
    homePG: null,
    homeSG: null,
    homePF: 1,
    homeSF: null,
    homeC: null,
    awayPG: null,
    awaySG: null,
    awaySF: null,
    awayPF: null,
    awayC: null,
    homeStats: [],
    awayStats: [],
  }

const game = {
  namespaced: true,
  state: () => (defaultState),
    mutations: {
      stat(state, payload) {
        let statSide = null;
        let side = null

        if(state.selectedPosition.includes('home')) {
          statSide = 'homeStats';
          side = 'home'
        }
        else if(state.selectedPosition.includes('away')) {
          statSide = 'awayStats'
          side = 'away'
        }

        if(statSide && payload.id)
        {
          // find the player
          let player = state[statSide].find(p=>p.id == payload.id)

          if(!player) {
            player = {
              id: payload.id,
              fouls:0,
              made2:0,
              made3:0,
              attempt2:0,
              attempt3:0,
              FTA:0,
              FTM:0
            }

            state[statSide].push(player)
          }

          for (const property in payload) {
            if(property != "id") {
              if(property in player) {
                player[property]+=payload[property]
              }
            }
          }
        }
      },

      initHomeStats (state, newState) {
        Object.assign(state.homeStats, newState)
      },

      initAwayStats (state, newState) {
        Object.assign(state.awayStats, newState)
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
      },
    }
  };

export {game}