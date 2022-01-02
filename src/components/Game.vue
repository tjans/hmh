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
                    side='home' 
                    :isSelected="selectedPosition == 'homePG'"  />

                <court-position 
                    @click="setPosition('homePF')" 
                    position="PF" 
                    :team="homeTeam" 
                    :player="courtPositions.homePF.value" 
                    side='home'  
                    :isSelected="selectedPosition == 'homePF'" />

                <court-position 
                    @click="setPosition('homeSG')" 
                    position="SG" 
                    :team="homeTeam" 
                    :player="courtPositions.homeSG.value" 
                    side='home' 
                    :isSelected="selectedPosition == 'homeSG'" />
                
                <court-position 
                    @click="setPosition('homeSF')" 
                    position="SF" 
                    :team="homeTeam" 
                    :player="courtPositions.homeSF.value" 
                    side='home' 
                    :isSelected="selectedPosition == 'homeSF'" />

                <court-position 
                    @click="setPosition('homeC')" 
                    position="C" 
                    :team="homeTeam" 
                    :player="courtPositions.homeC.value" 
                    side='home' 
                    :isSelected="selectedPosition == 'homeC'" />

                <!-- Away Players -->

                <court-position 
                    @click="setPosition('awayPG')" 
                    position="PG" 
                    :team="awayTeam" 
                    :player="courtPositions.awayPG.value" 
                    side='away' 
                    :isSelected="selectedPosition == 'awayPG'"  />
                
                <court-position 
                    @click="setPosition('awayPF')" 
                    position="PF" 
                    :team="awayTeam" 
                    :player="courtPositions.awayPF.value" 
                    side='away' 
                    :isSelected="selectedPosition == 'awayPF'" />

                <court-position 
                    @click="setPosition('awaySG')" 
                    position="SG" 
                    :team="awayTeam" 
                    :player="courtPositions.awaySG.value" 
                    side='away' 
                    :isSelected="selectedPosition == 'awaySG'" />
                
                <court-position 
                    @click="setPosition('awaySF')" 
                    position="SF" 
                    :team="awayTeam" 
                    :player="courtPositions.awaySF.value" 
                    side='away' 
                    :isSelected="selectedPosition == 'awaySF'" />
                    
                <court-position 
                    @click="setPosition('awayC')" 
                    position="C" 
                    :team="awayTeam" 
                    :player="courtPositions.awayC.value" 
                    side='away' 
                    :isSelected="selectedPosition == 'awayC'" />

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

    <div style="height:200px; background:#6CC;">
        <button class='btn btn-dark m-1' @click="flipFac">Flip</button>
        <button class='btn btn-dark m-1' @click="newPeriod">New Period</button>
        <button class='btn btn-danger m-1' @click="debugSet">Set Player</button>
        <button class='btn btn-danger m-1' @click="debugShow">Debug Show</button>
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
        alert(`Setting ${store.state.game.selectedPosition} to ${playerId}`);
    }

    const debugSet = () => {
        let newValue = (store.state.game.homePositions.PG == 1) ? 2 : 1
        let gameState = {...store.state.game}

        gameState.homePositions['PG'] = newValue

        store.commit('game/update', gameState);
    }

    const debugShow = () => {
        //console.log(courtPositions.homePG.value) // computed returns a reactive reference, need to use "value" here
        console.log(selectedPosition)
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
        debugSet,
        debugShow

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
