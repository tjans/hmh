import { createStore } from 'vuex'
import { game } from './game'

export const store = createStore({
    modules: {
        game
    },
    mutations: {
        increment (state) {
            state.count++;
        }
    }
})