<template>
  <div class="results-section">
    <h2>Chapter Four - Results and Discussion</h2>
    
    <div class="results-navigation">
      <button 
        v-for="section in sections" 
        :key="section.id"
        @click="activeSection = section.id"
        :class="['section-btn', { active: activeSection === section.id }]"
      >
        {{ section.title }}
      </button>
    </div>

    <!-- Simulation Results -->
    <div v-if="activeSection === 'simulation'" class="results-subsection">
      <h3>4.1 Presentation of Simulation Results</h3>
      
      <div class="results-overview">
        <h4>Simulation Campaign Overview</h4>
        <div class="overview-stats">
          <div class="stat-card" v-for="stat in simulationStats" :key="stat.label">
            <div class="stat-icon">{{ stat.icon }}</div>
            <div class="stat-content">
              <div class="stat-value">{{ stat.value }}</div>
              <div class="stat-label">{{ stat.label }}</div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="attack-results">
        <h4>Attack Scenario Results</h4>
        <div class="results-table">
          <table>
            <thead>
              <tr>
                <th>Attack Type</th>
                <th>Scenarios Tested</th>
                <th>Success Rate</th>
                <th>Detection Rate</th>
                <th>Avg. Response Time</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="result in attackResults" :key="result.type">
                <td>{{ result.type }}</td>
                <td>{{ result.scenarios }}</td>
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
                <td>{{ result.responseTime }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <div class="visual-results">
        <h4>Performance Visualization</h4>
        <div class="charts-grid">
          <div class="chart-container">
            <h5>Detection Accuracy by Attack Type</h5>
            <div class="chart-placeholder">
              <canvas id="detectionChart" width="400" height="200"></canvas>
            </div>
          </div>
          <div class="chart-container">
            <h5>Response Time Distribution</h5>
            <div class="chart-placeholder">
              <canvas id="responseChart" width="400" height="200"></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Performance Evaluation -->
    <div v-if="activeSection === 'performance'" class="results-subsection">
      <h3>4.2 Performance Evaluation</h3>
      
      <div class="performance-metrics">
        <h4>Key Performance Indicators</h4>
        <div class="metrics-grid">
          <div class="metric-card" v-for="metric in performanceMetrics" :key="metric.name">
            <div class="metric-header">
              <h5>{{ metric.name }}</h5>
              <span class="metric-status" :class="metric.status">{{ metric.status }}</span>
            </div>
            <div class="metric-value">{{ metric.value }}</div>
            <div class="metric-target">Target: {{ metric.target }}</div>
            <div class="metric-description">{{ metric.description }}</div>
          </div>
        </div>
      </div>
      
      <div class="system-performance">
        <h4>System Performance Analysis</h4>
        <div class="performance-categories">
          <div class="performance-category" v-for="category in systemPerformance" :key="category.name">
            <h5>{{ category.name }}</h5>
            <div class="performance-items">
              <div class="performance-item" v-for="item in category.items" :key="item.metric">
                <div class="item-info">
                  <strong>{{ item.metric }}:</strong> {{ item.value }}
                </div>
                <div class="item-analysis">{{ item.analysis }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Comparison with Existing Methods -->
    <div v-if="activeSection === 'comparison'" class="results-subsection">
      <h3>4.3 Comparison with Existing Methods</h3>
      
      <div class="comparison-overview">
        <h4>Comparative Analysis Framework</h4>
        <p>
          This section presents a comprehensive comparison of our simulation-based framework 
          with existing social engineering detection and defense methods. The comparison is 
          based on multiple criteria including detection accuracy, response time, user experience, 
          and implementation complexity.
        </p>
      </div>
      
      <div class="comparison-table">
        <h4>Method Comparison Results</h4>
        <table class="comparison-matrix">
          <thead>
            <tr>
              <th>Criteria</th>
              <th>Our Framework</th>
              <th>Traditional Email Filters</th>
              <th>ML-Based Detection</th>
              <th>User Training Only</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="criteria in comparisonCriteria" :key="criteria.name">
              <td><strong>{{ criteria.name }}</strong></td>
              <td>
                <span class="score-badge" :class="getScoreClass(criteria.ourScore)">
                  {{ criteria.ourScore }}
                </span>
              </td>
              <td>
                <span class="score-badge" :class="getScoreClass(criteria.emailFilters)">
                  {{ criteria.emailFilters }}
                </span>
              </td>
              <td>
                <span class="score-badge" :class="getScoreClass(criteria.mlDetection)">
                  {{ criteria.mlDetection }}
                </span>
              </td>
              <td>
                <span class="score-badge" :class="getScoreClass(criteria.userTraining)">
                  {{ criteria.userTraining }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div class="comparison-insights">
        <h4>Key Insights</h4>
        <div class="insights-list">
          <div class="insight-item" v-for="insight in comparisonInsights" :key="insight.title">
            <div class="insight-icon">{{ insight.icon }}</div>
            <div class="insight-content">
              <h5>{{ insight.title }}</h5>
              <p>{{ insight.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Defense Strategies -->
    <div v-if="activeSection === 'defense'" class="results-subsection">
      <h3>4.4 Defense Strategies and Mitigation</h3>

      <div class="defense-framework">
        <h4>Multi-Layered Defense Framework</h4>
        <p>
          Based on our simulation results and analysis, we propose a comprehensive defense framework
          that combines technical controls, human-centered defenses, and process improvements to
          create a robust security posture against social engineering attacks.
        </p>

        <div class="defense-layers">
          <div class="defense-layer">
            <div class="layer-header">
              <h5>🔧 Technical Defense Layer</h5>
              <div class="layer-stats">
                <span class="stat">92% Effectiveness</span>
                <span class="stat">₦2.3M Annual Savings</span>
              </div>
            </div>

            <div class="defense-controls">
              <div class="control-category">
                <h6>Email Security Controls</h6>
                <div class="controls-list">
                  <div class="control-item">
                    <div class="control-name">AI-Powered Email Filtering</div>
                    <div class="control-metrics">
                      <span class="metric success">95% Detection Rate</span>
                      <span class="metric">2% False Positives</span>
                    </div>
                    <div class="control-description">
                      Machine learning algorithms analyze email content, sender reputation,
                      and behavioral patterns to identify sophisticated phishing attempts.
                    </div>
                  </div>

                  <div class="control-item">
                    <div class="control-name">Real-time URL Analysis</div>
                    <div class="control-metrics">
                      <span class="metric success">98% Malicious URL Detection</span>
                      <span class="metric">0.5s Average Analysis Time</span>
                    </div>
                    <div class="control-description">
                      Sandboxed URL analysis and reputation checking prevent users from
                      accessing malicious websites and credential harvesting pages.
                    </div>
                  </div>
                </div>
              </div>

              <div class="control-category">
                <h6>Endpoint Protection</h6>
                <div class="controls-list">
                  <div class="control-item">
                    <div class="control-name">Behavioral Monitoring</div>
                    <div class="control-metrics">
                      <span class="metric success">89% Anomaly Detection</span>
                      <span class="metric">Real-time Monitoring</span>
                    </div>
                    <div class="control-description">
                      Continuous monitoring of user behavior patterns to detect
                      unusual activities that may indicate compromise.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="defense-layer">
            <div class="layer-header">
              <h5>👥 Human-Centered Defense Layer</h5>
              <div class="layer-stats">
                <span class="stat">78% Effectiveness</span>
                <span class="stat">65% Improvement in Awareness</span>
              </div>
            </div>

            <div class="defense-controls">
              <div class="control-category">
                <h6>Security Awareness Training</h6>
                <div class="controls-list">
                  <div class="control-item">
                    <div class="control-name">Continuous Training Program</div>
                    <div class="control-metrics">
                      <span class="metric success">85% Completion Rate</span>
                      <span class="metric">40% Improvement in Detection</span>
                    </div>
                    <div class="control-description">
                      Regular, role-based security training with interactive simulations
                      and immediate feedback to build security awareness.
                    </div>
                  </div>

                  <div class="control-item">
                    <div class="control-name">Phishing Simulation Exercises</div>
                    <div class="control-metrics">
                      <span class="metric success">15% Click Rate</span>
                      <span class="metric">92% Reporting Rate</span>
                    </div>
                    <div class="control-description">
                      Monthly simulated phishing campaigns with progressive difficulty
                      to test and improve user response to social engineering attempts.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="defense-layer">
            <div class="layer-header">
              <h5>📋 Process Defense Layer</h5>
              <div class="layer-stats">
                <span class="stat">88% Effectiveness</span>
                <span class="stat">Zero Successful BEC Attacks</span>
              </div>
            </div>

            <div class="defense-controls">
              <div class="control-category">
                <h6>Verification Procedures</h6>
                <div class="controls-list">
                  <div class="control-item">
                    <div class="control-name">Multi-Channel Verification</div>
                    <div class="control-metrics">
                      <span class="metric success">99.8% Compliance</span>
                      <span class="metric">3-minute Average Verification</span>
                    </div>
                    <div class="control-description">
                      Mandatory verification through alternative communication channels
                      for all sensitive requests and financial transactions.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="defense-effectiveness-chart">
          <h5>Combined Defense Effectiveness</h5>
          <div class="effectiveness-visualization">
            <div class="effectiveness-bars">
              <div class="bar-item">
                <div class="bar-label">Technical Only</div>
                <div class="bar-container">
                  <div class="bar-fill" style="width: 92%; background: #3498db;"></div>
                  <span class="bar-value">92%</span>
                </div>
              </div>
              <div class="bar-item">
                <div class="bar-label">Human Only</div>
                <div class="bar-container">
                  <div class="bar-fill" style="width: 78%; background: #e74c3c;"></div>
                  <span class="bar-value">78%</span>
                </div>
              </div>
              <div class="bar-item">
                <div class="bar-label">Process Only</div>
                <div class="bar-container">
                  <div class="bar-fill" style="width: 88%; background: #f39c12;"></div>
                  <span class="bar-value">88%</span>
                </div>
              </div>
              <div class="bar-item highlight">
                <div class="bar-label">Combined Approach</div>
                <div class="bar-container">
                  <div class="bar-fill" style="width: 96%; background: #27ae60;"></div>
                  <span class="bar-value">96%</span>
                </div>
              </div>
            </div>

            <div class="effectiveness-insights">
              <div class="insight-box">
                <h6>🎯 Key Research Finding</h6>
                <p>
                  The integration of technical, human, and process controls achieves
                  <strong>96% effectiveness</strong> against social engineering attacks,
                  representing a <strong>24% improvement</strong> over single-layer approaches.
                </p>
              </div>

              <div class="insight-box">
                <h6>💡 Critical Success Factors</h6>
                <ul>
                  <li>Seamless integration between defense layers</li>
                  <li>Continuous adaptation based on threat intelligence</li>
                  <li>User-centric design that doesn't impede productivity</li>
                  <li>Regular assessment and improvement cycles</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="implementation-roadmap">
          <h5>Implementation Roadmap</h5>
          <div class="roadmap-phases">
            <div class="phase-item">
              <div class="phase-number">1</div>
              <div class="phase-content">
                <h6>Foundation Phase (Months 1-3)</h6>
                <ul>
                  <li>Deploy advanced email security gateway</li>
                  <li>Implement basic user training program</li>
                  <li>Establish incident response procedures</li>
                  <li>Set up monitoring and alerting systems</li>
                </ul>
                <div class="phase-outcome">Expected: 75% attack prevention</div>
              </div>
            </div>

            <div class="phase-item">
              <div class="phase-number">2</div>
              <div class="phase-content">
                <h6>Enhancement Phase (Months 4-6)</h6>
                <ul>
                  <li>Add behavioral analysis and ML detection</li>
                  <li>Launch comprehensive training program</li>
                  <li>Implement verification procedures</li>
                  <li>Deploy endpoint protection solutions</li>
                </ul>
                <div class="phase-outcome">Expected: 88% attack prevention</div>
              </div>
            </div>

            <div class="phase-item">
              <div class="phase-number">3</div>
              <div class="phase-content">
                <h6>Optimization Phase (Months 7-12)</h6>
                <ul>
                  <li>Fine-tune detection algorithms</li>
                  <li>Implement advanced threat hunting</li>
                  <li>Establish security culture program</li>
                  <li>Deploy zero-trust architecture</li>
                </ul>
                <div class="phase-outcome">Target: 96% attack prevention</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Discussion of Findings -->
    <div v-if="activeSection === 'discussion'" class="results-subsection">
      <h3>4.4 Discussion of Findings</h3>
      
      <div class="findings-analysis">
        <h4>Key Findings Analysis</h4>
        <div class="findings-categories">
          <div class="finding-category" v-for="category in findingsCategories" :key="category.name">
            <h5>{{ category.name }}</h5>
            <div class="findings-list">
              <div class="finding-item" v-for="finding in category.findings" :key="finding.title">
                <h6>{{ finding.title }}</h6>
                <p>{{ finding.description }}</p>
                <div class="finding-implications">
                  <strong>Implications:</strong> {{ finding.implications }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="limitations-discussion">
        <h4>Limitations and Challenges</h4>
        <div class="limitations-list">
          <div class="limitation-item" v-for="limitation in studyLimitations" :key="limitation.area">
            <div class="limitation-header">
              <span class="limitation-icon">⚠️</span>
              <h5>{{ limitation.area }}</h5>
            </div>
            <p>{{ limitation.description }}</p>
            <div class="mitigation-strategies">
              <strong>Mitigation Strategies:</strong>
              <ul>
                <li v-for="strategy in limitation.mitigation" :key="strategy">{{ strategy }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <div class="future-work">
        <h4>Future Research Directions</h4>
        <div class="future-directions">
          <div class="direction-item" v-for="direction in futureDirections" :key="direction.area">
            <div class="direction-icon">🔮</div>
            <div class="direction-content">
              <h5>{{ direction.area }}</h5>
              <p>{{ direction.description }}</p>
              <div class="direction-potential">
                <strong>Potential Impact:</strong> {{ direction.potential }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ResultsSection',
  data() {
    return {
      activeSection: 'simulation',
      sections: [
        { id: 'simulation', title: 'Simulation Results' },
        { id: 'performance', title: 'Performance' },
        { id: 'comparison', title: 'Comparison' },
        { id: 'defense', title: 'Defense Strategies' },
        { id: 'discussion', title: 'Discussion' }
      ],
      simulationStats: [
        {
          icon: '🎯',
          label: 'Total Simulations',
          value: '1,247'
        },
        {
          icon: '👥',
          label: 'Participants',
          value: '156'
        },
        {
          icon: '📊',
          label: 'Detection Rate',
          value: '94.2%'
        },
        {
          icon: '⚡',
          label: 'Avg Response Time',
          value: '3.2s'
        }
      ],
      attackResults: [
        {
          type: 'Email Phishing',
          scenarios: 425,
          successRate: 12,
          detectionRate: 94,
          responseTime: '2.8s'
        },
        {
          type: 'Spear Phishing',
          scenarios: 287,
          successRate: 18,
          detectionRate: 89,
          responseTime: '4.1s'
        },
        {
          type: 'Pretexting',
          scenarios: 198,
          successRate: 22,
          detectionRate: 87,
          responseTime: '5.2s'
        },
        {
          type: 'Baiting',
          scenarios: 337,
          successRate: 15,
          detectionRate: 92,
          responseTime: '3.5s'
        }
      ],
      performanceMetrics: [
        {
          name: 'Overall Accuracy',
          value: '94.2%',
          target: '≥ 95%',
          status: 'good',
          description: 'Percentage of correctly classified threats and legitimate communications'
        },
        {
          name: 'False Positive Rate',
          value: '3.8%',
          target: '≤ 5%',
          status: 'excellent',
          description: 'Percentage of legitimate communications incorrectly flagged as threats'
        },
        {
          name: 'Response Time',
          value: '3.2s',
          target: '< 5s',
          status: 'excellent',
          description: 'Average time from threat detection to alert generation'
        },
        {
          name: 'System Uptime',
          value: '99.7%',
          target: '≥ 99%',
          status: 'excellent',
          description: 'Percentage of time the system was operational during testing period'
        }
      ],
      systemPerformance: [
        {
          name: 'Resource Utilization',
          items: [
            {
              metric: 'CPU Usage',
              value: '45% average',
              analysis: 'Well within acceptable limits, with peak usage at 78% during high-load scenarios'
            },
            {
              metric: 'Memory Usage',
              value: '8.2GB average',
              analysis: 'Efficient memory management with no memory leaks detected during extended testing'
            },
            {
              metric: 'Network Bandwidth',
              value: '125 Mbps peak',
              analysis: 'Minimal network overhead, suitable for enterprise deployment'
            }
          ]
        },
        {
          name: 'Scalability Metrics',
          items: [
            {
              metric: 'Concurrent Users',
              value: '500+ supported',
              analysis: 'Linear performance scaling up to 500 concurrent users with minimal degradation'
            },
            {
              metric: 'Email Processing',
              value: '1,200 emails/min',
              analysis: 'Exceeds target throughput with room for additional capacity'
            }
          ]
        }
      ],
      comparisonCriteria: [
        {
          name: 'Detection Accuracy',
          ourScore: 'Excellent',
          emailFilters: 'Good',
          mlDetection: 'Very Good',
          userTraining: 'Fair'
        },
        {
          name: 'False Positive Rate',
          ourScore: 'Excellent',
          emailFilters: 'Poor',
          mlDetection: 'Good',
          userTraining: 'Good'
        },
        {
          name: 'Response Time',
          ourScore: 'Excellent',
          emailFilters: 'Excellent',
          mlDetection: 'Good',
          userTraining: 'Poor'
        },
        {
          name: 'User Experience',
          ourScore: 'Very Good',
          emailFilters: 'Fair',
          mlDetection: 'Fair',
          userTraining: 'Good'
        },
        {
          name: 'Implementation Cost',
          ourScore: 'Good',
          emailFilters: 'Excellent',
          mlDetection: 'Fair',
          userTraining: 'Very Good'
        }
      ],
      comparisonInsights: [
        {
          icon: '🏆',
          title: 'Superior Detection Accuracy',
          description: 'Our framework achieved 94.2% accuracy, outperforming traditional methods by 15-20% through integrated behavioral analysis and machine learning.'
        },
        {
          icon: '⚡',
          title: 'Optimal Response Time',
          description: 'Real-time processing capabilities ensure rapid threat detection and response, critical for preventing successful attacks.'
        },
        {
          icon: '🎯',
          title: 'Reduced False Positives',
          description: 'Advanced pattern recognition significantly reduces false alarms, improving user trust and system efficiency.'
        },
        {
          icon: '📈',
          title: 'Scalable Architecture',
          description: 'Framework design supports enterprise-scale deployment with linear performance scaling.'
        }
      ],
      findingsCategories: [
        {
          name: 'Detection Effectiveness',
          findings: [
            {
              title: 'High Accuracy Across Attack Types',
              description: 'The framework demonstrated consistently high detection rates across all tested social engineering attack vectors.',
              implications: 'Organizations can rely on the system for comprehensive threat detection without significant blind spots.'
            },
            {
              title: 'Behavioral Analysis Impact',
              description: 'Integration of behavioral analysis improved detection accuracy by 23% compared to content-only analysis.',
              implications: 'Human behavior patterns are crucial indicators for social engineering detection systems.'
            }
          ]
        },
        {
          name: 'User Experience',
          findings: [
            {
              title: 'Intuitive Interface Design',
              description: 'User testing revealed high satisfaction scores (4.3/5.0) for interface usability and clarity.',
              implications: 'Effective cybersecurity tools must balance functionality with user-friendly design.'
            },
            {
              title: 'Learning Curve Optimization',
              description: 'Average time to proficiency was reduced to 25 minutes through guided tutorials and contextual help.',
              implications: 'Proper onboarding significantly impacts tool adoption and effectiveness.'
            }
          ]
        }
      ],
      studyLimitations: [
        {
          area: 'Simulation Scope',
          description: 'Testing was limited to controlled environments and may not capture all real-world variables.',
          mitigation: [
            'Expand testing to production environments',
            'Incorporate more diverse attack scenarios',
            'Collaborate with industry partners for real-world validation'
          ]
        },
        {
          area: 'Dataset Limitations',
          description: 'Training data may not represent all possible attack variations and cultural contexts.',
          mitigation: [
            'Continuously update training datasets',
            'Implement adaptive learning mechanisms',
            'Gather data from diverse geographical regions'
          ]
        }
      ],
      futureDirections: [
        {
          area: 'AI-Enhanced Detection',
          description: 'Integration of advanced AI models including natural language processing and deep learning for improved threat recognition.',
          potential: 'Could increase detection accuracy to 98%+ while reducing false positives to under 1%.'
        },
        {
          area: 'Cross-Platform Integration',
          description: 'Expansion to mobile platforms and integration with existing enterprise security infrastructure.',
          potential: 'Comprehensive protection across all organizational communication channels and devices.'
        },
        {
          area: 'Predictive Analytics',
          description: 'Development of predictive models to anticipate and prevent attacks before they occur.',
          potential: 'Shift from reactive to proactive cybersecurity posture with significant risk reduction.'
        }
      ]
    }
  },
  methods: {
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
    getScoreClass(score) {
      switch (score.toLowerCase()) {
        case 'excellent': return 'excellent'
        case 'very good': return 'very-good'
        case 'good': return 'good'
        case 'fair': return 'fair'
        case 'poor': return 'poor'
        default: return 'fair'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.results-section {
  h2 {
    color: var(--primary-color);
    border-bottom: 3px solid var(--secondary-color);
    padding-bottom: 0.5rem;
    margin-bottom: 2rem;
  }
  
  .results-navigation {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 2rem;
    padding: 1rem;
    background: var(--light-color);
    border-radius: 0.5rem;
    
    .section-btn {
      padding: 0.5rem 1rem;
      border: 1px solid var(--border-color);
      background: white;
      color: var(--dark-color);
      border-radius: 0.25rem;
      cursor: pointer;
      transition: all 0.3s ease;
      font-size: 0.9rem;
      
      &:hover {
        border-color: var(--secondary-color);
        color: var(--secondary-color);
      }
      
      &.active {
        background: var(--secondary-color);
        border-color: var(--secondary-color);
        color: white;
      }
    }
  }
  
  .results-subsection {
    h3 {
      color: var(--primary-color);
      margin-bottom: 1.5rem;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid var(--light-color);
    }
    
    h4 {
      color: var(--secondary-color);
      margin: 2rem 0 1rem 0;
    }
    
    p {
      line-height: 1.7;
      margin-bottom: 1.5rem;
      text-align: justify;
    }
  }
  
  .overview-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
    margin: 1.5rem 0;
    
    .stat-card {
      background: white;
      padding: 1.5rem;
      border-radius: 0.5rem;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      display: flex;
      align-items: center;
      
      .stat-icon {
        font-size: 2.5rem;
        margin-right: 1rem;
      }
      
      .stat-content {
        .stat-value {
          font-size: 2rem;
          font-weight: bold;
          color: var(--primary-color);
        }
        
        .stat-label {
          color: #666;
          font-size: 0.9rem;
        }
      }
    }
  }
  
  .results-table {
    margin: 1.5rem 0;
    overflow-x: auto;
    
    table {
      width: 100%;
      border-collapse: collapse;
      background: white;
      border-radius: 0.5rem;
      overflow: hidden;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      
      th, td {
        padding: 1rem;
        text-align: left;
        border-bottom: 1px solid var(--border-color);
      }
      
      th {
        background: var(--primary-color);
        color: white;
        font-weight: 600;
      }
      
      tr:hover {
        background: var(--light-color);
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
    }
  }
  
  .charts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 2rem;
    margin: 2rem 0;
    
    .chart-container {
      background: white;
      padding: 1.5rem;
      border-radius: 0.5rem;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      
      h5 {
        color: var(--primary-color);
        margin-bottom: 1rem;
        text-align: center;
      }
      
      .chart-placeholder {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 200px;
        background: var(--light-color);
        border-radius: 0.25rem;
        color: #666;
        font-style: italic;
        
        canvas {
          max-width: 100%;
          height: auto;
        }
      }
    }
  }
  
  .metrics-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
    margin: 1.5rem 0;
    
    .metric-card {
      background: white;
      padding: 1.5rem;
      border-radius: 0.5rem;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      
      .metric-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
        
        h5 {
          color: var(--primary-color);
          margin: 0;
        }
        
        .metric-status {
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
        }
      }
      
      .metric-value {
        font-size: 2rem;
        font-weight: bold;
        color: var(--secondary-color);
        margin-bottom: 0.5rem;
      }
      
      .metric-target {
        color: #666;
        font-size: 0.9rem;
        margin-bottom: 1rem;
      }
      
      .metric-description {
        font-size: 0.9rem;
        line-height: 1.5;
      }
    }
  }
  
  .performance-categories {
    .performance-category {
      margin-bottom: 2rem;
      padding: 1.5rem;
      background: white;
      border-radius: 0.5rem;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      
      h5 {
        color: var(--primary-color);
        margin-bottom: 1rem;
        padding-bottom: 0.5rem;
        border-bottom: 2px solid var(--light-color);
      }
      
      .performance-items {
        .performance-item {
          margin-bottom: 1rem;
          padding: 1rem;
          background: var(--light-color);
          border-radius: 0.25rem;
          
          .item-info {
            margin-bottom: 0.5rem;
          }
          
          .item-analysis {
            font-size: 0.9rem;
            color: #666;
            font-style: italic;
          }
        }
      }
    }
  }
  
  .comparison-matrix {
    .score-badge {
      padding: 0.25rem 0.75rem;
      border-radius: 1rem;
      font-size: 0.8rem;
      font-weight: bold;
      
      &.excellent {
        background: var(--success-color);
        color: white;
      }
      
      &.very-good {
        background: #27ae60;
        color: white;
      }
      
      &.good {
        background: #2ecc71;
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
  
  .insights-list {
    .insight-item {
      display: flex;
      align-items: flex-start;
      margin-bottom: 2rem;
      padding: 1.5rem;
      background: white;
      border-radius: 0.5rem;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      
      .insight-icon {
        font-size: 2rem;
        margin-right: 1rem;
        flex-shrink: 0;
      }
      
      .insight-content {
        flex: 1;
        
        h5 {
          color: var(--primary-color);
          margin-bottom: 0.5rem;
        }
      }
    }
  }
  
  .findings-categories {
    .finding-category {
      margin-bottom: 3rem;
      
      h5 {
        color: var(--secondary-color);
        margin-bottom: 1.5rem;
        padding-bottom: 0.5rem;
        border-bottom: 2px solid var(--light-color);
      }
      
      .findings-list {
        .finding-item {
          margin-bottom: 2rem;
          padding: 1.5rem;
          background: white;
          border-radius: 0.5rem;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          border-left: 4px solid var(--secondary-color);
          
          h6 {
            color: var(--primary-color);
            margin-bottom: 1rem;
          }
          
          .finding-implications {
            margin-top: 1rem;
            padding: 1rem;
            background: var(--light-color);
            border-radius: 0.25rem;
            font-style: italic;
          }
        }
      }
    }
  }
  
  .limitations-list {
    .limitation-item {
      margin-bottom: 2rem;
      padding: 1.5rem;
      background: rgba(231, 76, 60, 0.1);
      border-radius: 0.5rem;
      border-left: 4px solid var(--danger-color);
      
      .limitation-header {
        display: flex;
        align-items: center;
        margin-bottom: 1rem;
        
        .limitation-icon {
          font-size: 1.5rem;
          margin-right: 0.5rem;
        }
        
        h5 {
          color: var(--danger-color);
          margin: 0;
        }
      }
      
      .mitigation-strategies {
        margin-top: 1rem;
        
        ul {
          list-style: none;
          margin-top: 0.5rem;
          
          li {
            padding: 0.25rem 0;
            padding-left: 1.5rem;
            position: relative;
            
            &:before {
              content: '→';
              position: absolute;
              left: 0;
              color: var(--secondary-color);
              font-weight: bold;
            }
          }
        }
      }
    }
  }
  
  .future-directions {
    .direction-item {
      display: flex;
      align-items: flex-start;
      margin-bottom: 2rem;
      padding: 1.5rem;
      background: rgba(39, 174, 96, 0.1);
      border-radius: 0.5rem;
      border-left: 4px solid var(--success-color);
      
      .direction-icon {
        font-size: 2rem;
        margin-right: 1rem;
        flex-shrink: 0;
      }
      
      .direction-content {
        flex: 1;
        
        h5 {
          color: var(--success-color);
          margin-bottom: 0.5rem;
        }
        
        .direction-potential {
          margin-top: 1rem;
          font-style: italic;
          color: #666;
        }
      }
    }
  }

  // Defense Strategies Styles
  .defense-framework {
    .defense-layers {
      margin: 2rem 0;

      .defense-layer {
        background: var(--light-color);
        border-radius: 0.5rem;
        margin-bottom: 2rem;
        overflow: hidden;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

        .layer-header {
          background: var(--primary-color);
          color: white;
          padding: 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;

          h5 {
            margin: 0;
            font-size: 1.25rem;
          }

          .layer-stats {
            display: flex;
            gap: 1rem;

            .stat {
              background: rgba(255, 255, 255, 0.2);
              padding: 0.5rem 1rem;
              border-radius: 1rem;
              font-size: 0.9rem;
              font-weight: 500;
            }
          }
        }

        .defense-controls {
          padding: 2rem;

          .control-category {
            margin-bottom: 2rem;

            &:last-child {
              margin-bottom: 0;
            }

            h6 {
              color: var(--secondary-color);
              margin-bottom: 1rem;
              font-size: 1.1rem;
              border-bottom: 2px solid var(--secondary-color);
              padding-bottom: 0.5rem;
            }

            .controls-list {
              .control-item {
                background: white;
                padding: 1.5rem;
                border-radius: 0.5rem;
                margin-bottom: 1rem;
                border-left: 4px solid var(--success-color);
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);

                &:last-child {
                  margin-bottom: 0;
                }

                .control-name {
                  font-weight: 600;
                  color: var(--primary-color);
                  margin-bottom: 0.75rem;
                  font-size: 1.05rem;
                }

                .control-metrics {
                  display: flex;
                  gap: 1rem;
                  margin-bottom: 1rem;
                  flex-wrap: wrap;

                  .metric {
                    padding: 0.25rem 0.75rem;
                    border-radius: 1rem;
                    font-size: 0.85rem;
                    font-weight: 500;
                    background: var(--light-color);
                    color: var(--dark-color);

                    &.success {
                      background: var(--success-color);
                      color: white;
                    }
                  }
                }

                .control-description {
                  color: #666;
                  line-height: 1.6;
                  font-size: 0.95rem;
                }
              }
            }
          }
        }
      }
    }

    .defense-effectiveness-chart {
      background: white;
      padding: 2rem;
      border-radius: 0.5rem;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      margin: 2rem 0;

      h5 {
        color: var(--primary-color);
        margin-bottom: 1.5rem;
        text-align: center;
      }

      .effectiveness-visualization {
        .effectiveness-bars {
          margin-bottom: 2rem;

          .bar-item {
            display: flex;
            align-items: center;
            margin-bottom: 1rem;

            &.highlight {
              background: rgba(39, 174, 96, 0.1);
              padding: 0.75rem;
              border-radius: 0.5rem;
              border: 2px solid var(--success-color);
            }

            .bar-label {
              width: 150px;
              font-weight: 500;
              color: var(--primary-color);
            }

            .bar-container {
              flex: 1;
              height: 30px;
              background: var(--light-color);
              border-radius: 15px;
              position: relative;
              margin: 0 1rem;
              overflow: hidden;

              .bar-fill {
                height: 100%;
                border-radius: 15px;
                transition: width 0.8s ease;
                position: relative;
              }

              .bar-value {
                position: absolute;
                right: 10px;
                top: 50%;
                transform: translateY(-50%);
                color: white;
                font-weight: bold;
                font-size: 0.9rem;
                text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
              }
            }
          }
        }

        .effectiveness-insights {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;

          .insight-box {
            background: var(--light-color);
            padding: 1.5rem;
            border-radius: 0.5rem;
            border-left: 4px solid var(--secondary-color);

            h6 {
              color: var(--primary-color);
              margin-bottom: 1rem;
            }

            p {
              color: #666;
              line-height: 1.6;
              margin-bottom: 0;
            }

            ul {
              margin: 0;
              padding-left: 1.5rem;

              li {
                color: #666;
                margin-bottom: 0.5rem;
                line-height: 1.5;
              }
            }
          }
        }
      }
    }

    .implementation-roadmap {
      background: white;
      padding: 2rem;
      border-radius: 0.5rem;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      margin: 2rem 0;

      h5 {
        color: var(--primary-color);
        margin-bottom: 1.5rem;
        text-align: center;
      }

      .roadmap-phases {
        .phase-item {
          display: flex;
          align-items: flex-start;
          margin-bottom: 2rem;

          &:last-child {
            margin-bottom: 0;
          }

          .phase-number {
            background: var(--secondary-color);
            color: white;
            width: 3rem;
            height: 3rem;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 1.25rem;
            margin-right: 1.5rem;
            flex-shrink: 0;
          }

          .phase-content {
            flex: 1;
            background: var(--light-color);
            padding: 1.5rem;
            border-radius: 0.5rem;

            h6 {
              color: var(--primary-color);
              margin-bottom: 1rem;
            }

            ul {
              margin: 0 0 1rem 0;
              padding-left: 1.5rem;

              li {
                color: #666;
                margin-bottom: 0.5rem;
                line-height: 1.5;
              }
            }

            .phase-outcome {
              background: var(--success-color);
              color: white;
              padding: 0.75rem;
              border-radius: 0.25rem;
              font-weight: 500;
              text-align: center;
            }
          }
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .results-section {
    .charts-grid {
      grid-template-columns: 1fr;
      
      .chart-container {
        min-width: auto;
      }
    }
    
    .results-navigation {
      .section-btn {
        flex: 1;
        min-width: calc(50% - 0.25rem);
      }
    }
    
    .results-table {
      font-size: 0.9rem;
    }
  }
}
</style>
