<template>
  <div class="help-system">
    <!-- Floating Help Button -->
    <button @click="toggleHelp" class="help-fab" :class="{ active: helpVisible }">
      <span v-if="!helpVisible">❓</span>
      <span v-else>×</span>
    </button>
    
    <!-- Help Panel -->
    <div v-if="helpVisible" class="help-panel">
      <div class="help-header">
        <h3>🆘 Help & Guidance</h3>
        <div class="help-tabs">
          <button 
            v-for="tab in helpTabs" 
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="['help-tab', { active: activeTab === tab.id }]"
          >
            {{ tab.icon }} {{ tab.name }}
          </button>
        </div>
      </div>
      
      <div class="help-content">
        <!-- Quick Help -->
        <div v-if="activeTab === 'quick'" class="help-section">
          <h4>🚀 Quick Start Guide</h4>
          <div class="quick-actions">
            <div class="action-card" @click="showPageHelp">
              <div class="action-icon">📖</div>
              <div class="action-content">
                <h5>Page Guide</h5>
                <p>Get help for the current page</p>
              </div>
            </div>
            
            <div class="action-card" @click="showGlossary">
              <div class="action-icon">📚</div>
              <div class="action-content">
                <h5>Glossary</h5>
                <p>Look up technical terms</p>
              </div>
            </div>
            
            <div class="action-card" @click="showTutorial">
              <div class="action-icon">🎓</div>
              <div class="action-content">
                <h5>Tutorial</h5>
                <p>Step-by-step walkthrough</p>
              </div>
            </div>
            
            <div class="action-card" @click="showFAQ">
              <div class="action-icon">❓</div>
              <div class="action-content">
                <h5>FAQ</h5>
                <p>Common questions</p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Page-Specific Help -->
        <div v-if="activeTab === 'page'" class="help-section">
          <h4>📖 {{ currentPageHelp.title }}</h4>
          <div class="page-help-content">
            <p>{{ currentPageHelp.description }}</p>
            
            <div v-if="currentPageHelp.sections" class="help-sections">
              <div v-for="section in currentPageHelp.sections" :key="section.id" class="help-section-item">
                <h5>{{ section.icon }} {{ section.title }}</h5>
                <p>{{ section.description }}</p>
                <div v-if="section.steps" class="help-steps">
                  <ol>
                    <li v-for="step in section.steps" :key="step">{{ step }}</li>
                  </ol>
                </div>
              </div>
            </div>
            
            <div v-if="currentPageHelp.tips" class="help-tips">
              <h5>💡 Tips & Tricks</h5>
              <ul>
                <li v-for="tip in currentPageHelp.tips" :key="tip">{{ tip }}</li>
              </ul>
            </div>
          </div>
        </div>
        
        <!-- Tutorials -->
        <div v-if="activeTab === 'tutorial'" class="help-section">
          <h4>🎓 Interactive Tutorials</h4>
          <div class="tutorials-list">
            <div v-for="tutorial in tutorials" :key="tutorial.id" class="tutorial-item">
              <div class="tutorial-header">
                <div class="tutorial-icon">{{ tutorial.icon }}</div>
                <div class="tutorial-info">
                  <h5>{{ tutorial.title }}</h5>
                  <p>{{ tutorial.description }}</p>
                  <div class="tutorial-meta">
                    <span class="duration">⏱️ {{ tutorial.duration }}</span>
                    <span class="difficulty" :class="tutorial.difficulty.toLowerCase()">
                      {{ tutorial.difficulty }}
                    </span>
                  </div>
                </div>
              </div>
              <button @click="startTutorial(tutorial.id)" class="btn btn-primary">
                Start Tutorial
              </button>
            </div>
          </div>
        </div>
        
        <!-- FAQ -->
        <div v-if="activeTab === 'faq'" class="help-section">
          <h4>❓ Frequently Asked Questions</h4>
          <div class="faq-list">
            <div v-for="faq in faqs" :key="faq.id" class="faq-item">
              <div class="faq-question" @click="toggleFAQ(faq.id)">
                <h5>{{ faq.question }}</h5>
                <span class="faq-toggle">{{ openFAQs.includes(faq.id) ? '−' : '+' }}</span>
              </div>
              <div v-if="openFAQs.includes(faq.id)" class="faq-answer">
                <p>{{ faq.answer }}</p>
                <div v-if="faq.relatedLinks" class="related-links">
                  <h6>Related:</h6>
                  <div class="link-tags">
                    <span v-for="link in faq.relatedLinks" :key="link" class="link-tag">
                      {{ link }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Glossary Modal -->
    <GlossaryModal 
      :visible="glossaryVisible" 
      :highlight-term="highlightedTerm"
      @close="closeGlossary"
    />
  </div>
</template>

<script>
import GlossaryModal from './GlossaryModal.vue'

export default {
  name: 'HelpSystem',
  components: {
    GlossaryModal
  },
  data() {
    return {
      helpVisible: false,
      activeTab: 'quick',
      glossaryVisible: false,
      highlightedTerm: null,
      openFAQs: [],
      helpTabs: [
        { id: 'quick', name: 'Quick Help', icon: '🚀' },
        { id: 'page', name: 'Page Guide', icon: '📖' },
        { id: 'tutorial', name: 'Tutorials', icon: '🎓' },
        { id: 'faq', name: 'FAQ', icon: '❓' }
      ],
      tutorials: [
        {
          id: 'getting-started',
          title: 'Getting Started with Social Engineering Research',
          description: 'Learn the basics of using this research framework',
          icon: '🌟',
          duration: '10 minutes',
          difficulty: 'Beginner'
        },
        {
          id: 'running-simulations',
          title: 'Running Your First Simulation',
          description: 'Step-by-step guide to setting up and executing attack simulations',
          icon: '🎯',
          duration: '15 minutes',
          difficulty: 'Beginner'
        },
        {
          id: 'analyzing-results',
          title: 'Analyzing Simulation Results',
          description: 'How to interpret metrics and generate insights from simulation data',
          icon: '📊',
          duration: '20 minutes',
          difficulty: 'Intermediate'
        },
        {
          id: 'defense-strategies',
          title: 'Implementing Defense Strategies',
          description: 'Learn how to use simulation results to improve security posture',
          icon: '🛡️',
          duration: '25 minutes',
          difficulty: 'Intermediate'
        }
      ],
      faqs: [
        {
          id: 'what-is-social-engineering',
          question: 'What is social engineering and why is it dangerous?',
          answer: 'Social engineering is the use of psychological manipulation to trick people into divulging confidential information or performing actions that compromise security. It\'s dangerous because it exploits human psychology rather than technical vulnerabilities, making it harder to defend against with technology alone.',
          relatedLinks: ['Social Engineering', 'Phishing', 'Defense Strategies']
        },
        {
          id: 'how-simulations-work',
          question: 'How do the attack simulations work?',
          answer: 'Our simulations create realistic but safe scenarios that mimic real social engineering attacks. They test how users respond to various tactics without causing actual harm. Results help identify vulnerabilities and improve training programs.',
          relatedLinks: ['Phishing Simulation', 'Success Rate', 'Detection Rate']
        },
        {
          id: 'interpreting-metrics',
          question: 'How should I interpret the success and detection rates?',
          answer: 'Success rate shows how many people fell for the simulated attack (lower is better). Detection rate shows how many people correctly identified and reported the attack (higher is better). These metrics help measure security awareness and training effectiveness.',
          relatedLinks: ['Success Rate', 'Detection Rate', 'Security Awareness']
        },
        {
          id: 'improving-security',
          question: 'How can I use these results to improve security?',
          answer: 'Use simulation results to identify weak areas, target training efforts, implement technical controls, and measure improvement over time. Focus on the combination of technical, human, and process controls for maximum effectiveness.',
          relatedLinks: ['Defense Strategies', 'Security Training', 'Best Practices']
        },
        {
          id: 'ethical-considerations',
          question: 'What are the ethical considerations for social engineering research?',
          answer: 'Always ensure simulations are conducted with proper authorization, informed consent where appropriate, and clear educational objectives. Focus on improving security rather than exploiting vulnerabilities, and maintain confidentiality of results.',
          relatedLinks: ['Research Ethics', 'Incident Response', 'Security Culture']
        }
      ]
    }
  },
  computed: {
    currentPageHelp() {
      const route = this.$route.name
      const pageHelp = {
        'Home': {
          title: 'Framework Overview',
          description: 'This is the main dashboard showing an overview of the Social Engineering Research Framework.',
          sections: [
            {
              id: 'navigation',
              icon: '🧭',
              title: 'Navigation',
              description: 'Use the top navigation bar to access different sections of the framework.',
              steps: [
                'Click on any navigation item to explore that section',
                'Use the breadcrumb trail to track your location',
                'Access help from any page using the floating help button'
              ]
            }
          ],
          tips: [
            'Start with the Research section to understand the methodology',
            'Try running a simple phishing simulation first',
            'Check the Analytics section to see example results'
          ]
        },
        'AttackSimulation': {
          title: 'Attack Simulation Guide',
          description: 'This section allows you to configure and run various social engineering attack simulations.',
          sections: [
            {
              id: 'attack-types',
              icon: '🎯',
              title: 'Attack Types',
              description: 'Choose from different social engineering attack vectors.',
              steps: [
                'Select the attack type that matches your testing goals',
                'Configure the attack parameters carefully',
                'Preview your configuration before execution',
                'Monitor the simulation progress in real-time'
              ]
            },
            {
              id: 'configuration',
              icon: '⚙️',
              title: 'Configuration',
              description: 'Set up your attack parameters and targets.',
              steps: [
                'Define your target audience and scope',
                'Customize attack content and messaging',
                'Set execution timing and monitoring options',
                'Review all settings before deployment'
              ]
            }
          ],
          tips: [
            'Start with smaller target groups for initial testing',
            'Use realistic but safe scenarios',
            'Always inform participants about the educational nature',
            'Monitor results in real-time during execution'
          ]
        },
        'DefenseTraining': {
          title: 'Defense Training Guide',
          description: 'Learn about defense strategies and security awareness training.',
          sections: [
            {
              id: 'training-modules',
              icon: '🧠',
              title: 'Training Modules',
              description: 'Interactive security awareness training content.',
              steps: [
                'Select appropriate training modules for your audience',
                'Complete modules in the recommended order',
                'Take assessments to test understanding',
                'Apply learned concepts in practice scenarios'
              ]
            }
          ],
          tips: [
            'Regular training is more effective than one-time sessions',
            'Combine different training methods for best results',
            'Track progress and adjust training based on results'
          ]
        }
      }
      
      return pageHelp[route] || {
        title: 'General Help',
        description: 'General guidance for using the Social Engineering Research Framework.',
        tips: [
          'Use the glossary to understand technical terms',
          'Follow the tutorials for step-by-step guidance',
          'Check the FAQ for common questions'
        ]
      }
    }
  },
  methods: {
    toggleHelp() {
      this.helpVisible = !this.helpVisible
      if (this.helpVisible) {
        this.activeTab = 'quick'
      }
    },
    showPageHelp() {
      this.activeTab = 'page'
    },
    showGlossary(term = null) {
      this.highlightedTerm = term
      this.glossaryVisible = true
      this.helpVisible = false
    },
    closeGlossary() {
      this.glossaryVisible = false
      this.highlightedTerm = null
    },
    showTutorial() {
      this.activeTab = 'tutorial'
    },
    showFAQ() {
      this.activeTab = 'faq'
    },
    startTutorial(tutorialId) {
      console.log('Starting tutorial:', tutorialId)
      alert(`Starting ${tutorialId} tutorial. This would launch an interactive walkthrough.`)
    },
    toggleFAQ(faqId) {
      const index = this.openFAQs.indexOf(faqId)
      if (index > -1) {
        this.openFAQs.splice(index, 1)
      } else {
        this.openFAQs.push(faqId)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.help-system {
  .help-fab {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 60px;
    height: 60px;
    background: var(--primary-color);
    color: white;
    border: none;
    border-radius: 50%;
    font-size: 1.5rem;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    transition: all 0.3s ease;
    z-index: 1000;
    
    &:hover {
      background: var(--secondary-color);
      transform: scale(1.1);
    }
    
    &.active {
      background: var(--danger-color);
      transform: rotate(90deg);
    }
  }
  
  .help-panel {
    position: fixed;
    top: 2rem;
    right: 2rem;
    width: 400px;
    max-height: calc(100vh - 4rem);
    background: white;
    border-radius: 0.5rem;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
    z-index: 999;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    
    .help-header {
      background: var(--light-color);
      padding: 1.5rem;
      border-bottom: 1px solid var(--border-color);
      
      h3 {
        margin: 0 0 1rem 0;
        color: var(--primary-color);
      }
      
      .help-tabs {
        display: flex;
        gap: 0.25rem;
        
        .help-tab {
          flex: 1;
          padding: 0.5rem;
          border: 1px solid var(--border-color);
          background: white;
          color: var(--dark-color);
          border-radius: 0.25rem;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.8rem;
          
          &:hover {
            border-color: var(--primary-color);
            color: var(--primary-color);
          }
          
          &.active {
            background: var(--primary-color);
            border-color: var(--primary-color);
            color: white;
          }
        }
      }
    }
    
    .help-content {
      flex: 1;
      overflow-y: auto;
      padding: 1.5rem;
      
      .help-section {
        h4 {
          color: var(--primary-color);
          margin: 0 0 1rem 0;
        }
        
        .quick-actions {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          
          .action-card {
            background: var(--light-color);
            padding: 1rem;
            border-radius: 0.5rem;
            cursor: pointer;
            transition: all 0.3s ease;
            text-align: center;
            
            &:hover {
              background: var(--primary-color);
              color: white;
              transform: translateY(-2px);
            }
            
            .action-icon {
              font-size: 2rem;
              margin-bottom: 0.5rem;
            }
            
            .action-content {
              h5 {
                margin: 0 0 0.25rem 0;
                font-size: 0.9rem;
              }
              
              p {
                margin: 0;
                font-size: 0.8rem;
                opacity: 0.8;
              }
            }
          }
        }
        
        .page-help-content {
          p {
            line-height: 1.6;
            margin-bottom: 1.5rem;
          }
          
          .help-sections {
            .help-section-item {
              background: var(--light-color);
              padding: 1rem;
              border-radius: 0.25rem;
              margin-bottom: 1rem;
              
              h5 {
                color: var(--secondary-color);
                margin: 0 0 0.5rem 0;
              }
              
              p {
                margin: 0 0 1rem 0;
                font-size: 0.9rem;
              }
              
              .help-steps {
                ol {
                  margin: 0;
                  padding-left: 1.5rem;
                  
                  li {
                    margin-bottom: 0.25rem;
                    font-size: 0.9rem;
                    color: #666;
                  }
                }
              }
            }
          }
          
          .help-tips {
            background: rgba(39, 174, 96, 0.1);
            padding: 1rem;
            border-radius: 0.25rem;
            border-left: 4px solid var(--success-color);
            
            h5 {
              color: var(--success-color);
              margin: 0 0 0.5rem 0;
            }
            
            ul {
              margin: 0;
              padding-left: 1.5rem;
              
              li {
                margin-bottom: 0.25rem;
                font-size: 0.9rem;
                color: #666;
              }
            }
          }
        }
        
        .tutorials-list {
          .tutorial-item {
            background: var(--light-color);
            padding: 1.5rem;
            border-radius: 0.5rem;
            margin-bottom: 1rem;
            
            .tutorial-header {
              display: flex;
              align-items: flex-start;
              margin-bottom: 1rem;
              
              .tutorial-icon {
                font-size: 2rem;
                margin-right: 1rem;
              }
              
              .tutorial-info {
                flex: 1;
                
                h5 {
                  margin: 0 0 0.5rem 0;
                  color: var(--primary-color);
                }
                
                p {
                  margin: 0 0 0.5rem 0;
                  font-size: 0.9rem;
                  color: #666;
                }
                
                .tutorial-meta {
                  display: flex;
                  gap: 0.5rem;
                  
                  .duration {
                    color: var(--secondary-color);
                    font-size: 0.8rem;
                  }
                  
                  .difficulty {
                    padding: 0.25rem 0.5rem;
                    border-radius: 1rem;
                    font-size: 0.7rem;
                    font-weight: bold;
                    
                    &.beginner {
                      background: var(--success-color);
                      color: white;
                    }
                    
                    &.intermediate {
                      background: var(--warning-color);
                      color: white;
                    }
                    
                    &.advanced {
                      background: var(--danger-color);
                      color: white;
                    }
                  }
                }
              }
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
              padding: 1rem;
              cursor: pointer;
              display: flex;
              justify-content: space-between;
              align-items: center;
              transition: background 0.3s ease;
              
              &:hover {
                background: rgba(52, 152, 219, 0.1);
              }
              
              h5 {
                margin: 0;
                color: var(--primary-color);
                font-size: 0.95rem;
              }
              
              .faq-toggle {
                font-size: 1.5rem;
                color: var(--secondary-color);
                font-weight: bold;
              }
            }
            
            .faq-answer {
              padding: 0 1rem 1rem 1rem;
              border-top: 1px solid var(--border-color);
              
              p {
                margin: 0 0 1rem 0;
                line-height: 1.6;
                color: #666;
                font-size: 0.9rem;
              }
              
              .related-links {
                h6 {
                  margin: 0 0 0.5rem 0;
                  color: var(--secondary-color);
                  font-size: 0.8rem;
                }
                
                .link-tags {
                  display: flex;
                  flex-wrap: wrap;
                  gap: 0.25rem;
                  
                  .link-tag {
                    background: var(--primary-color);
                    color: white;
                    padding: 0.25rem 0.5rem;
                    border-radius: 1rem;
                    font-size: 0.7rem;
                    cursor: pointer;
                    
                    &:hover {
                      background: var(--secondary-color);
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .help-system {
    .help-fab {
      bottom: 1rem;
      right: 1rem;
      width: 50px;
      height: 50px;
      font-size: 1.25rem;
    }
    
    .help-panel {
      top: 1rem;
      right: 1rem;
      left: 1rem;
      width: auto;
      max-height: calc(100vh - 2rem);
      
      .help-content {
        .quick-actions {
          grid-template-columns: 1fr;
        }
      }
    }
  }
}
</style>
