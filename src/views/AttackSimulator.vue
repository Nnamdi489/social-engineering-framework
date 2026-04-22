<template>
  <div class="attack-simulator">
    <div class="simulator-header">
      <h1>Attack Simulator</h1>
      <p class="subtitle">Create and execute social engineering attack scenarios</p>
    </div>

    <div class="simulator-tabs">
      <button 
        v-for="tab in tabs" 
        :key="tab.id"
        @click="activeTab = tab.id"
        :class="['tab-btn', { active: activeTab === tab.id }]"
      >
        <span class="tab-icon">{{ tab.icon }}</span>
        {{ tab.name }}
      </button>
    </div>

    <!-- Phishing Simulator -->
    <div v-if="activeTab === 'phishing'" class="simulator-content">
      <PhishingSimulator />
    </div>

    <!-- Spear Phishing Simulator -->
    <div v-if="activeTab === 'spear-phishing'" class="simulator-content">
      <SpearPhishingSimulator />
    </div>

    <!-- Pretexting Simulator -->
    <div v-if="activeTab === 'pretexting'" class="simulator-content">
      <PretextingSimulator />
    </div>

    <!-- Baiting Simulator -->
    <div v-if="activeTab === 'baiting'" class="simulator-content">
      <BaitingSimulator />
    </div>

    <!-- Custom Scenario Builder -->
    <div v-if="activeTab === 'custom'" class="simulator-content">
      <CustomScenarioBuilder />
    </div>
  </div>
</template>

<script>
import PhishingSimulator from '@components/simulation/PhishingSimulator.vue'
import SpearPhishingSimulator from '@components/simulation/SpearPhishingSimulator.vue'
import PretextingSimulator from '@components/simulation/PretextingSimulator.vue'
import BaitingSimulator from '@components/simulation/BaitingSimulator.vue'
import CustomScenarioBuilder from '@components/simulation/CustomScenarioBuilder.vue'

export default {
  name: 'AttackSimulator',
  components: {
    PhishingSimulator,
    SpearPhishingSimulator,
    PretextingSimulator,
    BaitingSimulator,
    CustomScenarioBuilder
  },
  data() {
    return {
      activeTab: 'phishing',
      tabs: [
        {
          id: 'phishing',
          name: 'Email Phishing',
          icon: '📧'
        },
        {
          id: 'spear-phishing',
          name: 'Spear Phishing',
          icon: '🎣'
        },
        {
          id: 'pretexting',
          name: 'Pretexting',
          icon: '🎭'
        },
        {
          id: 'baiting',
          name: 'Baiting',
          icon: '🪤'
        },
        {
          id: 'custom',
          name: 'Custom Scenario',
          icon: '⚙️'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.attack-simulator {
  .simulator-header {
    text-align: center;
    margin-bottom: 2rem;
    
    h1 {
      color: var(--primary-color);
      margin-bottom: 0.5rem;
    }
    
    .subtitle {
      color: #666;
      font-size: 1.1rem;
    }
  }
  
  .simulator-tabs {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 2rem;
    padding: 1rem;
    background: white;
    border-radius: 0.5rem;
    box-shadow: var(--shadow);
    
    .tab-btn {
      display: flex;
      align-items: center;
      padding: 1rem 1.5rem;
      border: 2px solid var(--border-color);
      background: white;
      color: var(--dark-color);
      border-radius: 0.5rem;
      cursor: pointer;
      transition: all 0.3s ease;
      font-weight: 500;
      
      .tab-icon {
        font-size: 1.25rem;
        margin-right: 0.5rem;
      }
      
      &:hover {
        border-color: var(--secondary-color);
        color: var(--secondary-color);
        transform: translateY(-2px);
      }
      
      &.active {
        background: var(--primary-color);
        border-color: var(--primary-color);
        color: white;
        transform: translateY(-2px);
        box-shadow: var(--shadow);
      }
    }
  }
  
  .simulator-content {
    background: white;
    border-radius: 0.5rem;
    box-shadow: var(--shadow);
    padding: 2rem;
    min-height: 600px;
  }
}

@media (max-width: 768px) {
  .attack-simulator {
    .simulator-tabs {
      .tab-btn {
        flex: 1;
        min-width: calc(50% - 0.25rem);
        justify-content: center;
      }
    }
  }
}
</style>
