<template>
  <div class="analytics-dashboard">
    <div class="dashboard-header">
      <h1>Analytics Dashboard</h1>
      <p class="subtitle">Comprehensive analysis and reporting of social engineering simulations</p>
    </div>

    <div class="analytics-filters">
      <div class="filter-group">
        <label>Time Period</label>
        <select v-model="filters.timePeriod" class="form-control" @change="updateAnalytics">
          <option value="24h">Last 24 Hours</option>
          <option value="7d">Last 7 Days</option>
          <option value="30d">Last 30 Days</option>
          <option value="90d">Last 90 Days</option>
          <option value="custom">Custom Range</option>
        </select>
      </div>
      
      <div class="filter-group">
        <label>Attack Type</label>
        <select v-model="filters.attackType" class="form-control" @change="updateAnalytics">
          <option value="">All Types</option>
          <option value="phishing">Phishing</option>
          <option value="spear-phishing">Spear Phishing</option>
          <option value="pretexting">Pretexting</option>
          <option value="baiting">Baiting</option>
        </select>
      </div>
      
      <div class="filter-group">
        <label>Department</label>
        <select v-model="filters.department" class="form-control" @change="updateAnalytics">
          <option value="">All Departments</option>
          <option value="finance">Finance</option>
          <option value="hr">Human Resources</option>
          <option value="it">IT Department</option>
          <option value="marketing">Marketing</option>
          <option value="operations">Operations</option>
        </select>
      </div>
      
      <div class="filter-actions">
        <button @click="exportReport" class="btn btn-primary">📊 Export Report</button>
        <button @click="resetFilters" class="btn btn-secondary">🔄 Reset Filters</button>
      </div>
    </div>

    <div class="analytics-overview">
      <div class="overview-cards">
        <div class="overview-card" v-for="metric in overviewMetrics" :key="metric.label">
          <div class="card-icon" :style="{ backgroundColor: metric.color }">{{ metric.icon }}</div>
          <div class="card-content">
            <div class="card-value">{{ metric.value }}</div>
            <div class="card-label">{{ metric.label }}</div>
            <div class="card-change" :class="metric.trend">{{ metric.change }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="analytics-content">
      <div class="row">
        <div class="col-8">
          <div class="card">
            <div class="card-header">
              <h3>Attack Success Rate Trends</h3>
              <div class="chart-controls">
                <button @click="chartType = 'line'" :class="['btn', chartType === 'line' ? 'btn-primary' : 'btn-secondary']">
                  Line Chart
                </button>
                <button @click="chartType = 'bar'" :class="['btn', chartType === 'bar' ? 'btn-primary' : 'btn-secondary']">
                  Bar Chart
                </button>
              </div>
            </div>
            <div class="chart-container">
              <canvas id="trendsChart" width="600" height="300"></canvas>
            </div>
          </div>
        </div>
        
        <div class="col-4">
          <div class="card">
            <div class="card-header">
              <h3>Attack Type Distribution</h3>
            </div>
            <div class="chart-container">
              <canvas id="distributionChart" width="300" height="300"></canvas>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-6">
          <div class="card">
            <div class="card-header">
              <h3>Department Performance</h3>
            </div>
            <div class="department-stats">
              <div class="department-item" v-for="dept in departmentStats" :key="dept.name">
                <div class="department-info">
                  <div class="department-name">{{ dept.name }}</div>
                  <div class="department-metrics">
                    <span class="metric">{{ dept.employees }} employees</span>
                    <span class="metric">{{ dept.simulations }} simulations</span>
                  </div>
                </div>
                <div class="department-scores">
                  <div class="score-item">
                    <div class="score-label">Success Rate</div>
                    <div class="score-bar">
                      <div class="score-fill" :style="{ width: dept.successRate + '%', backgroundColor: getScoreColor(dept.successRate, true) }"></div>
                    </div>
                    <div class="score-value">{{ dept.successRate }}%</div>
                  </div>
                  <div class="score-item">
                    <div class="score-label">Detection Rate</div>
                    <div class="score-bar">
                      <div class="score-fill" :style="{ width: dept.detectionRate + '%', backgroundColor: getScoreColor(dept.detectionRate) }"></div>
                    </div>
                    <div class="score-value">{{ dept.detectionRate }}%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="col-6">
          <div class="card">
            <div class="card-header">
              <h3>Top Vulnerabilities</h3>
            </div>
            <div class="vulnerabilities-list">
              <div class="vulnerability-item" v-for="vuln in topVulnerabilities" :key="vuln.id">
                <div class="vulnerability-rank">{{ vuln.rank }}</div>
                <div class="vulnerability-info">
                  <div class="vulnerability-name">{{ vuln.name }}</div>
                  <div class="vulnerability-description">{{ vuln.description }}</div>
                </div>
                <div class="vulnerability-stats">
                  <div class="stat-item">
                    <div class="stat-value">{{ vuln.incidents }}</div>
                    <div class="stat-label">Incidents</div>
                  </div>
                  <div class="stat-item">
                    <div class="stat-value">{{ vuln.riskScore }}/10</div>
                    <div class="stat-label">Risk Score</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-header">
              <h3>Detailed Simulation Results</h3>
              <div class="table-controls">
                <input v-model="searchQuery" type="text" class="form-control" placeholder="Search simulations...">
                <select v-model="sortBy" class="form-control">
                  <option value="date">Sort by Date</option>
                  <option value="success_rate">Sort by Success Rate</option>
                  <option value="detection_rate">Sort by Detection Rate</option>
                  <option value="participants">Sort by Participants</option>
                </select>
              </div>
            </div>
            
            <div class="results-table">
              <table>
                <thead>
                  <tr>
                    <th>Simulation ID</th>
                    <th>Type</th>
                    <th>Date</th>
                    <th>Department</th>
                    <th>Participants</th>
                    <th>Success Rate</th>
                    <th>Detection Rate</th>
                    <th>Avg Response Time</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="result in filteredResults" :key="result.id">
                    <td>{{ result.id }}</td>
                    <td>
                      <span class="type-badge" :class="result.type">{{ result.type }}</span>
                    </td>
                    <td>{{ result.date }}</td>
                    <td>{{ result.department }}</td>
                    <td>{{ result.participants }}</td>
                    <td>
                      <span class="rate-badge" :class="getRateClass(result.successRate, true)">
                        {{ result.successRate }}%
                      </span>
                    </td>
                    <td>
                      <span class="rate-badge" :class="getRateClass(result.detectionRate)">
                        {{ result.detectionRate }}%
                      </span>
                    </td>
                    <td>{{ result.responseTime }}</td>
                    <td>
                      <button @click="viewDetails(result.id)" class="btn btn-primary btn-sm">Details</button>
                      <button @click="generateReport(result.id)" class="btn btn-secondary btn-sm">Report</button>
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
  name: 'AnalyticsDashboard',
  data() {
    return {
      chartType: 'line',
      trendsChart: null,
      searchQuery: '',
      sortBy: 'date',
      filters: {
        timePeriod: '30d',
        attackType: '',
        department: ''
      },
      overviewMetrics: [
        {
          icon: '🎯',
          label: 'Total Simulations',
          value: '247',
          change: '+23 this month',
          trend: 'positive',
          color: '#3498db'
        },
        {
          icon: '📊',
          label: 'Avg Success Rate',
          value: '18.5%',
          change: '-2.3% improvement',
          trend: 'negative',
          color: '#e74c3c'
        },
        {
          icon: '🔍',
          label: 'Detection Rate',
          value: '94.2%',
          change: '+1.8% this month',
          trend: 'positive',
          color: '#27ae60'
        },
        {
          icon: '⚡',
          label: 'Avg Response Time',
          value: '3.2s',
          change: '-0.5s faster',
          trend: 'positive',
          color: '#f39c12'
        }
      ],
      departmentStats: [
        {
          name: 'Finance',
          employees: 45,
          simulations: 23,
          successRate: 12,
          detectionRate: 96
        },
        {
          name: 'Human Resources',
          employees: 18,
          simulations: 15,
          successRate: 22,
          detectionRate: 89
        },
        {
          name: 'IT Department',
          employees: 32,
          simulations: 28,
          successRate: 8,
          detectionRate: 98
        },
        {
          name: 'Marketing',
          employees: 28,
          simulations: 19,
          successRate: 25,
          detectionRate: 85
        },
        {
          name: 'Operations',
          employees: 67,
          simulations: 34,
          successRate: 19,
          detectionRate: 92
        }
      ],
      topVulnerabilities: [
        {
          id: 'vuln-001',
          rank: 1,
          name: 'Urgent Email Response',
          description: 'Users responding to urgent requests without verification',
          incidents: 34,
          riskScore: 8.5
        },
        {
          id: 'vuln-002',
          rank: 2,
          name: 'Authority Impersonation',
          description: 'Falling for fake executive or IT support requests',
          incidents: 28,
          riskScore: 7.8
        },
        {
          id: 'vuln-003',
          rank: 3,
          name: 'Suspicious Link Clicking',
          description: 'Clicking on suspicious links in emails',
          incidents: 25,
          riskScore: 7.2
        },
        {
          id: 'vuln-004',
          rank: 4,
          name: 'Credential Sharing',
          description: 'Sharing login credentials when requested',
          incidents: 19,
          riskScore: 9.1
        }
      ],
      simulationResults: [
        {
          id: 'SIM-2024-001',
          type: 'phishing',
          date: '2024-01-15',
          department: 'Finance',
          participants: 23,
          successRate: 15,
          detectionRate: 92,
          responseTime: '2.8s'
        },
        {
          id: 'SIM-2024-002',
          type: 'spear-phishing',
          date: '2024-01-14',
          department: 'HR',
          participants: 12,
          successRate: 25,
          detectionRate: 87,
          responseTime: '4.1s'
        },
        {
          id: 'SIM-2024-003',
          type: 'pretexting',
          date: '2024-01-13',
          department: 'IT',
          participants: 18,
          successRate: 8,
          detectionRate: 98,
          responseTime: '1.9s'
        },
        {
          id: 'SIM-2024-004',
          type: 'baiting',
          date: '2024-01-12',
          department: 'Marketing',
          participants: 15,
          successRate: 22,
          detectionRate: 89,
          responseTime: '3.5s'
        }
      ]
    }
  },
  computed: {
    filteredResults() {
      let results = [...this.simulationResults]
      
      // Apply search filter
      if (this.searchQuery) {
        results = results.filter(result => 
          result.id.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          result.type.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          result.department.toLowerCase().includes(this.searchQuery.toLowerCase())
        )
      }
      
      // Apply department filter
      if (this.filters.department) {
        results = results.filter(result => result.department.toLowerCase() === this.filters.department)
      }
      
      // Apply attack type filter
      if (this.filters.attackType) {
        results = results.filter(result => result.type === this.filters.attackType)
      }
      
      // Apply sorting
      results.sort((a, b) => {
        switch (this.sortBy) {
          case 'success_rate':
            return b.successRate - a.successRate
          case 'detection_rate':
            return b.detectionRate - a.detectionRate
          case 'participants':
            return b.participants - a.participants
          default:
            return new Date(b.date) - new Date(a.date)
        }
      })
      
      return results
    }
  },
  // methods: {
  //   updateAnalytics() {
  //     console.log('Updating analytics with filters:', this.filters)
  //     // Simulate data refresh
  //   },
  //   exportReport() {
  //     console.log('Exporting analytics report...')
  //     // Simulate report export
  //     alert('Analytics report exported successfully!')
  //   },
  //   resetFilters() {
  //     this.filters = {
  //       timePeriod: '30d',
  //       attackType: '',
  //       department: ''
  //     }
  //     this.searchQuery = ''
  //     this.sortBy = 'date'
  //     this.updateAnalytics()
  //   },
  //   getScoreColor(score, inverse = false) {
  //     if (inverse) {
  //       // For success rates, lower is better
  //       if (score <= 10) return '#27ae60'
  //       if (score <= 20) return '#f39c12'
  //       return '#e74c3c'
  //     } else {
  //       // For detection rates, higher is better
  //       if (score >= 90) return '#27ae60'
  //       if (score >= 80) return '#f39c12'
  //       return '#e74c3c'
  //     }
  //   },
  //   getRateClass(rate, inverse = false) {
  //     const numRate = parseFloat(rate)
  //     if (inverse) {
  //       if (numRate <= 10) return 'excellent'
  //       if (numRate <= 20) return 'good'
  //       if (numRate <= 30) return 'fair'
  //       return 'poor'
  //     } else {
  //       if (numRate >= 90) return 'excellent'
  //       if (numRate >= 80) return 'good'
  //       if (numRate >= 70) return 'fair'
  //       return 'poor'
  //     }
  //   },
  //   viewDetails(simulationId) {
  //     console.log('Viewing details for simulation:', simulationId)
  //     this.$router.push(`/simulation-details/${simulationId}`)
  //   },
  //   generateReport(simulationId) {
  //     console.log('Generating report for simulation:', simulationId)
  //     alert('Detailed report generated successfully!')
  //   }
  // },
  watch: {
    chartType() {
      this.updateChartType()
    }
  },
  methods: {
    updateAnalytics() {
      console.log('Updating analytics with filters:', this.filters)
      // Simulate data refresh
    },
    exportReport() {
      console.log('Exporting analytics report...')
      // Simulate report export
      alert('Analytics report exported successfully!')
    },
    resetFilters() {
      this.filters = {
        timePeriod: '30d',
        attackType: '',
        department: ''
      }
      this.searchQuery = ''
      this.sortBy = 'date'
      this.updateAnalytics()
    },
    getScoreColor(score, inverse = false) {
      if (inverse) {
        // For success rates, lower is better
        if (score <= 10) return '#27ae60'
        if (score <= 20) return '#f39c12'
        return '#e74c3c'
      } else {
        // For detection rates, higher is better
        if (score >= 90) return '#27ae60'
        if (score >= 80) return '#f39c12'
        return '#e74c3c'
      }
    },
    getRateClass(rate, inverse = false) {
      const numRate = parseFloat(rate)
      if (inverse) {
        if (numRate <= 10) return 'excellent'
        if (numRate <= 20) return 'good'
        if (numRate <= 30) return 'fair'
        return 'poor'
      } else {
        if (numRate >= 90) return 'excellent'
        if (numRate >= 80) return 'good'
        if (numRate >= 70) return 'fair'
        return 'poor'
      }
    },
    viewDetails(simulationId) {
      console.log('Viewing details for simulation:', simulationId)
      this.$router.push(`/simulation-details/${simulationId}`)
    },
    generateReport(simulationId) {
      console.log('Generating report for simulation:', simulationId)
      alert('Detailed report generated successfully!')
    },
    initializeCharts() {
      this.$nextTick(() => {
        this.initializeTrendsChart()
        this.initializeDistributionChart()
      })
    },

    initializeTrendsChart() {
      const ctx = document.getElementById('trendsChart')
      if (ctx) {
        this.trendsChart = new Chart(ctx, {
          type: this.chartType,
          data: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
            datasets: [
              {
                label: 'Phishing Success Rate',
                data: [25, 22, 18, 15, 12, 8],
                borderColor: '#e74c3c',
                backgroundColor: 'rgba(231, 76, 60, 0.2)',
                tension: 0.4,
                fill: true
              },
              {
                label: 'Spear Phishing Success Rate',
                data: [35, 32, 28, 25, 20, 15],
                borderColor: '#f39c12',
                backgroundColor: 'rgba(243, 156, 18, 0.2)',
                tension: 0.4,
                fill: true
              },
              {
                label: 'Pretexting Success Rate',
                data: [45, 42, 38, 35, 30, 25],
                borderColor: '#9b59b6',
                backgroundColor: 'rgba(155, 89, 182, 0.2)',
                tension: 0.4,
                fill: true
              },
              {
                label: 'Baiting Success Rate',
                data: [20, 18, 15, 12, 10, 7],
                borderColor: '#3498db',
                backgroundColor: 'rgba(52, 152, 219, 0.2)',
                tension: 0.4,
                fill: true
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              title: {
                display: true,
                text: 'Attack Success Rate Trends (6 Weeks)'
              },
              legend: {
                position: 'top'
              },
              tooltip: {
                callbacks: {
                  label: function(context) {
                    return `${context.dataset.label}: ${context.parsed.y}%`
                  }
                }
              }
            },
            scales: {
              y: {
                beginAtZero: true,
                max: 50,
                title: {
                  display: true,
                  text: 'Success Rate (%)'
                }
              },
              x: {
                title: {
                  display: true,
                  text: 'Time Period'
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
          type: 'pie',
          data: {
            labels: ['Phishing', 'Spear Phishing', 'Pretexting', 'Baiting', 'Custom'],
            datasets: [{
              data: [156, 89, 67, 134, 23],
              backgroundColor: [
                '#e74c3c',
                '#f39c12',
                '#9b59b6',
                '#3498db',
                '#27ae60'
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
                text: 'Attack Type Distribution'
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
                    return `${label}: ${value} attacks (${percentage}%)`
                  }
                }
              }
            }
          }
        })
      }
    },

    updateChartType() {
      if (this.trendsChart) {
        this.trendsChart.destroy()
      }
      this.initializeTrendsChart()
    }
  },
  mounted() {
    this.initializeCharts()
  }
}
</script>

<style lang="scss" scoped>
.analytics-dashboard {
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
  
  .analytics-filters {
    display: flex;
    align-items: end;
    gap: 1rem;
    margin-bottom: 2rem;
    padding: 1.5rem;
    background: white;
    border-radius: 0.5rem;
    box-shadow: var(--shadow);
    
    .filter-group {
      flex: 1;
      
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
    
    .filter-actions {
      display: flex;
      gap: 0.5rem;
    }
  }
  
  .analytics-overview {
    margin-bottom: 2rem;
    
    .overview-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
      
      .overview-card {
        background: white;
        padding: 1.5rem;
        border-radius: 0.5rem;
        box-shadow: var(--shadow);
        display: flex;
        align-items: center;
        
        .card-icon {
          width: 4rem;
          height: 4rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          color: white;
          margin-right: 1rem;
        }
        
        .card-content {
          flex: 1;
          
          .card-value {
            font-size: 2rem;
            font-weight: bold;
            color: var(--primary-color);
            margin-bottom: 0.25rem;
          }
          
          .card-label {
            color: #666;
            font-size: 0.9rem;
            margin-bottom: 0.25rem;
          }
          
          .card-change {
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
    
    .chart-controls,
    .table-controls {
      display: flex;
      gap: 0.5rem;
      
      .form-control {
        width: auto;
      }
    }
  }
  
  .chart-container {
    height: 300px;
    padding: 1rem;
    background: white;
    border-radius: 0.25rem;

    canvas {
      max-width: 100%;
      max-height: 100%;
    }
  }
  
  .department-stats {
    .department-item {
      padding: 1rem;
      border-bottom: 1px solid var(--border-color);
      
      &:last-child {
        border-bottom: none;
      }
      
      .department-info {
        margin-bottom: 1rem;
        
        .department-name {
          font-weight: 600;
          color: var(--primary-color);
          margin-bottom: 0.25rem;
        }
        
        .department-metrics {
          display: flex;
          gap: 1rem;
          
          .metric {
            font-size: 0.9rem;
            color: #666;
          }
        }
      }
      
      .department-scores {
        .score-item {
          display: flex;
          align-items: center;
          margin-bottom: 0.5rem;
          
          .score-label {
            width: 100px;
            font-size: 0.9rem;
            color: #666;
          }
          
          .score-bar {
            flex: 1;
            height: 8px;
            background: var(--light-color);
            border-radius: 4px;
            margin: 0 1rem;
            overflow: hidden;
            
            .score-fill {
              height: 100%;
              transition: width 0.3s ease;
            }
          }
          
          .score-value {
            width: 50px;
            text-align: right;
            font-weight: 600;
            color: var(--primary-color);
          }
        }
      }
    }
  }
  
  .vulnerabilities-list {
    .vulnerability-item {
      display: flex;
      align-items: center;
      padding: 1rem;
      border-bottom: 1px solid var(--border-color);
      
      &:last-child {
        border-bottom: none;
      }
      
      .vulnerability-rank {
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        background: var(--secondary-color);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        margin-right: 1rem;
      }
      
      .vulnerability-info {
        flex: 1;
        
        .vulnerability-name {
          font-weight: 600;
          color: var(--primary-color);
          margin-bottom: 0.25rem;
        }
        
        .vulnerability-description {
          font-size: 0.9rem;
          color: #666;
        }
      }
      
      .vulnerability-stats {
        display: flex;
        gap: 1rem;
        
        .stat-item {
          text-align: center;
          
          .stat-value {
            font-size: 1.25rem;
            font-weight: bold;
            color: var(--primary-color);
          }
          
          .stat-label {
            font-size: 0.8rem;
            color: #666;
          }
        }
      }
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
        padding: 0.25rem 0.75rem;
        border-radius: 1rem;
        font-size: 0.8rem;
        font-weight: bold;
        color: white;
        
        &.phishing {
          background: #3498db;
        }
        
        &.spear-phishing {
          background: #e74c3c;
        }
        
        &.pretexting {
          background: #9b59b6;
        }
        
        &.baiting {
          background: #f39c12;
        }
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
      
      .btn-sm {
        padding: 0.25rem 0.75rem;
        font-size: 0.8rem;
        margin-right: 0.25rem;
      }
    }
  }
}

@media (max-width: 768px) {
  .analytics-dashboard {
    .analytics-filters {
      flex-direction: column;
      align-items: stretch;
      
      .filter-actions {
        justify-content: center;
      }
    }
    
    .chart-controls,
    .table-controls {
      flex-direction: column;
      align-items: stretch;
    }
    
    .results-table {
      font-size: 0.9rem;
      
      th, td {
        padding: 0.5rem;
      }
    }
  }
}
</style>
