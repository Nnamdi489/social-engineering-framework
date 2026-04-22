<template>
  <div class="baiting-simulator">
    <div class="simulator-header">
      <h2>🪤 Baiting Simulator</h2>
      <p>Create enticing baits to test user curiosity and security awareness</p>
    </div>

    <div class="bait-configuration">
      <div class="row">
        <div class="col-6">
          <div class="bait-types">
            <h3>Bait Type Selection</h3>
            <div class="type-grid">
              <div class="type-card" v-for="type in baitTypes" :key="type.id"
                   @click="selectBaitType(type.id)" :class="{ selected: selectedBaitType === type.id }">
                <div class="type-icon">{{ type.icon }}</div>
                <h4>{{ type.name }}</h4>
                <p>{{ type.description }}</p>
                <div class="type-stats">
                  <span class="effectiveness">{{ type.effectiveness }}% effective</span>
                  <span class="risk-level">{{ type.riskLevel }} risk</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="col-6">
          <div class="bait-settings" v-if="selectedBaitType">
            <h3>Bait Configuration</h3>
            
            <div class="form-group">
              <label>Bait Title</label>
              <input v-model="baitConfig.title" type="text" class="form-control" 
                     :placeholder="getBaitPlaceholder('title')">
            </div>
            
            <div class="form-group">
              <label>Description</label>
              <textarea v-model="baitConfig.description" class="form-control" rows="3"
                        :placeholder="getBaitPlaceholder('description')"></textarea>
            </div>
            
            <div class="form-group">
              <label>Delivery Method</label>
              <select v-model="baitConfig.deliveryMethod" class="form-control">
                <option value="email">Email Attachment</option>
                <option value="usb">USB Drive Drop</option>
                <option value="download">Download Link</option>
                <option value="qr-code">QR Code</option>
                <option value="social-media">Social Media Post</option>
              </select>
            </div>
            
            <div class="form-group">
              <label>Target Locations</label>
              <div class="location-options">
                <label class="checkbox-label" v-for="location in targetLocations" :key="location.id">
                  <input v-model="baitConfig.locations" :value="location.id" type="checkbox">
                  {{ location.name }}
                </label>
              </div>
            </div>
            
            <div class="form-group">
              <label>Curiosity Triggers</label>
              <div class="trigger-options">
                <label class="checkbox-label" v-for="trigger in curiosityTriggers" :key="trigger.id">
                  <input v-model="baitConfig.triggers" :value="trigger.id" type="checkbox">
                  {{ trigger.name }}
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bait-preview" v-if="selectedBaitType">
      <h3>Bait Preview</h3>
      <div class="preview-container">
        <div class="bait-mockup" :class="selectedBaitType">
          <div class="mockup-header">
            <span class="bait-type-badge">{{ getBaitTypeName(selectedBaitType) }}</span>
            <span class="delivery-badge">{{ getDeliveryMethodName(baitConfig.deliveryMethod) }}</span>
          </div>
          
          <div class="mockup-content">
            <div class="bait-title">{{ baitConfig.title || getBaitPlaceholder('title') }}</div>
            <div class="bait-description">{{ baitConfig.description || getBaitPlaceholder('description') }}</div>
            
            <div class="bait-visual" v-if="selectedBaitType === 'usb-drive'">
              <div class="usb-mockup">💾 USB Drive</div>
            </div>
            
            <div class="bait-visual" v-if="selectedBaitType === 'document'">
              <div class="document-mockup">📄 {{ baitConfig.title || 'Confidential Document' }}</div>
            </div>
            
            <div class="bait-visual" v-if="selectedBaitType === 'software'">
              <div class="software-mockup">💿 {{ baitConfig.title || 'Free Software' }}</div>
            </div>
          </div>
          
          <div class="mockup-footer">
            <div class="warning-indicators">
              <h5>Warning Signs:</h5>
              <ul>
                <li v-for="warning in getWarningSignsForBait()" :key="warning">{{ warning }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="deployment-settings">
      <h3>Deployment Settings</h3>
      <div class="row">
        <div class="col-4">
          <div class="setting-group">
            <label>Campaign Duration</label>
            <select v-model="deployment.duration" class="form-control">
              <option value="1">1 day</option>
              <option value="3">3 days</option>
              <option value="7">1 week</option>
              <option value="14">2 weeks</option>
              <option value="30">1 month</option>
            </select>
          </div>
        </div>
        
        <div class="col-4">
          <div class="setting-group">
            <label>Monitoring Level</label>
            <select v-model="deployment.monitoring" class="form-control">
              <option value="basic">Basic - Click tracking</option>
              <option value="detailed">Detailed - Full interaction</option>
              <option value="comprehensive">Comprehensive - Behavioral analysis</option>
            </select>
          </div>
        </div>
        
        <div class="col-4">
          <div class="setting-group">
            <label>Response Action</label>
            <select v-model="deployment.responseAction" class="form-control">
              <option value="log-only">Log Only</option>
              <option value="immediate-alert">Immediate Alert</option>
              <option value="educational-popup">Educational Popup</option>
              <option value="security-training">Redirect to Training</option>
            </select>
          </div>
        </div>
      </div>
      
      <div class="deployment-options">
        <label class="checkbox-label">
          <input v-model="deployment.trackDownloads" type="checkbox">
          Track file downloads and executions
        </label>
        <label class="checkbox-label">
          <input v-model="deployment.collectMetadata" type="checkbox">
          Collect user metadata (IP, browser, etc.)
        </label>
        <label class="checkbox-label">
          <input v-model="deployment.enableGeofencing" type="checkbox">
          Enable location-based restrictions
        </label>
        <label class="checkbox-label">
          <input v-model="deployment.autoRemove" type="checkbox">
          Auto-remove after campaign ends
        </label>
      </div>
    </div>

    <div class="simulation-actions">
      <button @click="previewBait" class="btn btn-secondary" :disabled="!isBaitValid || isExecuting">
        👁️ Preview Bait
      </button>
      <button @click="deployBait" class="btn btn-primary" :disabled="!isBaitValid || isExecuting">
        <span v-if="!isExecuting">🪤 Deploy Bait</span>
        <span v-else>⏳ Deploying...</span>
      </button>
      <button @click="saveBaitTemplate" class="btn btn-secondary" :disabled="isExecuting">
        💾 Save Template
      </button>
    </div>

    <!-- Execution Progress -->
    <div v-if="isExecuting" class="execution-progress">
      <div class="progress-header">
        <h4>🪤 Bait Deployment in Progress</h4>
        <span class="progress-percentage">{{ executionProgress }}%</span>
      </div>
      <div class="progress-bar">
        <div class="progress-fill" :style="{ width: executionProgress + '%' }"></div>
      </div>
      <div class="progress-status">{{ executionStatus }}</div>
    </div>

    <div class="active-baits" v-if="activeBaits.length > 0">
      <h3>Active Baits</h3>
      <div class="baits-list">
        <div class="bait-item" v-for="bait in activeBaits" :key="bait.id">
          <div class="bait-info">
            <div class="bait-header">
              <h4>{{ bait.title }}</h4>
              <span class="bait-status" :class="bait.status">{{ bait.status }}</span>
            </div>
            <div class="bait-details">
              <span class="detail">📍 {{ bait.location }}</span>
              <span class="detail">📅 {{ bait.deployedDate }}</span>
              <span class="detail">👁️ {{ bait.interactions }} interactions</span>
            </div>
          </div>
          
          <div class="bait-metrics">
            <div class="metric">
              <div class="metric-value">{{ bait.clickRate }}%</div>
              <div class="metric-label">Click Rate</div>
            </div>
            <div class="metric">
              <div class="metric-value">{{ bait.downloadRate }}%</div>
              <div class="metric-label">Download Rate</div>
            </div>
            <div class="metric">
              <div class="metric-value">{{ bait.detectionRate }}%</div>
              <div class="metric-label">Detection Rate</div>
            </div>
          </div>
          
          <div class="bait-actions">
            <button @click="viewBaitDetails(bait.id)" class="btn btn-secondary">Details</button>
            <button @click="pauseBait(bait.id)" class="btn btn-warning">Pause</button>
            <button @click="removeBait(bait.id)" class="btn btn-danger">Remove</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaitingSimulator',
  data() {
    return {
      selectedBaitType: null,
      baitConfig: {
        title: '',
        description: '',
        deliveryMethod: 'email',
        locations: [],
        triggers: []
      },
      deployment: {
        duration: '7',
        monitoring: 'detailed',
        responseAction: 'educational-popup',
        trackDownloads: true,
        collectMetadata: true,
        enableGeofencing: false,
        autoRemove: true
      },
      isExecuting: false,
      executionProgress: 0,
      executionStatus: '',
      baitTypes: [
        {
          id: 'usb-drive',
          name: 'USB Drive',
          icon: '💾',
          description: 'Physical USB drives left in strategic locations',
          effectiveness: 75,
          riskLevel: 'High'
        },
        {
          id: 'document',
          name: 'Confidential Document',
          icon: '📄',
          description: 'Fake confidential documents with enticing titles',
          effectiveness: 65,
          riskLevel: 'Medium'
        },
        {
          id: 'software',
          name: 'Free Software',
          icon: '💿',
          description: 'Attractive software downloads or applications',
          effectiveness: 80,
          riskLevel: 'High'
        },
        {
          id: 'media',
          name: 'Media Content',
          icon: '🎬',
          description: 'Videos, music, or entertainment content',
          effectiveness: 70,
          riskLevel: 'Medium'
        }
      ],
      targetLocations: [
        { id: 'parking-lot', name: 'Parking Lot' },
        { id: 'reception', name: 'Reception Area' },
        { id: 'break-room', name: 'Break Room' },
        { id: 'conference-room', name: 'Conference Rooms' },
        { id: 'elevator', name: 'Elevator Areas' },
        { id: 'cafeteria', name: 'Cafeteria' }
      ],
      curiosityTriggers: [
        { id: 'confidential', name: 'Confidential/Secret' },
        { id: 'personal', name: 'Personal Information' },
        { id: 'financial', name: 'Financial Data' },
        { id: 'free-offer', name: 'Free Offer' },
        { id: 'urgent', name: 'Urgent/Time-sensitive' },
        { id: 'exclusive', name: 'Exclusive Access' }
      ],
      activeBaits: [
        {
          id: 'bait-001',
          title: 'Employee Salary Report 2024',
          status: 'active',
          location: 'Parking Lot',
          deployedDate: '2024-01-15',
          interactions: 23,
          clickRate: 45,
          downloadRate: 32,
          detectionRate: 15
        },
        {
          id: 'bait-002',
          title: 'Free Antivirus Software',
          status: 'paused',
          location: 'Reception',
          deployedDate: '2024-01-12',
          interactions: 18,
          clickRate: 38,
          downloadRate: 28,
          detectionRate: 22
        }
      ]
    }
  },
  computed: {
    isBaitValid() {
      return this.selectedBaitType && this.baitConfig.title && this.baitConfig.description
    }
  },
  methods: {
    selectBaitType(typeId) {
      this.selectedBaitType = typeId
      this.loadBaitDefaults(typeId)
    },
    loadBaitDefaults(typeId) {
      const defaults = {
        'usb-drive': {
          deliveryMethod: 'usb',
          locations: ['parking-lot', 'reception'],
          triggers: ['confidential', 'personal']
        },
        'document': {
          deliveryMethod: 'email',
          locations: ['email'],
          triggers: ['confidential', 'financial']
        },
        'software': {
          deliveryMethod: 'download',
          locations: ['email', 'social-media'],
          triggers: ['free-offer', 'exclusive']
        },
        'media': {
          deliveryMethod: 'social-media',
          locations: ['social-media'],
          triggers: ['free-offer', 'exclusive']
        }
      }
      
      if (defaults[typeId]) {
        this.baitConfig.deliveryMethod = defaults[typeId].deliveryMethod
        this.baitConfig.locations = defaults[typeId].locations
        this.baitConfig.triggers = defaults[typeId].triggers
      }
    },
    getBaitTypeName(typeId) {
      const type = this.baitTypes.find(t => t.id === typeId)
      return type ? type.name : typeId
    },
    getDeliveryMethodName(methodId) {
      const methods = {
        'email': 'Email',
        'usb': 'USB Drop',
        'download': 'Download',
        'qr-code': 'QR Code',
        'social-media': 'Social Media'
      }
      return methods[methodId] || methodId
    },
    getBaitPlaceholder(field) {
      const placeholders = {
        'usb-drive': {
          title: 'Employee Bonus Information 2024',
          description: 'Contains confidential bonus and salary adjustment information for all employees.'
        },
        'document': {
          title: 'Confidential Project Alpha',
          description: 'Top secret project documentation - authorized personnel only.'
        },
        'software': {
          title: 'Premium Security Suite - Free License',
          description: 'Get a free premium antivirus license worth ₦99. Limited time offer!'
        },
        'media': {
          title: 'Exclusive Behind-the-Scenes Content',
          description: 'Never-before-seen footage and exclusive interviews.'
        }
      }
      
      return placeholders[this.selectedBaitType]?.[field] || ''
    },
    getWarningSignsForBait() {
      const warnings = {
        'usb-drive': [
          'Unknown USB device found in public area',
          'No clear ownership or labeling',
          'Potentially contains malware',
          'Could compromise system security'
        ],
        'document': [
          'Unsolicited confidential document',
          'Suspicious file extension or format',
          'Requests to bypass security protocols',
          'Too good to be true information'
        ],
        'software': [
          'Unsolicited free software offer',
          'Download from untrusted source',
          'Requests excessive permissions',
          'No legitimate vendor information'
        ],
        'media': [
          'Unsolicited media content',
          'Suspicious download links',
          'Requests personal information',
          'Too good to be true offer'
        ]
      }
      
      return warnings[this.selectedBaitType] || []
    },
    previewBait() {
      this.showBaitPreview()
    },

    showBaitPreview() {
      const baitType = this.baitTypes.find(type => type.id === this.selectedBaitType)

      const previewContent = `
🪤 BAITING DEPLOYMENT PREVIEW

🎯 Bait Configuration:
• Type: ${baitType ? baitType.name : 'Unknown'}
• Description: ${baitType ? baitType.description : 'N/A'}
• File Name: ${this.baitConfig.fileName}
• File Size: ${this.baitConfig.fileSize}

📍 Deployment Settings:
• Locations: ${this.deployment.locations.join(', ')}
• Schedule: ${this.deployment.schedule}
• Duration: ${this.deployment.duration}
• Auto-Remove: ${this.deployment.autoRemove ? 'Enabled' : 'Disabled'}

🔍 Monitoring Configuration:
• Tracking: ${this.baitConfig.tracking ? 'Enabled' : 'Disabled'}
• Notifications: ${this.baitConfig.notifications ? 'Enabled' : 'Disabled'}
• Logging: ${this.baitConfig.logging ? 'Enabled' : 'Disabled'}

⚠️ Security Warnings:
${this.getSecurityWarnings().map(warning => `• ${warning}`).join('\n')}

📊 Expected Metrics:
• Estimated Interactions: 15-30 per day
• Expected Click Rate: 30-70%
• Detection Rate: 50-80%

⚠️ This is a SIMULATION for security training purposes.
No actual malicious content will be deployed.

Ready to proceed with bait deployment?
      `

      alert(previewContent)
    },
    deployBait() {
      if (!confirm('Deploy bait? This will activate the baiting simulation in the selected locations.')) {
        return
      }

      this.isExecuting = true
      this.executionProgress = 0
      this.executionStatus = 'Preparing bait deployment...'

      this.simulateBaitDeployment()
    },

    simulateBaitDeployment() {
      const steps = [
        { progress: 20, status: 'Creating bait content...', delay: 1200 },
        { progress: 40, status: 'Setting up monitoring systems...', delay: 1500 },
        { progress: 60, status: 'Deploying bait in target locations...', delay: 2000 },
        { progress: 80, status: 'Activating tracking mechanisms...', delay: 1000 },
        { progress: 100, status: 'Bait deployment complete!', delay: 800 }
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
      const results = this.generateBaitResults()
      this.showDeploymentResults(results)

      this.$emit('simulation-started', {
        type: 'baiting',
        baitType: this.selectedBaitType,
        config: this.baitConfig,
        deployment: this.deployment,
        results: results
      })

      setTimeout(() => {
        this.isExecuting = false
        this.executionProgress = 0
        this.executionStatus = ''
      }, 2000)
    },

    generateBaitResults() {
      const interactions = Math.floor(Math.random() * 25) + 10 // 10-35 interactions
      const clickRate = Math.floor(Math.random() * 40) + 30 // 30-70% click rate
      const downloadRate = Math.floor(Math.random() * 20) + 15 // 15-35% download rate
      const detectionRate = Math.floor(Math.random() * 30) + 50 // 50-80% detection rate

      return {
        id: `BAIT-${Date.now()}`,
        timestamp: new Date().toLocaleString(),
        interactions,
        clickRate,
        downloadRate,
        detectionRate,
        downloads: Math.floor((interactions * downloadRate) / 100),
        reports: Math.floor((interactions * detectionRate) / 100),
        avgEngagementTime: (Math.random() * 5 + 2).toFixed(1) + ' minutes'
      }
    },

    showDeploymentResults(results) {
      const message = `
🪤 Baiting Deployment Complete!

📊 Deployment Results:
• Total Interactions: ${results.interactions}
• Click Rate: ${results.clickRate}%
• Download Rate: ${results.downloadRate}%
• Detection Rate: ${results.detectionRate}%

🎯 Engagement Details:
• Downloads: ${results.downloads}
• Reports: ${results.reports}
• Avg Engagement: ${results.avgEngagementTime}

Bait ID: ${results.id}
      `

      alert(message)
    },

    getSecurityWarnings() {
      const warnings = []

      if (this.baitConfig.fileName.includes('.exe') || this.baitConfig.fileName.includes('.bat')) {
        warnings.push('Executable file type - high risk of detection')
      }

      if (this.deployment.locations.includes('public-areas')) {
        warnings.push('Public deployment increases visibility and risk')
      }

      if (!this.baitConfig.tracking) {
        warnings.push('Tracking disabled - limited monitoring capabilities')
      }

      if (this.deployment.duration === 'indefinite') {
        warnings.push('Indefinite deployment may violate security policies')
      }

      if (warnings.length === 0) {
        warnings.push('Configuration appears secure for deployment')
      }

      return warnings
    },
    saveBaitTemplate() {
      const baitType = this.baitTypes.find(type => type.id === this.selectedBaitType)
      const templateName = prompt('Enter a name for this bait template:', `${baitType ? baitType.name : 'Custom'} Bait Template`)

      if (templateName) {
        const templateId = `BAIT-TEMPLATE-${Date.now()}`
        const templateData = {
          id: templateId,
          name: templateName,
          type: 'baiting',
          baitType: this.selectedBaitType,
          config: { ...this.baitConfig },
          deployment: { ...this.deployment },
          createdAt: new Date().toLocaleString(),
          category: baitType ? baitType.name : 'Custom'
        }

        // Save to localStorage (in real app, would save to database)
        const existingTemplates = JSON.parse(localStorage.getItem('baitingTemplates') || '[]')
        existingTemplates.push(templateData)
        localStorage.setItem('baitingTemplates', JSON.stringify(existingTemplates))

        alert(`✅ Bait template saved successfully!\n\nTemplate: ${templateName}\nType: ${templateData.category}\nID: ${templateId}\nCreated: ${templateData.createdAt}\n\nThis template can be reused for future bait deployments.`)
      }
    },
    viewBaitDetails(baitId) {
      console.log('Viewing bait details:', baitId)
      this.$router.push(`/analytics?bait=${baitId}`)
    },
    pauseBait(baitId) {
      console.log('Pausing bait:', baitId)
    },
    removeBait(baitId) {
      console.log('Removing bait:', baitId)
    }
  }
}
</script>

<style lang="scss" scoped>
.baiting-simulator {
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
  
  .bait-types {
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
    
    .type-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1rem;
      
      .type-card {
        background: white;
        padding: 1.5rem;
        border-radius: 0.5rem;
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
        
        .type-icon {
          font-size: 2rem;
          margin-bottom: 1rem;
          text-align: center;
        }
        
        h4 {
          color: var(--primary-color);
          margin-bottom: 0.5rem;
          text-align: center;
        }
        
        p {
          color: #666;
          text-align: center;
          margin-bottom: 1rem;
        }
        
        .type-stats {
          display: flex;
          justify-content: space-between;
          font-size: 0.9rem;
          
          .effectiveness {
            color: var(--success-color);
          }
          
          .risk-level {
            color: var(--warning-color);
          }
        }
      }
    }
  }
  
  .bait-settings {
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
      min-height: 80px;
    }
    
    .location-options,
    .trigger-options {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 0.5rem;
      margin-top: 0.5rem;
    }
  }
  
  .bait-preview {
    margin: 2rem 0;
    
    h3 {
      color: var(--secondary-color);
      margin-bottom: 1rem;
    }
    
    .preview-container {
      .bait-mockup {
        background: white;
        border-radius: 0.5rem;
        box-shadow: var(--shadow);
        overflow: hidden;
        
        .mockup-header {
          background: var(--primary-color);
          color: white;
          padding: 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          
          .bait-type-badge,
          .delivery-badge {
            background: rgba(255, 255, 255, 0.2);
            padding: 0.25rem 0.75rem;
            border-radius: 1rem;
            font-size: 0.9rem;
          }
        }
        
        .mockup-content {
          padding: 1.5rem;
          
          .bait-title {
            font-size: 1.25rem;
            font-weight: bold;
            color: var(--primary-color);
            margin-bottom: 1rem;
          }
          
          .bait-description {
            color: #666;
            margin-bottom: 1.5rem;
            line-height: 1.6;
          }
          
          .bait-visual {
            text-align: center;
            margin: 1.5rem 0;
            
            .usb-mockup,
            .document-mockup,
            .software-mockup {
              display: inline-block;
              padding: 2rem;
              background: var(--light-color);
              border-radius: 0.5rem;
              font-size: 1.25rem;
              color: var(--secondary-color);
            }
          }
        }
        
        .mockup-footer {
          background: rgba(231, 76, 60, 0.1);
          padding: 1rem;
          border-top: 1px solid var(--border-color);
          
          .warning-indicators {
            h5 {
              color: var(--danger-color);
              margin-bottom: 0.5rem;
            }
            
            ul {
              list-style: none;
              margin: 0;
              padding: 0;
              
              li {
                padding: 0.25rem 0;
                padding-left: 1.5rem;
                position: relative;
                color: var(--danger-color);
                font-size: 0.9rem;
                
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
  
  .deployment-settings {
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
    
    .deployment-options {
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
    border-left: 4px solid #f39c12;

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
        color: #f39c12;
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
        background: linear-gradient(90deg, #f39c12, #e67e22);
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
  
  .active-baits {
    margin-top: 3rem;
    
    h3 {
      color: var(--secondary-color);
      margin-bottom: 1rem;
    }
    
    .baits-list {
      .bait-item {
        display: flex;
        align-items: center;
        padding: 1.5rem;
        background: white;
        border-radius: 0.5rem;
        box-shadow: var(--shadow);
        margin-bottom: 1rem;
        
        .bait-info {
          flex: 1;
          
          .bait-header {
            display: flex;
            align-items: center;
            margin-bottom: 0.5rem;
            
            h4 {
              color: var(--primary-color);
              margin: 0;
              margin-right: 1rem;
            }
            
            .bait-status {
              padding: 0.25rem 0.75rem;
              border-radius: 1rem;
              font-size: 0.8rem;
              font-weight: bold;
              
              &.active {
                background: var(--success-color);
                color: white;
              }
              
              &.paused {
                background: var(--warning-color);
                color: white;
              }
              
              &.completed {
                background: var(--secondary-color);
                color: white;
              }
            }
          }
          
          .bait-details {
            display: flex;
            gap: 1rem;
            
            .detail {
              font-size: 0.9rem;
              color: #666;
            }
          }
        }
        
        .bait-metrics {
          display: flex;
          gap: 1rem;
          margin: 0 2rem;
          
          .metric {
            text-align: center;
            
            .metric-value {
              font-size: 1.25rem;
              font-weight: bold;
              color: var(--primary-color);
            }
            
            .metric-label {
              font-size: 0.8rem;
              color: #666;
            }
          }
        }
        
        .bait-actions {
          display: flex;
          gap: 0.5rem;
          
          .btn {
            padding: 0.5rem 1rem;
            font-size: 0.9rem;
          }
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .baiting-simulator {
    .simulation-actions {
      flex-direction: column;
      align-items: center;
    }
    
    .bait-item {
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;
      
      .bait-metrics {
        margin: 0;
        width: 100%;
        justify-content: space-around;
      }
      
      .bait-actions {
        width: 100%;
        justify-content: center;
      }
    }
    
    .type-grid {
      grid-template-columns: 1fr;
    }
  }
}
</style>
