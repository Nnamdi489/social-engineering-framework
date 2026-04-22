<template>
  <div class="documentation">
    <div class="docs-header">
      <h1>📖 Framework Documentation</h1>
      <p class="subtitle">Complete guide to using the Social Engineering Research Framework</p>
    </div>

    <div class="docs-navigation">
      <div class="nav-sections">
        <button 
          v-for="section in docSections" 
          :key="section.id"
          @click="activeSection = section.id"
          :class="['nav-btn', { active: activeSection === section.id }]"
        >
          <span class="nav-icon">{{ section.icon }}</span>
          {{ section.title }}
        </button>
      </div>
    </div>

    <div class="docs-content">
      <!-- Getting Started -->
      <div v-if="activeSection === 'getting-started'" class="doc-section">
        <h2>🚀 Getting Started</h2>
        
        <div class="content-block">
          <h3>Quick Start</h3>
          <p>Welcome to the Social Engineering Research Framework! This comprehensive platform provides tools for researching, simulating, and detecting social engineering attacks.</p>
          
          <div class="steps-list">
            <div class="step-item" v-for="(step, index) in quickStartSteps" :key="index">
              <div class="step-number">{{ index + 1 }}</div>
              <div class="step-content">
                <h4>{{ step.title }}</h4>
                <p>{{ step.description }}</p>
                <div class="step-action" v-if="step.action">
                  <router-link :to="step.action.path" class="btn btn-primary">{{ step.action.text }}</router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="content-block">
          <h3>System Requirements</h3>
          <div class="requirements-grid">
            <div class="requirement-item">
              <h4>🖥️ Hardware</h4>
              <ul>
                <li>Modern computer with 4GB+ RAM</li>
                <li>Stable internet connection</li>
                <li>1GB available storage space</li>
              </ul>
            </div>
            <div class="requirement-item">
              <h4>🌐 Browser</h4>
              <ul>
                <li>Chrome 90+ (recommended)</li>
                <li>Firefox 88+</li>
                <li>Safari 14+</li>
                <li>Edge 90+</li>
              </ul>
            </div>
            <div class="requirement-item">
              <h4>👥 Users</h4>
              <ul>
                <li>Cybersecurity professionals</li>
                <li>Security researchers</li>
                <li>IT administrators</li>
                <li>Students and educators</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Research Guide -->
      <div v-if="activeSection === 'research'" class="doc-section">
        <h2>📚 Research Documentation</h2>
        
        <div class="content-block">
          <h3>Academic Framework</h3>
          <p>The research section provides a comprehensive academic framework for understanding social engineering attacks and defenses.</p>
          
          <div class="research-chapters">
            <div class="chapter-item" v-for="chapter in researchChapters" :key="chapter.id">
              <div class="chapter-icon">{{ chapter.icon }}</div>
              <div class="chapter-content">
                <h4>{{ chapter.title }}</h4>
                <p>{{ chapter.description }}</p>
                <div class="chapter-features">
                  <span v-for="feature in chapter.features" :key="feature" class="feature-tag">{{ feature }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="content-block">
          <h3>Navigation Tips</h3>
          <div class="tips-list">
            <div class="tip-item">
              <span class="tip-icon">💡</span>
              <p>Use the chapter navigation to jump between sections quickly</p>
            </div>
            <div class="tip-item">
              <span class="tip-icon">🔍</span>
              <p>Interactive elements provide additional context and examples</p>
            </div>
            <div class="tip-item">
              <span class="tip-icon">📊</span>
              <p>Charts and diagrams illustrate key concepts and findings</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Simulation Guide -->
      <div v-if="activeSection === 'simulation'" class="doc-section">
        <h2>🎯 Attack Simulation</h2>
        
        <div class="content-block">
          <h3>Simulation Types</h3>
          <div class="simulation-types">
            <div class="sim-type" v-for="simType in simulationTypes" :key="simType.id">
              <div class="sim-header">
                <span class="sim-icon">{{ simType.icon }}</span>
                <h4>{{ simType.name }}</h4>
                <span class="difficulty-badge" :class="simType.difficulty.toLowerCase()">{{ simType.difficulty }}</span>
              </div>
              <p>{{ simType.description }}</p>
              <div class="sim-features">
                <strong>Key Features:</strong>
                <ul>
                  <li v-for="feature in simType.features" :key="feature">{{ feature }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div class="content-block">
          <h3>Best Practices</h3>
          <div class="best-practices">
            <div class="practice-item">
              <h4>🎯 Planning</h4>
              <p>Define clear objectives and success criteria before starting simulations</p>
            </div>
            <div class="practice-item">
              <h4>👥 Targeting</h4>
              <p>Select appropriate target groups based on training needs and risk levels</p>
            </div>
            <div class="practice-item">
              <h4>📊 Monitoring</h4>
              <p>Enable real-time monitoring to track simulation progress and user responses</p>
            </div>
            <div class="practice-item">
              <h4>📚 Education</h4>
              <p>Follow up simulations with educational content and debriefing sessions</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Detection Guide -->
      <div v-if="activeSection === 'detection'" class="doc-section">
        <h2>🔍 Detection System</h2>
        
        <div class="content-block">
          <h3>Detection Layers</h3>
          <p>The framework employs a multi-layered approach to detect social engineering attacks:</p>
          
          <div class="detection-layers">
            <div class="layer-item" v-for="layer in detectionLayers" :key="layer.id">
              <div class="layer-number">{{ layer.id }}</div>
              <div class="layer-content">
                <h4>{{ layer.name }}</h4>
                <p>{{ layer.description }}</p>
                <div class="layer-techniques">
                  <strong>Techniques:</strong>
                  <span v-for="technique in layer.techniques" :key="technique" class="technique-tag">{{ technique }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="content-block">
          <h3>Custom Rules</h3>
          <p>Create custom detection rules to identify specific attack patterns:</p>
          <div class="rule-examples">
            <div class="rule-example">
              <h4>Example: Phishing Detection</h4>
              <div class="rule-code">
                <code>
                  IF email_subject CONTAINS "urgent" AND<br>
                  &nbsp;&nbsp;email_body CONTAINS "click here" AND<br>
                  &nbsp;&nbsp;url_count > 0<br>
                  THEN quarantine_email AND alert_admin
                </code>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Analytics Guide -->
      <div v-if="activeSection === 'analytics'" class="doc-section">
        <h2>📊 Analytics & Reporting</h2>
        
        <div class="content-block">
          <h3>Key Metrics</h3>
          <div class="metrics-grid">
            <div class="metric-item" v-for="metric in keyMetrics" :key="metric.name">
              <div class="metric-icon">{{ metric.icon }}</div>
              <div class="metric-content">
                <h4>{{ metric.name }}</h4>
                <p>{{ metric.description }}</p>
                <div class="metric-formula" v-if="metric.formula">
                  <strong>Formula:</strong> <code>{{ metric.formula }}</code>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="content-block">
          <h3>Report Generation</h3>
          <p>Generate comprehensive reports for stakeholders:</p>
          <div class="report-types">
            <div class="report-type">
              <h4>📈 Executive Summary</h4>
              <p>High-level overview for management and executives</p>
            </div>
            <div class="report-type">
              <h4>🔍 Technical Analysis</h4>
              <p>Detailed technical findings for security teams</p>
            </div>
            <div class="report-type">
              <h4>📚 Training Report</h4>
              <p>Educational insights and recommendations</p>
            </div>
          </div>
        </div>
      </div>

      <!-- API Reference -->
      <div v-if="activeSection === 'api'" class="doc-section">
        <h2>🔧 Technical Reference</h2>
        
        <div class="content-block">
          <h3>Component Architecture</h3>
          <p>The framework is built using Vue.js 3 with a modular component architecture:</p>
          
          <div class="architecture-diagram">
            <div class="arch-layer">
              <h4>Views Layer</h4>
              <p>Page-level components that define routes and layouts</p>
            </div>
            <div class="arch-layer">
              <h4>Components Layer</h4>
              <p>Reusable UI components organized by functionality</p>
            </div>
            <div class="arch-layer">
              <h4>Services Layer</h4>
              <p>Business logic and data management services</p>
            </div>
          </div>
        </div>
        
        <div class="content-block">
          <h3>Configuration</h3>
          <p>Key configuration options and customization points:</p>
          <div class="config-options">
            <div class="config-item">
              <h4>🎨 Theming</h4>
              <p>Customize colors, fonts, and styling through CSS variables</p>
            </div>
            <div class="config-item">
              <h4>🔧 Detection Rules</h4>
              <p>Configure detection algorithms and response actions</p>
            </div>
            <div class="config-item">
              <h4>📊 Analytics</h4>
              <p>Set up custom metrics and reporting parameters</p>
            </div>
          </div>
        </div>
      </div>

      <!-- FAQ -->
      <div v-if="activeSection === 'faq'" class="doc-section">
        <h2>❓ Frequently Asked Questions</h2>
        
        <div class="faq-list">
          <div class="faq-item" v-for="faq in faqItems" :key="faq.id">
            <div class="faq-question" @click="toggleFaq(faq.id)">
              <h4>{{ faq.question }}</h4>
              <span class="faq-toggle">{{ faq.open ? '−' : '+' }}</span>
            </div>
            <div class="faq-answer" v-if="faq.open">
              <p>{{ faq.answer }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Documentation',
  data() {
    return {
      activeSection: 'getting-started',
      docSections: [
        { id: 'getting-started', title: 'Getting Started', icon: '🚀' },
        { id: 'research', title: 'Research', icon: '📚' },
        { id: 'simulation', title: 'Simulation', icon: '🎯' },
        { id: 'detection', title: 'Detection', icon: '🔍' },
        { id: 'analytics', title: 'Analytics', icon: '📊' },
        { id: 'api', title: 'Technical', icon: '🔧' },
        { id: 'faq', title: 'FAQ', icon: '❓' }
      ],
      quickStartSteps: [
        {
          title: 'Explore Research',
          description: 'Start with the comprehensive research documentation to understand social engineering concepts and methodologies.',
          action: { path: '/research', text: 'View Research' }
        },
        {
          title: 'Try Simulations',
          description: 'Experiment with different attack simulation scenarios to see how they work in practice.',
          action: { path: '/attacks', text: 'Start Simulating' }
        },
        {
          title: 'Monitor Detection',
          description: 'Observe real-time threat detection capabilities and configure custom detection rules.',
          action: { path: '/detection', text: 'View Detection' }
        },
        {
          title: 'Analyze Results',
          description: 'Review comprehensive analytics and generate detailed reports for insights.',
          action: { path: '/analytics', text: 'View Analytics' }
        }
      ],
      researchChapters: [
        {
          id: 'title',
          title: 'Title & Abstract',
          icon: '📋',
          description: 'Research overview, objectives, and key findings summary',
          features: ['Executive Summary', 'Research Objectives', 'Key Contributions']
        },
        {
          id: 'intro',
          title: 'Introduction',
          icon: '🎯',
          description: 'Background, problem statement, and research scope',
          features: ['Problem Definition', 'Research Questions', 'Scope & Limitations']
        },
        {
          id: 'literature',
          title: 'Literature Review',
          icon: '📖',
          description: 'Comprehensive analysis of existing research and methodologies',
          features: ['Current State', 'Research Gaps', 'Theoretical Framework']
        },
        {
          id: 'methodology',
          title: 'Methodology',
          icon: '⚙️',
          description: 'Research design, system architecture, and evaluation methods',
          features: ['System Design', 'Implementation', 'Validation Methods']
        },
        {
          id: 'results',
          title: 'Results & Discussion',
          icon: '📊',
          description: 'Findings, analysis, and implications of the research',
          features: ['Performance Results', 'Comparative Analysis', 'Discussion']
        }
      ],
      simulationTypes: [
        {
          id: 'phishing',
          name: 'Email Phishing',
          icon: '📧',
          difficulty: 'Medium',
          description: 'Create realistic phishing email campaigns to test user awareness',
          features: ['Template Library', 'Target Selection', 'Real-time Tracking', 'Success Metrics']
        },
        {
          id: 'spear-phishing',
          name: 'Spear Phishing',
          icon: '🎣',
          difficulty: 'Hard',
          description: 'Highly targeted attacks using gathered intelligence',
          features: ['Intelligence Gathering', 'Personalization', 'Multi-step Process', 'Advanced Metrics']
        },
        {
          id: 'pretexting',
          name: 'Pretexting',
          icon: '🎭',
          difficulty: 'Hard',
          description: 'Social engineering through fabricated scenarios',
          features: ['Scenario Builder', 'Role Playing', 'Authority Claims', 'Urgency Tactics']
        },
        {
          id: 'baiting',
          name: 'Baiting',
          icon: '🪤',
          difficulty: 'Medium',
          description: 'Enticing baits to test user curiosity and security awareness',
          features: ['Multiple Bait Types', 'Deployment Options', 'Monitoring', 'Response Actions']
        }
      ],
      detectionLayers: [
        {
          id: 1,
          name: 'Content Analysis',
          description: 'Analyzes email content, URLs, and attachments for malicious indicators',
          techniques: ['NLP Processing', 'URL Analysis', 'Attachment Scanning', 'Pattern Matching']
        },
        {
          id: 2,
          name: 'Behavioral Analysis',
          description: 'Monitors user behavior patterns and identifies anomalies',
          techniques: ['User Profiling', 'Anomaly Detection', 'Temporal Analysis', 'Risk Scoring']
        },
        {
          id: 3,
          name: 'Machine Learning',
          description: 'Applies advanced ML algorithms for pattern recognition',
          techniques: ['Ensemble Methods', 'Deep Learning', 'Feature Engineering', 'Model Training']
        }
      ],
      keyMetrics: [
        {
          name: 'Success Rate',
          icon: '🎯',
          description: 'Percentage of users who fell for the simulated attack',
          formula: '(Successful Attacks / Total Attempts) × 100'
        },
        {
          name: 'Detection Rate',
          icon: '🔍',
          description: 'Percentage of attacks correctly identified by the system',
          formula: '(True Positives / (True Positives + False Negatives)) × 100'
        },
        {
          name: 'Response Time',
          icon: '⚡',
          description: 'Average time from attack detection to response action',
          formula: 'Sum(Response Times) / Number of Detections'
        },
        {
          name: 'False Positive Rate',
          icon: '❌',
          description: 'Percentage of legitimate communications incorrectly flagged',
          formula: '(False Positives / (False Positives + True Negatives)) × 100'
        }
      ],
      faqItems: [
        {
          id: 1,
          question: 'Is this framework safe to use in production environments?',
          answer: 'The framework is designed for controlled testing and educational purposes. Always ensure you have proper authorization and follow your organization\'s security policies.',
          open: false
        },
        {
          id: 2,
          question: 'Can I customize the attack scenarios?',
          answer: 'Yes! The framework includes a custom scenario builder that allows you to create tailored attack simulations based on your specific needs and environment.',
          open: false
        },
        {
          id: 3,
          question: 'How accurate are the detection algorithms?',
          answer: 'Detection accuracy varies based on configuration and attack sophistication. The framework typically achieves 90-95% accuracy with proper tuning and training.',
          open: false
        },
        {
          id: 4,
          question: 'Can I export the analytics data?',
          answer: 'Yes, the analytics dashboard includes export functionality for generating comprehensive reports in various formats for stakeholders.',
          open: false
        },
        {
          id: 5,
          question: 'What browsers are supported?',
          answer: 'The framework supports all modern browsers including Chrome, Firefox, Safari, and Edge. Chrome is recommended for the best experience.',
          open: false
        }
      ]
    }
  },
  methods: {
    toggleFaq(faqId) {
      const faq = this.faqItems.find(item => item.id === faqId)
      if (faq) {
        faq.open = !faq.open
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.documentation {
  .docs-header {
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
  
  .docs-navigation {
    margin-bottom: 2rem;
    
    .nav-sections {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      justify-content: center;
      padding: 1rem;
      background: white;
      border-radius: 0.5rem;
      box-shadow: var(--shadow);
      
      .nav-btn {
        display: flex;
        align-items: center;
        padding: 0.75rem 1.5rem;
        border: 2px solid var(--border-color);
        background: white;
        color: var(--dark-color);
        border-radius: 0.5rem;
        cursor: pointer;
        transition: all 0.3s ease;
        font-weight: 500;
        
        .nav-icon {
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
  }
  
  .docs-content {
    .doc-section {
      background: white;
      border-radius: 0.5rem;
      box-shadow: var(--shadow);
      padding: 2rem;
      
      h2 {
        color: var(--primary-color);
        margin-bottom: 2rem;
        padding-bottom: 0.5rem;
        border-bottom: 3px solid var(--secondary-color);
      }
      
      .content-block {
        margin-bottom: 3rem;
        
        &:last-child {
          margin-bottom: 0;
        }
        
        h3 {
          color: var(--secondary-color);
          margin-bottom: 1rem;
        }
        
        p {
          line-height: 1.7;
          margin-bottom: 1.5rem;
          text-align: justify;
        }
      }
    }
  }
  
  .steps-list {
    .step-item {
      display: flex;
      margin-bottom: 2rem;
      padding: 1.5rem;
      background: var(--light-color);
      border-radius: 0.5rem;
      
      .step-number {
        background: var(--primary-color);
        color: white;
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 1.25rem;
        margin-right: 1.5rem;
        flex-shrink: 0;
      }
      
      .step-content {
        flex: 1;
        
        h4 {
          color: var(--primary-color);
          margin-bottom: 0.5rem;
        }
        
        p {
          margin-bottom: 1rem;
        }
        
        .step-action {
          margin-top: 1rem;
        }
      }
    }
  }
  
  .requirements-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    
    .requirement-item {
      background: var(--light-color);
      padding: 1.5rem;
      border-radius: 0.5rem;
      
      h4 {
        color: var(--primary-color);
        margin-bottom: 1rem;
      }
      
      ul {
        list-style: none;
        margin: 0;
        padding: 0;
        
        li {
          padding: 0.5rem 0;
          padding-left: 1.5rem;
          position: relative;
          
          &:before {
            content: '✓';
            position: absolute;
            left: 0;
            color: var(--success-color);
            font-weight: bold;
          }
        }
      }
    }
  }
  
  .research-chapters {
    .chapter-item {
      display: flex;
      align-items: flex-start;
      margin-bottom: 2rem;
      padding: 1.5rem;
      background: var(--light-color);
      border-radius: 0.5rem;
      
      .chapter-icon {
        font-size: 2rem;
        margin-right: 1rem;
        flex-shrink: 0;
      }
      
      .chapter-content {
        flex: 1;
        
        h4 {
          color: var(--primary-color);
          margin-bottom: 0.5rem;
        }
        
        p {
          margin-bottom: 1rem;
        }
        
        .chapter-features {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          
          .feature-tag {
            background: var(--secondary-color);
            color: white;
            padding: 0.25rem 0.75rem;
            border-radius: 1rem;
            font-size: 0.8rem;
          }
        }
      }
    }
  }
  
  .tips-list {
    .tip-item {
      display: flex;
      align-items: center;
      margin-bottom: 1rem;
      
      .tip-icon {
        font-size: 1.5rem;
        margin-right: 1rem;
      }
      
      p {
        margin: 0;
      }
    }
  }
  
  .simulation-types {
    .sim-type {
      margin-bottom: 2rem;
      padding: 1.5rem;
      background: var(--light-color);
      border-radius: 0.5rem;
      
      .sim-header {
        display: flex;
        align-items: center;
        margin-bottom: 1rem;
        
        .sim-icon {
          font-size: 1.5rem;
          margin-right: 1rem;
        }
        
        h4 {
          color: var(--primary-color);
          margin: 0;
          flex: 1;
        }
        
        .difficulty-badge {
          padding: 0.25rem 0.75rem;
          border-radius: 1rem;
          font-size: 0.8rem;
          font-weight: bold;
          
          &.easy {
            background: var(--success-color);
            color: white;
          }
          
          &.medium {
            background: var(--warning-color);
            color: white;
          }
          
          &.hard {
            background: var(--danger-color);
            color: white;
          }
        }
      }
      
      .sim-features {
        margin-top: 1rem;
        
        ul {
          list-style: none;
          margin: 0.5rem 0 0 0;
          padding: 0;
          
          li {
            padding: 0.25rem 0;
            padding-left: 1.5rem;
            position: relative;
            
            &:before {
              content: '•';
              position: absolute;
              left: 0;
              color: var(--secondary-color);
              font-weight: bold;
            }
          }
        }
      }
    }
  }
  
  .best-practices {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    
    .practice-item {
      background: var(--light-color);
      padding: 1.5rem;
      border-radius: 0.5rem;
      
      h4 {
        color: var(--primary-color);
        margin-bottom: 0.5rem;
      }
    }
  }
  
  .detection-layers {
    .layer-item {
      display: flex;
      margin-bottom: 2rem;
      padding: 1.5rem;
      background: var(--light-color);
      border-radius: 0.5rem;
      
      .layer-number {
        background: var(--secondary-color);
        color: white;
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 1.25rem;
        margin-right: 1.5rem;
        flex-shrink: 0;
      }
      
      .layer-content {
        flex: 1;
        
        h4 {
          color: var(--primary-color);
          margin-bottom: 0.5rem;
        }
        
        p {
          margin-bottom: 1rem;
        }
        
        .layer-techniques {
          .technique-tag {
            background: var(--primary-color);
            color: white;
            padding: 0.25rem 0.75rem;
            border-radius: 1rem;
            font-size: 0.8rem;
            margin-right: 0.5rem;
            margin-bottom: 0.5rem;
            display: inline-block;
          }
        }
      }
    }
  }
  
  .rule-examples {
    .rule-example {
      background: var(--light-color);
      padding: 1.5rem;
      border-radius: 0.5rem;
      
      h4 {
        color: var(--primary-color);
        margin-bottom: 1rem;
      }
      
      .rule-code {
        background: #2c3e50;
        color: #ecf0f1;
        padding: 1rem;
        border-radius: 0.25rem;
        font-family: 'Courier New', monospace;
        
        code {
          font-size: 0.9rem;
          line-height: 1.5;
        }
      }
    }
  }
  
  .metrics-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
    
    .metric-item {
      display: flex;
      align-items: flex-start;
      background: var(--light-color);
      padding: 1.5rem;
      border-radius: 0.5rem;
      
      .metric-icon {
        font-size: 2rem;
        margin-right: 1rem;
        flex-shrink: 0;
      }
      
      .metric-content {
        flex: 1;
        
        h4 {
          color: var(--primary-color);
          margin-bottom: 0.5rem;
        }
        
        p {
          margin-bottom: 1rem;
        }
        
        .metric-formula {
          background: white;
          padding: 0.75rem;
          border-radius: 0.25rem;
          
          code {
            font-family: 'Courier New', monospace;
            color: var(--secondary-color);
          }
        }
      }
    }
  }
  
  .report-types {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    
    .report-type {
      background: var(--light-color);
      padding: 1.5rem;
      border-radius: 0.5rem;
      
      h4 {
        color: var(--primary-color);
        margin-bottom: 0.5rem;
      }
    }
  }
  
  .architecture-diagram {
    .arch-layer {
      background: var(--light-color);
      padding: 1.5rem;
      border-radius: 0.5rem;
      margin-bottom: 1rem;
      border-left: 4px solid var(--secondary-color);
      
      h4 {
        color: var(--primary-color);
        margin-bottom: 0.5rem;
      }
    }
  }
  
  .config-options {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    
    .config-item {
      background: var(--light-color);
      padding: 1.5rem;
      border-radius: 0.5rem;
      
      h4 {
        color: var(--primary-color);
        margin-bottom: 0.5rem;
      }
    }
  }
  
  .faq-list {
    .faq-item {
      background: var(--light-color);
      border-radius: 0.5rem;
      margin-bottom: 1rem;
      overflow: hidden;
      
      .faq-question {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.5rem;
        cursor: pointer;
        transition: background-color 0.3s ease;
        
        &:hover {
          background: rgba(52, 152, 219, 0.1);
        }
        
        h4 {
          color: var(--primary-color);
          margin: 0;
        }
        
        .faq-toggle {
          font-size: 1.5rem;
          font-weight: bold;
          color: var(--secondary-color);
        }
      }
      
      .faq-answer {
        padding: 0 1.5rem 1.5rem 1.5rem;
        border-top: 1px solid var(--border-color);
        
        p {
          margin: 1rem 0 0 0;
          line-height: 1.6;
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .documentation {
    .docs-navigation {
      .nav-sections {
        .nav-btn {
          flex: 1;
          min-width: calc(50% - 0.25rem);
          justify-content: center;
        }
      }
    }
    
    .step-item {
      flex-direction: column;
      text-align: center;
      
      .step-number {
        margin-right: 0;
        margin-bottom: 1rem;
      }
    }
    
    .layer-item {
      flex-direction: column;
      text-align: center;
      
      .layer-number {
        margin-right: 0;
        margin-bottom: 1rem;
      }
    }
    
    .metric-item {
      flex-direction: column;
      text-align: center;
      
      .metric-icon {
        margin-right: 0;
        margin-bottom: 1rem;
      }
    }
  }
}
</style>
