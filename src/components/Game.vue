<template>
    <div style="display:flex; align-items: stretch;">
       <div class="home-container">
           <div class="team-header" :style="{backgroundColor:homeTeam.primaryColor, color: homeTeam.textColor}">
              {{homeTeam.city}} {{homeTeam.mascot}}
           </div>

           <div 
            class="roster-player">
             FirstName LastName
           </div>
       </div>
       
       <div class="middle-container">
           <score-section :home-team="homeTeam" :away-team="awayTeam" />

           <div class="court-container">
               <div class="floor">
                   <img src="/images/court.png" />
               </div>                

               <div style='color:white; font-weight:bold; font-size:16pt;'>FISERV FORUM</div>

                <court-position @click="selectPosition('homePG')" position="PG" :team="homeTeam" :player="homePG"  />
                <!-- <court-position @click="selectPosition('homeSF')" team="home" position="SF" :player="homePositions.homeSF" :styles="homeStyles"  :isSelected="selectedPosition == 'homeSF'"  />
                <court-position @click="selectPosition('homeC')" team="home" position="C" :player="homePositions.homeC" :styles="homeStyles"  :isSelected="selectedPosition == 'homeC'"  />
                <court-position @click="selectPosition('homePF')" team="home" position="PF" :player="homePositions.homePF" :styles="homeStyles"  :isSelected="selectedPosition == 'homePF'"  />
                <court-position @click="selectPosition('homeSG')" team="home" position="SG" :player="homePositions.homeSG" :styles="homeStyles"  :isSelected="selectedPosition == 'homeSG'"  /> -->

                <!-- Away Players -->

                <!-- <court-position @click="selectPosition('awayPG')" team="away" position="PG" :player="awayPositions.awayPG" :styles="awayStyles" :isSelected="selectedPosition == 'awayPG'"  />
                <court-position @click="selectPosition('awaySF')" team="away" position="SF" :player="awayPositions.awaySF" :styles="awayStyles"  :isSelected="selectedPosition == 'awaySF'"  />
                <court-position @click="selectPosition('awayC')" team="away" position="C" :player="awayPositions.awayC" :styles="awayStyles"  :isSelected="selectedPosition == 'awayC'"  />
                <court-position @click="selectPosition('awayPF')" team="away" position="PF" :player="awayPositions.awayPF" :styles="awayStyles"  :isSelected="selectedPosition == 'awayPF'"  />
                <court-position @click="selectPosition('awaySG')" team="away" position="SG" :player="awayPositions.awaySG" :styles="awayStyles"  :isSelected="selectedPosition == 'awaySG'"  /> -->
                
           </div>
       </div>

       <div class="away-container">
           <div class="team-header" :style="{backgroundColor:awayTeam.primaryColor, color: awayTeam.textColor}">
              {{awayTeam.city}} {{awayTeam.mascot}}
           </div>

           <div 
            class="roster-player">
             FirstName LastName
           </div>
       </div>
    </div>

    <div style="height:200px; background:#6CC;">
        <button class='btn btn-dark m-1' @click="flipFac">Flip</button>
        <button class='btn btn-dark m-1' @click="newPeriod">New Period</button>
        <button class='btn btn-danger m-1' @click="debug">Debug</button>
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
import {computed} from 'vue'
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
        homePG
    } = useGameData()

    // methods
    const debug = () => {
        console.log('setting homePG to ' + store.state.game.homePG)
        store.commit('game/setHomePG', 1);
    }

    //console.log('PG has player : ', homePositions.PG.value, homePositions.PG.value != null)

    return {
        // game data
        homeTeam,
        awayTeam,
        homePG,
        // function
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
