  // setup defaults, this is temporary as we'll have this created before we get here next time
  const defaultState = {
    log: []
  }

const summary = {
  namespaced: true,
  state: () => (defaultState),
    mutations: {
      ADD_LOG(state, payload) {
        state.log.push(payload)
      },
      UNDO(state) {
          state.log.pop()
      }
    }
  };

export {summary}