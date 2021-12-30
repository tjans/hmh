import usePersistentStore from '@/composables/usePersistentStore'

const persistentStore = usePersistentStore()
let loadedState = persistentStore.load('game')
if(loadedState === null)
{
  loadedState = {
    period: 1,
    homeScore: 0,
    awayScore: 0,
    homeFouls: 0,
    awayFouls: 0,
    possession: 'home'
  }
}

const game = {
  namespaced: true,
  state: () => (loadedState),
    mutations: {
      update (state, newState) {
        Object.assign(state, newState)
        persistentStore.save('game',newState)
      }
    }
  };

export {game}