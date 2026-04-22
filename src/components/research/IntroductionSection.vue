<template>
  <div class="introduction-section">
    <h2>Chapter One - Introduction</h2>
    
    <div class="section-navigation">
      <button 
        v-for="subsection in subsections" 
        :key="subsection.id"
        @click="activeSubsection = subsection.id"
        :class="['subsection-btn', { active: activeSubsection === subsection.id }]"
      >
        {{ subsection.title }}
      </button>
    </div>

    <!-- Background of the Study -->
    <div v-if="activeSubsection === 'background'" class="subsection">
      <h3>1.1 Background of the Study</h3>
      <p>
        Social engineering attacks represent a sophisticated form of cybercrime that exploits human psychology 
        rather than technical vulnerabilities. These attacks manipulate individuals into divulging confidential 
        information, performing actions that compromise security, or providing unauthorized access to systems.
      </p>
      
      <div class="attack-types">
        <h4>Common Social Engineering Attack Types:</h4>
        <div class="attack-grid">
          <div class="attack-card" v-for="attack in attackTypes" :key="attack.name">
            <div class="attack-icon">{{ attack.icon }}</div>
            <h5>{{ attack.name }}</h5>
            <p>{{ attack.description }}</p>
          </div>
        </div>
      </div>
      
      <p>
        The importance of detection and defense mechanisms in cybersecurity cannot be overstated. Traditional 
        security measures, while effective against technical attacks, often fail to address the human element 
        that social engineering exploits. This research introduces simulation-based solutions that provide 
        realistic training environments and detection capabilities.
      </p>
    </div>

    <!-- Problem Statement -->
    <div v-if="activeSubsection === 'problem'" class="subsection">
      <h3>1.2 Problem Statement</h3>
      <div class="problem-highlights">
        <div class="problem-item">
          <span class="problem-icon">📈</span>
          <div>
            <h4>Rising Attack Frequency</h4>
            <p>Social engineering attacks have increased by 270% over the past three years, with phishing 
            attacks alone accounting for 36% of all data breaches in 2023.</p>
          </div>
        </div>
        
        <div class="problem-item">
          <span class="problem-icon">🚨</span>
          <div>
            <h4>Inadequate Detection Systems</h4>
            <p>Current early detection systems lack the sophistication to identify subtle social engineering 
            attempts, particularly those that exploit human behavioral patterns.</p>
          </div>
        </div>
        
        <div class="problem-item">
          <span class="problem-icon">🎯</span>
          <div>
            <h4>Need for Practical Frameworks</h4>
            <p>Organizations require comprehensive frameworks that can both train personnel and test defense 
            mechanisms against realistic social engineering scenarios.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Aim of the Study -->
    <div v-if="activeSubsection === 'aim'" class="subsection">
      <h3>1.3 Aim of the Study</h3>
      <div class="aim-statement">
        <blockquote>
          To design and implement a simulation-based framework for detecting and defending against 
          social engineering attacks.
        </blockquote>
      </div>
      
      <p>
        This research aims to bridge the gap between theoretical knowledge of social engineering threats 
        and practical defense implementation. By creating a comprehensive simulation environment, we seek 
        to provide organizations with tools that can effectively prepare them for real-world social 
        engineering attacks.
      </p>
    </div>

    <!-- Objectives -->
    <div v-if="activeSubsection === 'objectives'" class="subsection">
      <h3>1.4 Objectives of the Study</h3>
      <div class="objectives-list">
        <div class="objective-item" v-for="(objective, index) in objectives" :key="index">
          <span class="objective-number">{{ index + 1 }}</span>
          <p>{{ objective }}</p>
        </div>
      </div>
    </div>

    <!-- Research Questions -->
    <div v-if="activeSubsection === 'questions'" class="subsection">
      <h3>1.5 Research Questions</h3>
      <div class="questions-list">
        <div class="question-item" v-for="(question, index) in researchQuestions" :key="index">
          <span class="question-mark">?</span>
          <p>{{ question }}</p>
        </div>
      </div>
    </div>

    <!-- Significance -->
    <div v-if="activeSubsection === 'significance'" class="subsection">
      <h3>1.6 Significance of the Study</h3>
      <div class="significance-grid">
        <div class="significance-card" v-for="item in significance" :key="item.title">
          <div class="significance-icon">{{ item.icon }}</div>
          <h4>{{ item.title }}</h4>
          <p>{{ item.description }}</p>
        </div>
      </div>
    </div>

    <!-- Scope and Limitations -->
    <div v-if="activeSubsection === 'scope'" class="subsection">
      <h3>1.7 Scope and Limitations</h3>
      <div class="scope-limitations">
        <div class="scope-section">
          <h4>Scope of the Study</h4>
          <ul>
            <li>Focus on email phishing attacks and detection mechanisms</li>
            <li>Simulation of fake websites and deceptive communication methods</li>
            <li>Analysis of user behavioral patterns during simulated attacks</li>
            <li>Development of real-time detection and response systems</li>
          </ul>
        </div>
        
        <div class="limitations-section">
          <h4>Limitations</h4>
          <ul>
            <li>Does not cover highly advanced AI-driven social engineering attacks</li>
            <li>Simulation accuracy depends on available training data quality</li>
            <li>Limited to controlled network environments for testing</li>
            <li>Focus primarily on email-based and web-based attack vectors</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Key Terms -->
    <div v-if="activeSubsection === 'terms'" class="subsection">
      <h3>1.8 Definition of Key Terms</h3>
      <div class="terms-list">
        <div class="term-item" v-for="term in keyTerms" :key="term.term">
          <h4>{{ term.term }}</h4>
          <p>{{ term.definition }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IntroductionSection',
  data() {
    return {
      activeSubsection: 'background',
      subsections: [
        { id: 'background', title: 'Background' },
        { id: 'problem', title: 'Problem Statement' },
        { id: 'aim', title: 'Aim' },
        { id: 'objectives', title: 'Objectives' },
        { id: 'questions', title: 'Research Questions' },
        { id: 'significance', title: 'Significance' },
        { id: 'scope', title: 'Scope & Limitations' },
        { id: 'terms', title: 'Key Terms' }
      ],
      attackTypes: [
        {
          name: 'Phishing',
          icon: '🎣',
          description: 'Fraudulent emails designed to steal sensitive information or credentials.'
        },
        {
          name: 'Pretexting',
          icon: '🎭',
          description: 'Creating fabricated scenarios to engage victims and extract information.'
        },
        {
          name: 'Baiting',
          icon: '🪤',
          description: 'Offering something enticing to spark curiosity and prompt unsafe actions.'
        },
        {
          name: 'Tailgating',
          icon: '🚪',
          description: 'Following authorized personnel into restricted areas without permission.'
        }
      ],
      objectives: [
        'To identify and categorize common social engineering attack techniques and their behavioral patterns.',
        'To design a comprehensive simulation framework that can accurately replicate various social engineering attacks.',
        'To implement advanced detection mechanisms within the framework using machine learning and behavioral analysis.',
        'To evaluate the framework\'s effectiveness in detecting, preventing, and mitigating social engineering attacks through comprehensive testing.'
      ],
      researchQuestions: [
        'What are the most prevalent social engineering attack methods in contemporary cybersecurity threats?',
        'How can a simulation framework be designed to accurately replicate real-world social engineering scenarios?',
        'What detection mechanisms are most effective in identifying social engineering attempts in real-time?',
        'How effective is the proposed framework in improving organizational defense capabilities against social engineering attacks?'
      ],
      significance: [
        {
          icon: '🏢',
          title: 'Organizational Training',
          description: 'Provides organizations with realistic training environments to prepare staff for social engineering attacks.'
        },
        {
          icon: '🎓',
          title: 'Educational Contribution',
          description: 'Contributes to cybersecurity education by offering practical, hands-on learning experiences.'
        },
        {
          icon: '🔧',
          title: 'Practical Tool',
          description: 'Offers a comprehensive tool for testing and improving security awareness across organizations.'
        },
        {
          icon: '📊',
          title: 'Research Advancement',
          description: 'Advances the field of cybersecurity research through innovative simulation-based methodologies.'
        }
      ],
      keyTerms: [
        {
          term: 'Social Engineering',
          definition: 'The use of deception to manipulate individuals into divulging confidential information or performing actions that compromise security.'
        },
        {
          term: 'Simulation Framework',
          definition: 'A comprehensive system that replicates real-world scenarios in a controlled environment for testing and training purposes.'
        },
        {
          term: 'Detection Mechanism',
          definition: 'Automated systems and processes designed to identify and flag potential security threats in real-time.'
        },
        {
          term: 'Mitigation Strategy',
          definition: 'Planned responses and countermeasures designed to reduce the impact and likelihood of successful attacks.'
        },
        {
          term: 'Behavioral Analysis',
          definition: 'The study of user actions and patterns to identify anomalies that may indicate security threats.'
        },
        {
          term: 'Attack Vector',
          definition: 'The path or means by which an attacker gains access to a computer or network server to deliver a malicious payload.'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.introduction-section {
  h2 {
    color: var(--primary-color);
    border-bottom: 3px solid var(--secondary-color);
    padding-bottom: 0.5rem;
    margin-bottom: 2rem;
  }
  
  .section-navigation {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 2rem;
    padding: 1rem;
    background: var(--light-color);
    border-radius: 0.5rem;
    
    .subsection-btn {
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
  
  .subsection {
    h3 {
      color: var(--primary-color);
      margin-bottom: 1.5rem;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid var(--light-color);
    }
    
    h4 {
      color: var(--secondary-color);
      margin-bottom: 1rem;
    }
    
    p {
      line-height: 1.7;
      margin-bottom: 1.5rem;
      text-align: justify;
    }
  }
  
  .attack-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
    margin: 1.5rem 0;
    
    .attack-card {
      background: var(--light-color);
      padding: 1.5rem;
      border-radius: 0.5rem;
      text-align: center;
      border-left: 4px solid var(--secondary-color);
      
      .attack-icon {
        font-size: 2rem;
        margin-bottom: 1rem;
      }
      
      h5 {
        color: var(--primary-color);
        margin-bottom: 0.5rem;
      }
    }
  }
  
  .problem-highlights {
    .problem-item {
      display: flex;
      align-items: flex-start;
      margin-bottom: 2rem;
      padding: 1.5rem;
      background: var(--light-color);
      border-radius: 0.5rem;
      
      .problem-icon {
        font-size: 2rem;
        margin-right: 1rem;
        flex-shrink: 0;
      }
      
      h4 {
        color: var(--primary-color);
        margin-bottom: 0.5rem;
      }
    }
  }
  
  .aim-statement {
    margin: 2rem 0;
    
    blockquote {
      background: var(--secondary-color);
      color: white;
      padding: 2rem;
      border-radius: 0.5rem;
      font-size: 1.25rem;
      font-style: italic;
      text-align: center;
      margin: 0;
    }
  }
  
  .objectives-list {
    .objective-item {
      display: flex;
      align-items: flex-start;
      margin-bottom: 1.5rem;
      
      .objective-number {
        background: var(--primary-color);
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
    }
  }
  
  .questions-list {
    .question-item {
      display: flex;
      align-items: flex-start;
      margin-bottom: 1.5rem;
      padding: 1rem;
      background: var(--light-color);
      border-radius: 0.5rem;
      
      .question-mark {
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
    }
  }
  
  .significance-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin: 1.5rem 0;
    
    .significance-card {
      background: white;
      padding: 1.5rem;
      border-radius: 0.5rem;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      text-align: center;
      
      .significance-icon {
        font-size: 2.5rem;
        margin-bottom: 1rem;
      }
      
      h4 {
        color: var(--primary-color);
        margin-bottom: 1rem;
      }
    }
  }
  
  .scope-limitations {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin: 1.5rem 0;
    
    .scope-section,
    .limitations-section {
      padding: 1.5rem;
      border-radius: 0.5rem;
      
      h4 {
        color: var(--primary-color);
        margin-bottom: 1rem;
      }
      
      ul {
        list-style: none;
        
        li {
          padding: 0.5rem 0;
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
    
    .scope-section {
      background: rgba(39, 174, 96, 0.1);
      border-left: 4px solid var(--success-color);
      
      li:before {
        content: '✓';
        color: var(--success-color);
      }
    }
    
    .limitations-section {
      background: rgba(231, 76, 60, 0.1);
      border-left: 4px solid var(--danger-color);
      
      li:before {
        content: '!';
        color: var(--danger-color);
      }
    }
  }
  
  .terms-list {
    .term-item {
      margin-bottom: 2rem;
      padding: 1.5rem;
      background: var(--light-color);
      border-radius: 0.5rem;
      border-left: 4px solid var(--secondary-color);
      
      h4 {
        color: var(--primary-color);
        margin-bottom: 0.5rem;
      }
    }
  }
}

@media (max-width: 768px) {
  .introduction-section {
    .scope-limitations {
      grid-template-columns: 1fr;
    }
    
    .section-navigation {
      .subsection-btn {
        flex: 1;
        min-width: calc(50% - 0.25rem);
      }
    }
  }
}
</style>
