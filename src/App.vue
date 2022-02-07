<template>
  <!-- <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div> -->
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.flex-stretch {
  flex-grow: 1;
}
.flex-container {
  display: flex;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

@font-face {
  font-family: bold;
  src: url(/fonts/bold.woff);
}

@font-face {
  font-family: KlavikaWebBoldCond;
  src: url(/fonts/KlavikaWebBoldCond.woff2);
}

@font-face {
  font-family: MediumCond;
  src: url(/fonts/medium-cond.woff);
}
</style>
