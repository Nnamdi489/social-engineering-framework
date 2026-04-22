<template>
  <div v-if="visible" class="training-modal-overlay" @click="closeModal">
    <div class="training-modal" @click.stop>
      <div class="modal-header">
        <div class="training-info">
          <h2>{{ currentModule.title }}</h2>
          <div class="progress-indicator">
            <div class="progress-bar">
              <div class="progress-fill" :style="{ width: progressPercentage + '%' }"></div>
            </div>
            <span class="progress-text">{{ currentStep + 1 }} / {{ totalSteps }}</span>
          </div>
        </div>
        <button @click="closeModal" class="close-btn">×</button>
      </div>
      
      <div class="modal-body">
        <!-- Introduction Step -->
        <div v-if="currentStep === 0" class="training-step intro-step">
          <div class="step-icon">🎓</div>
          <h3>Welcome to {{ currentModule.title }}</h3>
          <p>{{ currentModule.description }}</p>
          
          <div class="module-overview">
            <div class="overview-item">
              <span class="overview-icon">⏱️</span>
              <span>Duration: {{ currentModule.duration }}</span>
            </div>
            <div class="overview-item">
              <span class="overview-icon">📊</span>
              <span>Difficulty: {{ currentModule.difficulty }}</span>
            </div>
            <div class="overview-item">
              <span class="overview-icon">🎯</span>
              <span>{{ currentModule.objectives.length }} Learning Objectives</span>
            </div>
          </div>
          
          <div class="learning-objectives">
            <h4>What you'll learn:</h4>
            <ul>
              <li v-for="objective in currentModule.objectives" :key="objective">{{ objective }}</li>
            </ul>
          </div>
        </div>
        
        <!-- Content Steps -->
        <div v-else-if="currentStep <= contentSteps.length" class="training-step content-step">
          <div class="step-content">
            <div class="content-header">
              <div class="step-icon">{{ currentContentStep.icon }}</div>
              <h3>{{ currentContentStep.title }}</h3>
            </div>
            
            <div class="content-body">
              <div v-if="currentContentStep.type === 'lesson'" class="lesson-content">
                <p>{{ currentContentStep.content }}</p>
                
                <div v-if="currentContentStep.example" class="example-box">
                  <h5>💡 Example:</h5>
                  <div class="example-content">{{ currentContentStep.example }}</div>
                </div>
                
                <div v-if="currentContentStep.tips" class="tips-box">
                  <h5>🔑 Key Tips:</h5>
                  <ul>
                    <li v-for="tip in currentContentStep.tips" :key="tip">{{ tip }}</li>
                  </ul>
                </div>
              </div>
              
              <div v-else-if="currentContentStep.type === 'quiz'" class="quiz-content">
                <p class="quiz-question">{{ currentContentStep.question }}</p>
                
                <div class="quiz-options">
                  <div 
                    v-for="(option, index) in currentContentStep.options" 
                    :key="index"
                    class="quiz-option"
                    :class="{ 
                      selected: selectedAnswer === index,
                      correct: showAnswer && index === currentContentStep.correct,
                      incorrect: showAnswer && selectedAnswer === index && index !== currentContentStep.correct
                    }"
                    @click="selectAnswer(index)"
                  >
                    <div class="option-letter">{{ String.fromCharCode(65 + index) }}</div>
                    <div class="option-text">{{ option }}</div>
                    <div v-if="showAnswer && index === currentContentStep.correct" class="option-indicator">✓</div>
                    <div v-else-if="showAnswer && selectedAnswer === index && index !== currentContentStep.correct" class="option-indicator">✗</div>
                  </div>
                </div>
                
                <div v-if="showAnswer" class="quiz-explanation">
                  <div class="explanation-header">
                    <span v-if="selectedAnswer === currentContentStep.correct" class="correct-badge">✅ Correct!</span>
                    <span v-else class="incorrect-badge">❌ Incorrect</span>
                  </div>
                  <p>{{ currentContentStep.explanation }}</p>
                </div>
              </div>
              
              <div v-else-if="currentContentStep.type === 'scenario'" class="scenario-content">
                <div class="scenario-setup">
                  <h5>🎭 Scenario:</h5>
                  <p>{{ currentContentStep.scenario }}</p>
                </div>
                
                <div class="scenario-question">
                  <h5>🤔 What would you do?</h5>
                  <p>{{ currentContentStep.question }}</p>
                </div>
                
                <div class="scenario-actions">
                  <div 
                    v-for="(action, index) in currentContentStep.actions" 
                    :key="index"
                    class="scenario-action"
                    :class="{ 
                      selected: selectedAction === index,
                      best: showScenarioResult && index === currentContentStep.bestAction,
                      poor: showScenarioResult && selectedAction === index && index !== currentContentStep.bestAction
                    }"
                    @click="selectAction(index)"
                  >
                    <div class="action-text">{{ action.text }}</div>
                    <div v-if="showScenarioResult" class="action-result">
                      <div class="result-rating" :class="action.rating">{{ action.rating.toUpperCase() }}</div>
                      <div class="result-explanation">{{ action.explanation }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Completion Step -->
        <div v-else class="training-step completion-step">
          <div class="completion-content">
            <div class="completion-icon">🎉</div>
            <h3>Training Complete!</h3>
            <p>Congratulations! You've successfully completed {{ currentModule.title }}.</p>
            
            <div class="completion-stats">
              <div class="stat-item">
                <div class="stat-value">{{ Math.round(score) }}%</div>
                <div class="stat-label">Final Score</div>
              </div>
              <div class="stat-item">
                <div class="stat-value">{{ correctAnswers }}</div>
                <div class="stat-label">Correct Answers</div>
              </div>
              <div class="stat-item">
                <div class="stat-value">{{ totalQuestions }}</div>
                <div class="stat-label">Total Questions</div>
              </div>
            </div>
            
            <div class="certificate-preview">
              <h4>🏆 Certificate Earned</h4>
              <div class="certificate-card">
                <div class="certificate-header">Certificate of Completion</div>
                <div class="certificate-title">{{ currentModule.title }}</div>
                <div class="certificate-score">Score: {{ Math.round(score) }}%</div>
                <div class="certificate-id">ID: {{ certificateId }}</div>
              </div>
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
            @click="completeTraining" 
            class="btn btn-success"
          >
            🎓 Complete Training
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InteractiveTrainingModal',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    module: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      currentStep: 0,
      selectedAnswer: null,
      selectedAction: null,
      showAnswer: false,
      showScenarioResult: false,
      correctAnswers: 0,
      totalQuestions: 0,
      score: 0,
      certificateId: '',
      contentSteps: []
    }
  },
  computed: {
    currentModule() {
      return this.module || {}
    },
    totalSteps() {
      return this.contentSteps.length + 2 // intro + content + completion
    },
    progressPercentage() {
      return Math.round((this.currentStep / (this.totalSteps - 1)) * 100)
    },
    currentContentStep() {
      if (this.currentStep === 0 || this.currentStep > this.contentSteps.length) {
        return null
      }
      return this.contentSteps[this.currentStep - 1]
    },
    canProceed() {
      if (this.currentStep === 0) return true
      
      const step = this.currentContentStep
      if (!step) return true
      
      if (step.type === 'quiz') {
        return this.showAnswer
      }
      
      if (step.type === 'scenario') {
        return this.showScenarioResult
      }
      
      return true
    }
  },
  watch: {
    visible(newVal) {
      if (newVal) {
        this.initializeTraining()
      }
    }
  },
  methods: {
    initializeTraining() {
      this.currentStep = 0
      this.selectedAnswer = null
      this.selectedAction = null
      this.showAnswer = false
      this.showScenarioResult = false
      this.correctAnswers = 0
      this.totalQuestions = 0
      this.score = 0
      this.certificateId = `CERT-${Date.now()}`
      
      this.generateContentSteps()
    },
    
    generateContentSteps() {
      // Generate training content based on module
      this.contentSteps = this.getModuleContent(this.currentModule.id)
      this.totalQuestions = this.contentSteps.filter(step => step.type === 'quiz' || step.type === 'scenario').length
    },
    
    getModuleContent(moduleId) {
      const content = {
        'phishing-awareness': [
          {
            type: 'lesson',
            icon: '📧',
            title: 'Understanding Phishing Attacks',
            content: 'Phishing is a cyber attack that uses fraudulent emails to trick people into revealing sensitive information. These attacks have become increasingly sophisticated and can be difficult to detect.',
            example: 'A typical phishing email might appear to come from your bank, asking you to "verify your account" by clicking a link that leads to a fake website designed to steal your credentials.',
            tips: [
              'Always check the sender\'s email address carefully',
              'Look for spelling and grammar mistakes',
              'Be suspicious of urgent or threatening language',
              'Hover over links to see the real destination'
            ]
          },
          {
            type: 'quiz',
            icon: '❓',
            title: 'Knowledge Check: Email Verification',
            question: 'You receive an email claiming to be from your bank asking you to verify your account immediately. What should you do first?',
            options: [
              'Click the link in the email to verify quickly',
              'Reply to the email asking for more information',
              'Call your bank using the number on your bank card',
              'Forward the email to your colleagues for advice'
            ],
            correct: 2,
            explanation: 'Always verify suspicious requests through an independent communication channel. Use the official phone number from your bank card or statement, not any number provided in the email.'
          },
          {
            type: 'scenario',
            icon: '🎭',
            title: 'Real-World Scenario',
            scenario: 'You receive an email that appears to be from your company\'s IT department. The email says there\'s been a security breach and you need to change your password immediately by clicking the provided link. The email looks professional and uses your company\'s logo.',
            question: 'How would you respond to this situation?',
            actions: [
              {
                text: 'Click the link immediately to secure my account',
                rating: 'poor',
                explanation: 'This is risky. Even if the email looks legitimate, clicking unknown links can lead to credential theft or malware installation.'
              },
              {
                text: 'Contact IT department directly to verify the request',
                rating: 'excellent',
                explanation: 'Perfect! Always verify suspicious requests through official channels. This is the safest approach to confirm if the request is legitimate.'
              },
              {
                text: 'Delete the email and ignore it',
                rating: 'fair',
                explanation: 'While deleting suspicious emails is good, you should also report it to your IT security team so they can warn others and investigate.'
              },
              {
                text: 'Forward the email to colleagues to ask their opinion',
                rating: 'poor',
                explanation: 'This could spread the phishing attempt to more people. Instead, contact your IT security team directly.'
              }
            ],
            bestAction: 1
          }
        ],
        'social-engineering-tactics': [
          {
            type: 'lesson',
            icon: '🧠',
            title: 'Psychology of Social Engineering',
            content: 'Social engineering exploits human psychology rather than technical vulnerabilities. Attackers use psychological triggers like authority, urgency, fear, and trust to manipulate victims into making poor security decisions.',
            example: 'An attacker might call pretending to be from IT support, claiming there\'s an urgent security issue that requires your immediate password to fix. They create urgency and authority to pressure you into compliance.',
            tips: [
              'Be skeptical of unsolicited contact',
              'Verify the identity of anyone requesting sensitive information',
              'Take time to think - don\'t let urgency pressure you',
              'When in doubt, consult with security team'
            ]
          },
          {
            type: 'quiz',
            icon: '❓',
            title: 'Knowledge Check: Authority Tactics',
            question: 'Someone calls claiming to be the new CEO and needs your login credentials for an urgent audit. What psychological tactic are they using?',
            options: [
              'Fear-based manipulation',
              'Authority exploitation',
              'Social proof pressure',
              'Reciprocity principle'
            ],
            correct: 1,
            explanation: 'This is authority exploitation - the attacker is claiming to be in a position of power (CEO) to pressure you into compliance. Always verify such claims through official channels.'
          }
        ]
      }
      
      return content[moduleId] || [
        {
          type: 'lesson',
          icon: '📚',
          title: 'Training Content',
          content: 'This training module will help you understand important security concepts and best practices.',
          tips: ['Stay alert', 'Think before you act', 'When in doubt, ask for help']
        }
      ]
    },
    
    nextStep() {
      if (this.canProceed) {
        this.currentStep++
        this.resetStepState()
      }
    },
    
    previousStep() {
      if (this.currentStep > 0) {
        this.currentStep--
        this.resetStepState()
      }
    },
    
    resetStepState() {
      this.selectedAnswer = null
      this.selectedAction = null
      this.showAnswer = false
      this.showScenarioResult = false
    },
    
    selectAnswer(index) {
      if (this.showAnswer) return
      
      this.selectedAnswer = index
      this.showAnswer = true
      
      if (index === this.currentContentStep.correct) {
        this.correctAnswers++
      }
    },
    
    selectAction(index) {
      if (this.showScenarioResult) return
      
      this.selectedAction = index
      this.showScenarioResult = true
      
      if (index === this.currentContentStep.bestAction) {
        this.correctAnswers++
      }
    },
    
    getNextButtonText() {
      const step = this.currentContentStep
      if (!step) return 'Next'
      
      if (step.type === 'quiz' && !this.showAnswer) {
        return 'Select an answer first'
      }
      
      if (step.type === 'scenario' && !this.showScenarioResult) {
        return 'Choose your response'
      }
      
      return 'Next →'
    },
    
    completeTraining() {
      this.score = this.totalQuestions > 0 ? (this.correctAnswers / this.totalQuestions) * 100 : 100
      this.currentStep = this.totalSteps - 1
      
      // Save completion data
      const completionData = {
        moduleId: this.currentModule.id,
        moduleName: this.currentModule.title,
        completedAt: new Date().toLocaleString(),
        score: Math.round(this.score),
        certificateId: this.certificateId,
        correctAnswers: this.correctAnswers,
        totalQuestions: this.totalQuestions
      }
      
      this.$emit('training-completed', completionData)
    },
    
    closeModal() {
      if (this.currentStep === this.totalSteps - 1) {
        // Training completed
        this.$emit('close')
      } else {
        // Training in progress
        if (confirm('Are you sure you want to exit the training? Your progress will be lost.')) {
          this.$emit('close')
        }
      }
    }
  },
  
  emits: ['close', 'training-completed']
}
</script>

<style lang="scss" scoped>
.training-modal-overlay {
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

.training-modal {
  background: white;
  border-radius: 0.5rem;
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid var(--border-color);
  background: var(--light-color);
  border-radius: 0.5rem 0.5rem 0 0;
  
  .training-info {
    flex: 1;
    
    h2 {
      margin: 0 0 1rem 0;
      color: var(--primary-color);
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

.training-step {
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

.intro-step {
  text-align: center;
  
  .module-overview {
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin: 2rem 0;
    flex-wrap: wrap;
    
    .overview-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background: var(--light-color);
      padding: 0.75rem 1rem;
      border-radius: 0.5rem;
      
      .overview-icon {
        font-size: 1.25rem;
      }
    }
  }
  
  .learning-objectives {
    text-align: left;
    background: var(--light-color);
    padding: 1.5rem;
    border-radius: 0.5rem;
    margin-top: 2rem;
    
    h4 {
      color: var(--secondary-color);
      margin-bottom: 1rem;
    }
    
    ul {
      margin: 0;
      padding-left: 1.5rem;
      
      li {
        margin-bottom: 0.5rem;
        line-height: 1.5;
      }
    }
  }
}

.content-step {
  .content-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2rem;
    
    .step-icon {
      font-size: 2rem;
      margin: 0;
    }
    
    h3 {
      margin: 0;
      text-align: left;
    }
  }
  
  .lesson-content {
    p {
      line-height: 1.6;
      margin-bottom: 1.5rem;
    }
    
    .example-box,
    .tips-box {
      background: var(--light-color);
      padding: 1.5rem;
      border-radius: 0.5rem;
      margin: 1.5rem 0;
      
      h5 {
        color: var(--secondary-color);
        margin: 0 0 1rem 0;
      }
      
      .example-content {
        font-style: italic;
        color: #666;
        padding: 1rem;
        background: white;
        border-radius: 0.25rem;
        border-left: 4px solid var(--warning-color);
      }
      
      ul {
        margin: 0;
        padding-left: 1.5rem;
        
        li {
          margin-bottom: 0.5rem;
          line-height: 1.5;
        }
      }
    }
  }
  
  .quiz-content {
    .quiz-question {
      font-size: 1.1rem;
      font-weight: 500;
      color: var(--primary-color);
      margin-bottom: 1.5rem;
      padding: 1rem;
      background: var(--light-color);
      border-radius: 0.5rem;
    }
    
    .quiz-options {
      .quiz-option {
        display: flex;
        align-items: center;
        padding: 1rem;
        margin-bottom: 0.5rem;
        border: 2px solid var(--border-color);
        border-radius: 0.5rem;
        cursor: pointer;
        transition: all 0.3s ease;
        
        &:hover {
          border-color: var(--primary-color);
          background: rgba(52, 152, 219, 0.05);
        }
        
        &.selected {
          border-color: var(--primary-color);
          background: rgba(52, 152, 219, 0.1);
        }
        
        &.correct {
          border-color: var(--success-color);
          background: rgba(39, 174, 96, 0.1);
        }
        
        &.incorrect {
          border-color: var(--danger-color);
          background: rgba(231, 76, 60, 0.1);
        }
        
        .option-letter {
          background: var(--primary-color);
          color: white;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          margin-right: 1rem;
          flex-shrink: 0;
        }
        
        .option-text {
          flex: 1;
        }
        
        .option-indicator {
          font-size: 1.5rem;
          font-weight: bold;
        }
      }
    }
    
    .quiz-explanation {
      margin-top: 1.5rem;
      padding: 1.5rem;
      background: var(--light-color);
      border-radius: 0.5rem;
      
      .explanation-header {
        margin-bottom: 1rem;
        
        .correct-badge {
          background: var(--success-color);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 1rem;
          font-weight: bold;
        }
        
        .incorrect-badge {
          background: var(--danger-color);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 1rem;
          font-weight: bold;
        }
      }
      
      p {
        margin: 0;
        line-height: 1.6;
      }
    }
  }
  
  .scenario-content {
    .scenario-setup,
    .scenario-question {
      background: var(--light-color);
      padding: 1.5rem;
      border-radius: 0.5rem;
      margin-bottom: 1.5rem;
      
      h5 {
        color: var(--secondary-color);
        margin: 0 0 1rem 0;
      }
      
      p {
        margin: 0;
        line-height: 1.6;
      }
    }
    
    .scenario-actions {
      .scenario-action {
        border: 2px solid var(--border-color);
        border-radius: 0.5rem;
        margin-bottom: 1rem;
        cursor: pointer;
        transition: all 0.3s ease;
        
        &:hover {
          border-color: var(--primary-color);
        }
        
        &.selected {
          border-color: var(--primary-color);
          background: rgba(52, 152, 219, 0.05);
        }
        
        &.best {
          border-color: var(--success-color);
          background: rgba(39, 174, 96, 0.1);
        }
        
        &.poor {
          border-color: var(--danger-color);
          background: rgba(231, 76, 60, 0.1);
        }
        
        .action-text {
          padding: 1rem;
          font-weight: 500;
        }
        
        .action-result {
          padding: 0 1rem 1rem 1rem;
          border-top: 1px solid var(--border-color);
          
          .result-rating {
            display: inline-block;
            padding: 0.25rem 0.75rem;
            border-radius: 1rem;
            font-size: 0.8rem;
            font-weight: bold;
            margin-bottom: 0.5rem;
            
            &.excellent {
              background: var(--success-color);
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
          
          .result-explanation {
            font-size: 0.9rem;
            color: #666;
            line-height: 1.5;
          }
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
  
  .certificate-preview {
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
      max-width: 400px;
      margin: 0 auto;
      
      .certificate-header {
        font-size: 1.25rem;
        font-weight: bold;
        margin-bottom: 1rem;
      }
      
      .certificate-title {
        font-size: 1.1rem;
        margin-bottom: 1rem;
      }
      
      .certificate-score,
      .certificate-id {
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
  .footer-right {
    display: flex;
    gap: 1rem;
  }
}

@media (max-width: 768px) {
  .training-modal-overlay {
    padding: 1rem;
  }
  
  .training-modal {
    max-height: 95vh;
  }
  
  .modal-body {
    padding: 1rem;
  }
  
  .module-overview {
    flex-direction: column;
    align-items: center;
  }
  
  .completion-stats {
    flex-direction: column;
    align-items: center;
  }
}
</style>
