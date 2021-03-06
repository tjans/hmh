<template>
  <body class="page-container">
    <div class="side-container">
      <div class="box">
        <game-stats :team="awayTeam" :stats="awayStats" />
      </div>
    </div>

    <div class="middle-container">
      <div class="box">

        <score-board />

        <div class="court-container">
          <img src="/images/court2.jpg" />

                <court-position 
                    @click="setPosition('awayPG')" 
                    position="PG" 
                    :team="awayTeam" 
                    :player="courtPositions.awayPG.value" 
                    :stats="awayPGStats"
                    court-position='awayPG'  />
                
                <court-position 
                    @click="setPosition('awayPF')" 
                    position="PF" 
                    :team="awayTeam" 
                    :player="courtPositions.awayPF.value" 
                    :stats="awayPFStats"
                    court-position='awayPF' />

                <court-position 
                    @click="setPosition('awaySG')" 
                    position="SG" 
                    :team="awayTeam" 
                    :player="courtPositions.awaySG.value" 
                    :stats="awaySGStats"
                    court-position='awaySG' />
                
                <court-position 
                    @click="setPosition('awaySF')" 
                    position="SF" 
                    :team="awayTeam" 
                    :player="courtPositions.awaySF.value" 
                    :stats="awaySFStats"
                    court-position='awaySF' />
                    
                <court-position 
                    @click="setPosition('awayC')" 
                    position="C" 
                    :team="awayTeam" 
                    :player="courtPositions.awayC.value" 
                    :stats="awayCStats"
                    court-position='awayC' />

                <!-- Home team -->
                <court-position 
                    @click="setPosition('homePG')" 
                    position="PG" 
                    :team="homeTeam" 
                    :player="courtPositions.homePG.value" 
                    :stats="homePGStats"
                    court-position='homePG' />

                <court-position 
                    @click="setPosition('homeSG')" 
                    position="SG" 
                    :team="homeTeam" 
                    :player="courtPositions.homeSG.value" 
                    :stats="homeSGStats"
                    court-position='homeSG' />

                <court-position 
                    @click="setPosition('homeSF')" 
                    position="SF" 
                    :team="homeTeam" 
                    :player="courtPositions.homeSF.value"
                    :stats="homeSFStats" 
                    court-position='homeSF' />

                <court-position 
                    @click="setPosition('homePF')" 
                    position="PF" 
                    :team="homeTeam" 
                    :player="courtPositions.homePF.value" 
                    :stats="homePFStats"
                    court-position='homePF' />

                <court-position 
                    @click="setPosition('homeC')" 
                    position="C" 
                    :team="homeTeam" 
                    :player="courtPositions.homeC.value" 
                    :stats="homeCStats"
                    court-position='homeC' />

        </div>

        <div class="action-buttons flex-container">
          <router-link class="flex-stretch" to="/teams">Exit</router-link>
          <button class="flex-stretch" @click="undo()">UNFLIP</button>
          <button class="flex-stretch new-period" @click="newPeriod">New Period</button>
        </div>

        <div class="action-buttons flex-container">
          <button class="flex-stretch" @click="missed(2)">Miss</button>
          <button class="flex-stretch" @click="score(2)">2PM</button>
          <button class="flex-stretch" @click="score(3)">3PM</button>
          <button class="flex-stretch" @click="score(1)">FTM</button>
          <button class="flex-stretch" @click="missed(1)">FTA</button>
          <button class="flex-stretch" @click="incrementalStat('BLK')">BLK</button>
          <button class="flex-stretch" @click="incrementalStat('STL')">STL</button>
          <button class="flex-stretch" @click="incrementalStat('ORB')">ORB</button>
          <button class="flex-stretch" @click="incrementalStat('DRB')">DRB</button>
          <button class="flex-stretch" @click="incrementalStat('PF')">D. Foul</button>
          <button class="flex-stretch" @click="incrementalStat('OF')">O. Foul</button>
        </div>

        <div class="text-start">
            <div v-for="(event, index) in summary" :key="index" 
                style="border-bottom:1px solid #1A202C; padding:5px 5px 5px 15px; font-family:KlavikaWebRegCond">
                    Period {{ event.period }} - {{ event.clock }} - {{ event.text }}
            </div>
        </div>

      </div>
    </div>

    <div class="side-container">
      <div class="box">
        <game-stats :team="homeTeam" :stats="homeStats" />
      </div>
    </div>

  </body>
</template>


<script>
/**************************************************
    Script section
**************************************************/
import ScoreSection from './ScoreSection.vue';
import CourtPosition from './CourtPosition.vue';
import GameStats from './GameStats.vue';
import useGameData from '@/composables/useGameData'
import { useStore, mapState } from 'vuex'
import {computed, toRefs} from 'vue'
import Debug from './Debug.vue';
import clone from 'just-clone';
import ScoreBoard from './ScoreBoard.vue';

export default {
  name: 'Game',
  props: {},
  components: {
    ScoreSection,
    CourtPosition,
    GameStats,
    Debug,
    ScoreBoard
  },
  setup() { 
    const store = useStore()
        
    document.onkeydown = (e) => {
      console.log(e.key)
      if(e.key === 'ArrowDown') updateClock(-12)
      if(e.key === 'ArrowUp') updateClock(12)
    }
    
    // Get all the information about the game
    const {
        homeTeam, 
        awayTeam,
        selectedPosition,
        courtPositions,
        clock,
        homeFouls,
        awayFouls,
        period,
        summary,
    } = useGameData()

    const shortName = (player) =>
    {
        return `${player.firstName.substring(0,1)}. ${player.lastName}`
    }

    const reset = () => {
      store.commit('game/RESET')
    }

    const getDefaultPlayer = (player) => {
        return {
              id: player.id,
              firstName: player.firstName,
              lastName: player.lastName,
              position: player.position,
              PF:0,
              OF:0,
              made2:0,
              made3:0,
              attempt:0,
              FTA:0,
              FTM:0,
              BLK:0,
              STL:0,
              ORB:0,
              DRB:0,
              rightNow: null
            }
    }

    // Initialize the state with the roster and default stats
    if(!store.state.game.homeStats.length)
    {
        let homeRoster = []
        homeTeam.roster.forEach((item)=> {
            homeRoster.push(getDefaultPlayer(item))
        })

        store.commit('game/initHomeStats', homeRoster)
    }

    if(!store.state.game.awayStats.length)
    {
        let awayRoster = []
        awayTeam.roster.forEach((item)=> {
            awayRoster.push(getDefaultPlayer(item))
        })

        store.commit('game/initAwayStats', awayRoster)
    }

    // methods
    const undo = () => {
        let logLength = store.state.summary.log.length
        if(logLength > 0)
        {
            const latestLog = store.state.summary.log[logLength-1]
            store.commit('summary/UNDO')
            store.commit('game/UNDO', latestLog);
        }
    }

    const setPosition = (courtPosition) => {
        let gameState = {...store.state.game}
        gameState.possession = courtPosition.includes('away') ? 'away' : 'home'
        gameState.selectedPosition = courtPosition
        store.commit('game/update', gameState);
    }

    const playerStats = (playerId, statSide) => {
        let stats = store.state.game[statSide].find(s=>s.id==playerId)
        return stats;
    }

    // Game Actions
    const score = (points) => {
        let id = store.state.game[store.state.game.selectedPosition];
        let player = getPlayer(id)
        
        if(player) {
            let text
            const undoState = clone(store.state.game)
                        
            const payload = {id}
            if(points == 3)
            {
                payload.attempt = 1;
                payload.made3 = 1;
                payload.rightNow = "made";
                text = `${shortName(player)} makes a THREE!`
                //updateClock(-12)
            }

            if(points == 2)
            {
                payload.attempt = 1;
                payload.made2 = 1;
                payload.rightNow = "made";
                text = `${shortName(player)} scores a 2pt basket`

                //updateClock(-12)
            }

            if(points == 1)
            {
                payload.FTA = 1;
                payload.FTM = 1;
                text = `${shortName(player)} makes a free throw`
            }

            store.commit('summary/ADD_LOG', {
                clock: store.getters['game/clockDisplay'],
                period: store.state.game.period,
                undoState,
                text
            })
            
            store.commit('game/stat', payload)
        }
    }

    const points = (player) => {
        return player.made2 * 2 + player.made3 * 3 + player.FTM
    }

    const rebounds = (player) => {
        return player.ORB + player.DRB
    }

    const missed = (points) => {
        let id = store.state.game[store.state.game.selectedPosition];
        let player = getPlayer(id)
        const undoState = clone(store.state.game)

        if(id) {
            let text
            const payload = {id}
            if(points > 1){
                payload.attempt = 1
                payload.rightNow = "miss"
                text = `${shortName(player)} misses a basket`   
                //updateClock(-12)
            }
            if(points == 1) {
                payload.FTA = 1
                text = `${shortName(player)} misses a free throw`   
            }
            store.commit('game/stat', payload)

            store.commit('summary/ADD_LOG', {
                clock: store.getters['game/clockDisplay'],
                period: store.state.game.period,
                undoState,
                text
            })
        }
    }

    const getPlayer = (id) => {
        let team = store.state.game[store.state.game.possession + 'Stats']
        let player = team.find(p=>p.id == id)
        return player
    }

    const incrementalStat = (statName) => {
        let id = store.state.game[store.state.game.selectedPosition];
        let player = getPlayer(id)
        const undoState = clone(store.state.game)

        if(id) {
            let text = `${statName} by ${shortName(player)}`
            const payload = {id}
            payload[statName] = 1
            store.commit('game/stat', payload)

            store.commit('summary/ADD_LOG', {
                clock: store.getters['game/clockDisplay'],
                period: store.state.game.period,
                undoState,
                text
            })
        }
    }

    const debug = () => {
       console.log(store.state.game.homePlayers)
    }

    const updateClock = (seconds) => {
        store.commit('game/tick', seconds)
    }

    const newPeriod = () => {
        if(confirm('Are you sure?  This will reset the clock and all team fouls!'))
        {
          store.commit('game/newPeriod')
        }
    }

    const getStats = (position) => {
        let statSide = null;
        if(position.includes('home')){
            statSide = 'homeStats'
        } else if(position.includes('away')) {
            statSide = 'awayStats'
        }

        let stats = store.state.game[statSide].find(s=>s.id==store.state.game[position])

        if(!stats) return {made3:0, made2:0, FTM:0, fouls:0}
        return stats
    }

    return {
        // These two are static for the game, used for team name and colors
        homeTeam, 
        awayTeam,
        clock,
        period,

        courtPositions,
        selectedPosition,
        homeFouls,
        awayFouls,
        summary,
        
        // computed
        homeStats: computed(() => store.state.game.homeStats),
        awayStats: computed(() => store.state.game.awayStats),

        homePFStats: computed(() => getStats('homePF')),
        homePGStats: computed(() => getStats('homePG')),
        homeSGStats: computed(() => getStats('homeSG')),
        homeSFStats: computed(() => getStats('homeSF')),
        homeCStats: computed(() => getStats('homeC')),

        awayPFStats: computed(() => getStats('awayPF')),
        awayPGStats: computed(() => getStats('awayPG')),
        awaySGStats: computed(() => getStats('awaySG')),
        awaySFStats: computed(() => getStats('awaySF')),
        awayCStats: computed(() => getStats('awayC')),
        
        // function
        setPosition,
        newPeriod,
        updateClock,
        playerStats,
        points,
        rebounds,
        shortName,
        reset,

        // game actions
        score,
        missed,
        incrementalStat,
        undo,
        
        debug
    }
  }
}
</script>




<style scoped>
body,
html {
  margin: 0px;
  background: black;
  color: white;
  padding: 0px;
  margin: 0px;
  font-size: 14pt;
  font-family: KlavikaWebBoldCond;
}

@font-face {
  font-family:KlavikaWebRegCondensed;
  src: url(/fonts/KlavikaWebRegCondensed.ttf);
}

.page-container {
  display: flex;
  min-height: 100vh;
  margin: 0px;
}

.side-container {
  flex-grow: 1;
  padding-left: 10px;
  padding-right: 10px;
}

.middle-container {
  width: 830px;
}

.box {
  border: 1px solid #1a202c;
  height: 99vh;
}

.action-buttons button, .action-buttons a {
  text-decoration:none;
  display:block;
  background: black;
  color: #838383;
  border: 1px solid #1a202c;
  padding: 10px;
  width: 100px;
  transition: 0.3s;
  text-transform: uppercase;
}

.action-buttons button:hover, .action-buttons a:hover {
  color: white;
}

.action-buttons button.new-period {
  background-color:#671D1D; 
}
.action-buttons button.new-period:hover {
  background-color:#C53030; color:white;
}

.court-container {
  height: 500px;
  position: relative;
}

.player {
    position:absolute;
    padding:5px;
    width:200px;
    cursor:pointer;
}



</style>