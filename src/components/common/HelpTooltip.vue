<template>
  <div class="help-tooltip" @mouseenter="showTooltip" @mouseleave="hideTooltip">
    <span class="help-icon">❓</span>
    <div v-if="visible" class="tooltip-content" :class="position">
      <div class="tooltip-header">
        <h4>{{ title }}</h4>
        <button @click="hideTooltip" class="close-btn">×</button>
      </div>
      <div class="tooltip-body">
        <p v-if="description">{{ description }}</p>
        <div v-if="examples && examples.length > 0" class="examples">
          <h5>Examples:</h5>
          <ul>
            <li v-for="example in examples" :key="example">{{ example }}</li>
          </ul>
        </div>
        <div v-if="relatedTerms && relatedTerms.length > 0" class="related-terms">
          <h5>Related Terms:</h5>
          <div class="term-tags">
            <span v-for="term in relatedTerms" :key="term" class="term-tag" @click="$emit('show-term', term)">
              {{ term }}
            </span>
          </div>
        </div>
        <div v-if="learnMore" class="learn-more">
          <a :href="learnMore" target="_blank" class="learn-more-link">
            📚 Learn More
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelpTooltip',
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    examples: {
      type: Array,
      default: () => []
    },
    relatedTerms: {
      type: Array,
      default: () => []
    },
    learnMore: {
      type: String,
      default: null
    },
    position: {
      type: String,
      default: 'top',
      validator: value => ['top', 'bottom', 'left', 'right'].includes(value)
    }
  },
  data() {
    return {
      visible: false
    }
  },
  methods: {
    showTooltip() {
      this.visible = true
    },
    hideTooltip() {
      this.visible = false
    }
  },
  emits: ['show-term']
}
</script>

<style lang="scss" scoped>
.help-tooltip {
  position: relative;
  display: inline-block;
  margin-left: 0.5rem;
  
  .help-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    background: var(--secondary-color);
    color: white;
    border-radius: 50%;
    font-size: 12px;
    cursor: help;
    transition: all 0.3s ease;
    
    &:hover {
      background: var(--primary-color);
      transform: scale(1.1);
    }
  }
  
  .tooltip-content {
    position: absolute;
    z-index: 1000;
    width: 320px;
    background: white;
    border: 1px solid var(--border-color);
    border-radius: 0.5rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    opacity: 0;
    animation: fadeIn 0.3s ease forwards;
    
    &.top {
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%);
      margin-bottom: 0.5rem;
      
      &::after {
        content: '';
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        border: 6px solid transparent;
        border-top-color: white;
      }
    }
    
    &.bottom {
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      margin-top: 0.5rem;
      
      &::after {
        content: '';
        position: absolute;
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);
        border: 6px solid transparent;
        border-bottom-color: white;
      }
    }
    
    &.left {
      right: 100%;
      top: 50%;
      transform: translateY(-50%);
      margin-right: 0.5rem;
      
      &::after {
        content: '';
        position: absolute;
        left: 100%;
        top: 50%;
        transform: translateY(-50%);
        border: 6px solid transparent;
        border-left-color: white;
      }
    }
    
    &.right {
      left: 100%;
      top: 50%;
      transform: translateY(-50%);
      margin-left: 0.5rem;
      
      &::after {
        content: '';
        position: absolute;
        right: 100%;
        top: 50%;
        transform: translateY(-50%);
        border: 6px solid transparent;
        border-right-color: white;
      }
    }
  }
  
  .tooltip-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border-bottom: 1px solid var(--border-color);
    background: var(--light-color);
    border-radius: 0.5rem 0.5rem 0 0;
    
    h4 {
      margin: 0;
      color: var(--primary-color);
      font-size: 1rem;
    }
    
    .close-btn {
      background: none;
      border: none;
      font-size: 1.5rem;
      color: #666;
      cursor: pointer;
      padding: 0;
      width: 24px;
      height: 24px;
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
  
  .tooltip-body {
    padding: 1rem;
    
    p {
      margin: 0 0 1rem 0;
      line-height: 1.5;
      color: #666;
    }
    
    .examples {
      margin-bottom: 1rem;
      
      h5 {
        margin: 0 0 0.5rem 0;
        color: var(--secondary-color);
        font-size: 0.9rem;
      }
      
      ul {
        margin: 0;
        padding-left: 1.5rem;
        
        li {
          margin-bottom: 0.25rem;
          color: #666;
          font-size: 0.9rem;
        }
      }
    }
    
    .related-terms {
      margin-bottom: 1rem;
      
      h5 {
        margin: 0 0 0.5rem 0;
        color: var(--secondary-color);
        font-size: 0.9rem;
      }
      
      .term-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.25rem;
        
        .term-tag {
          background: var(--primary-color);
          color: white;
          padding: 0.25rem 0.5rem;
          border-radius: 1rem;
          font-size: 0.8rem;
          cursor: pointer;
          transition: background 0.3s ease;
          
          &:hover {
            background: var(--secondary-color);
          }
        }
      }
    }
    
    .learn-more {
      .learn-more-link {
        display: inline-flex;
        align-items: center;
        color: var(--success-color);
        text-decoration: none;
        font-size: 0.9rem;
        font-weight: 500;
        
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

// Responsive adjustments
@media (max-width: 768px) {
  .help-tooltip {
    .tooltip-content {
      width: 280px;
      
      &.left,
      &.right {
        left: 50%;
        right: auto;
        top: 100%;
        transform: translateX(-50%);
        margin: 0.5rem 0 0 0;
        
        &::after {
          left: 50%;
          right: auto;
          top: auto;
          bottom: 100%;
          transform: translateX(-50%);
          border: 6px solid transparent;
          border-bottom-color: white;
          border-left-color: transparent;
          border-right-color: transparent;
        }
      }
    }
  }
}
</style>
