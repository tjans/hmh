  // setup defaults, this is temporary as we'll have this created before we get here next time
  const defaultState = {
  }

const game = {
  namespaced: true,
  state: () => (defaultState),
    mutations: {}
  };

export {game}