<template>
  <div class="loading-container">
    <div>
      <div class="loading-header">
        <h1>WeatherApp</h1>
      </div>
      <div class="loading-gif">
        <img class="loading" src="../assets/loading.gif" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.loading-container {
  width: 100vw;
  height: 100vh;
  max-width: 100vw;
  max-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #555;
  position: fixed;
  z-index: 30;
}

.loading-header {
  text-align: center;
}

.loading-gif {
  display: flex;
  justify-content: center;
}

.loading {
  width: 50px;
}
</style>
