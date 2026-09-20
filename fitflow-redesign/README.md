# FitFlow Redesign

[![CI Pipeline](https://github.com/Dasun002/fitflow-redesign/actions/workflows/ci.yml/badge.svg)](https://github.com/Dasun002/fitflow-redesign/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React Native](https://img.shields.io/badge/Frontend-React%20Native%20%7C%20Expo-blue.svg)](https://reactnative.dev)
[![Backend](https://img.shields.io/badge/Backend-Node.js%20%7C%20Express-green.svg)](https://nodejs.org)
[![Database](https://img.shields.io/badge/Database-PostgreSQL%20%2B%20Firestore-blueviolet.svg)](https://postgresql.org)
[![Python ML](https://img.shields.io/badge/AI%20%26%20CV-FastAPI%20%7C%20TFLite-orange.svg)](https://fastapi.tiangolo.com)

Welcome to the **FitFlow Redesign** repository. This project embodies the complete system architecture, technical evaluations, and modular service implementations designed to carry validated Human-Computer Interaction (HCI) research, wireframes, and usability testing findings into an intelligent, production-ready fitness application.

---

## 🏛️ High-Level System Architecture

FitFlow utilizes a multi-tier, microservices-oriented architecture with dedicated layers for client interaction, API gateway orchestration, specialized machine learning/computer vision microservices, and a hybrid transactional/real-time data store.

![FitFlow High-Level System Architecture](docs/architecture-diagram.png)

### Key Architectural Layers:
1. **Client Tier**: Cross-platform mobile and responsive web client built with **React Native** & **React Native Web**.
2. **API Gateway / BFF**: Unified routing, rate-limiting, and Firebase JWT token validation layer built with **Node.js/Express**.
3. **Application Microservices**:
   - **Workout & Plan Service**: Generates adaptive exercise routines, template caching, and progress metrics.
   - **Social Service**: Manages private accountability circles, activity feeds, and community challenges.
   - **Nutrition Service**: Handles dietary logging and image ingestion for macronutrient estimation.
   - **Notification Service**: Coordinates real-time streak alerts, badge achievements, and push notifications.
4. **Specialized Intelligence Services**:
   - **AI Microservice**: On-device **TensorFlow Lite (TFLite)** edge inference with cloud fallback for real-time workout adaptation.
   - **Computer Vision Microservice**: Dedicated **Python / FastAPI** service for food image classification and volume recognition.
5. **Hybrid Persistence & Caching Layer**:
   - **PostgreSQL**: System of record for sensitive, structured health data, user profiles, and compliance audits.
   - **Firebase Firestore / Realtime DB**: Real-time push synchronization for live feeds, comments, and presence indicators.
   - **Redis**: High-speed in-memory caching for leaderboards and hot workout plans.
   - **Object Storage**: Secure cloud storage for meal snapshots and user media.
6. **Compliance & Integration Boundary**:
   - Strict field-level encryption, audit logs, and GDPR/CCPA consent tracking.
   - Resilient adapter layer for external fitness wearables and partner gym APIs.

For detailed architectural decisions, refer to [ADR-001: Architecture Decision Record](docs/adr/ADR-001-technology-stack.md).

---

## 🛠️ Technology Stack Overview

| Component | Selected Technology | Version / Spec | Primary Role |
| :--- | :--- | :--- | :--- |
| **Mobile & Web Client** | React Native (Expo) | v0.74+ | iOS, Android, and Web unified frontend |
| **API Gateway / Backend**| Node.js / Express | Node v20 LTS | Microservices BFF & business logic orchestration |
| **Primary Database** | PostgreSQL | v16 | ACID-compliant store for sensitive health & user data |
| **Real-Time Data Store**| Firebase Firestore | Cloud | Live social activity feeds, presence, and challenges |
| **Authentication** | Firebase Auth | Cloud | OAuth2/Social logins, JWT issuance, and RBAC |
| **AI Personalization** | TensorFlow Lite + FastAPI | Python 3.11 | Adaptive workout generation & fatigue prediction |
| **Computer Vision** | PyTorch / OpenCV + FastAPI | Python 3.11 | Food recognition & macronutrient estimation |
| **Caching Layer** | Redis | v7.2 | High-throughput session & leaderboard caching |
| **CI / CD** | GitHub Actions | Workflows | Automated linting, test suites, and build validation |

Detailed evaluations and decision matrices are documented in [docs/comparison-matrix.md](docs/comparison-matrix.md) and [docs/tech-stack-summary.md](docs/tech-stack-summary.md).

---

## 📂 Project Structure

```text
fitflow-redesign/
├── frontend/                 # React Native & Web client application
│   ├── package.json
│   ├── App.js                # App root entry point with navigation setup
│   └── src/
│       ├── components/       # Reusable UI components (DailyFlowCard, WorkoutTracker, etc.)
│       ├── navigation/       # Stack & bottom tab navigator configuration
│       └── screens/          # Primary screens (HomeScreen, WorkoutScreen, NutritionScreen, SocialScreen)
├── backend/                  # Node.js Express API Gateway & Microservices
│   ├── package.json
│   └── src/
│       ├── server.js         # Main server initialization and routing entry point
│       ├── middleware/       # JWT auth validation, error handling, and rate limiters
│       └── routes/           # Domain routers (workout, social, nutrition, notifications)
├── ai-service/               # Python / FastAPI AI Personalization Service
│   ├── requirements.txt
│   ├── main.py               # TFLite model execution & workout recommendation endpoints
│   └── Dockerfile
├── cv-service/               # Python / FastAPI Computer Vision Service
│   ├── requirements.txt
│   ├── main.py               # Image processing & nutrition recognition endpoints
│   └── Dockerfile
├── docs/                     # Architectural documentation & project assets
│   ├── tech-stack-summary.md # Comprehensive technology stack rationale
│   ├── comparison-matrix.md  # Detailed decision tables & weighted matrices
│   ├── architecture-diagram.png # High-resolution system architecture diagram
│   └── adr/
│       └── ADR-001-technology-stack.md # Formal Architecture Decision Record
├── .github/
│   └── workflows/
│       └── ci.yml            # Automated CI workflow for test execution and linting
├── .gitignore                # Environment, build artifact, and dependency exclusion rules
└── README.md                 # Primary project documentation
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** >= 18.x.x
- **npm** >= 9.x.x
- **Python** >= 3.10
- **Git**

---

### 1. Frontend Setup (React Native)
```bash
cd frontend
npm install
npm start
# To run on iOS: npm run ios
# To run on Android: npm run android
# To run on Web: npm run web
```

### 2. Backend API Gateway Setup (Node.js)
```bash
cd backend
npm install
npm run dev
# Server boots at http://localhost:5000
# Health check available at http://localhost:5000/health
```

### 3. AI Personalization Microservice (Python)
```bash
cd ai-service
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8001 --reload
# API docs accessible at http://localhost:8001/docs
```

### 4. Computer Vision Microservice (Python)
```bash
cd cv-service
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8002 --reload
# API docs accessible at http://localhost:8002/docs
```

---

## 🔒 Security, Compliance & Data Privacy

FitFlow adheres to strict data privacy principles required for handling biometric and fitness metrics:
- **Zero-Trust Network**: All communication between client and backend occurs over TLS 1.3.
- **Row-Level Security (RLS)**: Enforced in PostgreSQL so users can only ever access their own biometrics and history.
- **Data Minimization**: Raw workout sensor data is processed on-device via TensorFlow Lite; only aggregate metrics are synced to the cloud.
- **Regulatory Governance**: Automated GDPR/CCPA data export and "Right to be Forgotten" deletion handlers implemented across all data stores.

---

## 👨‍💻 Author & Academic Attribution

- **Student Name**: B D Wanigatunga
- **Student ID**: IT23658790
- **Degree**: BSc (Hons) in Information Technology - Year 3, Semester 2
- **Institution**: Sri Lanka Institute of Information Technology (SLIIT)
- **Module**: IT3060 – Human Computer Interaction
- **GitHub Repository**: [https://github.com/Dasun002/fitflow-redesign](https://github.com/Dasun002/fitflow-redesign)
