<template>
    <div style="display:flex; align-items: stretch;">
       <div class="home-container">
           <div class="team-header" style="background-color:#024813; color:white;">
              City Mascot
           </div>

           <div 
            class="roster-player">
             FirstName LastName
           </div>
       </div>
       
       <div class="middle-container">
           <score-section homeStyles="homeStyles" awayStyles="awayStyles" />

           <div class="court-container">
               <div class="floor">
                   <img src="/images/court.png" />
               </div>                

               <div style='color:white; font-weight:bold; font-size:16pt;'>FISERV FORUM</div>

                <court-position @click="selectPosition('homePG')" team="home" position="PG" player="homePositions.PG" styles="homeStyles" isSelected="selectedPosition == 'homePG'"  />
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
           <div class="team-header" style="background-color:#024813; color:white;">
              City Mascot
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
import ScoreSection from './ScoreSection.vue';
import CourtPosition from './CourtPosition.vue';
import { useStore, mapState } from 'vuex'
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
      return {
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

.home-player {
    background-color:#024813;
    border:2px solid white;
    color:white;
}
.away-player {
    background-color:black;
    border:2px solid white;
    color:white;
}

.player {
    position:absolute;
    padding:5px;
    width:200px;
    cursor:pointer;
}

.home-PG {
    top:250px;
    left:250px;
}

.home-SF {
    top:150px;
    left:250px;
}

.home-SG {
    top:350px;
    left:250px;
}

.home-PF {
    top:450px;
    left:250px;
}

.home-C {
    top:50px;
    left:250px;
}

.away-PG {
    top:250px;
    right:245px;
}

.away-SF {
    top:150px;
    right:245px;
}

.away-SG {
    top:350px;
    right:245px;
}

.away-PF {
    top:450px;
    right:245px;
}

.away-C {
    top:50px;
    right:245px;
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
