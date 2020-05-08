<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: whitesmoke;
}

html, h1, h2, h3, h4, h5, h6, p {
  margin: 0;
  padding: 0;
}
</style>