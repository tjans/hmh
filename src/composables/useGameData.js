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
      selectedPosition: 'homePG',
      courtPositions: {
        homePG: computed(() => homeTeam.roster.find(player=>player.id == store.state.game.homePositions.PG)),
        homePF: computed(() => homeTeam.roster.find(player=>player.id == store.state.game.homePositions.PF)),
        homeSG: computed(() => homeTeam.roster.find(player=>player.id == store.state.game.homePositions.SG)),
        homeSF: computed(() => homeTeam.roster.find(player=>player.id == store.state.game.homePositions.SF)),
        homeC: computed(() => homeTeam.roster.find(player=>player.id == store.state.game.homePositions.C)),

        awayPG: computed(() => awayTeam.roster.find(player=>player.id == store.state.game.awayPositions.PG)),
        awayPF: computed(() => awayTeam.roster.find(player=>player.id == store.state.game.awayPositions.PF)),
        awaySG: computed(() => awayTeam.roster.find(player=>player.id == store.state.game.awayPositions.SG)),
        awaySF: computed(() => awayTeam.roster.find(player=>player.id == store.state.game.awayPositions.SF)),
        awayC: computed(() => awayTeam.roster.find(player=>player.id == store.state.game.awayPositions.C)),
      }      
    }
}