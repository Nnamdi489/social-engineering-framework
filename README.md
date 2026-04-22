# Simulation-Based Framework for Social Engineering Attack Detection and Defense

> Master's thesis prototype — a unified, simulation-driven cybersecurity framework that measurably improves users' ability to detect and report social engineering attacks.

[![Vue.js](https://img.shields.io/badge/Vue.js-3.4-42b883?logo=vue.js&logoColor=white)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Pinia](https://img.shields.io/badge/Pinia-2.1-yellow?logo=pinia)](https://pinia.vuejs.org/)
[![Chart.js](https://img.shields.io/badge/Chart.js-4.5-FF6384?logo=chartdotjs&logoColor=white)](https://www.chartjs.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## Academic context

| | |
|---|---|
| **Thesis title** | Design and Implementation of a Simulation-Based Framework for Social Engineering Attack Detection and Defense |
| **Degree** | Master of Science, Computer Science |
| **Institution** | Vistula University — Faculty of Computer Engineering, Graphic Design and Architecture |
| **Author** | Nnamdi Isaac Alor |
| **Supervisor** | Dr inż. Igor Protasowicki |
| **Year** | Warsaw, 2026 |
| **Full thesis** | [`docs/NnamdiAlor_(MSc)thesis.pdf`](docs/NnamdiAlor_%28MSc%29thesis.pdf) |

## Research problem

Over 90% of security breaches trace back to human error or psychological manipulation rather than technical exploits (Verizon DBIR, 2023). Most existing simulation tools address only phishing, and most awareness platforms treat training and detection as separate concerns. This project asks:

> *What are the best practices to design and implement an effective simulation-based framework to detect and prevent social engineering attacks?*

The answer developed in this thesis is a unified system that combines realistic attack simulation, continuous user interaction, automated behavioural detection, and immediate feedback inside one modular web application.

## Experimental results

The framework was evaluated with **24 participants** from non-technical and semi-technical backgrounds across **3 simulation rounds** using phishing and baiting scenarios. Behavioural metrics were captured automatically.

| Metric | Round 1 | Round 3 | Change |
|---|---:|---:|---:|
| Click-through rate | 41.7% | 16.7% | **−25.0 pp** |
| Reporting rate | 29.2% | 66.7% | **+37.5 pp** |
| Average reaction time | 18.4 s | 9.6 s | **−8.8 s** |

Users became markedly more cautious, reported suspicious content more than twice as often, and identified threats nearly twice as fast — empirical support for the thesis' leading hypothesis that simulation-based exposure with integrated feedback improves behavioural resilience.

## Framework components

The application is organised into seven navigable modules, each aligned with a section of the thesis:

| Route | Module | Purpose |
|---|---|---|
| `/` | Home | Landing page and framework overview |
| `/research` | Research Framework | Abstract, introduction, literature review, methodology, results |
| `/simulation` | Simulation Dashboard | Entry point for launching attack simulations |
| `/attacks` | Attack Simulator | Phishing, spear-phishing, pretexting, baiting, and custom scenario builder |
| `/detection` | Detection Center | Rule builder for behavioural classification (safe / risky / critical) |
| `/analytics` | Analytics Dashboard | Chart.js visualisations of click-through rates, reporting rates, reaction time |
| `/defense` | Defense Training | Interactive training modules, strategy modals, assessments, certificates |

Routing uses `createWebHashHistory()` so the compiled build runs from any static host or `file://`-served directory without server-side rewrites.

## Architecture

Four-layer modular architecture (thesis §4.1):

- **Presentation layer** — Vue 3 SFCs with the Composition API, SCSS, and a responsive 8-px grid design system
- **Application layer** — scenario execution, user interaction processing, feedback generation
- **Data layer** — Pinia stores for reactive state; schema designed around User, Scenario, Simulation Session, User Action, and Metrics entities (thesis §4.3)
- **Security layer** — simulations run in isolated sandboxes; no real credentials or organisational data ever leave the browser

Detection uses transparent rule-based classification rather than opaque ML, chosen deliberately for interpretability in training contexts (thesis §4.8.1).

## Tech stack

| Concern | Choice |
|---|---|
| UI framework | Vue 3 (Composition API) |
| State management | Pinia |
| Routing | Vue Router 4 (hash history) |
| Build tool | Vite 5 + `vite-plugin-singlefile` |
| Charts | Chart.js + vue-chartjs |
| Styling | SCSS |
| Utilities | lodash, date-fns, uuid, crypto-js, marked, highlight.js |
| Testing | Vitest, @vue/test-utils, jsdom |
| Linting | ESLint + Prettier |

The `vite-plugin-singlefile` setup bundles the entire application into one self-contained `dist/index.html`, enabling distribution as a single file for air-gapped or restricted environments.

## Getting started

### Prerequisites

- Node.js 16+
- npm 7+
- A modern browser (Chrome, Firefox, Safari, Edge)

### Run in development

```bash
git clone https://github.com/<your-username>/Socio-Engineering.git
cd Socio-Engineering
npm install
npm run dev
```

Open http://localhost:3000.

### Build and serve statically

```bash
npm run build:static   # compiles to dist/
npm run serve          # Node static server on :8080
```

Other serve options: `npm run serve:python` or `npm run serve:npx`. See [`BUILD_INSTRUCTIONS.md`](BUILD_INSTRUCTIONS.md) for the CORS-policy explanation of why `file://` won't work directly.

## Project structure

```
social-engineering-framework/
├── docs/
│   ├── NnamdiAlor_(MSc)thesis.pdf    # Full master's thesis (63 pp)
│   └── diagrams/                     # Attack workflow diagrams (SVG)
│       ├── baiting.svg
│       ├── phishing.svg
│       ├── pretexting-simulator.svg
│       └── spear-phishing.svg
├── src/
│   ├── components/
│   │   ├── common/                   # HelpSystem, GlossaryModal, HelpTooltip
│   │   ├── detection/                # DetectionRuleBuilder
│   │   ├── layout/                   # NavBar, Footer
│   │   ├── research/                 # Abstract, Introduction, Literature, Methodology, Results, TitlePage
│   │   ├── simulation/               # Phishing, SpearPhishing, Pretexting, Baiting, CustomScenarioBuilder
│   │   └── training/                 # DefenseStrategyModal, InteractiveTrainingModal, InteractiveAssessmentModal
│   ├── views/                        # Route-level pages (Home, ResearchFramework, etc.)
│   ├── router/
│   ├── assets/styles/
│   ├── App.vue
│   └── main.js
├── .gitignore
├── BUILD_INSTRUCTIONS.md
├── LICENSE
├── README.md
├── index.html
├── package.json
├── package-lock.json
├── run-app.bat
├── run-app.sh
├── serve-static.js
├── vite.config.js                    # Active — single-file build (inlines everything)
├── vite.config.debug.js              # Alternate — multi-file build, sourcemaps on
└── vite.config.static.js             # Alternate — hashed assets, base:'./' (GitHub Pages / Netlify)

```

## Contribution of the study

The thesis argues that the framework's main contribution is combining three capabilities that typically live in separate tools:

1. **Multi-vector simulation** — not just phishing, but pretexting, baiting, spear-phishing, and configurable custom scenarios
2. **Behavioural logging with rule-based detection** — every click, credential submission, and report action is captured and classified
3. **Immediate, explanatory feedback** — errors become teachable moments, grounded in Kolb's (1984) experiential learning theory

This integration lets simulation data directly inform targeted training interventions, rather than generating metrics that nobody acts on.

## Limitations and future work

From thesis §5.4–5.5:

- Evaluation cohort was small (n=24); larger and more diverse populations needed for statistical generalisability
- Detection logic is rule-based; integrating adaptive machine-learning models would improve resilience to novel attack patterns
- Immersive technologies (VR/AR) could extend the framework to hybrid physical-social attacks
- Tighter SIEM integration would enable real-time operational use beyond training

## Ethical use

This framework is designed strictly for educational and authorised cybersecurity training. All attack simulations are synthetic; no real phishing content, credentials, or personal data are distributed. Participants in any deployment must give informed consent and be debriefed after exercises, consistent with the ethical design principles set out in thesis §2.3.

## AI-assistance disclosure

As documented on page 2 of the thesis, AI-based tools were used in a limited and supportive capacity for language refinement and grammar correction during drafting. The conceptualisation of the research topic, formulation of objectives and hypotheses, selection of research methods, analysis, interpretation of results, and all final academic judgments are entirely the work of the author. This use was strictly aligned with Vistula University's academic integrity guidelines.

## Citation

If you reference this work, please cite:

> Alor, N. I. (2026). *Design and Implementation of a Simulation-Based Framework for Social Engineering Attack Detection and Defense* [Master's thesis, Vistula University]. Warsaw.

## License

MIT — see [LICENSE](LICENSE).

## Author

**Nnamdi Isaac Alor**
MSc Computer Science, Vistula University (2026)