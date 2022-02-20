<template>
    <strong>Edit Team</strong>
    <div><router-link to="/teams">&laquo; Teams</router-link></div>

    <div class="container text-start">
      <form>
        <div class="row">
          <div class="mb-3 col-6">
            <label for="city" class="form-label">City</label>
            <input type="text" class="form-control" id="city" aria-describedby="city" v-model="team.city">
          </div>
  
          <div class="mb-3 col-6">
            <label for="mastcot" class="form-label">Mascot</label>
            <input type="text" class="form-control" id="mascot" aria-describedby="mascot" v-model="team.mascot">
          </div>
        </div>

        <div class="row">
          <div class="mb-3 col-2">
            <label for="primary" class="form-label">Primary Color</label>
            <div class="color-indicator" @click="togglePrimary()" :style="{'background-color': primaryColor.hex}">&nbsp;</div>
            
            <div v-if="showPrimary">
              <Sketch v-model="primaryColor"/>
            </div>
          </div>
       
          <div class="mb-3 col-2">
            <label for="text" class="form-label">Text Color</label>
            <div class="color-indicator" @click="toggleTextColor()" :style="{'background-color': textColor.hex}">&nbsp;</div>
            <Sketch v-model="textColor" v-if="showTextColor"/>
          </div>

          <div class="mb-3 col-2">
            <label for="accent" class="form-label">Accent Color</label>
            <div class="color-indicator" @click="toggleAccentColor()" :style="{'background-color': accentColor.hex}">&nbsp;</div>
            <Sketch v-model="accentColor" v-if="showAccentColor"/>
          </div>
        </div>
        
        <hr />

        <button type="button" @click="save()" class="btn btn-dark m-1">Save</button>
        <button type="button" @click="cancel()" class="btn btn-light m-1">Cancel</button>
      </form>
    </div>

    
</template>

<script>
import { useRoute, useRouter } from 'vue-router'
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { Sketch } from '@ckpack/vue-color';

export default {
  name: 'EditTeam',
  props: [],
  components: {
    Sketch
  },
  setup(props) {      
    const route = useRoute()   
    const store = useStore()
    const router = useRouter()

    // Disconnect the team from state, only update state via mutations
    const team = {...store.getters['team/getById'](route.params.id)}

    const primaryColor = ref({"hex" : team.primaryColor})
    let showPrimary = ref(true)

    const textColor = ref({"hex" : team.textColor})
    let showTextColor = ref(false)

    const accentColor = ref({"hex" : team.accentColor})
    let showAccentColor = ref(false)

    const save = () => {
      team.primaryColor = primaryColor.value.hex
      store.commit('team/SAVE', team)
      router.push("/teams")
    }
    const cancel = () => {
      router.push("/teams")
    }

    return {
      team : computed(()=>team),
      primaryColor,
      showPrimary: computed(() => showPrimary.value),
      togglePrimary: () => showPrimary.value = !showPrimary.value,

      textColor,
      showTextColor: computed(() => showTextColor.value),
      toggleTextColor: () => showTextColor.value = !showTextColor.value,

      accentColor,
      showAccentColor: computed(() => showAccentColor.value),
      toggleAccentColor: () => showAccentColor.value = !showAccentColor.value,

      save,
      cancel
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.color-indicator {
  width:100px;
  cursor:pointer;
  border: 1px solid #CECECE;
}
</style>
