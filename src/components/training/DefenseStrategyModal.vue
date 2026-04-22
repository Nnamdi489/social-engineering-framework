<template>
  <div v-if="visible" class="strategy-modal-overlay" @click="closeModal">
    <div class="strategy-modal" @click.stop>
      <div class="modal-header">
        <div class="strategy-info">
          <h2>🛡️ {{ currentStrategy.name }}</h2>
          <div class="strategy-meta">
            <span class="effectiveness-badge">{{ currentStrategy.effectiveness }}% Effective</span>
            <span class="complexity-badge" :class="getComplexityClass()">{{ getComplexityLevel() }}</span>
          </div>
          <div class="progress-indicator">
            <div class="progress-bar">
              <div class="progress-fill" :style="{ width: progressPercentage + '%' }"></div>
            </div>
            <span class="progress-text">Step {{ currentStep + 1 }} / {{ totalSteps }}</span>
          </div>
        </div>
        <button @click="closeModal" class="close-btn">×</button>
      </div>
      
      <div class="modal-body">
        <!-- Strategy Overview -->
        <div v-if="currentStep === 0" class="strategy-step overview-step">
          <div class="step-icon">🎯</div>
          <h3>Strategy Overview</h3>
          <p class="strategy-description">{{ currentStrategy.description }}</p>
          
          <div class="strategy-details">
            <div class="detail-section">
              <h4>📊 Expected Benefits</h4>
              <ul class="benefits-list">
                <li v-for="benefit in currentStrategy.benefits" :key="benefit">{{ benefit }}</li>
              </ul>
            </div>
            
            <div class="detail-section">
              <h4>💰 Investment Analysis</h4>
              <div class="investment-grid">
                <div class="investment-item">
                  <div class="investment-label">Implementation Cost</div>
                  <div class="investment-value">{{ getImplementationCost() }}</div>
                </div>
                <div class="investment-item">
                  <div class="investment-label">Annual Savings</div>
                  <div class="investment-value">{{ getAnnualSavings() }}</div>
                </div>
                <div class="investment-item">
                  <div class="investment-label">ROI Timeline</div>
                  <div class="investment-value">{{ getROITimeline() }}</div>
                </div>
              </div>
            </div>
            
            <div class="detail-section">
              <h4>⚠️ Implementation Considerations</h4>
              <ul class="considerations-list">
                <li v-for="consideration in getConsiderations()" :key="consideration">{{ consideration }}</li>
              </ul>
            </div>
          </div>
        </div>
        
        <!-- Implementation Steps -->
        <div v-else-if="currentStep <= implementationSteps.length" class="strategy-step implementation-step">
          <div class="step-header">
            <div class="step-number">{{ currentStep }}</div>
            <div class="step-info">
              <h3>{{ currentImplementationStep.title }}</h3>
              <div class="step-meta">
                <span class="duration">⏱️ {{ currentImplementationStep.duration }}</span>
                <span class="difficulty" :class="currentImplementationStep.difficulty.toLowerCase()">
                  {{ currentImplementationStep.difficulty }}
                </span>
              </div>
            </div>
          </div>
          
          <div class="step-content">
            <div class="step-description">
              <p>{{ currentImplementationStep.description }}</p>
            </div>
            
            <div v-if="currentImplementationStep.tasks" class="step-tasks">
              <h4>📋 Tasks to Complete</h4>
              <div class="tasks-list">
                <div 
                  v-for="(task, index) in currentImplementationStep.tasks" 
                  :key="index"
                  class="task-item"
                  :class="{ completed: completedTasks.includes(`${currentStep}-${index}`) }"
                  @click="toggleTask(`${currentStep}-${index}`)"
                >
                  <div class="task-checkbox">
                    <span v-if="completedTasks.includes(`${currentStep}-${index}`)">✓</span>
                  </div>
                  <div class="task-content">
                    <div class="task-title">{{ task.title }}</div>
                    <div class="task-description">{{ task.description }}</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div v-if="currentImplementationStep.resources" class="step-resources">
              <h4>📚 Resources & Tools</h4>
              <div class="resources-list">
                <div v-for="resource in currentImplementationStep.resources" :key="resource.name" class="resource-item">
                  <div class="resource-icon">{{ resource.icon }}</div>
                  <div class="resource-content">
                    <div class="resource-name">{{ resource.name }}</div>
                    <div class="resource-description">{{ resource.description }}</div>
                  </div>
                  <button @click="accessResource(resource)" class="resource-btn">Access</button>
                </div>
              </div>
            </div>
            
            <div v-if="currentImplementationStep.validation" class="step-validation">
              <h4>✅ Validation Checklist</h4>
              <div class="validation-list">
                <div 
                  v-for="(check, index) in currentImplementationStep.validation" 
                  :key="index"
                  class="validation-item"
                  :class="{ validated: validatedChecks.includes(`${currentStep}-${index}`) }"
                  @click="toggleValidation(`${currentStep}-${index}`)"
                >
                  <div class="validation-checkbox">
                    <span v-if="validatedChecks.includes(`${currentStep}-${index}`)">✓</span>
                  </div>
                  <div class="validation-text">{{ check }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Implementation Complete -->
        <div v-else class="strategy-step completion-step">
          <div class="completion-icon">🎉</div>
          <h3>Implementation Complete!</h3>
          <p>Congratulations! You've successfully implemented {{ currentStrategy.name }}.</p>
          
          <div class="completion-stats">
            <div class="stat-item">
              <div class="stat-value">{{ implementationSteps.length }}</div>
              <div class="stat-label">Steps Completed</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">{{ completedTasks.length }}</div>
              <div class="stat-label">Tasks Finished</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">{{ Math.round(implementationScore) }}%</div>
              <div class="stat-label">Implementation Score</div>
            </div>
          </div>
          
          <div class="next-steps">
            <h4>🚀 Next Steps</h4>
            <div class="next-steps-list">
              <div class="next-step-item">
                <div class="next-step-icon">📊</div>
                <div class="next-step-content">
                  <h5>Monitor Effectiveness</h5>
                  <p>Track key metrics to measure the impact of your implementation</p>
                </div>
              </div>
              <div class="next-step-item">
                <div class="next-step-icon">🔄</div>
                <div class="next-step-content">
                  <h5>Continuous Improvement</h5>
                  <p>Regularly review and optimize your defense strategy</p>
                </div>
              </div>
              <div class="next-step-item">
                <div class="next-step-icon">📚</div>
                <div class="next-step-content">
                  <h5>Team Training</h5>
                  <p>Ensure all team members understand the new security measures</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="implementation-certificate">
            <h4>🏆 Implementation Certificate</h4>
            <div class="certificate-card">
              <div class="certificate-header">Defense Strategy Implementation</div>
              <div class="certificate-strategy">{{ currentStrategy.name }}</div>
              <div class="certificate-score">Score: {{ Math.round(implementationScore) }}%</div>
              <div class="certificate-id">ID: {{ implementationId }}</div>
              <div class="certificate-date">{{ completionDate }}</div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="modal-footer">
        <div class="footer-left">
          <button v-if="currentStep > 0" @click="previousStep" class="btn btn-secondary">
            ← Previous
          </button>
        </div>
        
        <div class="footer-center">
          <div v-if="currentStep > 0 && currentStep <= implementationSteps.length" class="step-progress">
            <span class="progress-label">Step Progress:</span>
            <div class="mini-progress">
              <div class="mini-progress-fill" :style="{ width: stepProgressPercentage + '%' }"></div>
            </div>
            <span class="progress-percentage">{{ Math.round(stepProgressPercentage) }}%</span>
          </div>
        </div>
        
        <div class="footer-right">
          <button 
            v-if="currentStep < totalSteps - 1" 
            @click="nextStep" 
            class="btn btn-primary"
            :disabled="!canProceed"
          >
            {{ getNextButtonText() }}
          </button>
          <button 
            v-else-if="currentStep === totalSteps - 1" 
            @click="completeImplementation" 
            class="btn btn-success"
          >
            🎯 Complete Implementation
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DefenseStrategyModal',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    strategy: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      currentStep: 0,
      completedTasks: [],
      validatedChecks: [],
      implementationScore: 0,
      implementationId: '',
      completionDate: '',
      implementationSteps: []
    }
  },
  computed: {
    currentStrategy() {
      return this.strategy || {}
    },
    totalSteps() {
      return this.implementationSteps.length + 2 // overview + steps + completion
    },
    progressPercentage() {
      return Math.round((this.currentStep / (this.totalSteps - 1)) * 100)
    },
    currentImplementationStep() {
      if (this.currentStep === 0 || this.currentStep > this.implementationSteps.length) {
        return null
      }
      return this.implementationSteps[this.currentStep - 1]
    },
    canProceed() {
      if (this.currentStep === 0) return true
      
      const step = this.currentImplementationStep
      if (!step) return true
      
      // Check if required tasks are completed
      if (step.tasks) {
        const requiredTasks = step.tasks.filter(task => task.required !== false)
        const completedRequiredTasks = requiredTasks.filter((task, index) => 
          this.completedTasks.includes(`${this.currentStep}-${index}`)
        )
        if (completedRequiredTasks.length < requiredTasks.length) {
          return false
        }
      }
      
      // Check if validation is required and completed
      if (step.validation && step.validation.length > 0) {
        const completedValidations = step.validation.filter((check, index) => 
          this.validatedChecks.includes(`${this.currentStep}-${index}`)
        )
        return completedValidations.length >= Math.ceil(step.validation.length * 0.8) // 80% validation required
      }
      
      return true
    },
    stepProgressPercentage() {
      const step = this.currentImplementationStep
      if (!step) return 100
      
      let totalItems = 0
      let completedItems = 0
      
      if (step.tasks) {
        totalItems += step.tasks.length
        completedItems += step.tasks.filter((task, index) => 
          this.completedTasks.includes(`${this.currentStep}-${index}`)
        ).length
      }
      
      if (step.validation) {
        totalItems += step.validation.length
        completedItems += step.validation.filter((check, index) => 
          this.validatedChecks.includes(`${this.currentStep}-${index}`)
        ).length
      }
      
      return totalItems > 0 ? (completedItems / totalItems) * 100 : 100
    }
  },
  watch: {
    visible(newVal) {
      if (newVal) {
        this.initializeImplementation()
      }
    }
  },
  methods: {
    initializeImplementation() {
      this.currentStep = 0
      this.completedTasks = []
      this.validatedChecks = []
      this.implementationScore = 0
      this.implementationId = `IMPL-${Date.now()}`
      this.completionDate = new Date().toLocaleString()
      
      this.generateImplementationSteps()
    },
    
    generateImplementationSteps() {
      // Generate implementation steps based on strategy
      this.implementationSteps = this.getStrategySteps(this.currentStrategy.id)
    },
    
    getStrategySteps(strategyId) {
      const steps = {
        'email-filtering': [
          {
            title: 'Requirements Analysis',
            duration: '2-3 days',
            difficulty: 'Medium',
            description: 'Analyze current email infrastructure and define filtering requirements based on organizational needs.',
            tasks: [
              {
                title: 'Assess current email volume and patterns',
                description: 'Analyze email traffic, common attack vectors, and user behavior patterns',
                required: true
              },
              {
                title: 'Define filtering criteria and policies',
                description: 'Establish rules for spam, phishing, and malware detection',
                required: true
              },
              {
                title: 'Identify integration requirements',
                description: 'Determine how the solution will integrate with existing systems',
                required: true
              }
            ],
            resources: [
              {
                name: 'Email Security Assessment Tool',
                description: 'Automated tool to analyze current email security posture',
                icon: '🔍'
              },
              {
                name: 'Policy Template Library',
                description: 'Pre-built email security policy templates',
                icon: '📋'
              }
            ],
            validation: [
              'Requirements document completed and approved',
              'Stakeholder sign-off obtained',
              'Integration plan documented'
            ]
          },
          {
            title: 'Solution Selection & Procurement',
            duration: '1-2 weeks',
            difficulty: 'Medium',
            description: 'Evaluate and select the most appropriate email filtering solution for your organization.',
            tasks: [
              {
                title: 'Vendor evaluation and comparison',
                description: 'Compare features, pricing, and capabilities of different solutions',
                required: true
              },
              {
                title: 'Proof of concept testing',
                description: 'Test selected solutions with sample email traffic',
                required: true
              },
              {
                title: 'Contract negotiation and procurement',
                description: 'Finalize licensing, support, and implementation terms',
                required: true
              }
            ],
            resources: [
              {
                name: 'Vendor Comparison Matrix',
                description: 'Structured comparison of email security vendors',
                icon: '📊'
              },
              {
                name: 'POC Testing Framework',
                description: 'Standardized testing procedures for email security solutions',
                icon: '🧪'
              }
            ],
            validation: [
              'Vendor selected and contracts signed',
              'POC results documented',
              'Implementation timeline agreed'
            ]
          },
          {
            title: 'Deployment & Configuration',
            duration: '1-2 weeks',
            difficulty: 'High',
            description: 'Deploy and configure the email filtering solution in your environment.',
            tasks: [
              {
                title: 'Install and configure filtering infrastructure',
                description: 'Set up hardware/software and configure basic settings',
                required: true
              },
              {
                title: 'Configure filtering rules and policies',
                description: 'Implement the filtering criteria defined in step 1',
                required: true
              },
              {
                title: 'Integrate with existing email systems',
                description: 'Connect the solution to your email infrastructure',
                required: true
              },
              {
                title: 'Set up monitoring and alerting',
                description: 'Configure dashboards and alerts for security events',
                required: false
              }
            ],
            resources: [
              {
                name: 'Configuration Guide',
                description: 'Step-by-step configuration instructions',
                icon: '📖'
              },
              {
                name: 'Integration Scripts',
                description: 'Automated scripts for system integration',
                icon: '⚙️'
              }
            ],
            validation: [
              'System deployed and operational',
              'All filtering rules active',
              'Integration testing completed',
              'Monitoring dashboards functional'
            ]
          },
          {
            title: 'Testing & Validation',
            duration: '3-5 days',
            difficulty: 'Medium',
            description: 'Thoroughly test the implemented solution to ensure it meets requirements.',
            tasks: [
              {
                title: 'Conduct comprehensive testing',
                description: 'Test all filtering scenarios and edge cases',
                required: true
              },
              {
                title: 'Validate false positive rates',
                description: 'Ensure legitimate emails are not blocked',
                required: true
              },
              {
                title: 'Performance and load testing',
                description: 'Verify system performance under normal and peak loads',
                required: true
              }
            ],
            resources: [
              {
                name: 'Testing Scenarios Library',
                description: 'Comprehensive test cases for email security',
                icon: '🎯'
              },
              {
                name: 'Performance Testing Tools',
                description: 'Tools for load and performance testing',
                icon: '⚡'
              }
            ],
            validation: [
              'All test scenarios passed',
              'False positive rate < 2%',
              'Performance requirements met',
              'User acceptance testing completed'
            ]
          }
        ],
        'security-training': [
          {
            title: 'Training Needs Assessment',
            duration: '1 week',
            difficulty: 'Low',
            description: 'Assess current security awareness levels and identify training requirements.',
            tasks: [
              {
                title: 'Conduct security awareness survey',
                description: 'Survey employees to understand current knowledge levels',
                required: true
              },
              {
                title: 'Analyze historical security incidents',
                description: 'Review past incidents to identify training focus areas',
                required: true
              },
              {
                title: 'Define training objectives and success metrics',
                description: 'Set clear goals and measurable outcomes for the training program',
                required: true
              }
            ],
            validation: [
              'Assessment results documented',
              'Training objectives defined',
              'Success metrics established'
            ]
          },
          {
            title: 'Training Program Development',
            duration: '2-3 weeks',
            difficulty: 'Medium',
            description: 'Develop comprehensive security awareness training content and materials.',
            tasks: [
              {
                title: 'Create role-based training modules',
                description: 'Develop training content tailored to different job functions',
                required: true
              },
              {
                title: 'Design interactive exercises and simulations',
                description: 'Create hands-on learning experiences',
                required: true
              },
              {
                title: 'Develop assessment and certification materials',
                description: 'Create tests and certification criteria',
                required: true
              }
            ],
            validation: [
              'Training modules completed',
              'Interactive content tested',
              'Assessment materials validated'
            ]
          }
        ]
      }
      
      return steps[strategyId] || [
        {
          title: 'Planning Phase',
          duration: '1 week',
          difficulty: 'Medium',
          description: 'Plan the implementation of this defense strategy.',
          tasks: [
            { title: 'Define implementation scope', description: 'Clearly define what will be implemented', required: true },
            { title: 'Identify required resources', description: 'Determine personnel, budget, and tools needed', required: true }
          ],
          validation: ['Implementation plan approved', 'Resources allocated']
        },
        {
          title: 'Implementation Phase',
          duration: '2-4 weeks',
          difficulty: 'High',
          description: 'Execute the implementation plan.',
          tasks: [
            { title: 'Deploy solution components', description: 'Install and configure necessary systems', required: true },
            { title: 'Configure security policies', description: 'Set up appropriate security rules and policies', required: true }
          ],
          validation: ['Solution deployed successfully', 'Policies configured and active']
        }
      ]
    },
    
    nextStep() {
      if (this.canProceed) {
        this.currentStep++
      }
    },
    
    previousStep() {
      if (this.currentStep > 0) {
        this.currentStep--
      }
    },
    
    toggleTask(taskId) {
      const index = this.completedTasks.indexOf(taskId)
      if (index > -1) {
        this.completedTasks.splice(index, 1)
      } else {
        this.completedTasks.push(taskId)
      }
    },
    
    toggleValidation(checkId) {
      const index = this.validatedChecks.indexOf(checkId)
      if (index > -1) {
        this.validatedChecks.splice(index, 1)
      } else {
        this.validatedChecks.push(checkId)
      }
    },
    
    accessResource(resource) {
      alert(`🔗 Accessing ${resource.name}\n\n${resource.description}\n\nIn a real implementation, this would open the actual resource or tool.`)
    },
    
    getNextButtonText() {
      if (!this.canProceed) {
        const step = this.currentImplementationStep
        if (step && step.tasks) {
          const requiredTasks = step.tasks.filter(task => task.required !== false)
          const completedRequiredTasks = requiredTasks.filter((task, index) => 
            this.completedTasks.includes(`${this.currentStep}-${index}`)
          )
          if (completedRequiredTasks.length < requiredTasks.length) {
            return 'Complete required tasks first'
          }
        }
        return 'Complete validation checks'
      }
      return 'Next Step →'
    },
    
    completeImplementation() {
      // Calculate implementation score
      let totalPossiblePoints = 0
      let earnedPoints = 0
      
      this.implementationSteps.forEach((step, stepIndex) => {
        if (step.tasks) {
          step.tasks.forEach((task, taskIndex) => {
            totalPossiblePoints += task.required !== false ? 10 : 5
            if (this.completedTasks.includes(`${stepIndex + 1}-${taskIndex}`)) {
              earnedPoints += task.required !== false ? 10 : 5
            }
          })
        }
        
        if (step.validation) {
          step.validation.forEach((check, checkIndex) => {
            totalPossiblePoints += 5
            if (this.validatedChecks.includes(`${stepIndex + 1}-${checkIndex}`)) {
              earnedPoints += 5
            }
          })
        }
      })
      
      this.implementationScore = totalPossiblePoints > 0 ? (earnedPoints / totalPossiblePoints) * 100 : 100
      this.currentStep = this.totalSteps - 1
      
      // Emit completion event
      this.$emit('implementation-completed', {
        strategyId: this.currentStrategy.id,
        strategyName: this.currentStrategy.name,
        implementationId: this.implementationId,
        completedAt: this.completionDate,
        score: Math.round(this.implementationScore),
        completedTasks: this.completedTasks.length,
        totalTasks: this.getTotalTasks(),
        completedValidations: this.validatedChecks.length,
        totalValidations: this.getTotalValidations()
      })
    },
    
    getTotalTasks() {
      return this.implementationSteps.reduce((total, step) => {
        return total + (step.tasks ? step.tasks.length : 0)
      }, 0)
    },
    
    getTotalValidations() {
      return this.implementationSteps.reduce((total, step) => {
        return total + (step.validation ? step.validation.length : 0)
      }, 0)
    },
    
    getComplexityLevel() {
      const stepCount = this.implementationSteps.length
      if (stepCount <= 2) return 'Low'
      if (stepCount <= 4) return 'Medium'
      return 'High'
    },
    
    getComplexityClass() {
      const level = this.getComplexityLevel().toLowerCase()
      return {
        'low': 'success',
        'medium': 'warning',
        'high': 'danger'
      }[level] || 'info'
    },
    
    getImplementationCost() {
      const costs = {
        'email-filtering': '₦15,000 - ₦50,000',
        'endpoint-protection': '₦25,000 - ₦75,000',
        'security-training': '₦5,000 - ₦20,000'
      }
      return costs[this.currentStrategy.id] || '₦10,000 - ₦30,000'
    },
    
    getAnnualSavings() {
      const savings = {
        'email-filtering': '₦200,000 - ₦500,000',
        'endpoint-protection': '₦150,000 - ₦400,000',
        'security-training': '₦100,000 - ₦300,000'
      }
      return savings[this.currentStrategy.id] || '₦75,000 - ₦250,000'
    },
    
    getROITimeline() {
      const timelines = {
        'email-filtering': '6-12 months',
        'endpoint-protection': '8-15 months',
        'security-training': '12-18 months'
      }
      return timelines[this.currentStrategy.id] || '9-15 months'
    },
    
    getConsiderations() {
      const considerations = {
        'email-filtering': [
          'May require user training on new interface',
          'Potential for false positives affecting business',
          'Integration with existing email systems required'
        ],
        'endpoint-protection': [
          'Performance impact on older devices',
          'User acceptance and training required',
          'Ongoing maintenance and updates needed'
        ],
        'security-training': [
          'Requires ongoing commitment and resources',
          'Effectiveness depends on user engagement',
          'Must be tailored to organizational culture'
        ]
      }
      return considerations[this.currentStrategy.id] || [
        'Budget and resource allocation required',
        'Change management considerations',
        'Ongoing maintenance and support needed'
      ]
    },
    
    closeModal() {
      if (this.currentStep > 0 && this.currentStep < this.totalSteps - 1) {
        if (confirm('Are you sure you want to exit? Your implementation progress will be lost.')) {
          this.$emit('close')
        }
      } else {
        this.$emit('close')
      }
    }
  },
  
  emits: ['close', 'implementation-completed']
}
</script>

<style lang="scss" scoped>
.strategy-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 2rem;
}

.strategy-modal {
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
  align-items: flex-start;
  padding: 1.5rem;
  border-bottom: 1px solid var(--border-color);
  background: var(--light-color);
  border-radius: 0.5rem 0.5rem 0 0;
  
  .strategy-info {
    flex: 1;
    
    h2 {
      margin: 0 0 1rem 0;
      color: var(--primary-color);
    }
    
    .strategy-meta {
      display: flex;
      gap: 1rem;
      margin-bottom: 1rem;
      
      .effectiveness-badge {
        background: var(--success-color);
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 1rem;
        font-size: 0.9rem;
        font-weight: bold;
      }
      
      .complexity-badge {
        padding: 0.5rem 1rem;
        border-radius: 1rem;
        font-size: 0.9rem;
        font-weight: bold;
        
        &.success {
          background: var(--success-color);
          color: white;
        }
        
        &.warning {
          background: var(--warning-color);
          color: white;
        }
        
        &.danger {
          background: var(--danger-color);
          color: white;
        }
      }
    }
    
    .progress-indicator {
      display: flex;
      align-items: center;
      gap: 1rem;
      
      .progress-bar {
        flex: 1;
        height: 8px;
        background: var(--border-color);
        border-radius: 4px;
        overflow: hidden;
        
        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--primary-color), var(--success-color));
          transition: width 0.5s ease;
        }
      }
      
      .progress-text {
        font-size: 0.9rem;
        color: var(--secondary-color);
        font-weight: 500;
      }
    }
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
  overflow-y: auto;
  padding: 2rem;
}

.strategy-step {
  .step-icon {
    font-size: 3rem;
    text-align: center;
    margin-bottom: 1rem;
  }
  
  h3 {
    color: var(--primary-color);
    text-align: center;
    margin-bottom: 1.5rem;
  }
}

.overview-step {
  .strategy-description {
    font-size: 1.1rem;
    line-height: 1.6;
    margin-bottom: 2rem;
    text-align: center;
    color: #666;
  }
  
  .strategy-details {
    .detail-section {
      background: var(--light-color);
      padding: 1.5rem;
      border-radius: 0.5rem;
      margin-bottom: 1.5rem;
      
      h4 {
        color: var(--secondary-color);
        margin-bottom: 1rem;
      }
      
      .benefits-list,
      .considerations-list {
        margin: 0;
        padding-left: 1.5rem;
        
        li {
          margin-bottom: 0.5rem;
          line-height: 1.5;
        }
      }
      
      .investment-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;
        
        .investment-item {
          background: white;
          padding: 1rem;
          border-radius: 0.25rem;
          text-align: center;
          
          .investment-label {
            font-size: 0.9rem;
            color: #666;
            margin-bottom: 0.5rem;
          }
          
          .investment-value {
            font-weight: bold;
            color: var(--primary-color);
            font-size: 1.1rem;
          }
        }
      }
    }
  }
}

.implementation-step {
  .step-header {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    margin-bottom: 2rem;
    
    .step-number {
      background: var(--primary-color);
      color: white;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      font-weight: bold;
      flex-shrink: 0;
    }
    
    .step-info {
      flex: 1;
      
      h3 {
        margin: 0 0 0.5rem 0;
        text-align: left;
      }
      
      .step-meta {
        display: flex;
        gap: 1rem;
        
        .duration {
          color: var(--secondary-color);
          font-size: 0.9rem;
        }
        
        .difficulty {
          padding: 0.25rem 0.75rem;
          border-radius: 1rem;
          font-size: 0.8rem;
          font-weight: bold;
          
          &.low {
            background: var(--success-color);
            color: white;
          }
          
          &.medium {
            background: var(--warning-color);
            color: white;
          }
          
          &.high {
            background: var(--danger-color);
            color: white;
          }
        }
      }
    }
  }
  
  .step-content {
    .step-description {
      background: var(--light-color);
      padding: 1.5rem;
      border-radius: 0.5rem;
      margin-bottom: 2rem;
      
      p {
        margin: 0;
        line-height: 1.6;
      }
    }
    
    .step-tasks,
    .step-resources,
    .step-validation {
      margin-bottom: 2rem;
      
      h4 {
        color: var(--secondary-color);
        margin-bottom: 1rem;
      }
    }
    
    .tasks-list {
      .task-item {
        display: flex;
        align-items: flex-start;
        padding: 1rem;
        background: white;
        border: 2px solid var(--border-color);
        border-radius: 0.5rem;
        margin-bottom: 0.75rem;
        cursor: pointer;
        transition: all 0.3s ease;
        
        &:hover {
          border-color: var(--primary-color);
        }
        
        &.completed {
          border-color: var(--success-color);
          background: rgba(39, 174, 96, 0.1);
        }
        
        .task-checkbox {
          width: 24px;
          height: 24px;
          border: 2px solid var(--border-color);
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 1rem;
          flex-shrink: 0;
          
          span {
            color: var(--success-color);
            font-weight: bold;
          }
        }
        
        &.completed .task-checkbox {
          border-color: var(--success-color);
          background: var(--success-color);
          
          span {
            color: white;
          }
        }
        
        .task-content {
          flex: 1;
          
          .task-title {
            font-weight: 600;
            color: var(--primary-color);
            margin-bottom: 0.5rem;
          }
          
          .task-description {
            color: #666;
            font-size: 0.9rem;
            line-height: 1.5;
          }
        }
      }
    }
    
    .resources-list {
      .resource-item {
        display: flex;
        align-items: center;
        padding: 1rem;
        background: rgba(52, 152, 219, 0.1);
        border-radius: 0.5rem;
        margin-bottom: 0.75rem;
        
        .resource-icon {
          font-size: 1.5rem;
          margin-right: 1rem;
        }
        
        .resource-content {
          flex: 1;
          
          .resource-name {
            font-weight: 600;
            color: var(--primary-color);
            margin-bottom: 0.25rem;
          }
          
          .resource-description {
            color: #666;
            font-size: 0.9rem;
          }
        }
        
        .resource-btn {
          background: var(--primary-color);
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 0.25rem;
          cursor: pointer;
          font-size: 0.9rem;
          
          &:hover {
            background: var(--secondary-color);
          }
        }
      }
    }
    
    .validation-list {
      .validation-item {
        display: flex;
        align-items: center;
        padding: 0.75rem;
        background: rgba(243, 156, 18, 0.1);
        border-radius: 0.5rem;
        margin-bottom: 0.5rem;
        cursor: pointer;
        transition: all 0.3s ease;
        
        &:hover {
          background: rgba(243, 156, 18, 0.2);
        }
        
        &.validated {
          background: rgba(39, 174, 96, 0.1);
        }
        
        .validation-checkbox {
          width: 20px;
          height: 20px;
          border: 2px solid var(--warning-color);
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 1rem;
          flex-shrink: 0;
          
          span {
            color: var(--success-color);
            font-weight: bold;
            font-size: 0.8rem;
          }
        }
        
        &.validated .validation-checkbox {
          border-color: var(--success-color);
          background: var(--success-color);
          
          span {
            color: white;
          }
        }
        
        .validation-text {
          flex: 1;
          font-size: 0.9rem;
          line-height: 1.4;
        }
      }
    }
  }
}

.completion-step {
  text-align: center;
  
  .completion-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
  }
  
  .completion-stats {
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin: 2rem 0;
    flex-wrap: wrap;
    
    .stat-item {
      background: var(--light-color);
      padding: 1.5rem;
      border-radius: 0.5rem;
      min-width: 120px;
      
      .stat-value {
        font-size: 2rem;
        font-weight: bold;
        color: var(--primary-color);
        margin-bottom: 0.5rem;
      }
      
      .stat-label {
        color: #666;
        font-size: 0.9rem;
      }
    }
  }
  
  .next-steps {
    text-align: left;
    background: var(--light-color);
    padding: 2rem;
    border-radius: 0.5rem;
    margin: 2rem 0;
    
    h4 {
      color: var(--primary-color);
      margin-bottom: 1.5rem;
      text-align: center;
    }
    
    .next-steps-list {
      .next-step-item {
        display: flex;
        align-items: flex-start;
        margin-bottom: 1.5rem;
        
        &:last-child {
          margin-bottom: 0;
        }
        
        .next-step-icon {
          font-size: 1.5rem;
          margin-right: 1rem;
          margin-top: 0.25rem;
        }
        
        .next-step-content {
          flex: 1;
          
          h5 {
            color: var(--secondary-color);
            margin: 0 0 0.5rem 0;
          }
          
          p {
            margin: 0;
            color: #666;
            line-height: 1.5;
          }
        }
      }
    }
  }
  
  .implementation-certificate {
    margin-top: 2rem;
    
    h4 {
      color: var(--secondary-color);
      margin-bottom: 1rem;
    }
    
    .certificate-card {
      background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
      color: white;
      padding: 2rem;
      border-radius: 0.5rem;
      max-width: 500px;
      margin: 0 auto;
      
      .certificate-header {
        font-size: 1.25rem;
        font-weight: bold;
        margin-bottom: 1rem;
      }
      
      .certificate-strategy {
        font-size: 1.1rem;
        margin-bottom: 1rem;
      }
      
      .certificate-score,
      .certificate-id,
      .certificate-date {
        font-size: 0.9rem;
        opacity: 0.9;
        margin-bottom: 0.5rem;
      }
    }
  }
}

.modal-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-top: 1px solid var(--border-color);
  background: var(--light-color);
  border-radius: 0 0 0.5rem 0.5rem;
  
  .footer-left,
  .footer-center,
  .footer-right {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .footer-center {
    .step-progress {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      
      .progress-label {
        font-size: 0.9rem;
        color: var(--secondary-color);
      }
      
      .mini-progress {
        width: 100px;
        height: 6px;
        background: var(--border-color);
        border-radius: 3px;
        overflow: hidden;
        
        .mini-progress-fill {
          height: 100%;
          background: var(--success-color);
          transition: width 0.3s ease;
        }
      }
      
      .progress-percentage {
        font-size: 0.9rem;
        color: var(--success-color);
        font-weight: 500;
      }
    }
  }
}

@media (max-width: 768px) {
  .strategy-modal-overlay {
    padding: 1rem;
  }
  
  .strategy-modal {
    max-height: 95vh;
  }
  
  .modal-body {
    padding: 1rem;
  }
  
  .strategy-meta {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .investment-grid {
    grid-template-columns: 1fr;
  }
  
  .completion-stats {
    flex-direction: column;
    align-items: center;
  }
  
  .modal-footer {
    flex-direction: column;
    gap: 1rem;
    
    .footer-left,
    .footer-center,
    .footer-right {
      width: 100%;
      justify-content: center;
    }
  }
}
</style>
