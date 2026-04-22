<template>
  <div v-if="visible" class="glossary-modal-overlay" @click="closeModal">
    <div class="glossary-modal" @click.stop>
      <div class="modal-header">
        <h2>📚 Security Terminology Glossary</h2>
        <button @click="closeModal" class="close-btn">×</button>
      </div>
      
      <div class="modal-body">
        <div class="search-section">
          <div class="search-box">
            <input 
              v-model="searchQuery" 
              type="text" 
              placeholder="Search terms..." 
              class="search-input"
            >
            <span class="search-icon">🔍</span>
          </div>
          
          <div class="category-filters">
            <button 
              v-for="category in categories" 
              :key="category.id"
              @click="selectedCategory = category.id"
              :class="['category-btn', { active: selectedCategory === category.id }]"
            >
              {{ category.icon }} {{ category.name }}
            </button>
          </div>
        </div>
        
        <div class="glossary-content">
          <div class="terms-list">
            <div 
              v-for="term in filteredTerms" 
              :key="term.id"
              class="term-item"
              :class="{ highlighted: highlightedTerm === term.id }"
            >
              <div class="term-header">
                <h3>{{ term.name }}</h3>
                <div class="term-meta">
                  <span class="term-category">{{ getCategoryName(term.category) }}</span>
                  <span class="term-difficulty" :class="term.difficulty.toLowerCase()">
                    {{ term.difficulty }}
                  </span>
                </div>
              </div>
              
              <div class="term-content">
                <p class="term-definition">{{ term.definition }}</p>
                
                <div v-if="term.examples && term.examples.length > 0" class="term-examples">
                  <h4>Examples:</h4>
                  <ul>
                    <li v-for="example in term.examples" :key="example">{{ example }}</li>
                  </ul>
                </div>
                
                <div v-if="term.context" class="term-context">
                  <h4>Context in Framework:</h4>
                  <p>{{ term.context }}</p>
                </div>
                
                <div v-if="term.relatedTerms && term.relatedTerms.length > 0" class="related-terms">
                  <h4>Related Terms:</h4>
                  <div class="related-tags">
                    <span 
                      v-for="relatedId in term.relatedTerms" 
                      :key="relatedId"
                      class="related-tag"
                      @click="scrollToTerm(relatedId)"
                    >
                      {{ getTermName(relatedId) }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GlossaryModal',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    highlightTerm: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      searchQuery: '',
      selectedCategory: 'all',
      highlightedTerm: null,
      categories: [
        { id: 'all', name: 'All Terms', icon: '📚' },
        { id: 'attacks', name: 'Attack Types', icon: '🎯' },
        { id: 'defense', name: 'Defense', icon: '🛡️' },
        { id: 'metrics', name: 'Metrics', icon: '📊' },
        { id: 'technical', name: 'Technical', icon: '🔧' },
        { id: 'process', name: 'Process', icon: '📋' }
      ],
      terms: [
        {
          id: 'phishing',
          name: 'Phishing',
          category: 'attacks',
          difficulty: 'Beginner',
          definition: 'A cyber attack that uses fraudulent emails, websites, or messages to trick people into revealing sensitive information like passwords, credit card numbers, or personal data.',
          examples: [
            'Fake bank emails asking for account verification',
            'Fraudulent login pages that steal credentials',
            'Emails claiming urgent security updates'
          ],
          context: 'In our framework, phishing simulations test how well users can identify and report suspicious emails.',
          relatedTerms: ['spear-phishing', 'detection-rate', 'success-rate']
        },
        {
          id: 'spear-phishing',
          name: 'Spear Phishing',
          category: 'attacks',
          difficulty: 'Intermediate',
          definition: 'A targeted phishing attack that focuses on specific individuals or organizations, using personalized information to appear more legitimate.',
          examples: [
            'Emails using your name and company details',
            'Messages referencing recent company events',
            'Fake communications from known colleagues'
          ],
          context: 'Our spear phishing simulator allows you to create highly targeted attacks using gathered intelligence.',
          relatedTerms: ['phishing', 'social-engineering', 'target-intelligence']
        },
        {
          id: 'pretexting',
          name: 'Pretexting',
          category: 'attacks',
          difficulty: 'Intermediate',
          definition: 'A social engineering technique where attackers create a fabricated scenario (pretext) to engage victims and extract information.',
          examples: [
            'Impersonating IT support to request passwords',
            'Posing as a vendor to gather company information',
            'Fake surveys to collect personal details'
          ],
          context: 'The pretexting simulator helps test how well staff verify identities before sharing information.',
          relatedTerms: ['social-engineering', 'verification-procedures', 'authority-exploitation']
        },
        {
          id: 'baiting',
          name: 'Baiting',
          category: 'attacks',
          difficulty: 'Beginner',
          definition: 'A social engineering attack that uses physical or digital "bait" to entice victims into compromising their security.',
          examples: [
            'USB drives left in parking lots',
            'Free software downloads with malware',
            'Attractive email attachments'
          ],
          context: 'Our baiting simulator tests how users respond to suspicious files and physical media.',
          relatedTerms: ['social-engineering', 'malware', 'endpoint-protection']
        },
        {
          id: 'success-rate',
          name: 'Success Rate',
          category: 'metrics',
          difficulty: 'Beginner',
          definition: 'The percentage of attack attempts that successfully compromise their targets or achieve their objectives.',
          examples: [
            '15% success rate means 15 out of 100 attempts succeeded',
            'Lower success rates indicate better security',
            'Measured across different attack types'
          ],
          context: 'Success rates help measure the effectiveness of both attacks and defenses in our simulations.',
          relatedTerms: ['detection-rate', 'false-positive', 'effectiveness']
        },
        {
          id: 'detection-rate',
          name: 'Detection Rate',
          category: 'metrics',
          difficulty: 'Beginner',
          definition: 'The percentage of attacks that are successfully identified and flagged by security systems or users.',
          examples: [
            '94% detection rate means 94 out of 100 attacks were caught',
            'Higher detection rates indicate better security',
            'Includes both automated and human detection'
          ],
          context: 'Detection rates measure how well our security controls identify social engineering attempts.',
          relatedTerms: ['success-rate', 'false-positive', 'true-positive']
        },
        {
          id: 'false-positive',
          name: 'False Positive',
          category: 'metrics',
          difficulty: 'Intermediate',
          definition: 'When a security system incorrectly identifies legitimate content or behavior as malicious or suspicious.',
          examples: [
            'Legitimate emails marked as phishing',
            'Normal user behavior flagged as suspicious',
            'Safe websites blocked as malicious'
          ],
          context: 'We track false positives to ensure our detection systems don\'t disrupt normal business operations.',
          relatedTerms: ['true-positive', 'detection-rate', 'accuracy']
        },
        {
          id: 'social-engineering',
          name: 'Social Engineering',
          category: 'attacks',
          difficulty: 'Beginner',
          definition: 'The use of psychological manipulation to trick people into divulging confidential information or performing actions that compromise security.',
          examples: [
            'Pretending to be IT support to get passwords',
            'Creating urgency to bypass security procedures',
            'Building trust to extract sensitive information'
          ],
          context: 'This framework focuses specifically on defending against various social engineering techniques.',
          relatedTerms: ['phishing', 'pretexting', 'authority-exploitation']
        },
        {
          id: 'multi-factor-authentication',
          name: 'Multi-Factor Authentication (MFA)',
          category: 'defense',
          difficulty: 'Intermediate',
          definition: 'A security method that requires users to provide two or more verification factors to gain access to accounts or systems.',
          examples: [
            'Password + SMS code',
            'Biometric + smart card',
            'App notification + PIN'
          ],
          context: 'MFA is a critical defense layer that significantly reduces the impact of credential theft.',
          relatedTerms: ['authentication', 'verification-procedures', 'technical-controls']
        },
        {
          id: 'endpoint-protection',
          name: 'Endpoint Protection',
          category: 'defense',
          difficulty: 'Advanced',
          definition: 'Security solutions that protect individual devices (endpoints) like computers, phones, and tablets from cyber threats.',
          examples: [
            'Antivirus software with behavioral analysis',
            'Device encryption and access controls',
            'Application whitelisting and monitoring'
          ],
          context: 'Endpoint protection helps detect and prevent malware delivered through social engineering attacks.',
          relatedTerms: ['behavioral-analysis', 'malware', 'technical-controls']
        },
        {
          id: 'click-rate',
          name: 'Click Rate',
          category: 'metrics',
          difficulty: 'Beginner',
          definition: 'The percentage of recipients who click on links in phishing emails or interact with malicious content.',
          examples: [
            '15% click rate means 15 out of 100 people clicked the link',
            'Lower click rates indicate better user awareness',
            'Tracked in phishing simulations'
          ],
          context: 'Click rates help measure user susceptibility to phishing attacks in our simulations.',
          relatedTerms: ['phishing', 'success-rate', 'user-awareness']
        },
        {
          id: 'behavioral-analysis',
          name: 'Behavioral Analysis',
          category: 'technical',
          difficulty: 'Advanced',
          definition: 'Security technique that monitors user and system behavior to detect anomalies that may indicate compromise.',
          examples: [
            'Unusual login times or locations',
            'Abnormal file access patterns',
            'Suspicious network communications'
          ],
          context: 'Behavioral analysis helps detect when social engineering attacks have succeeded.',
          relatedTerms: ['endpoint-protection', 'anomaly-detection', 'technical-controls']
        },
        {
          id: 'verification-procedures',
          name: 'Verification Procedures',
          category: 'process',
          difficulty: 'Intermediate',
          definition: 'Formal processes to confirm the identity of requesters and legitimacy of requests before taking action.',
          examples: [
            'Calling back on a known number to verify requests',
            'Using separate communication channels',
            'Requiring manager approval for sensitive actions'
          ],
          context: 'Verification procedures are critical for preventing pretexting and business email compromise.',
          relatedTerms: ['pretexting', 'authority-exploitation', 'process-controls']
        },
        {
          id: 'authority-exploitation',
          name: 'Authority Exploitation',
          category: 'attacks',
          difficulty: 'Intermediate',
          definition: 'Social engineering technique where attackers impersonate or claim authority to pressure victims into compliance.',
          examples: [
            'Impersonating executives or managers',
            'Claiming to be from IT, legal, or compliance',
            'Using official-sounding titles and urgency'
          ],
          context: 'Our pretexting simulations test how well staff verify authority claims.',
          relatedTerms: ['pretexting', 'verification-procedures', 'social-engineering']
        },
        {
          id: 'incident-response',
          name: 'Incident Response',
          category: 'process',
          difficulty: 'Advanced',
          definition: 'Organized approach to addressing and managing security incidents to limit damage and reduce recovery time.',
          examples: [
            'Detecting and containing security breaches',
            'Investigating attack methods and scope',
            'Recovering systems and preventing recurrence'
          ],
          context: 'Our framework includes incident response procedures for when social engineering attacks succeed.',
          relatedTerms: ['detection-rate', 'containment', 'forensic-analysis']
        },
        {
          id: 'security-awareness',
          name: 'Security Awareness',
          category: 'defense',
          difficulty: 'Beginner',
          definition: 'Knowledge and understanding of security threats, risks, and appropriate protective measures.',
          examples: [
            'Recognizing phishing email indicators',
            'Understanding social engineering tactics',
            'Knowing how to report suspicious activities'
          ],
          context: 'Security awareness training is a key component of our defense strategy.',
          relatedTerms: ['user-training', 'phishing-simulation', 'security-culture']
        }
      ]
    }
  },
  computed: {
    filteredTerms() {
      let filtered = this.terms
      
      // Filter by category
      if (this.selectedCategory !== 'all') {
        filtered = filtered.filter(term => term.category === this.selectedCategory)
      }
      
      // Filter by search query
      if (this.searchQuery.trim()) {
        const query = this.searchQuery.toLowerCase()
        filtered = filtered.filter(term => 
          term.name.toLowerCase().includes(query) ||
          term.definition.toLowerCase().includes(query) ||
          term.examples.some(example => example.toLowerCase().includes(query))
        )
      }
      
      return filtered.sort((a, b) => a.name.localeCompare(b.name))
    }
  },
  watch: {
    highlightTerm(newTerm) {
      if (newTerm) {
        this.highlightedTerm = newTerm
        this.scrollToTerm(newTerm)
      }
    }
  },
  methods: {
    closeModal() {
      this.$emit('close')
    },
    getCategoryName(categoryId) {
      const category = this.categories.find(cat => cat.id === categoryId)
      return category ? category.name : categoryId
    },
    getTermName(termId) {
      const term = this.terms.find(t => t.id === termId)
      return term ? term.name : termId
    },
    scrollToTerm(termId) {
      this.highlightedTerm = termId
      this.$nextTick(() => {
        const element = document.querySelector(`[data-term-id="${termId}"]`)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      })
    }
  },
  emits: ['close']
}
</script>

<style lang="scss" scoped>
.glossary-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 2rem;
}

.glossary-modal {
  background: white;
  border-radius: 0.5rem;
  width: 100%;
  max-width: 900px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid var(--border-color);
  background: var(--light-color);
  border-radius: 0.5rem 0.5rem 0 0;
  
  h2 {
    margin: 0;
    color: var(--primary-color);
  }
  
  .close-btn {
    background: none;
    border: none;
    font-size: 2rem;
    color: #666;
    cursor: pointer;
    padding: 0;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    
    &:hover {
      background: var(--danger-color);
      color: white;
    }
  }
}

.modal-body {
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.search-section {
  padding: 1.5rem;
  border-bottom: 1px solid var(--border-color);
  
  .search-box {
    position: relative;
    margin-bottom: 1rem;
    
    .search-input {
      width: 100%;
      padding: 0.75rem 2.5rem 0.75rem 1rem;
      border: 1px solid var(--border-color);
      border-radius: 0.5rem;
      font-size: 1rem;
      
      &:focus {
        outline: none;
        border-color: var(--primary-color);
        box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
      }
    }
    
    .search-icon {
      position: absolute;
      right: 1rem;
      top: 50%;
      transform: translateY(-50%);
      color: #666;
    }
  }
  
  .category-filters {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    
    .category-btn {
      padding: 0.5rem 1rem;
      border: 1px solid var(--border-color);
      background: white;
      color: var(--dark-color);
      border-radius: 1rem;
      cursor: pointer;
      transition: all 0.3s ease;
      font-size: 0.9rem;
      
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

.glossary-content {
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
}

.terms-list {
  .term-item {
    margin-bottom: 2rem;
    padding: 1.5rem;
    background: var(--light-color);
    border-radius: 0.5rem;
    border-left: 4px solid var(--secondary-color);
    transition: all 0.3s ease;
    
    &.highlighted {
      border-left-color: var(--warning-color);
      background: rgba(243, 156, 18, 0.1);
      transform: scale(1.02);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    
    .term-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 1rem;
      
      h3 {
        margin: 0;
        color: var(--primary-color);
        font-size: 1.25rem;
      }
      
      .term-meta {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 0.25rem;
        
        .term-category {
          background: var(--secondary-color);
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 1rem;
          font-size: 0.8rem;
        }
        
        .term-difficulty {
          padding: 0.25rem 0.75rem;
          border-radius: 1rem;
          font-size: 0.8rem;
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
    
    .term-content {
      .term-definition {
        font-size: 1rem;
        line-height: 1.6;
        margin-bottom: 1rem;
        color: #333;
      }
      
      .term-examples,
      .term-context,
      .related-terms {
        margin-bottom: 1rem;
        
        h4 {
          color: var(--secondary-color);
          margin: 0 0 0.5rem 0;
          font-size: 0.95rem;
        }
        
        p {
          margin: 0;
          color: #666;
          line-height: 1.5;
        }
        
        ul {
          margin: 0;
          padding-left: 1.5rem;
          
          li {
            margin-bottom: 0.25rem;
            color: #666;
          }
        }
      }
      
      .related-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.25rem;
        
        .related-tag {
          background: var(--primary-color);
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 1rem;
          font-size: 0.8rem;
          cursor: pointer;
          transition: background 0.3s ease;
          
          &:hover {
            background: var(--secondary-color);
          }
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .glossary-modal-overlay {
    padding: 1rem;
  }
  
  .glossary-modal {
    max-height: 95vh;
  }
  
  .search-section {
    .category-filters {
      .category-btn {
        flex: 1;
        min-width: calc(50% - 0.25rem);
        text-align: center;
      }
    }
  }
  
  .term-header {
    flex-direction: column;
    align-items: flex-start;
    
    .term-meta {
      align-items: flex-start;
      flex-direction: row;
      margin-top: 0.5rem;
    }
  }
}
</style>
