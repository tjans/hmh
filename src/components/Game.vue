<template>
    <div style="display:flex; align-items: stretch;">
       <div class="home-container">
           <div class="team-header" :style="{backgroundColor:homeStyles.bodyBG, color:homeStyles.bodyFG, border:'0px solid ' + homeStyles.border}">Milwaukee Bucks</div>
           <div v-for="(player) in gameData.homePlayers" 
            class="roster-player" 
            :key="player.Id" @click="selectPlayer(player.Id)">
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

                <court-player @click="selectPosition('homePG')" team="home" position="PG" :player="gameData.homePG" :styles="homeStyles"  />
                <court-player @click="selectPosition('homeSF')" team="home" position="SF" :player="gameData.homeSF" :styles="homeStyles"  />
                <court-player @click="selectPosition('homeC')" team="home" position="C" :player="gameData.homeC" :styles="homeStyles"  />
                <court-player @click="selectPosition('homePF')" team="home" position="PF" :player="gameData.homePF" :styles="homeStyles"  />
                <court-player @click="selectPosition('homeSG')" team="home" position="SG" :player="gameData.homeSG" :styles="homeStyles"  />

                <!-- Away Players -->

                <court-player team="away" position="PG" :player="gameData.awayPG" :styles="awayStyles"  />
                <court-player team="away" position="SF" :player="gameData.awaySF" :styles="awayStyles"  />
                <court-player team="away" position="PF" :player="gameData.awayPF" :styles="awayStyles"  />
                <court-player team="away" position="C" :player="gameData.awayC" :styles="awayStyles"  />
                <court-player team="away" position="SG" :player="gameData.awaySG" :styles="awayStyles"  />
                
           </div>
       </div>

       <div class="away-container">
           <div class="team-header" :style="{backgroundColor:awayStyles.bodyBG, color:awayStyles.bodyFG, border:'0px solid ' + awayStyles.border}">Toronto Raptors</div>
           <div v-for="player in gameData.awayPlayers" :key="player.Id" @click="selectPlayer(player.Id)" class="roster-player">
             {{ player.FirstName }}  {{ player.LastName }}
           </div>
       </div>
    </div>

    <div style="height:200px; background:#6CC;">
        <button class='btn btn-dark m-1'>2PA</button>
        <button class='btn btn-dark m-1'>2PM</button>
        <button class='btn btn-dark m-1'>3PM</button>
        <button class='btn btn-dark m-1'>FTA</button>
        <button class='btn btn-dark m-1'>FTM</button>
        <button class='btn btn-dark m-1'>ORB</button>
        <button class='btn btn-dark m-1'>DRB</button>
        <button class='btn btn-dark m-1'>BLK</button>
        <button class='btn btn-dark m-1'>STL</button>
        <button class='btn btn-dark m-1' @click="incrementFouls">PF</button>
        <button class='btn btn-dark m-1'>D6</button>
        <button class='btn btn-dark m-1'>2D6</button>
        <button class='btn btn-dark m-1'>Chips</button>
        <button class='btn btn-dark m-1'>Lightning</button>

    </div>
</template>

<script>
import ScoreSection from './ScoreSection.vue';
import CourtPlayer from './CourtPlayer.vue';
import useGameData from '@/composables/useGameData'
import { useStore, mapState } from 'vuex'
import { onMounted } from 'vue'

export default {
  name: 'Game',
  props: {},
  components: {
    ScoreSection,
    CourtPlayer
  },
  setup() {
      onMounted(() => {
          console.log('mounted')
      });

      const store = useStore()
      //persistentStore.loadStateFromFile()

      const selectPosition = (position) => {
          console.log(position)
          alert('position selected ' + position);
      }

      const selectPlayer = (id) => {
          console.log(id)
          alert('player selected ' + id);
      }

      const incrementFouls = () => {
          let gameState = {...store.state.game}
          gameState.homeFouls++
          console.log(gameState);
          store.commit('game/update', gameState);
      }

      const { homeStyles, awayStyles, gameData } = useGameData()

      return {
          gameData,
          homeStyles,
          awayStyles,
          selectPosition,
          selectPlayer,
          incrementFouls
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home-container {
    background:black;
    flex-grow:1;
}
.away-container {
    background:black;
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

.roster-player {
    cursor:pointer;
    padding:5px 0px 5px 0px;
    border-bottom:1px solid black;
    background:white;
    font-weight:bold;
}
.roster-player:hover {
    background:#CECECE;
}

.team-header {
    padding:10px 0px 10px 0px;
    border-bottom:1px solid black;
    font-weight:bold;
    font-size:16pt;
}
</style>
