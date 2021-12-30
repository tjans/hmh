<template>
    <div class="score-container">
            <div class="home-team team">
                <div :style="{backgroundColor:homeStyles.bodyBG, color: homeStyles.bodyFG, border:'2px solid ' + homeStyles.border}">
                    {{homeTeam.city}} {{homeTeam.mascot}}
                    <span v-if="possession==='home'" class="dot"></span>
                </div>
                <div class="team-score">{{homeScore}}</div>
                <div>Fouls: {{homeFouls}}</div>
            </div>

            <div class="clock-area">
                <div class='period'>{{period}}</div>
                {{clock}}
            </div>

            <div class="away-team team">
                <div :style="{backgroundColor:awayStyles.bodyBG, color: awayStyles.bodyFG, border:'2px solid ' + awayStyles.border}">
                    <span v-if="possession==='away'" class="dot"></span>
                    {{awayTeam.city}} {{awayTeam.mascot}}
                </div>
                <div class="team-score">{{awayScore}}</div>
                <div>Fouls: {{awayFouls}}</div>
            </div>
        </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
import useGameData from '@/composables/useGameData'

export default {
  name: 'ScoreSection',
  props: ['homeStyles', 'awayStyles'],
  setup(props) {      
      const store = useStore() 
      const {homeTeam, awayTeam} = useGameData()
      
      return {
          period: computed(() => store.state.game.period),
          homeScore: computed(() => store.state.game.homeScore),
          awayScore: computed(() => store.state.game.awayScore),
          homeFouls: computed(() => store.state.game.homeFouls),
          awayFouls: computed(() => store.state.game.awayFouls),
          possession: computed(() => store.state.game.possession),
          clock: computed(() => store.getters['game/clockDisplay']),
          homeTeam, awayTeam
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
