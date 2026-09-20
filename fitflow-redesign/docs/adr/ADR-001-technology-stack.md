# ADR-001: Hybrid PostgreSQL + Firebase Architecture with Node.js and React Native

## Status
**Accepted** (2026-09-20)

---

## Context
FitFlow is undergoing a full technical and architectural redesign following extensive user experience research, usability testing, and wireframe validation. The platform must support:
1. **Adaptive AI Personalization**: A dynamic "Daily Flow" workout generator that customizes routines using biometric inputs, past fatigue, and progress metrics.
2. **Camera-Based Nutrition Logging**: Instant recognition of meal items and macronutrient estimation via on-device and cloud computer vision.
3. **Real-time Social Community**: Private accountability circles, live challenge leaderboards, and streak celebrations.
4. **Offline Resilience**: Full offline functionality for active workout execution and meal logging, syncing seamlessly once network connectivity resumes.
5. **Healthcare Privacy & Compliance**: Strict handling of sensitive user metrics, biometrics, and activity logs under GDPR, CCPA, and health data governance rules.
6. **Engineering Velocity**: Efficient execution and maintenance by a mid-sized, cross-functional engineering team.

---

## Decision
We will adopt a **hybrid multi-tier cloud and edge architecture**:

1. **Frontend Client**: **React Native** (utilizing React Native Web for browser access).
   - Core state management via Redux Toolkit / Zustand.
   - On-device AI inference powered by **TensorFlow Lite**.
   - Offline storage handled by WatermelonDB / SQLite local cache.

2. **API Gateway / Backend-For-Frontend (BFF)**: **Node.js with Express / NestJS**.
   - Handles client authentication validation, rate limiting, request validation, and orchestrates downstream microservice communication.

3. **Hybrid Data Layer**:
   - **PostgreSQL**: Serves as the primary system of record for structured user profiles, workout history, health biometrics, privacy consent logs, and audit trails.
   - **Firebase Firestore / Realtime Database**: Serves as the real-time operational data store for private social circles, comments, live challenge leaderboards, and presence indicators.
   - **Redis**: In-memory caching for active workout templates, frequent user queries, and distributed rate limiting.
   - **Cloud Object Storage (S3 / GCS)**: Secure, encrypted blob storage for meal photos and profile media.

4. **Authentication & Identity**: **Firebase Authentication**.
   - Issues secure JWT tokens verified by both the API Gateway and Firebase Security Rules.
   - Provides native Apple, Google, and email/password sign-in.

5. **Specialized Microservices**:
   - **AI Personalization Microservice**: Python / FastAPI hosting machine learning models for workout volume adaptation and fatigue prediction.
   - **Computer Vision Microservice**: Python / FastAPI utilizing PyTorch and OpenCV for meal photo segmentation and macronutrient classification.

---

## Alternatives Considered

1. **Frontend**:
   - *Flutter*: Strong competitor with excellent animation performance; rejected due to smaller community talent pool, higher friction integrating native health SDKs, and heavier web output.
   - *Native Swift & Kotlin*: Best possible native performance; rejected because maintaining two independent codebases would roughly double development and maintenance costs.

2. **Backend**:
   - *Python / FastAPI for Entire Monolith*: Excellent for ML, but slower asynchronous I/O concurrency compared to Node.js event loop and lacks seamless code sharing with frontend developers.
   - *Go (Gin / Fiber)*: Superior raw execution speed; rejected due to longer development cycles and lack of team familiarity for rapid MVP iteration.

3. **Database**:
   - *Single Document Store (MongoDB / Firestore only)*: Insufficient relational guarantees and ACID transaction isolation for complex health metric history and regulatory audit logging.
   - *Pure Relational (PostgreSQL only)*: Building real-time multi-user live feed sync and socket subscriptions would require significant custom infrastructure compared to Firebase's managed push layer.

---

## Consequences

### Positive
- **Rapid Time-to-Market**: Shared TypeScript / JavaScript knowledge across client and backend teams enables high developer velocity.
- **Enterprise-Grade Compliance**: Clear segregation of sensitive health data in PostgreSQL simplifies HIPAA/GDPR auditability and deletion pipelines.
- **Instant Real-Time Engagement**: Firestore offloads real-time WebSocket socket management, drastically lowering backend operational overhead.
- **Offline Reliability**: Clients can log workouts and meals locally without network availability, automatically reconciling upon reconnect.

### Trade-offs & Mitigations
- **Dual Data Store Complexity**: Maintaining consistency across PostgreSQL and Firestore requires clear domain ownership boundaries:
  - *Mitigation*: PostgreSQL remains the authoritative source of truth. Firestore data is treated as ephemeral/cacheable social feeds. User IDs are unified via Firebase Auth UUIDs.
- **Native Bridge Overhead**: React Native JS-bridge latency on heavy animations:
  - *Mitigation*: Use React Native's New Architecture (Fabric + TurboModules) and execute performance-critical animations on the native UI thread via `react-native-reanimated`.
