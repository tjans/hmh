<template>
        <div class="player" :class="[team + '-' + position]" :style="{backgroundColor:styles.bodyBG, color:styles.bodyFG, border:'0px solid ' + styles.border}">
            <div v-if="player">
                <div :style="{background:styles.headerBG, color:styles.headerFG, fontWeight:'bold'}">
                    {{position}} - {{ player.LastName }}
                </div>
                <div>Fouls: 2, Points: 5</div>
            </div>
            <div v-else>
                {{position}} - No player
            </div>
        </div>
</template>

<script>
import { toRefs } from 'vue'

export default {
  name: 'CourtPlayer',
  props: ['player', 'position', 'team', 'styles'],
  setup(props) {
    const {player} = toRefs(props);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

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
</style>
