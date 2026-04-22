<template>
  <div class="pretexting-simulator">
    <div class="simulator-header">
      <h2>🎭 Pretexting Simulator</h2>
      <p>Create fabricated scenarios to test social engineering awareness through deceptive communication</p>
    </div>

    <div class="scenario-builder">
      <div class="row">
        <div class="col-6">
          <div class="scenario-config">
            <h3>Scenario Configuration</h3>
            
            <div class="form-group">
              <label>Scenario Type</label>
              <select v-model="scenario.type" class="form-control" @change="loadScenarioTemplate">
                <option value="">Select scenario type</option>
                <option v-for="type in scenarioTypes" :key="type.id" :value="type.id">
                  {{ type.name }}
                </option>
              </select>
            </div>
            
            <div class="form-group">
              <label>Impersonation Role</label>
              <select v-model="scenario.role" class="form-control">
                <option value="">Select role</option>
                <option value="it-support">IT Support Technician</option>
                <option value="vendor">External Vendor</option>
                <option value="executive">Company Executive</option>
                <option value="customer">Customer Service</option>
                <option value="auditor">Security Auditor</option>
                <option value="contractor">External Contractor</option>
              </select>
            </div>
            
            <div class="form-group">
              <label>Communication Method</label>
              <select v-model="scenario.method" class="form-control">
                <option value="phone">Phone Call</option>
                <option value="email">Email Exchange</option>
                <option value="in-person">In-Person Visit</option>
                <option value="chat">Instant Message</option>
              </select>
            </div>
            
            <div class="form-group">
              <label>Target Department</label>
              <select v-model="scenario.department" class="form-control">
                <option value="">Select department</option>
                <option value="hr">Human Resources</option>
                <option value="finance">Finance</option>
                <option value="it">IT Department</option>
                <option value="reception">Reception/Front Desk</option>
                <option value="security">Security</option>
                <option value="operations">Operations</option>
              </select>
            </div>
            
            <div class="form-group">
              <label>Objective</label>
              <select v-model="scenario.objective" class="form-control">
                <option value="">Select objective</option>
                <option value="credentials">Obtain Login Credentials</option>
                <option value="information">Extract Sensitive Information</option>
                <option value="access">Gain Physical Access</option>
                <option value="bypass">Bypass Security Procedures</option>
                <option value="install">Install Malicious Software</option>
                <option value="transfer">Initiate Unauthorized Transfer</option>
              </select>
            </div>
          </div>
        </div>
        
        <div class="col-6">
          <div class="scenario-details">
            <h3>Scenario Details</h3>
            
            <div class="form-group">
              <label>Scenario Name</label>
              <input v-model="scenario.name" type="text" class="form-control" placeholder="Enter scenario name">
            </div>
            
            <div class="form-group">
              <label>Backstory</label>
              <textarea v-model="scenario.backstory" class="form-control" rows="4" 
                        placeholder="Describe the fabricated situation or emergency"></textarea>
            </div>
            
            <div class="form-group">
              <label>Authority Claims</label>
              <div class="authority-options">
                <label class="checkbox-label" v-for="authority in authorityOptions" :key="authority.id">
                  <input v-model="scenario.authorities" :value="authority.id" type="checkbox">
                  {{ authority.name }}
                </label>
              </div>
            </div>
            
            <div class="form-group">
              <label>Urgency Tactics</label>
              <div class="urgency-options">
                <label class="checkbox-label" v-for="tactic in urgencyTactics" :key="tactic.id">
                  <input v-model="scenario.urgencyTactics" :value="tactic.id" type="checkbox">
                  {{ tactic.name }}
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="scenario-preview" v-if="scenario.type">
      <h3>Scenario Preview</h3>
      <div class="preview-container">
        <div class="scenario-card">
          <div class="scenario-header">
            <div class="role-badge">{{ getRoleName(scenario.role) }}</div>
            <div class="method-badge">{{ getMethodName(scenario.method) }}</div>
          </div>
          
          <div class="scenario-content">
            <h4>{{ scenario.name || 'Untitled Scenario' }}</h4>
            <div class="scenario-description">
              <strong>Situation:</strong> {{ scenario.backstory || 'No backstory provided' }}
            </div>
            
            <div class="scenario-script" v-if="generatedScript">
              <h5>Sample Script:</h5>
              <div class="script-content">{{ generatedScript }}</div>
            </div>
            
            <div class="scenario-indicators">
              <h5>Red Flags to Watch For:</h5>
              <ul>
                <li v-for="indicator in getRedFlags()" :key="indicator">{{ indicator }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="execution-settings">
      <h3>Execution Settings</h3>
      <div class="row">
        <div class="col-4">
          <div class="setting-group">
            <label>Duration</label>
            <select v-model="execution.duration" class="form-control">
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
              <option value="60">1 hour</option>
              <option value="120">2 hours</option>
            </select>
          </div>
        </div>
        
        <div class="col-4">
          <div class="setting-group">
            <label>Difficulty Level</label>
            <select v-model="execution.difficulty" class="form-control">
              <option value="easy">Easy - Obvious pretexting</option>
              <option value="medium">Medium - Believable scenario</option>
              <option value="hard">Hard - Sophisticated deception</option>
            </select>
          </div>
        </div>
        
        <div class="col-4">
          <div class="setting-group">
            <label>Success Criteria</label>
            <select v-model="execution.successCriteria" class="form-control">
              <option value="information">Information Disclosed</option>
              <option value="action">Action Performed</option>
              <option value="access">Access Granted</option>
              <option value="compliance">Policy Bypassed</option>
            </select>
          </div>
        </div>
      </div>
      
      <div class="execution-options">
        <label class="checkbox-label">
          <input v-model="execution.recordSession" type="checkbox">
          Record session for training purposes
        </label>
        <label class="checkbox-label">
          <input v-model="execution.realTimeMonitoring" type="checkbox">
          Enable real-time monitoring
        </label>
        <label class="checkbox-label">
          <input v-model="execution.immediateDebrief" type="checkbox">
          Provide immediate debrief after scenario
        </label>
      </div>
    </div>

    <div class="simulation-actions">
      <button @click="previewScenario" class="btn btn-secondary" :disabled="!isScenarioValid || isExecuting">
        👁️ Preview Scenario
      </button>
      <button @click="startSimulation" class="btn btn-primary" :disabled="!isScenarioValid || isExecuting">
        <span v-if="!isExecuting">🎭 Start Pretexting Simulation</span>
        <span v-else>⏳ Executing...</span>
      </button>
      <button @click="saveTemplate" class="btn btn-secondary" :disabled="isExecuting">
        💾 Save as Template
      </button>
    </div>

    <!-- Execution Progress -->
    <div v-if="isExecuting" class="execution-progress">
      <div class="progress-header">
        <h4>🎭 Pretexting Scenario in Progress</h4>
        <span class="progress-percentage">{{ executionProgress }}%</span>
      </div>
      <div class="progress-bar">
        <div class="progress-fill" :style="{ width: executionProgress + '%' }"></div>
      </div>
      <div class="progress-status">{{ executionStatus }}</div>
    </div>

    <div class="scenario-templates" v-if="savedTemplates.length > 0">
      <h3>Saved Templates</h3>
      <div class="templates-grid">
        <div class="template-card" v-for="template in savedTemplates" :key="template.id">
          <div class="template-header">
            <h4>{{ template.name }}</h4>
            <div class="template-meta">
              <span class="template-type">{{ template.type }}</span>
              <span class="template-difficulty">{{ template.difficulty }}</span>
            </div>
          </div>
          <div class="template-description">{{ template.description }}</div>
          <div class="template-stats">
            <span class="stat">📊 {{ template.successRate }}% success rate</span>
            <span class="stat">🎯 {{ template.timesUsed }} times used</span>
          </div>
          <div class="template-actions">
            <button @click="loadTemplate(template.id)" class="btn btn-secondary">Load</button>
            <button @click="editTemplate(template.id)" class="btn btn-primary">Edit</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PretextingSimulator',
  data() {
    return {
      scenario: {
        type: '',
        role: '',
        method: 'phone',
        department: '',
        objective: '',
        name: '',
        backstory: '',
        authorities: [],
        urgencyTactics: []
      },
      execution: {
        duration: '30',
        difficulty: 'medium',
        successCriteria: 'information',
        recordSession: true,
        realTimeMonitoring: true,
        immediateDebrief: true
      },
      isExecuting: false,
      executionProgress: 0,
      executionStatus: '',
      scenarioTypes: [
        { id: 'emergency', name: 'Emergency Situation' },
        { id: 'technical-support', name: 'Technical Support' },
        { id: 'vendor-verification', name: 'Vendor Verification' },
        { id: 'compliance-audit', name: 'Compliance Audit' },
        { id: 'executive-request', name: 'Executive Request' },
        { id: 'system-maintenance', name: 'System Maintenance' }
      ],
      authorityOptions: [
        { id: 'management', name: 'Management Authorization' },
        { id: 'it-department', name: 'IT Department Approval' },
        { id: 'security-team', name: 'Security Team Clearance' },
        { id: 'external-auditor', name: 'External Auditor' },
        { id: 'vendor-representative', name: 'Vendor Representative' },
        { id: 'compliance-officer', name: 'Compliance Officer' }
      ],
      urgencyTactics: [
        { id: 'time-pressure', name: 'Time Pressure' },
        { id: 'system-down', name: 'System Outage' },
        { id: 'security-breach', name: 'Security Incident' },
        { id: 'deadline-pressure', name: 'Deadline Pressure' },
        { id: 'executive-waiting', name: 'Executive Waiting' },
        { id: 'customer-complaint', name: 'Customer Complaint' }
      ],
      savedTemplates: [
        {
          id: 'temp-001',
          name: 'IT Password Reset Emergency',
          type: 'Technical Support',
          difficulty: 'Medium',
          description: 'Urgent password reset request from IT support',
          successRate: 65,
          timesUsed: 12
        },
        {
          id: 'temp-002',
          name: 'Vendor Account Verification',
          type: 'Vendor Verification',
          difficulty: 'Hard',
          description: 'Vendor requesting account verification for payment',
          successRate: 45,
          timesUsed: 8
        }
      ]
    }
  },
  computed: {
    isScenarioValid() {
      return this.scenario.type && this.scenario.role && this.scenario.department && this.scenario.objective
    },
    generatedScript() {
      if (!this.scenario.type || !this.scenario.role) return null
      
      const scripts = {
        'emergency': `"Hello, this is ${this.getRoleName(this.scenario.role)}. We have an urgent situation that requires immediate attention. I need to verify some information to resolve this quickly."`,
        'technical-support': `"Hi, I'm calling from ${this.getRoleName(this.scenario.role)}. We're experiencing some technical issues and need to verify your account details to restore service."`,
        'vendor-verification': `"Good morning, this is ${this.getRoleName(this.scenario.role)}. We need to update our records and verify some information for compliance purposes."`
      }
      
      return scripts[this.scenario.type] || `"Hello, I'm ${this.getRoleName(this.scenario.role)} and I need your assistance with an important matter."`
    }
  },
  methods: {
    loadScenarioTemplate() {
      // Load default values based on scenario type
      const templates = {
        'emergency': {
          urgencyTactics: ['time-pressure', 'system-down'],
          authorities: ['management', 'security-team']
        },
        'technical-support': {
          urgencyTactics: ['system-down', 'deadline-pressure'],
          authorities: ['it-department']
        }
      }
      
      if (templates[this.scenario.type]) {
        this.scenario.urgencyTactics = templates[this.scenario.type].urgencyTactics
        this.scenario.authorities = templates[this.scenario.type].authorities
      }
    },
    getRoleName(roleId) {
      const roles = {
        'it-support': 'IT Support',
        'vendor': 'Vendor Representative',
        'executive': 'Executive Assistant',
        'customer': 'Customer Service',
        'auditor': 'Security Auditor',
        'contractor': 'External Contractor'
      }
      return roles[roleId] || roleId
    },
    getMethodName(methodId) {
      const methods = {
        'phone': 'Phone Call',
        'email': 'Email',
        'in-person': 'In-Person',
        'chat': 'Chat Message'
      }
      return methods[methodId] || methodId
    },
    getRedFlags() {
      const flags = []
      
      if (this.scenario.urgencyTactics.includes('time-pressure')) {
        flags.push('Excessive time pressure and urgency')
      }
      if (this.scenario.authorities.includes('management')) {
        flags.push('Claims of management authorization without verification')
      }
      if (this.scenario.method === 'phone') {
        flags.push('Unsolicited phone call requesting sensitive information')
      }
      if (this.scenario.objective === 'credentials') {
        flags.push('Direct request for login credentials')
      }
      
      flags.push('Lack of proper identification or verification procedures')
      flags.push('Requests to bypass normal security protocols')
      
      return flags
    },
    previewScenario() {
      this.showScenarioPreview()
    },

    showScenarioPreview() {
      const previewContent = `
🎭 PRETEXTING SCENARIO PREVIEW

📋 Scenario Configuration:
• Type: ${this.scenario.type}
• Target Role: ${this.scenario.targetRole}
• Pretext: ${this.scenario.pretext}
• Objective: ${this.scenario.objective}

🎯 Attack Vector:
• Method: ${this.scenario.method}
• Urgency Level: ${this.scenario.urgency}
• Authority Figure: ${this.scenario.authority}

📞 Scenario Script:
"${this.scenario.script}"

🔍 Information Targets:
${this.scenario.informationTargets.map(target => `• ${target}`).join('\n')}

⚠️ Red Flags to Watch For:
${this.getRedFlags().map(flag => `• ${flag}`).join('\n')}

📊 Execution Settings:
• Schedule: ${this.execution.schedule}
• Duration: ${this.execution.duration}
• Participants: ${this.execution.participants}
• Recording: ${this.execution.recording ? 'Enabled' : 'Disabled'}

⚠️ This is a SIMULATION for security training purposes.
No actual social engineering will be performed.

Ready to proceed with this scenario?
      `

      alert(previewContent)
    },
    startSimulation() {
      if (!confirm('Start pretexting simulation? This will initiate the social engineering scenario.')) {
        return
      }

      this.isExecuting = true
      this.executionProgress = 0
      this.executionStatus = 'Initializing scenario...'

      this.simulatePretextingScenario()
    },

    simulatePretextingScenario() {
      const steps = [
        { progress: 20, status: 'Setting up scenario context...', delay: 1000 },
        { progress: 40, status: 'Establishing pretext identity...', delay: 1500 },
        { progress: 60, status: 'Initiating contact with targets...', delay: 2000 },
        { progress: 80, status: 'Executing social engineering tactics...', delay: 2500 },
        { progress: 100, status: 'Scenario execution complete!', delay: 1000 }
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
              this.completeScenario()
            }
          }, step.delay)
        }
      }

      executeStep()
    },

    completeScenario() {
      const results = this.generateScenarioResults()
      this.showScenarioResults(results)

      this.$emit('simulation-started', {
        type: 'pretexting',
        config: this.scenario,
        execution: this.execution,
        results: results
      })

      setTimeout(() => {
        this.isExecuting = false
        this.executionProgress = 0
        this.executionStatus = ''
      }, 2000)
    },

    generateScenarioResults() {
      const contactsAttempted = Math.floor(Math.random() * 15) + 5 // 5-20 contacts
      const successRate = Math.floor(Math.random() * 35) + 20 // 20-55% success rate
      const successfulContacts = Math.floor((contactsAttempted * successRate) / 100)
      const detectionRate = Math.floor(Math.random() * 25) + 60 // 60-85% detection rate

      return {
        id: `PRETEXT-${Date.now()}`,
        timestamp: new Date().toLocaleString(),
        contactsAttempted,
        successfulContacts,
        successRate,
        detectionRate,
        informationGathered: Math.floor(successfulContacts * 0.8),
        reportedIncidents: Math.floor(contactsAttempted * (detectionRate / 100)),
        avgCallDuration: (Math.random() * 8 + 3).toFixed(1) + ' minutes'
      }
    },

    showScenarioResults(results) {
      const message = `
🎭 Pretexting Scenario Complete!

📊 Scenario Results:
• Contacts Attempted: ${results.contactsAttempted}
• Success Rate: ${results.successRate}%
• Detection Rate: ${results.detectionRate}%
• Avg Call Duration: ${results.avgCallDuration}

🎯 Outcome Details:
• Successful Contacts: ${results.successfulContacts}
• Information Gathered: ${results.informationGathered}
• Reported Incidents: ${results.reportedIncidents}

Scenario ID: ${results.id}
      `

      alert(message)
    },

    getRedFlags() {
      return [
        'Requests for sensitive information over phone',
        'Pressure to act quickly without verification',
        'Claims of authority without proper identification',
        'Unusual requests outside normal procedures',
        'Refusal to provide callback number or verification'
      ]
    },
    saveTemplate() {
      const templateName = prompt('Enter a name for this pretexting template:', this.scenario.type || 'Custom Pretexting Template')

      if (templateName) {
        const templateId = `PRETEXT-TEMPLATE-${Date.now()}`
        const templateData = {
          id: templateId,
          name: templateName,
          type: 'pretexting',
          scenario: { ...this.scenario },
          execution: { ...this.execution },
          createdAt: new Date().toLocaleString(),
          category: this.scenario.type
        }

        // Save to localStorage (in real app, would save to database)
        const existingTemplates = JSON.parse(localStorage.getItem('pretextingTemplates') || '[]')
        existingTemplates.push(templateData)
        localStorage.setItem('pretextingTemplates', JSON.stringify(existingTemplates))

        alert(`✅ Pretexting template saved successfully!\n\nTemplate: ${templateName}\nID: ${templateId}\nCreated: ${templateData.createdAt}\n\nThis template can be reused for future scenarios.`)
      }
    },
    loadTemplate(templateId) {
      console.log('Loading template:', templateId)
    },
    editTemplate(templateId) {
      console.log('Editing template:', templateId)
    }
  }
}
</script>

<style lang="scss" scoped>
.pretexting-simulator {
  .simulator-header {
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
  
  .scenario-config,
  .scenario-details {
    background: var(--light-color);
    padding: 1.5rem;
    border-radius: 0.5rem;
    margin-bottom: 1.5rem;
    
    h3 {
      color: var(--secondary-color);
      margin-bottom: 1rem;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid white;
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
    
    .authority-options,
    .urgency-options {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 0.5rem;
      margin-top: 0.5rem;
    }
  }
  
  .scenario-preview {
    margin: 2rem 0;
    
    h3 {
      color: var(--secondary-color);
      margin-bottom: 1rem;
    }
    
    .preview-container {
      .scenario-card {
        background: white;
        border-radius: 0.5rem;
        box-shadow: var(--shadow);
        overflow: hidden;
        
        .scenario-header {
          background: var(--primary-color);
          color: white;
          padding: 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          
          .role-badge,
          .method-badge {
            background: rgba(255, 255, 255, 0.2);
            padding: 0.25rem 0.75rem;
            border-radius: 1rem;
            font-size: 0.9rem;
          }
        }
        
        .scenario-content {
          padding: 1.5rem;
          
          h4 {
            color: var(--primary-color);
            margin-bottom: 1rem;
          }
          
          .scenario-description {
            margin-bottom: 1.5rem;
            padding: 1rem;
            background: var(--light-color);
            border-radius: 0.25rem;
          }
          
          .scenario-script {
            margin-bottom: 1.5rem;
            
            h5 {
              color: var(--secondary-color);
              margin-bottom: 0.5rem;
            }
            
            .script-content {
              background: rgba(52, 152, 219, 0.1);
              padding: 1rem;
              border-radius: 0.25rem;
              font-style: italic;
              border-left: 4px solid var(--secondary-color);
            }
          }
          
          .scenario-indicators {
            h5 {
              color: var(--danger-color);
              margin-bottom: 0.5rem;
            }
            
            ul {
              list-style: none;
              margin: 0;
              padding: 0;
              
              li {
                padding: 0.5rem 0;
                padding-left: 1.5rem;
                position: relative;
                color: var(--danger-color);
                
                &:before {
                  content: '⚠️';
                  position: absolute;
                  left: 0;
                }
              }
            }
          }
        }
      }
    }
  }
  
  .execution-settings {
    background: var(--light-color);
    padding: 1.5rem;
    border-radius: 0.5rem;
    margin: 2rem 0;
    
    h3 {
      color: var(--secondary-color);
      margin-bottom: 1rem;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid white;
    }
    
    .setting-group {
      margin-bottom: 1rem;
      
      label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 500;
        color: var(--dark-color);
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
    }
    
    .execution-options {
      margin-top: 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      
      .checkbox-label {
        display: flex;
        align-items: center;
        
        input[type="checkbox"] {
          margin-right: 0.5rem;
        }
      }
    }
  }
  
  .simulation-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin: 2rem 0;

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
    border-left: 4px solid #9b59b6;

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
        color: #9b59b6;
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
        background: linear-gradient(90deg, #9b59b6, #e74c3c);
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
  
  .scenario-templates {
    margin-top: 3rem;
    
    h3 {
      color: var(--secondary-color);
      margin-bottom: 1rem;
    }
    
    .templates-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
      
      .template-card {
        background: white;
        padding: 1.5rem;
        border-radius: 0.5rem;
        box-shadow: var(--shadow);
        
        .template-header {
          margin-bottom: 1rem;
          
          h4 {
            color: var(--primary-color);
            margin-bottom: 0.5rem;
          }
          
          .template-meta {
            display: flex;
            gap: 0.5rem;
            
            .template-type,
            .template-difficulty {
              background: var(--secondary-color);
              color: white;
              padding: 0.25rem 0.75rem;
              border-radius: 1rem;
              font-size: 0.8rem;
            }
            
            .template-difficulty {
              background: var(--warning-color);
            }
          }
        }
        
        .template-description {
          color: #666;
          margin-bottom: 1rem;
        }
        
        .template-stats {
          display: flex;
          gap: 1rem;
          margin-bottom: 1rem;
          
          .stat {
            font-size: 0.9rem;
            color: var(--secondary-color);
          }
        }
        
        .template-actions {
          display: flex;
          gap: 0.5rem;
          
          .btn {
            flex: 1;
            padding: 0.5rem;
            font-size: 0.9rem;
          }
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .pretexting-simulator {
    .simulation-actions {
      flex-direction: column;
      align-items: center;
    }
    
    .templates-grid {
      grid-template-columns: 1fr;
    }
    
    .scenario-header {
      flex-direction: column;
      gap: 0.5rem;
      text-align: center;
    }
  }
}
</style>
