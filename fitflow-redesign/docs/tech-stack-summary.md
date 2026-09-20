# FitFlow Redesign - Technology Stack Summary

## 1. Executive Summary
This document outlines the selected technology stack for the FitFlow mobile and web fitness platform redesign. Following rigorous evaluation of user experience needs, real-time social dynamics, on-device AI/ML personalization, and healthcare-grade data protection, a unified, scalable hybrid architecture has been selected.

---

## 2. Selected Technology Stack Overview

| Layer | Chosen Technology | Primary Purpose & Rationale |
| :--- | :--- | :--- |
| **Mobile & Web Client** | **React Native + React Native Web** | Single JavaScript/TypeScript codebase for iOS, Android, and Web. Ensures high UI velocity (~85–95% code reuse), native feel, and strong community support. |
| **Backend API Gateway & Services** | **Node.js with Express / NestJS** | Non-blocking event-driven architecture ideal for high-throughput I/O. Shares types and domain models with the React Native frontend. |
| **Primary System of Record** | **PostgreSQL** | Relational data store providing ACID compliance, strict foreign-key integrity, and Row-Level Security (RLS) for sensitive health and user profile metrics. |
| **Real-time & Social Layer** | **Firebase Firestore & Realtime DB** | Sub-second real-time sync for social activity feeds, peer challenges, presence indicators, and live streak updates. |
| **Authentication & IAM** | **Firebase Authentication** | Multi-provider OAuth2/social logins, seamless integration with Firestore security rules, secure JWT handling, and low operational maintenance. |
| **On-Device AI Engine** | **TensorFlow Lite (TFLite)** | Low-latency, privacy-preserving on-device ML model execution for the "Daily Flow" personalized recommendation engine. |
| **Cloud AI & CV Services** | **Python (FastAPI + PyTorch/OpenCV)** | High-accuracy computer vision pipeline for nutritional logging and meal image segmentation, with cloud fallback for heavy ML training. |
| **Caching & Session Store** | **Redis** | High-performance in-memory caching for leaderboards, user session states, and pre-computed personalized workout templates. |
| **Object Storage** | **Cloud Storage (S3 / Google Cloud Storage)** | Encrypted bucket storage for user workout logs, progress snapshots, and meal photos. |
| **Analytics & Compliance** | **BigQuery & Firebase Analytics** | Privacy-preserving retention analysis, event funnels, and tamper-evident audit logging for GDPR and CCPA compliance. |

---

## 3. Detailed Architectural Rationale

### 3.1 Frontend: React Native (+ React Native Web)
- **High Code Velocity**: A mid-sized engineering team can deliver synchronized feature rollouts across iOS and Android without duplicating business logic or component layouts.
- **Rich Interaction Model**: React Native's Reanimated 3 library provides smooth 60–120 FPS animations for workout timers, progress rings, and interactive exercise cards.
- **Native Health Ecosystem Integration**: Seamless bridges to Apple HealthKit and Android Health Connect ensure accurate background sync of steps, heart rate, and burned calories.

### 3.2 Backend: Node.js & Express / NestJS
- **Unified TypeScript Ecosystem**: Enables isomorphic TypeScript code sharing (validation schemas, types, DTOs) between mobile clients and microservices.
- **Microservices-Ready BFF**: Acts as a Backend-For-Frontend (BFF) orchestrating parallel requests between PostgreSQL, Firebase, Redis, and downstream AI services.

### 3.3 Hybrid Data Persistence: PostgreSQL + Firebase Firestore
- **Integrity vs. Velocity**:
  - *PostgreSQL* protects sensitive personal health information (PHI), payment logs, consent records, and historical workout stats requiring transactional integrity.
  - *Firestore* enables low-latency optimistic UI updates for social reactions, comments, live challenges, and notifications.
- **Regulatory Compliance**: Retaining PHI within PostgreSQL simplifies GDPR "Right to be Forgotten" and CCPA data export requests via strict database schemas and automated scrubbing routines.

### 3.4 Edge AI & Cloud Microservices
- **Edge Inference**: TFLite runs directly on mobile hardware to adapt rep targets and rest intervals in real time without network dependency or cloud latency.
- **Computer Vision Service**: Python FastAPI microservice receives captured meal photos, executes food recognition and volume estimation models, and returns structured macronutrient estimates in under 800ms.
