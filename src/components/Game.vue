<template>
    <div style="display:flex; align-items: stretch;">
       <div class="home-container">
           <div class="team-header" :style="{backgroundColor:homeTeam.primaryColor, color: homeTeam.textColor}">
              {{homeTeam.city}} {{homeTeam.mascot}}
           </div>

           <div class="roster-player" v-for="player in homeTeam.roster" :key="player.id" @click="selectPlayer(player.id)">
             {{player.position}} - {{player.firstName}} {{player.lastName}}
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
                    court-position='homePG' />

                <court-position 
                    @click="setPosition('homePF')" 
                    position="PF" 
                    :team="homeTeam" 
                    :player="courtPositions.homePF.value" 
                    court-position='homePF' />

                <court-position 
                    @click="setPosition('homeSG')" 
                    position="SG" 
                    :team="homeTeam" 
                    :player="courtPositions.homeSG.value" 
                    court-position='homeSG' />
                
                <court-position 
                    @click="setPosition('homeSF')" 
                    position="SF" 
                    :team="homeTeam" 
                    :player="courtPositions.homeSF.value" 
                    court-position='homeSF' />

                <court-position 
                    @click="setPosition('homeC')" 
                    position="C" 
                    :team="homeTeam" 
                    :player="courtPositions.homeC.value" 
                    court-position='homeC' />

                <!-- Away Players -->

                <court-position 
                    @click="setPosition('awayPG')" 
                    position="PG" 
                    :team="awayTeam" 
                    :player="courtPositions.awayPG.value" 
                    court-position='awayPG'  />
                
                <court-position 
                    @click="setPosition('awayPF')" 
                    position="PF" 
                    :team="awayTeam" 
                    :player="courtPositions.awayPF.value" 
                    court-position='awayPF' />

                <court-position 
                    @click="setPosition('awaySG')" 
                    position="SG" 
                    :team="awayTeam" 
                    :player="courtPositions.awaySG.value" 
                    court-position='awaySG' />
                
                <court-position 
                    @click="setPosition('awaySF')" 
                    position="SF" 
                    :team="awayTeam" 
                    :player="courtPositions.awaySF.value" 
                    court-position='awaySF' />
                    
                <court-position 
                    @click="setPosition('awayC')" 
                    position="C" 
                    :team="awayTeam" 
                    :player="courtPositions.awayC.value" 
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
            </div>

            <div v-if="selectedPosition">
                <button class='btn btn-light m-1' @click="twoPointMade">2PM</button>
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

    const twoPointMade = () => {
        let id = store.state.game[store.state.game.selectedPosition];

        if(id) {
            store.commit('game/stat', {
                id,
                points:2
            })
        }
    }

    const updateClock = (seconds) => {
        store.commit('game/tick', seconds)
    }

    const newPeriod = () => {
        store.commit('game/newPeriod')
    }

    return {
        // game data
        homeTeam,
        awayTeam,
        courtPositions,
        selectedPosition,

        // function
        setPosition,
        selectPlayer,
        newPeriod,
        updateClock,
        twoPointMade
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
