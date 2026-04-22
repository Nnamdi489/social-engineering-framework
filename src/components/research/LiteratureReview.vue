<template>
  <div class="literature-review">
    <h2>Chapter Two - Literature Review</h2>
    
    <div class="review-navigation">
      <button 
        v-for="section in sections" 
        :key="section.id"
        @click="activeSection = section.id"
        :class="['section-btn', { active: activeSection === section.id }]"
      >
        {{ section.title }}
      </button>
    </div>

    <!-- Introduction -->
    <div v-if="activeSection === 'introduction'" class="review-section">
      <h3>2.1 Introduction</h3>
      <p>
        This literature review examines the current state of research in social engineering attacks, 
        detection mechanisms, and simulation-based cybersecurity training. The review synthesizes 
        findings from academic research, industry reports, and practical implementations to establish 
        the theoretical foundation for this research framework.
      </p>
      
      <div class="review-scope">
        <h4>Review Scope and Methodology</h4>
        <div class="scope-items">
          <div class="scope-item">
            <span class="scope-icon">📚</span>
            <div>
              <strong>Academic Sources:</strong> Peer-reviewed journals, conference proceedings, and dissertations (2019-2024)
            </div>
          </div>
          <div class="scope-item">
            <span class="scope-icon">🏢</span>
            <div>
              <strong>Industry Reports:</strong> Cybersecurity vendor reports, threat intelligence, and case studies
            </div>
          </div>
          <div class="scope-item">
            <span class="scope-icon">🔍</span>
            <div>
              <strong>Search Strategy:</strong> Systematic review of databases including IEEE, ACM, and cybersecurity journals
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Social Engineering Overview -->
    <div v-if="activeSection === 'overview'" class="review-section">
      <h3>2.2 Overview of Social Engineering Attacks</h3>
      
      <div class="attack-evolution">
        <h4>Evolution of Social Engineering Attacks</h4>
        <div class="timeline">
          <div class="timeline-item" v-for="period in attackEvolution" :key="period.year">
            <div class="timeline-year">{{ period.year }}</div>
            <div class="timeline-content">
              <h5>{{ period.title }}</h5>
              <p>{{ period.description }}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="attack-statistics">
        <h4>Current Attack Landscape</h4>
        <div class="stats-grid">
          <div class="stat-card" v-for="stat in attackStats" :key="stat.label">
            <div class="stat-value">{{ stat.value }}</div>
            <div class="stat-label">{{ stat.label }}</div>
            <div class="stat-description">{{ stat.description }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Detection Mechanisms -->
    <div v-if="activeSection === 'detection'" class="review-section">
      <h3>2.3 Existing Detection and Defense Mechanisms</h3>
      
      <div class="detection-approaches">
        <div class="approach-category" v-for="category in detectionApproaches" :key="category.name">
          <h4>{{ category.name }}</h4>
          <div class="approaches-list">
            <div class="approach-item" v-for="approach in category.approaches" :key="approach.name">
              <div class="approach-header">
                <h5>{{ approach.name }}</h5>
                <span class="effectiveness-badge" :class="approach.effectiveness.toLowerCase()">
                  {{ approach.effectiveness }}
                </span>
              </div>
              <p>{{ approach.description }}</p>
              <div class="approach-pros-cons">
                <div class="pros">
                  <strong>Advantages:</strong>
                  <ul>
                    <li v-for="pro in approach.pros" :key="pro">{{ pro }}</li>
                  </ul>
                </div>
                <div class="cons">
                  <strong>Limitations:</strong>
                  <ul>
                    <li v-for="con in approach.cons" :key="con">{{ con }}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Simulation in Cybersecurity -->
    <div v-if="activeSection === 'simulation'" class="review-section">
      <h3>2.4 Simulation in Cybersecurity</h3>
      
      <div class="simulation-benefits">
        <h4>Benefits of Simulation-Based Training</h4>
        <div class="benefits-grid">
          <div class="benefit-card" v-for="benefit in simulationBenefits" :key="benefit.title">
            <div class="benefit-icon">{{ benefit.icon }}</div>
            <h5>{{ benefit.title }}</h5>
            <p>{{ benefit.description }}</p>
          </div>
        </div>
      </div>
      
      <div class="existing-frameworks">
        <h4>Existing Simulation Frameworks</h4>
        <div class="frameworks-comparison">
          <div class="framework-item" v-for="framework in existingFrameworks" :key="framework.name">
            <h5>{{ framework.name }}</h5>
            <p><strong>Focus:</strong> {{ framework.focus }}</p>
            <p><strong>Strengths:</strong> {{ framework.strengths }}</p>
            <p><strong>Limitations:</strong> {{ framework.limitations }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Theoretical Framework -->
    <div v-if="activeSection === 'theoretical'" class="review-section">
      <h3>2.5 Theoretical Framework</h3>
      
      <div class="theories">
        <div class="theory-item" v-for="theory in theories" :key="theory.name">
          <h4>{{ theory.name }}</h4>
          <p><strong>Core Principle:</strong> {{ theory.principle }}</p>
          <p><strong>Application:</strong> {{ theory.application }}</p>
          <div class="theory-components">
            <h5>Key Components:</h5>
            <ul>
              <li v-for="component in theory.components" :key="component">{{ component }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Literature Gap -->
    <div v-if="activeSection === 'gap'" class="review-section">
      <h3>2.6 Summary of Literature Gap</h3>
      
      <div class="gap-analysis">
        <div class="identified-gaps">
          <h4>Identified Research Gaps</h4>
          <div class="gap-item" v-for="gap in researchGaps" :key="gap.area">
            <div class="gap-header">
              <span class="gap-icon">⚠️</span>
              <h5>{{ gap.area }}</h5>
            </div>
            <p>{{ gap.description }}</p>
            <div class="gap-impact">
              <strong>Impact:</strong> {{ gap.impact }}
            </div>
          </div>
        </div>
        
        <div class="research-contribution">
          <h4>This Research Contribution</h4>
          <div class="contribution-points">
            <div class="contribution-item" v-for="contribution in researchContributions" :key="contribution">
              <span class="contribution-icon">✨</span>
              <p>{{ contribution }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LiteratureReview',
  data() {
    return {
      activeSection: 'introduction',
      sections: [
        { id: 'introduction', title: 'Introduction' },
        { id: 'overview', title: 'SE Overview' },
        { id: 'detection', title: 'Detection Methods' },
        { id: 'simulation', title: 'Simulation' },
        { id: 'theoretical', title: 'Theoretical Framework' },
        { id: 'gap', title: 'Literature Gap' }
      ],
      attackEvolution: [
        {
          year: '2019-2020',
          title: 'Traditional Phishing',
          description: 'Basic email phishing campaigns with generic templates and obvious indicators.'
        },
        {
          year: '2021-2022',
          title: 'Targeted Spear Phishing',
          description: 'Personalized attacks using social media intelligence and company information.'
        },
        {
          year: '2023-2024',
          title: 'AI-Enhanced Attacks',
          description: 'Sophisticated attacks using AI for content generation and behavioral mimicry.'
        }
      ],
      attackStats: [
        {
          value: '36%',
          label: 'Data Breaches',
          description: 'Percentage of data breaches involving phishing attacks in 2023'
        },
        {
          value: '270%',
          label: 'Growth Rate',
          description: 'Increase in social engineering attacks over the past three years'
        },
        {
          value: '₦4.45M',
          label: 'Average Cost',
          description: 'Average cost of a data breach involving social engineering'
        },
        {
          value: '95%',
          label: 'Human Factor',
          description: 'Percentage of successful cyber attacks that involve human error'
        }
      ],
      detectionApproaches: [
        {
          name: 'Technical Detection Methods',
          approaches: [
            {
              name: 'Email Filtering Systems',
              effectiveness: 'Moderate',
              description: 'Automated systems that analyze email content, headers, and attachments for malicious indicators.',
              pros: ['High processing speed', 'Scalable implementation', 'Continuous monitoring'],
              cons: ['High false positive rates', 'Difficulty with sophisticated attacks', 'Limited context awareness']
            },
            {
              name: 'Machine Learning Detection',
              effectiveness: 'High',
              description: 'AI-powered systems that learn from patterns and behaviors to identify potential threats.',
              pros: ['Adaptive learning', 'Pattern recognition', 'Reduced false positives'],
              cons: ['Requires large datasets', 'Complex implementation', 'Potential for adversarial attacks']
            }
          ]
        },
        {
          name: 'Behavioral Analysis Methods',
          approaches: [
            {
              name: 'User Behavior Analytics',
              effectiveness: 'High',
              description: 'Systems that monitor user actions and identify deviations from normal behavior patterns.',
              pros: ['Context-aware detection', 'Real-time monitoring', 'Insider threat detection'],
              cons: ['Privacy concerns', 'High computational requirements', 'Baseline establishment challenges']
            }
          ]
        }
      ],
      simulationBenefits: [
        {
          icon: '🎯',
          title: 'Realistic Training',
          description: 'Provides hands-on experience with actual attack scenarios without real-world risks.'
        },
        {
          icon: '📊',
          title: 'Measurable Results',
          description: 'Enables quantitative assessment of security awareness and response effectiveness.'
        },
        {
          icon: '🔄',
          title: 'Continuous Improvement',
          description: 'Allows for iterative testing and refinement of defense strategies.'
        },
        {
          icon: '👥',
          title: 'Team Coordination',
          description: 'Facilitates collaborative training and incident response coordination.'
        }
      ],
      existingFrameworks: [
        {
          name: 'NIST Cybersecurity Framework',
          focus: 'Comprehensive cybersecurity management',
          strengths: 'Industry standard, comprehensive coverage',
          limitations: 'Limited specific guidance for social engineering simulation'
        },
        {
          name: 'MITRE ATT&CK Framework',
          focus: 'Adversary tactics and techniques',
          strengths: 'Detailed attack mapping, community-driven',
          limitations: 'Complex implementation, limited simulation capabilities'
        }
      ],
      theories: [
        {
          name: 'Human Behavior Exploitation Theory',
          principle: 'Attackers exploit predictable human psychological tendencies and cognitive biases.',
          application: 'Understanding how social engineering attacks manipulate human decision-making processes.',
          components: [
            'Cognitive bias exploitation',
            'Authority and trust manipulation',
            'Urgency and fear tactics',
            'Social proof and conformity pressure'
          ]
        },
        {
          name: 'Cyber Kill Chain Model',
          principle: 'Cyber attacks follow a structured sequence of phases from reconnaissance to objective completion.',
          application: 'Mapping social engineering attacks to identify intervention points and detection opportunities.',
          components: [
            'Reconnaissance and target selection',
            'Weaponization of social tactics',
            'Delivery through communication channels',
            'Exploitation of human vulnerabilities',
            'Installation of malicious payloads',
            'Command and control establishment',
            'Actions on objectives'
          ]
        }
      ],
      researchGaps: [
        {
          area: 'Comprehensive Simulation Frameworks',
          description: 'Limited availability of integrated frameworks that combine multiple attack vectors with real-time detection.',
          impact: 'Organizations lack comprehensive training tools that address the full spectrum of social engineering threats.'
        },
        {
          area: 'Behavioral Pattern Analysis',
          description: 'Insufficient research on human behavioral patterns during social engineering attacks in controlled environments.',
          impact: 'Detection systems lack sophisticated understanding of human responses to social engineering attempts.'
        },
        {
          area: 'Real-time Detection Integration',
          description: 'Gap between theoretical detection methods and practical implementation in live environments.',
          impact: 'Delayed response times and reduced effectiveness of defense mechanisms.'
        }
      ],
      researchContributions: [
        'Development of an integrated simulation framework combining multiple social engineering attack vectors',
        'Implementation of real-time behavioral analysis for improved detection accuracy',
        'Creation of comprehensive training scenarios based on current threat intelligence',
        'Integration of machine learning algorithms for adaptive threat detection',
        'Establishment of quantitative metrics for measuring defense effectiveness'
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.literature-review {
  h2 {
    color: var(--primary-color);
    border-bottom: 3px solid var(--secondary-color);
    padding-bottom: 0.5rem;
    margin-bottom: 2rem;
  }
  
  .review-navigation {
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
  
  .review-section {
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
  
  .scope-items {
    .scope-item {
      display: flex;
      align-items: flex-start;
      margin-bottom: 1rem;
      padding: 1rem;
      background: var(--light-color);
      border-radius: 0.5rem;
      
      .scope-icon {
        font-size: 1.5rem;
        margin-right: 1rem;
        flex-shrink: 0;
      }
    }
  }
  
  .timeline {
    .timeline-item {
      display: flex;
      margin-bottom: 2rem;
      
      .timeline-year {
        background: var(--primary-color);
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 0.25rem;
        font-weight: bold;
        margin-right: 1rem;
        flex-shrink: 0;
      }
      
      .timeline-content {
        flex: 1;
        padding: 1rem;
        background: var(--light-color);
        border-radius: 0.5rem;
        
        h5 {
          color: var(--primary-color);
          margin-bottom: 0.5rem;
        }
      }
    }
  }
  
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin: 1.5rem 0;
    
    .stat-card {
      background: white;
      padding: 1.5rem;
      border-radius: 0.5rem;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      text-align: center;
      
      .stat-value {
        font-size: 2.5rem;
        font-weight: bold;
        color: var(--primary-color);
        margin-bottom: 0.5rem;
      }
      
      .stat-label {
        font-weight: 600;
        color: var(--secondary-color);
        margin-bottom: 0.5rem;
      }
      
      .stat-description {
        font-size: 0.9rem;
        color: #666;
      }
    }
  }
  
  .approach-category {
    margin-bottom: 3rem;
    
    .approaches-list {
      .approach-item {
        margin-bottom: 2rem;
        padding: 1.5rem;
        background: var(--light-color);
        border-radius: 0.5rem;
        border-left: 4px solid var(--secondary-color);
        
        .approach-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
          
          h5 {
            color: var(--primary-color);
            margin: 0;
          }
          
          .effectiveness-badge {
            padding: 0.25rem 0.75rem;
            border-radius: 1rem;
            font-size: 0.8rem;
            font-weight: bold;
            
            &.high {
              background: var(--success-color);
              color: white;
            }
            
            &.moderate {
              background: var(--warning-color);
              color: white;
            }
            
            &.low {
              background: var(--danger-color);
              color: white;
            }
          }
        }
        
        .approach-pros-cons {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-top: 1rem;
          
          .pros, .cons {
            ul {
              list-style: none;
              margin-top: 0.5rem;
              
              li {
                padding: 0.25rem 0;
                padding-left: 1.5rem;
                position: relative;
                
                &:before {
                  position: absolute;
                  left: 0;
                  font-weight: bold;
                }
              }
            }
          }
          
          .pros {
            li:before {
              content: '✓';
              color: var(--success-color);
            }
          }
          
          .cons {
            li:before {
              content: '✗';
              color: var(--danger-color);
            }
          }
        }
      }
    }
  }
  
  .benefits-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin: 1.5rem 0;
    
    .benefit-card {
      background: white;
      padding: 1.5rem;
      border-radius: 0.5rem;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      text-align: center;
      
      .benefit-icon {
        font-size: 2.5rem;
        margin-bottom: 1rem;
      }
      
      h5 {
        color: var(--primary-color);
        margin-bottom: 1rem;
      }
    }
  }
  
  .frameworks-comparison {
    .framework-item {
      margin-bottom: 2rem;
      padding: 1.5rem;
      background: var(--light-color);
      border-radius: 0.5rem;
      border-left: 4px solid var(--primary-color);
      
      h5 {
        color: var(--primary-color);
        margin-bottom: 1rem;
      }
      
      p {
        margin-bottom: 0.5rem;
      }
    }
  }
  
  .theories {
    .theory-item {
      margin-bottom: 3rem;
      padding: 2rem;
      background: white;
      border-radius: 0.5rem;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      
      h4 {
        color: var(--primary-color);
        margin-bottom: 1rem;
      }
      
      .theory-components {
        margin-top: 1.5rem;
        
        h5 {
          color: var(--secondary-color);
          margin-bottom: 0.5rem;
        }
        
        ul {
          list-style: none;
          
          li {
            padding: 0.5rem 0;
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
  
  .gap-analysis {
    .identified-gaps {
      margin-bottom: 3rem;
      
      .gap-item {
        margin-bottom: 2rem;
        padding: 1.5rem;
        background: rgba(231, 76, 60, 0.1);
        border-radius: 0.5rem;
        border-left: 4px solid var(--danger-color);
        
        .gap-header {
          display: flex;
          align-items: center;
          margin-bottom: 1rem;
          
          .gap-icon {
            font-size: 1.5rem;
            margin-right: 0.5rem;
          }
          
          h5 {
            color: var(--danger-color);
            margin: 0;
          }
        }
        
        .gap-impact {
          margin-top: 1rem;
          font-style: italic;
          color: #666;
        }
      }
    }
    
    .research-contribution {
      .contribution-points {
        .contribution-item {
          display: flex;
          align-items: flex-start;
          margin-bottom: 1rem;
          padding: 1rem;
          background: rgba(39, 174, 96, 0.1);
          border-radius: 0.5rem;
          border-left: 4px solid var(--success-color);
          
          .contribution-icon {
            font-size: 1.5rem;
            margin-right: 1rem;
            flex-shrink: 0;
          }
          
          p {
            margin: 0;
          }
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .literature-review {
    .approach-pros-cons {
      grid-template-columns: 1fr !important;
    }
    
    .review-navigation {
      .section-btn {
        flex: 1;
        min-width: calc(50% - 0.25rem);
      }
    }
  }
}
</style>
