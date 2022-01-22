import { ref, computed } from 'vue'
import usePersistentStore from '@/composables/usePersistentStore'
import { useStore } from 'vuex'

// eventually this will take in a gameId
export default function useGameData()
{
    const store = useStore()
    const pStore = usePersistentStore()
    let teams = pStore.load('teams')
    
    // Teams
    const homeTeam = computed(() => {
        return teams.find(team=>team.id == store.state.game.homeId)
    });

    const awayTeam = computed(() => {
        return teams.find(team=>team.id == store.state.game.awayId)
    });

    // Home Positions
    const homePG = computed(()=>{
        return homeTeam.value.roster.find(player=>player.id == store.state.game.courtPositions.homePG)
    })
    const homeSG = computed(()=>{
        return homeTeam.value.roster.find(player=>player.id == store.state.game.courtPositions.homeSG)
    })
    const homeSF = computed(()=>{
        return homeTeam.value.roster.find(player=>player.id == store.state.game.courtPositions.homeSF)
    })
    const homePF = computed(()=>{
        return homeTeam.value.roster.find(player=>player.id == store.state.game.courtPositions.homePF)
    })
    const homeC = computed(()=>{
        return homeTeam.value.roster.find(player=>player.id == store.state.game.courtPositions.homeC)
    })

    // Away Positions
    const awayPG = computed(()=>{
        return awayTeam.value.roster.find(player=>player.id == store.state.game.courtPositions.awayPG)
    })
    const awaySF = computed(()=>{
        return awayTeam.value.roster.find(player=>player.id == store.state.game.courtPositions.awaySF)
    })
    const awaySG = computed(()=>{
        return awayTeam.value.roster.find(player=>player.id == store.state.game.courtPositions.awaySG)
    })
    const awayPF = computed(()=>{
        return awayTeam.value.roster.find(player=>player.id == store.state.game.courtPositions.awayPF)
    })
    const awayC = computed(()=>{
        return awayTeam.value.roster.find(player=>player.id == store.state.game.courtPositions.awayC)
    })

    // Selected items
    const selectedPosition = computed(()=> store.state.game.selectedPosition)

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
        homeTeam,
        awayTeam,
        selectedPosition,
        homePositions: {
            PG: homePG,
            SG: homeSG,
            PF: homePF,
            SF: homeSF,
            C: homeC
        },
        awayPositions: {
            PG: awayPG,
            SG: awaySG,
            PF: awayPF,
            SF: awaySF,
            C: awayC
        }
    }
}