<template>
    <strong>Teams</strong><br />
    <div style="font-family:KlavikaWebRegCond;">Teams</div>

      <div style="display:flex; justify-content:center; width:500px;">
      <table class="table table-light table-striped table-hover table-sm">
        <thead class="thead-dark">
          <tr>
            <th>City</th>
            <th>Mascot</th>
            <th>&nbsp;</th>
          </tr>
          </thead>

          <tbody>
            <tr v-for="(team, index) in teams" :key="index">
              <td>{{team.city}}</td>
              <td>{{team.mascot}}</td>
              <td>
                <a href='#'>edit</a>
              </td>
            </tr>
          </tbody>
      </table>
      </div>

</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'

export default {
  name: 'Teams',
  props: [],
  setup() { 
    const store = useStore()

    return {
      teams: computed(() => store.state.team )
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
