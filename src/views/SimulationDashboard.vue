<template>
  <div class="simulation-dashboard">
    <div class="dashboard-header">
      <h1>Simulation Dashboard</h1>
      <p class="subtitle">Monitor and control social engineering attack simulations</p>
    </div>

    <div class="dashboard-controls">
      <div class="control-panel">
        <button @click="startSimulation" :disabled="isSimulationRunning" class="btn btn-primary">
          <span v-if="!isSimulationRunning">▶️ Start Simulation</span>
          <span v-else>⏸️ Simulation Running</span>
        </button>
        <button @click="stopSimulation" :disabled="!isSimulationRunning" class="btn btn-danger">
          ⏹️ Stop Simulation
        </button>
        <button @click="resetSimulation" class="btn btn-secondary">
          🔄 Reset
        </button>
      </div>
      
      <div class="simulation-status">
        <div class="status-indicator" :class="simulationStatus.toLowerCase()"></div>
        <span class="status-text">{{ simulationStatus }}</span>
      </div>
    </div>

    <div class="dashboard-stats">
      <div class="stat-card" v-for="stat in dashboardStats" :key="stat.label">
        <div class="stat-icon">{{ stat.icon }}</div>
        <div class="stat-content">
          <div class="stat-value">{{ stat.value }}</div>
          <div class="stat-label">{{ stat.label }}</div>
          <div class="stat-change" :class="stat.trend">{{ stat.change }}</div>
        </div>
      </div>
    </div>

    <div class="dashboard-content">
      <div class="row">
        <div class="col-8">
          <div class="card">
            <div class="card-header">
              <h3>Active Simulations</h3>
            </div>
            <div class="simulations-list">
              <div class="simulation-item" v-for="simulation in activeSimulations" :key="simulation.id">
                <div class="simulation-info">
                  <div class="simulation-type">
                    <span class="type-icon">{{ simulation.icon }}</span>
                    <span class="type-name">{{ simulation.type }}</span>
                  </div>
                  <div class="simulation-details">
                    <div class="detail-item">
                      <strong>Target:</strong> {{ simulation.target }}
                    </div>
                    <div class="detail-item">
                      <strong>Duration:</strong> {{ simulation.duration }}
                    </div>
                    <div class="detail-item">
                      <strong>Progress:</strong> {{ simulation.progress }}%
                    </div>
                  </div>
                </div>
                <div class="simulation-progress">
                  <div class="progress-bar">
                    <div class="progress-fill" :style="{ width: simulation.progress + '%' }"></div>
                  </div>
                  <div class="simulation-actions">
                    <button @click="viewSimulation(simulation.id)" class="btn btn-secondary">View</button>
                    <button @click="pauseSimulation(simulation.id)" class="btn btn-warning">Pause</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="col-4">
          <div class="card">
            <div class="card-header">
              <h3>Real-time Alerts</h3>
            </div>
            <div class="alerts-list">
              <div class="alert-item" v-for="alert in recentAlerts" :key="alert.id" :class="alert.severity">
                <div class="alert-icon">{{ alert.icon }}</div>
                <div class="alert-content">
                  <div class="alert-title">{{ alert.title }}</div>
                  <div class="alert-message">{{ alert.message }}</div>
                  <div class="alert-time">{{ alert.time }}</div>
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
              <h3>Attack Vector Distribution</h3>
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
              <h3>Recent Simulation Results</h3>
            </div>
            <div class="results-table">
              <table>
                <thead>
                  <tr>
                    <th>Simulation ID</th>
                    <th>Type</th>
                    <th>Start Time</th>
                    <th>Duration</th>
                    <th>Success Rate</th>
                    <th>Detection Rate</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="result in simulationResults" :key="result.id">
                    <td>{{ result.id }}</td>
                    <td>
                      <span class="type-badge">{{ result.type }}</span>
                    </td>
                    <td>{{ result.startTime }}</td>
                    <td>{{ result.duration }}</td>
                    <td>
                      <span class="rate-badge" :class="getRateClass(result.successRate)">
                        {{ result.successRate }}%
                      </span>
                    </td>
                    <td>
                      <span class="rate-badge" :class="getRateClass(result.detectionRate, true)">
                        {{ result.detectionRate }}%
                      </span>
                    </td>
                    <td>
                      <span class="status-badge" :class="result.status.toLowerCase()">
                        {{ result.status }}
                      </span>
                    </td>
                    <td>
                      <button @click="viewDetails(result.id)" class="btn btn-secondary">Details</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

export default {
  name: 'SimulationDashboard',
  data() {
    return {
      isSimulationRunning: false,
      simulationStatus: 'Ready',
      dashboardStats: [
        {
          icon: '🎯',
          label: 'Active Simulations',
          value: '3',
          change: '+2 from yesterday',
          trend: 'positive'
        },
        {
          icon: '🔍',
          label: 'Detection Rate',
          value: '94.2%',
          change: '+1.5% from last week',
          trend: 'positive'
        },
        {
          icon: '⚡',
          label: 'Avg Response Time',
          value: '3.2s',
          change: '-0.8s improvement',
          trend: 'positive'
        },
        {
          icon: '🚨',
          label: 'Alerts Today',
          value: '12',
          change: '-3 from yesterday',
          trend: 'negative'
        }
      ],
      activeSimulations: [
        {
          id: 'SIM-001',
          type: 'Email Phishing',
          icon: '📧',
          target: 'Marketing Team',
          duration: '2h 15m',
          progress: 75
        },
        {
          id: 'SIM-002',
          type: 'Spear Phishing',
          icon: '🎣',
          target: 'Executive Team',
          duration: '45m',
          progress: 30
        },
        {
          id: 'SIM-003',
          type: 'Pretexting',
          icon: '🎭',
          target: 'IT Support',
          duration: '1h 30m',
          progress: 60
        }
      ],
      recentAlerts: [
        {
          id: 'ALT-001',
          severity: 'high',
          icon: '🚨',
          title: 'Phishing Attempt Detected',
          message: 'Suspicious email detected in Marketing department',
          time: '2 minutes ago'
        },
        {
          id: 'ALT-002',
          severity: 'medium',
          icon: '⚠️',
          title: 'Unusual User Behavior',
          message: 'User clicked suspicious link in simulation',
          time: '5 minutes ago'
        },
        {
          id: 'ALT-003',
          severity: 'low',
          icon: 'ℹ️',
          title: 'Simulation Completed',
          message: 'Baiting simulation finished successfully',
          time: '10 minutes ago'
        }
      ],
      simulationResults: [
        {
          id: 'SIM-098',
          type: 'Phishing',
          startTime: '2024-01-15 09:30',
          duration: '2h 45m',
          successRate: 15,
          detectionRate: 92,
          status: 'Completed'
        },
        {
          id: 'SIM-097',
          type: 'Pretexting',
          startTime: '2024-01-15 08:15',
          duration: '1h 20m',
          successRate: 22,
          detectionRate: 87,
          status: 'Completed'
        },
        {
          id: 'SIM-096',
          type: 'Baiting',
          startTime: '2024-01-14 14:00',
          duration: '3h 10m',
          successRate: 18,
          detectionRate: 89,
          status: 'Completed'
        }
      ]
    }
  },
  methods: {
    startSimulation() {
      this.isSimulationRunning = true
      this.simulationStatus = 'Running'
      // Simulate starting a simulation
      console.log('Starting simulation...')
    },
    stopSimulation() {
      this.isSimulationRunning = false
      this.simulationStatus = 'Stopped'
      console.log('Stopping simulation...')
    },
    resetSimulation() {
      this.isSimulationRunning = false
      this.simulationStatus = 'Ready'
      console.log('Resetting simulation...')
    },
    viewSimulation(id) {
      console.log('Viewing simulation:', id)
      this.$router.push(`/attacks?simulation=${id}`)
    },
    pauseSimulation(id) {
      console.log('Pausing simulation:', id)
    },
    viewDetails(id) {
      console.log('Viewing details for:', id)
      this.$router.push(`/analytics?result=${id}`)
    },
    getRateClass(rate, inverse = false) {
      const numRate = parseFloat(rate)
      if (inverse) {
        if (numRate >= 90) return 'excellent'
        if (numRate >= 80) return 'good'
        if (numRate >= 70) return 'fair'
        return 'poor'
      } else {
        if (numRate <= 10) return 'excellent'
        if (numRate <= 20) return 'good'
        if (numRate <= 30) return 'fair'
        return 'poor'
      }
    }
  },
  methods: {
    startSimulation() {
      this.isSimulationRunning = true
      this.simulationStatus = 'Running'
      // Simulate starting a simulation
      console.log('Starting simulation...')
    },
    stopSimulation() {
      this.isSimulationRunning = false
      this.simulationStatus = 'Stopped'
      console.log('Stopping simulation...')
    },
    resetSimulation() {
      this.isSimulationRunning = false
      this.simulationStatus = 'Ready'
      console.log('Resetting simulation...')
    },
    viewSimulation(id) {
      console.log('Viewing simulation:', id)
      this.$router.push(`/attacks?simulation=${id}`)
    },
    pauseSimulation(id) {
      console.log('Pausing simulation:', id)
    },
    viewDetails(id) {
      console.log('Viewing details for:', id)
      this.$router.push(`/analytics?result=${id}`)
    },
    getRateClass(rate, inverse = false) {
      const numRate = parseFloat(rate)
      if (inverse) {
        if (numRate >= 90) return 'excellent'
        if (numRate >= 80) return 'good'
        if (numRate >= 70) return 'fair'
        return 'poor'
      } else {
        if (numRate <= 10) return 'excellent'
        if (numRate <= 20) return 'good'
        if (numRate <= 30) return 'fair'
        return 'poor'
      }
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
          type: 'bar',
          data: {
            labels: ['Phishing', 'Spear Phishing', 'Pretexting', 'Baiting', 'Custom'],
            datasets: [
              {
                label: 'Success Rate (%)',
                data: [12, 18, 22, 15, 8],
                backgroundColor: [
                  'rgba(231, 76, 60, 0.8)',
                  'rgba(243, 156, 18, 0.8)',
                  'rgba(155, 89, 182, 0.8)',
                  'rgba(52, 152, 219, 0.8)',
                  'rgba(39, 174, 96, 0.8)'
                ],
                borderColor: [
                  '#e74c3c',
                  '#f39c12',
                  '#9b59b6',
                  '#3498db',
                  '#27ae60'
                ],
                borderWidth: 2
              },
              {
                label: 'Detection Rate (%)',
                data: [94, 89, 87, 92, 96],
                backgroundColor: [
                  'rgba(39, 174, 96, 0.8)',
                  'rgba(39, 174, 96, 0.8)',
                  'rgba(39, 174, 96, 0.8)',
                  'rgba(39, 174, 96, 0.8)',
                  'rgba(39, 174, 96, 0.8)'
                ],
                borderColor: '#27ae60',
                borderWidth: 2
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              title: {
                display: true,
                text: 'Attack Performance vs Detection'
              },
              legend: {
                position: 'top'
              }
            },
            scales: {
              y: {
                beginAtZero: true,
                max: 100,
                title: {
                  display: true,
                  text: 'Percentage (%)'
                }
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
          type: 'radar',
          data: {
            labels: ['Email Security', 'User Awareness', 'Technical Controls', 'Process Controls', 'Incident Response'],
            datasets: [{
              label: 'Current Security Posture',
              data: [85, 72, 90, 78, 88],
              backgroundColor: 'rgba(52, 152, 219, 0.2)',
              borderColor: '#3498db',
              borderWidth: 2,
              pointBackgroundColor: '#3498db',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: '#3498db'
            }, {
              label: 'Target Security Level',
              data: [95, 85, 95, 90, 95],
              backgroundColor: 'rgba(39, 174, 96, 0.2)',
              borderColor: '#27ae60',
              borderWidth: 2,
              pointBackgroundColor: '#27ae60',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: '#27ae60'
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              title: {
                display: true,
                text: 'Security Posture Analysis'
              },
              legend: {
                position: 'bottom'
              }
            },
            scales: {
              r: {
                beginAtZero: true,
                max: 100,
                ticks: {
                  stepSize: 20
                }
              }
            }
          }
        })
      }
    }
  },
  mounted() {
    // Initialize charts here
    this.initializeCharts()
  }
}
</script>

<style lang="scss" scoped>
.simulation-dashboard {
  .dashboard-header {
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
  
  .dashboard-controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    padding: 1.5rem;
    background: white;
    border-radius: 0.5rem;
    box-shadow: var(--shadow);
    
    .control-panel {
      display: flex;
      gap: 1rem;
    }
    
    .simulation-status {
      display: flex;
      align-items: center;
      
      .status-text {
        margin-left: 0.5rem;
        font-weight: 600;
        color: var(--primary-color);
      }
    }
  }
  
  .dashboard-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
    
    .stat-card {
      background: white;
      padding: 1.5rem;
      border-radius: 0.5rem;
      box-shadow: var(--shadow);
      display: flex;
      align-items: center;
      
      .stat-icon {
        font-size: 2.5rem;
        margin-right: 1rem;
      }
      
      .stat-content {
        flex: 1;
        
        .stat-value {
          font-size: 2rem;
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
  
  .simulations-list {
    .simulation-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.5rem;
      border-bottom: 1px solid var(--border-color);
      
      &:last-child {
        border-bottom: none;
      }
      
      .simulation-info {
        flex: 1;
        
        .simulation-type {
          display: flex;
          align-items: center;
          margin-bottom: 0.5rem;
          
          .type-icon {
            font-size: 1.5rem;
            margin-right: 0.5rem;
          }
          
          .type-name {
            font-weight: 600;
            color: var(--primary-color);
          }
        }
        
        .simulation-details {
          display: flex;
          gap: 1rem;
          
          .detail-item {
            font-size: 0.9rem;
            color: #666;
          }
        }
      }
      
      .simulation-progress {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 0.5rem;
        
        .progress-bar {
          width: 150px;
          height: 8px;
          background: var(--light-color);
          border-radius: 4px;
          overflow: hidden;
          
          .progress-fill {
            height: 100%;
            background: var(--secondary-color);
            transition: width 0.3s ease;
          }
        }
        
        .simulation-actions {
          display: flex;
          gap: 0.5rem;
          
          .btn {
            padding: 0.25rem 0.75rem;
            font-size: 0.8rem;
          }
        }
      }
    }
  }
  
  .alerts-list {
    max-height: 400px;
    overflow-y: auto;
    
    .alert-item {
      display: flex;
      align-items: flex-start;
      padding: 1rem;
      border-bottom: 1px solid var(--border-color);
      border-left: 4px solid transparent;
      
      &.high {
        border-left-color: var(--danger-color);
        background: rgba(231, 76, 60, 0.05);
      }
      
      &.medium {
        border-left-color: var(--warning-color);
        background: rgba(243, 156, 18, 0.05);
      }
      
      &.low {
        border-left-color: var(--secondary-color);
        background: rgba(52, 152, 219, 0.05);
      }
      
      .alert-icon {
        font-size: 1.5rem;
        margin-right: 1rem;
        flex-shrink: 0;
      }
      
      .alert-content {
        flex: 1;
        
        .alert-title {
          font-weight: 600;
          color: var(--primary-color);
          margin-bottom: 0.25rem;
        }
        
        .alert-message {
          font-size: 0.9rem;
          color: #666;
          margin-bottom: 0.25rem;
        }
        
        .alert-time {
          font-size: 0.8rem;
          color: #999;
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
  
  .results-table {
    overflow-x: auto;
    
    table {
      width: 100%;
      border-collapse: collapse;
      
      th, td {
        padding: 1rem;
        text-align: left;
        border-bottom: 1px solid var(--border-color);
      }
      
      th {
        background: var(--light-color);
        font-weight: 600;
        color: var(--primary-color);
      }
      
      tr:hover {
        background: var(--light-color);
      }
      
      .type-badge {
        background: var(--secondary-color);
        color: white;
        padding: 0.25rem 0.75rem;
        border-radius: 1rem;
        font-size: 0.8rem;
      }
      
      .rate-badge {
        padding: 0.25rem 0.75rem;
        border-radius: 1rem;
        font-size: 0.8rem;
        font-weight: bold;
        
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
      
      .status-badge {
        padding: 0.25rem 0.75rem;
        border-radius: 1rem;
        font-size: 0.8rem;
        font-weight: bold;
        
        &.completed {
          background: var(--success-color);
          color: white;
        }
        
        &.running {
          background: var(--secondary-color);
          color: white;
        }
        
        &.paused {
          background: var(--warning-color);
          color: white;
        }
        
        &.failed {
          background: var(--danger-color);
          color: white;
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .simulation-dashboard {
    .dashboard-controls {
      flex-direction: column;
      gap: 1rem;
      
      .control-panel {
        justify-content: center;
      }
    }
    
    .simulation-item {
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;
      
      .simulation-progress {
        align-items: flex-start;
        width: 100%;
        
        .progress-bar {
          width: 100%;
        }
      }
    }
  }
}
</style>
