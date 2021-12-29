<template>
    <div style="display:flex; align-items: stretch;">
       <div class="home-container">
           <div v-for="player in homePlayers" :key="player.Id">
             {{ player.FirstName }}  {{ player.LastName }}
           </div>
       </div>
       
       <div class="middle-container">
           <score-section :homeStyles="homeStyles" :awayStyles="awayStyles" />

           <div class="court-container">
               <div class="floor">
                   <img src="/images/court.png" />
               </div>                

               <div style='color:white; font-weight:bold; font-size:16pt;'>FISERV FORUM</div>

                <court-player team="home" position="PG" :player="homePG" :styles="homeStyles"  />
                <court-player team="home" position="SF" :player="homeSF" :styles="homeStyles"  />
                <court-player team="home" position="C" :player="homeC" :styles="homeStyles"  />
                <court-player team="home" position="PF" :player="homePF" :styles="homeStyles"  />
                <court-player team="home" position="SG" :player="homeSG" :styles="homeStyles"  />

                <!-- Away Players -->

                <court-player team="away" position="PG" :player="awayPG" :styles="awayStyles"  />
                <court-player team="away" position="SF" :player="awaySF" :styles="awayStyles"  />
                <court-player team="away" position="PF" :player="awayPF" :styles="awayStyles"  />
                <court-player team="away" position="C" :player="awayC" :styles="awayStyles"  />
                <court-player team="away" position="SG" :player="awaySG" :styles="awayStyles"  />
                
           </div>
       </div>

       <div class="away-container">
           <div v-for="player in awayPlayers" :key="player.Id">
             {{ player.FirstName }}  {{ player.LastName }}
           </div>
       </div>
    </div>

    <div style="height:200px; background:#6CC;">Bottom</div>
</template>

<script>
import { ref, computed, reactive } from 'vue'
import ScoreSection from './ScoreSection.vue';
import CourtPlayer from './CourtPlayer.vue';

const sqlite3 = require('sqlite3').verbose();
const remote = require('electron').remote;
const app = remote.app;
const dataPath = app.getPath('userData') + '/hmh.db';

export default {
  name: 'Game',
  props: {
    msg: String
  },
  components: {
    ScoreSection,
    CourtPlayer
  },
  setup() {
      const homePlayers = ref([]);
      const awayPlayers = ref([]);

      const homeStyles = {
          headerFG: 'black',
          headerBG: 'white',
          bodyFG: 'white',
          bodyBG: '#024813',
          border: 'white'
      }

      const awayStyles = {
          headerFG: 'black',
          headerBG: 'white',
          bodyFG: 'white',
          bodyBG: 'black',
          border: 'red'
      }

      const gameData = ref({
          homeTeamId: 1, // get these from the game data
          awayTeamId: 2,
          
          homePGId: 2,
          homeSGId: 3,
          homeSFId: 5,
          homePFId: 1,
          homeCId: 4,

          awayPGId: 7,
          awaySFId: 8,
          awayPFId: 9,
          awaySGId: 10,
          awayCId: 11

      })
      

      let db = new sqlite3.Database(dataPath);
      let sql = `SELECT FirstName, LastName, Id FROM players WHERE TeamId = ?`;
      db.all(sql, [gameData.value.homeTeamId], (err, rows)=>{
          homePlayers.value = rows
      })

      sql = `SELECT FirstName, LastName, Id FROM players WHERE TeamId = ?`;
      db.all(sql, [gameData.value.awayTeamId], (err, rows)=>{
          awayPlayers.value = rows
      })

      const homePG = computed(()=>{
          return homePlayers.value.find(player=>player.Id == gameData.value.homePGId)
      })
      const homeSG = computed(()=>{
          return homePlayers.value.find(player=>player.Id == gameData.value.homeSGId)
      })
      const homeSF = computed(()=>{
          return homePlayers.value.find(player=>player.Id == gameData.value.homeSFId)
      })
      const homePF = computed(()=>{
          return homePlayers.value.find(player=>player.Id == gameData.value.homePFId)
      })
      const homeC = computed(()=>{
          return homePlayers.value.find(player=>player.Id == gameData.value.homeCId)
      })

      const awayPG = computed(()=>{
          return awayPlayers.value.find(player=>player.Id == gameData.value.awayPGId)
      })
      const awaySF = computed(()=>{
          return awayPlayers.value.find(player=>player.Id == gameData.value.awaySFId)
      })
      const awaySG = computed(()=>{
          return awayPlayers.value.find(player=>player.Id == gameData.value.awaySGId)
      })
      const awayPF = computed(()=>{
          return awayPlayers.value.find(player=>player.Id == gameData.value.awayPFId)
      })
      const awayC = computed(()=>{
          return awayPlayers.value.find(player=>player.Id == gameData.value.awayCId)
      })

      return {
          gameData,
          homePlayers,
          awayPlayers,
          
          homePG,
          homeSF,
          homeC,
          homePF,
          homeSG,

          awayPG,
          awaySF,
          awayC,
          awayPF,
          awaySG,

          homeStyles,
          awayStyles
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home-container {
    background:#CECECE;
    flex-grow:1;
}
.away-container {
    background:#CECECE;
    flex-grow:1;
}
.middle-container {
    width:940px;
}

.court-container {
    position:relative;
    align-items: center;
    justify-content: center;
    height:560px;
    background-color:#024813;
}
.floor {
    position:absolute;
    top:30px;
    left:55px;
    background-image:url(/images/court.png)
}

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

.home-PG {
    top:250px;
    left:250px;
}

.home-SF {
    top:150px;
    left:250px;
}

.home-SG {
    top:350px;
    left:250px;
}

.home-PF {
    top:450px;
    left:250px;
}

.home-C {
    top:50px;
    left:250px;
}

.away-PG {
    top:250px;
    right:245px;
}

.away-SF {
    top:150px;
    right:245px;
}

.away-SG {
    top:350px;
    right:245px;
}

.away-PF {
    top:450px;
    right:245px;
}

.away-C {
    top:50px;
    right:245px;
}
</style>
