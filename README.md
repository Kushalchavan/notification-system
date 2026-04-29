# 🚀 Notification System (Async Backend with Redis & BullMQ)

A scalable **Notification System** built using Node.js, TypeScript, PostgreSQL, Redis, and BullMQ.  
This project demonstrates real-world backend architecture with **asynchronous job processing, idempotency, and worker-based design**.

---

## 🧠 Architecture Overview

```text
Client → API → Database (PostgreSQL)
              ↓
           Redis (Queue)
              ↓
        Worker (BullMQ)


- API stores notification in DB
- Pushes job to Redis queue
- Worker processes job asynchronously

```

## ✨ Features

- ✅ Asynchronous job processing using **BullMQ**
- ✅ Redis-based queue system
- ✅ Worker architecture (background processing)
- ✅ Idempotency support (prevents duplicate requests)
- ✅ Retry-ready schema (`retry_count`, `max_retries`)
- ✅ Clean layered architecture (Controller → Service → Repository)
- ✅ Type-safe backend with TypeScript
- ✅ PostgreSQL integration using raw queries

---

## 🛠️ Tech Stack

- **Backend:** Node.js, TypeScript, Express
- **Database:** PostgreSQL
- **Queue:** Redis + BullMQ
- **Tooling:** tsx, nodemon

---

```md
## 📂 Project Structure

```bash
src/
├── config/        # DB, Redis, env configs
├── controllers/   # Request handlers
├── service/       # Business logic
├── repository/    # DB queries
├── queues/        # BullMQ queue setup
├── workers/       # Background job processors
├── types/         # TypeScript types
├── dto/           # Data transfer objects
├── middlewares/   # Error handling
---
```
``

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository

```bash
git clone <your-repo-url>
cd notification-system
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Setup environment variables

```env
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_NAME=notification-system

REDIS_HOST=127.0.0.1
REDIS_PORT=6379
```


### 4️⃣ Start Redis (Docker)
 
```bash
docker run -d -p 6379:6379 redis
```

### 5️⃣ Start API server

```bash
npm run dev
```

### 6️⃣ Start Worker (separate terminal)

```bash
npx tsx src/workers/notification.worker.ts
```

## 🧪 API Usage
Create Notification

```bash
POST /api/v1/notifications
```

```json
{
  "user_id": "user_123",
  "type": "EMAIL",
  "message": "Hello",
  "email": "user@email.com"
}
```

### Headers:
```bash
idempotency_key: unique-key-123
```


## 🔁 Notification Lifecycle

```text
PENDING → PROCESSING → SENT
                     ↘ FAILED
```


### 🧠 Key Concepts Implemented
🔹 Idempotency
Prevents duplicate requests using unique keys
Ensures safe retries

🔹 Queue-based Processing
API remains fast
Heavy tasks handled in background

🔹 Worker System
Decouples processing from request lifecycle
Enables scalability
 
### 💡 Learnings

This project helped in understanding:

* Distributed system basics
* Async processing patterns
* Queue-based architectures
* Backend scalability concepts


### 👨‍💻 Author

Kushal Chavan