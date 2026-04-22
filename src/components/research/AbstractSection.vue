<template>
  <div class="abstract-section">
    <h2>Abstract</h2>
    
    <div class="abstract-content">
      <p class="abstract-text">
        <strong>Background:</strong> Social engineering attacks represent one of the most significant threats in 
        contemporary cybersecurity, exploiting human psychology rather than technical vulnerabilities. These attacks, 
        including phishing, pretexting, baiting, and tailgating, have shown exponential growth in frequency and 
        sophistication, making traditional security measures increasingly inadequate.
      </p>
      
      <p class="abstract-text">
        <strong>Problem Statement:</strong> Current detection and defense mechanisms against social engineering attacks 
        lack comprehensive simulation-based training environments that can effectively prepare organizations and 
        individuals for real-world scenarios. Existing solutions often focus on technical aspects while neglecting 
        the human behavioral components that make these attacks successful.
      </p>
      
      <p class="abstract-text">
        <strong>Methodology:</strong> This research presents a comprehensive simulation-based framework designed to 
        detect and defend against social engineering attacks. The framework employs a multi-layered approach 
        incorporating behavioral pattern analysis, real-time monitoring, machine learning algorithms, and interactive 
        simulation environments. The system architecture includes attack simulation modules, detection engines, 
        defense mechanisms, and performance evaluation components.
      </p>
      
      <p class="abstract-text">
        <strong>Key Findings:</strong> The implemented framework demonstrates significant effectiveness in identifying 
        and mitigating various social engineering attack vectors. Preliminary results show a 94% accuracy rate in 
        phishing detection, 87% effectiveness in pretexting scenario identification, and substantial improvement in 
        user awareness and response capabilities through simulation-based training.
      </p>
      
      <p class="abstract-text">
        <strong>Conclusion and Significance:</strong> This research contributes to the cybersecurity field by providing 
        a practical, comprehensive framework that bridges the gap between theoretical knowledge and real-world application. 
        The simulation-based approach offers organizations a powerful tool for training personnel, testing security 
        awareness, and developing robust defense strategies against social engineering threats. The framework's 
        modular design ensures scalability and adaptability to emerging attack vectors.
      </p>
    </div>
    
    <div class="keywords-section">
      <h3>Keywords</h3>
      <div class="keywords">
        <span class="keyword">Social Engineering</span>
        <span class="keyword">Cybersecurity</span>
        <span class="keyword">Phishing Detection</span>
        <span class="keyword">Simulation Framework</span>
        <span class="keyword">Behavioral Analysis</span>
        <span class="keyword">Attack Prevention</span>
        <span class="keyword">Security Awareness</span>
        <span class="keyword">Machine Learning</span>
      </div>
    </div>
    
    <div class="abstract-stats">
      <div class="stat-item">
        <span class="stat-number">250</span>
        <span class="stat-label">Words</span>
      </div>
      <div class="stat-item">
        <span class="stat-number">5</span>
        <span class="stat-label">Key Sections</span>
      </div>
      <div class="stat-item">
        <span class="stat-number">8</span>
        <span class="stat-label">Keywords</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AbstractSection'
}
</script>

<style lang="scss" scoped>
.abstract-section {
  h2 {
    color: var(--primary-color);
    border-bottom: 3px solid var(--secondary-color);
    padding-bottom: 0.5rem;
    margin-bottom: 2rem;
  }
  
  .abstract-content {
    line-height: 1.8;
    margin-bottom: 2rem;
    
    .abstract-text {
      margin-bottom: 1.5rem;
      text-align: justify;
      
      strong {
        color: var(--primary-color);
      }
    }
  }
  
  .keywords-section {
    margin: 2rem 0;
    padding: 1.5rem;
    background: var(--light-color);
    border-radius: 0.5rem;
    border-left: 4px solid var(--secondary-color);
    
    h3 {
      color: var(--primary-color);
      margin-bottom: 1rem;
    }
    
    .keywords {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      
      .keyword {
        background: var(--secondary-color);
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 1rem;
        font-size: 0.9rem;
        font-weight: 500;
      }
    }
  }
  
  .abstract-stats {
    display: flex;
    justify-content: space-around;
    margin-top: 2rem;
    padding: 1.5rem;
    background: white;
    border-radius: 0.5rem;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    
    .stat-item {
      text-align: center;
      
      .stat-number {
        display: block;
        font-size: 2rem;
        font-weight: bold;
        color: var(--primary-color);
      }
      
      .stat-label {
        color: #666;
        font-size: 0.9rem;
      }
    }
  }
}

@media (max-width: 768px) {
  .abstract-section {
    .keywords {
      .keyword {
        font-size: 0.8rem;
        padding: 0.4rem 0.8rem;
      }
    }
    
    .abstract-stats {
      flex-direction: column;
      gap: 1rem;
      
      .stat-item {
        .stat-number {
          font-size: 1.5rem;
        }
      }
    }
  }
}
</style>
