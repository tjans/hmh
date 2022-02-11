import { createStore } from 'vuex'
import { game } from './game'
import { summary } from './summary'
import { team } from './team'

export const store = createStore({
    modules: {
        game,
        summary,
        team
    },
    mutations: {
        increment (state) {
            state.count++;
        }
    }
})