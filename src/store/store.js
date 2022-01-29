import { createStore } from 'vuex'
import { game } from './game'
import { summary } from './summary'

export const store = createStore({
    modules: {
        game,
        summary
    },
    mutations: {
        increment (state) {
            state.count++;
        }
    }
})