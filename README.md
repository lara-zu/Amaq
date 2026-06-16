# Amaq — Frontend

A gamified math learning platform for grades 5–8. Built with React and Vite.

---

## Overview

Amaq is a full-stack web application with two completely separate user experiences:

- **Teachers** manage students, publish YouTube-based lessons, and build quizzes from a clean professional dashboard.
- **Students** explore an underwater world, watch lessons, take timed quizzes, earn stars, and spend them on avatar customization.

---

## Description

### For Teachers
- View all registered students and their star totals from the dashboard
- Publish lessons by pasting a YouTube URL — the app automatically fetches the video title and thumbnail
- Assign lessons to specific grade levels (5, 6, 7, or 8)
- Build multi-question quizzes with four answer options and one correct answer per question
- Edit or delete any lesson or quiz at any time

### For Students
- Log in to a personalized underwater dashboard
- Browse lessons filtered to their grade level only
- Watch embedded YouTube videos and take the attached quiz
- Answer timed multiple-choice questions and earn stars for correct answers
- Track quiz history and scores on the Stats page
- Spend earned stars in the avatar shop — unlock new fish colors and hats
- Save and persist their avatar configuration between sessions

---

## User Requirements

### Teacher
- Must sign up with role set to "Teacher"
- Can create, edit, and delete lessons and quizzes
- Can view all students and their star totals
- Teacher-protected routes send `x-role: teacher` in the request header

### Student
- Must sign up with role set to "Student" and select a grade (5, 6, 7, or 8)
- Can only view lessons and quizzes assigned to their grade
- Earns 1 star per correct quiz answer
- Stars are stored in the database and persist between sessions
- Avatar customization is saved and restored on each login

---

## Technologies

| Technology | Purpose |
|---|---|
| React 18 (Vite) | Frontend framework and build tool |
| react-router-dom v7 | Client-side routing and navigation |
| Tailwind CSS v4 | Utility-first styling |
| fetch API | All calls to the own Express backend |
| axios | YouTube Data API v3 calls only (third-party) |
| localStorage | User session persistence between page loads |

---

## Getting Started (Local)

### Prerequisites
- Node.js v18 or higher
- The Amaq backend server running (see amaq-server repo)

### 1. Clone the repository
```bash
git clone <your-frontend-repo-url>
cd Amaq
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
```bash
cp .env.sample .env
```
Open `.env` and fill in your values:
```
VITE_YOUTUBE_API_KEY=your_youtube_api_key_here
VITE_API_URL=http://localhost:8080
```

### 4. Start the development server
```bash
npm run dev
```

The app runs at `http://localhost:5173`.

---

## Project Structure

```
src/
├── App.jsx                        # Root — owns all shared state and all routes
├── main.jsx                       # Entry point
├── index.css                      # Global styles
├── api.js                         # API_URL constant — reads from VITE_API_URL env var
├── pages/
│   ├── LandingPage.jsx
│   ├── LoginPage.jsx
│   ├── teacher/
│   │   ├── DashboardPage.jsx
│   │   ├── StudentsPage.jsx
│   │   ├── LessonsPage.jsx
│   │   └── QuizzesPage.jsx
│   └── student/
│       ├── StudentHomePage.jsx
│       ├── StudentLessonsPage.jsx
│       ├── StudentLessonDetailPage.jsx
│       ├── StudentQuizzesPage.jsx
│       ├── StudentQuizSessionPage.jsx
│       ├── StudentStatsPage.jsx
│       └── StudentProfilePage.jsx
└── components/
    ├── shared/
    │   └── ProtectedRoute.jsx
    ├── teacher/
    │   ├── TeacherLayout.jsx
    │   ├── shared/
    │   │   └── TeacherPageHeader.jsx
    │   ├── lessons/
    │   │   ├── TeacherLessonCard.jsx
    │   │   └── LessonForm.jsx
    │   └── quizzes/
    │       ├── TeacherQuizItem.jsx
    │       ├── QuizForm.jsx
    │       └── QuestionEditor.jsx
    └── student/
        ├── shared/
        │   ├── StudentFrame.jsx
        │   ├── StudentPageHeader.jsx
        │   └── StatCard.jsx
        ├── lessons/
        │   └── LessonCard.jsx
        ├── quizzes/
        │   └── QuizCard.jsx
        └── profile/
            ├── FishAvatar.jsx
            └── ShopItem.jsx
```

---

