import { ref, computed } from 'vue'
import usePersistentStore from '@/composables/usePersistentStore'
import { useStore } from 'vuex'

// eventually this will take in a gameId
export default function useGameData()
{
    const store = useStore()
    const pStore = usePersistentStore()
    let teams = pStore.load('teams')

    const homeTeam = teams.find(team=>team.id == store.state.game.homeTeamId)
    const awayTeam = teams.find(team=>team.id == store.state.game.awayTeamId)

    // const homePositions = {
    //     PG: computed(()=>{
    //         return homeTeam.roster.find(player=>player.id == store.state.game.homePG)
    //     })
    // }

    return {
      homeTeam,
      awayTeam,
      homePG: computed(() => homeTeam.roster.find(player=>player.id == store.state.game.homePositions.PG))
      
    }
}