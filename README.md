# 🚀 Synkora — Hyperlocal Skill Exchange Platform

**Learn what you need by teaching what you know.**

Synkora is a community-driven skill exchange platform where users can **teach a skill they know** and **learn a skill they want**.  
Instead of depending only on money, Synkora uses a **credit-based learning model** to make education more **affordable, accessible, and inclusive**.

---

## 🌟 Overview

Many learners want to gain new skills, but paid courses, mentors, and private sessions are often expensive. At the same time, many people already have valuable skills they can share.

**Synkora solves this problem by turning knowledge into value.**

On Synkora, users can:

- 🧠 Teach what they know
- 📚 Learn what they want
- 🔄 Exchange skills with other users
- 💳 Earn credits by teaching
- 📍 Connect with relevant users
- 💸 Use paid learning when exchange is not possible

This creates a fair learning ecosystem where users can grow through **teaching, learning, and collaboration**.

---

## 🎯 Problem Statement

Access to learning is often limited by:

- 💸 High cost of courses and mentorship
- 🌍 Limited access to quality learning opportunities
- 🤝 Lack of platforms for peer-to-peer skill exchange
- ⚖️ Unequal access to practical, community-driven education

Many users have the ability to teach, but no platform exists where they can use that skill to earn learning opportunities in return.

---

## 💡 Our Solution

Synkora is a **peer-to-peer skill exchange platform** that enables users to learn skills without depending only on money.

### The core idea:
A user can **learn a new skill by teaching a skill they already know**.

To support this, Synkora provides:

- **Skill-based matching**
- **Matching probability**
- **Credit-based learning**
- **Profile-based discovery**
- **Paid learning fallback option**

This makes learning more flexible and accessible for people who may not be able to afford traditional learning resources.

---

## 🔄 Credit-Based Learning System

Synkora introduces a **time-credit model** to reduce direct money flow and encourage community learning.

### Rules:
- **1 hour of teaching = 1 credit earned**
- **1 hour of learning = 1 credit spent**

### How it works:
- Users teach others to earn credits
- Users spend credits to learn new skills
- Credits are added only after sessions are completed
- This ensures fairness and encourages real participation

---

## 🧠 Matching Engine

Synkora’s matching engine does not only show strict reciprocal matches.

It shows:

- Relevant users
- Matching probability
- Better-ranked skill partners

### Example:
If two users have exact reciprocal skill requirements, the system can show a **100% match**.

This improves discovery and increases the chance of finding a useful learning partner.

---

## ⚙️ Current Features

### 🔐 Authentication
- User registration
- User login
- Protected routes for logged-in users
- LocalStorage-based auth for prototype/demo

### 👤 Profile & Dashboard
- View current profile details
- Edit personal information
- Update city/location
- Update skills user can teach
- Update skills user wants to learn

### 🔍 Discover & Match
- Discover relevant users
- Matching probability system
- Better recommendations instead of strict-only matching

### 📚 Sessions
- View possible skill exchange partners
- Explore learning opportunities

### 💳 Credit-Based Learning Concept
- Teach to earn credits
- Learn by spending credits
- Paid option available when exchange is not possible

---

## 🧱 MVP Scope

This hackathon prototype currently focuses on the core experience:

- ✅ User authentication
- ✅ Profile creation and editing
- ✅ Skill-based matching
- ✅ Matching probability logic
- ✅ Dashboard management
- ✅ Sessions/discovery flow
- ✅ Credit-based learning concept
- ✅ Paid fallback option concept

---

## 🛠️ Tech Stack

### Frontend
- **React.js**
- **Vite**
- **React Router**
- **Context API**
- **CSS**

### Current Storage
- **LocalStorage** (for prototype/demo)

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Sudhanshu-Singh-Parmar/Synkora
```

### 2. Open the project folder

```bash
cd synkora
```

### 3. Install dependencies

```bash
npm install
```

### 4. Run the development server

```bash
npm run dev
```

### 5. Open in browser

```bash
http://localhost:5173
```

---

## 📌 Demo Flow

1. Register or log in
2. Create or update your profile
3. Add skills you can teach
4. Add skills you want to learn
5. Go to the dashboard
6. Discover relevant users
7. View matching probability
8. Explore sessions and learning opportunities

---

## 🎥 Demo / Deployment

- **Live Demo:** `https://synkora-three.vercel.app/`

---

## ❤️ Why Synkora Matters

Synkora supports **Inclusive Education & Digital Equality** by making learning:

- More affordable
- More community-driven
- More practical
- Less dependent on money
- Accessible through peer knowledge sharing

It empowers people to grow by contributing their own skills first.

---

## 🔮 Future Features & Improvements

Below are the features planned for future versions to make Synkora more scalable, optimized, secure, and production-ready.

### 1. Backend Integration (Node.js / Express)

**Purpose:**  
To move core logic, authentication, credits, sessions, and user management from frontend-only storage to a secure server.

**Why important:**
- Improves security
- Enables real user accounts
- Prevents fake or easily editable local data
- Makes the platform scalable for many users

---

### 2. Database Integration (MongoDB / PostgreSQL)

**Purpose:**  
To permanently store user profiles, sessions, credits, skill history, and transactions.

**Why important:**
- Makes data persistent across devices
- Supports large-scale user growth
- Enables better search, analytics, and management
- Helps maintain session and credit records properly

---

### 3. Secure Authentication (JWT / OAuth)

**Purpose:**  
To provide secure login and account management.

**Why important:**
- Protects user accounts
- Supports token-based session handling
- Can enable Google login / social login in future
- Makes the platform production-ready

---

### 4. Real Credit Wallet System

**Purpose:**  
To properly track earned, spent, pending, and refunded credits.

**Why important:**
- Makes the learning economy more transparent
- Prevents credit misuse
- Helps users see their complete activity history
- Enables reward and incentive systems

---

### 5. Session Booking & Scheduling System

**Purpose:**  
To allow users to request, accept, reject, and schedule sessions.

**Why important:**
- Makes the exchange process organized
- Reduces confusion between users
- Enables session reminders and better planning
- Supports online and offline learning modes

---

### 6. Session Completion Verification

**Purpose:**  
To confirm that both users actually completed the session before credits are added.

**Why important:**
- Prevents fraud
- Builds trust between users
- Ensures fair credit distribution
- Strengthens platform reliability

---

### 7. In-App Chat / Messaging

**Purpose:**  
To allow matched users to communicate directly inside the platform.

**Why important:**
- Improves user engagement
- Makes coordination easier
- Reduces dependence on external apps
- Helps users discuss learning goals and timing

---

### 8. Notifications System

**Purpose:**  
To notify users about session requests, acceptances, reminders, messages, and credit updates.

**Why important:**
- Keeps users active and informed
- Improves response rate
- Increases platform usability
- Helps maintain smooth interaction flow

---

### 9. Ratings & Reviews

**Purpose:**  
To let users rate each other after teaching/learning sessions.

**Why important:**
- Builds trust in the community
- Helps users choose better learning partners
- Rewards high-quality teachers
- Reduces bad experiences

---

### 10. Advanced Matching Engine

**Purpose:**  
To improve user recommendations using more parameters.

**Can include:**
- Skill overlap
- Skill level
- Learning goals
- City/location
- Availability
- Past session success
- Ratings

**Why important:**
- Produces better matches
- Improves conversion from match to session
- Makes discovery smarter and more useful

---

### 11. AI-Based Recommendation System

**Purpose:**  
To recommend the best mentors, learners, and skill partners automatically.

**Why important:**
- Makes the platform more intelligent
- Gives users personalized suggestions
- Improves the learning experience
- Helps scale matching for larger communities

---

### 12. Payment Gateway Integration

**Purpose:**  
To support the fallback option where users can pay when exchange or credits are not possible.

**Why important:**
- Adds flexibility
- Prevents learning from stopping
- Supports premium teaching use cases
- Helps platform monetization in future

---

### 13. Skill Verification / Badges

**Purpose:**  
To verify whether a user is genuinely skilled in what they claim to teach.

**Why important:**
- Builds user trust
- Improves teaching quality
- Makes the platform more reliable
- Encourages credibility

---

### 14. Admin Panel

**Purpose:**  
To manage users, monitor sessions, resolve disputes, review reports, and oversee platform health.

**Why important:**
- Improves moderation
- Enhances trust and safety
- Helps maintain quality
- Essential for scaling the platform

---

### 15. Analytics Dashboard

**Purpose:**  
To track user growth, session counts, credit flow, popular skills, and engagement.

**Why important:**
- Helps understand user behavior
- Supports better product decisions
- Identifies growth opportunities
- Useful for future scaling and optimization

---

### 16. Cloud Storage & Media Support

**Purpose:**  
To allow users to upload profile images, certificates, and proof of skills.

**Why important:**
- Improves profile quality
- Increases trust
- Makes the platform more complete
- Supports richer user identity

---

### 17. Mobile Responsiveness & Mobile App

**Purpose:**  
To make Synkora accessible across all devices.

**Why important:**
- Improves usability
- Increases adoption
- Supports learning on the go
- Expands reach to more users

---

### 18. Real-Time Features

**Purpose:**  
To enable real-time chat, live session updates, and instant notifications.

**Why important:**
- Improves user experience
- Keeps interaction smooth
- Makes the platform feel modern and active
- Helpful for growing communities

---

### 19. Multi-City / Hyperlocal Expansion

**Purpose:**  
To scale Synkora beyond one local region to multiple cities and communities.

**Why important:**
- Expands platform impact
- Increases number of matches
- Enables regional learning ecosystems
- Makes growth sustainable

---

### 20. Deployment Optimization

**Purpose:**  
To host frontend, backend, and database efficiently for speed and reliability.

**Why important:**
- Improves performance
- Reduces downtime
- Supports more users
- Makes the product production-ready

**Possible stack:**
- Frontend: Vercel / Netlify
- Backend: Render
- Database: MongoDB Atlas / PostgreSQL
- Media: Cloudinary / Firebase Storage

---

## 🏗️ Planned Scalable Architecture

A more production-ready version of Synkora can be built using:

- **Frontend:** React + Vite
- **Backend:** Node.js + Express
- **Database:** MongoDB Atlas or PostgreSQL
- **Authentication:** JWT / OAuth
- **Real-time Features:** Socket.io
- **Payments:** Razorpay / Stripe
- **Deployment:** Vercel + Render
- **Media Storage:** Cloudinary
- **Caching / Performance:** Redis
- **Analytics:** Custom dashboard / third-party analytics tools

---

## 👨‍💻 Team
- Sudhanshu Singh Parmar
- Bhanu Saran
- Prashant Singh
- Priyanshu
- Rishi Kumar

---

## 🏁 Final Note

Synkora is more than a platform — it is a learning ecosystem built on **sharing, collaboration, and equal opportunity**.

By allowing users to **teach, earn, and learn**, Synkora reduces barriers to education and promotes a more inclusive digital future.

**Learn what you need by teaching what you know.**

---
