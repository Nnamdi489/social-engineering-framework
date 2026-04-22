<template>
  <div class="research-framework">
    <div class="research-header">
      <h1>Social Engineering Research Framework</h1>
      <p class="subtitle">A Simulation-Based Approach for Detection and Defense</p>
    </div>

    <div class="research-navigation">
      <button 
        v-for="section in sections" 
        :key="section.id"
        @click="activeSection = section.id"
        :class="['nav-btn', { active: activeSection === section.id }]"
      >
        {{ section.title }}
      </button>
    </div>

    <div class="research-content">
      <!-- Title Page -->
      <section v-if="activeSection === 'title'" class="research-section">
        <TitlePage />
      </section>

      <!-- Abstract -->
      <section v-if="activeSection === 'abstract'" class="research-section">
        <AbstractSection />
      </section>

      <!-- Introduction -->
      <section v-if="activeSection === 'introduction'" class="research-section">
        <IntroductionSection />
      </section>

      <!-- Literature Review -->
      <section v-if="activeSection === 'literature'" class="research-section">
        <LiteratureReview />
      </section>

      <!-- Methodology -->
      <section v-if="activeSection === 'methodology'" class="research-section">
        <MethodologySection />
      </section>

      <!-- Results -->
      <section v-if="activeSection === 'results'" class="research-section">
        <ResultsSection />
      </section>
    </div>
  </div>
</template>

<script>
import TitlePage from '@components/research/TitlePage.vue'
import AbstractSection from '@components/research/AbstractSection.vue'
import IntroductionSection from '@components/research/IntroductionSection.vue'
import LiteratureReview from '@components/research/LiteratureReview.vue'
import MethodologySection from '@components/research/MethodologySection.vue'
import ResultsSection from '@components/research/ResultsSection.vue'

export default {
  name: 'ResearchFramework',
  components: {
    TitlePage,
    AbstractSection,
    IntroductionSection,
    LiteratureReview,
    MethodologySection,
    ResultsSection
  },
  data() {
    return {
      activeSection: 'title',
      sections: [
        { id: 'title', title: 'Title Page' },
        { id: 'abstract', title: 'Abstract' },
        { id: 'introduction', title: 'Introduction' },
        { id: 'literature', title: 'Literature Review' },
        { id: 'methodology', title: 'Methodology' },
        { id: 'results', title: 'Results & Discussion' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.research-framework {
  max-width: 1000px;
  margin: 0 auto;
}

.research-header {
  text-align: center;
  margin-bottom: 2rem;
  padding: 2rem;
  background: white;
  border-radius: 0.5rem;
  box-shadow: var(--shadow);
  
  h1 {
    color: var(--primary-color);
    margin-bottom: 0.5rem;
  }
  
  .subtitle {
    font-size: 1.25rem;
    color: var(--secondary-color);
    font-style: italic;
  }
}

.research-navigation {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2rem;
  padding: 1rem;
  background: white;
  border-radius: 0.5rem;
  box-shadow: var(--shadow);
  
  .nav-btn {
    padding: 0.75rem 1.5rem;
    border: 2px solid var(--border-color);
    background: white;
    color: var(--dark-color);
    border-radius: 0.375rem;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: 500;
    
    &:hover {
      border-color: var(--secondary-color);
      color: var(--secondary-color);
    }
    
    &.active {
      background: var(--primary-color);
      border-color: var(--primary-color);
      color: white;
    }
  }
}

.research-content {
  .research-section {
    background: white;
    border-radius: 0.5rem;
    box-shadow: var(--shadow);
    padding: 2rem;
    margin-bottom: 2rem;
  }
}

@media (max-width: 768px) {
  .research-navigation {
    .nav-btn {
      flex: 1;
      min-width: calc(50% - 0.25rem);
    }
  }
}
</style>
