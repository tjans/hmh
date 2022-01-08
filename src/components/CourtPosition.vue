<template>
        <div class="player" :class="[courtPosition, {'selected': isSelected}]" :style="{backgroundColor:team.primaryColor, color: team.textColor, borderColor:team.accentColor}">
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

.homePG {
    top:250px;
    left:200px;
}

.homeSF {
    top:150px;
    left:200px;
}

.homeSG {
    top:350px;
    left:200px;
}

.homePF {
    top:450px;
    left:200px;
}

.homeC {
    top:50px;
    left:200px;
}

.awayPG {
    top:250px;
    right:195px;
}

.awaySF {
    top:150px;
    right:195px;
}

.awaySG {
    top:350px;
    right:195px;
}

.awayPF {
    top:450px;
    right:195px;
}

.awayC {
    top:50px;
    right:195px;
}
.player {
    width:250px !important;
}

.foul-trouble {
    color:red
}

/* .player:hover {
    border-width:2px !important;
    border-style:solid !important;
} */

.selected {
    border:7px solid;
}

</style>
