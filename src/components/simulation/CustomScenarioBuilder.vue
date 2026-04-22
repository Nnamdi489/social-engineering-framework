<template>
  <div class="custom-scenario-builder">
    <div class="builder-header">
      <h2>⚙️ Custom Scenario Builder</h2>
      <p>Create custom social engineering scenarios tailored to your specific needs</p>
    </div>

    <div class="scenario-wizard">
      <div class="wizard-steps">
        <div class="step" :class="{ active: currentStep === 1, completed: currentStep > 1 }">
          <div class="step-number">1</div>
          <div class="step-title">Basic Info</div>
        </div>
        <div class="step" :class="{ active: currentStep === 2, completed: currentStep > 2 }">
          <div class="step-number">2</div>
          <div class="step-title">Attack Vector</div>
        </div>
        <div class="step" :class="{ active: currentStep === 3, completed: currentStep > 3 }">
          <div class="step-number">3</div>
          <div class="step-title">Content</div>
        </div>
        <div class="step" :class="{ active: currentStep === 4 }">
          <div class="step-number">4</div>
          <div class="step-title">Review</div>
        </div>
      </div>

      <!-- Step 1: Basic Information -->
      <div v-if="currentStep === 1" class="wizard-step">
        <h3>Basic Scenario Information</h3>
        <div class="row">
          <div class="col-6">
            <div class="form-group">
              <label>Scenario Name</label>
              <input v-model="scenario.name" type="text" class="form-control" 
                     placeholder="Enter a descriptive name for your scenario">
            </div>
            
            <div class="form-group">
              <label>Description</label>
              <textarea v-model="scenario.description" class="form-control" rows="4"
                        placeholder="Describe the purpose and goals of this scenario"></textarea>
            </div>
            
            <div class="form-group">
              <label>Attack Category</label>
              <select v-model="scenario.category" class="form-control">
                <option value="">Select category</option>
                <option value="phishing">Phishing</option>
                <option value="pretexting">Pretexting</option>
                <option value="baiting">Baiting</option>
                <option value="quid-pro-quo">Quid Pro Quo</option>
                <option value="tailgating">Tailgating</option>
                <option value="hybrid">Hybrid Attack</option>
              </select>
            </div>
          </div>
          
          <div class="col-6">
            <div class="form-group">
              <label>Target Audience</label>
              <select v-model="scenario.targetAudience" class="form-control">
                <option value="">Select target audience</option>
                <option value="all-employees">All Employees</option>
                <option value="executives">Executives</option>
                <option value="it-staff">IT Staff</option>
                <option value="finance-team">Finance Team</option>
                <option value="hr-department">HR Department</option>
                <option value="customer-service">Customer Service</option>
                <option value="new-employees">New Employees</option>
              </select>
            </div>
            
            <div class="form-group">
              <label>Difficulty Level</label>
              <select v-model="scenario.difficulty" class="form-control">
                <option value="beginner">Beginner - Easy to detect</option>
                <option value="intermediate">Intermediate - Moderate difficulty</option>
                <option value="advanced">Advanced - Sophisticated attack</option>
                <option value="expert">Expert - Highly sophisticated</option>
              </select>
            </div>
            
            <div class="form-group">
              <label>Estimated Duration</label>
              <select v-model="scenario.duration" class="form-control">
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="60">1 hour</option>
                <option value="120">2 hours</option>
                <option value="240">4 hours</option>
                <option value="480">8 hours</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <!-- Step 2: Attack Vector -->
      <div v-if="currentStep === 2" class="wizard-step">
        <h3>Attack Vector Configuration</h3>
        <div class="attack-vectors">
          <div class="vector-selection">
            <h4>Primary Attack Vector</h4>
            <div class="vector-options">
              <div class="vector-option" v-for="vector in attackVectors" :key="vector.id"
                   @click="selectVector(vector.id)" :class="{ selected: scenario.primaryVector === vector.id }">
                <div class="vector-icon">{{ vector.icon }}</div>
                <h5>{{ vector.name }}</h5>
                <p>{{ vector.description }}</p>
              </div>
            </div>
          </div>
          
          <div class="vector-details" v-if="scenario.primaryVector">
            <h4>Vector Configuration</h4>
            <div class="vector-config">
              <div class="form-group" v-if="scenario.primaryVector === 'email'">
                <label>Email Type</label>
                <select v-model="scenario.vectorConfig.emailType" class="form-control">
                  <option value="phishing">Phishing Email</option>
                  <option value="spear-phishing">Spear Phishing</option>
                  <option value="business-email">Business Email Compromise</option>
                  <option value="newsletter">Fake Newsletter</option>
                </select>
              </div>
              
              <div class="form-group" v-if="scenario.primaryVector === 'phone'">
                <label>Call Type</label>
                <select v-model="scenario.vectorConfig.callType" class="form-control">
                  <option value="support">Technical Support</option>
                  <option value="survey">Survey/Research</option>
                  <option value="vendor">Vendor Call</option>
                  <option value="emergency">Emergency Call</option>
                </select>
              </div>
              
              <div class="form-group" v-if="scenario.primaryVector === 'physical'">
                <label>Physical Approach</label>
                <select v-model="scenario.vectorConfig.physicalType" class="form-control">
                  <option value="tailgating">Tailgating</option>
                  <option value="impersonation">Impersonation</option>
                  <option value="usb-drop">USB Drop</option>
                  <option value="shoulder-surfing">Shoulder Surfing</option>
                </select>
              </div>
              
              <div class="form-group">
                <label>Psychological Triggers</label>
                <div class="trigger-options">
                  <label class="checkbox-label" v-for="trigger in psychologicalTriggers" :key="trigger.id">
                    <input v-model="scenario.triggers" :value="trigger.id" type="checkbox">
                    {{ trigger.name }}
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Step 3: Content Creation -->
      <div v-if="currentStep === 3" class="wizard-step">
        <h3>Content Creation</h3>
        <div class="content-builder">
          <div class="row">
            <div class="col-6">
              <div class="content-form">
                <div class="form-group" v-if="scenario.primaryVector === 'email'">
                  <label>Email Subject</label>
                  <input v-model="scenario.content.subject" type="text" class="form-control"
                         placeholder="Enter email subject line">
                </div>
                
                <div class="form-group" v-if="scenario.primaryVector === 'email'">
                  <label>Sender Information</label>
                  <input v-model="scenario.content.sender" type="text" class="form-control"
                         placeholder="sender@example.com">
                </div>
                
                <div class="form-group">
                  <label>Main Content</label>
                  <textarea v-model="scenario.content.body" class="form-control" rows="8"
                            placeholder="Enter the main content of your scenario"></textarea>
                </div>
                
                <div class="form-group">
                  <label>Call to Action</label>
                  <input v-model="scenario.content.callToAction" type="text" class="form-control"
                         placeholder="What action should the target take?">
                </div>
                
                <div class="form-group">
                  <label>Urgency Level</label>
                  <select v-model="scenario.content.urgency" class="form-control">
                    <option value="low">Low - No time pressure</option>
                    <option value="medium">Medium - Some urgency</option>
                    <option value="high">High - Time-sensitive</option>
                    <option value="critical">Critical - Immediate action required</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div class="col-6">
              <div class="content-preview">
                <h4>Live Preview</h4>
                <div class="preview-container" :class="scenario.primaryVector">
                  <div v-if="scenario.primaryVector === 'email'" class="email-preview">
                    <div class="email-header">
                      <div><strong>From:</strong> {{ scenario.content.sender || 'sender@example.com' }}</div>
                      <div><strong>Subject:</strong> {{ scenario.content.subject || 'Subject line' }}</div>
                    </div>
                    <div class="email-body">
                      {{ scenario.content.body || 'Email content will appear here...' }}
                    </div>
                    <div class="email-action" v-if="scenario.content.callToAction">
                      <button class="action-button">{{ scenario.content.callToAction }}</button>
                    </div>
                  </div>
                  
                  <div v-if="scenario.primaryVector === 'phone'" class="phone-preview">
                    <div class="phone-script">
                      <h5>Phone Script Preview:</h5>
                      <p>{{ scenario.content.body || 'Phone script will appear here...' }}</p>
                    </div>
                  </div>
                  
                  <div v-if="scenario.primaryVector === 'physical'" class="physical-preview">
                    <div class="physical-scenario">
                      <h5>Physical Scenario:</h5>
                      <p>{{ scenario.content.body || 'Physical scenario description will appear here...' }}</p>
                    </div>
                  </div>
                </div>
                
                <div class="content-analysis">
                  <h5>Content Analysis</h5>
                  <div class="analysis-metrics">
                    <div class="metric">
                      <span class="metric-label">Sophistication:</span>
                      <span class="metric-value">{{ calculateSophistication() }}/10</span>
                    </div>
                    <div class="metric">
                      <span class="metric-label">Believability:</span>
                      <span class="metric-value">{{ calculateBelievability() }}/10</span>
                    </div>
                    <div class="metric">
                      <span class="metric-label">Risk Level:</span>
                      <span class="metric-value">{{ calculateRiskLevel() }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Step 4: Review and Deploy -->
      <div v-if="currentStep === 4" class="wizard-step">
        <h3>Review and Deploy</h3>
        <div class="scenario-review">
          <div class="review-summary">
            <h4>Scenario Summary</h4>
            <div class="summary-grid">
              <div class="summary-item">
                <strong>Name:</strong> {{ scenario.name }}
              </div>
              <div class="summary-item">
                <strong>Category:</strong> {{ scenario.category }}
              </div>
              <div class="summary-item">
                <strong>Target:</strong> {{ scenario.targetAudience }}
              </div>
              <div class="summary-item">
                <strong>Difficulty:</strong> {{ scenario.difficulty }}
              </div>
              <div class="summary-item">
                <strong>Duration:</strong> {{ scenario.duration }} minutes
              </div>
              <div class="summary-item">
                <strong>Vector:</strong> {{ getVectorName(scenario.primaryVector) }}
              </div>
            </div>
          </div>
          
          <div class="deployment-options">
            <h4>Deployment Options</h4>
            <div class="form-group">
              <label class="checkbox-label">
                <input v-model="deployment.immediate" type="checkbox">
                Deploy immediately
              </label>
            </div>
            <div class="form-group">
              <label class="checkbox-label">
                <input v-model="deployment.monitoring" type="checkbox">
                Enable real-time monitoring
              </label>
            </div>
            <div class="form-group">
              <label class="checkbox-label">
                <input v-model="deployment.alerts" type="checkbox">
                Send progress alerts
              </label>
            </div>
            <div class="form-group">
              <label class="checkbox-label">
                <input v-model="deployment.debrief" type="checkbox">
                Provide immediate debrief
              </label>
            </div>
          </div>
        </div>
      </div>

      <!-- Navigation -->
      <div class="wizard-navigation">
        <button @click="prevStep" v-if="currentStep > 1" class="btn btn-secondary" :disabled="isExecuting">← Previous</button>
        <button @click="nextStep" v-if="currentStep < 4" class="btn btn-primary" :disabled="!canProceed || isExecuting">
          Next →
        </button>
        <button @click="deployScenario" v-if="currentStep === 4" class="btn btn-primary" :disabled="isExecuting">
          <span v-if="!isExecuting">🚀 Deploy Scenario</span>
          <span v-else>⏳ Deploying...</span>
        </button>
      </div>

      <!-- Execution Progress -->
      <div v-if="isExecuting" class="execution-progress">
        <div class="progress-header">
          <h4>⚙️ Custom Scenario Deployment</h4>
          <span class="progress-percentage">{{ executionProgress }}%</span>
        </div>
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: executionProgress + '%' }"></div>
        </div>
        <div class="progress-status">{{ executionStatus }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CustomScenarioBuilder',
  data() {
    return {
      currentStep: 1,
      scenario: {
        name: '',
        description: '',
        category: '',
        targetAudience: '',
        difficulty: 'intermediate',
        duration: '30',
        primaryVector: '',
        vectorConfig: {},
        triggers: [],
        content: {
          subject: '',
          sender: '',
          body: '',
          callToAction: '',
          urgency: 'medium'
        }
      },
      deployment: {
        immediate: true,
        monitoring: true,
        alerts: true,
        debrief: true
      },
      isExecuting: false,
      executionProgress: 0,
      executionStatus: '',
      attackVectors: [
        {
          id: 'email',
          name: 'Email',
          icon: '📧',
          description: 'Email-based attacks including phishing and spear phishing'
        },
        {
          id: 'phone',
          name: 'Phone Call',
          icon: '📞',
          description: 'Voice-based social engineering attacks'
        },
        {
          id: 'physical',
          name: 'Physical',
          icon: '🚪',
          description: 'In-person social engineering attempts'
        },
        {
          id: 'social-media',
          name: 'Social Media',
          icon: '📱',
          description: 'Social media platform-based attacks'
        }
      ],
      psychologicalTriggers: [
        { id: 'authority', name: 'Authority' },
        { id: 'urgency', name: 'Urgency' },
        { id: 'fear', name: 'Fear' },
        { id: 'curiosity', name: 'Curiosity' },
        { id: 'greed', name: 'Greed' },
        { id: 'helpfulness', name: 'Helpfulness' },
        { id: 'social-proof', name: 'Social Proof' }
      ]
    }
  },
  computed: {
    canProceed() {
      switch (this.currentStep) {
        case 1:
          return this.scenario.name && this.scenario.category && this.scenario.targetAudience
        case 2:
          return this.scenario.primaryVector
        case 3:
          return this.scenario.content.body
        default:
          return true
      }
    }
  },
  methods: {
    nextStep() {
      if (this.currentStep < 4 && this.canProceed) {
        this.currentStep++
      }
    },
    prevStep() {
      if (this.currentStep > 1) {
        this.currentStep--
      }
    },
    selectVector(vectorId) {
      this.scenario.primaryVector = vectorId
      this.scenario.vectorConfig = {}
    },
    getVectorName(vectorId) {
      const vector = this.attackVectors.find(v => v.id === vectorId)
      return vector ? vector.name : vectorId
    },
    calculateSophistication() {
      let score = 5
      if (this.scenario.difficulty === 'advanced') score += 2
      if (this.scenario.difficulty === 'expert') score += 3
      if (this.scenario.triggers.length > 2) score += 1
      if (this.scenario.content.urgency === 'high') score += 1
      return Math.min(score, 10)
    },
    calculateBelievability() {
      let score = 6
      if (this.scenario.content.sender && this.scenario.content.sender.includes('@')) score += 1
      if (this.scenario.content.body.length > 100) score += 1
      if (this.scenario.content.urgency === 'low') score += 1
      return Math.min(score, 10)
    },
    calculateRiskLevel() {
      const sophistication = this.calculateSophistication()
      if (sophistication >= 8) return 'High'
      if (sophistication >= 6) return 'Medium'
      return 'Low'
    },
    deployScenario() {
      if (!confirm('Deploy custom scenario? This will start the simulation with your configured settings.')) {
        return
      }

      this.isExecuting = true
      this.executionProgress = 0
      this.executionStatus = 'Initializing custom scenario...'

      this.simulateCustomScenario()
    },

    simulateCustomScenario() {
      const steps = [
        { progress: 25, status: 'Validating scenario configuration...', delay: 1000 },
        { progress: 50, status: 'Preparing attack vectors...', delay: 1500 },
        { progress: 75, status: 'Deploying custom scenario...', delay: 2000 },
        { progress: 100, status: 'Custom scenario deployed successfully!', delay: 1000 }
      ]

      let currentStep = 0

      const executeStep = () => {
        if (currentStep < steps.length) {
          const step = steps[currentStep]
          this.executionProgress = step.progress
          this.executionStatus = step.status

          setTimeout(() => {
            currentStep++
            if (currentStep < steps.length) {
              executeStep()
            } else {
              this.completeDeployment()
            }
          }, step.delay)
        }
      }

      executeStep()
    },

    completeDeployment() {
      const results = this.generateCustomResults()
      this.showDeploymentResults(results)

      this.$emit('simulation-started', {
        type: 'custom',
        config: this.scenario,
        deployment: this.deployment,
        results: results
      })

      setTimeout(() => {
        this.isExecuting = false
        this.executionProgress = 0
        this.executionStatus = ''
      }, 2000)
    },

    generateCustomResults() {
      const participants = Math.floor(Math.random() * 30) + 10 // 10-40 participants
      const successRate = Math.floor(Math.random() * 40) + 15 // 15-55% success rate
      const detectionRate = Math.floor(Math.random() * 35) + 65 // 65-100% detection rate

      return {
        id: `CUSTOM-${Date.now()}`,
        timestamp: new Date().toLocaleString(),
        scenarioType: this.scenario.category,
        participants,
        successRate,
        detectionRate,
        sophistication: this.calculateSophistication(),
        believability: this.calculateBelievability(),
        avgResponseTime: (Math.random() * 4 + 2).toFixed(1) + 's'
      }
    },

    showDeploymentResults(results) {
      const message = `
⚙️ Custom Scenario Deployed!

📊 Scenario Results:
• Type: ${results.scenarioType}
• Participants: ${results.participants}
• Success Rate: ${results.successRate}%
• Detection Rate: ${results.detectionRate}%

🎯 Quality Metrics:
• Sophistication: ${results.sophistication}/10
• Believability: ${results.believability}/10
• Response Time: ${results.avgResponseTime}

Scenario ID: ${results.id}
      `

      alert(message)
    },

    calculateSophistication() {
      let score = 5 // Base score

      // Add points for complexity
      if (this.scenario.description.length > 100) score += 1
      if (this.scenario.objectives.length > 2) score += 1
      if (this.scenario.category === 'advanced') score += 2
      if (this.deployment.monitoring) score += 1

      return Math.min(score, 10)
    },

    calculateBelievability() {
      let score = 6 // Base score

      // Add points for realism
      if (this.scenario.description.includes('company') || this.scenario.description.includes('organization')) score += 1
      if (this.scenario.urgency === 'high') score -= 1 // High urgency can seem suspicious
      if (this.scenario.urgency === 'medium') score += 1
      if (this.deployment.timing === 'business-hours') score += 1

      return Math.min(Math.max(score, 1), 10)
    }
  }
}
</script>

<style lang="scss" scoped>
.custom-scenario-builder {
  .builder-header {
    text-align: center;
    margin-bottom: 2rem;
    
    h2 {
      color: var(--primary-color);
      margin-bottom: 0.5rem;
    }
    
    p {
      color: #666;
    }
  }
  
  .wizard-steps {
    display: flex;
    justify-content: center;
    margin-bottom: 3rem;
    
    .step {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 0 2rem;
      position: relative;
      
      &:not(:last-child)::after {
        content: '';
        position: absolute;
        top: 1.5rem;
        left: 100%;
        width: 4rem;
        height: 2px;
        background: var(--border-color);
      }
      
      &.completed::after {
        background: var(--success-color);
      }
      
      .step-number {
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
        background: var(--border-color);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        margin-bottom: 0.5rem;
      }
      
      &.active .step-number {
        background: var(--secondary-color);
      }
      
      &.completed .step-number {
        background: var(--success-color);
      }
      
      .step-title {
        font-size: 0.9rem;
        color: #666;
        text-align: center;
      }
      
      &.active .step-title {
        color: var(--secondary-color);
        font-weight: 600;
      }
    }
  }
  
  .wizard-step {
    background: var(--light-color);
    padding: 2rem;
    border-radius: 0.5rem;
    margin-bottom: 2rem;
    min-height: 500px;
    
    h3 {
      color: var(--primary-color);
      margin-bottom: 1.5rem;
      text-align: center;
    }
  }
  
  .form-group {
    margin-bottom: 1rem;
    
    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
      color: var(--dark-color);
      
      &.checkbox-label {
        display: flex;
        align-items: center;
        margin-bottom: 0.5rem;
        
        input[type="checkbox"] {
          margin-right: 0.5rem;
        }
      }
    }
    
    .form-control {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid var(--border-color);
      border-radius: 0.375rem;
      font-size: 1rem;
      
      &:focus {
        outline: none;
        border-color: var(--secondary-color);
        box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
      }
    }
    
    textarea.form-control {
      resize: vertical;
      min-height: 100px;
    }
    
    .trigger-options {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 0.5rem;
      margin-top: 0.5rem;
    }
  }
  
  .vector-options {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin-bottom: 2rem;
    
    .vector-option {
      background: white;
      padding: 1.5rem;
      border-radius: 0.5rem;
      text-align: center;
      cursor: pointer;
      transition: all 0.3s ease;
      border: 2px solid transparent;
      
      &:hover {
        transform: translateY(-2px);
        box-shadow: var(--shadow);
      }
      
      &.selected {
        border-color: var(--secondary-color);
        background: rgba(52, 152, 219, 0.1);
      }
      
      .vector-icon {
        font-size: 2rem;
        margin-bottom: 1rem;
      }
      
      h5 {
        color: var(--primary-color);
        margin-bottom: 0.5rem;
      }
      
      p {
        color: #666;
        font-size: 0.9rem;
      }
    }
  }
  
  .vector-config {
    background: white;
    padding: 1.5rem;
    border-radius: 0.5rem;
  }
  
  .content-preview {
    background: white;
    padding: 1.5rem;
    border-radius: 0.5rem;
    height: fit-content;
    
    h4 {
      color: var(--secondary-color);
      margin-bottom: 1rem;
    }
    
    .preview-container {
      border: 1px solid var(--border-color);
      border-radius: 0.25rem;
      padding: 1rem;
      margin-bottom: 1rem;
      min-height: 200px;
      
      .email-preview {
        .email-header {
          background: var(--light-color);
          padding: 0.75rem;
          border-radius: 0.25rem;
          margin-bottom: 1rem;
          font-size: 0.9rem;
        }
        
        .email-body {
          line-height: 1.6;
          margin-bottom: 1rem;
        }
        
        .email-action {
          text-align: center;
          
          .action-button {
            background: var(--secondary-color);
            color: white;
            padding: 0.75rem 1.5rem;
            border: none;
            border-radius: 0.375rem;
            cursor: pointer;
          }
        }
      }
      
      .phone-preview,
      .physical-preview {
        .phone-script,
        .physical-scenario {
          h5 {
            color: var(--primary-color);
            margin-bottom: 0.5rem;
          }
          
          p {
            line-height: 1.6;
            font-style: italic;
          }
        }
      }
    }
    
    .content-analysis {
      .analysis-metrics {
        .metric {
          display: flex;
          justify-content: space-between;
          padding: 0.5rem 0;
          border-bottom: 1px solid var(--light-color);
          
          &:last-child {
            border-bottom: none;
          }
          
          .metric-label {
            font-weight: 500;
          }
          
          .metric-value {
            color: var(--secondary-color);
            font-weight: bold;
          }
        }
      }
    }
  }
  
  .scenario-review {
    .review-summary {
      background: white;
      padding: 1.5rem;
      border-radius: 0.5rem;
      margin-bottom: 2rem;
      
      h4 {
        color: var(--primary-color);
        margin-bottom: 1rem;
      }
      
      .summary-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;
        
        .summary-item {
          padding: 0.75rem;
          background: var(--light-color);
          border-radius: 0.25rem;
        }
      }
    }
    
    .deployment-options {
      background: white;
      padding: 1.5rem;
      border-radius: 0.5rem;
      
      h4 {
        color: var(--secondary-color);
        margin-bottom: 1rem;
      }
    }
  }
  
  .wizard-navigation {
    display: flex;
    justify-content: center;
    gap: 1rem;

    .btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }

  .execution-progress {
    background: white;
    padding: 2rem;
    border-radius: 0.5rem;
    margin: 2rem 0;
    box-shadow: var(--shadow);
    border-left: 4px solid var(--secondary-color);

    .progress-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;

      h4 {
        color: var(--primary-color);
        margin: 0;
      }

      .progress-percentage {
        font-size: 1.25rem;
        font-weight: bold;
        color: var(--secondary-color);
      }
    }

    .progress-bar {
      width: 100%;
      height: 12px;
      background: var(--light-color);
      border-radius: 6px;
      overflow: hidden;
      margin-bottom: 1rem;

      .progress-fill {
        height: 100%;
        background: linear-gradient(90deg, var(--secondary-color), var(--primary-color));
        transition: width 0.5s ease;
        border-radius: 6px;
      }
    }

    .progress-status {
      color: #666;
      font-style: italic;
      text-align: center;
    }
  }
}

@media (max-width: 768px) {
  .custom-scenario-builder {
    .wizard-steps {
      flex-wrap: wrap;
      
      .step {
        margin: 0.5rem;
        
        &:not(:last-child)::after {
          display: none;
        }
      }
    }
    
    .vector-options {
      grid-template-columns: 1fr;
    }
    
    .wizard-navigation {
      flex-direction: column;
      align-items: center;
    }
  }
}
</style>
