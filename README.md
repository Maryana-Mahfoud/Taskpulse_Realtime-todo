# ⚡ TaskPulse

**A real-time to-do app that syncs instantly across every open screen.**
Add a task on your phone, watch it appear on your laptop, no refresh needed.

Built with **React + TypeScript + Tailwind CSS v4 + Firebase Realtime Database**.

---

## ✨ Features

- 🔄 **Real-time sync**: changes appear instantly on all open tabs and devices
- ➕ **Full CRUD**: create, read, edit, and delete tasks
- ✅ **Toggle completion** with live progress tracking (completion %)
- 🎯 **Priorities & categories**: High / Medium / Low, Work / Personal / Dev
- 📅 **Due dates** with date-time picker
- 🔍 **Search & filters**: All, Pending, Urgent, Completed
- 🔔 **Notification bell** with unread counter for newly added tasks
- 📱 **Fully responsive**: mobile bottom-nav, desktop header, 1 → 2 → 3 column grid
- 🌙 **Modern dark UI** with a custom design system

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + Vite |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Routing | React Router |
| Backend / DB | Firebase Realtime Database |

---

## 📂 Project Structure

```
src/
├── components/
│   ├── layout/    Layout.tsx, NotificationBell.tsx
│   ├── creat/     Creat.tsx    (add task)
│   ├── read/      Read.tsx     (list, filter, toggle, delete)
│   └── edit/      Edit.tsx     (update task)
├── pages/         Home.tsx
├── FirebaseConfig.ts
├── App.tsx
└── main.tsx
```

---

## 🚀 Getting Started

### 1. Clone & install

```bash
git clone https://github.com/<your-username>/taskpulse-realtime-todo.git
cd taskpulse-realtime-todo
npm install
```

### 2. Configure Firebase

1. Create a project at [Firebase Console](https://console.firebase.google.com)
2. Enable **Realtime Database**
3. Register a **Web app** and copy its config
4. Create a `.env` file in the project root:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://your_project-default-rtdb.firebaseio.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 3. Run

```bash
npm run dev
```

Open `http://localhost:5173`

---

## 🗺️ Roadmap

- [ ] Authentication (per-user tasks)
- [ ] Persistent notifications
- [ ] Subtasks & progress
- [ ] Task details page
- [ ] Analytics dashboard
- [ ] PWA support

---

## 📄 License

MIT