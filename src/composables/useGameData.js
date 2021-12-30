import { ref, computed } from 'vue'
import usePersistentStore from '@/composables/usePersistentStore'
import { useStore } from 'vuex'

// eventually this will take in a gameId
export default function useGameData()
{
    const store = useStore()
    const pStore = usePersistentStore()
    let teams = pStore.load('teams')

    const homePlayers = ref([]);
    const awayPlayers = ref([]);

    const gameData = ref({
        homeTeamId: 1, // get these from the game info in the DB
        awayTeamId: 2,
        
        homePGId: null,
        homeSGId: null,
        homeSFId: null,
        homePFId: null,
        homeCId: null,

        awayPGId: null,
        awaySFId: null,
        awayPFId: null,
        awaySGId: null,
        awayCId: null,

        homePlayers,
        awayPlayers

    })

      homePlayers.value = []
      awayPlayers.value = []

      // Teams
      const homeTeam = computed(() => {
        return teams.find(team=>team.id == store.state.game.homeId)
      });

      const awayTeam = computed(() => {
        return teams.find(team=>team.id == store.state.game.awayId)
      });

      // Home Positions
      const homePG = computed(()=>{
          return gameData.value.homePlayers.find(player=>player.Id == gameData.value.homePGId)
      })
      const homeSG = computed(()=>{
          return gameData.value.homePlayers.find(player=>player.Id == gameData.value.homeSGId)
      })
      const homeSF = computed(()=>{
          return gameData.value.homePlayers.find(player=>player.Id == gameData.value.homeSFId)
      })
      const homePF = computed(()=>{
          return gameData.value.homePlayers.find(player=>player.Id == gameData.value.homePFId)
      })
      const homeC = computed(()=>{
          return gameData.value.homePlayers.find(player=>player.Id == gameData.value.homeCId)
      })

      // Away Positions
      const awayPG = computed(()=>{
          return gameData.value.awayPlayers.find(player=>player.Id == gameData.value.awayPGId)
      })
      const awaySF = computed(()=>{
          return gameData.value.awayPlayers.find(player=>player.Id == gameData.value.awaySFId)
      })
      const awaySG = computed(()=>{
          return gameData.value.awayPlayers.find(player=>player.Id == gameData.value.awaySGId)
      })
      const awayPF = computed(()=>{
          return gameData.value.awayPlayers.find(player=>player.Id == gameData.value.awayPFId)
      })
      const awayC = computed(()=>{
          return gameData.value.awayPlayers.find(player=>player.Id == gameData.value.awayCId)
      })
    
    const homeStyles = {
        headerFG: 'black',
        headerBG: 'white',
        bodyFG: 'white',
        bodyBG: '#024813',
        border: 'white'
    }

    const awayStyles = {
        headerFG: 'black',
        headerBG: 'white',
        bodyFG: 'white',
        bodyBG: 'black',
        border: 'red'
    }

    return {
        homeStyles,
        awayStyles,
        gameData,
        homeTeam,
        awayTeam
    }
}