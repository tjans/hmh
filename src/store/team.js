import usePersistentStore from '@/composables/usePersistentStore'

const pStore = usePersistentStore()
let defaultState = pStore.load('teams')

if(!defaultState)
{
    defaultState = []
}

const team = {
  namespaced: true,
  state: () => (defaultState),
    mutations: {
      SAVE (state, payload) {
        let team = state.find(t=>t.id === payload.id)
        if(team) {
          Object.assign(team, payload)
          pStore.save('teams', state)
        }
      }
    },
    
    getters: {
      getById(state) {
        return (id) => state.find(t=>t.id === id)
      },
    }
  }

export {team}