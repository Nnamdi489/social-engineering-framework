<template>
  <div class="methodology-section">
    <h2>Chapter Three - Methodology</h2>
    
    <div class="methodology-navigation">
      <button 
        v-for="section in sections" 
        :key="section.id"
        @click="activeSection = section.id"
        :class="['section-btn', { active: activeSection === section.id }]"
      >
        {{ section.title }}
      </button>
    </div>

    <!-- Research Design -->
    <div v-if="activeSection === 'design'" class="methodology-subsection">
      <h3>3.1 Research Design</h3>
      <p>
        This research employs a simulation-based experimental approach to develop and evaluate a comprehensive 
        framework for detecting and defending against social engineering attacks. The methodology combines 
        quantitative analysis of detection accuracy with qualitative assessment of user behavior patterns.
      </p>
      
      <div class="research-approach">
        <h4>Research Approach Framework</h4>
        <div class="approach-diagram">
          <div class="approach-phase" v-for="phase in researchPhases" :key="phase.id">
            <div class="phase-number">{{ phase.id }}</div>
            <div class="phase-content">
              <h5>{{ phase.title }}</h5>
              <p>{{ phase.description }}</p>
              <div class="phase-deliverables">
                <strong>Deliverables:</strong>
                <ul>
                  <li v-for="deliverable in phase.deliverables" :key="deliverable">{{ deliverable }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- System Architecture -->
    <div v-if="activeSection === 'architecture'" class="methodology-subsection">
      <h3>3.2 System Architecture</h3>
      
      <div class="architecture-overview">
        <h4>Framework Components</h4>
        <div class="architecture-diagram">
          <div class="component-layer" v-for="layer in architectureLayers" :key="layer.name">
            <h5>{{ layer.name }}</h5>
            <div class="components-grid">
              <div class="component-card" v-for="component in layer.components" :key="component.name">
                <div class="component-icon">{{ component.icon }}</div>
                <h6>{{ component.name }}</h6>
                <p>{{ component.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="data-flow">
        <h4>Data Flow Architecture</h4>
        <div class="flow-steps">
          <div class="flow-step" v-for="(step, index) in dataFlowSteps" :key="index">
            <div class="step-number">{{ index + 1 }}</div>
            <div class="step-content">
              <h5>{{ step.title }}</h5>
              <p>{{ step.description }}</p>
            </div>
            <div class="step-arrow" v-if="index < dataFlowSteps.length - 1">→</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Simulation Environment -->
    <div v-if="activeSection === 'environment'" class="methodology-subsection">
      <h3>3.3 Simulation Environment Setup</h3>
      
      <div class="environment-specs">
        <h4>Technical Specifications</h4>
        <div class="specs-grid">
          <div class="spec-category" v-for="category in environmentSpecs" :key="category.name">
            <h5>{{ category.name }}</h5>
            <div class="spec-items">
              <div class="spec-item" v-for="spec in category.specs" :key="spec.name">
                <strong>{{ spec.name }}:</strong> {{ spec.value }}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="simulation-scenarios">
        <h4>Simulation Scenarios</h4>
        <div class="scenarios-list">
          <div class="scenario-card" v-for="scenario in simulationScenarios" :key="scenario.name">
            <div class="scenario-header">
              <h5>{{ scenario.name }}</h5>
              <span class="complexity-badge" :class="scenario.complexity.toLowerCase()">
                {{ scenario.complexity }}
              </span>
            </div>
            <p>{{ scenario.description }}</p>
            <div class="scenario-details">
              <div class="detail-item">
                <strong>Target:</strong> {{ scenario.target }}
              </div>
              <div class="detail-item">
                <strong>Duration:</strong> {{ scenario.duration }}
              </div>
              <div class="detail-item">
                <strong>Metrics:</strong> {{ scenario.metrics.join(', ') }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Detection Mechanisms -->
    <div v-if="activeSection === 'detection'" class="methodology-subsection">
      <h3>3.4 Detection Mechanisms</h3>
      
      <div class="detection-layers">
        <h4>Multi-Layer Detection Approach</h4>
        <div class="detection-pyramid">
          <div class="detection-layer" v-for="layer in detectionLayers" :key="layer.name">
            <div class="layer-info">
              <h5>{{ layer.name }}</h5>
              <p>{{ layer.description }}</p>
            </div>
            <div class="layer-techniques">
              <div class="technique-item" v-for="technique in layer.techniques" :key="technique.name">
                <strong>{{ technique.name }}:</strong> {{ technique.description }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Defense Training Framework -->
    <div v-if="activeSection === 'defense'" class="methodology-subsection">
      <h3>3.5 Defense Training Framework</h3>

      <div class="defense-methodology">
        <h4>Comprehensive Defense Approach</h4>
        <p>
          Our research methodology incorporates a multi-layered defense training framework that addresses
          the human factor in cybersecurity. This approach recognizes that technical controls alone are
          insufficient against sophisticated social engineering attacks.
        </p>

        <div class="defense-components">
          <div class="defense-component">
            <div class="component-header">
              <h5>🧠 Security Awareness Training</h5>
              <span class="component-type">Human-Centered Defense</span>
            </div>
            <div class="component-content">
              <p>
                Systematic training programs designed to improve user recognition and response to
                social engineering attempts. Our methodology includes:
              </p>
              <ul>
                <li><strong>Role-Based Training:</strong> Customized content based on job functions and risk exposure</li>
                <li><strong>Progressive Learning:</strong> Modules that build from basic to advanced concepts</li>
                <li><strong>Interactive Simulations:</strong> Hands-on practice with realistic scenarios</li>
                <li><strong>Continuous Assessment:</strong> Regular testing to measure knowledge retention</li>
              </ul>

              <div class="methodology-metrics">
                <h6>Training Effectiveness Metrics:</h6>
                <div class="metrics-grid">
                  <div class="metric-item">
                    <div class="metric-label">Completion Rate</div>
                    <div class="metric-target">Target: >85%</div>
                  </div>
                  <div class="metric-item">
                    <div class="metric-label">Knowledge Retention</div>
                    <div class="metric-target">Target: >80% after 30 days</div>
                  </div>
                  <div class="metric-item">
                    <div class="metric-label">Behavior Change</div>
                    <div class="metric-target">Target: >40% improvement</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="defense-component">
            <div class="component-header">
              <h5>🛡️ Technical Defense Integration</h5>
              <span class="component-type">Technology-Enhanced</span>
            </div>
            <div class="component-content">
              <p>
                Integration of technical controls with human training to create a comprehensive
                defense ecosystem. Our methodology evaluates:
              </p>
              <ul>
                <li><strong>Email Security Systems:</strong> Advanced filtering with machine learning capabilities</li>
                <li><strong>Endpoint Protection:</strong> Behavioral analysis and anomaly detection</li>
                <li><strong>Network Monitoring:</strong> Real-time threat intelligence and response</li>
                <li><strong>User Interface Design:</strong> Security-conscious UX that promotes safe behavior</li>
              </ul>

              <div class="integration-flow">
                <h6>Defense Integration Workflow:</h6>
                <div class="workflow-steps">
                  <div class="workflow-step">
                    <div class="step-number">1</div>
                    <div class="step-content">
                      <strong>Detection:</strong> Technical systems identify potential threats
                    </div>
                  </div>
                  <div class="workflow-step">
                    <div class="step-number">2</div>
                    <div class="step-content">
                      <strong>Alert:</strong> Users receive contextual warnings and guidance
                    </div>
                  </div>
                  <div class="workflow-step">
                    <div class="step-number">3</div>
                    <div class="step-content">
                      <strong>Response:</strong> Trained users make informed security decisions
                    </div>
                  </div>
                  <div class="workflow-step">
                    <div class="step-number">4</div>
                    <div class="step-content">
                      <strong>Learning:</strong> Incidents become training opportunities
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="defense-component">
            <div class="component-header">
              <h5>📋 Process-Based Controls</h5>
              <span class="component-type">Procedural Defense</span>
            </div>
            <div class="component-content">
              <p>
                Systematic procedures and policies that create barriers against social engineering
                attacks. Our research methodology includes:
              </p>
              <ul>
                <li><strong>Verification Protocols:</strong> Multi-channel confirmation for sensitive requests</li>
                <li><strong>Incident Response:</strong> Rapid containment and recovery procedures</li>
                <li><strong>Continuous Improvement:</strong> Regular assessment and adaptation of defenses</li>
                <li><strong>Security Culture:</strong> Organization-wide commitment to security practices</li>
              </ul>

              <div class="process-framework">
                <h6>Defense Process Framework:</h6>
                <div class="process-layers">
                  <div class="process-layer">
                    <div class="layer-title">Prevention Layer</div>
                    <div class="layer-description">Proactive measures to prevent attacks</div>
                  </div>
                  <div class="process-layer">
                    <div class="layer-title">Detection Layer</div>
                    <div class="layer-description">Early identification of attack attempts</div>
                  </div>
                  <div class="process-layer">
                    <div class="layer-title">Response Layer</div>
                    <div class="layer-description">Rapid containment and mitigation</div>
                  </div>
                  <div class="process-layer">
                    <div class="layer-title">Recovery Layer</div>
                    <div class="layer-description">System restoration and lessons learned</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="defense-research-approach">
          <h4>Research Validation Approach</h4>
          <p>
            To validate the effectiveness of our defense training framework, we employ a
            controlled experimental design with the following components:
          </p>

          <div class="validation-components">
            <div class="validation-item">
              <h5>🎯 Baseline Assessment</h5>
              <p>
                Initial evaluation of organizational security posture before implementing
                defense training measures. Includes vulnerability scanning, user awareness
                testing, and process maturity assessment.
              </p>
            </div>

            <div class="validation-item">
              <h5>📚 Training Implementation</h5>
              <p>
                Systematic rollout of defense training components with careful tracking
                of participation rates, engagement levels, and knowledge acquisition metrics.
              </p>
            </div>

            <div class="validation-item">
              <h5>🧪 Controlled Testing</h5>
              <p>
                Regular simulation exercises to measure improvement in threat detection
                and response capabilities. Includes both announced and unannounced testing.
              </p>
            </div>

            <div class="validation-item">
              <h5>📊 Longitudinal Analysis</h5>
              <p>
                Long-term tracking of security incidents, user behavior changes, and
                overall security posture improvements over 12-month periods.
              </p>
            </div>
          </div>
        </div>

        <div class="defense-metrics">
          <h4>Defense Training Metrics</h4>
          <div class="metrics-framework">
            <div class="metric-category">
              <h5>Training Effectiveness</h5>
              <ul>
                <li>Knowledge acquisition rates (pre/post training scores)</li>
                <li>Skill retention over time (30, 60, 90-day assessments)</li>
                <li>Behavioral change indicators (simulation performance)</li>
                <li>Training engagement metrics (completion rates, time spent)</li>
              </ul>
            </div>

            <div class="metric-category">
              <h5>Security Posture Improvement</h5>
              <ul>
                <li>Reduction in successful social engineering attacks</li>
                <li>Increase in user-reported suspicious activities</li>
                <li>Faster incident detection and response times</li>
                <li>Improved compliance with security procedures</li>
              </ul>
            </div>

            <div class="metric-category">
              <h5>Organizational Impact</h5>
              <ul>
                <li>Cost reduction from prevented security incidents</li>
                <li>Productivity impact of security measures</li>
                <li>Employee confidence in security procedures</li>
                <li>Cultural shift toward security awareness</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Evaluation Metrics -->
    <div v-if="activeSection === 'metrics'" class="methodology-subsection">
      <h3>3.5 Evaluation Metrics</h3>
      
      <div class="metrics-categories">
        <div class="metric-category" v-for="category in evaluationMetrics" :key="category.name">
          <h4>{{ category.name }}</h4>
          <div class="metrics-grid">
            <div class="metric-card" v-for="metric in category.metrics" :key="metric.name">
              <h5>{{ metric.name }}</h5>
              <p>{{ metric.description }}</p>
              <div class="metric-formula" v-if="metric.formula">
                <strong>Formula:</strong> <code>{{ metric.formula }}</code>
              </div>
              <div class="metric-target">
                <strong>Target:</strong> {{ metric.target }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Implementation Plan -->
    <div v-if="activeSection === 'implementation'" class="methodology-subsection">
      <h3>3.6 Implementation Plan</h3>
      
      <div class="implementation-timeline">
        <h4>Development Timeline</h4>
        <div class="timeline-container">
          <div class="timeline-item" v-for="phase in implementationPhases" :key="phase.phase">
            <div class="timeline-marker">
              <span class="phase-number">{{ phase.phase }}</span>
            </div>
            <div class="timeline-content">
              <h5>{{ phase.title }}</h5>
              <p><strong>Duration:</strong> {{ phase.duration }}</p>
              <p>{{ phase.description }}</p>
              <div class="phase-tasks">
                <strong>Key Tasks:</strong>
                <ul>
                  <li v-for="task in phase.tasks" :key="task">{{ task }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Validation Techniques -->
    <div v-if="activeSection === 'validation'" class="methodology-subsection">
      <h3>3.7 Validation Techniques</h3>
      
      <div class="validation-approaches">
        <div class="validation-method" v-for="method in validationMethods" :key="method.name">
          <h4>{{ method.name }}</h4>
          <p>{{ method.description }}</p>
          <div class="method-details">
            <div class="method-steps">
              <strong>Steps:</strong>
              <ol>
                <li v-for="step in method.steps" :key="step">{{ step }}</li>
              </ol>
            </div>
            <div class="method-criteria">
              <strong>Success Criteria:</strong>
              <ul>
                <li v-for="criteria in method.criteria" :key="criteria">{{ criteria }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MethodologySection',
  data() {
    return {
      activeSection: 'design',
      sections: [
        { id: 'design', title: 'Research Design' },
        { id: 'architecture', title: 'Architecture' },
        { id: 'environment', title: 'Environment' },
        { id: 'detection', title: 'Detection' },
        { id: 'defense', title: 'Defense Training' },
        { id: 'metrics', title: 'Metrics' },
        { id: 'implementation', title: 'Implementation' },
        { id: 'validation', title: 'Validation' }
      ],
      researchPhases: [
        {
          id: 1,
          title: 'Literature Review & Analysis',
          description: 'Comprehensive review of existing research and identification of gaps in current social engineering detection methods.',
          deliverables: ['Literature synthesis report', 'Gap analysis document', 'Theoretical framework']
        },
        {
          id: 2,
          title: 'Framework Design',
          description: 'Design of the simulation-based framework architecture and component specifications.',
          deliverables: ['System architecture diagram', 'Component specifications', 'Interface designs']
        },
        {
          id: 3,
          title: 'Implementation & Development',
          description: 'Development of the simulation framework, detection algorithms, and user interfaces.',
          deliverables: ['Functional prototype', 'Detection algorithms', 'User interface']
        },
        {
          id: 4,
          title: 'Testing & Validation',
          description: 'Comprehensive testing of the framework with various attack scenarios and validation of results.',
          deliverables: ['Test results', 'Performance metrics', 'Validation report']
        }
      ],
      architectureLayers: [
        {
          name: 'Presentation Layer',
          components: [
            {
              name: 'Web Interface',
              icon: '🖥️',
              description: 'User-friendly dashboard for monitoring and configuration'
            },
            {
              name: 'Reporting Module',
              icon: '📊',
              description: 'Real-time analytics and comprehensive reporting tools'
            }
          ]
        },
        {
          name: 'Application Layer',
          components: [
            {
              name: 'Simulation Engine',
              icon: '⚡',
              description: 'Core simulation logic for various attack scenarios'
            },
            {
              name: 'Detection Engine',
              icon: '🔍',
              description: 'Multi-layered detection algorithms and pattern matching'
            },
            {
              name: 'Defense Module',
              icon: '🛡️',
              description: 'Automated response and mitigation strategies'
            }
          ]
        },
        {
          name: 'Data Layer',
          components: [
            {
              name: 'Attack Database',
              icon: '🗄️',
              description: 'Repository of attack patterns and signatures'
            },
            {
              name: 'User Behavior Store',
              icon: '👤',
              description: 'Behavioral patterns and user interaction data'
            }
          ]
        }
      ],
      dataFlowSteps: [
        {
          title: 'Input Collection',
          description: 'Gather user interactions, email content, and system events'
        },
        {
          title: 'Preprocessing',
          description: 'Clean and normalize data for analysis'
        },
        {
          title: 'Feature Extraction',
          description: 'Extract relevant features for detection algorithms'
        },
        {
          title: 'Detection Analysis',
          description: 'Apply machine learning and rule-based detection'
        },
        {
          title: 'Risk Assessment',
          description: 'Calculate threat probability and severity scores'
        },
        {
          title: 'Response Generation',
          description: 'Generate appropriate alerts and mitigation actions'
        }
      ],
      environmentSpecs: [
        {
          name: 'Hardware Requirements',
          specs: [
            { name: 'CPU', value: 'Multi-core processor (8+ cores recommended)' },
            { name: 'RAM', value: '16GB minimum, 32GB recommended' },
            { name: 'Storage', value: '500GB SSD for optimal performance' },
            { name: 'Network', value: 'Gigabit Ethernet connection' }
          ]
        },
        {
          name: 'Software Stack',
          specs: [
            { name: 'Frontend', value: 'Vue.js 3.x with TypeScript' },
            { name: 'Backend', value: 'Node.js with Express framework' },
            { name: 'Database', value: 'MongoDB for document storage' },
            { name: 'ML Framework', value: 'TensorFlow.js for client-side ML' }
          ]
        }
      ],
      simulationScenarios: [
        {
          name: 'Email Phishing Campaign',
          complexity: 'Medium',
          description: 'Simulates sophisticated phishing emails targeting user credentials',
          target: 'End users and administrators',
          duration: '2-4 hours',
          metrics: ['Click-through rate', 'Credential submission', 'Detection time']
        },
        {
          name: 'Spear Phishing Attack',
          complexity: 'High',
          description: 'Personalized attacks using gathered intelligence about targets',
          target: 'High-value individuals',
          duration: '1-2 days',
          metrics: ['Success rate', 'Time to detection', 'User response']
        },
        {
          name: 'Pretexting Scenario',
          complexity: 'High',
          description: 'Social engineering through fabricated scenarios and authority impersonation',
          target: 'Support staff and administrators',
          duration: '30 minutes - 2 hours',
          metrics: ['Information disclosure', 'Verification attempts', 'Escalation rate']
        }
      ],
      detectionLayers: [
        {
          name: 'Content Analysis Layer',
          description: 'Analyzes email content, URLs, and attachments for malicious indicators',
          techniques: [
            {
              name: 'Natural Language Processing',
              description: 'Identifies suspicious language patterns and urgency indicators'
            },
            {
              name: 'URL Analysis',
              description: 'Examines URLs for suspicious domains and redirect chains'
            }
          ]
        },
        {
          name: 'Behavioral Analysis Layer',
          description: 'Monitors user behavior patterns and identifies anomalies',
          techniques: [
            {
              name: 'User Activity Monitoring',
              description: 'Tracks user interactions and identifies unusual patterns'
            },
            {
              name: 'Temporal Analysis',
              description: 'Analyzes timing patterns of user actions and communications'
            }
          ]
        },
        {
          name: 'Machine Learning Layer',
          description: 'Applies advanced ML algorithms for pattern recognition and prediction',
          techniques: [
            {
              name: 'Ensemble Methods',
              description: 'Combines multiple ML models for improved accuracy'
            },
            {
              name: 'Deep Learning',
              description: 'Neural networks for complex pattern recognition'
            }
          ]
        }
      ],
      evaluationMetrics: [
        {
          name: 'Detection Performance',
          metrics: [
            {
              name: 'Accuracy',
              description: 'Overall correctness of detection decisions',
              formula: '(TP + TN) / (TP + TN + FP + FN)',
              target: '≥ 95%'
            },
            {
              name: 'Precision',
              description: 'Proportion of positive identifications that were correct',
              formula: 'TP / (TP + FP)',
              target: '≥ 90%'
            },
            {
              name: 'Recall',
              description: 'Proportion of actual positives correctly identified',
              formula: 'TP / (TP + FN)',
              target: '≥ 85%'
            }
          ]
        },
        {
          name: 'System Performance',
          metrics: [
            {
              name: 'Response Time',
              description: 'Time from detection to alert generation',
              target: '< 5 seconds'
            },
            {
              name: 'Throughput',
              description: 'Number of emails processed per minute',
              target: '≥ 1000 emails/minute'
            },
            {
              name: 'Resource Utilization',
              description: 'CPU and memory usage during operation',
              target: '< 70% average utilization'
            }
          ]
        }
      ],
      implementationPhases: [
        {
          phase: 1,
          title: 'Core Framework Development',
          duration: '4 weeks',
          description: 'Development of basic simulation engine and detection algorithms',
          tasks: [
            'Set up development environment',
            'Implement basic simulation framework',
            'Develop core detection algorithms',
            'Create initial user interface'
          ]
        },
        {
          phase: 2,
          title: 'Advanced Features Integration',
          duration: '6 weeks',
          description: 'Integration of machine learning models and advanced detection mechanisms',
          tasks: [
            'Implement ML-based detection',
            'Develop behavioral analysis modules',
            'Create comprehensive reporting system',
            'Integrate real-time monitoring'
          ]
        },
        {
          phase: 3,
          title: 'Testing and Optimization',
          duration: '4 weeks',
          description: 'Comprehensive testing, performance optimization, and bug fixes',
          tasks: [
            'Conduct unit and integration testing',
            'Performance optimization',
            'Security testing and validation',
            'User acceptance testing'
          ]
        }
      ],
      validationMethods: [
        {
          name: 'Controlled Testing Scenarios',
          description: 'Systematic testing using predefined attack scenarios with known outcomes',
          steps: [
            'Design test scenarios with varying complexity levels',
            'Execute scenarios in controlled environment',
            'Measure detection accuracy and response times',
            'Analyze results and identify improvement areas'
          ],
          criteria: [
            'Detection accuracy ≥ 95%',
            'False positive rate ≤ 5%',
            'Response time ≤ 5 seconds',
            'System stability during extended testing'
          ]
        },
        {
          name: 'User Trials and Feedback',
          description: 'Real-world testing with actual users to validate usability and effectiveness',
          steps: [
            'Recruit diverse user groups for testing',
            'Conduct supervised testing sessions',
            'Collect quantitative and qualitative feedback',
            'Iterate based on user input and observations'
          ],
          criteria: [
            'User satisfaction score ≥ 4.0/5.0',
            'Task completion rate ≥ 90%',
            'Learning curve ≤ 30 minutes',
            'Positive feedback on interface usability'
          ]
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.methodology-section {
  h2 {
    color: var(--primary-color);
    border-bottom: 3px solid var(--secondary-color);
    padding-bottom: 0.5rem;
    margin-bottom: 2rem;
  }
  
  .methodology-navigation {
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
  
  .methodology-subsection {
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
  
  .approach-diagram {
    .approach-phase {
      display: flex;
      margin-bottom: 2rem;
      padding: 1.5rem;
      background: var(--light-color);
      border-radius: 0.5rem;
      border-left: 4px solid var(--secondary-color);
      
      .phase-number {
        background: var(--primary-color);
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
        
        h5 {
          color: var(--primary-color);
          margin-bottom: 0.5rem;
        }
        
        .phase-deliverables {
          margin-top: 1rem;
          
          ul {
            list-style: none;
            margin-top: 0.5rem;
            
            li {
              padding: 0.25rem 0;
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
      }
    }
  }
  
  .architecture-diagram {
    .component-layer {
      margin-bottom: 2rem;
      padding: 1.5rem;
      background: white;
      border-radius: 0.5rem;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      
      h5 {
        color: var(--primary-color);
        margin-bottom: 1rem;
        text-align: center;
        padding-bottom: 0.5rem;
        border-bottom: 2px solid var(--light-color);
      }
      
      .components-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;
        
        .component-card {
          background: var(--light-color);
          padding: 1rem;
          border-radius: 0.5rem;
          text-align: center;
          
          .component-icon {
            font-size: 2rem;
            margin-bottom: 0.5rem;
          }
          
          h6 {
            color: var(--secondary-color);
            margin-bottom: 0.5rem;
          }
          
          p {
            font-size: 0.9rem;
            margin: 0;
          }
        }
      }
    }
  }
  
  .flow-steps {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 1rem;
    
    .flow-step {
      display: flex;
      align-items: center;
      flex: 1;
      min-width: 200px;
      
      .step-number {
        background: var(--secondary-color);
        color: white;
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        margin-right: 1rem;
        flex-shrink: 0;
      }
      
      .step-content {
        flex: 1;
        
        h5 {
          color: var(--primary-color);
          margin-bottom: 0.25rem;
          font-size: 1rem;
        }
        
        p {
          font-size: 0.9rem;
          margin: 0;
        }
      }
      
      .step-arrow {
        font-size: 1.5rem;
        color: var(--secondary-color);
        margin: 0 1rem;
      }
    }
  }
  
  .specs-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
    margin: 1.5rem 0;
    
    .spec-category {
      background: white;
      padding: 1.5rem;
      border-radius: 0.5rem;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      
      h5 {
        color: var(--primary-color);
        margin-bottom: 1rem;
        padding-bottom: 0.5rem;
        border-bottom: 2px solid var(--light-color);
      }
      
      .spec-items {
        .spec-item {
          padding: 0.5rem 0;
          border-bottom: 1px solid var(--light-color);
          
          &:last-child {
            border-bottom: none;
          }
        }
      }
    }
  }
  
  .scenarios-list {
    .scenario-card {
      margin-bottom: 2rem;
      padding: 1.5rem;
      background: var(--light-color);
      border-radius: 0.5rem;
      border-left: 4px solid var(--secondary-color);
      
      .scenario-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
        
        h5 {
          color: var(--primary-color);
          margin: 0;
        }
        
        .complexity-badge {
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
      
      .scenario-details {
        margin-top: 1rem;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;
        
        .detail-item {
          background: white;
          padding: 0.75rem;
          border-radius: 0.25rem;
        }
      }
    }
  }
  
  .detection-pyramid {
    .detection-layer {
      margin-bottom: 2rem;
      padding: 1.5rem;
      background: white;
      border-radius: 0.5rem;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      border-left: 4px solid var(--primary-color);
      
      .layer-info {
        margin-bottom: 1rem;
        
        h5 {
          color: var(--primary-color);
          margin-bottom: 0.5rem;
        }
      }
      
      .layer-techniques {
        .technique-item {
          padding: 0.75rem;
          margin-bottom: 0.5rem;
          background: var(--light-color);
          border-radius: 0.25rem;
          
          &:last-child {
            margin-bottom: 0;
          }
        }
      }
    }
  }
  
  .metrics-categories {
    .metric-category {
      margin-bottom: 3rem;
      
      .metrics-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1.5rem;
        margin-top: 1rem;
        
        .metric-card {
          background: white;
          padding: 1.5rem;
          border-radius: 0.5rem;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          
          h5 {
            color: var(--primary-color);
            margin-bottom: 1rem;
          }
          
          .metric-formula {
            margin: 1rem 0;
            padding: 0.75rem;
            background: var(--light-color);
            border-radius: 0.25rem;
            
            code {
              font-family: 'Courier New', monospace;
              color: var(--secondary-color);
            }
          }
          
          .metric-target {
            margin-top: 1rem;
            padding: 0.5rem;
            background: rgba(39, 174, 96, 0.1);
            border-radius: 0.25rem;
            color: var(--success-color);
          }
        }
      }
    }
  }
  
  .timeline-container {
    .timeline-item {
      display: flex;
      margin-bottom: 2rem;
      
      .timeline-marker {
        margin-right: 1.5rem;
        
        .phase-number {
          background: var(--primary-color);
          color: white;
          width: 3rem;
          height: 3rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 1.25rem;
        }
      }
      
      .timeline-content {
        flex: 1;
        padding: 1.5rem;
        background: var(--light-color);
        border-radius: 0.5rem;
        
        h5 {
          color: var(--primary-color);
          margin-bottom: 0.5rem;
        }
        
        .phase-tasks {
          margin-top: 1rem;
          
          ul {
            list-style: none;
            margin-top: 0.5rem;
            
            li {
              padding: 0.25rem 0;
              padding-left: 1.5rem;
              position: relative;
              
              &:before {
                content: '•';
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
  }
  
  .validation-approaches {
    .validation-method {
      margin-bottom: 3rem;
      padding: 2rem;
      background: white;
      border-radius: 0.5rem;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      
      h4 {
        color: var(--primary-color);
        margin-bottom: 1rem;
      }
      
      .method-details {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
        margin-top: 1.5rem;
        
        .method-steps,
        .method-criteria {
          ol, ul {
            margin-top: 0.5rem;
            
            li {
              padding: 0.25rem 0;
            }
          }
        }
        
        .method-criteria {
          ul {
            list-style: none;
            
            li {
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
      }
    }
  }

  // Defense Training Methodology Styles
  .defense-methodology {
    .defense-components {
      margin: 2rem 0;

      .defense-component {
        background: var(--light-color);
        border-radius: 0.5rem;
        margin-bottom: 2rem;
        overflow: hidden;
        border-left: 4px solid var(--success-color);

        .component-header {
          background: white;
          padding: 1.5rem;
          border-bottom: 1px solid var(--border-color);
          display: flex;
          justify-content: space-between;
          align-items: center;

          h5 {
            margin: 0;
            color: var(--primary-color);
          }

          .component-type {
            background: var(--success-color);
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 1rem;
            font-size: 0.8rem;
            font-weight: bold;
          }
        }

        .component-content {
          padding: 1.5rem;

          p {
            line-height: 1.6;
            margin-bottom: 1rem;
          }

          ul {
            margin: 0 0 1.5rem 0;
            padding-left: 1.5rem;

            li {
              margin-bottom: 0.5rem;
              line-height: 1.5;

              strong {
                color: var(--secondary-color);
              }
            }
          }

          .methodology-metrics {
            background: rgba(39, 174, 96, 0.1);
            padding: 1rem;
            border-radius: 0.25rem;
            margin-top: 1rem;

            h6 {
              color: var(--success-color);
              margin: 0 0 1rem 0;
            }

            .metrics-grid {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
              gap: 1rem;

              .metric-item {
                background: white;
                padding: 1rem;
                border-radius: 0.25rem;
                text-align: center;

                .metric-label {
                  font-weight: 600;
                  color: var(--primary-color);
                  margin-bottom: 0.5rem;
                }

                .metric-target {
                  color: var(--success-color);
                  font-size: 0.9rem;
                  font-weight: 500;
                }
              }
            }
          }

          .integration-flow {
            background: rgba(52, 152, 219, 0.1);
            padding: 1rem;
            border-radius: 0.25rem;
            margin-top: 1rem;

            h6 {
              color: var(--primary-color);
              margin: 0 0 1rem 0;
            }

            .workflow-steps {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
              gap: 1rem;

              .workflow-step {
                display: flex;
                align-items: center;
                background: white;
                padding: 1rem;
                border-radius: 0.25rem;

                .step-number {
                  background: var(--primary-color);
                  color: white;
                  width: 30px;
                  height: 30px;
                  border-radius: 50%;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  font-weight: bold;
                  margin-right: 1rem;
                  flex-shrink: 0;
                }

                .step-content {
                  flex: 1;
                  font-size: 0.9rem;

                  strong {
                    color: var(--secondary-color);
                  }
                }
              }
            }
          }

          .process-framework {
            background: rgba(155, 89, 182, 0.1);
            padding: 1rem;
            border-radius: 0.25rem;
            margin-top: 1rem;

            h6 {
              color: #9b59b6;
              margin: 0 0 1rem 0;
            }

            .process-layers {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
              gap: 1rem;

              .process-layer {
                background: white;
                padding: 1rem;
                border-radius: 0.25rem;
                text-align: center;
                border-top: 3px solid #9b59b6;

                .layer-title {
                  font-weight: 600;
                  color: var(--primary-color);
                  margin-bottom: 0.5rem;
                }

                .layer-description {
                  font-size: 0.9rem;
                  color: #666;
                }
              }
            }
          }
        }
      }

      .defense-research-approach {
        background: white;
        padding: 2rem;
        border-radius: 0.5rem;
        margin: 2rem 0;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

        h4 {
          color: var(--primary-color);
          margin-bottom: 1rem;
        }

        p {
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .validation-components {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;

          .validation-item {
            background: var(--light-color);
            padding: 1.5rem;
            border-radius: 0.5rem;
            border-left: 4px solid var(--secondary-color);

            h5 {
              color: var(--primary-color);
              margin: 0 0 1rem 0;
            }

            p {
              margin: 0;
              line-height: 1.6;
              color: #666;
            }
          }
        }
      }

      .defense-metrics {
        background: white;
        padding: 2rem;
        border-radius: 0.5rem;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

        h4 {
          color: var(--primary-color);
          margin-bottom: 1rem;
        }

        .metrics-framework {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;

          .metric-category {
            background: var(--light-color);
            padding: 1.5rem;
            border-radius: 0.5rem;

            h5 {
              color: var(--secondary-color);
              margin: 0 0 1rem 0;
              padding-bottom: 0.5rem;
              border-bottom: 2px solid var(--secondary-color);
            }

            ul {
              margin: 0;
              padding-left: 1.5rem;

              li {
                margin-bottom: 0.5rem;
                line-height: 1.5;
                color: #666;
              }
            }
          }
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .methodology-section {
    .flow-steps {
      flex-direction: column;
      
      .flow-step {
        .step-arrow {
          display: none;
        }
      }
    }
    
    .method-details {
      grid-template-columns: 1fr !important;
    }
    
    .methodology-navigation {
      .section-btn {
        flex: 1;
        min-width: calc(50% - 0.25rem);
      }
    }
  }
}
</style>
