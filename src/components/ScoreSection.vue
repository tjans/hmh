<template>
    <div class="score-container">
            <div class="home-team team">
                <div style="background-color:black; color: white; border:2px solid white;">
                    City Mascot
                    <span class="dot"></span>
                </div>
                <div class="team-score">0</div>
                <div>Fouls: 0</div>
            </div>

            <div class="clock-area">
                <div class='period'>1</div>
                12:00
            </div>

            <div class="away-team team">
                <div style="background-color:black; color: white; border:2px solid white;">
                    City Mascot
                    <span class="dot"></span>
                </div>
                <div class="team-score">0</div>
                <div>Fouls: 0</div>
            </div>
        </div>
</template>



<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
import useGameData from '@/composables/useGameData'

export default {
  name: 'ScoreSection',
  props: [],
  setup(props) {      
      return {
      }
  }
}
</script>








<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.score-container {
    background:black;
    height:100px;
    display:flex;
    align-items:center;
    justify-content: center;
    color:white;
}

.team {
    width:200px;
}

.clock-area {
    width:200px;
    color:white;
    font-size:20pt;
}

.team-score {
  font-size:20pt; 
}

.dot {
  height: 15px;
  width: 15px;
  background-color: orange;
  border-radius: 50%;
  display: inline-block;
}
</style>
