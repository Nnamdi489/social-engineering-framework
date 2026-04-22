<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-content">
        <div class="footer-section">
          <h4>Social Engineering Research Framework</h4>
          <p>A comprehensive simulation-based approach for detecting and defending against social engineering attacks.</p>
        </div>
        
        <div class="footer-section">
          <h5>Quick Links</h5>
          <ul>
            <li><router-link to="/research">Research Framework</router-link></li>
            <li><router-link to="/simulation">Simulation Dashboard</router-link></li>
            <li><router-link to="/detection">Detection Center</router-link></li>
            <li><router-link to="/docs">Documentation</router-link></li>
          </ul>
        </div>
        
        <div class="footer-section">
          <h5>Research Areas</h5>
          <ul>
            <li>Phishing Detection</li>
            <li>Behavioral Analysis</li>
            <li>Attack Simulation</li>
            <li>Defense Mechanisms</li>
          </ul>
        </div>
        
        <div class="footer-section">
          <h5>Contact</h5>
          <p>Research Team<br>
          Cybersecurity Department<br>
          {{ currentYear }}</p>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>&copy; {{ currentYear }} Social Engineering Research Framework. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  computed: {
    currentYear() {
      return new Date().getFullYear()
    }
  }
}
</script>

<style lang="scss" scoped>
.footer {
  background: var(--dark-color);
  color: white;
  margin-top: auto;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 1rem 1rem;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.footer-section {
  h4, h5 {
    margin-bottom: 1rem;
    color: var(--secondary-color);
  }
  
  p {
    line-height: 1.6;
    color: #bdc3c7;
  }
  
  ul {
    list-style: none;
    
    li {
      margin-bottom: 0.5rem;
      
      a {
        color: #bdc3c7;
        text-decoration: none;
        transition: color 0.3s ease;
        
        &:hover {
          color: var(--secondary-color);
        }
      }
    }
  }
}

.footer-bottom {
  border-top: 1px solid #34495e;
  padding-top: 1rem;
  text-align: center;
  color: #95a5a6;
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
</style>
