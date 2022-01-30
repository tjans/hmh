<template>
     <div :style="{backgroundColor:team.primaryColor, color: team.textColor}" class="team-header">
         {{ team.city }}
        </div>
        
        <table width="100%" class="table table-light table-striped table-hover table-sm" style="font-size:12pt;">
                
                <thead class="thead-dark">
                 <tr>
                     <th style="text-align:left;">Player</th>
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
                    <td :class="{'foul-trouble':true}" style="text-align:left;">{{player.lastName}}</td>
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

    return {
        rebounds,
        isFoulTrouble: (player) => player.PF > store.state.game.period
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
