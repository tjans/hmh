<template>
        <div class="player" :class="[side + '-' + position, {'selected': isSelected}]" :style="{backgroundColor:team.primaryColor, color: team.textColor, borderColor:team.accentColor}">
            <div v-if="player">
                <div>
                    [{{position}}] {{player.firstName}} {{player.lastName}}
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
  props: ['team','player', 'position', 'side', 'isSelected'],
  setup() {}
}
</script>  

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.home-PG {
    top:250px;
    left:200px;
}

.home-SF {
    top:150px;
    left:200px;
}

.home-SG {
    top:350px;
    left:200px;
}

.home-PF {
    top:450px;
    left:200px;
}

.home-C {
    top:50px;
    left:200px;
}

.away-PG {
    top:250px;
    right:195px;
}

.away-SF {
    top:150px;
    right:195px;
}

.away-SG {
    top:350px;
    right:195px;
}

.away-PF {
    top:450px;
    right:195px;
}

.away-C {
    top:50px;
    right:195px;
}
.player {
    width:250px !important;
}


/* .player:hover {
    border-width:2px !important;
    border-style:solid !important;
} */

.selected {
    border:7px solid;
}

</style>
