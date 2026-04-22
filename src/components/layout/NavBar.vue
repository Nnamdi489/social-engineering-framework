<template>
  <nav class="navbar">
    <div class="nav-container">
      <div class="nav-brand">
        <!-- <router-link to="/" class="brand-link">
          <span class="brand-icon">🛡️</span>
          <span class="brand-text">SE Research Framework</span>
        </router-link> -->
      </div>
      
      <div class="nav-menu" :class="{ 'active': isMenuOpen }">
        <router-link 
          v-for="item in navItems" 
          :key="item.name"
          :to="item.path" 
          class="nav-link"
          @click="closeMenu"
        >
          <span class="nav-icon">{{ item.icon }}</span>
          {{ item.name }}
        </router-link>
      </div>
      
      <div class="nav-toggle" @click="toggleMenu">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
  data() {
    return {
      isMenuOpen: false,
      navItems: [
        { name: 'Home', path: '/', icon: '' },
        { name: 'Research', path: '/research', icon: '' },
        { name: 'Dashboard', path: '/simulation', icon: '' },
        { name: 'Attacks', path: '/attacks', icon: '' },
        { name: 'Defense', path: '/defense', icon: '' },
        { name: 'Detection', path: '/detection', icon: '' },
        { name: 'Analytics', path: '/analytics', icon: '' },
        { name: 'Docs', path: '/docs', icon: '' }
      ]
    }
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen
    },
    closeMenu() {
      this.isMenuOpen = false
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  background: var(--primary-color);
  box-shadow: var(--shadow);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
}

.nav-brand {
  .brand-link {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: white;
    font-weight: 600;
    font-size: 1rem;
    
    .brand-icon {
      font-size: 1.5rem;
      margin-right: 0.5rem;
    }
  }
}

.nav-menu {
  display: flex;
  align-items: center;
  gap: 2rem;
  
  .nav-link {
    display: flex;
    align-items: center;
    color: white;
    text-decoration: none;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    transition: all 0.3s ease;
    
    .nav-icon {
      margin-right: 0.5rem;
    }
    
    &:hover, &.router-link-active {
      background-color: rgba(255, 255, 255, 0.1);
      transform: translateY(-1px);
    }
  }
}

.nav-toggle {
  display: none;
  flex-direction: column;
  cursor: pointer;
  
  span {
    width: 25px;
    height: 3px;
    background: white;
    margin: 3px 0;
    transition: 0.3s;
  }
}

@media (max-width: 768px) {
  .nav-menu {
    position: fixed;
    left: -100%;
    top: 70px;
    flex-direction: column;
    background-color: var(--primary-color);
    width: 100%;
    text-align: center;
    transition: 0.3s;
    box-shadow: var(--shadow);
    padding: 2rem 0;
    
    &.active {
      left: 0;
    }
    
    .nav-link {
      margin: 0.5rem 0;
      justify-content: center;
    }
  }
  
  .nav-toggle {
    display: flex;
  }
}
</style>
