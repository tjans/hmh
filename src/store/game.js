import usePersistentStore from '@/composables/usePersistentStore'
import { objectToString } from '@vue/shared';

const pStore = usePersistentStore()
let defaultState = pStore.load('game')

if(!defaultState)
{
  defaultState = {
    homeTeamId: 1,
    awayTeamId: 2,
    period: 1,
    seconds: 720,
    homeFouls: 0,
    awayFouls: 0,
    selectedPosition:'homeSF',
    possession: 'home',
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
}

const game = {
  namespaced: true,
  state: () => (defaultState),
    mutations: {
      UNDO(state, payload) {
        Object.assign(state, payload.undoState)
        pStore.save('game', state)
      },
      stat(state, payload) {        
        let statsTeam = state[state.possession + 'Stats']

        if(payload.PF)
        {
          state[state.possession + 'Fouls']++
        }

        if(payload.id)
        {
          // find the player
          let player = statsTeam.find(p=>p.id == payload.id)

          if(!player) {
            player = {
              id: payload.id,
              fouls:0,
              made2:0,
              made3:0,
              attempt:0,
              FTA:0,
              FTM:0
            }

            statsTeam.push(player)
          }

          if(payload.rightNow) player.rightNow = payload.rightNow

          for (const property in payload) {
            if(property != "id" && property != "rightNow") {
              if(property in player) {
                player[property]+=payload[property]
              }
            }
          }
        }

        pStore.save('game', state)
      },

      initHomeStats (state, newState) {
        Object.assign(state.homeStats, newState)
        pStore.save('game', state)
      },

      initAwayStats (state, newState) {
        Object.assign(state.awayStats, newState)
        pStore.save('game', state)
      },

      update (state, newState) {
        Object.assign(state, newState)
        pStore.save('game', state)
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

        pStore.save('game', state)
      },

      newPeriod(state) {
        state.seconds = 720
        state.homeFouls = 0
        state.awayFouls = 0
        
        let period = state.period;
        period++;
        if(period > 4) period = 1;
        state.period = period;

        pStore.save('game', state)
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