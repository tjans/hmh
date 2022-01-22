<template>
    <div style="display:flex; align-items: stretch;">
       <div class="home-container">
           <div class="team-header" :style="{backgroundColor:homeTeam.primaryColor, color: homeTeam.textColor}">
              {{homeTeam.city}} {{homeTeam.mascot}}
           </div>


            <table width="100%" class="table table-light table-striped table-hover table-sm">
                
                <thead class="thead-light">
                 <tr>
                     <th style="text-align:left;">Player</th>
                     <th>2P</th>
                     <th>FT</th>
                     <th>3P</th>
                     <th>PF</th>
                     <th>BLK</th>
                     <th>STL</th>
                     <th>REB</th>
                </tr>
                </thead>
             
                <tbody>
                <tr class="roster-player" v-for="player in homeStats" :key="player.id" @click="selectPlayer(player.id)">
                    <td :class="{'foul-trouble':true}" style="text-align:left;">{{player.lastName}}</td>
                    <td>{{player.made2}}</td>
                    <td>{{player.FTM}}/{{player.FTA}}</td>
                    <td>{{player.made3}}</td>
                    <td>{{player.fouls}}</td>
                    <td>{{player.BLK}}</td>
                    <td>{{player.STL}}</td>
                    <td>{{rebounds(player)}}</td>
                </tr>
                </tbody>

             </table>

       </div>
       
       <div class="middle-container">
           <score-section :home-team="homeTeam" :away-team="awayTeam" />

           <div class="court-container">
               <div class="floor">
                   <img src="/images/court.png" />
               </div>                

               <div style='color:white; font-weight:bold; font-size:16pt;'>FISERV FORUM</div>

                <court-position 
                    @click="setPosition('homePG')" 
                    position="PG" 
                    :team="homeTeam" 
                    :player="courtPositions.homePG.value" 
                    :stats="homePGStats"
                    court-position='homePG' />

                <court-position 
                    @click="setPosition('homePF')" 
                    position="PF" 
                    :team="homeTeam" 
                    :player="courtPositions.homePF.value" 
                    :stats="homePFStats"
                    court-position='homePF' />

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
                    @click="setPosition('homeC')" 
                    position="C" 
                    :team="homeTeam" 
                    :player="courtPositions.homeC.value" 
                    :stats="homeCStats"
                    court-position='homeC' />

                <!-- Away Players -->

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

           </div>
       </div>

       <div class="away-container">
           <div class="team-header" :style="{backgroundColor:awayTeam.primaryColor, color: awayTeam.textColor}">
              {{awayTeam.city}} {{awayTeam.mascot}}
           </div>

           <table width="100%" class="table table-light table-striped table-hover table-sm">
                
                <thead class="thead-light">
                 <tr>
                     <th style="text-align:left;">Player</th>
                     <th>2P</th>
                     <th>FT</th>
                     <th>3P</th>
                     <th>PF</th>
                     <th>BLK</th>
                     <th>STL</th>
                     <th>REB</th>
                </tr>
                </thead>
             
                <tbody>
                <tr v-for="player in awayStats" :key="player.id" @click="selectPlayer(player.id)">
                    <td style="text-align:left;">{{player.lastName}}</td>
                    <td>0</td>
                    <td>0/0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                </tr>
                </tbody>

             </table>
           
       </div>
    </div>

    <div style="height:200px; background:black; padding:10px">
        <div style='border:1px solid #1A202C; padding:15px;'>
            <div>
                <button class='btn btn-light m-1' @click="updateClock(-12)">Flip</button>
                <button class='btn btn-light m-1' @click="updateClock(12)">UnFlip</button>
                <button class='btn btn-light m-1' @click="newPeriod">New Period</button>
                <button class='btn btn-danger m-1' @click="debug">Debug</button>
            </div>

            <div v-if="selectedPosition">
                <button class='btn btn-light m-1' @click="score(2)">2PM</button>
                <button class='btn btn-light m-1' @click="missed(2)">2PA</button>                

                <button class='btn btn-light m-1' @click="score(3)">3PM</button>
                
                <button class='btn btn-light m-1' @click="score(1)">FTM</button>
                <button class='btn btn-light m-1' @click="missed(1)">FTA</button>

                <button class='btn btn-light m-1' @click="incrementalStat('BLK')">BLK</button>
                <button class='btn btn-light m-1' @click="incrementalStat('STL')">STL</button>
                <button class='btn btn-light m-1' @click="incrementalStat('ORB')">ORB</button>
                <button class='btn btn-light m-1' @click="incrementalStat('DRB')">DRB</button>
                
                <button class='btn btn-light m-1' @click="incrementalStat('fouls')">PF</button>
                
            </div>
        </div>
    </div>
</template>


<script>
/**************************************************
    Script section
**************************************************/
import ScoreSection from './ScoreSection.vue';
import CourtPosition from './CourtPosition.vue';
import useGameData from '@/composables/useGameData'
import { useStore, mapState } from 'vuex'
import {computed, toRefs} from 'vue'
import Debug from './Debug.vue';

export default {
  name: 'Game',
  props: {},
  components: {
    ScoreSection,
    CourtPosition,
    Debug
  },
  setup() { 
    const store = useStore()
        
    // Get all the information about the game
    const {
        homeTeam, 
        awayTeam,
        selectedPosition,
        courtPositions
    } = useGameData()

    const getDefaultPlayer = (player) => {
        return {
              id: player.id,
              firstName: player.firstName,
              lastName: player.lastName,
              position: player.position,
              fouls:0,
              made2:0,
              made3:0,
              attempt2:0,
              attempt3:0,
              FTA:0,
              FTM:0,
              BLK:0,
              STL:0,
              ORB:0,
              DRB:0
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
    const setPosition = (courtPosition) => {
        let gameState = {...store.state.game}
        gameState.selectedPosition = courtPosition
        store.commit('game/update', gameState);
    }

    const selectPlayer = (playerId) => {
        //alert(`Setting ${store.state.game.selectedPosition} to ${playerId}`);
        let gameState = {...store.state.game}
        gameState[store.state.game.selectedPosition] = playerId
        store.commit('game/update', gameState);
    }

    const playerStats = (playerId, statSide) => {
        let stats = store.state.game[statSide].find(s=>s.id==playerId)
        return stats;
    }

    // Game Actions
    const score = (points) => {
        let id = store.state.game[store.state.game.selectedPosition];

        if(id) {
            const payload = {id}
            if(points == 3)
            {
                payload.attempt3 = 1;
                payload.made3 = 1;
            }

            if(points == 2)
            {
                payload.attempt2 = 1;
                payload.made2 = 1;
            }

            if(points == 1)
            {
                payload.FTA = 1;
                payload.FTM = 1;
            }
            
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

        if(id) {
            const payload = {id}
            if(points == 3) payload.attempt3 = 1
            if(points == 2) payload.attempt2 = 1
            if(points == 1) payload.FTA = 1
            store.commit('game/stat', payload)
        }
    }

    const incrementalStat = (statName) => {
        let id = store.state.game[store.state.game.selectedPosition];

        if(id) {
            const payload = {id}
            payload[statName] = 1
            store.commit('game/stat', payload)
        }
    }

    const debug = () => {
       console.log(store.state.game.homePlayers)
    }

    const updateClock = (seconds) => {
        store.commit('game/tick', seconds)
    }

    const newPeriod = () => {
        store.commit('game/newPeriod')
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

    const isFoulTrouble = (player) => {
        return (player.fouls > store.state.game.period)
      }     

    return {
        // These two are static for the game, used for team name and colors
        homeTeam, 
        awayTeam,

        courtPositions,
        selectedPosition,
        
        
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
        selectPlayer,
        newPeriod,
        updateClock,
        playerStats,
        points,
        rebounds,
        isFoulTrouble,

        // game actions
        score,
        missed,
        incrementalStat,
        
        debug
    }
  }
}
</script>



















<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.foul-trouble {
    color:red;
}

.home-container {
    background:white;
    flex-grow:1;
}
.away-container {
    background:white;
    flex-grow:1;
}
.middle-container {
    width:940px;
}

.court-container {
    position:relative;
    align-items: center;
    justify-content: center;
    height:560px;
    background-color:#024813;
}
.floor {
    position:absolute;
    top:30px;
    left:55px;
    background-image:url(/images/court.png)
}



.player {
    position:absolute;
    padding:5px;
    width:200px;
    cursor:pointer;
}

.roster-player {
    cursor:pointer;
}
.roster-player:hover {
    background:#CECECE;
}

.team-header {
    padding:10px 0px 10px 0px;
    border-bottom:1px solid black;
    font-weight:bold;
    font-size:16pt;
}
</style>
