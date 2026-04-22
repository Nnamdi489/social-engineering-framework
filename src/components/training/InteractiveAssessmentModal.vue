<template>
  <div v-if="visible" class="assessment-modal-overlay" @click="closeModal">
    <div class="assessment-modal" @click.stop>
      <div class="modal-header">
        <div class="assessment-info">
          <h2>🎯 Security Knowledge Assessment</h2>
          <div class="progress-indicator">
            <div class="progress-bar">
              <div class="progress-fill" :style="{ width: progressPercentage + '%' }"></div>
            </div>
            <span class="progress-text">{{ currentQuestionIndex + 1 }} / {{ questions.length }}</span>
          </div>
        </div>
        <button @click="closeModal" class="close-btn">×</button>
      </div>
      
      <div class="modal-body">
        <!-- Assessment Introduction -->
        <div v-if="!assessmentStarted && !assessmentCompleted" class="assessment-intro">
          <div class="intro-icon">📊</div>
          <h3>Ready to Test Your Knowledge?</h3>
          <p>This assessment will evaluate your understanding of social engineering defense concepts.</p>
          
          <div class="assessment-details">
            <div class="detail-item">
              <span class="detail-icon">❓</span>
              <span>{{ questions.length }} Questions</span>
            </div>
            <div class="detail-item">
              <span class="detail-icon">⏱️</span>
              <span>30 minutes</span>
            </div>
            <div class="detail-item">
              <span class="detail-icon">🎯</span>
              <span>80% to pass</span>
            </div>
          </div>
          
          <div class="assessment-rules">
            <h4>Assessment Rules:</h4>
            <ul>
              <li>Answer all questions to the best of your ability</li>
              <li>You cannot go back to previous questions</li>
              <li>Take your time - there's no rush</li>
              <li>You'll receive immediate feedback on completion</li>
            </ul>
          </div>
        </div>
        
        <!-- Assessment Questions -->
        <div v-else-if="assessmentStarted && !assessmentCompleted" class="assessment-question">
          <div class="question-header">
            <div class="question-number">Question {{ currentQuestionIndex + 1 }}</div>
            <div class="time-remaining" v-if="timeRemaining > 0">
              ⏱️ {{ Math.floor(timeRemaining / 60) }}:{{ String(timeRemaining % 60).padStart(2, '0') }}
            </div>
          </div>
          
          <div class="question-content">
            <h3>{{ currentQuestion.question }}</h3>
            
            <div v-if="currentQuestion.scenario" class="question-scenario">
              <h4>📋 Scenario:</h4>
              <p>{{ currentQuestion.scenario }}</p>
            </div>
            
            <div class="answer-options">
              <div 
                v-for="(option, index) in currentQuestion.options" 
                :key="index"
                class="answer-option"
                :class="{ selected: selectedAnswer === index }"
                @click="selectAnswer(index)"
              >
                <div class="option-letter">{{ String.fromCharCode(65 + index) }}</div>
                <div class="option-text">{{ option }}</div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Assessment Results -->
        <div v-else-if="assessmentCompleted" class="assessment-results">
          <div class="results-icon">
            <span v-if="passed">🎉</span>
            <span v-else>📚</span>
          </div>
          
          <h3 v-if="passed">Congratulations! You Passed!</h3>
          <h3 v-else>Assessment Complete</h3>
          
          <div class="score-display">
            <div class="score-circle" :class="{ passed: passed }">
              <div class="score-value">{{ finalScore }}%</div>
              <div class="score-label">Final Score</div>
            </div>
          </div>
          
          <div class="results-breakdown">
            <div class="breakdown-item">
              <div class="breakdown-value">{{ correctAnswers }}</div>
              <div class="breakdown-label">Correct</div>
            </div>
            <div class="breakdown-item">
              <div class="breakdown-value">{{ questions.length - correctAnswers }}</div>
              <div class="breakdown-label">Incorrect</div>
            </div>
            <div class="breakdown-item">
              <div class="breakdown-value">{{ questions.length }}</div>
              <div class="breakdown-label">Total</div>
            </div>
          </div>
          
          <div class="performance-feedback">
            <h4>📈 Performance Analysis</h4>
            <div class="feedback-content">
              <div v-if="passed" class="success-feedback">
                <p>Excellent work! You've demonstrated strong understanding of social engineering defense concepts.</p>
                <div class="strengths">
                  <h5>✅ Your Strengths:</h5>
                  <ul>
                    <li v-for="strength in getStrengths()" :key="strength">{{ strength }}</li>
                  </ul>
                </div>
              </div>
              
              <div v-else class="improvement-feedback">
                <p>You're on the right track, but there's room for improvement. Consider reviewing the training materials.</p>
                <div class="areas-to-improve">
                  <h5>📚 Areas to Focus On:</h5>
                  <ul>
                    <li v-for="area in getImprovementAreas()" :key="area">{{ area }}</li>
                  </ul>
                </div>
              </div>
              
              <div class="next-steps">
                <h5>🎯 Recommended Next Steps:</h5>
                <ul>
                  <li v-for="step in getNextSteps()" :key="step">{{ step }}</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div class="certificate-info" v-if="passed">
            <h4>🏆 Certificate Information</h4>
            <div class="certificate-details">
              <p><strong>Certificate ID:</strong> {{ certificateId }}</p>
              <p><strong>Issued:</strong> {{ completionDate }}</p>
              <p><strong>Valid Until:</strong> {{ expirationDate }}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="modal-footer">
        <div class="footer-left">
          <button v-if="assessmentStarted && !assessmentCompleted" @click="skipQuestion" class="btn btn-secondary">
            Skip Question
          </button>
        </div>
        
        <div class="footer-right">
          <button 
            v-if="!assessmentStarted && !assessmentCompleted" 
            @click="startAssessment" 
            class="btn btn-primary"
          >
            🚀 Start Assessment
          </button>
          
          <button 
            v-else-if="assessmentStarted && !assessmentCompleted" 
            @click="nextQuestion" 
            class="btn btn-primary"
            :disabled="selectedAnswer === null"
          >
            {{ currentQuestionIndex === questions.length - 1 ? 'Finish Assessment' : 'Next Question' }}
          </button>
          
          <button 
            v-else-if="assessmentCompleted" 
            @click="closeAssessment" 
            class="btn btn-success"
          >
            {{ passed ? '🎉 View Certificate' : '📚 Review Training' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InteractiveAssessmentModal',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      assessmentStarted: false,
      assessmentCompleted: false,
      currentQuestionIndex: 0,
      selectedAnswer: null,
      userAnswers: [],
      correctAnswers: 0,
      finalScore: 0,
      passed: false,
      certificateId: '',
      completionDate: '',
      expirationDate: '',
      timeRemaining: 1800, // 30 minutes in seconds
      timer: null,
      questions: [
        {
          question: "What is the most effective way to verify a suspicious email requesting sensitive information?",
          options: [
            "Reply to the email asking for verification",
            "Call the sender using a number from the email",
            "Contact the sender through an independent, known communication channel",
            "Forward the email to colleagues for their opinion"
          ],
          correct: 2,
          category: "email-security"
        },
        {
          question: "Which of these is a common red flag in phishing emails?",
          options: [
            "Personalized greeting with your name",
            "Professional company logo and formatting",
            "Urgent language demanding immediate action",
            "Links to the company's official website"
          ],
          correct: 2,
          category: "phishing-recognition"
        },
        {
          question: "Someone calls claiming to be from IT and asks for your password to fix a security issue. What should you do?",
          scenario: "You receive a call from someone claiming to be from your company's IT department. They say there's been a security breach and they need your password immediately to secure your account.",
          options: [
            "Provide the password since it's an emergency",
            "Ask them to call back later when you're less busy",
            "Hang up and call IT using the official company number",
            "Give them a fake password to test if they're legitimate"
          ],
          correct: 2,
          category: "social-engineering"
        },
        {
          question: "What is the principle of 'least privilege' in cybersecurity?",
          options: [
            "Users should have the minimum access necessary to perform their job",
            "Only privileged users should have access to security systems",
            "All users should have equal access to company resources",
            "Access should be granted based on seniority in the company"
          ],
          correct: 0,
          category: "access-control"
        },
        {
          question: "If you accidentally click on a suspicious link, what should be your immediate response?",
          options: [
            "Continue browsing to see what happens",
            "Close the browser and run a security scan",
            "Clear your browser history to hide the mistake",
            "Restart your computer immediately"
          ],
          correct: 1,
          category: "incident-response"
        },
        {
          question: "What makes a strong password?",
          options: [
            "Using personal information like birthdays",
            "A combination of uppercase, lowercase, numbers, and symbols",
            "Using the same password for all accounts",
            "Making it short so you can remember it easily"
          ],
          correct: 1,
          category: "password-security"
        },
        {
          question: "What is 'pretexting' in social engineering?",
          options: [
            "Sending fake text messages",
            "Creating a fabricated scenario to extract information",
            "Using technical jargon to confuse victims",
            "Pretending to be busy to avoid security questions"
          ],
          correct: 1,
          category: "social-engineering"
        },
        {
          question: "How often should security awareness training be conducted?",
          options: [
            "Once when employees are hired",
            "Only when there's a security incident",
            "Annually with regular updates and simulations",
            "Only for IT and security staff"
          ],
          correct: 2,
          category: "training"
        },
        {
          question: "What should you do if you receive an unexpected USB drive in the mail?",
          options: [
            "Plug it in to see what's on it",
            "Give it to a colleague to check first",
            "Report it to security and do not use it",
            "Use it only on a personal computer"
          ],
          correct: 2,
          category: "physical-security"
        },
        {
          question: "What is the purpose of multi-factor authentication (MFA)?",
          options: [
            "To make logging in more complicated",
            "To provide multiple layers of security verification",
            "To replace the need for passwords entirely",
            "To track user login activities"
          ],
          correct: 1,
          category: "authentication"
        }
      ]
    }
  },
  computed: {
    currentQuestion() {
      return this.questions[this.currentQuestionIndex] || {}
    },
    progressPercentage() {
      if (!this.assessmentStarted) return 0
      return Math.round(((this.currentQuestionIndex + 1) / this.questions.length) * 100)
    }
  },
  watch: {
    visible(newVal) {
      if (newVal) {
        this.resetAssessment()
      } else {
        this.stopTimer()
      }
    }
  },
  methods: {
    resetAssessment() {
      this.assessmentStarted = false
      this.assessmentCompleted = false
      this.currentQuestionIndex = 0
      this.selectedAnswer = null
      this.userAnswers = []
      this.correctAnswers = 0
      this.finalScore = 0
      this.passed = false
      this.timeRemaining = 1800
      this.certificateId = `CERT-ASSESS-${Date.now()}`
      this.completionDate = new Date().toLocaleString()
      
      // Set expiration date to 1 year from now
      const expDate = new Date()
      expDate.setFullYear(expDate.getFullYear() + 1)
      this.expirationDate = expDate.toLocaleDateString()
    },
    
    startAssessment() {
      this.assessmentStarted = true
      this.startTimer()
    },
    
    startTimer() {
      this.timer = setInterval(() => {
        this.timeRemaining--
        if (this.timeRemaining <= 0) {
          this.completeAssessment()
        }
      }, 1000)
    },
    
    stopTimer() {
      if (this.timer) {
        clearInterval(this.timer)
        this.timer = null
      }
    },
    
    selectAnswer(index) {
      this.selectedAnswer = index
    },
    
    nextQuestion() {
      // Record the answer
      this.userAnswers.push({
        questionIndex: this.currentQuestionIndex,
        selectedAnswer: this.selectedAnswer,
        correct: this.selectedAnswer === this.currentQuestion.correct
      })
      
      if (this.selectedAnswer === this.currentQuestion.correct) {
        this.correctAnswers++
      }
      
      // Move to next question or complete assessment
      if (this.currentQuestionIndex < this.questions.length - 1) {
        this.currentQuestionIndex++
        this.selectedAnswer = null
      } else {
        this.completeAssessment()
      }
    },
    
    skipQuestion() {
      // Record as incorrect
      this.userAnswers.push({
        questionIndex: this.currentQuestionIndex,
        selectedAnswer: null,
        correct: false
      })
      
      // Move to next question or complete assessment
      if (this.currentQuestionIndex < this.questions.length - 1) {
        this.currentQuestionIndex++
        this.selectedAnswer = null
      } else {
        this.completeAssessment()
      }
    },
    
    completeAssessment() {
      this.stopTimer()
      this.assessmentCompleted = true
      this.finalScore = Math.round((this.correctAnswers / this.questions.length) * 100)
      this.passed = this.finalScore >= 80
      
      // Emit completion event
      this.$emit('assessment-completed', {
        id: this.certificateId,
        type: 'Security Knowledge Assessment',
        score: this.finalScore,
        correctAnswers: this.correctAnswers,
        totalQuestions: this.questions.length,
        passed: this.passed,
        completedAt: this.completionDate,
        timeSpent: 1800 - this.timeRemaining,
        answers: this.userAnswers
      })
    },
    
    getStrengths() {
      const strengths = []
      const categories = {}
      
      // Analyze performance by category
      this.userAnswers.forEach(answer => {
        const question = this.questions[answer.questionIndex]
        if (!categories[question.category]) {
          categories[question.category] = { correct: 0, total: 0 }
        }
        categories[question.category].total++
        if (answer.correct) {
          categories[question.category].correct++
        }
      })
      
      // Identify strong areas (>80% correct)
      Object.keys(categories).forEach(category => {
        const performance = categories[category].correct / categories[category].total
        if (performance > 0.8) {
          strengths.push(this.getCategoryName(category))
        }
      })
      
      return strengths.length > 0 ? strengths : ['Strong overall security awareness']
    },
    
    getImprovementAreas() {
      const areas = []
      const categories = {}
      
      // Analyze performance by category
      this.userAnswers.forEach(answer => {
        const question = this.questions[answer.questionIndex]
        if (!categories[question.category]) {
          categories[question.category] = { correct: 0, total: 0 }
        }
        categories[question.category].total++
        if (answer.correct) {
          categories[question.category].correct++
        }
      })
      
      // Identify weak areas (<70% correct)
      Object.keys(categories).forEach(category => {
        const performance = categories[category].correct / categories[category].total
        if (performance < 0.7) {
          areas.push(this.getCategoryName(category))
        }
      })
      
      return areas.length > 0 ? areas : ['Review all training materials for better understanding']
    },
    
    getNextSteps() {
      const steps = []
      
      if (this.passed) {
        steps.push('Continue with advanced security training modules')
        steps.push('Share your knowledge with colleagues')
        steps.push('Stay updated on latest security threats')
      } else {
        steps.push('Review the security awareness training materials')
        steps.push('Practice with additional simulation exercises')
        steps.push('Retake the assessment after studying')
        steps.push('Consult with security team for additional guidance')
      }
      
      return steps
    },
    
    getCategoryName(category) {
      const names = {
        'email-security': 'Email Security',
        'phishing-recognition': 'Phishing Recognition',
        'social-engineering': 'Social Engineering Defense',
        'access-control': 'Access Control',
        'incident-response': 'Incident Response',
        'password-security': 'Password Security',
        'training': 'Security Training',
        'physical-security': 'Physical Security',
        'authentication': 'Authentication'
      }
      return names[category] || category
    },
    
    closeAssessment() {
      this.$emit('close')
    },
    
    closeModal() {
      if (this.assessmentStarted && !this.assessmentCompleted) {
        if (confirm('Are you sure you want to exit the assessment? Your progress will be lost.')) {
          this.stopTimer()
          this.$emit('close')
        }
      } else {
        this.$emit('close')
      }
    }
  },
  
  emits: ['close', 'assessment-completed']
}
</script>

<style lang="scss" scoped>
// Similar styles to InteractiveTrainingModal but with assessment-specific styling
.assessment-modal-overlay {
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

.assessment-modal {
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
  
  .assessment-info {
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
          background: linear-gradient(90deg, var(--warning-color), var(--success-color));
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

.assessment-intro {
  text-align: center;
  
  .intro-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
  }
  
  h3 {
    color: var(--primary-color);
    margin-bottom: 1rem;
  }
  
  p {
    font-size: 1.1rem;
    color: #666;
    margin-bottom: 2rem;
  }
  
  .assessment-details {
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin: 2rem 0;
    flex-wrap: wrap;
    
    .detail-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background: var(--light-color);
      padding: 1rem 1.5rem;
      border-radius: 0.5rem;
      
      .detail-icon {
        font-size: 1.25rem;
      }
    }
  }
  
  .assessment-rules {
    text-align: left;
    background: rgba(52, 152, 219, 0.1);
    padding: 1.5rem;
    border-radius: 0.5rem;
    border-left: 4px solid var(--primary-color);
    
    h4 {
      color: var(--primary-color);
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

.assessment-question {
  .question-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    padding: 1rem;
    background: var(--light-color);
    border-radius: 0.5rem;
    
    .question-number {
      font-weight: bold;
      color: var(--primary-color);
      font-size: 1.1rem;
    }
    
    .time-remaining {
      color: var(--warning-color);
      font-weight: bold;
    }
  }
  
  .question-content {
    h3 {
      color: var(--primary-color);
      margin-bottom: 1.5rem;
      line-height: 1.4;
    }
    
    .question-scenario {
      background: rgba(155, 89, 182, 0.1);
      padding: 1.5rem;
      border-radius: 0.5rem;
      margin-bottom: 2rem;
      border-left: 4px solid #9b59b6;
      
      h4 {
        color: #9b59b6;
        margin-bottom: 1rem;
      }
      
      p {
        margin: 0;
        line-height: 1.6;
        font-style: italic;
      }
    }
    
    .answer-options {
      .answer-option {
        display: flex;
        align-items: center;
        padding: 1rem;
        margin-bottom: 0.75rem;
        border: 2px solid var(--border-color);
        border-radius: 0.5rem;
        cursor: pointer;
        transition: all 0.3s ease;
        
        &:hover {
          border-color: var(--warning-color);
          background: rgba(243, 156, 18, 0.05);
        }
        
        &.selected {
          border-color: var(--warning-color);
          background: rgba(243, 156, 18, 0.1);
        }
        
        .option-letter {
          background: var(--warning-color);
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
          line-height: 1.5;
        }
      }
    }
  }
}

.assessment-results {
  text-align: center;
  
  .results-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
  }
  
  h3 {
    color: var(--primary-color);
    margin-bottom: 2rem;
  }
  
  .score-display {
    margin: 2rem 0;
    
    .score-circle {
      display: inline-flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 150px;
      height: 150px;
      border-radius: 50%;
      background: var(--danger-color);
      color: white;
      
      &.passed {
        background: var(--success-color);
      }
      
      .score-value {
        font-size: 2.5rem;
        font-weight: bold;
        margin-bottom: 0.25rem;
      }
      
      .score-label {
        font-size: 0.9rem;
        opacity: 0.9;
      }
    }
  }
  
  .results-breakdown {
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin: 2rem 0;
    flex-wrap: wrap;
    
    .breakdown-item {
      background: var(--light-color);
      padding: 1.5rem;
      border-radius: 0.5rem;
      min-width: 100px;
      
      .breakdown-value {
        font-size: 2rem;
        font-weight: bold;
        color: var(--primary-color);
        margin-bottom: 0.5rem;
      }
      
      .breakdown-label {
        color: #666;
        font-size: 0.9rem;
      }
    }
  }
  
  .performance-feedback {
    text-align: left;
    background: var(--light-color);
    padding: 2rem;
    border-radius: 0.5rem;
    margin: 2rem 0;
    
    h4 {
      color: var(--primary-color);
      margin-bottom: 1rem;
    }
    
    .success-feedback,
    .improvement-feedback {
      margin-bottom: 1.5rem;
      
      p {
        margin-bottom: 1rem;
        line-height: 1.6;
      }
      
      .strengths,
      .areas-to-improve {
        margin-bottom: 1rem;
        
        h5 {
          color: var(--secondary-color);
          margin-bottom: 0.5rem;
        }
        
        ul {
          margin: 0;
          padding-left: 1.5rem;
          
          li {
            margin-bottom: 0.25rem;
            line-height: 1.4;
          }
        }
      }
    }
    
    .next-steps {
      h5 {
        color: var(--secondary-color);
        margin-bottom: 0.5rem;
      }
      
      ul {
        margin: 0;
        padding-left: 1.5rem;
        
        li {
          margin-bottom: 0.25rem;
          line-height: 1.4;
        }
      }
    }
  }
  
  .certificate-info {
    background: linear-gradient(135deg, var(--success-color), var(--primary-color));
    color: white;
    padding: 1.5rem;
    border-radius: 0.5rem;
    margin-top: 2rem;
    
    h4 {
      margin-bottom: 1rem;
    }
    
    .certificate-details {
      p {
        margin: 0.5rem 0;
        opacity: 0.9;
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
  .assessment-modal-overlay {
    padding: 1rem;
  }
  
  .assessment-modal {
    max-height: 95vh;
  }
  
  .modal-body {
    padding: 1rem;
  }
  
  .assessment-details {
    flex-direction: column;
    align-items: center;
  }
  
  .results-breakdown {
    flex-direction: column;
    align-items: center;
  }
}
</style>
