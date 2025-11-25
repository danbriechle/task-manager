# Task Manager (Rails 8 + React + Vite + Docker)

---

# 🚀 Quick Start

## **1. Clone the repository**

```bash
git clone git@github.com:danbriechle/task-manager.git
cd task-manager
```

---

## **2. Start the full stack using Docker**

From the root directory (where `docker-compose.yml` lives):

```bash
docker compose up --build
```

This will:

- Build Rails backend image
- Build React frontend image
- Spin up Postgres
- Mount your local code inside the containers
- Start the Vite dev server on port **5173**
- Start Rails server on port **3000**
  You should see:
- Frontend at http://localhost:5173
- Backend at http://localhost:3000
- Postgres running inside Docker

---

## **3. Prepare and seed the database**

In a second terminal:

```bash
docker compose exec backend bundle exec rails db:prepare
docker compose exec backend bundle exec rails db:seed
```

This creates the DB schema and seeds 50 sample silly chores / tasks.

## **4. Visit the app**

### **Frontend**

👉 http://localhost:5173

### **Backend**

👉 http://localhost:3000/tasks

### Run backend tests

```bash
docker compose exec -e RAILS_ENV=test backend bundle exec rspec
```

# 📚 Future Enhancements

- search functionality is frontend filter only if the app was larger a hybrid filter would be ideal
- styling will make your eyes bleed but its a good start if you want to actually style it
- there are no subtasks
- there is no concept of task responsibility - I see this being a many to many joins to a user object
- delete raises no "are you sure" prompt
