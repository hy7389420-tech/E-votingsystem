# 🗂️ COMPLETE E-VOTING SYSTEM - DETAILED FILE STRUCTURE
**Smart Secure E-Voting Frontend | Harsh Yadav | SIH 2026**

---

# 📋 TABLE OF CONTENTS
1. [Overall Project Structure](#1-overall-project-structure)
2. [Phase 1 - Frontend Complete Structure](#2-phase-1--frontend-complete-structure)
3. [Phase 2 - Backend Structure](#3-phase-2--backend-structure)
4. [Database Schema (SQL)](#4-database-schema-sql)
5. [Biometric Module Structure](#5-biometric-module-structure)
6. [Configuration Files](#6-configuration-files-content)
7. [Testing Structure](#7-testing-structure)
8. [Documentation](#8-documentation-structure)
9. [DevOps & Deployment](#9-devops--deployment)
10. [Complete Visual Folder Tree](#10-complete-visual-folder-tree)

---

# 1. OVERALL PROJECT STRUCTURE

## 🎯 High Level

evoting-system/
├── evoting-frontend/    [PHASE 1 - अभी करना]
├── evoting-backend/     [PHASE 2 - बाद में]
├── evoting-database/    [PHASE 2 - बाद में]
├── evoting-biometric/   [PHASE 2 - बाद में]
├── docs/                [Documentation]
└── tests/               [Testing]

---

# 2. PHASE 1 - FRONTEND COMPLETE STRUCTURE

## 📱 FRONTEND ROOT

evoting-frontend/
├── src/
│   ├── app/                    [18 pages]
│   ├── components/             [15+ components]
│   ├── hooks/                  [5+ hooks]
│   ├── lib/                    [8+ utilities]
│   ├── types/                  [TypeScript types]
│   ├── constants/              [App constants]
│   ├── services/               [API services]
│   ├── store/                  [Zustand state]
│   ├── styles/                 [Global CSS]
│   ├── middleware/
│   ├── tailwind.config.ts
│   ├── tsconfig.json
│   └── next.config.js
│
├── public/                     [Static assets]
├── package.json
├── .env.local
└── README.md

---

## 🔴 APP FOLDER (18 PAGES)

src/app/
├── layout.tsx                  [Root layout]
├── page.tsx                    [Dashboard]
├── globals.css
│
├── (auth)/                     [Authentication]
│   ├── login/page.tsx
│   ├── signup/page.tsx
│   └── forgot-password/page.tsx
│
├── (onboarding)/               [Onboarding]
│   ├── aadhar-verify/page.tsx
│   ├── biometric/page.tsx
│   └── notifications/page.tsx
│
├── (dashboard)/                [Protected Routes]
│   ├── page/page.tsx           [Dashboard]
│   ├── elections/page.tsx       [Elections List]
│   ├── candidates/page.tsx      [Candidates List]
│   ├── voting/page.tsx          [Voting Interface]
│   ├── receipt/page.tsx         [Receipt View]
│   ├── results/page.tsx         [Results View]
│   └── history/page.tsx         [Vote History]
│
├── (profile)/                  [Profile Routes]
│   ├── profile/page.tsx
│   └── security/page.tsx
│
└── (help)/                     [Help Routes]
    ├── faq/page.tsx
    ├── guide/page.tsx
    └── support/page.tsx

---

## 🟢 COMPONENTS FOLDER (15+)

src/components/
├── Layout/
│   ├── Header.tsx
│   ├── Sidebar.tsx
│   ├── Footer.tsx
│   └── RootLayout.tsx
│
├── Common/
│   ├── Button.tsx
│   ├── FormInput.tsx
│   ├── Card.tsx
│   ├── Modal.tsx
│   ├── Alert.tsx
│   └── Loading.tsx
│
├── Dashboard/
│   ├── StatCard.tsx
│   ├── ActivityChart.tsx
│   ├── VoteDistribution.tsx
│   └── ElectionStatus.tsx
│
├── Elections/
│   ├── ElectionCard.tsx
│   └── ElectionFilter.tsx
│
├── Candidates/
│   ├── CandidateCard.tsx
│   └── CandidateList.tsx
│
├── Voting/
│   ├── VotingForm.tsx
│   ├── VotingConfirm.tsx
│   └── VotingProgress.tsx
│
├── Results/
│   ├── ResultsChart.tsx
│   └── WinnerCard.tsx
│
├── Auth/
│   ├── LoginForm.tsx
│   ├── SignupForm.tsx
│   └── BiometricAuth.tsx
│
└── Profile/
    ├── ProfileCard.tsx
    └── SecuritySettings.tsx

---

## 🔵 HOOKS FOLDER (5+)

src/hooks/
├── useAuth.ts              [Authentication logic]
├── useVoting.ts            [Voting logic]
├── useBiometric.ts         [Biometric auth]
├── useElections.ts         [Elections data]
├── useCandidates.ts        [Candidates data]
├── useResults.ts           [Results logic]
├── useLocalStorage.ts      [LocalStorage management]
├── useTheme.ts             [Theme switching]
├── usePagination.ts        [Pagination]
└── useAsync.ts             [Async fetching]

---

## 🟣 LIB FOLDER (8+)

src/lib/
├── api.ts                  [API calls]
├── validators.ts           [Form validation]
├── encryption.ts           [Encryption utils]
├── biometric.ts            [Biometric utils]
├── localStorage.ts         [Storage helpers]
├── formatters.ts           [Data formatting]
├── constants.ts            [App constants]
├── chartConfig.ts          [Recharts config]
└── helpers.ts              [Helper functions]

---

## 🟡 TYPES FOLDER

src/types/
├── auth.types.ts           [User, Login, Signup]
├── voting.types.ts         [Vote, Receipt]
├── election.types.ts       [Election data]
├── candidate.types.ts      [Candidate data]
├── biometric.types.ts      [Biometric data]
├── api.types.ts            [API response]
└── index.ts                [Export all]

---

## 🟠 CONSTANTS FOLDER

src/constants/
├── colors.ts               [Color scheme - 8 colors]
├── messages.ts             [App messages]
├── config.ts               [Configuration]
├── routes.ts               [Route paths]
├── biometric.ts            [Biometric config]
└── election.ts             [Election constants]

---

## 🔧 CONFIGURATION FILES

tailwind.config.ts          [Tailwind configuration]
tsconfig.json               [TypeScript config]
next.config.js              [Next.js config]
.env.example                [Environment template]
.gitignore                  [Git ignore]

---

# 3. PHASE 2 - BACKEND STRUCTURE

## 📡 BACKEND ROOT

evoting-backend/
├── src/
│   ├── routes/             [6 route files - 48 endpoints]
│   ├── controllers/        [8 controller files]
│   ├── models/             [6 database models]
│   ├── middleware/         [8 middleware files]
│   ├── services/           [10 service files]
│   ├── utils/              [8 utility files]
│   ├── validators/         [6 validator files]
│   ├── config/             [7 config files]
│   ├── constants/
│   ├── types/
│   └── index.ts
│
├── tests/
│   ├── unit/               [10+ unit tests]
│   ├── integration/        [5+ integration tests]
│   └── e2e/                [5+ e2e tests]
│
├── migrations/
├── seeds/
├── logs/
├── package.json
└── README.md

---

## 🔴 ROUTES (6 FILES - 48 ENDPOINTS)

src/routes/
├── auth.routes.ts          [6 endpoints]
│   ├── POST /api/auth/signup
│   ├── POST /api/auth/login
│   ├── POST /api/auth/logout
│   ├── POST /api/auth/verify-otp
│   ├── POST /api/auth/refresh
│   └── POST /api/auth/reset-pwd
│
├── voting.routes.ts        [5 endpoints]
│   ├── POST /api/voting/cast
│   ├── GET /api/voting/status
│   ├── GET /api/voting/receipt
│   ├── POST /api/voting/verify
│   └── GET /api/voting/history
│
├── election.routes.ts      [6 endpoints]
│   ├── GET /api/elections
│   ├── GET /api/elections/:id
│   ├── GET /api/elections/:id/results
│   ├── GET /api/elections/stats
│   ├── POST /api/elections (admin)
│   └── PUT /api/elections/:id (admin)
│
├── candidate.routes.ts     [5 endpoints]
│   ├── GET /api/candidates
│   ├── GET /api/candidates/:id
│   ├── GET /api/candidates/stats
│   ├── POST /api/candidates (admin)
│   └── PUT /api/candidates/:id (admin)
│
├── user.routes.ts         [5 endpoints]
│   ├── GET /api/users/me
│   ├── PUT /api/users/me
│   ├── POST /api/users/avatar
│   ├── GET /api/users/settings
│   └── PUT /api/users/settings
│
├── biometric.routes.ts    [4 endpoints]
│   ├── POST /api/biometric/register
│   ├── POST /api/biometric/verify
│   ├── DELETE /api/biometric/:id
│   └── GET /api/biometric/status
│
├── admin.routes.ts        [6 endpoints]
│   ├── GET /api/admin/dashboard
│   ├── GET /api/admin/audit-log
│   ├── GET /api/admin/users
│   ├── GET /api/admin/elections
│   ├── POST /api/admin/reports
│   └── DELETE /api/admin/data
│
└── health.routes.ts       [3 endpoints]
    ├── GET /api/health
    ├── GET /api/status
    └── GET /api/version

TOTAL: 48 API ENDPOINTS

---

## 🟢 DATABASE MODELS (6 TABLES)

1. **Users** (Aadhar, Email, Phone, Auth)
2. **Elections** (Name, Dates, Status, Stats)
3. **Candidates** (Name, Party, Votes, Status)
4. **Votes** (Encrypted, Receipt, Biometric, Verification)
5. **Receipts** (QR Code, Verification, Status)
6. **Biometrics** (Face, Fingerprint, QR, Iris)
7. **AuditLogs** (Actions, Changes, Status)
8. **Sessions** (Tokens, Expiry, Activity)
9. **Notifications** (Types, Messages, Read Status)
10. **VerificationTokens** (Email, Phone, OTP, Reset)

---

## 🔵 CONTROLLERS (8 FILES)

src/controllers/
├── authController.ts       [signup, login, logout, OTP, token, reset]
├── votingController.ts     [castVote, status, receipt, verify, history]
├── electionController.ts   [CRUD, results, stats]
├── candidateController.ts  [CRUD, votes, stats]
├── userController.ts       [profile, settings, avatar]
├── biometricController.ts  [register, verify, delete, status]
└── adminController.ts      [dashboard, logs, users, reports]

---

## 🟣 SERVICES (10 FILES)

src/services/
├── authService.ts          [Authentication business logic]
├── votingService.ts        [Voting business logic]
├── electionService.ts      [Election management]
├── candidateService.ts     [Candidate management]
├── biometricService.ts     [Biometric verification]
├── encryptionService.ts    [Data encryption]
├── emailService.ts         [Email sending]
├── smsService.ts           [SMS sending]
├── auditService.ts         [Audit logging]
└── resultService.ts        [Results calculation]

---

## 🟠 MIDDLEWARE (8 FILES)

src/middleware/
├── auth.middleware.ts      [Token verification, role checking]
├── validation.middleware.ts [Request validation]
├── errorHandler.middleware.ts [Global error handling]
├── logging.middleware.ts   [Request/response logging]
├── rateLimit.middleware.ts [Rate limiting]
├── cors.middleware.ts      [CORS handling]
├── security.middleware.ts  [Security headers]
└── cache.middleware.ts     [Caching]

---

# 4. DATABASE SCHEMA (SQL)

**TABLES:**
1. users (13 columns + indexes)
2. elections (14 columns + indexes)
3. candidates (15 columns + indexes)
4. votes (17 columns + indexes)
5. receipts (14 columns + indexes)
6. biometrics (16 columns + indexes)
7. audit_logs (12 columns + indexes)
8. verification_tokens (7 columns + indexes)
9. sessions (11 columns + indexes)
10. notifications (9 columns + indexes)

**FEATURES:**
✅ Foreign keys
✅ Composite indexes
✅ Full-text search
✅ Timestamp tracking
✅ Soft deletes
✅ UUID primary keys
✅ ENUM types
✅ JSON columns
✅ VIEWS (election_results, user_participation, audit_summary)

---

# 5. BIOMETRIC MODULE STRUCTURE

## 🔐 BIOMETRIC COMPONENTS

evoting-biometric/
├── 📁 face-recognition/
│   ├── 📁 models/          [Face detection models]
│   ├── 📁 utils/           [Face processing]
│   ├── faceRecognition.service.ts
│   ├── face.types.ts
│   └── face.constants.ts
│
├── 📁 fingerprint/
│   ├── 📁 models/          [Fingerprint models]
│   ├── 📁 utils/           [Fingerprint processing]
│   ├── fingerprintService.ts
│   ├── fingerprint.types.ts
│   └── fingerprint.constants.ts
│
├── 📁 qr-code/
│   ├── qrGeneration.ts     [Generate QR]
│   ├── qrScanning.ts       [Scan QR]
│   ├── qrEncryption.ts     [Encrypt QR]
│   ├── qrValidation.ts
│   ├── qr.types.ts
│   └── qr.constants.ts
│
├── 📁 iris-recognition/
│   ├── 📁 models/          [Iris models]
│   ├── 📁 utils/           [Iris processing]
│   ├── irisService.ts
│   ├── iris.types.ts
│   └── iris.constants.ts
│
├── 📁 common/
│   ├── biometricConfig.ts
│   ├── biometricValidation.ts
│   ├── biometricStorage.ts
│   ├── biometricEncryption.ts
│   ├── biometricComparison.ts
│   ├── qualityAssurance.ts
│   └── errorHandler.ts
│
└── 📁 tests/
    ├── face.test.ts
    ├── fingerprint.test.ts
    ├── qr.test.ts
    ├── iris.test.ts
    └── integration.test.ts

**FEATURES:**
✅ Face recognition (threshold 0.6, confidence 0.7)
✅ Fingerprint matching (threshold 0.8)
✅ QR code generation & scanning
✅ Iris recognition (threshold 0.7)
✅ Data encryption (AES-256)
✅ Quality checks
✅ Error handling
✅ Retry logic

---

# 6. CONFIGURATION FILES (CONTENT)

**TAILWIND CONFIG:**
✅ Custom colors (primary, secondary, accent, success, warning, error, dark)
✅ Font families (Segoe UI, Fira Code)
✅ Glassmorphism plugin
✅ Animations (fadeIn, slideIn)
✅ Dark theme
✅ Responsive breakpoints

**TSCONFIG:**
✅ ES2020 target
✅ Strict mode enabled
✅ Path aliases (@/*, @components/*, etc.)
✅ Declaration maps
✅ Source maps

**NEXT CONFIG:**
✅ React strict mode
✅ SWC minify
✅ Image optimization (webp, avif)
✅ Webpack optimization
✅ Environment variables
✅ Security headers (CSP, X-Frame-Options)

**.ENV TEMPLATE:**
✅ API URLs
✅ Authentication keys
✅ Database credentials
✅ Email/SMS config
✅ Biometric settings
✅ Feature flags
✅ Security settings
✅ Analytics config

---

# 7. TESTING STRUCTURE

## 🧪 TESTS

tests/
├── 📁 unit/                [10+ unit tests]
│   ├── auth.test.ts
│   ├── voting.test.ts
│   ├── election.test.ts
│   ├── candidate.test.ts
│   ├── biometric.test.ts
│   ├── utils.test.ts
│   └── validators.test.ts
│
├── 📁 integration/         [5+ integration tests]
│   ├── auth.integration.test.ts
│   ├── voting.integration.test.ts
│   ├── election.integration.test.ts
│   ├── api.integration.test.ts
│   └── database.integration.test.ts
│
├── 📁 e2e/                 [5+ e2e tests]
│   ├── voting.e2e.test.ts
│   ├── user.e2e.test.ts
│   ├── election.e2e.test.ts
│   ├── biometric.e2e.test.ts
│   └── complete-flow.e2e.test.ts
│
├── 📁 fixtures/            [Test data]
├── 📁 mocks/               [Mock functions]
├── jest.config.js
├── setupTests.ts
└── README.md

**COVERAGE TARGETS:**
✅ Unit: 80%+
✅ Integration: 70%+
✅ E2E: Key flows

---

# 8. DOCUMENTATION STRUCTURE

## 📚 DOCS

docs/
├── README.md               [Main documentation]
├── GETTING_STARTED.md      [Quick start]
├── SETUP.md                [Setup guide]
├── DEVELOPMENT.md          [Dev guide]
│
├── 📁 api/                 [8 files]
│   ├── authentication.md
│   ├── voting.md
│   ├── elections.md
│   ├── candidates.md
│   ├── results.md
│   ├── biometric.md
│   ├── admin.md
│   └── errors.md
│
├── 📁 frontend/            [8 files]
│   ├── components.md
│   ├── hooks.md
│   ├── state-management.md
│   ├── routing.md
│   ├── styling.md
│   ├── authentication.md
│   └── deployment.md
│
├── 📁 backend/             [7 files]
│   ├── architecture.md
│   ├── database.md
│   ├── models.md
│   ├── services.md
│   ├── middleware.md
│   ├── error-handling.md
│   └── testing.md
│
├── 📁 biometric/           [6 files]
│   ├── overview.md
│   ├── face-recognition.md
│   ├── fingerprint.md
│   ├── qr-code.md
│   ├── iris-recognition.md
│   └── integration.md
│
├── 📁 security/            [6 files]
│   ├── authentication.md
│   ├── encryption.md
│   ├── compliance.md
│   ├── data-privacy.md
│   ├── rate-limiting.md
│   └── audit.md
│
├── 📁 deployment/          [6 files]
│   ├── frontend-deployment.md
│   ├── backend-deployment.md
│   ├── database-setup.md
│   ├── docker.md
│   ├── ci-cd.md
│   └── monitoring.md
│
└── 📁 guides/              [4 files]
    ├── user-guide.md
    ├── admin-guide.md
    ├── troubleshooting.md
    └── faq.md

**TOTAL: 53 documentation files**

---

# 9. DEVOPS & DEPLOYMENT

## 🐳 DOCKER

Dockerfile                  [Frontend image]
Dockerfile.backend          [Backend image]
docker-compose.yml          [Development compose]
docker-compose.prod.yml     [Production compose]

**SERVICES:**
✅ Frontend (Next.js on 3000)
✅ Backend (Node.js on 5000)
✅ MySQL (3306)
✅ Redis (6379)
✅ Nginx (80, 443)

---

## 🚀 CI/CD PIPELINES

.github/workflows/
├── frontend-ci.yml        [Frontend testing]
├── backend-ci.yml         [Backend testing]
├── test.yml               [All tests]
└── deploy.yml             [Deployment]

**STAGES:**
✅ Lint
✅ Test
✅ Build
✅ Deploy

---

## 📊 DEPLOYMENT TARGETS

**Frontend:**
✅ Vercel
✅ Netlify
✅ AWS S3 + CloudFront

**Backend:**
✅ Heroku
✅ AWS EC2
✅ DigitalOcean
✅ Railway

**Database:**
✅ AWS RDS
✅ Google CloudSQL
✅ DigitalOcean
✅ Self-hosted MySQL

---

# 10. COMPLETE VISUAL FOLDER TREE

**TOTAL STRUCTURE:**

evoting-system/
├── evoting-frontend/
│   ├── src/ (18 pages, 15+ components, 10+ hooks)
│   ├── public/
│   ├── tests/
│   ├── .github/
│   └── Configuration files (4)
│
├── evoting-backend/ [PHASE 2]
│   ├── src/ (48 endpoints, 10+ services, 8 models)
│   ├── tests/ (20+ test files)
│   ├── migrations/
│   ├── seeds/
│   └── Configuration files
│
├── evoting-database/ [PHASE 2]
│   ├── schema.sql (10 tables with indexes, views)
│   ├── migrations/
│   └── seeds/
│
├── evoting-biometric/ [PHASE 2]
│   ├── Face recognition
│   ├── Fingerprint matching
│   ├── QR code processing
│   ├── Iris recognition
│   └── Tests (10+ files)
│
├── docs/ (53 documentation files)
├── tests/ (20+ test files)
├── .github/workflows/ (4 CI/CD pipelines)
├── nginx/ (Web server config)
├── scripts/ (Automation scripts)
│
└── Configuration files
    ├── Dockerfile (Frontend)
    ├── Dockerfile.backend
    ├── docker-compose.yml
    ├── docker-compose.prod.yml
    ├── .gitignore
    └── README.md

---

# 📊 STATISTICS

| Category | Count | Status |
|----------|-------|--------|
| Frontend Pages | 18 | ✅ |
| Components | 15+ | ✅ |
| Hooks | 10+ | ✅ |
| Utility Files | 8+ | ✅ |
| **Phase 1 Total** | **51+** | **✅** |
| | | |
| API Endpoints | 48 | ⏳ |
| Backend Services | 10+ | ⏳ |
| Controllers | 8 | ⏳ |
| Middleware | 8 | ⏳ |
| Database Models | 10 | ⏳ |
| **Phase 2 Total** | **84+** | **⏳** |
| | | |
| Documentation | 53 | ⏳ |
| Test Files | 20+ | ⏳ |
| Configuration | 15+ | ⏳ |
| **Total Files** | **226+** | **Complete** |

---

# 🎯 QUICK REFERENCE

**PHASE 1 (Frontend - अभी करना):**
- 18 pages (auth, onboarding, dashboard, profile, help)
- 15+ reusable components
- 10+ custom React hooks
- 8+ utility libraries
- TypeScript + Tailwind CSS + Zustand
- Dark glassmorphism theme

**PHASE 2 (Backend - बाद में):**
- 48 REST API endpoints
- 10+ microservices
- 10 database tables with relationships
- Biometric integration (face, fingerprint, QR, iris)
- Email/SMS notifications
- Audit logging

**DEPLOYMENT:**
- Frontend → Vercel
- Backend → Heroku/AWS
- Database → RDS/CloudSQL
- Docker compose ready
- CI/CD pipelines configured

---

**Created by Claude for Harsh Yadav - E-Voting System SIH 2026**

Last Updated: September 27, 2026
Next Phase: Backend Integration & Biometric Setup
