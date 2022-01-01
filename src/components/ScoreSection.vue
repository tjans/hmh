<template>
    <div class="score-container">
            <div class="home-team team">
                <div :style="{backgroundColor:homeTeam.primaryColor, color: homeTeam.textColor, border:'2px solid ' + homeTeam.accentColor}">
                    {{homeTeam.city}} {{homeTeam.mascot}}
                    <span v-if="possession == 'h'" class="dot"></span>
                </div>
                <div class="team-score">{{homeScore}}</div>
                <div>Fouls: {{homeFouls}}</div>
            </div>

            <div class="clock-area">
                <div class='period'>{{period}}</div>
                11:57
            </div>

            <div class="away-team team">
                <div :style="{backgroundColor:awayTeam.primaryColor, color: awayTeam.textColor, border:'2px solid ' + awayTeam.accentColor}">
                    {{awayTeam.city}} {{awayTeam.mascot}}
                    <span v-if="possession == 'v'" class="dot"></span>
                </div>
                <div class="team-score">{{awayScore}}</div>
                <div>Fouls: {{awayFouls}}</div>
            </div>
        </div>
</template>



<script>
import { useStore, mapState } from 'vuex'
import { computed } from 'vue'
import useGameData from '@/composables/useGameData'

export default {
  name: 'ScoreSection',
  props: ['homeTeam','awayTeam'],
  setup() {  
    const store = useStore()

    return {
      period: computed(()=>store.state.game.period),
      homeScore: computed(()=>store.state.game.homeScore),
      homeFouls: computed(()=>store.state.game.homeFouls),
      awayScore: computed(()=>store.state.game.awayScore),
      awayFouls: computed(()=>store.state.game.awayFouls),
      possession: computed(()=>store.state.game.possession),
      clock: computed(()=>store.getters['game/clockDisplay'])
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
