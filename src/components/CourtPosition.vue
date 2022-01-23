<template>
        <div class="player" :class="[courtPosition, {'selected': isSelected}]" 
            :style="{backgroundColor:team.primaryColor, color: team.textColor, border: '7px solid ' + team.primaryColor}">
            <div v-if="player">
                <div>
                    [{{position}}] {{player.firstName}} {{player.lastName}}
                </div>
                <div :class="{'foul-trouble':isFoulTrouble()}">Fouls: {{(stats.fouls ? stats.fouls : 0)}}, Points: {{points()}}</div>
            </div>
            <div v-else>
                {{position}} - No player
            </div>
        </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'

export default {
  name: 'CourtPlayer',
  props: ['team', 'player', 'position','courtPosition', 'stats'],
  setup(props) {
      const store = useStore()
    
      const isFoulTrouble = () => {
        return (props.stats.fouls > store.state.game.period)
      }     
      const points = () => {
          return props.stats.made3 * 3 + props.stats.made2 * 2 + props.stats.FTM
      }

      return {
          isFoulTrouble: computed(() => isFoulTrouble),
          isSelected: computed(()=>store.state.game.selectedPosition == props.courtPosition),
          points: computed(() => points)
      }
  }
}
</script>  

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.awayPG {
    top:15px;
    left:131px;
}

.awaySG {
    top:115px;
    left:131px;
}

.awaySF {
    top:215px;
    left:131px;
}

.awayPF {
    top:315px;
    left:131px;
}

.awayC {
    top:410px;
    left:131px;
}


.homePG {
    top:15px;
    right:125px;
}

.homeSG {
    top:115px;
    right:125px;
}

.homeSF {
    top:215px;
    right:125px;
}

.homePF {
    top:315px;
    right:125px;
}

.homeC {
    top:410px;
    right:125px;
}



.player {
    width:250px !important;
    border-radius:5px;
}

.foul-trouble {
    color:red
}

/* .player:hover {
    border-width:2px !important;
    border-style:solid !important;
} */

.selected {
    border:7px solid black !important;
    transition: border .5s ease;
}

</style>
