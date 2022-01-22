<template>
    <strong>Debug</strong>
    <p>{{player}}</p>
    <p>Last: {{player.lastName}}</p>
    <p>obj.foo: {{obj.foo}}</p>
</template>

<script>
export default {
  name: 'Debug',
  props: ['text', 'player', 'obj'],
  setup(props) {      
      
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
