<template>
  <div class="spear-phishing-simulator">
    <div class="simulator-header">
      <h2>🎣 Spear Phishing Simulator</h2>
      <p>Create highly targeted phishing attacks using social intelligence and personalization</p>
    </div>

    <div class="simulator-workflow">
      <div class="workflow-steps">
        <div class="step" :class="{ active: currentStep === 1, completed: currentStep > 1 }">
          <div class="step-number">1</div>
          <div class="step-title">Target Selection</div>
        </div>
        <div class="step" :class="{ active: currentStep === 2, completed: currentStep > 2 }">
          <div class="step-number">2</div>
          <div class="step-title">Intelligence Gathering</div>
        </div>
        <div class="step" :class="{ active: currentStep === 3, completed: currentStep > 3 }">
          <div class="step-number">3</div>
          <div class="step-title">Attack Crafting</div>
        </div>
        <div class="step" :class="{ active: currentStep === 4 }">
          <div class="step-number">4</div>
          <div class="step-title">Execution</div>
        </div>
      </div>
    </div>

    <!-- Step 1: Target Selection -->
    <div v-if="currentStep === 1" class="step-content">
      <h3>Target Selection</h3>
      <div class="row">
        <div class="col-6">
          <div class="target-categories">
            <h4>Target Categories</h4>
            <div class="category-list">
              <div class="category-item" v-for="category in targetCategories" :key="category.id"
                   @click="selectCategory(category.id)" :class="{ selected: selectedCategory === category.id }">
                <div class="category-icon">{{ category.icon }}</div>
                <div class="category-info">
                  <h5>{{ category.name }}</h5>
                  <p>{{ category.description }}</p>
                  <div class="category-stats">
                    <span>{{ category.count }} targets</span>
                    <span>{{ category.riskLevel }} risk</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="col-6">
          <div class="target-details" v-if="selectedCategory">
            <h4>Available Targets</h4>
            <div class="targets-list">
              <div class="target-item" v-for="target in availableTargets" :key="target.id"
                   @click="selectTarget(target.id)" :class="{ selected: selectedTargets.includes(target.id) }">
                <div class="target-avatar">{{ target.initials }}</div>
                <div class="target-info">
                  <h5>{{ target.name }}</h5>
                  <p>{{ target.position }}</p>
                  <div class="target-intel">
                    <span class="intel-item">📧 {{ target.emailActivity }}</span>
                    <span class="intel-item">🔗 {{ target.socialMedia }}</span>
                    <span class="intel-item">📊 {{ target.riskScore }}/10</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="step-actions">
        <button @click="nextStep" :disabled="selectedTargets.length === 0" class="btn btn-primary">
          Next: Intelligence Gathering →
        </button>
      </div>
    </div>

    <!-- Step 2: Intelligence Gathering -->
    <div v-if="currentStep === 2" class="step-content">
      <h3>Intelligence Gathering</h3>
      <div class="intelligence-dashboard">
        <div class="intel-sources">
          <h4>Available Intelligence Sources</h4>
          <div class="sources-grid">
            <div class="source-card" v-for="source in intelSources" :key="source.id"
                 @click="gatherIntel(source.id)" :class="{ active: source.active }">
              <div class="source-icon">{{ source.icon }}</div>
              <h5>{{ source.name }}</h5>
              <p>{{ source.description }}</p>
              <div class="source-status">
                <span v-if="source.active" class="status-active">✓ Gathered</span>
                <span v-else class="status-pending">Click to gather</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="intel-summary" v-if="gatheredIntel.length > 0">
          <h4>Gathered Intelligence</h4>
          <div class="intel-items">
            <div class="intel-item" v-for="intel in gatheredIntel" :key="intel.id">
              <div class="intel-type">{{ intel.type }}</div>
              <div class="intel-data">{{ intel.data }}</div>
              <div class="intel-confidence">{{ intel.confidence }}% confidence</div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="step-actions">
        <button @click="prevStep" class="btn btn-secondary">← Previous</button>
        <button @click="nextStep" :disabled="gatheredIntel.length < 3" class="btn btn-primary">
          Next: Craft Attack →
        </button>
      </div>
    </div>

    <!-- Step 3: Attack Crafting -->
    <div v-if="currentStep === 3" class="step-content">
      <h3>Attack Crafting</h3>
      <div class="attack-builder">
        <div class="row">
          <div class="col-6">
            <div class="attack-config">
              <h4>Attack Configuration</h4>
              <div class="form-group">
                <label>Attack Vector</label>
                <select v-model="attackConfig.vector" class="form-control">
                  <option value="email">Personalized Email</option>
                  <option value="social">Social Media Message</option>
                  <option value="phone">Phone Call</option>
                  <option value="sms">SMS Message</option>
                </select>
              </div>
              
              <div class="form-group">
                <label>Pretext</label>
                <select v-model="attackConfig.pretext" class="form-control">
                  <option value="colleague">Colleague Request</option>
                  <option value="vendor">Vendor Communication</option>
                  <option value="executive">Executive Directive</option>
                  <option value="it-support">IT Support</option>
                  <option value="customer">Customer Inquiry</option>
                </select>
              </div>
              
              <div class="form-group">
                <label>Urgency Level</label>
                <select v-model="attackConfig.urgency" class="form-control">
                  <option value="low">Low - Casual request</option>
                  <option value="medium">Medium - Time-sensitive</option>
                  <option value="high">High - Urgent deadline</option>
                  <option value="critical">Critical - Emergency</option>
                </select>
              </div>
              
              <div class="form-group">
                <label>Personalization Elements</label>
                <div class="personalization-options">
                  <label class="checkbox-label" v-for="element in personalizationElements" :key="element.id">
                    <input v-model="attackConfig.personalization" :value="element.id" type="checkbox">
                    {{ element.name }}
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          <div class="col-6">
            <div class="attack-preview">
              <h4>Attack Preview</h4>
              <div class="preview-container">
                <div class="preview-header">
                  <strong>From:</strong> {{ generateSender() }}<br>
                  <strong>To:</strong> {{ selectedTargets.map(id => getTargetName(id)).join(', ') }}<br>
                  <strong>Subject:</strong> {{ generateSubject() }}
                </div>
                <div class="preview-body">
                  {{ generateBody() }}
                </div>
              </div>
              
              <div class="attack-metrics">
                <h5>Predicted Metrics</h5>
                <div class="metrics-grid">
                  <div class="metric-item">
                    <div class="metric-value">{{ predictedMetrics.successRate }}%</div>
                    <div class="metric-label">Success Rate</div>
                  </div>
                  <div class="metric-item">
                    <div class="metric-value">{{ predictedMetrics.detectionRate }}%</div>
                    <div class="metric-label">Detection Rate</div>
                  </div>
                  <div class="metric-item">
                    <div class="metric-value">{{ predictedMetrics.sophistication }}/10</div>
                    <div class="metric-label">Sophistication</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="step-actions">
        <button @click="prevStep" class="btn btn-secondary">← Previous</button>
        <button @click="nextStep" class="btn btn-primary">Next: Execute Attack →</button>
      </div>
    </div>

    <!-- Step 4: Execution -->
    <div v-if="currentStep === 4" class="step-content">
      <h3>Attack Execution</h3>
      <div class="execution-summary">
        <div class="summary-card">
          <h4>Execution Summary</h4>
          <div class="summary-details">
            <div class="detail-row">
              <strong>Targets:</strong> {{ selectedTargets.length }} individuals
            </div>
            <div class="detail-row">
              <strong>Attack Vector:</strong> {{ attackConfig.vector }}
            </div>
            <div class="detail-row">
              <strong>Pretext:</strong> {{ attackConfig.pretext }}
            </div>
            <div class="detail-row">
              <strong>Intelligence Sources:</strong> {{ gatheredIntel.length }} sources
            </div>
          </div>
        </div>
        
        <div class="execution-controls">
          <div class="form-group">
            <label>Execution Schedule</label>
            <select v-model="executionConfig.schedule" class="form-control">
              <option value="immediate">Execute Immediately</option>
              <option value="delayed">Delayed Execution</option>
              <option value="scheduled">Scheduled Execution</option>
            </select>
          </div>
          
          <div class="form-group" v-if="executionConfig.schedule !== 'immediate'">
            <label>Execution Time</label>
            <input v-model="executionConfig.time" type="datetime-local" class="form-control">
          </div>
          
          <div class="form-group">
            <label class="checkbox-label">
              <input v-model="executionConfig.monitoring" type="checkbox">
              Enable real-time monitoring
            </label>
          </div>
          
          <div class="form-group">
            <label class="checkbox-label">
              <input v-model="executionConfig.alerts" type="checkbox">
              Send progress alerts
            </label>
          </div>
        </div>
      </div>
      
      <div class="step-actions">
        <button @click="prevStep" class="btn btn-secondary" :disabled="isExecuting">← Previous</button>
        <button @click="executeAttack" class="btn btn-danger" :disabled="isExecuting">
          <span v-if="!isExecuting">🚀 Execute Spear Phishing Attack</span>
          <span v-else>⏳ Executing...</span>
        </button>
      </div>

      <!-- Execution Progress -->
      <div v-if="isExecuting" class="execution-progress">
        <div class="progress-header">
          <h4>🎯 Attack in Progress</h4>
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
  name: 'SpearPhishingSimulator',
  data() {
    return {
      currentStep: 1,
      selectedCategory: null,
      selectedTargets: [],
      gatheredIntel: [],
      attackConfig: {
        vector: 'email',
        pretext: 'colleague',
        urgency: 'medium',
        personalization: []
      },
      executionConfig: {
        schedule: 'immediate',
        time: '',
        monitoring: true,
        alerts: true
      },
      isExecuting: false,
      executionProgress: 0,
      executionStatus: '',
      targetCategories: [
        {
          id: 'executives',
          name: 'Executive Team',
          icon: '👔',
          description: 'C-level executives and senior management',
          count: 12,
          riskLevel: 'High'
        },
        {
          id: 'finance',
          name: 'Finance Department',
          icon: '💰',
          description: 'Financial officers and accounting staff',
          count: 28,
          riskLevel: 'Critical'
        },
        {
          id: 'it-admin',
          name: 'IT Administrators',
          icon: '⚙️',
          description: 'System administrators and IT staff',
          count: 15,
          riskLevel: 'High'
        },
        {
          id: 'hr',
          name: 'Human Resources',
          icon: '👥',
          description: 'HR personnel with access to employee data',
          count: 8,
          riskLevel: 'Medium'
        }
      ],
      availableTargets: [],
      intelSources: [
        {
          id: 'social-media',
          name: 'Social Media',
          icon: '📱',
          description: 'LinkedIn, Twitter, Facebook profiles',
          active: false
        },
        {
          id: 'company-website',
          name: 'Company Website',
          icon: '🌐',
          description: 'Public company information and bios',
          active: false
        },
        {
          id: 'email-patterns',
          name: 'Email Patterns',
          icon: '📧',
          description: 'Email communication patterns and contacts',
          active: false
        },
        {
          id: 'public-records',
          name: 'Public Records',
          icon: '📄',
          description: 'Professional certifications and publications',
          active: false
        }
      ],
      personalizationElements: [
        { id: 'name', name: 'Personal Name' },
        { id: 'position', name: 'Job Position' },
        { id: 'department', name: 'Department' },
        { id: 'colleagues', name: 'Colleague Names' },
        { id: 'projects', name: 'Current Projects' },
        { id: 'interests', name: 'Professional Interests' }
      ]
    }
  },
  computed: {
    predictedMetrics() {
      let successRate = 25
      let detectionRate = 75
      let sophistication = 5
      
      // Adjust based on configuration
      if (this.attackConfig.urgency === 'critical') successRate += 15
      if (this.attackConfig.personalization.length > 3) successRate += 10
      if (this.gatheredIntel.length > 5) sophistication += 2
      
      return {
        successRate: Math.min(successRate, 85),
        detectionRate: Math.max(detectionRate - (successRate - 25), 15),
        sophistication: Math.min(sophistication, 10)
      }
    }
  },
  methods: {
    selectCategory(categoryId) {
      this.selectedCategory = categoryId
      this.loadTargetsForCategory(categoryId)
    },
    loadTargetsForCategory(categoryId) {
      // Simulate loading targets based on category
      const mockTargets = {
        executives: [
          { id: 'exec-1', name: 'John Smith', position: 'CEO', initials: 'JS', emailActivity: 'High', socialMedia: 'Active', riskScore: 9 },
          { id: 'exec-2', name: 'Sarah Johnson', position: 'CFO', initials: 'SJ', emailActivity: 'Medium', socialMedia: 'Limited', riskScore: 7 }
        ],
        finance: [
          { id: 'fin-1', name: 'Mike Chen', position: 'Finance Manager', initials: 'MC', emailActivity: 'High', socialMedia: 'Active', riskScore: 8 },
          { id: 'fin-2', name: 'Lisa Brown', position: 'Accountant', initials: 'LB', emailActivity: 'Medium', socialMedia: 'Moderate', riskScore: 6 }
        ]
      }
      this.availableTargets = mockTargets[categoryId] || []
    },
    selectTarget(targetId) {
      const index = this.selectedTargets.indexOf(targetId)
      if (index > -1) {
        this.selectedTargets.splice(index, 1)
      } else {
        this.selectedTargets.push(targetId)
      }
    },
    gatherIntel(sourceId) {
      const source = this.intelSources.find(s => s.id === sourceId)
      if (source && !source.active) {
        source.active = true
        // Simulate gathering intelligence
        const mockIntel = {
          'social-media': { type: 'Social Media', data: 'Active on LinkedIn, posts about industry trends', confidence: 85 },
          'company-website': { type: 'Company Info', data: 'Featured in company newsletter, leads marketing team', confidence: 95 },
          'email-patterns': { type: 'Email Patterns', data: 'Frequently emails with vendors, responds quickly', confidence: 70 },
          'public-records': { type: 'Public Records', data: 'MBA from State University, certified PMP', confidence: 90 }
        }
        if (mockIntel[sourceId]) {
          this.gatheredIntel.push({ id: sourceId, ...mockIntel[sourceId] })
        }
      }
    },
    generateSender() {
      const pretexts = {
        colleague: 'colleague@company.com',
        vendor: 'support@vendor.com',
        executive: 'ceo@company.com',
        'it-support': 'it-help@company.com',
        customer: 'inquiry@customer.com'
      }
      return pretexts[this.attackConfig.pretext] || 'sender@example.com'
    },
    generateSubject() {
      const subjects = {
        colleague: 'Quick favor needed',
        vendor: 'Account verification required',
        executive: 'Urgent: Board meeting preparation',
        'it-support': 'Security update required',
        customer: 'Important customer inquiry'
      }
      return subjects[this.attackConfig.pretext] || 'Important message'
    },
    generateBody() {
      return `Personalized message using gathered intelligence and selected pretext. This would be dynamically generated based on the configuration and intelligence gathered.`
    },
    getTargetName(targetId) {
      const target = this.availableTargets.find(t => t.id === targetId)
      return target ? target.name : 'Unknown'
    },
    nextStep() {
      if (this.currentStep < 4) {
        this.currentStep++
      }
    },
    prevStep() {
      if (this.currentStep > 1) {
        this.currentStep--
      }
    },
    executeAttack() {
      // Show execution confirmation
      if (!confirm('Are you sure you want to execute this spear phishing attack? This will start the simulation.')) {
        return
      }

      // Start execution process
      this.isExecuting = true
      this.executionProgress = 0
      this.executionStatus = 'Initializing attack...'

      // Simulate attack execution with progress updates
      this.simulateAttackExecution()
    },

    simulateAttackExecution() {
      const steps = [
        { progress: 10, status: 'Preparing target list...', delay: 1000 },
        { progress: 25, status: 'Crafting personalized messages...', delay: 2000 },
        { progress: 40, status: 'Setting up tracking infrastructure...', delay: 1500 },
        { progress: 60, status: 'Deploying attack vectors...', delay: 2000 },
        { progress: 80, status: 'Monitoring target responses...', delay: 1500 },
        { progress: 100, status: 'Attack execution complete!', delay: 1000 }
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
              this.completeExecution()
            }
          }, step.delay)
        }
      }

      executeStep()
    },

    completeExecution() {
      // Generate realistic results
      const results = this.generateAttackResults()

      // Show results modal
      this.showExecutionResults(results)

      // Emit simulation started event
      this.$emit('simulation-started', {
        type: 'spear-phishing',
        targets: this.selectedTargets,
        config: this.attackConfig,
        results: results
      })

      // Reset execution state
      setTimeout(() => {
        this.isExecuting = false
        this.executionProgress = 0
        this.executionStatus = ''
      }, 3000)
    },

    generateAttackResults() {
      const targetCount = this.selectedTargets.length
      const successRate = Math.floor(Math.random() * 30) + 10 // 10-40% success rate
      const successfulTargets = Math.floor((targetCount * successRate) / 100)
      const detectionRate = Math.floor(Math.random() * 20) + 70 // 70-90% detection rate

      return {
        id: `SPEAR-${Date.now()}`,
        timestamp: new Date().toLocaleString(),
        targetCount,
        successfulTargets,
        successRate,
        detectionRate,
        responseTime: (Math.random() * 5 + 2).toFixed(1) + 's',
        details: {
          emailsOpened: Math.floor(targetCount * 0.8),
          linksClicked: successfulTargets,
          credentialsEntered: Math.floor(successfulTargets * 0.7),
          reportedByUsers: Math.floor(targetCount * (detectionRate / 100))
        }
      }
    },

    showExecutionResults(results) {
      const message = `
🎯 Spear Phishing Attack Complete!

📊 Results Summary:
• Targets: ${results.targetCount}
• Success Rate: ${results.successRate}%
• Detection Rate: ${results.detectionRate}%
• Response Time: ${results.responseTime}

📧 Detailed Metrics:
• Emails Opened: ${results.details.emailsOpened}
• Links Clicked: ${results.details.linksClicked}
• Credentials Entered: ${results.details.credentialsEntered}
• Reported by Users: ${results.details.reportedByUsers}

The simulation has been logged for analysis.
      `

      alert(message)
    }
  }
}
</script>

<style lang="scss" scoped>
.spear-phishing-simulator {
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
  
  .workflow-steps {
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
  
  .step-content {
    background: var(--light-color);
    padding: 2rem;
    border-radius: 0.5rem;
    margin-bottom: 2rem;
    
    h3 {
      color: var(--primary-color);
      margin-bottom: 1.5rem;
      text-align: center;
    }
  }
  
  .category-list {
    .category-item {
      display: flex;
      align-items: center;
      padding: 1rem;
      background: white;
      border-radius: 0.5rem;
      margin-bottom: 1rem;
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
      
      .category-icon {
        font-size: 2rem;
        margin-right: 1rem;
      }
      
      .category-info {
        flex: 1;
        
        h5 {
          color: var(--primary-color);
          margin-bottom: 0.25rem;
        }
        
        p {
          color: #666;
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
        }
        
        .category-stats {
          display: flex;
          gap: 1rem;
          font-size: 0.8rem;
          color: var(--secondary-color);
        }
      }
    }
  }
  
  .targets-list {
    max-height: 400px;
    overflow-y: auto;
    
    .target-item {
      display: flex;
      align-items: center;
      padding: 1rem;
      background: white;
      border-radius: 0.5rem;
      margin-bottom: 0.5rem;
      cursor: pointer;
      transition: all 0.3s ease;
      border: 2px solid transparent;
      
      &:hover {
        box-shadow: var(--shadow);
      }
      
      &.selected {
        border-color: var(--success-color);
        background: rgba(39, 174, 96, 0.1);
      }
      
      .target-avatar {
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
        background: var(--secondary-color);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        margin-right: 1rem;
      }
      
      .target-info {
        flex: 1;
        
        h5 {
          color: var(--primary-color);
          margin-bottom: 0.25rem;
        }
        
        p {
          color: #666;
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
        }
        
        .target-intel {
          display: flex;
          gap: 1rem;
          
          .intel-item {
            font-size: 0.8rem;
            color: var(--secondary-color);
          }
        }
      }
    }
  }
  
  .sources-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin-bottom: 2rem;
    
    .source-card {
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
      
      &.active {
        border-color: var(--success-color);
        background: rgba(39, 174, 96, 0.1);
      }
      
      .source-icon {
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
        margin-bottom: 1rem;
      }
      
      .source-status {
        .status-active {
          color: var(--success-color);
          font-weight: bold;
        }
        
        .status-pending {
          color: var(--secondary-color);
        }
      }
    }
  }
  
  .intel-items {
    .intel-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      background: white;
      border-radius: 0.5rem;
      margin-bottom: 0.5rem;
      
      .intel-type {
        font-weight: bold;
        color: var(--primary-color);
      }
      
      .intel-data {
        flex: 1;
        margin: 0 1rem;
        color: #666;
      }
      
      .intel-confidence {
        color: var(--success-color);
        font-size: 0.9rem;
      }
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
    
    .personalization-options {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 0.5rem;
    }
  }
  
  .preview-container {
    background: white;
    border: 1px solid var(--border-color);
    border-radius: 0.5rem;
    padding: 1rem;
    margin-bottom: 1rem;
    
    .preview-header {
      background: var(--light-color);
      padding: 1rem;
      border-radius: 0.25rem;
      margin-bottom: 1rem;
    }
    
    .preview-body {
      line-height: 1.6;
      color: #666;
    }
  }
  
  .metrics-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    
    .metric-item {
      text-align: center;
      padding: 1rem;
      background: white;
      border-radius: 0.25rem;
      
      .metric-value {
        font-size: 1.5rem;
        font-weight: bold;
        color: var(--primary-color);
      }
      
      .metric-label {
        font-size: 0.9rem;
        color: #666;
      }
    }
  }
  
  .step-actions {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 2rem;

    .btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }

  .execution-progress {
    background: white;
    padding: 2rem;
    border-radius: 0.5rem;
    margin-top: 2rem;
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
        background: linear-gradient(90deg, var(--secondary-color), var(--success-color));
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
  
  .execution-summary {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    
    .summary-card {
      background: white;
      padding: 1.5rem;
      border-radius: 0.5rem;
      
      h4 {
        color: var(--primary-color);
        margin-bottom: 1rem;
      }
      
      .detail-row {
        padding: 0.5rem 0;
        border-bottom: 1px solid var(--light-color);
        
        &:last-child {
          border-bottom: none;
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .spear-phishing-simulator {
    .workflow-steps {
      flex-wrap: wrap;
      
      .step {
        margin: 0.5rem;
        
        &:not(:last-child)::after {
          display: none;
        }
      }
    }
    
    .execution-summary {
      grid-template-columns: 1fr;
    }
    
    .step-actions {
      flex-direction: column;
      align-items: center;
    }
  }
}
</style>
