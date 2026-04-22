<template>
  <div class="home">
    <section class="hero">
      <div class="hero-content">
        <h1>Social Engineering Research Framework</h1>
        <p class="hero-subtitle">
          A comprehensive simulation-based approach for detecting and defending against social engineering attacks
        </p>
        <div class="hero-actions">
          <router-link to="/research" class="btn btn-primary">View Research</router-link>
          <router-link to="/simulation" class="btn btn-secondary">Start Simulation</router-link>
        </div>
      </div>
    </section>

    <section class="features">
      <div class="container">
        <h2 class="text-center mb-3">Framework Components</h2>
        <div class="row">
          <div class="col-4" v-for="feature in features" :key="feature.title">
            <div class="feature-card">
              <div class="feature-icon">{{ feature.icon }}</div>
              <h3>{{ feature.title }}</h3>
              <p>{{ feature.description }}</p>
              <router-link :to="feature.link" class="btn btn-secondary">
                {{ feature.action }}
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="research-overview">
      <div class="container">
        <div class="row">
          <div class="col-6">
            <h2>Research Objectives</h2>
            <ul class="objectives-list">
              <li>Identify common social engineering attack techniques</li>
              <li>Design simulation framework for attack replication</li>
              <li>Implement detection mechanisms within the framework</li>
              <li>Evaluate framework effectiveness in attack mitigation</li>
            </ul>
          </div>
          <div class="col-6">
            <h2>Key Features</h2>
            <div class="features-grid">
              <div class="feature-item">
                <span class="status-indicator active"></span>
                Real-time Attack Simulation
              </div>
              <div class="feature-item">
                <span class="status-indicator active"></span>
                Behavioral Pattern Analysis
              </div>
              <div class="feature-item">
                <span class="status-indicator active"></span>
                Comprehensive Detection Engine
              </div>
              <div class="feature-item">
                <span class="status-indicator active"></span>
                Performance Analytics
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      features: [
        {
          icon: '📚',
          title: 'Research Framework',
          description: 'Comprehensive documentation including methodology, literature review, and theoretical foundations.',
          action: 'View Research',
          link: '/research'
        },
        {
          icon: '⚡',
          title: 'Attack Simulation',
          description: 'Realistic simulation of phishing, pretexting, baiting, and other social engineering attacks.',
          action: 'Start Simulation',
          link: '/simulation'
        },
        {
          icon: '🔍',
          title: 'Detection Center',
          description: 'Advanced detection mechanisms using pattern matching and behavioral analysis.',
          action: 'View Detection',
          link: '/detection'
        },
        {
          icon: '📊',
          title: 'Analytics Dashboard',
          description: 'Real-time monitoring, performance metrics, and comprehensive result analysis.',
          action: 'View Analytics',
          link: '/analytics'
        },
        {
          icon: '🎯',
          title: 'Attack Scenarios',
          description: 'Pre-configured attack scenarios for testing and training purposes.',
          action: 'View Attacks',
          link: '/attacks'
        },
        {
          icon: '📖',
          title: 'Documentation',
          description: 'Complete technical documentation and user guides for the framework.',
          action: 'Read Docs',
          link: '/docs'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.hero {
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: white;
  padding: 4rem 2rem;
  text-align: center;
  margin: -2rem -2rem 3rem -2rem;
  
  .hero-content {
    max-width: 800px;
    margin: 0 auto;
    
    h1 {
      font-size: 3rem;
      margin-bottom: 1rem;
      color: white;
    }
    
    .hero-subtitle {
      font-size: 1.25rem;
      margin-bottom: 2rem;
      opacity: 0.9;
    }
    
    .hero-actions {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
    }
  }
}

.features {
  padding: 3rem 0;
  
  .feature-card {
    background: white;
    padding: 2rem;
    border-radius: 0.5rem;
    box-shadow: var(--shadow);
    text-align: center;
    height: 100%;
    display: flex;
    flex-direction: column;
    transition: transform 0.3s ease;
    
    &:hover {
      transform: translateY(-5px);
    }
    
    .feature-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }
    
    h3 {
      margin-bottom: 1rem;
      color: var(--primary-color);
    }
    
    p {
      flex: 1;
      margin-bottom: 1.5rem;
    }
  }
}

.research-overview {
  background: white;
  padding: 3rem 2rem;
  border-radius: 0.5rem;
  box-shadow: var(--shadow);
  
  .objectives-list {
    list-style: none;
    
    li {
      padding: 0.5rem 0;
      border-bottom: 1px solid var(--border-color);
      position: relative;
      padding-left: 2rem;
      
      &:before {
        content: '✓';
        position: absolute;
        left: 0;
        color: var(--success-color);
        font-weight: bold;
      }
      
      &:last-child {
        border-bottom: none;
      }
    }
  }
  
  .features-grid {
    display: grid;
    gap: 1rem;
    
    .feature-item {
      display: flex;
      align-items: center;
      padding: 0.75rem;
      background: var(--light-color);
      border-radius: 0.375rem;
    }
  }
}

@media (max-width: 768px) {
  .hero {
    padding: 2rem 1rem;
    
    .hero-content h1 {
      font-size: 2rem;
    }
    
    .hero-actions {
      flex-direction: column;
      align-items: center;
    }
  }
}
</style>
