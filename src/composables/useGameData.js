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

    const homeScore = computed(() => {
      let stats = store.state.game.homeStats;
        let score = 0;

        stats.forEach((player)=>{
          score += (player.made3 * 3 + player.made2 * 2 + player.FTM)
        })

        return score
    })

    const awayScore = computed(() => {
      let stats = store.state.game.awayStats;
        let score = 0;

        stats.forEach((player)=>{
          score += (player.made3 * 3 + player.made2 * 2 + player.FTM)
        })

        return score
    })

    return {
      homeTeam,
      homeScore,
      awayTeam,
      awayScore,
      period: computed(()=>store.state.game.period),
      homeFouls: computed(()=>store.state.game.homeFouls),
      awayFouls: computed(()=>store.state.game.awayFouls),
      possession: computed(()=>store.state.game.possession),
      clock: computed(()=>store.getters['game/clockDisplay']),
      selectedPosition: computed(()=>store.state.game.selectedPosition),
      summary: computed(()=>store.state.summary.log.slice(Math.max(store.state.summary.log.length - 3, 0)).reverse() ),
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