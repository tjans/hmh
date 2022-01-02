import { ref, computed, watchEffect } from 'vue'
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

    return {
      homeTeam,
      awayTeam,
      selectedPosition: computed(()=>store.state.game.selectedPosition),
      courtPositions: {
        homePG: computed(() => homeTeam.roster.find(player=>player.id == store.state.game.homePG)),
        homePF: computed(() => homeTeam.roster.find(player=>player.id == store.state.game.homePF)),
        homeSG: computed(() => homeTeam.roster.find(player=>player.id == store.state.game.homeSG)),
        homeSF: computed(() => homeTeam.roster.find(player=>player.id == store.state.game.homeSF)),
        homeC: computed(() => homeTeam.roster.find(player=>player.id == store.state.game.homeC)),

        awayPG: computed(() => awayTeam.roster.find(player=>player.id == store.state.game.awayPG)),
        awayPF: computed(() => awayTeam.roster.find(player=>player.id == store.state.game.awayPF)),
        awaySG: computed(() => awayTeam.roster.find(player=>player.id == store.state.game.awaySG)),
        awaySF: computed(() => awayTeam.roster.find(player=>player.id == store.state.game.awaySF)),
        awayC: computed(() => awayTeam.roster.find(player=>player.id == store.state.game.awayC)),
      }      
    }
}