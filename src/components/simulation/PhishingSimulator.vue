<template>
  <div class="phishing-simulator">
    <div class="simulator-header">
      <h2>📧 Email Phishing Simulator</h2>
      <p>Create realistic phishing email campaigns to test user awareness and detection systems</p>
    </div>

    <div class="simulator-controls">
      <div class="row">
        <div class="col-6">
          <div class="control-section">
            <h3>Campaign Configuration</h3>
            <div class="form-group">
              <label>Campaign Name</label>
              <input v-model="campaign.name" type="text" class="form-control" placeholder="Enter campaign name">
            </div>
            
            <div class="form-group">
              <label>Target Group</label>
              <select v-model="campaign.targetGroup" class="form-control">
                <option value="">Select target group</option>
                <option value="all-employees">All Employees</option>
                <option value="marketing">Marketing Department</option>
                <option value="it-support">IT Support</option>
                <option value="executives">Executive Team</option>
                <option value="custom">Custom Group</option>
              </select>
            </div>
            
            <div class="form-group">
              <label>Email Template</label>
              <select v-model="campaign.template" class="form-control" @change="loadTemplate">
                <option value="">Select template</option>
                <option v-for="template in emailTemplates" :key="template.id" :value="template.id">
                  {{ template.name }}
                </option>
              </select>
            </div>
            
            <div class="form-group">
              <label>Difficulty Level</label>
              <select v-model="campaign.difficulty" class="form-control">
                <option value="easy">Easy - Obvious indicators</option>
                <option value="medium">Medium - Some suspicious elements</option>
                <option value="hard">Hard - Sophisticated attack</option>
              </select>
            </div>
          </div>
        </div>
        
        <div class="col-6">
          <div class="control-section">
            <h3>Simulation Settings</h3>
            <div class="form-group">
              <label>Duration</label>
              <select v-model="campaign.duration" class="form-control">
                <option value="30">30 minutes</option>
                <option value="60">1 hour</option>
                <option value="120">2 hours</option>
                <option value="240">4 hours</option>
                <option value="480">8 hours</option>
              </select>
            </div>
            
            <div class="form-group">
              <label>Send Interval</label>
              <select v-model="campaign.interval" class="form-control">
                <option value="immediate">Send all immediately</option>
                <option value="5">Every 5 minutes</option>
                <option value="15">Every 15 minutes</option>
                <option value="30">Every 30 minutes</option>
                <option value="60">Every hour</option>
              </select>
            </div>
            
            <div class="form-group">
              <label class="checkbox-label">
                <input v-model="campaign.trackClicks" type="checkbox">
                Track link clicks
              </label>
            </div>
            
            <div class="form-group">
              <label class="checkbox-label">
                <input v-model="campaign.trackCredentials" type="checkbox">
                Track credential submissions
              </label>
            </div>
            
            <div class="form-group">
              <label class="checkbox-label">
                <input v-model="campaign.sendAlerts" type="checkbox">
                Send real-time alerts
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="email-preview" v-if="selectedTemplate">
      <h3>Email Preview</h3>
      <div class="email-container">
        <div class="email-header">
          <div class="email-field">
            <strong>From:</strong> {{ selectedTemplate.from }}
          </div>
          <div class="email-field">
            <strong>To:</strong> [Target Recipients]
          </div>
          <div class="email-field">
            <strong>Subject:</strong> {{ selectedTemplate.subject }}
          </div>
        </div>
        <div class="email-body" v-html="selectedTemplate.body"></div>
        <div class="email-indicators" v-if="selectedTemplate.indicators">
          <h4>Suspicious Indicators:</h4>
          <ul>
            <li v-for="indicator in selectedTemplate.indicators" :key="indicator">{{ indicator }}</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="simulation-actions">
      <button @click="previewCampaign" class="btn btn-secondary" :disabled="!isConfigValid || isExecuting">
        👁️ Preview Campaign
      </button>
      <button @click="startSimulation" class="btn btn-primary" :disabled="!isConfigValid || isExecuting">
        <span v-if="!isExecuting">🚀 Start Simulation</span>
        <span v-else>⏳ Running...</span>
      </button>
      <button @click="saveDraft" class="btn btn-secondary" :disabled="isExecuting">
        💾 Save as Draft
      </button>
    </div>

    <!-- Execution Progress -->
    <div v-if="isExecuting" class="execution-progress">
      <div class="progress-header">
        <h4>📧 Phishing Campaign in Progress</h4>
        <span class="progress-percentage">{{ executionProgress }}%</span>
      </div>
      <div class="progress-bar">
        <div class="progress-fill" :style="{ width: executionProgress + '%' }"></div>
      </div>
      <div class="progress-status">{{ executionStatus }}</div>
    </div>

    <div class="recent-campaigns" v-if="recentCampaigns.length > 0">
      <h3>Recent Campaigns</h3>
      <div class="campaigns-list">
        <div class="campaign-item" v-for="recentCampaign in recentCampaigns" :key="recentCampaign.id">
          <div class="campaign-info">
            <h4>{{ recentCampaign.name }}</h4>
            <p>{{ recentCampaign.description }}</p>
            <div class="campaign-stats">
              <span class="stat">📧 {{ recentCampaign.emailsSent }} sent</span>
              <span class="stat">👁️ {{ recentCampaign.clickRate }}% clicked</span>
              <span class="stat">🔍 {{ recentCampaign.detectionRate }}% detected</span>
            </div>
          </div>
          <div class="campaign-actions">
            <button @click="loadCampaign(recentCampaign.id)" class="btn btn-secondary">Load</button>
            <button @click="viewResults(recentCampaign.id)" class="btn btn-primary">Results</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PhishingSimulator',
  data() {
    return {
      campaign: {
        name: '',
        targetGroup: '',
        template: '',
        difficulty: 'medium',
        duration: '60',
        interval: 'immediate',
        trackClicks: true,
        trackCredentials: true,
        sendAlerts: true
      },
      emailTemplates: [
        {
          id: 'bank-security',
          name: 'Bank Security Alert',
          from: 'security@yourbank.com',
          subject: 'Urgent: Suspicious Activity Detected',
          body: `
            <p>Dear Valued Customer,</p>
            <p>We have detected suspicious activity on your account. For your security, we have temporarily limited access to your account.</p>
            <p>Please <a href="#" style="color: #007bff;">click here to verify your identity</a> and restore full access.</p>
            <p>If you do not verify within 24 hours, your account may be permanently suspended.</p>
            <p>Thank you for your immediate attention.</p>
            <p>Security Team<br>Your Bank</p>
          `,
          indicators: [
            'Generic greeting instead of personal name',
            'Urgent language creating pressure',
            'Suspicious link destination',
            'Threat of account suspension'
          ]
        },
        {
          id: 'it-support',
          name: 'IT Support Password Reset',
          from: 'it-support@company.com',
          subject: 'Password Reset Required - Action Needed',
          body: `
            <p>Hello,</p>
            <p>As part of our security upgrade, all employees must reset their passwords by end of day.</p>
            <p><a href="#" style="color: #007bff;">Click here to reset your password</a></p>
            <p>Failure to complete this process will result in account lockout.</p>
            <p>IT Support Team</p>
          `,
          indicators: [
            'Vague sender identification',
            'Urgent deadline pressure',
            'No specific company branding',
            'Generic IT support signature'
          ]
        },
        {
          id: 'package-delivery',
          name: 'Package Delivery Notification',
          from: 'delivery@fastship.com',
          subject: 'Package Delivery Failed - Reschedule Required',
          body: `
            <p>Dear Customer,</p>
            <p>We attempted to deliver your package but no one was available to receive it.</p>
            <p>Package Details:</p>
            <ul>
              <li>Tracking: FS123456789</li>
              <li>Sender: Online Store</li>
              <li>Value: ₦89.99</li>
            </ul>
            <p><a href="#" style="color: #007bff;">Click here to reschedule delivery</a></p>
            <p>FastShip Delivery Service</p>
          `,
          indicators: [
            'Unexpected package notification',
            'Generic sender information',
            'Suspicious tracking number format',
            'Pressure to click link immediately'
          ]
        }
      ],
      selectedTemplate: null,
      isExecuting: false,
      executionProgress: 0,
      executionStatus: '',
      recentCampaigns: [
        {
          id: 'camp-001',
          name: 'Q1 Security Awareness Test',
          description: 'Bank security alert template targeting all employees',
          emailsSent: 156,
          clickRate: 23,
          detectionRate: 87
        },
        {
          id: 'camp-002',
          name: 'IT Department Phishing Test',
          description: 'Password reset simulation for IT staff',
          emailsSent: 45,
          clickRate: 11,
          detectionRate: 94
        }
      ]
    }
  },
  computed: {
    isConfigValid() {
      return this.campaign.name && this.campaign.targetGroup && this.campaign.template
    }
  },
  methods: {
    loadTemplate() {
      this.selectedTemplate = this.emailTemplates.find(t => t.id === this.campaign.template)
    },
    previewCampaign() {
      // Show campaign preview modal
      this.showCampaignPreview()
    },

    showCampaignPreview() {
      const template = this.emailTemplates.find(t => t.id === this.campaign.template)
      const targetGroup = this.targetGroups.find(g => g.id === this.campaign.targetGroup)

      const previewContent = `
📧 PHISHING CAMPAIGN PREVIEW

🎯 Campaign Configuration:
• Name: ${this.campaign.name || 'Untitled Campaign'}
• Template: ${template ? template.name : 'No template selected'}
• Target Group: ${targetGroup ? targetGroup.name : 'No group selected'}
• Sender: ${this.campaign.sender}
• Subject: ${this.campaign.subject}

👥 Target Details:
• Group Size: ${targetGroup ? targetGroup.size : 0} recipients
• Department: ${targetGroup ? targetGroup.department : 'N/A'}
• Risk Level: ${targetGroup ? targetGroup.riskLevel : 'N/A'}

📋 Campaign Settings:
• Schedule: ${this.campaign.schedule}
• Tracking: ${this.campaign.tracking ? 'Enabled' : 'Disabled'}
• Follow-up: ${this.campaign.followUp ? 'Enabled' : 'Disabled'}

📧 Email Preview:
From: ${this.campaign.sender}
To: [Target Recipients]
Subject: ${this.campaign.subject}

${template ? template.content : 'No template content available'}

⚠️ This is a SIMULATION for security training purposes.
No actual malicious content will be sent.

Ready to proceed with this campaign?
      `

      alert(previewContent)
    },
    startSimulation() {
      if (!confirm('Start phishing simulation? This will send test emails to the selected target group.')) {
        return
      }

      this.isExecuting = true
      this.executionProgress = 0
      this.executionStatus = 'Preparing simulation...'

      this.simulatePhishingCampaign()
    },

    simulatePhishingCampaign() {
      const steps = [
        { progress: 15, status: 'Loading email template...', delay: 800 },
        { progress: 30, status: 'Preparing target list...', delay: 1200 },
        { progress: 50, status: 'Sending phishing emails...', delay: 2000 },
        { progress: 70, status: 'Monitoring user responses...', delay: 1800 },
        { progress: 90, status: 'Collecting results...', delay: 1000 },
        { progress: 100, status: 'Simulation complete!', delay: 500 }
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
              this.completeSimulation()
            }
          }, step.delay)
        }
      }

      executeStep()
    },

    completeSimulation() {
      const results = this.generateCampaignResults()
      this.showSimulationResults(results)

      this.$emit('simulation-started', {
        type: 'phishing',
        config: this.campaign,
        results: results
      })

      setTimeout(() => {
        this.isExecuting = false
        this.executionProgress = 0
        this.executionStatus = ''
      }, 2000)
    },

    generateCampaignResults() {
      const emailsSent = Math.floor(Math.random() * 50) + 20 // 20-70 emails
      const clickRate = Math.floor(Math.random() * 25) + 15 // 15-40% click rate
      const detectionRate = Math.floor(Math.random() * 30) + 70 // 70-100% detection rate
      const emailsClicked = Math.floor((emailsSent * clickRate) / 100)

      return {
        id: `PHISH-${Date.now()}`,
        timestamp: new Date().toLocaleString(),
        emailsSent,
        emailsClicked,
        clickRate,
        detectionRate,
        credentialsSubmitted: Math.floor(emailsClicked * 0.6),
        reportedByUsers: Math.floor(emailsSent * (detectionRate / 100)),
        avgResponseTime: (Math.random() * 3 + 1).toFixed(1) + 's'
      }
    },

    showSimulationResults(results) {
      const message = `
📧 Phishing Simulation Complete!

📊 Campaign Results:
• Emails Sent: ${results.emailsSent}
• Click Rate: ${results.clickRate}%
• Detection Rate: ${results.detectionRate}%
• Response Time: ${results.avgResponseTime}

🎯 User Interactions:
• Emails Clicked: ${results.emailsClicked}
• Credentials Submitted: ${results.credentialsSubmitted}
• Reported by Users: ${results.reportedByUsers}

Campaign ID: ${results.id}
      `

      alert(message)
    },
    saveDraft() {
      const draftId = `DRAFT-${Date.now()}`
      const draftData = {
        id: draftId,
        name: this.campaign.name || 'Untitled Campaign',
        type: 'phishing',
        config: { ...this.campaign },
        savedAt: new Date().toLocaleString(),
        status: 'draft'
      }

      // In a real application, this would save to a database
      // For now, we'll simulate saving to localStorage
      const existingDrafts = JSON.parse(localStorage.getItem('campaignDrafts') || '[]')
      existingDrafts.push(draftData)
      localStorage.setItem('campaignDrafts', JSON.stringify(existingDrafts))

      alert(`✅ Campaign draft saved successfully!\n\nDraft ID: ${draftId}\nSaved at: ${draftData.savedAt}\n\nYou can load this draft later from the campaign library.`)
    },
    loadCampaign(id) {
      console.log('Loading campaign:', id)
      // Load existing campaign configuration
    },
    viewResults(id) {
      console.log('Viewing results for campaign:', id)
      this.$router.push(`/analytics?campaign=${id}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.phishing-simulator {
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
  
  .control-section {
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
    }
  }
  
  .email-preview {
    margin: 2rem 0;
    
    h3 {
      color: var(--secondary-color);
      margin-bottom: 1rem;
    }
    
    .email-container {
      background: white;
      border: 1px solid var(--border-color);
      border-radius: 0.5rem;
      overflow: hidden;
      
      .email-header {
        background: var(--light-color);
        padding: 1rem;
        border-bottom: 1px solid var(--border-color);
        
        .email-field {
          margin-bottom: 0.5rem;
          
          &:last-child {
            margin-bottom: 0;
          }
        }
      }
      
      .email-body {
        padding: 1.5rem;
        line-height: 1.6;
        
        a {
          color: var(--secondary-color);
          text-decoration: underline;
        }
      }
      
      .email-indicators {
        background: rgba(231, 76, 60, 0.1);
        padding: 1rem;
        border-top: 1px solid var(--border-color);
        
        h4 {
          color: var(--danger-color);
          margin-bottom: 0.5rem;
        }
        
        ul {
          margin: 0;
          padding-left: 1.5rem;
          
          li {
            margin-bottom: 0.25rem;
            color: var(--danger-color);
          }
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
    border-left: 4px solid var(--primary-color);

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
        background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
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
  
  .recent-campaigns {
    margin-top: 3rem;
    
    h3 {
      color: var(--secondary-color);
      margin-bottom: 1rem;
    }
    
    .campaigns-list {
      .campaign-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.5rem;
        background: var(--light-color);
        border-radius: 0.5rem;
        margin-bottom: 1rem;
        
        .campaign-info {
          flex: 1;
          
          h4 {
            color: var(--primary-color);
            margin-bottom: 0.5rem;
          }
          
          p {
            color: #666;
            margin-bottom: 0.5rem;
          }
          
          .campaign-stats {
            display: flex;
            gap: 1rem;
            
            .stat {
              font-size: 0.9rem;
              color: var(--secondary-color);
            }
          }
        }
        
        .campaign-actions {
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
  .phishing-simulator {
    .simulation-actions {
      flex-direction: column;
      align-items: center;
    }
    
    .campaign-item {
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;
      
      .campaign-actions {
        width: 100%;
        justify-content: center;
      }
    }
  }
}
</style>
