<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </div>
</template>
<style>
#app {
  padding: 30px;
  background-color: rgba(128, 128, 128, 0.4);
}

.btn,
.btn-sm,
.btn-group-sm > .btn {
  border-radius: 0;
}
</style>