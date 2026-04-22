<template>
  <div id="app">
    <NavBar />
    <main class="main-content">
      <router-view />
    </main>
    <Footer />
    <HelpSystem />
  </div>
</template>

<script>
import NavBar from '@components/layout/NavBar.vue'
import Footer from '@components/layout/Footer.vue'
import HelpSystem from '@components/common/HelpSystem.vue'

export default {
  name: 'App',
  components: {
    NavBar,
    Footer,
    HelpSystem
  }
}
</script>

<style lang="scss">
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

@media (max-width: 768px) {
  .main-content {
    padding: 1rem;
  }
}
</style>
