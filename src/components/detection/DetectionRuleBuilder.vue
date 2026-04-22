<template>
  <div class="detection-rule-builder">
    <div class="builder-header">
      <h3>Detection Rule Builder</h3>
      <p>Create custom detection rules for identifying social engineering attacks</p>
    </div>

    <div class="rule-form">
      <div class="row">
        <div class="col-6">
          <div class="basic-info">
            <h4>Basic Information</h4>
            
            <div class="form-group">
              <label>Rule Name</label>
              <input v-model="rule.name" type="text" class="form-control" 
                     placeholder="Enter a descriptive name for the rule">
            </div>
            
            <div class="form-group">
              <label>Description</label>
              <textarea v-model="rule.description" class="form-control" rows="3"
                        placeholder="Describe what this rule detects"></textarea>
            </div>
            
            <div class="form-group">
              <label>Rule Type</label>
              <select v-model="rule.type" class="form-control" @change="updateRuleTemplate">
                <option value="">Select rule type</option>
                <option value="email-content">Email Content Analysis</option>
                <option value="url-analysis">URL Analysis</option>
                <option value="attachment-scan">Attachment Scanning</option>
                <option value="behavioral">Behavioral Pattern</option>
                <option value="sender-reputation">Sender Reputation</option>
                <option value="custom">Custom Logic</option>
              </select>
            </div>
            
            <div class="form-group">
              <label>Severity Level</label>
              <select v-model="rule.severity" class="form-control">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>
          </div>
        </div>
        
        <div class="col-6">
          <div class="rule-conditions">
            <h4>Detection Conditions</h4>
            
            <div class="conditions-list">
              <div class="condition-item" v-for="(condition, index) in rule.conditions" :key="index">
                <div class="condition-header">
                  <select v-model="condition.field" class="form-control">
                    <option value="">Select field</option>
                    <option v-for="field in availableFields" :key="field.id" :value="field.id">
                      {{ field.name }}
                    </option>
                  </select>
                  
                  <select v-model="condition.operator" class="form-control">
                    <option value="contains">Contains</option>
                    <option value="equals">Equals</option>
                    <option value="starts_with">Starts with</option>
                    <option value="ends_with">Ends with</option>
                    <option value="regex">Regex match</option>
                    <option value="greater_than">Greater than</option>
                    <option value="less_than">Less than</option>
                  </select>
                  
                  <button @click="removeCondition(index)" class="btn btn-danger btn-sm">×</button>
                </div>
                
                <div class="condition-value">
                  <input v-model="condition.value" type="text" class="form-control" 
                         placeholder="Enter condition value">
                </div>
                
                <div class="condition-options" v-if="index < rule.conditions.length - 1">
                  <select v-model="condition.logic" class="form-control">
                    <option value="AND">AND</option>
                    <option value="OR">OR</option>
                  </select>
                </div>
              </div>
            </div>
            
            <button @click="addCondition" class="btn btn-secondary">+ Add Condition</button>
          </div>
        </div>
      </div>
      
      <div class="row">
        <div class="col-12">
          <div class="rule-actions-config">
            <h4>Actions</h4>
            <div class="actions-grid">
              <label class="checkbox-label" v-for="action in availableActions" :key="action.id">
                <input v-model="rule.actions" :value="action.id" type="checkbox">
                {{ action.name }}
              </label>
            </div>
          </div>
        </div>
      </div>
      
      <div class="row">
        <div class="col-12">
          <div class="rule-preview">
            <h4>Rule Preview</h4>
            <div class="preview-container">
              <div class="rule-logic">
                <strong>IF:</strong>
                <div class="logic-display">
                  <span v-for="(condition, index) in rule.conditions" :key="index" class="condition-display">
                    {{ getFieldName(condition.field) }} {{ condition.operator }} "{{ condition.value }}"
                    <span v-if="index < rule.conditions.length - 1" class="logic-operator">{{ condition.logic }}</span>
                  </span>
                </div>
                <strong>THEN:</strong>
                <div class="actions-display">
                  <span v-for="actionId in rule.actions" :key="actionId" class="action-display">
                    {{ getActionName(actionId) }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="builder-actions">
      <button @click="testRule" class="btn btn-secondary" :disabled="!isRuleValid">
        🧪 Test Rule
      </button>
      <button @click="saveRule" class="btn btn-primary" :disabled="!isRuleValid">
        💾 Save Rule
      </button>
      <button @click="resetForm" class="btn btn-secondary">
        🔄 Reset
      </button>
    </div>

    <div class="rule-templates" v-if="showTemplates">
      <h4>Rule Templates</h4>
      <div class="templates-grid">
        <div class="template-card" v-for="template in ruleTemplates" :key="template.id"
             @click="loadTemplate(template.id)">
          <div class="template-icon">{{ template.icon }}</div>
          <h5>{{ template.name }}</h5>
          <p>{{ template.description }}</p>
          <div class="template-stats">
            <span class="stat">{{ template.effectiveness }}% effective</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetectionRuleBuilder',
  data() {
    return {
      showTemplates: false,
      rule: {
        name: '',
        description: '',
        type: '',
        severity: 'medium',
        conditions: [
          {
            field: '',
            operator: 'contains',
            value: '',
            logic: 'AND'
          }
        ],
        actions: []
      },
      availableFields: [
        { id: 'email_subject', name: 'Email Subject' },
        { id: 'email_body', name: 'Email Body' },
        { id: 'sender_email', name: 'Sender Email' },
        { id: 'sender_domain', name: 'Sender Domain' },
        { id: 'recipient_count', name: 'Recipient Count' },
        { id: 'attachment_count', name: 'Attachment Count' },
        { id: 'attachment_type', name: 'Attachment Type' },
        { id: 'url_count', name: 'URL Count' },
        { id: 'url_domain', name: 'URL Domain' },
        { id: 'urgency_keywords', name: 'Urgency Keywords' },
        { id: 'authority_claims', name: 'Authority Claims' },
        { id: 'personal_info_requests', name: 'Personal Info Requests' }
      ],
      availableActions: [
        { id: 'quarantine', name: 'Quarantine Email' },
        { id: 'alert_admin', name: 'Alert Administrator' },
        { id: 'alert_user', name: 'Alert User' },
        { id: 'block_sender', name: 'Block Sender' },
        { id: 'log_incident', name: 'Log Incident' },
        { id: 'training_popup', name: 'Show Training Popup' },
        { id: 'redirect_safe', name: 'Redirect to Safe Page' }
      ],
      ruleTemplates: [
        {
          id: 'phishing-basic',
          name: 'Basic Phishing Detection',
          icon: '🎣',
          description: 'Detects common phishing indicators in emails',
          effectiveness: 85,
          template: {
            type: 'email-content',
            conditions: [
              { field: 'email_subject', operator: 'contains', value: 'urgent', logic: 'OR' },
              { field: 'email_body', operator: 'contains', value: 'click here', logic: 'AND' },
              { field: 'url_count', operator: 'greater_than', value: '0' }
            ],
            actions: ['quarantine', 'alert_admin', 'log_incident']
          }
        },
        {
          id: 'credential-harvest',
          name: 'Credential Harvesting',
          icon: '🔑',
          description: 'Identifies attempts to steal login credentials',
          effectiveness: 92,
          template: {
            type: 'url-analysis',
            conditions: [
              { field: 'url_domain', operator: 'contains', value: 'login', logic: 'OR' },
              { field: 'email_body', operator: 'contains', value: 'password', logic: 'AND' },
              { field: 'email_body', operator: 'contains', value: 'verify' }
            ],
            actions: ['quarantine', 'alert_admin', 'alert_user', 'training_popup']
          }
        },
        {
          id: 'attachment-threat',
          name: 'Malicious Attachment',
          icon: '📎',
          description: 'Detects potentially dangerous email attachments',
          effectiveness: 96,
          template: {
            type: 'attachment-scan',
            conditions: [
              { field: 'attachment_type', operator: 'equals', value: '.exe', logic: 'OR' },
              { field: 'attachment_type', operator: 'equals', value: '.zip', logic: 'OR' },
              { field: 'attachment_type', operator: 'equals', value: '.scr' }
            ],
            actions: ['quarantine', 'alert_admin', 'block_sender']
          }
        }
      ]
    }
  },
  computed: {
    isRuleValid() {
      return this.rule.name && 
             this.rule.type && 
             this.rule.conditions.some(c => c.field && c.value) &&
             this.rule.actions.length > 0
    }
  },
  methods: {
    addCondition() {
      this.rule.conditions.push({
        field: '',
        operator: 'contains',
        value: '',
        logic: 'AND'
      })
    },
    removeCondition(index) {
      if (this.rule.conditions.length > 1) {
        this.rule.conditions.splice(index, 1)
      }
    },
    updateRuleTemplate() {
      // Update available fields based on rule type
      if (this.rule.type === 'email-content') {
        this.showTemplates = true
      }
    },
    getFieldName(fieldId) {
      const field = this.availableFields.find(f => f.id === fieldId)
      return field ? field.name : fieldId
    },
    getActionName(actionId) {
      const action = this.availableActions.find(a => a.id === actionId)
      return action ? action.name : actionId
    },
    testRule() {
      console.log('Testing rule:', this.rule)
      // Simulate rule testing
      alert('Rule test completed successfully! This rule would match 15 out of 100 test emails.')
    },
    saveRule() {
      if (this.isRuleValid) {
        console.log('Saving rule:', this.rule)
        this.$emit('rule-created', { ...this.rule })
        this.resetForm()
        alert('Detection rule saved successfully!')
      }
    },
    resetForm() {
      this.rule = {
        name: '',
        description: '',
        type: '',
        severity: 'medium',
        conditions: [
          {
            field: '',
            operator: 'contains',
            value: '',
            logic: 'AND'
          }
        ],
        actions: []
      }
      this.showTemplates = false
    },
    loadTemplate(templateId) {
      const template = this.ruleTemplates.find(t => t.id === templateId)
      if (template) {
        this.rule.name = template.name
        this.rule.description = template.description
        this.rule.type = template.template.type
        this.rule.conditions = [...template.template.conditions]
        this.rule.actions = [...template.template.actions]
        console.log('Loaded template:', templateId)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.detection-rule-builder {
  .builder-header {
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
  
  .basic-info,
  .rule-conditions,
  .rule-actions-config,
  .rule-preview {
    background: white;
    padding: 1.5rem;
    border-radius: 0.5rem;
    margin-bottom: 1.5rem;
    
    h4 {
      color: var(--secondary-color);
      margin-bottom: 1rem;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid var(--light-color);
    }
  }
  
  .form-group {
    margin-bottom: 1rem;
    
    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
      color: var(--dark-color);
      
      &.checkbox-label {
        display: flex;
        align-items: center;
        margin-bottom: 0.5rem;
        
        input[type="checkbox"] {
          margin-right: 0.5rem;
        }
      }
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
    
    textarea.form-control {
      resize: vertical;
      min-height: 80px;
    }
  }
  
  .conditions-list {
    .condition-item {
      background: var(--light-color);
      padding: 1rem;
      border-radius: 0.5rem;
      margin-bottom: 1rem;
      
      .condition-header {
        display: flex;
        gap: 0.5rem;
        margin-bottom: 0.5rem;
        
        .form-control {
          flex: 1;
        }
        
        .btn-sm {
          padding: 0.5rem;
          width: 2.5rem;
        }
      }
      
      .condition-value {
        margin-bottom: 0.5rem;
      }
      
      .condition-options {
        text-align: center;
        
        .form-control {
          width: auto;
          display: inline-block;
        }
      }
    }
  }
  
  .actions-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 0.5rem;
  }
  
  .rule-preview {
    .preview-container {
      background: var(--light-color);
      padding: 1rem;
      border-radius: 0.25rem;
      
      .rule-logic {
        font-family: 'Courier New', monospace;
        
        .logic-display {
          margin: 0.5rem 0;
          padding-left: 1rem;
          
          .condition-display {
            display: block;
            margin-bottom: 0.25rem;
            
            .logic-operator {
              font-weight: bold;
              color: var(--secondary-color);
              margin-left: 0.5rem;
            }
          }
        }
        
        .actions-display {
          margin: 0.5rem 0;
          padding-left: 1rem;
          
          .action-display {
            display: inline-block;
            background: var(--secondary-color);
            color: white;
            padding: 0.25rem 0.5rem;
            border-radius: 0.25rem;
            margin-right: 0.5rem;
            margin-bottom: 0.25rem;
            font-size: 0.8rem;
          }
        }
      }
    }
  }
  
  .builder-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin: 2rem 0;
    
    .btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }
  
  .rule-templates {
    margin-top: 2rem;
    
    h4 {
      color: var(--secondary-color);
      margin-bottom: 1rem;
    }
    
    .templates-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1rem;
      
      .template-card {
        background: white;
        padding: 1.5rem;
        border-radius: 0.5rem;
        box-shadow: var(--shadow);
        cursor: pointer;
        transition: all 0.3s ease;
        text-align: center;
        
        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
        }
        
        .template-icon {
          font-size: 2rem;
          margin-bottom: 1rem;
        }
        
        h5 {
          color: var(--primary-color);
          margin-bottom: 0.5rem;
        }
        
        p {
          color: #666;
          margin-bottom: 1rem;
          font-size: 0.9rem;
        }
        
        .template-stats {
          .stat {
            background: var(--success-color);
            color: white;
            padding: 0.25rem 0.5rem;
            border-radius: 0.25rem;
            font-size: 0.8rem;
          }
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .detection-rule-builder {
    .condition-header {
      flex-direction: column;
      
      .btn-sm {
        width: 100%;
        margin-top: 0.5rem;
      }
    }
    
    .builder-actions {
      flex-direction: column;
      align-items: center;
    }
    
    .templates-grid {
      grid-template-columns: 1fr;
    }
  }
}
</style>
