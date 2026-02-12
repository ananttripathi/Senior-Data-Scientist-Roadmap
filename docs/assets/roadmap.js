/**
 * Interactive Learning Roadmap
 * Progress saved to localStorage per journey
 */

const STORAGE_KEY = 'roadmap-progress';

// ========== ROADMAP DATA ==========

const roadmaps = {
  'data-engineer': {
    name: 'Data Engineer',
    phases: [
      { id: 'de-p1', name: 'Phase 1: Foundations', duration: '2-3 months', topics: [
        'Python: data structures, OOP, file I/O',
        'SQL: SELECT, JOINs, aggregates, window functions',
        'Git & version control',
        'Relational databases (PostgreSQL/MySQL)',
        'Data modeling: ERD, star schema',
        'Linux & command line basics'
      ]},
      { id: 'de-p2', name: 'Phase 2: Core Data Engineering', duration: '3-4 months', topics: [
        'ETL/ELT pipeline design',
        'Apache Airflow',
        'Cloud platform (AWS S3, RDS, Redshift)',
        'Data warehousing (Snowflake, BigQuery)',
        'Data quality & testing',
        'dbt for transformations'
      ]},
      { id: 'de-p3', name: 'Phase 3: Advanced', duration: '3-4 months', topics: [
        'Apache Spark & PySpark',
        'Kafka & stream processing',
        'Data Lakehouse (Delta, Iceberg)',
        'Docker & CI/CD',
        'Data governance & security',
        'Monitoring (Prometheus, Grafana)'
      ]}
    ]
  },
  'data-scientist': {
    name: 'Data Scientist',
    phases: [
      { id: 'ds-p1', name: 'Phase 1: Foundation', duration: '3-4 months', topics: [
        'Mathematics: Linear Algebra, Calculus',
        'Statistics & Probability',
        'Python: NumPy, Pandas',
        'Data visualization (Matplotlib, Seaborn)',
        'SQL fundamentals',
        'Jupyter & exploratory analysis'
      ]},
      { id: 'ds-p2', name: 'Phase 2: Machine Learning', duration: '4-5 months', topics: [
        'Supervised learning (regression, classification)',
        'Unsupervised learning (clustering, PCA)',
        'Model evaluation & validation',
        'Feature engineering',
        'Tree-based models (RF, XGBoost)',
        'Statistical modeling'
      ]},
      { id: 'ds-p3', name: 'Phase 3: Advanced & Domain', duration: '3-4 months', topics: [
        'Deep learning basics',
        'NLP or Computer Vision intro',
        'A/B testing & experimentation',
        'Business metrics & storytelling',
        'Dashboard tools (Tableau, Looker)',
        'Portfolio projects'
      ]}
    ]
  },
  'ml-engineer': {
    name: 'ML Engineer',
    phases: [
      { id: 'ml-p0', name: 'Phase 0: Developer Fundamentals', duration: '1-2 weeks', topics: [
        'Command line basics',
        'Git & GitHub',
        'IDE setup (VS Code)',
        'Virtual environments'
      ]},
      { id: 'ml-p1', name: 'Phase 1: Foundation', duration: '3-4 months', topics: [
        'Linear Algebra & Calculus',
        'Probability & Statistics',
        'Python: NumPy, Pandas, Matplotlib',
        'Jupyter Notebooks'
      ]},
      { id: 'ml-p2', name: 'Phase 2: ML Fundamentals', duration: '4-6 months', topics: [
        'Supervised & unsupervised learning',
        'Model evaluation & cross-validation',
        'Feature engineering',
        'Tree models, XGBoost, LightGBM',
        'SQL & data processing'
      ]},
      { id: 'ml-p3', name: 'Phase 3: Deep Learning', duration: '5-7 months', topics: [
        'Neural networks & backpropagation',
        'PyTorch or TensorFlow',
        'CNNs for computer vision',
        'NLP & Transformers',
        'LLMs & RAG basics'
      ]},
      { id: 'ml-p4', name: 'Phase 4: MLOps', duration: '3-4 months', topics: [
        'Docker & containerization',
        'MLflow, DVC',
        'FastAPI for ML APIs',
        'Cloud deployment (AWS/GCP)',
        'Model monitoring'
      ]},
      { id: 'ml-p5', name: 'Phase 5: Big Data', duration: '2-3 months', topics: [
        'Apache Spark & PySpark',
        'Kafka basics',
        'Streaming pipelines'
      ]},
      { id: 'ml-p6', name: 'Phase 6: Advanced & Portfolio', duration: 'Ongoing', topics: [
        'Specialization (RL, time series, etc.)',
        '15-20 portfolio projects',
        'Interview preparation'
      ]}
    ]
  },
  'ai-engineer': {
    name: 'AI Engineer',
    phases: [
      { id: 'ai-p1', name: 'Phase 1: ML Foundation', duration: '2-3 months', topics: [
        'Python & ML basics',
        'scikit-learn',
        'Neural networks intro',
        'PyTorch or TensorFlow'
      ]},
      { id: 'ai-p2', name: 'Phase 2: NLP & Transformers', duration: '2-3 months', topics: [
        'Transformer architecture',
        'Hugging Face ecosystem',
        'BERT, GPT models',
        'Fine-tuning basics'
      ]},
      { id: 'ai-p3', name: 'Phase 3: LLMs & RAG', duration: '3-4 months', topics: [
        'Prompt engineering',
        'RAG architecture',
        'Vector databases (Chroma, Pinecone)',
        'LangChain / LlamaIndex',
        'Embeddings & semantic search'
      ]},
      { id: 'ai-p4', name: 'Phase 4: Production AI', duration: '2-3 months', topics: [
        'LLM APIs (OpenAI, Anthropic)',
        'FastAPI for AI apps',
        'Docker & deployment',
        'Cost optimization & caching'
      ]},
      { id: 'ai-p5', name: 'Phase 5: Advanced', duration: 'Ongoing', topics: [
        'Fine-tuning (LoRA, QLoRA)',
        'AI agents & tool use',
        'Multimodal models',
        'Evaluation & monitoring'
      ]}
    ]
  }
};

// ========== STATE ==========

let currentJourney = null;
let progress = {};

// ========== HELPERS ==========

function loadProgress() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
}

function saveProgress() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.warn('Could not save progress:', e);
  }
}

function getProgressKey(journey, phaseId, topicIndex) {
  return topicIndex === undefined 
    ? `${journey}_${phaseId}` 
    : `${journey}_${phaseId}_${topicIndex}`;
}

function isPhaseComplete(journey, phase) {
  return phase.topics.every((_, i) => 
    progress[getProgressKey(journey, phase.id, i)]
  );
}

function isTopicDone(journey, phaseId, topicIndex) {
  return !!progress[getProgressKey(journey, phaseId, topicIndex)];
}

function getOverallProgress(journey) {
  const rd = roadmaps[journey];
  let total = 0, done = 0;
  rd.phases.forEach(phase => {
    phase.topics.forEach((_, i) => {
      total++;
      if (isTopicDone(journey, phase.id, i)) done++;
    });
  });
  return total ? Math.round((done / total) * 100) : 0;
}

// ========== RENDER ==========

function renderRoadmap() {
  const rd = roadmaps[currentJourney];
  const container = document.getElementById('roadmapContent');
  container.innerHTML = '';

  rd.phases.forEach(phase => {
    const phaseComplete = isPhaseComplete(currentJourney, phase);
    const phaseEl = document.createElement('div');
    phaseEl.className = 'phase-card expanded';
    phaseEl.innerHTML = `
      <div class="phase-header">
        <div class="phase-check ${phaseComplete ? 'checked' : ''}" data-phase-id="${phase.id}" role="button" tabindex="0" aria-label="Phase complete"></div>
        <h3>${phase.name}</h3>
        <span class="phase-duration">${phase.duration}</span>
        <span class="phase-toggle">▼</span>
      </div>
      <div class="phase-content">
        <ul class="topic-list">
          ${phase.topics.map((topic, i) => {
            const done = isTopicDone(currentJourney, phase.id, i);
            const key = getProgressKey(currentJourney, phase.id, i);
            return `
              <li class="topic-item ${done ? 'done' : ''}">
                <div class="topic-checkbox ${done ? 'checked' : ''}" data-key="${key}" role="button" tabindex="0" aria-label="Mark complete"></div>
                <span class="topic-label">${topic}</span>
              </li>
            `;
          }).join('')}
        </ul>
      </div>
    `;
    container.appendChild(phaseEl);
  });

  attachEventListeners();
  updateProgressDisplay();
}

function attachEventListeners() {
  // Phase header toggle
  document.querySelectorAll('.phase-header').forEach(header => {
    const card = header.closest('.phase-card');
    header.addEventListener('click', (e) => {
      if (!e.target.classList.contains('topic-checkbox') && !e.target.closest('.topic-checkbox')) {
        if (!e.target.classList.contains('phase-check')) {
          card.classList.toggle('expanded');
        }
      }
    });
  });

  // Phase check (mark all in phase)
  document.querySelectorAll('.phase-check').forEach(el => {
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      const phaseId = el.dataset.phaseId;
      const phase = roadmaps[currentJourney].phases.find(p => p.id === phaseId);
      const allDone = isPhaseComplete(currentJourney, phase);
      phase.topics.forEach((_, i) => {
        const key = getProgressKey(currentJourney, phaseId, i);
        progress[key] = !allDone;
      });
      saveProgress();
      renderRoadmap();
    });
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        el.click();
      }
    });
  });

  // Topic checkbox
  document.querySelectorAll('.topic-checkbox').forEach(el => {
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      const key = el.dataset.key;
      progress[key] = !progress[key];
      saveProgress();
      renderRoadmap();
    });
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        el.click();
      }
    });
  });

  // Topic label click
  document.querySelectorAll('.topic-label').forEach(label => {
    label.addEventListener('click', (e) => {
      const item = label.closest('.topic-item');
      const checkbox = item.querySelector('.topic-checkbox');
      if (checkbox) checkbox.click();
    });
  });
}

function updateProgressDisplay() {
  const pct = getOverallProgress(currentJourney);
  document.getElementById('progressBar').style.width = `${pct}%`;
  document.getElementById('progressText').textContent = `${pct}% complete`;
}

// ========== NAVIGATION ==========

function showJourneySelection() {
  currentJourney = null;
  document.getElementById('journeySection').classList.remove('hidden');
  document.getElementById('roadmapSection').classList.add('hidden');
}

function showRoadmap(journey) {
  currentJourney = journey;
  document.getElementById('journeySection').classList.add('hidden');
  document.getElementById('roadmapSection').classList.remove('hidden');
  renderRoadmap();
}

// ========== INIT ==========

function init() {
  progress = loadProgress();

  document.querySelectorAll('.journey-card').forEach(card => {
    card.addEventListener('click', () => {
      showRoadmap(card.dataset.journey);
    });
  });

  document.getElementById('backBtn').addEventListener('click', showJourneySelection);
}

document.addEventListener('DOMContentLoaded', init);
