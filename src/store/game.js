import usePersistentStore from '@/composables/usePersistentStore'

const persistentStore = usePersistentStore()
let loadedState = persistentStore.load('game')
if(loadedState === null)
{
  // setup defaults, this is temporary as we'll have this created before we get here next time
  loadedState = {
    period: 1,
    homeScore: 0,
    awayScore: 0,
    homeFouls: 0,
    awayFouls: 0,
    possession: 'home',
    homeId: '7f974874-f1f5-41c3-84bd-53118babe3d5',
    awayId: '963ff103-ef90-4499-b113-8500cd6a7424',
    seconds: 661
  }
}

const game = {
  namespaced: true,
  state: () => (loadedState),
    mutations: {
      update (state, newState) {
        Object.assign(state, newState)
        persistentStore.save('game',newState)
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

        persistentStore.save('game', state)
      },
      newPeriod(state) {
        state.seconds = 720
        state.homeFouls = 0
        state.awayFouls = 0
        
        let period = state.period;
        period++;
        if(period > 4) period = 1;
        state.period = period;

        persistentStore.save('game', state)
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