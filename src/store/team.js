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
    }
  };

export {team}