<template>
  <div id="app">
    <router-view />
  </div>
</template>
<style>
#app {
  padding: 30px;
  height: 100%;
  background-color: rgba(128, 128, 128, 0.4);
}

html,
body {
  width: 100%;
  height: 100%;
  background-color: rgba(128, 128, 128, 0.4);
}

.btn,
.btn-sm,
.btn-group-sm > .btn {
  border-radius: 0;
}
</style>