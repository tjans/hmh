<template>
     <div class="score-header">
          <div :style="{backgroundColor:awayTeam.primaryColor, color: awayTeam.textColor}" class="team-header-sm">{{ awayTeam.city }} </div>
          <div class="play-header"></div>
          <div :style="{backgroundColor:homeTeam.primaryColor, color: homeTeam.textColor}" class="team-header-sm">{{ homeTeam.city }}</div>
        </div>

        <div style="display: flex">
          <div class="score-column" style="text-align: left;">
            <img src="/images/TOR.PNG" style="width: 75px; height: auto;" />
            <span class="score">{{awayScore}}</span>
          </div>
          
          <div class="clock-container">
              <div style='font-size:35pt;'>{{ clock }}</div>
              <div style="font-size:20pt;">{{ period }} </div>
          </div>

          <div class="score-column" style="text-align: right">
            
            <span class="score">{{homeScore}}</span>
            <img src="/images/MIL.PNG" style="width: 75px; height: auto" />
          </div>
        </div>

        <div style="display: flex">
          <div class="score-column" :class="{'bonus':isAwayBonus}" style="text-align: left; padding-left:10px;">
            Fouls: {{awayFouls}}
          </div>
          
          <div class="clock-container">
              &nbsp;
          </div>

          <div class="score-column" :class="{'bonus':isHomeBonus}" style="text-align: right; padding-right:10px;">
            Fouls: {{ homeFouls }}
          </div>
        </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
import useGameData from '@/composables/useGameData'

export default {
  name: 'GameStats',
  setup(props) {  
    const store = useStore()    
    
    const {
        homeTeam, 
        awayTeam,
        clock,
        homeFouls,
        awayFouls,
        period,
        homeScore,
        awayScore,
    } = useGameData()

    return {  
        homeTeam,
        awayTeam,
        clock,
        period,
        homeFouls,
        awayFouls,
        homeScore,
        awayScore,

        isHomeBonus: computed(()=>{
            return homeFouls.value >= 5
        }),
        isAwayBonus: computed(()=>{
            return awayFouls.value >= 5
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.clock {
    font-size:26pt;
}
.score-header {
  display: flex;
}

.team-header {
  padding: 10px;
  text-transform: uppercase;
  font-size: 16pt;
  font-family:KlavikaWebBoldCond;
}

.team-header-sm {
  flex-grow: 1;
  text-transform: uppercase;
  font-weight: 600;
  font-family:KlavikaWebBoldCond;
}

.play-header {
  width: 500px;
  font-size:20pt;
  text-transform: uppercase;
}

.score-column {
 flex-grow: 1;
 width:300px;
}


.score {
  font-weight: 900;
  font-family: KlavikaWebBoldCond;
  font-size: 50pt;
}

.bonus {
    color:red;
}
</style>
