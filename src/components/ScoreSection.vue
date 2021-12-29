<template>
    <div class="score-container">
            <div class="home-team team">
                <div :style="{backgroundColor:homeStyles.bodyBG, color: homeStyles.bodyFG, border:'2px solid ' + homeStyles.border}">
                    Team 1
                    <span class="dot"></span>
                </div>
                <div class="team-score">100</div>
                <div>Fouls: 2</div>
            </div>

            <div class="clock-area">
                <div class='period'>4</div>
                11:31
            </div>

            <div class="away-team team">
                <div :style="{backgroundColor:awayStyles.bodyBG, color: awayStyles.bodyFG, border:'2px solid ' + awayStyles.border}">
                    <span class="dot"></span>
                    Team 2
                </div>
                <div class="team-score">98</div>
                <div>Fouls: 4</div>
            </div>
        </div>
</template>

<script>
export default {
  name: 'ScoreSection',
  props: ['homeStyles', 'awayStyles'],
  setup(props) {}
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
