<template>
  <div class="defense-training">
    <div class="training-header">
      <h1>🛡️ Defense Training Center</h1>
      <p class="subtitle">Comprehensive training and defense strategies against social engineering attacks</p>
    </div>

    <div class="training-navigation">
      <div class="nav-tabs">
        <button 
          v-for="tab in trainingTabs" 
          :key="tab.id"
          @click="activeTab = tab.id"
          :class="['tab-btn', { active: activeTab === tab.id }]"
        >
          <span class="tab-icon">{{ tab.icon }}</span>
          {{ tab.name }}
        </button>
      </div>
    </div>

    <!-- Training Dashboard -->
    <div v-if="activeTab === 'dashboard'" class="training-content">
      <div class="dashboard-container">
        <div class="dashboard-header">
          <h2>📈 Training Progress Dashboard</h2>
          <p class="dashboard-subtitle">Track your security training progress and achievements</p>
        </div>

        <!-- Overview Cards -->
        <div class="dashboard-overview">
          <div class="overview-cards-grid">
            <div class="overview-card primary">
              <div class="card-header">
                <div class="card-icon">🎓</div>
                <div class="card-trend positive">+{{ getCompletedModules() }}</div>
              </div>
              <div class="card-content">
                <div class="card-value">{{ getCompletedModules() }}</div>
                <div class="card-label">Training Modules</div>
                <div class="card-sublabel">Completed</div>
              </div>
            </div>

            <div class="overview-card success">
              <div class="card-header">
                <div class="card-icon">📊</div>
                <div class="card-trend" :class="getAverageScore() >= 80 ? 'positive' : 'neutral'">
                  {{ getAverageScore() }}%
                </div>
              </div>
              <div class="card-content">
                <div class="card-value">{{ getAverageScore() }}%</div>
                <div class="card-label">Average Score</div>
                <div class="card-sublabel">{{ getScoreRating() }}</div>
              </div>
            </div>

            <div class="overview-card warning">
              <div class="card-header">
                <div class="card-icon">🏆</div>
                <div class="card-trend positive">+{{ getCertificatesEarned() }}</div>
              </div>
              <div class="card-content">
                <div class="card-value">{{ getCertificatesEarned() }}</div>
                <div class="card-label">Certificates</div>
                <div class="card-sublabel">Earned</div>
              </div>
            </div>

            <div class="overview-card info">
              <div class="card-header">
                <div class="card-icon">🛡️</div>
                <div class="card-trend positive">{{ getImplementedStrategies() > 0 ? '+' : '' }}{{ getImplementedStrategies() }}</div>
              </div>
              <div class="card-content">
                <div class="card-value">{{ getImplementedStrategies() }}</div>
                <div class="card-label">Defense Strategies</div>
                <div class="card-sublabel">Implemented</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Progress Chart Section -->
        <div class="dashboard-charts">
          <div class="chart-container">
            <h3>📈 Learning Progress Over Time</h3>
            <div class="progress-chart">
              <div class="chart-placeholder">
                <div class="chart-bars">
                  <div class="chart-bar" v-for="month in getProgressData()" :key="month.name" :style="{ height: month.value + '%' }">
                    <div class="bar-value">{{ month.value }}%</div>
                    <div class="bar-label">{{ month.name }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="skills-radar">
            <h3>🎯 Security Skills Assessment</h3>
            <div class="skills-grid">
              <div v-for="skill in getSkillsAssessment()" :key="skill.name" class="skill-item">
                <div class="skill-name">{{ skill.name }}</div>
                <div class="skill-progress">
                  <div class="skill-bar">
                    <div class="skill-fill" :style="{ width: skill.level + '%' }" :class="getSkillClass(skill.level)"></div>
                  </div>
                  <div class="skill-percentage">{{ skill.level }}%</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Main Content Grid -->
        <div class="dashboard-grid">
          <!-- Recent Activity Section -->
          <div class="dashboard-section activity-section">
            <div class="section-header">
              <h3>📚 Recent Training Activity</h3>
              <span class="activity-count">{{ getRecentActivity().length }} recent items</span>
            </div>
            <div class="activity-timeline">
              <div v-if="getRecentActivity().length === 0" class="empty-state">
                <div class="empty-icon">📝</div>
                <p>No training activity yet</p>
                <button @click="activeTab = 'awareness'" class="btn btn-primary btn-sm">Start Training</button>
              </div>
              <div v-else>
                <div v-for="activity in getRecentActivity()" :key="activity.id" class="timeline-item">
                  <div class="timeline-marker" :class="activity.status"></div>
                  <div class="timeline-content">
                    <div class="activity-header">
                      <div class="activity-icon">{{ activity.icon }}</div>
                      <div class="activity-meta">
                        <div class="activity-title">{{ activity.title }}</div>
                        <div class="activity-time">{{ activity.time }}</div>
                      </div>
                      <div class="activity-status-badge" :class="activity.status">
                        {{ activity.statusText }}
                      </div>
                    </div>
                    <div class="activity-description">{{ activity.description }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Recommendations Section -->
          <div class="dashboard-section recommendations-section">
            <div class="section-header">
              <h3>🎯 Recommended Next Steps</h3>
              <span class="recommendations-count">{{ getRecommendations().length }} recommendations</span>
            </div>
            <div class="recommendations-grid">
              <div v-for="rec in getRecommendations()" :key="rec.id" class="recommendation-card">
                <div class="rec-header">
                  <div class="rec-priority-badge" :class="rec.priority.toLowerCase()">
                    {{ rec.priority }} Priority
                  </div>
                </div>
                <div class="rec-content">
                  <h4>{{ rec.title }}</h4>
                  <p>{{ rec.description }}</p>
                </div>
                <div class="rec-actions">
                  <button @click="executeRecommendation(rec.id)" class="btn btn-primary btn-block">
                    {{ rec.actionText }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="quick-actions">
          <h3>⚡ Quick Actions</h3>
          <div class="actions-grid">
            <button @click="activeTab = 'awareness'" class="action-btn primary">
              <div class="action-icon">🧠</div>
              <div class="action-text">Start Training</div>
            </button>
            <button @click="activeTab = 'assessment'" class="action-btn success">
              <div class="action-icon">📊</div>
              <div class="action-text">Take Assessment</div>
            </button>
            <button @click="activeTab = 'strategies'" class="action-btn warning">
              <div class="action-icon">🛡️</div>
              <div class="action-text">Implement Strategy</div>
            </button>
            <button @click="viewCertificates()" class="action-btn info">
              <div class="action-icon">🏆</div>
              <div class="action-text">View Certificates</div>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Awareness Training -->
    <div v-if="activeTab === 'awareness'" class="training-content">
      <div class="training-section">
        <h2>🧠 Security Awareness Training</h2>
        
        <div class="awareness-modules">
          <div class="module-card" v-for="module in awarenessModules" :key="module.id">
            <div class="module-header">
              <div class="module-icon">{{ module.icon }}</div>
              <div class="module-info">
                <h3>{{ module.title }}</h3>
                <p>{{ module.description }}</p>
                <div class="module-meta">
                  <span class="duration">⏱️ {{ module.duration }}</span>
                  <span class="difficulty" :class="module.difficulty.toLowerCase()">{{ module.difficulty }}</span>
                </div>
              </div>
            </div>
            
            <div class="module-content">
              <div class="learning-objectives">
                <h4>Learning Objectives:</h4>
                <ul>
                  <li v-for="objective in module.objectives" :key="objective">{{ objective }}</li>
                </ul>
              </div>
              
              <div class="key-concepts">
                <h4>Key Concepts:</h4>
                <div class="concepts-grid">
                  <div class="concept-item" v-for="concept in module.concepts" :key="concept.name">
                    <strong>{{ concept.name }}:</strong> {{ concept.description }}
                  </div>
                </div>
              </div>
            </div>
            
            <div class="module-actions">
              <button @click="startModule(module.id)" class="btn btn-primary">Start Training</button>
              <button @click="previewModule(module.id)" class="btn btn-secondary">Preview</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Defense Strategies -->
    <div v-if="activeTab === 'strategies'" class="training-content">
      <div class="training-section">
        <h2>🛡️ Defense Strategies</h2>
        
        <div class="strategies-overview">
          <div class="strategy-category" v-for="category in defenseStrategies" :key="category.id">
            <div class="category-header">
              <h3>{{ category.icon }} {{ category.name }}</h3>
              <p>{{ category.description }}</p>
            </div>
            
            <div class="strategies-list">
              <div class="strategy-item" v-for="strategy in category.strategies" :key="strategy.id">
                <div class="strategy-header">
                  <h4>{{ strategy.name }}</h4>
                  <span class="effectiveness-badge" :class="getEffectivenessClass(strategy.effectiveness)">
                    {{ strategy.effectiveness }}% effective
                  </span>
                </div>
                
                <div class="strategy-details">
                  <p>{{ strategy.description }}</p>
                  
                  <div class="implementation-steps">
                    <h5>Implementation Steps:</h5>
                    <ol>
                      <li v-for="step in strategy.steps" :key="step">{{ step }}</li>
                    </ol>
                  </div>
                  
                  <div class="strategy-benefits">
                    <h5>Benefits:</h5>
                    <ul>
                      <li v-for="benefit in strategy.benefits" :key="benefit">{{ benefit }}</li>
                    </ul>
                  </div>
                </div>
                
                <div class="strategy-actions">
                  <button @click="implementStrategy(strategy.id)" class="btn btn-primary">Implement</button>
                  <button @click="learnMore(strategy.id)" class="btn btn-secondary">Learn More</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Best Practices -->
    <div v-if="activeTab === 'practices'" class="training-content">
      <div class="training-section">
        <h2>✅ Security Best Practices</h2>
        
        <div class="practices-grid">
          <div class="practice-category" v-for="category in bestPractices" :key="category.id">
            <div class="category-card">
              <div class="category-icon">{{ category.icon }}</div>
              <h3>{{ category.name }}</h3>
              <p>{{ category.description }}</p>
              
              <div class="practices-list">
                <div class="practice-item" v-for="practice in category.practices" :key="practice.id">
                  <div class="practice-header">
                    <span class="practice-priority" :class="practice.priority.toLowerCase()">{{ practice.priority }}</span>
                    <h4>{{ practice.title }}</h4>
                  </div>
                  <p>{{ practice.description }}</p>
                  
                  <div class="practice-checklist">
                    <h5>Checklist:</h5>
                    <div class="checklist-items">
                      <label class="checklist-item" v-for="item in practice.checklist" :key="item">
                        <input type="checkbox" :id="`${practice.id}-${item}`">
                        <span>{{ item }}</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Incident Response -->
    <div v-if="activeTab === 'response'" class="training-content">
      <div class="training-section">
        <h2>🚨 Incident Response Procedures</h2>
        
        <div class="response-workflow">
          <div class="workflow-steps">
            <div class="workflow-step" v-for="(step, index) in incidentResponse" :key="step.id">
              <div class="step-number">{{ index + 1 }}</div>
              <div class="step-content">
                <h3>{{ step.title }}</h3>
                <p>{{ step.description }}</p>
                
                <div class="step-actions">
                  <h4>Actions to Take:</h4>
                  <ul>
                    <li v-for="action in step.actions" :key="action">{{ action }}</li>
                  </ul>
                </div>
                
                <div class="step-timeline">
                  <strong>Timeline:</strong> {{ step.timeline }}
                </div>
                
                <div class="step-responsible">
                  <strong>Responsible:</strong> {{ step.responsible }}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="response-tools">
          <h3>Response Tools & Resources</h3>
          <div class="tools-grid">
            <div class="tool-item" v-for="tool in responseTools" :key="tool.id">
              <div class="tool-icon">{{ tool.icon }}</div>
              <h4>{{ tool.name }}</h4>
              <p>{{ tool.description }}</p>
              <button @click="accessTool(tool.id)" class="btn btn-primary">Access Tool</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Assessment -->
    <div v-if="activeTab === 'assessment'" class="training-content">
      <div class="training-section">
        <h2>📊 Security Assessment</h2>
        
        <div class="assessment-overview">
          <div class="assessment-card">
            <h3>🎯 Knowledge Assessment</h3>
            <p>Test your understanding of social engineering defense concepts</p>
            <div class="assessment-stats">
              <div class="stat-item">
                <div class="stat-value">25</div>
                <div class="stat-label">Questions</div>
              </div>
              <div class="stat-item">
                <div class="stat-value">30 min</div>
                <div class="stat-label">Duration</div>
              </div>
              <div class="stat-item">
                <div class="stat-value">80%</div>
                <div class="stat-label">Pass Rate</div>
              </div>
            </div>
            <button @click="startAssessment" class="btn btn-primary">Start Assessment</button>
          </div>
          
          <div class="assessment-card">
            <h3>🔍 Vulnerability Scan</h3>
            <p>Assess your organization's current security posture</p>
            <div class="scan-options">
              <label class="checkbox-label">
                <input type="checkbox" v-model="scanOptions.emailSecurity">
                Email Security Assessment
              </label>
              <label class="checkbox-label">
                <input type="checkbox" v-model="scanOptions.userAwareness">
                User Awareness Evaluation
              </label>
              <label class="checkbox-label">
                <input type="checkbox" v-model="scanOptions.policyReview">
                Security Policy Review
              </label>
            </div>
            <button @click="startVulnerabilityScan" class="btn btn-primary">Start Scan</button>
          </div>
        </div>
        
        <div class="assessment-history" v-if="assessmentHistory.length > 0">
          <h3>Assessment History</h3>
          <div class="history-list">
            <div class="history-item" v-for="assessment in assessmentHistory" :key="assessment.id">
              <div class="assessment-info">
                <h4>{{ assessment.type }}</h4>
                <p>{{ assessment.date }}</p>
              </div>
              <div class="assessment-score">
                <div class="score-value" :class="getScoreClass(assessment.score)">{{ assessment.score }}%</div>
                <div class="score-label">Score</div>
              </div>
              <div class="assessment-actions">
                <button @click="viewResults(assessment.id)" class="btn btn-secondary">View Results</button>
                <button @click="retakeAssessment(assessment.id)" class="btn btn-primary">Retake</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Interactive Training Modal -->
  <InteractiveTrainingModal
    :visible="trainingModalVisible"
    :module="selectedTrainingModule"
    @close="closeTrainingModal"
    @training-completed="onTrainingCompleted"
  />

  <!-- Interactive Assessment Modal -->
  <InteractiveAssessmentModal
    :visible="assessmentModalVisible"
    @close="closeAssessmentModal"
    @assessment-completed="onAssessmentCompleted"
  />

  <!-- Defense Strategy Implementation Modal -->
  <DefenseStrategyModal
    :visible="strategyModalVisible"
    :strategy="selectedStrategy"
    @close="closeStrategyModal"
    @implementation-completed="onImplementationCompleted"
  />
</template>

<script>
import InteractiveTrainingModal from '@components/training/InteractiveTrainingModal.vue'
import InteractiveAssessmentModal from '@components/training/InteractiveAssessmentModal.vue'
import DefenseStrategyModal from '@components/training/DefenseStrategyModal.vue'

export default {
  name: 'DefenseTraining',
  components: {
    InteractiveTrainingModal,
    InteractiveAssessmentModal,
    DefenseStrategyModal
  },
  data() {
    return {
      activeTab: 'dashboard',
      trainingModalVisible: false,
      selectedTrainingModule: null,
      assessmentModalVisible: false,
      strategyModalVisible: false,
      selectedStrategy: null,
      scanOptions: {
        emailSecurity: true,
        userAwareness: true,
        policyReview: false
      },
      trainingTabs: [
        { id: 'dashboard', name: 'Training Dashboard', icon: '📈' },
        { id: 'awareness', name: 'Awareness Training', icon: '🧠' },
        { id: 'strategies', name: 'Defense Strategies', icon: '🛡️' },
        { id: 'practices', name: 'Best Practices', icon: '✅' },
        { id: 'response', name: 'Incident Response', icon: '🚨' },
        { id: 'assessment', name: 'Assessment', icon: '📊' }
      ],
      awarenessModules: [
        {
          id: 'phishing-awareness',
          title: 'Phishing Email Recognition',
          description: 'Learn to identify and respond to phishing attempts',
          icon: '📧',
          duration: '45 minutes',
          difficulty: 'Beginner',
          objectives: [
            'Identify common phishing indicators',
            'Understand different types of phishing attacks',
            'Learn proper response procedures',
            'Practice with real-world examples'
          ],
          concepts: [
            { name: 'Sender Verification', description: 'How to verify the authenticity of email senders' },
            { name: 'Link Analysis', description: 'Techniques for safely examining suspicious links' },
            { name: 'Attachment Safety', description: 'Best practices for handling email attachments' },
            { name: 'Reporting Procedures', description: 'How to report suspected phishing attempts' }
          ]
        },
        {
          id: 'social-engineering-tactics',
          title: 'Social Engineering Tactics',
          description: 'Understand psychological manipulation techniques used by attackers',
          icon: '🎭',
          duration: '60 minutes',
          difficulty: 'Intermediate',
          objectives: [
            'Recognize psychological manipulation techniques',
            'Understand authority and urgency tactics',
            'Learn to verify requests independently',
            'Develop critical thinking skills'
          ],
          concepts: [
            { name: 'Authority Exploitation', description: 'How attackers impersonate authority figures' },
            { name: 'Urgency Creation', description: 'Tactics used to create false time pressure' },
            { name: 'Trust Building', description: 'Methods attackers use to establish credibility' },
            { name: 'Information Gathering', description: 'How personal information is collected and used' }
          ]
        }
      ],
      defenseStrategies: [
        {
          id: 'technical-controls',
          name: 'Technical Controls',
          icon: '🔧',
          description: 'Technology-based defense mechanisms',
          strategies: [
            {
              id: 'email-filtering',
              name: 'Advanced Email Filtering',
              description: 'Implement multi-layer email security with AI-powered threat detection',
              effectiveness: 95,
              steps: [
                'Deploy advanced email security gateway',
                'Configure machine learning-based threat detection',
                'Set up real-time URL analysis',
                'Implement attachment sandboxing',
                'Enable user reporting mechanisms'
              ],
              benefits: [
                'Blocks 95%+ of phishing attempts',
                'Reduces false positives',
                'Provides real-time threat intelligence',
                'Enables rapid response to new threats'
              ]
            },
            {
              id: 'endpoint-protection',
              name: 'Endpoint Protection',
              description: 'Comprehensive endpoint security with behavioral analysis',
              effectiveness: 88,
              steps: [
                'Deploy next-generation antivirus',
                'Enable behavioral monitoring',
                'Configure application whitelisting',
                'Implement device encryption',
                'Set up remote wipe capabilities'
              ],
              benefits: [
                'Detects unknown malware',
                'Prevents data exfiltration',
                'Enables rapid incident response',
                'Protects against insider threats'
              ]
            }
          ]
        },
        {
          id: 'human-controls',
          name: 'Human-Centered Controls',
          icon: '👥',
          description: 'People-focused security measures',
          strategies: [
            {
              id: 'security-training',
              name: 'Continuous Security Training',
              description: 'Regular, engaging security awareness programs',
              effectiveness: 75,
              steps: [
                'Assess current awareness levels',
                'Develop role-based training content',
                'Implement micro-learning modules',
                'Conduct regular simulations',
                'Track and measure progress'
              ],
              benefits: [
                'Improves threat recognition',
                'Builds security culture',
                'Reduces human error',
                'Increases reporting rates'
              ]
            }
          ]
        }
      ],
      bestPractices: [
        {
          id: 'email-security',
          name: 'Email Security',
          icon: '📧',
          description: 'Best practices for secure email communication',
          practices: [
            {
              id: 'email-verification',
              title: 'Sender Verification',
              priority: 'High',
              description: 'Always verify the identity of email senders before taking action',
              checklist: [
                'Check sender email address carefully',
                'Verify through alternative communication channel',
                'Look for domain spoofing indicators',
                'Confirm with sender if request is unusual'
              ]
            }
          ]
        }
      ],
      incidentResponse: [
        {
          id: 'detection',
          title: 'Detection & Identification',
          description: 'Quickly identify and classify security incidents',
          timeline: 'Within 15 minutes',
          responsible: 'Security Operations Center',
          actions: [
            'Monitor security alerts and logs',
            'Analyze suspicious activities',
            'Classify incident severity',
            'Document initial findings'
          ]
        },
        {
          id: 'containment',
          title: 'Containment & Isolation',
          description: 'Prevent incident from spreading and causing further damage',
          timeline: 'Within 1 hour',
          responsible: 'Incident Response Team',
          actions: [
            'Isolate affected systems',
            'Block malicious communications',
            'Preserve evidence',
            'Implement temporary controls'
          ]
        }
      ],
      responseTools: [
        {
          id: 'incident-tracker',
          name: 'Incident Tracker',
          icon: '📋',
          description: 'Track and manage security incidents from detection to resolution'
        },
        {
          id: 'forensic-tools',
          name: 'Forensic Analysis',
          icon: '🔍',
          description: 'Digital forensics tools for incident investigation'
        }
      ],
      assessmentHistory: [
        {
          id: 'assess-001',
          type: 'Security Awareness Assessment',
          date: '2024-01-15',
          score: 87
        },
        {
          id: 'assess-002',
          type: 'Phishing Recognition Test',
          date: '2024-01-10',
          score: 92
        }
      ]
    }
  },
  methods: {
    startModule(moduleId) {
      const module = this.awarenessModules.find(m => m.id === moduleId)
      if (!module) return

      this.selectedTrainingModule = module
      this.trainingModalVisible = true
    },

    closeTrainingModal() {
      this.trainingModalVisible = false
      this.selectedTrainingModule = null
    },

    onTrainingCompleted(completionData) {
      // Save completion to localStorage
      const completions = JSON.parse(localStorage.getItem('trainingCompletions') || '[]')
      completions.push(completionData)
      localStorage.setItem('trainingCompletions', JSON.stringify(completions))

      // Update assessment history if not already there
      if (!this.assessmentHistory.find(a => a.id === completionData.certificateId)) {
        this.assessmentHistory.unshift({
          id: completionData.certificateId,
          type: 'Training Module',
          date: completionData.completedAt,
          score: completionData.score,
          passed: completionData.score >= 80
        })
      }

      // Show success message
      this.$nextTick(() => {
        alert(`🎉 Training Complete!\n\n✅ Module: ${completionData.moduleName}\n📊 Score: ${completionData.score}%\n🏆 Certificate: ${completionData.certificateId}\n\nYour progress has been saved and you can view your certificate in the dashboard.`)
      })

      // Close modal
      this.closeTrainingModal()
    },

    previewModule(moduleId) {
      const module = this.awarenessModules.find(m => m.id === moduleId)
      if (!module) return

      const previewContent = `
🎓 TRAINING MODULE PREVIEW

📚 ${module.title}
${module.description}

⏱️ Duration: ${module.duration}
📊 Difficulty: ${module.difficulty}

🎯 Learning Objectives:
${module.objectives.map(obj => `• ${obj}`).join('\n')}

🔑 Key Concepts Covered:
${module.concepts.map(concept => `• ${concept.name}: ${concept.description}`).join('\n')}

📋 Module Structure:
• Interactive lessons with real-world examples
• Knowledge check quizzes throughout
• Practical exercises and simulations
• Final assessment and certification

Ready to start this training module?
      `

      alert(previewContent)
    },

    implementStrategy(strategyId) {
      const strategy = this.findStrategyById(strategyId)
      if (!strategy) return

      this.selectedStrategy = strategy
      this.strategyModalVisible = true
    },

    closeStrategyModal() {
      this.strategyModalVisible = false
      this.selectedStrategy = null
    },

    onImplementationCompleted(implementationData) {
      // Save implementation data
      const implementations = JSON.parse(localStorage.getItem('strategyImplementations') || '[]')
      implementations.push({
        ...implementationData,
        status: 'completed'
      })
      localStorage.setItem('strategyImplementations', JSON.stringify(implementations))

      // Close modal
      this.closeStrategyModal()

      // Show completion message
      this.$nextTick(() => {
        alert(`🎉 Strategy Implementation Complete!\n\n✅ Strategy: ${implementationData.strategyName}\n📊 Score: ${implementationData.score}%\n🏆 Certificate: ${implementationData.implementationId}\n📅 Completed: ${implementationData.completedAt}\n\nYour implementation has been tracked and you can view progress in the dashboard.`)
      })
    },

    learnMore(strategyId) {
      const strategy = this.findStrategyById(strategyId)
      if (!strategy) return

      // Create a more interactive learning experience
      const options = [
        'View Implementation Guide',
        'See Cost-Benefit Analysis',
        'Check Best Practices',
        'Review Case Studies',
        'Start Implementation'
      ]

      const choice = prompt(`📖 Learn More: ${strategy.name}\n\n${strategy.description}\n\nEffectiveness: ${strategy.effectiveness}%\n\nWhat would you like to explore?\n\n1. ${options[0]}\n2. ${options[1]}\n3. ${options[2]}\n4. ${options[3]}\n5. ${options[4]}\n\nEnter your choice (1-5):`)

      if (choice && choice >= 1 && choice <= 5) {
        this.handleLearnMoreChoice(strategy, parseInt(choice) - 1)
      }
    },

    handleLearnMoreChoice(strategy, choiceIndex) {
      switch (choiceIndex) {
        case 0: // Implementation Guide
          this.showImplementationGuide(strategy)
          break
        case 1: // Cost-Benefit Analysis
          this.showCostBenefitAnalysis(strategy)
          break
        case 2: // Best Practices
          this.showBestPractices(strategy)
          break
        case 3: // Case Studies
          this.showCaseStudies(strategy)
          break
        case 4: // Start Implementation
          this.implementStrategy(strategy.id)
          break
      }
    },

    showImplementationGuide(strategy) {
      const guide = `
🛠️ IMPLEMENTATION GUIDE: ${strategy.name}

📋 Step-by-Step Process:
${strategy.steps.map((step, index) => `${index + 1}. ${step}`).join('\n')}

⏱️ Estimated Timeline: ${this.getImplementationTimeline(strategy)}

👥 Required Team Members:
${this.getRequiredTeam(strategy).map(role => `• ${role}`).join('\n')}

🔧 Technical Requirements:
${this.getTechnicalRequirements(strategy).map(req => `• ${req}`).join('\n')}

📊 Success Metrics:
${this.getSuccessMetrics(strategy).map(metric => `• ${metric}`).join('\n')}

Ready to start implementation?
      `

      if (confirm(guide)) {
        this.implementStrategy(strategy.id)
      }
    },

    showCostBenefitAnalysis(strategy) {
      const analysis = `
💰 COST-BENEFIT ANALYSIS: ${strategy.name}

💸 Implementation Costs:
• Initial Setup: ${this.getImplementationCost(strategy)}
• Training & Onboarding: ${this.getTrainingCost(strategy)}
• Ongoing Maintenance: ${this.getMaintenanceCost(strategy)}

💵 Expected Benefits:
• Annual Risk Reduction: ${this.getAnnualSavings(strategy)}
• Productivity Gains: ${this.getProductivityGains(strategy)}
• Compliance Benefits: ${this.getComplianceBenefits(strategy)}

📈 ROI Analysis:
• Break-even Point: ${this.getROITimeline(strategy)}
• 3-Year ROI: ${this.getThreeYearROI(strategy)}
• Risk Mitigation Value: ${this.getRiskMitigationValue(strategy)}

💡 Recommendation: ${this.getROIRecommendation(strategy)}
      `

      alert(analysis)
    },

    showBestPractices(strategy) {
      const practices = `
✅ BEST PRACTICES: ${strategy.name}

🎯 Implementation Best Practices:
${this.getImplementationBestPractices(strategy).map(practice => `• ${practice}`).join('\n')}

⚠️ Common Pitfalls to Avoid:
${this.getCommonPitfalls(strategy).map(pitfall => `• ${pitfall}`).join('\n')}

🏆 Success Factors:
${this.getSuccessFactors(strategy).map(factor => `• ${factor}`).join('\n')}

📚 Recommended Reading:
${this.getRecommendedReading(strategy).map(resource => `• ${resource}`).join('\n')}
      `

      alert(practices)
    },

    showCaseStudies(strategy) {
      const caseStudies = `
📊 CASE STUDIES: ${strategy.name}

🏢 Case Study 1: Enterprise Implementation
• Company: Fortune 500 Financial Services
• Challenge: High phishing attack success rate
• Solution: ${strategy.name} implementation
• Results: 85% reduction in successful attacks
• Timeline: 6 months
• ROI: 340% in first year

🏭 Case Study 2: Mid-Size Manufacturing
• Company: 500-employee manufacturing firm
• Challenge: Lack of security awareness
• Solution: Comprehensive ${strategy.name} program
• Results: 92% employee certification rate
• Timeline: 4 months
• ROI: 280% in 18 months

🏥 Case Study 3: Healthcare Organization
• Company: Regional hospital network
• Challenge: Regulatory compliance requirements
• Solution: ${strategy.name} with compliance focus
• Results: 100% compliance audit success
• Timeline: 8 months
• ROI: Avoided ₦2M in potential fines

💡 Key Takeaways:
• Consistent implementation is crucial
• Executive support accelerates success
• Regular training updates maintain effectiveness
• Metrics tracking enables continuous improvement
      `

      alert(caseStudies)
    },
    getEffectivenessClass(effectiveness) {
      if (effectiveness >= 90) return 'excellent'
      if (effectiveness >= 80) return 'good'
      if (effectiveness >= 70) return 'fair'
      return 'poor'
    },
    getScoreClass(score) {
      if (score >= 90) return 'excellent'
      if (score >= 80) return 'good'
      if (score >= 70) return 'fair'
      return 'poor'
    },

    accessTool(toolId) {
      const tool = this.responseTools.find(t => t.id === toolId)
      if (!tool) return

      if (confirm(`Launch ${tool.name}?\n\n${tool.description}\n\nThis will open the tool interface.`)) {
        this.launchResponseTool(tool)
      }
    },

    launchResponseTool(tool) {
      // Simulate tool launch based on tool type
      switch (tool.id) {
        case 'incident-tracker':
          this.launchIncidentTracker()
          break
        case 'forensic-tools':
          this.launchForensicTools()
          break
        default:
          alert(`Launching ${tool.name}...`)
      }
    },

    launchIncidentTracker() {
      const incidents = JSON.parse(localStorage.getItem('securityIncidents') || '[]')
      const activeIncidents = incidents.filter(i => i.status !== 'resolved').length

      const trackerContent = `
📋 INCIDENT TRACKER DASHBOARD

📊 Current Status:
• Active Incidents: ${activeIncidents}
• Total Incidents: ${incidents.length}
• Average Resolution Time: 4.2 hours

🚨 Recent Incidents:
${incidents.slice(0, 3).map(incident =>
  `• ${incident.type || 'Security Incident'} - ${incident.status || 'Active'} (${incident.date || 'Today'})`
).join('\n')}

🔧 Available Actions:
• Create new incident report
• Update existing incidents
• Generate incident reports
• View incident analytics

Would you like to create a new incident report?
      `

      if (confirm(trackerContent)) {
        this.createIncidentReport()
      }
    },

    launchForensicTools() {
      const toolsContent = `
🔍 FORENSIC ANALYSIS TOOLS

🛠️ Available Tools:
• Email Header Analysis
• Network Traffic Analyzer
• File Hash Verification
• Timeline Reconstruction
• Evidence Collection

📊 Recent Analysis:
• 15 email samples analyzed
• 8 malicious URLs identified
• 3 attack vectors mapped
• 12 IOCs extracted

🎯 Quick Actions:
• Analyze suspicious email
• Check file for malware
• Investigate network activity
• Generate forensic report

Select a forensic analysis option:
      `

      const options = ['Analyze Email', 'Check File Hash', 'Network Analysis', 'Generate Report']
      const choice = prompt(toolsContent + '\n\nEnter option (1-4):')

      if (choice && choice >= 1 && choice <= 4) {
        alert(`🔍 Starting ${options[choice - 1]}...\n\nForensic analysis initiated. Results will be available in the analytics dashboard.`)
      }
    },

    createIncidentReport() {
      const incidentType = prompt('Incident Type:\n1. Phishing Attack\n2. Social Engineering\n3. Data Breach\n4. Suspicious Activity\n\nEnter option (1-4):')

      if (incidentType && incidentType >= 1 && incidentType <= 4) {
        const types = ['Phishing Attack', 'Social Engineering', 'Data Breach', 'Suspicious Activity']
        const selectedType = types[incidentType - 1]

        const incidentData = {
          id: `INC-${Date.now()}`,
          type: selectedType,
          status: 'investigating',
          severity: 'medium',
          reportedAt: new Date().toLocaleString(),
          reportedBy: 'Security Team',
          description: `${selectedType} incident reported through defense training system`
        }

        // Save incident
        const incidents = JSON.parse(localStorage.getItem('securityIncidents') || '[]')
        incidents.unshift(incidentData)
        localStorage.setItem('securityIncidents', JSON.stringify(incidents))

        alert(`✅ Incident Report Created!\n\n🆔 ID: ${incidentData.id}\n📋 Type: ${incidentData.type}\n⚠️ Severity: ${incidentData.severity}\n📅 Reported: ${incidentData.reportedAt}\n\nIncident logged and investigation initiated.`)
      }
    },

    startAssessment() {
      this.assessmentModalVisible = true
    },

    closeAssessmentModal() {
      this.assessmentModalVisible = false
    },

    onAssessmentCompleted(assessmentData) {
      // Save assessment results
      this.assessmentHistory.unshift({
        id: assessmentData.id,
        type: assessmentData.type,
        date: assessmentData.completedAt,
        score: assessmentData.score,
        passed: assessmentData.passed
      })

      // Save to localStorage
      localStorage.setItem('assessmentHistory', JSON.stringify(this.assessmentHistory))

      // Close modal
      this.closeAssessmentModal()

      // Show completion message
      this.$nextTick(() => {
        if (assessmentData.passed) {
          alert(`🎉 Assessment Passed!\n\n✅ Score: ${assessmentData.score}%\n🏆 Certificate: ${assessmentData.id}\n📅 Completed: ${assessmentData.completedAt}\n\nCongratulations on demonstrating strong security knowledge!`)
        } else {
          alert(`📚 Assessment Complete\n\n📊 Score: ${assessmentData.score}%\n📅 Completed: ${assessmentData.completedAt}\n\nConsider reviewing the training materials and retaking the assessment.`)
        }
      })
    },



    startVulnerabilityScan() {
      const selectedOptions = Object.keys(this.scanOptions).filter(key => this.scanOptions[key])

      if (selectedOptions.length === 0) {
        alert('⚠️ Please select at least one scan option before starting the vulnerability assessment.')
        return
      }

      if (confirm(`Start Vulnerability Scan?\n\nSelected Options:\n${selectedOptions.map(opt => `• ${this.getScanOptionName(opt)}`).join('\n')}\n\nEstimated Duration: ${selectedOptions.length * 5} minutes\n\nThis will assess your organization's security posture.`)) {
        this.executeVulnerabilityScan(selectedOptions)
      }
    },

    executeVulnerabilityScan(options) {
      // Simulate vulnerability scan with progress
      let progress = 0
      const scanResults = {}

      const scanSteps = [
        'Initializing security scanners...',
        'Analyzing email security configuration...',
        'Evaluating user awareness levels...',
        'Reviewing security policies...',
        'Generating vulnerability report...',
        'Scan complete!'
      ]

      let currentStep = 0
      const scanInterval = setInterval(() => {
        if (currentStep < scanSteps.length) {
          console.log(scanSteps[currentStep])
          progress = Math.round(((currentStep + 1) / scanSteps.length) * 100)
          currentStep++
        } else {
          clearInterval(scanInterval)
          this.completeScan(options, scanResults)
        }
      }, 1500)

      alert('🔍 Vulnerability scan initiated...\n\nScan progress will be displayed and results will be available when complete.')
    },

    completeScan(options) {
      // Generate realistic scan results
      const scanResults = {
        id: `SCAN-${Date.now()}`,
        completedAt: new Date().toLocaleString(),
        overallScore: Math.floor(Math.random() * 20) + 75, // 75-95
        options: options,
        findings: {
          emailSecurity: options.includes('emailSecurity') ? Math.floor(Math.random() * 15) + 85 : null,
          userAwareness: options.includes('userAwareness') ? Math.floor(Math.random() * 20) + 70 : null,
          policyReview: options.includes('policyReview') ? Math.floor(Math.random() * 25) + 75 : null
        },
        recommendations: this.generateRecommendations(options)
      }

      // Save scan results
      const scanHistory = JSON.parse(localStorage.getItem('vulnerabilityScans') || '[]')
      scanHistory.unshift(scanResults)
      localStorage.setItem('vulnerabilityScans', JSON.stringify(scanHistory))

      this.showScanResults(scanResults)
    },

    showScanResults(results) {
      const findingsText = Object.keys(results.findings)
        .filter(key => results.findings[key] !== null)
        .map(key => `• ${this.getScanOptionName(key)}: ${results.findings[key]}%`)
        .join('\n')

      const resultContent = `
🔍 VULNERABILITY SCAN COMPLETE!

📊 Overall Security Score: ${results.overallScore}%

🎯 Detailed Findings:
${findingsText}

💡 Key Recommendations:
${results.recommendations.map(rec => `• ${rec}`).join('\n')}

📅 Scan ID: ${results.id}
📅 Completed: ${results.completedAt}

${results.overallScore >= 90 ? '🎉 Excellent security posture!' :
  results.overallScore >= 80 ? '✅ Good security with room for improvement.' :
  '⚠️ Security improvements recommended.'}
      `

      alert(resultContent)
    },

    getScanOptionName(option) {
      const names = {
        emailSecurity: 'Email Security Assessment',
        userAwareness: 'User Awareness Evaluation',
        policyReview: 'Security Policy Review'
      }
      return names[option] || option
    },

    generateRecommendations(options) {
      const recommendations = []

      if (options.includes('emailSecurity')) {
        recommendations.push('Implement advanced email filtering with AI detection')
        recommendations.push('Enable DMARC, SPF, and DKIM authentication')
      }

      if (options.includes('userAwareness')) {
        recommendations.push('Increase frequency of security awareness training')
        recommendations.push('Implement monthly phishing simulation exercises')
      }

      if (options.includes('policyReview')) {
        recommendations.push('Update incident response procedures')
        recommendations.push('Strengthen verification requirements for sensitive requests')
      }

      return recommendations
    },

    findStrategyById(strategyId) {
      for (const category of this.defenseStrategies) {
        const strategy = category.strategies.find(s => s.id === strategyId)
        if (strategy) return strategy
      }
      return null
    },

    getComplexityLevel(stepCount) {
      if (stepCount <= 3) return 'Low - Quick implementation'
      if (stepCount <= 5) return 'Medium - Moderate effort required'
      return 'High - Significant planning and resources needed'
    },

    getImplementationCost(strategy) {
      const costs = {
        'email-filtering': '₦15,000 - ₦50,000',
        'endpoint-protection': '₦25,000 - ₦75,000',
        'security-training': '₦5,000 - ₦20,000'
      }
      return costs[strategy.id] || '₦10,000 - ₦30,000'
    },

    getAnnualSavings(strategy) {
      const savings = {
        'email-filtering': '₦200,000 - ₦500,000',
        'endpoint-protection': '₦150,000 - ₦400,000',
        'security-training': '₦100,000 - ₦300,000'
      }
      return savings[strategy.id] || '₦75,000 - ₦250,000'
    },

    getROITimeline(strategy) {
      const timelines = {
        'email-filtering': '6-12 months',
        'endpoint-protection': '8-15 months',
        'security-training': '12-18 months'
      }
      return timelines[strategy.id] || '9-15 months'
    },

    getBestUseCases(strategy) {
      const useCases = {
        'email-filtering': [
          'Organizations with high email volume',
          'Companies targeted by sophisticated attacks',
          'Businesses with remote workforce'
        ],
        'endpoint-protection': [
          'BYOD environments',
          'Organizations with mobile workforce',
          'Companies handling sensitive data'
        ],
        'security-training': [
          'All organizations regardless of size',
          'Companies with high turnover',
          'Businesses in regulated industries'
        ]
      }
      return useCases[strategy.id] || ['General security improvement', 'Risk reduction', 'Compliance requirements']
    },

    getConsiderations(strategy) {
      const considerations = {
        'email-filtering': [
          'May require user training on new interface',
          'Potential for false positives affecting business',
          'Integration with existing email systems'
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
      return considerations[strategy.id] || ['Budget and resource allocation', 'Change management required', 'Ongoing maintenance needed']
    },

    // Additional helper methods for enhanced learnMore functionality
    getImplementationTimeline(strategy) {
      const timelines = {
        'email-filtering': '4-6 weeks',
        'endpoint-protection': '6-8 weeks',
        'security-training': '8-12 weeks'
      }
      return timelines[strategy.id] || '4-8 weeks'
    },

    getRequiredTeam(strategy) {
      const teams = {
        'email-filtering': ['IT Administrator', 'Security Analyst', 'Email Administrator', 'Project Manager'],
        'endpoint-protection': ['IT Administrator', 'Security Analyst', 'Desktop Support', 'Change Manager'],
        'security-training': ['Security Manager', 'HR Representative', 'Training Coordinator', 'Communications Lead']
      }
      return teams[strategy.id] || ['IT Administrator', 'Security Analyst', 'Project Manager']
    },

    getTechnicalRequirements(strategy) {
      const requirements = {
        'email-filtering': ['Email server access', 'DNS configuration rights', 'Network firewall access', 'Monitoring tools'],
        'endpoint-protection': ['Administrative rights on endpoints', 'Network connectivity', 'Centralized management console', 'Reporting infrastructure'],
        'security-training': ['Learning management system', 'Email distribution system', 'Assessment platform', 'Progress tracking tools']
      }
      return requirements[strategy.id] || ['Administrative access', 'Network connectivity', 'Management tools']
    },

    getSuccessMetrics(strategy) {
      const metrics = {
        'email-filtering': ['Spam detection rate >95%', 'False positive rate <2%', 'Phishing block rate >90%', 'User satisfaction >80%'],
        'endpoint-protection': ['Malware detection rate >98%', 'System performance impact <5%', 'Incident response time <1 hour', 'Compliance score >95%'],
        'security-training': ['Training completion rate >90%', 'Assessment pass rate >85%', 'Phishing simulation improvement >50%', 'Incident reporting increase >40%']
      }
      return metrics[strategy.id] || ['Implementation completion', 'User adoption rate', 'Security improvement metrics']
    },

    getTrainingCost(strategy) {
      const costs = {
        'email-filtering': '₦5,000 - ₦15,000',
        'endpoint-protection': '₦8,000 - ₦20,000',
        'security-training': '₦10,000 - ₦25,000'
      }
      return costs[strategy.id] || '₦5,000 - ₦15,000'
    },

    getMaintenanceCost(strategy) {
      const costs = {
        'email-filtering': '₦2,000 - ₦5,000 annually',
        'endpoint-protection': '₦3,000 - ₦8,000 annually',
        'security-training': '₦5,000 - ₦12,000 annually'
      }
      return costs[strategy.id] || '₦3,000 - ₦8,000 annually'
    },

    getProductivityGains(strategy) {
      const gains = {
        'email-filtering': '₦50,000 - ₦100,000 annually',
        'endpoint-protection': '₦75,000 - ₦150,000 annually',
        'security-training': '₦40,000 - ₦80,000 annually'
      }
      return gains[strategy.id] || '₦50,000 - ₦100,000 annually'
    },

    getComplianceBenefits(strategy) {
      const benefits = {
        'email-filtering': 'GDPR, HIPAA compliance support',
        'endpoint-protection': 'SOX, PCI-DSS compliance support',
        'security-training': 'ISO 27001, NIST framework alignment'
      }
      return benefits[strategy.id] || 'Regulatory compliance support'
    },

    getThreeYearROI(strategy) {
      const roi = {
        'email-filtering': '450% - 600%',
        'endpoint-protection': '380% - 520%',
        'security-training': '320% - 450%'
      }
      return roi[strategy.id] || '350% - 500%'
    },

    getRiskMitigationValue(strategy) {
      const values = {
        'email-filtering': '₦500,000 - ₦2,000,000',
        'endpoint-protection': '₦750,000 - ₦3,000,000',
        'security-training': '₦400,000 - ₦1,500,000'
      }
      return values[strategy.id] || '₦500,000 - ₦2,000,000'
    },

    getROIRecommendation(strategy) {
      const effectiveness = strategy.effectiveness || 75
      if (effectiveness >= 90) {
        return 'Highly recommended - Excellent ROI expected'
      } else if (effectiveness >= 80) {
        return 'Recommended - Strong ROI potential'
      } else if (effectiveness >= 70) {
        return 'Consider implementation - Moderate ROI expected'
      } else {
        return 'Evaluate alternatives - ROI may be limited'
      }
    },

    getImplementationBestPractices(strategy) {
      const practices = {
        'email-filtering': [
          'Start with pilot group before full deployment',
          'Establish clear escalation procedures',
          'Regular rule tuning based on false positives',
          'Integrate with existing security tools',
          'Maintain updated threat intelligence feeds'
        ],
        'security-training': [
          'Tailor content to specific roles and risks',
          'Use real-world examples from your industry',
          'Implement regular refresher training',
          'Track and measure behavioral changes',
          'Reward positive security behaviors'
        ]
      }
      return practices[strategy.id] || [
        'Plan thoroughly before implementation',
        'Engage stakeholders early and often',
        'Monitor progress and adjust as needed',
        'Document lessons learned',
        'Celebrate successes and milestones'
      ]
    },

    getCommonPitfalls(strategy) {
      const pitfalls = {
        'email-filtering': [
          'Over-aggressive filtering causing business disruption',
          'Insufficient user training on new procedures',
          'Lack of regular rule maintenance',
          'Poor integration with existing workflows'
        ],
        'security-training': [
          'One-size-fits-all approach',
          'Infrequent or outdated content',
          'Lack of executive support',
          'No measurement of effectiveness'
        ]
      }
      return pitfalls[strategy.id] || [
        'Insufficient planning and preparation',
        'Lack of stakeholder buy-in',
        'Inadequate testing before deployment',
        'Poor change management'
      ]
    },

    getSuccessFactors(strategy) {
      const factors = {
        'email-filtering': [
          'Strong executive sponsorship',
          'Comprehensive user training',
          'Regular performance monitoring',
          'Continuous rule optimization'
        ],
        'security-training': [
          'Leadership commitment and participation',
          'Relevant and engaging content',
          'Regular assessment and feedback',
          'Integration with performance reviews'
        ]
      }
      return factors[strategy.id] || [
        'Clear communication of benefits',
        'Adequate resource allocation',
        'Regular progress monitoring',
        'Flexibility to adapt and improve'
      ]
    },

    getRecommendedReading(strategy) {
      const reading = {
        'email-filtering': [
          'NIST Email Security Guidelines',
          'SANS Email Security Best Practices',
          'Vendor-specific implementation guides',
          'Industry threat intelligence reports'
        ],
        'security-training': [
          'NIST Cybersecurity Framework',
          'SANS Security Awareness Roadmap',
          'Behavioral psychology in security',
          'Adult learning principles for security'
        ]
      }
      return reading[strategy.id] || [
        'Industry best practice guides',
        'Vendor documentation and case studies',
        'Security framework guidelines',
        'Peer organization success stories'
      ]
    },

    viewResults(assessmentId) {
      const assessment = this.assessmentHistory.find(a => a.id === assessmentId)
      if (!assessment) {
        alert('Assessment results not found.')
        return
      }

      const resultDetails = `
📊 ASSESSMENT RESULTS DETAILS

🆔 Assessment ID: ${assessment.id}
📋 Type: ${assessment.type}
📅 Date: ${assessment.date}
🎯 Score: ${assessment.score}%

📈 Performance Breakdown:
• Security Awareness: ${Math.floor(Math.random() * 20) + 80}%
• Threat Recognition: ${Math.floor(Math.random() * 25) + 75}%
• Response Procedures: ${Math.floor(Math.random() * 15) + 85}%
• Policy Knowledge: ${Math.floor(Math.random() * 30) + 70}%

💡 Recommendations:
${assessment.score >= 90 ?
  '• Maintain current knowledge level\n• Consider advanced training modules\n• Share expertise with colleagues' :
  assessment.score >= 80 ?
  '• Review weak areas identified\n• Complete additional training modules\n• Practice with simulation exercises' :
  '• Immediate retraining recommended\n• Focus on fundamental concepts\n• Schedule follow-up assessment'
}

Would you like to view detailed analytics for this assessment?
      `

      if (confirm(resultDetails)) {
        this.$router.push(`/analytics?assessment=${assessmentId}`)
      }
    },

    retakeAssessment(assessmentId) {
      const assessment = this.assessmentHistory.find(a => a.id === assessmentId)
      if (!assessment) return

      if (confirm(`Retake "${assessment.type}"?\n\nPrevious Score: ${assessment.score}%\nDate: ${assessment.date}\n\nThis will start a new assessment session.`)) {
        this.startAssessment()
      }
    },

    loadSavedData() {
      // Load assessment history
      const savedHistory = localStorage.getItem('assessmentHistory')
      if (savedHistory) {
        this.assessmentHistory = JSON.parse(savedHistory)
      }

      // Load training completions
      const completions = localStorage.getItem('trainingCompletions')
      if (completions) {
        console.log('Loaded training completions:', JSON.parse(completions))
      }

      // Load strategy implementations
      const implementations = localStorage.getItem('strategyImplementations')
      if (implementations) {
        console.log('Loaded strategy implementations:', JSON.parse(implementations))
      }
    },

    // Dashboard helper methods
    getCompletedModules() {
      const completions = JSON.parse(localStorage.getItem('trainingCompletions') || '[]')
      return completions.length
    },

    getAverageScore() {
      if (this.assessmentHistory.length === 0) return 0
      const totalScore = this.assessmentHistory.reduce((sum, assessment) => sum + assessment.score, 0)
      return Math.round(totalScore / this.assessmentHistory.length)
    },

    getCertificatesEarned() {
      const completions = JSON.parse(localStorage.getItem('trainingCompletions') || '[]')
      return completions.filter(c => c.score >= 80).length
    },

    getImplementedStrategies() {
      const implementations = JSON.parse(localStorage.getItem('strategyImplementations') || '[]')
      return implementations.length
    },

    getRecentActivity() {
      const activities = []

      // Add recent training completions
      const completions = JSON.parse(localStorage.getItem('trainingCompletions') || '[]')
      completions.slice(0, 3).forEach(completion => {
        activities.push({
          id: `completion-${completion.certificateId}`,
          icon: '🎓',
          title: 'Training Module Completed',
          description: completion.moduleName,
          time: completion.completedAt,
          status: 'completed',
          statusText: `${completion.score}%`
        })
      })

      // Add recent assessments
      this.assessmentHistory.slice(0, 2).forEach(assessment => {
        activities.push({
          id: `assessment-${assessment.id}`,
          icon: '📊',
          title: 'Security Assessment',
          description: assessment.type,
          time: assessment.date,
          status: assessment.passed ? 'passed' : 'failed',
          statusText: assessment.passed ? 'Passed' : 'Failed'
        })
      })

      return activities.slice(0, 5).sort((a, b) => new Date(b.time) - new Date(a.time))
    },

    getRecommendations() {
      const recommendations = []

      // Check if user needs more training
      if (this.getCompletedModules() < 2) {
        recommendations.push({
          id: 'complete-training',
          priority: 'High',
          title: 'Complete Security Awareness Training',
          description: 'Finish the remaining security awareness modules to improve your defense knowledge.',
          actionText: 'Start Training'
        })
      }

      // Check assessment scores
      if (this.getAverageScore() < 80) {
        recommendations.push({
          id: 'improve-scores',
          priority: 'Medium',
          title: 'Improve Assessment Scores',
          description: 'Your average score is below the recommended threshold. Consider reviewing training materials.',
          actionText: 'Retake Assessment'
        })
      }

      // Check strategy implementation
      if (this.getImplementedStrategies() === 0) {
        recommendations.push({
          id: 'implement-strategy',
          priority: 'High',
          title: 'Implement Defense Strategy',
          description: 'Start implementing at least one defense strategy to improve your security posture.',
          actionText: 'View Strategies'
        })
      }

      // Default recommendation if all is good
      if (recommendations.length === 0) {
        recommendations.push({
          id: 'advanced-training',
          priority: 'Low',
          title: 'Advanced Training Available',
          description: 'You\'re doing great! Consider advanced training modules to further enhance your skills.',
          actionText: 'Explore Advanced'
        })
      }

      return recommendations
    },

    executeRecommendation(recId) {
      switch (recId) {
        case 'complete-training':
          this.activeTab = 'awareness'
          break
        case 'improve-scores':
          this.activeTab = 'assessment'
          break
        case 'implement-strategy':
          this.activeTab = 'strategies'
          break
        case 'advanced-training':
          alert('🎓 Advanced training modules coming soon!\n\nStay tuned for more sophisticated security training content.')
          break
        default:
          console.log('Unknown recommendation:', recId)
      }
    },

    // Enhanced dashboard helper methods
    getScoreRating() {
      const score = this.getAverageScore()
      if (score >= 90) return 'Excellent'
      if (score >= 80) return 'Good'
      if (score >= 70) return 'Fair'
      if (score >= 60) return 'Needs Improvement'
      return 'Poor'
    },

    getProgressData() {
      // Simulate progress data over the last 6 months
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
      const baseProgress = Math.max(20, this.getAverageScore() - 30)

      return months.map((month, index) => ({
        name: month,
        value: Math.min(100, baseProgress + (index * 10) + Math.random() * 15)
      }))
    },

    getSkillsAssessment() {
      const completedModules = this.getCompletedModules()
      const averageScore = this.getAverageScore()
      const implementedStrategies = this.getImplementedStrategies()

      return [
        {
          name: 'Phishing Recognition',
          level: Math.min(100, (completedModules * 20) + (averageScore * 0.5))
        },
        {
          name: 'Social Engineering Defense',
          level: Math.min(100, (completedModules * 15) + (averageScore * 0.6))
        },
        {
          name: 'Incident Response',
          level: Math.min(100, (implementedStrategies * 25) + (averageScore * 0.4))
        },
        {
          name: 'Security Awareness',
          level: Math.min(100, (completedModules * 25) + (averageScore * 0.3))
        },
        {
          name: 'Risk Assessment',
          level: Math.min(100, (implementedStrategies * 30) + (averageScore * 0.5))
        }
      ]
    },

    getSkillClass(level) {
      if (level >= 80) return 'excellent'
      if (level >= 60) return 'good'
      if (level >= 40) return 'fair'
      return 'poor'
    },

    viewCertificates() {
      const completions = JSON.parse(localStorage.getItem('trainingCompletions') || '[]')
      const implementations = JSON.parse(localStorage.getItem('strategyImplementations') || '[]')

      if (completions.length === 0 && implementations.length === 0) {
        alert('📜 No certificates earned yet!\n\nComplete training modules or implement defense strategies to earn certificates.')
        return
      }

      let certificateList = '🏆 YOUR CERTIFICATES\n\n'

      if (completions.length > 0) {
        certificateList += '📚 Training Certificates:\n'
        completions.forEach(cert => {
          certificateList += `• ${cert.moduleName} - Score: ${cert.score}% (${cert.certificateId})\n`
        })
        certificateList += '\n'
      }

      if (implementations.length > 0) {
        certificateList += '🛡️ Implementation Certificates:\n'
        implementations.forEach(impl => {
          if (impl.implementationId) {
            certificateList += `• ${impl.strategyName} - Score: ${impl.score || 'N/A'}% (${impl.implementationId})\n`
          }
        })
      }

      certificateList += '\n💡 Certificates can be used for professional development and compliance reporting.'

      alert(certificateList)
    }
  },

  mounted() {
    // Load saved data from localStorage
    this.loadSavedData()
  }
}
</script>

<style lang="scss" scoped>
.defense-training {
  .training-header {
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
  
  .training-navigation {
    margin-bottom: 2rem;
    
    .nav-tabs {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      justify-content: center;
      padding: 1rem;
      background: white;
      border-radius: 0.5rem;
      box-shadow: var(--shadow);
      
      .tab-btn {
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
        
        .tab-icon {
          font-size: 1.25rem;
          margin-right: 0.5rem;
        }
        
        &:hover {
          border-color: var(--success-color);
          color: var(--success-color);
          transform: translateY(-2px);
        }
        
        &.active {
          background: var(--success-color);
          border-color: var(--success-color);
          color: white;
          transform: translateY(-2px);
          box-shadow: var(--shadow);
        }
      }
    }
  }
  
  .training-content {
    background: white;
    border-radius: 0.5rem;
    box-shadow: var(--shadow);
    padding: 2rem;
    
    h2 {
      color: var(--primary-color);
      margin-bottom: 2rem;
      padding-bottom: 0.5rem;
      border-bottom: 3px solid var(--success-color);
    }
  }
  
  .module-card {
    background: var(--light-color);
    border-radius: 0.5rem;
    padding: 2rem;
    margin-bottom: 2rem;
    border-left: 4px solid var(--success-color);
    
    .module-header {
      display: flex;
      align-items: flex-start;
      margin-bottom: 1.5rem;
      
      .module-icon {
        font-size: 3rem;
        margin-right: 1.5rem;
        flex-shrink: 0;
      }
      
      .module-info {
        flex: 1;
        
        h3 {
          color: var(--primary-color);
          margin-bottom: 0.5rem;
        }
        
        p {
          color: #666;
          margin-bottom: 1rem;
        }
        
        .module-meta {
          display: flex;
          gap: 1rem;
          
          .duration {
            color: var(--secondary-color);
          }
          
          .difficulty {
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
    }
    
    .module-content {
      margin-bottom: 1.5rem;
      
      .learning-objectives,
      .key-concepts {
        margin-bottom: 1.5rem;
        
        h4 {
          color: var(--secondary-color);
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
      
      .concepts-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1rem;
        
        .concept-item {
          background: white;
          padding: 1rem;
          border-radius: 0.25rem;
          border-left: 3px solid var(--secondary-color);
        }
      }
    }
    
    .module-actions {
      display: flex;
      gap: 1rem;
      justify-content: center;
    }
  }
  
  .strategy-category {
    margin-bottom: 3rem;
    
    .category-header {
      text-align: center;
      margin-bottom: 2rem;
      
      h3 {
        color: var(--primary-color);
        margin-bottom: 0.5rem;
      }
      
      p {
        color: #666;
      }
    }
    
    .strategy-item {
      background: var(--light-color);
      border-radius: 0.5rem;
      padding: 2rem;
      margin-bottom: 2rem;
      
      .strategy-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
        
        h4 {
          color: var(--primary-color);
          margin: 0;
        }
        
        .effectiveness-badge {
          padding: 0.5rem 1rem;
          border-radius: 1rem;
          font-weight: bold;
          font-size: 0.9rem;
          
          &.excellent {
            background: var(--success-color);
            color: white;
          }
          
          &.good {
            background: #27ae60;
            color: white;
          }
          
          &.fair {
            background: var(--warning-color);
            color: white;
          }
          
          &.poor {
            background: var(--danger-color);
            color: white;
          }
        }
      }
      
      .strategy-details {
        margin-bottom: 1.5rem;
        
        p {
          margin-bottom: 1.5rem;
        }
        
        .implementation-steps,
        .strategy-benefits {
          margin-bottom: 1rem;
          
          h5 {
            color: var(--secondary-color);
            margin-bottom: 0.5rem;
          }
          
          ol, ul {
            margin: 0;
            padding-left: 1.5rem;
            
            li {
              margin-bottom: 0.5rem;
            }
          }
        }
      }
      
      .strategy-actions {
        display: flex;
        gap: 1rem;
        justify-content: center;
      }
    }
  }
  
  .practices-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 2rem;
    
    .category-card {
      background: var(--light-color);
      border-radius: 0.5rem;
      padding: 2rem;
      
      .category-icon {
        font-size: 3rem;
        text-align: center;
        margin-bottom: 1rem;
      }
      
      h3 {
        color: var(--primary-color);
        text-align: center;
        margin-bottom: 0.5rem;
      }
      
      p {
        text-align: center;
        color: #666;
        margin-bottom: 2rem;
      }
      
      .practice-item {
        background: white;
        border-radius: 0.25rem;
        padding: 1.5rem;
        margin-bottom: 1.5rem;
        
        .practice-header {
          display: flex;
          align-items: center;
          margin-bottom: 1rem;
          
          .practice-priority {
            padding: 0.25rem 0.75rem;
            border-radius: 1rem;
            font-size: 0.8rem;
            font-weight: bold;
            margin-right: 1rem;
            
            &.high {
              background: var(--danger-color);
              color: white;
            }
            
            &.medium {
              background: var(--warning-color);
              color: white;
            }
            
            &.low {
              background: var(--secondary-color);
              color: white;
            }
          }
          
          h4 {
            color: var(--primary-color);
            margin: 0;
          }
        }
        
        p {
          text-align: left;
          margin-bottom: 1rem;
        }
        
        .practice-checklist {
          h5 {
            color: var(--secondary-color);
            margin-bottom: 0.5rem;
          }
          
          .checklist-items {
            .checklist-item {
              display: flex;
              align-items: center;
              margin-bottom: 0.5rem;
              
              input[type="checkbox"] {
                margin-right: 0.5rem;
              }
            }
          }
        }
      }
    }
  }
  
  .workflow-steps {
    .workflow-step {
      display: flex;
      margin-bottom: 2rem;
      padding: 2rem;
      background: var(--light-color);
      border-radius: 0.5rem;
      
      .step-number {
        background: var(--danger-color);
        color: white;
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 1.25rem;
        margin-right: 2rem;
        flex-shrink: 0;
      }
      
      .step-content {
        flex: 1;
        
        h3 {
          color: var(--primary-color);
          margin-bottom: 0.5rem;
        }
        
        p {
          margin-bottom: 1.5rem;
        }
        
        .step-actions {
          margin-bottom: 1rem;
          
          h4 {
            color: var(--secondary-color);
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
              
              &:before {
                content: '→';
                position: absolute;
                left: 0;
                color: var(--danger-color);
                font-weight: bold;
              }
            }
          }
        }
        
        .step-timeline,
        .step-responsible {
          margin-bottom: 0.5rem;
          color: #666;
        }
      }
    }
  }
  
  .tools-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    
    .tool-item {
      background: var(--light-color);
      padding: 1.5rem;
      border-radius: 0.5rem;
      text-align: center;
      
      .tool-icon {
        font-size: 2rem;
        margin-bottom: 1rem;
      }
      
      h4 {
        color: var(--primary-color);
        margin-bottom: 0.5rem;
      }
      
      p {
        color: #666;
        margin-bottom: 1.5rem;
      }
    }
  }
  
  .assessment-overview {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-bottom: 3rem;
    
    .assessment-card {
      background: var(--light-color);
      padding: 2rem;
      border-radius: 0.5rem;
      text-align: center;
      
      h3 {
        color: var(--primary-color);
        margin-bottom: 1rem;
      }
      
      p {
        color: #666;
        margin-bottom: 1.5rem;
      }
      
      .assessment-stats {
        display: flex;
        justify-content: space-around;
        margin-bottom: 2rem;
        
        .stat-item {
          text-align: center;
          
          .stat-value {
            font-size: 1.5rem;
            font-weight: bold;
            color: var(--primary-color);
          }
          
          .stat-label {
            font-size: 0.9rem;
            color: #666;
          }
        }
      }
      
      .scan-options {
        text-align: left;
        margin-bottom: 2rem;
        
        .checkbox-label {
          display: flex;
          align-items: center;
          margin-bottom: 0.5rem;
          
          input[type="checkbox"] {
            margin-right: 0.5rem;
          }
        }
      }
    }
  }
  
  .assessment-history {
    .history-list {
      .history-item {
        display: flex;
        align-items: center;
        padding: 1.5rem;
        background: var(--light-color);
        border-radius: 0.5rem;
        margin-bottom: 1rem;
        
        .assessment-info {
          flex: 1;
          
          h4 {
            color: var(--primary-color);
            margin-bottom: 0.25rem;
          }
          
          p {
            color: #666;
            margin: 0;
          }
        }
        
        .assessment-score {
          text-align: center;
          margin: 0 2rem;
          
          .score-value {
            font-size: 1.5rem;
            font-weight: bold;
            
            &.excellent {
              color: var(--success-color);
            }
            
            &.good {
              color: #27ae60;
            }
            
            &.fair {
              color: var(--warning-color);
            }
            
            &.poor {
              color: var(--danger-color);
            }
          }
          
          .score-label {
            font-size: 0.9rem;
            color: #666;
          }
        }
        
        .assessment-actions {
          display: flex;
          gap: 0.5rem;
        }
      }
    }
  }

  // Enhanced Dashboard Styles
  .dashboard-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0;
  }

  .dashboard-header {
    text-align: center;
    margin-bottom: 2rem;

    h2 {
      color: var(--primary-color);
      margin-bottom: 0.5rem;
    }

    .dashboard-subtitle {
      color: #666;
      font-size: 1.1rem;
      margin: 0;
    }
  }

  .overview-cards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;

    .overview-card {
      background: white;
      border-radius: 0.75rem;
      padding: 1.5rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      border-left: 4px solid var(--primary-color);
      transition: transform 0.3s ease, box-shadow 0.3s ease;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);
      }

      &.primary {
        border-left-color: var(--primary-color);

        .card-icon {
          background: rgba(52, 152, 219, 0.1);
          color: var(--primary-color);
        }
      }

      &.success {
        border-left-color: var(--success-color);

        .card-icon {
          background: rgba(39, 174, 96, 0.1);
          color: var(--success-color);
        }
      }

      &.warning {
        border-left-color: var(--warning-color);

        .card-icon {
          background: rgba(243, 156, 18, 0.1);
          color: var(--warning-color);
        }
      }

      &.info {
        border-left-color: var(--secondary-color);

        .card-icon {
          background: rgba(155, 89, 182, 0.1);
          color: var(--secondary-color);
        }
      }

      .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;

        .card-icon {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
        }

        .card-trend {
          font-size: 0.9rem;
          font-weight: bold;
          padding: 0.25rem 0.75rem;
          border-radius: 1rem;

          &.positive {
            background: rgba(39, 174, 96, 0.1);
            color: var(--success-color);
          }

          &.neutral {
            background: rgba(243, 156, 18, 0.1);
            color: var(--warning-color);
          }
        }
      }

      .card-content {
        .card-value {
          font-size: 2.5rem;
          font-weight: bold;
          color: var(--primary-color);
          line-height: 1;
          margin-bottom: 0.5rem;
        }

        .card-label {
          font-size: 1rem;
          font-weight: 600;
          color: #333;
          margin-bottom: 0.25rem;
        }

        .card-sublabel {
          font-size: 0.9rem;
          color: #666;
        }
      }
    }
  }

  .dashboard-charts {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 2rem;
    margin-bottom: 2rem;

    .chart-container,
    .skills-radar {
      background: white;
      border-radius: 0.75rem;
      padding: 1.5rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

      h3 {
        color: var(--primary-color);
        margin-bottom: 1.5rem;
        font-size: 1.1rem;
      }
    }

    .progress-chart {
      .chart-placeholder {
        height: 200px;
        display: flex;
        align-items: end;
        justify-content: center;

        .chart-bars {
          display: flex;
          align-items: end;
          gap: 1rem;
          height: 100%;

          .chart-bar {
            background: linear-gradient(to top, var(--primary-color), var(--success-color));
            width: 40px;
            border-radius: 4px 4px 0 0;
            position: relative;
            min-height: 20px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;

            .bar-value {
              color: white;
              font-size: 0.8rem;
              font-weight: bold;
              margin-top: 0.5rem;
            }

            .bar-label {
              position: absolute;
              bottom: -25px;
              font-size: 0.8rem;
              color: #666;
              white-space: nowrap;
            }
          }
        }
      }
    }

    .skills-grid {
      .skill-item {
        margin-bottom: 1rem;

        .skill-name {
          font-size: 0.9rem;
          font-weight: 500;
          color: #333;
          margin-bottom: 0.5rem;
        }

        .skill-progress {
          display: flex;
          align-items: center;
          gap: 0.75rem;

          .skill-bar {
            flex: 1;
            height: 8px;
            background: var(--border-color);
            border-radius: 4px;
            overflow: hidden;

            .skill-fill {
              height: 100%;
              border-radius: 4px;
              transition: width 0.5s ease;

              &.excellent {
                background: var(--success-color);
              }

              &.good {
                background: var(--primary-color);
              }

              &.fair {
                background: var(--warning-color);
              }

              &.poor {
                background: var(--danger-color);
              }
            }
          }

          .skill-percentage {
            font-size: 0.8rem;
            font-weight: bold;
            color: var(--secondary-color);
            min-width: 35px;
          }
        }
      }
    }
  }

  .dashboard-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin-bottom: 2rem;
  }

  .dashboard-section {
    background: white;
    border-radius: 0.75rem;
    padding: 1.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;

      h3 {
        color: var(--primary-color);
        margin: 0;
        font-size: 1.1rem;
      }

      .activity-count,
      .recommendations-count {
        font-size: 0.9rem;
        color: #666;
        background: var(--light-color);
        padding: 0.25rem 0.75rem;
        border-radius: 1rem;
      }
    }
  }

  .activity-timeline {
    .empty-state {
      text-align: center;
      padding: 2rem;
      color: #666;

      .empty-icon {
        font-size: 3rem;
        margin-bottom: 1rem;
      }

      p {
        margin-bottom: 1rem;
      }
    }

    .timeline-item {
      display: flex;
      margin-bottom: 1rem;

      &:last-child {
        margin-bottom: 0;
      }

      .timeline-marker {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        margin-right: 1rem;
        margin-top: 0.5rem;
        flex-shrink: 0;

        &.completed {
          background: var(--success-color);
        }

        &.passed {
          background: var(--success-color);
        }

        &.failed {
          background: var(--danger-color);
        }
      }

      .timeline-content {
        flex: 1;

        .activity-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.5rem;

          .activity-icon {
            font-size: 1.25rem;
          }

          .activity-meta {
            flex: 1;

            .activity-title {
              font-weight: 600;
              color: #333;
              font-size: 0.95rem;
            }

            .activity-time {
              font-size: 0.8rem;
              color: #666;
            }
          }

          .activity-status-badge {
            font-size: 0.8rem;
            padding: 0.25rem 0.75rem;
            border-radius: 1rem;
            font-weight: 500;

            &.completed,
            &.passed {
              background: rgba(39, 174, 96, 0.1);
              color: var(--success-color);
            }

            &.failed {
              background: rgba(231, 76, 60, 0.1);
              color: var(--danger-color);
            }
          }
        }

        .activity-description {
          font-size: 0.9rem;
          color: #666;
          line-height: 1.4;
        }
      }
    }
  }

  .recommendations-grid {
    .recommendation-card {
      background: var(--light-color);
      border-radius: 0.5rem;
      padding: 1rem;
      margin-bottom: 1rem;

      &:last-child {
        margin-bottom: 0;
      }

      .rec-header {
        margin-bottom: 0.75rem;

        .rec-priority-badge {
          font-size: 0.8rem;
          padding: 0.25rem 0.75rem;
          border-radius: 1rem;
          font-weight: bold;

          &.high {
            background: var(--danger-color);
            color: white;
          }

          &.medium {
            background: var(--warning-color);
            color: white;
          }

          &.low {
            background: var(--success-color);
            color: white;
          }
        }
      }

      .rec-content {
        margin-bottom: 1rem;

        h4 {
          color: var(--primary-color);
          margin: 0 0 0.5rem 0;
          font-size: 1rem;
        }

        p {
          margin: 0;
          font-size: 0.9rem;
          color: #666;
          line-height: 1.4;
        }
      }

      .rec-actions {
        .btn-block {
          width: 100%;
        }
      }
    }
  }

  .quick-actions {
    background: white;
    border-radius: 0.75rem;
    padding: 1.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

    h3 {
      color: var(--primary-color);
      margin-bottom: 1.5rem;
      text-align: center;
    }

    .actions-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;

      .action-btn {
        background: white;
        border: 2px solid var(--border-color);
        border-radius: 0.5rem;
        padding: 1rem;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;

        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
        }

        &.primary {
          border-color: var(--primary-color);

          &:hover {
            background: var(--primary-color);
            color: white;
          }
        }

        &.success {
          border-color: var(--success-color);

          &:hover {
            background: var(--success-color);
            color: white;
          }
        }

        &.warning {
          border-color: var(--warning-color);

          &:hover {
            background: var(--warning-color);
            color: white;
          }
        }

        &.info {
          border-color: var(--secondary-color);

          &:hover {
            background: var(--secondary-color);
            color: white;
          }
        }

        .action-icon {
          font-size: 2rem;
        }

        .action-text {
          font-weight: 600;
          font-size: 0.95rem;
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .defense-training {
    .training-navigation {
      .nav-tabs {
        .tab-btn {
          flex: 1;
          min-width: calc(50% - 0.25rem);
          justify-content: center;
        }
      }
    }

    // Dashboard responsive styles
    .dashboard-container {
      padding: 0 1rem;
    }

    .overview-cards-grid {
      grid-template-columns: 1fr;
      gap: 1rem;
    }

    .dashboard-charts {
      grid-template-columns: 1fr;
      gap: 1rem;

      .progress-chart {
        .chart-placeholder {
          height: 150px;

          .chart-bars {
            gap: 0.5rem;

            .chart-bar {
              width: 30px;
            }
          }
        }
      }
    }

    .dashboard-grid {
      grid-template-columns: 1fr;
      gap: 1rem;
    }

    .dashboard-section {
      padding: 1rem;
    }

    .actions-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 0.75rem;

      .action-btn {
        padding: 0.75rem;

        .action-icon {
          font-size: 1.5rem;
        }

        .action-text {
          font-size: 0.85rem;
        }
      }
    }

    .timeline-item {
      .timeline-content {
        .activity-header {
          flex-direction: column;
          align-items: flex-start;
          gap: 0.5rem;

          .activity-meta {
            order: 1;
          }

          .activity-status-badge {
            order: 2;
            align-self: flex-start;
          }
        }
      }
    }

    .recommendation-card {
      .rec-content {
        h4 {
          font-size: 0.95rem;
        }

        p {
          font-size: 0.85rem;
        }
      }
    }
    
    .module-header {
      flex-direction: column;
      text-align: center;
      
      .module-icon {
        margin-right: 0;
        margin-bottom: 1rem;
      }
    }
    
    .workflow-step {
      flex-direction: column;
      text-align: center;
      
      .step-number {
        margin-right: 0;
        margin-bottom: 1rem;
      }
    }
    
    .strategy-header {
      flex-direction: column;
      align-items: flex-start;
      
      .effectiveness-badge {
        margin-top: 0.5rem;
      }
    }
    
    .history-item {
      flex-direction: column;
      text-align: center;
      gap: 1rem;
      
      .assessment-score {
        margin: 0;
      }
    }
  }
}

@media (max-width: 480px) {
  .defense-training {
    .overview-cards-grid {
      .overview-card {
        padding: 1rem;

        .card-content {
          .card-value {
            font-size: 2rem;
          }
        }
      }
    }

    .actions-grid {
      grid-template-columns: 1fr;
    }

    .dashboard-header {
      h2 {
        font-size: 1.5rem;
      }

      .dashboard-subtitle {
        font-size: 1rem;
      }
    }

    .chart-bars {
      .chart-bar {
        width: 25px !important;

        .bar-value {
          font-size: 0.7rem;
        }

        .bar-label {
          font-size: 0.7rem;
        }
      }
    }
  }
}
</style>
