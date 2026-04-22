<template>
  <div class="detection-center">
    <div class="center-header">
      <h1>Detection Center</h1>
      <p class="subtitle">Real-time monitoring and detection of social engineering attacks</p>
    </div>

    <div class="detection-status">
      <div class="status-overview">
        <div class="status-card" v-for="status in systemStatus" :key="status.component">
          <div class="status-icon" :class="status.status">{{ status.icon }}</div>
          <div class="status-info">
            <h3>{{ status.component }}</h3>
            <div class="status-text" :class="status.status">{{ status.message }}</div>
            <div class="status-time">{{ status.lastUpdate }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="detection-dashboard">
      <div class="row">
        <div class="col-8">
          <div class="card">
            <div class="card-header">
              <h3>Real-time Threat Detection</h3>
              <div class="detection-controls">
                <button @click="toggleDetection" :class="['btn', detectionActive ? 'btn-danger' : 'btn-primary']">
                  {{ detectionActive ? '⏸️ Pause Detection' : '▶️ Start Detection' }}
                </button>
                <button @click="clearAlerts" class="btn btn-secondary">🗑️ Clear Alerts</button>
              </div>
            </div>
            
            <div class="threat-feed">
              <div class="feed-header">
                <div class="feed-filters">
                  <select v-model="selectedSeverity" class="filter-select">
                    <option value="">All Severities</option>
                    <option value="critical">Critical</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                  <select v-model="selectedType" class="filter-select">
                    <option value="">All Types</option>
                    <option value="phishing">Phishing</option>
                    <option value="pretexting">Pretexting</option>
                    <option value="baiting">Baiting</option>
                    <option value="suspicious">Suspicious Activity</option>
                  </select>
                </div>
              </div>
              
              <div class="threat-list">
                <div class="threat-item" v-for="threat in filteredThreats" :key="threat.id" :class="threat.severity">
                  <div class="threat-indicator">
                    <div class="severity-badge" :class="threat.severity">{{ threat.severity.toUpperCase() }}</div>
                    <div class="threat-time">{{ threat.timestamp }}</div>
                  </div>
                  
                  <div class="threat-details">
                    <div class="threat-title">{{ threat.title }}</div>
                    <div class="threat-description">{{ threat.description }}</div>
                    <div class="threat-metadata">
                      <span class="metadata-item">📧 {{ threat.source }}</span>
                      <span class="metadata-item">🎯 {{ threat.target }}</span>
                      <span class="metadata-item">📊 {{ threat.confidence }}% confidence</span>
                    </div>
                  </div>
                  
                  <div class="threat-actions">
                    <button @click="investigateThreat(threat.id)" class="btn btn-primary">Investigate</button>
                    <button @click="blockThreat(threat.id)" class="btn btn-danger">Block</button>
                    <button @click="dismissThreat(threat.id)" class="btn btn-secondary">Dismiss</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="col-4">
          <div class="card">
            <div class="card-header">
              <h3>Detection Statistics</h3>
            </div>
            <div class="stats-content">
              <div class="stat-item" v-for="stat in detectionStats" :key="stat.label">
                <div class="stat-icon">{{ stat.icon }}</div>
                <div class="stat-info">
                  <div class="stat-value">{{ stat.value }}</div>
                  <div class="stat-label">
                    {{ stat.label }}
                    <HelpTooltip
                      :title="stat.label"
                      :description="stat.helpText"
                      :examples="stat.examples"
                      :related-terms="stat.relatedTerms"
                      position="top"
                    />
                  </div>
                  <div class="stat-change" :class="stat.trend">{{ stat.change }}</div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="card">
            <div class="card-header">
              <h3>Detection Engines</h3>
            </div>
            <div class="engines-list">
              <div class="engine-item" v-for="engine in detectionEngines" :key="engine.id">
                <div class="engine-status">
                  <div class="status-indicator" :class="engine.status"></div>
                  <span class="engine-name">{{ engine.name }}</span>
                </div>
                <div class="engine-metrics">
                  <span class="metric">{{ engine.processed }} processed</span>
                  <span class="metric">{{ engine.accuracy }}% accuracy</span>
                </div>
                <div class="engine-controls">
                  <button @click="toggleEngine(engine.id)" class="btn btn-secondary">
                    {{ engine.status === 'active' ? 'Pause' : 'Start' }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-6">
          <div class="card">
            <div class="card-header">
              <h3>Detection Performance</h3>
            </div>
            <div class="performance-chart">
              <canvas id="performanceChart" width="400" height="200"></canvas>
            </div>
          </div>
        </div>
        
        <div class="col-6">
          <div class="card">
            <div class="card-header">
              <h3>Threat Distribution</h3>
            </div>
            <div class="distribution-chart">
              <canvas id="distributionChart" width="400" height="200"></canvas>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h3>Detection Rules Management</h3>
              <button @click="showRuleBuilder = !showRuleBuilder" class="btn btn-primary">
                {{ showRuleBuilder ? 'Hide' : 'Show' }} Rule Builder
              </button>
            </div>
            
            <div v-if="showRuleBuilder" class="rule-builder">
              <DetectionRuleBuilder @rule-created="addDetectionRule" />
            </div>
            
            <div class="rules-list">
              <div class="rule-item" v-for="rule in detectionRules" :key="rule.id">
                <div class="rule-info">
                  <div class="rule-name">{{ rule.name }}</div>
                  <div class="rule-description">{{ rule.description }}</div>
                  <div class="rule-metadata">
                    <span class="metadata-item">🎯 {{ rule.type }}</span>
                    <span class="metadata-item">📊 {{ rule.matches }} matches</span>
                    <span class="metadata-item">⚡ {{ rule.accuracy }}% accuracy</span>
                  </div>
                </div>
                
                <div class="rule-status">
                  <div class="status-indicator" :class="rule.status"></div>
                  <span class="status-text">{{ rule.status }}</span>
                </div>
                
                <div class="rule-actions">
                  <button @click="editRule(rule.id)" class="btn btn-secondary">Edit</button>
                  <button @click="toggleRule(rule.id)" class="btn btn-primary">
                    {{ rule.status === 'active' ? 'Disable' : 'Enable' }}
                  </button>
                  <button @click="deleteRule(rule.id)" class="btn btn-danger">Delete</button>
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
import DetectionRuleBuilder from '@components/detection/DetectionRuleBuilder.vue'
import HelpTooltip from '@components/common/HelpTooltip.vue'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

export default {
  name: 'DetectionCenter',
  components: {
    DetectionRuleBuilder,
    HelpTooltip
  },
  data() {
    return {
      detectionActive: true,
      selectedSeverity: '',
      selectedType: '',
      showRuleBuilder: false,
      systemStatus: [
        {
          component: 'Email Scanner',
          status: 'active',
          icon: '📧',
          message: 'Scanning 1,247 emails/hour',
          lastUpdate: '2 minutes ago'
        },
        {
          component: 'Behavioral Analysis',
          status: 'active',
          icon: '🧠',
          message: 'Monitoring user patterns',
          lastUpdate: '1 minute ago'
        },
        {
          component: 'ML Detection Engine',
          status: 'warning',
          icon: '🤖',
          message: 'Model updating - 85% complete',
          lastUpdate: '5 minutes ago'
        },
        {
          component: 'Threat Intelligence',
          status: 'active',
          icon: '🔍',
          message: 'Latest feeds synchronized',
          lastUpdate: '3 minutes ago'
        }
      ],
      detectionStats: [
        {
          icon: '🚨',
          label: 'Threats Detected',
          value: '47',
          change: '+12 from yesterday',
          trend: 'positive'
        },
        {
          icon: '🎯',
          label: 'Detection Rate',
          value: '94.2%',
          change: '+2.1% this week',
          trend: 'positive'
        },
        {
          icon: '⚡',
          label: 'Response Time',
          value: '1.8s',
          change: '-0.3s improvement',
          trend: 'positive'
        },
        {
          icon: '❌',
          label: 'False Positives',
          value: '3.1%',
          change: '-1.2% reduction',
          trend: 'negative'
        }
      ],
      detectionEngines: [
        {
          id: 'email-filter',
          name: 'Email Content Filter',
          status: 'active',
          processed: '1,247',
          accuracy: '92'
        },
        {
          id: 'url-analyzer',
          name: 'URL Analyzer',
          status: 'active',
          processed: '856',
          accuracy: '96'
        },
        {
          id: 'behavioral-ai',
          name: 'Behavioral AI',
          status: 'active',
          processed: '2,134',
          accuracy: '89'
        },
        {
          id: 'attachment-scanner',
          name: 'Attachment Scanner',
          status: 'paused',
          processed: '423',
          accuracy: '94'
        }
      ],
      threats: [
        {
          id: 'threat-001',
          severity: 'critical',
          type: 'phishing',
          title: 'Sophisticated Phishing Campaign Detected',
          description: 'Advanced phishing email targeting finance department with spoofed bank credentials',
          source: 'external@fakebank.com',
          target: 'Finance Team',
          confidence: 97,
          timestamp: '2 minutes ago'
        },
        {
          id: 'threat-002',
          severity: 'high',
          type: 'pretexting',
          title: 'Suspicious Phone Call Activity',
          description: 'Multiple calls claiming to be IT support requesting password resets',
          source: '+1-555-0123',
          target: 'HR Department',
          confidence: 89,
          timestamp: '5 minutes ago'
        },
        {
          id: 'threat-003',
          severity: 'medium',
          type: 'baiting',
          title: 'Suspicious USB Device Detected',
          description: 'Unknown USB device connected to workstation in reception area',
          source: 'Physical Device',
          target: 'Reception',
          confidence: 76,
          timestamp: '8 minutes ago'
        },
        {
          id: 'threat-004',
          severity: 'low',
          type: 'suspicious',
          title: 'Unusual Email Pattern',
          description: 'Employee receiving multiple emails from unknown external domains',
          source: 'Multiple Sources',
          target: 'Marketing Team',
          confidence: 65,
          timestamp: '12 minutes ago'
        }
      ],
      detectionRules: [
        {
          id: 'rule-001',
          name: 'Phishing Email Detection',
          description: 'Detects emails with suspicious links and credential harvesting attempts',
          type: 'Email Analysis',
          status: 'active',
          matches: 156,
          accuracy: 94
        },
        {
          id: 'rule-002',
          name: 'Urgent Language Pattern',
          description: 'Identifies emails using urgent language and time pressure tactics',
          type: 'Content Analysis',
          status: 'active',
          matches: 89,
          accuracy: 87
        },
        {
          id: 'rule-003',
          name: 'Suspicious Attachment Types',
          description: 'Flags emails with potentially dangerous attachment types',
          type: 'Attachment Analysis',
          status: 'paused',
          matches: 23,
          accuracy: 96
        }
      ]
    }
  },
  computed: {
    filteredThreats() {
      return this.threats.filter(threat => {
        const severityMatch = !this.selectedSeverity || threat.severity === this.selectedSeverity
        const typeMatch = !this.selectedType || threat.type === this.selectedType
        return severityMatch && typeMatch
      })
    }
  },
  methods: {
    dismissThreat(threatId) {
      console.log('Dismissing threat:', threatId)
      this.threats = this.threats.filter(t => t.id !== threatId)
    },
    toggleDetection() {
      this.detectionActive = !this.detectionActive
      console.log('Detection', this.detectionActive ? 'started' : 'paused')
    },
    clearAlerts() {
      this.threats = []
      console.log('Alerts cleared')
    },
    investigateThreat(threatId) {
      console.log('Investigating threat:', threatId)
      this.$router.push(`/analytics?threat=${threatId}`)
    },
    blockThreat(threatId) {
      console.log('Blocking threat:', threatId)
      this.threats = this.threats.filter(t => t.id !== threatId)
    },
    toggleEngine(engineId) {
      const engine = this.detectionEngines.find(e => e.id === engineId)
      if (engine) {
        engine.status = engine.status === 'active' ? 'paused' : 'active'
        console.log('Engine', engineId, engine.status)
      }
    },
    addDetectionRule(rule) {
      const newRule = {
        id: `rule-${Date.now()}`,
        ...rule,
        status: 'active',
        matches: 0,
        accuracy: 0
      }
      this.detectionRules.push(newRule)
      console.log('Added detection rule:', newRule)
    },
    editRule(ruleId) {
      console.log('Editing rule:', ruleId)
    },
    toggleRule(ruleId) {
      const rule = this.detectionRules.find(r => r.id === ruleId)
      if (rule) {
        rule.status = rule.status === 'active' ? 'paused' : 'active'
        console.log('Rule', ruleId, rule.status)
      }
    },
    deleteRule(ruleId) {
      this.detectionRules = this.detectionRules.filter(r => r.id !== ruleId)
      console.log('Deleted rule:', ruleId)
    },
    initializeCharts() {
      this.$nextTick(() => {
        this.initializePerformanceChart()
        this.initializeDistributionChart()
      })
    },

    initializePerformanceChart() {
      const ctx = document.getElementById('performanceChart')
      if (ctx) {
        new Chart(ctx, {
          type: 'line',
          data: {
            labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
            datasets: [
              {
                label: 'Threats Detected',
                data: [12, 8, 15, 23, 18, 14, 9],
                borderColor: '#e74c3c',
                backgroundColor: 'rgba(231, 76, 60, 0.1)',
                tension: 0.4,
                fill: true
              },
              {
                label: 'False Positives',
                data: [2, 1, 3, 4, 2, 1, 1],
                borderColor: '#f39c12',
                backgroundColor: 'rgba(243, 156, 18, 0.1)',
                tension: 0.4,
                fill: true
              },
              {
                label: 'Detection Rate %',
                data: [94, 96, 92, 89, 95, 97, 98],
                borderColor: '#27ae60',
                backgroundColor: 'rgba(39, 174, 96, 0.1)',
                tension: 0.4,
                fill: true,
                yAxisID: 'y1'
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              title: {
                display: true,
                text: '24-Hour Detection Performance'
              },
              legend: {
                position: 'top'
              }
            },
            scales: {
              y: {
                type: 'linear',
                display: true,
                position: 'left',
                title: {
                  display: true,
                  text: 'Number of Threats'
                }
              },
              y1: {
                type: 'linear',
                display: true,
                position: 'right',
                title: {
                  display: true,
                  text: 'Detection Rate (%)'
                },
                grid: {
                  drawOnChartArea: false
                },
                min: 80,
                max: 100
              }
            }
          }
        })
      }
    },

    initializeDistributionChart() {
      const ctx = document.getElementById('distributionChart')
      if (ctx) {
        new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: ['Phishing', 'Malware', 'Pretexting', 'Baiting', 'Suspicious'],
            datasets: [{
              data: [35, 25, 15, 12, 13],
              backgroundColor: [
                '#e74c3c',
                '#f39c12',
                '#9b59b6',
                '#3498db',
                '#95a5a6'
              ],
              borderWidth: 2,
              borderColor: '#fff'
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              title: {
                display: true,
                text: 'Threat Type Distribution'
              },
              legend: {
                position: 'bottom'
              },
              tooltip: {
                callbacks: {
                  label: function(context) {
                    const label = context.label || ''
                    const value = context.parsed
                    const total = context.dataset.data.reduce((a, b) => a + b, 0)
                    const percentage = ((value / total) * 100).toFixed(1)
                    return `${label}: ${value} (${percentage}%)`
                  }
                }
              }
            }
          }
        })
      }
    },
    startRealTimeUpdates() {
      // Simulate real-time threat detection
      setInterval(() => {
        if (this.detectionActive && Math.random() < 0.1) {
          this.simulateNewThreat()
        }
      }, 10000) // Check every 10 seconds
    },
    simulateNewThreat() {
      const threatTypes = ['phishing', 'pretexting', 'baiting', 'suspicious']
      const severities = ['low', 'medium', 'high', 'critical']

      const newThreat = {
        id: `threat-${Date.now()}`,
        severity: severities[Math.floor(Math.random() * severities.length)],
        type: threatTypes[Math.floor(Math.random() * threatTypes.length)],
        title: 'New Threat Detected',
        description: 'Automated threat detection system identified suspicious activity',
        source: 'Automated Detection',
        target: 'Various',
        confidence: Math.floor(Math.random() * 40) + 60,
        timestamp: 'Just now'
      }

      this.threats.unshift(newThreat)

      // Keep only the latest 20 threats
      if (this.threats.length > 20) {
        this.threats = this.threats.slice(0, 20)
      }
    }
  },
  mounted() {
    // Initialize charts
    this.initializeCharts()

    // Simulate real-time updates
    this.startRealTimeUpdates()
  }
}
</script>

<style lang="scss" scoped>
.detection-center {
  .center-header {
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
  
  .detection-status {
    margin-bottom: 2rem;
    
    .status-overview {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1rem;
      
      .status-card {
        background: white;
        padding: 1.5rem;
        border-radius: 0.5rem;
        box-shadow: var(--shadow);
        display: flex;
        align-items: center;
        
        .status-icon {
          font-size: 2rem;
          margin-right: 1rem;
          width: 3rem;
          height: 3rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          
          &.active {
            background: rgba(39, 174, 96, 0.2);
          }
          
          &.warning {
            background: rgba(243, 156, 18, 0.2);
          }
          
          &.error {
            background: rgba(231, 76, 60, 0.2);
          }
        }
        
        .status-info {
          flex: 1;
          
          h3 {
            color: var(--primary-color);
            margin-bottom: 0.25rem;
            font-size: 1.1rem;
          }
          
          .status-text {
            margin-bottom: 0.25rem;
            
            &.active {
              color: var(--success-color);
            }
            
            &.warning {
              color: var(--warning-color);
            }
            
            &.error {
              color: var(--danger-color);
            }
          }
          
          .status-time {
            font-size: 0.8rem;
            color: #666;
          }
        }
      }
    }
  }
  
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    
    h3 {
      color: var(--primary-color);
      margin: 0;
    }
    
    .detection-controls {
      display: flex;
      gap: 0.5rem;
    }
  }
  
  .threat-feed {
    .feed-header {
      margin-bottom: 1rem;
      
      .feed-filters {
        display: flex;
        gap: 1rem;
        
        .filter-select {
          padding: 0.5rem;
          border: 1px solid var(--border-color);
          border-radius: 0.25rem;
          font-size: 0.9rem;
        }
      }
    }
    
    .threat-list {
      max-height: 600px;
      overflow-y: auto;
      
      .threat-item {
        display: flex;
        align-items: center;
        padding: 1rem;
        border-bottom: 1px solid var(--border-color);
        border-left: 4px solid transparent;
        
        &.critical {
          border-left-color: var(--danger-color);
          background: rgba(231, 76, 60, 0.05);
        }
        
        &.high {
          border-left-color: #e67e22;
          background: rgba(230, 126, 34, 0.05);
        }
        
        &.medium {
          border-left-color: var(--warning-color);
          background: rgba(243, 156, 18, 0.05);
        }
        
        &.low {
          border-left-color: var(--secondary-color);
          background: rgba(52, 152, 219, 0.05);
        }
        
        .threat-indicator {
          margin-right: 1rem;
          text-align: center;
          
          .severity-badge {
            padding: 0.25rem 0.5rem;
            border-radius: 0.25rem;
            font-size: 0.7rem;
            font-weight: bold;
            color: white;
            margin-bottom: 0.25rem;
            
            &.critical {
              background: var(--danger-color);
            }
            
            &.high {
              background: #e67e22;
            }
            
            &.medium {
              background: var(--warning-color);
            }
            
            &.low {
              background: var(--secondary-color);
            }
          }
          
          .threat-time {
            font-size: 0.8rem;
            color: #666;
          }
        }
        
        .threat-details {
          flex: 1;
          
          .threat-title {
            font-weight: 600;
            color: var(--primary-color);
            margin-bottom: 0.25rem;
          }
          
          .threat-description {
            color: #666;
            margin-bottom: 0.5rem;
            font-size: 0.9rem;
          }
          
          .threat-metadata {
            display: flex;
            gap: 1rem;
            
            .metadata-item {
              font-size: 0.8rem;
              color: var(--secondary-color);
            }
          }
        }
        
        .threat-actions {
          display: flex;
          gap: 0.5rem;
          
          .btn {
            padding: 0.5rem 1rem;
            font-size: 0.8rem;
          }
        }
      }
    }
  }
  
  .stats-content {
    .stat-item {
      display: flex;
      align-items: center;
      padding: 1rem;
      border-bottom: 1px solid var(--border-color);
      
      &:last-child {
        border-bottom: none;
      }
      
      .stat-icon {
        font-size: 1.5rem;
        margin-right: 1rem;
      }
      
      .stat-info {
        flex: 1;
        
        .stat-value {
          font-size: 1.5rem;
          font-weight: bold;
          color: var(--primary-color);
          margin-bottom: 0.25rem;
        }
        
        .stat-label {
          color: #666;
          font-size: 0.9rem;
          margin-bottom: 0.25rem;
        }
        
        .stat-change {
          font-size: 0.8rem;
          
          &.positive {
            color: var(--success-color);
          }
          
          &.negative {
            color: var(--danger-color);
          }
        }
      }
    }
  }
  
  .engines-list {
    .engine-item {
      padding: 1rem;
      border-bottom: 1px solid var(--border-color);
      
      &:last-child {
        border-bottom: none;
      }
      
      .engine-status {
        display: flex;
        align-items: center;
        margin-bottom: 0.5rem;
        
        .engine-name {
          font-weight: 600;
          color: var(--primary-color);
          margin-left: 0.5rem;
        }
      }
      
      .engine-metrics {
        display: flex;
        gap: 1rem;
        margin-bottom: 0.5rem;
        
        .metric {
          font-size: 0.9rem;
          color: #666;
        }
      }
      
      .engine-controls {
        .btn {
          padding: 0.25rem 0.75rem;
          font-size: 0.8rem;
        }
      }
    }
  }
  
  .performance-chart,
  .distribution-chart {
    height: 300px;
    padding: 1rem;
    background: white;
    border-radius: 0.25rem;

    canvas {
      max-width: 100%;
      max-height: 100%;
    }
  }
  
  .rule-builder {
    background: var(--light-color);
    padding: 1.5rem;
    border-radius: 0.5rem;
    margin-bottom: 1.5rem;
  }
  
  .rules-list {
    .rule-item {
      display: flex;
      align-items: center;
      padding: 1rem;
      border-bottom: 1px solid var(--border-color);
      
      &:last-child {
        border-bottom: none;
      }
      
      .rule-info {
        flex: 1;
        
        .rule-name {
          font-weight: 600;
          color: var(--primary-color);
          margin-bottom: 0.25rem;
        }
        
        .rule-description {
          color: #666;
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
        }
        
        .rule-metadata {
          display: flex;
          gap: 1rem;
          
          .metadata-item {
            font-size: 0.8rem;
            color: var(--secondary-color);
          }
        }
      }
      
      .rule-status {
        display: flex;
        align-items: center;
        margin: 0 1rem;
        
        .status-text {
          margin-left: 0.5rem;
          font-size: 0.9rem;
          color: #666;
        }
      }
      
      .rule-actions {
        display: flex;
        gap: 0.5rem;
        
        .btn {
          padding: 0.5rem 1rem;
          font-size: 0.8rem;
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .detection-center {
    .threat-item {
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;
      
      .threat-actions {
        width: 100%;
        justify-content: center;
      }
    }
    
    .rule-item {
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;
      
      .rule-actions {
        width: 100%;
        justify-content: center;
      }
    }
  }
}
</style>
