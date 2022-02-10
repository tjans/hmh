<template>
     <div :style="{backgroundColor:team.primaryColor, color: team.textColor}" class="team-header">
         {{ team.city }}
        </div>
        
        <table width="100%" class="table table-light table-striped table-hover table-sm" style="font-size:9pt; font-family:arial;">
                
                <thead class="thead-dark">
                 <tr>
                     <th style="text-align:left;">Player</th>
                     <th>Pts</th>
                     <th>2P</th>
                     <th>3P</th>
                     <th>FT</th>
                     <th>PF</th>
                     <th>BLK</th>
                     <th>STL</th>
                     <th>REB</th>
                </tr>
                </thead>
             
                <tbody>
                <tr class="roster-player" :class="{ 'table-danger': isFoulTrouble(player)}" style="cursor:pointer;" v-for="player in stats" :key="player.id" @click="selectPlayer(player.id)">
                    <td :class="{'foul-trouble':true}" style="text-align:left; font-weight:bold;">{{player.lastName}}</td>
                    <td>{{points(player)}}</td>
                    <td>{{player.made2}}</td>
                    <td>{{player.made3}}</td>
                    <td>{{player.FTM}}/{{player.FTA}}</td>
                    <td>{{player.PF}}</td>
                    <td>{{player.BLK}}</td>
                    <td>{{player.STL}}</td>
                    <td>{{rebounds(player)}}</td>
                </tr>
                </tbody>

             </table>
</template>

<script>
import { useStore } from 'vuex'
export default {
  name: 'GameStats',
  props: ['team','stats'],
  setup(props) {  
    const store = useStore()    
    const rebounds = (player) => {
        return player.ORB + player.DRB
    }

    const points = (player) => {
      return player.made3 * 3 + player.made2 * 2 + player.FTM
    }

    const selectPlayer = (playerId) => {
        //alert(`Setting ${store.state.game.selectedPosition} to ${playerId}`);
        let gameState = {...store.state.game}
        gameState[store.state.game.selectedPosition] = playerId
        store.commit('game/update', gameState);
    }

    return {
        rebounds,
        points,
        selectPlayer,
        isFoulTrouble: (player) => player.PF + player.OF > store.state.game.period
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
