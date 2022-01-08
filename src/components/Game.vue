<template>
    <div style="display:flex; align-items: stretch;">
       <div class="home-container">
           <div class="team-header" :style="{backgroundColor:homeTeam.primaryColor, color: homeTeam.textColor}">
              {{homeTeam.city}} {{homeTeam.mascot}}
           </div>

           <div class="roster-player" v-for="player in homeTeam.roster" :key="player.id" @click="selectPlayer(player.id)">
             {{player.position}} - {{player.firstName}} {{player.lastName}}
           </div>

           <h1>Stats</h1>
            <div>
                
            </div>
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

           <div class="roster-player" v-for="player in awayTeam.roster" :key="player.id" @click="selectPlayer(player.id)">
             {{player.position}} - {{player.firstName}} {{player.lastName}}
           </div>
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
                
                <button class='btn btn-light m-1' @click="personalFoul">PF</button>
                
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

    const personalFoul = () => {
        let id = store.state.game[store.state.game.selectedPosition];

        if(id) {
            store.commit('game/stat', {
                id,
                fouls:1
            })
        }
    }

    const debug = () => {
        let stats = store.state.game.homeStats;
        let score = 0;

        stats.forEach((player)=>{
          score += player.points
        })

        return score
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

    return {
        // game data
        homeTeam,
        awayTeam,
        courtPositions,
        selectedPosition,
        
        // computed
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

        // game actions
        score,
        missed,
        personalFoul,
        

        debug
    }
  }
}
</script>



















<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home-container {
    background:black;
    flex-grow:1;
}
.away-container {
    background:black;
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
    padding:5px 0px 5px 0px;
    border-bottom:1px solid black;
    background:white;
    font-weight:bold;
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
