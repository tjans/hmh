<template>
        <div class="player" :class="[courtPosition, {'selected': isSelected}]" 
            :style="{backgroundColor:team.primaryColor, color: team.textColor, border: '7px solid ' + team.primaryColor}">
            <div v-if="player">
                <div>
                    {{player.firstName.substring(0,1)}}. {{player.lastName}}
                </div>
                <div :class="{'foul-trouble':isFoulTrouble()}">
                    Fouls: {{(stats.PF ? stats.PF : 0)}}, Points: {{points()}}<span v-if="rightNow()">, Last: {{rightNow()}}</span>
                </div>
            </div>
            <div v-else>
                No player
                <div>&nbsp;</div>
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
      const rightNow = () =>  {
        return props.stats.rightNow
      }

      const points = () => {
          return props.stats.made3 * 3 + props.stats.made2 * 2 + props.stats.FTM
      }

      return {
          isFoulTrouble: computed(() => isFoulTrouble),
          isSelected: computed(()=>store.state.game.selectedPosition == props.courtPosition),
          points: computed(() => points),
          rightNow: computed(() => rightNow)
      }
  }
}
</script>  

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.awayPG {
    top:50px;
    left:110px;
}

.awaySG {
    top:132px;
    left:110px;
}

.awaySF {
    top:213px;
    left:110px;
}

.awayPF {
    top:296px;
    left:110px;
}

.awayC {
    top:378px;
    left:110px;
}


.homePG {
    top:50px;
    right:115px;
}

.homeSG {
    top:132px;
    right:115px;
}

.homeSF {
    top:213px;
    right:115px;
}

.homePF {
    top:296px;
    right:115px;
}

.homeC {
    top:378px;
    right:115px;
}



.player {
    width:250px !important;
    border-radius:5px;
    padding:0px !important;
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
