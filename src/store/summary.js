import usePersistentStore from '@/composables/usePersistentStore'

const pStore = usePersistentStore()
let defaultState = pStore.load('summary')

if(!defaultState)
{
    defaultState = {
        log: []
    }
}

const summary = {
  namespaced: true,
  state: () => (defaultState),
    mutations: {
      ADD_LOG(state, payload) {
        state.log.push(payload)
        pStore.save('summary', state)
      },
      UNDO(state) {
          state.log.pop()
          pStore.save('summary', state)
      },
    }
  };

export {summary}