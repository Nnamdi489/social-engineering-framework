<template>
  <div class="title-page">
    <div class="title-content">
      <div class="university-logo">
        <div class="logo-placeholder">🎓</div>
      </div>
      
      <h1 class="main-title">
        A Simulation-Based Framework for Detecting and Defending Against Social Engineering Attacks
      </h1>
      
      <div class="subtitle">
        A Comprehensive Research Study
      </div>
      
      <div class="author-info">
        <div class="author-section">
          <h3>Submitted by:</h3>
          <p class="author-name">Research Team</p>
          <p class="author-details">Department of Cybersecurity</p>
        </div>
        
        <div class="institution-section">
          <h3>Institution:</h3>
          <p class="institution-name">University Research Center</p>
          <p class="department">Department of Computer Science & Cybersecurity</p>
        </div>
        
        <div class="submission-info">
          <h3>Submission Details:</h3>
          <p class="submission-date">Date: {{ currentDate }}</p>
          <p class="academic-year">Academic Year: {{ academicYear }}</p>
        </div>
      </div>
      
      <div class="research-type">
        <p>Research Framework Documentation</p>
        <p>Social Engineering Attack Simulation & Detection</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TitlePage',
  computed: {
    currentDate() {
      return new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    },
    academicYear() {
      const year = new Date().getFullYear()
      return `${year}-${year + 1}`
    }
  }
}
</script>

<style lang="scss" scoped>
.title-page {
  text-align: center;
  padding: 3rem 2rem;
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.title-content {
  max-width: 600px;
  
  .university-logo {
    margin-bottom: 2rem;
    
    .logo-placeholder {
      font-size: 4rem;
      color: var(--primary-color);
    }
  }
  
  .main-title {
    font-size: 2.5rem;
    color: var(--primary-color);
    margin-bottom: 1rem;
    line-height: 1.3;
    font-weight: 700;
  }
  
  .subtitle {
    font-size: 1.5rem;
    color: var(--secondary-color);
    margin-bottom: 3rem;
    font-style: italic;
  }
  
  .author-info {
    margin: 3rem 0;
    text-align: left;
    
    .author-section,
    .institution-section,
    .submission-info {
      margin-bottom: 2rem;
      padding: 1.5rem;
      background: var(--light-color);
      border-radius: 0.5rem;
      border-left: 4px solid var(--primary-color);
      
      h3 {
        color: var(--primary-color);
        margin-bottom: 0.5rem;
        font-size: 1.1rem;
      }
      
      p {
        margin-bottom: 0.25rem;
        
        &.author-name,
        &.institution-name {
          font-weight: 600;
          font-size: 1.1rem;
          color: var(--dark-color);
        }
        
        &.author-details,
        &.department {
          color: #666;
        }
      }
    }
  }
  
  .research-type {
    margin-top: 3rem;
    padding-top: 2rem;
    border-top: 2px solid var(--border-color);
    
    p {
      font-size: 1.1rem;
      color: var(--secondary-color);
      margin-bottom: 0.5rem;
      font-weight: 500;
    }
  }
}

@media (max-width: 768px) {
  .title-page {
    padding: 2rem 1rem;
  }
  
  .title-content {
    .main-title {
      font-size: 2rem;
    }
    
    .subtitle {
      font-size: 1.25rem;
    }
  }
}
</style>
