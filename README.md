# AnnCRM — CRM System

**AnnCRM** — full-stack CRM-система для управления клиентами с регистрацией пользователей, JWT-аутентификацией и разграничением доступа к данным.

Проект разработан с использованием **React + TypeScript** на frontend и **FastAPI + PostgreSQL** на backend.

## 🌐 Demo

**Live Demo:**
https://anncrm-frontend-repozitorii.onrender.com

> Для работы приложения frontend взаимодействует с production backend API.

## ✨ Возможности

### Авторизация

* Регистрация пользователей
* Авторизация
* JWT authentication
* Автоматическая передача JWT в API-запросах
* Logout
* Защищённые маршруты
* Перенаправление неавторизованных пользователей на страницу входа

### Управление клиентами

* Просмотр списка клиентов
* Создание клиента
* Редактирование клиента
* Удаление клиента
* Привязка клиентов к пользователю
* Loading states
* Error states

### Интерфейс

* Адаптивный интерфейс
* React Router
* Обработка состояний загрузки и ошибок

## 🛠 Tech Stack

### Frontend

* React
* TypeScript
* Vite
* React Router
* Axios
* Tailwind CSS

### Backend

* FastAPI
* SQLAlchemy
* Pydantic
* JWT
* Alembic

### Database

* PostgreSQL

### Deployment

* Render
* GitHub

## 🏗 Architecture

```text
┌─────────────────────┐
│       React         │
│    TypeScript       │
│       Vite          │
└──────────┬──────────┘
           │ HTTP / REST API
           │ JWT
           ▼
┌─────────────────────┐
│       FastAPI       │
│     SQLAlchemy      │
│        JWT          │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│     PostgreSQL      │
└─────────────────────┘
```

Frontend и backend разделены на отдельные приложения и GitHub-репозитории.

## 🔐 Authentication

Для авторизации используется JWT.

После успешного входа access token сохраняется в `localStorage`.

Axios автоматически добавляет токен к API-запросам:

```text
Authorization: Bearer <JWT>
```

Защищённые маршруты доступны только авторизованным пользователям.

Например:

```text
/clients
```

Если пользователь не авторизован, он перенаправляется на:

```text
/login
```

## 🔌 API

Frontend взаимодействует с REST API backend-приложения.

Основные endpoints:

```text
POST   /auth/register
POST   /auth/login

GET    /clients
POST   /clients
PUT    /clients/{id}
DELETE /clients/{id}
```

## 🚀 Запуск проекта

### 1. Клонирование

```bash
git clone <repository_url>
cd AnnCRM-frontend
```

### 2. Установка зависимостей

```bash
npm install
```

### 3. Настройка API

Для локальной разработки frontend должен обращаться к локальному FastAPI backend:

```text
http://127.0.0.1:8000
```

Для production используется URL развернутого backend API.

Рекомендуется задавать API URL через environment variable:

```text
VITE_API_URL=http://127.0.0.1:8000
```

### 4. Запуск development server

```bash
npm run dev
```

Frontend будет доступен по адресу:

```text
http://localhost:5173
```

### 5. Production build

```bash
npm run build
```

Результат сборки находится в:

```text
dist/
```

## 📄 Основные страницы

### Login

Страница авторизации существующего пользователя.

### Register

Регистрация нового пользователя и автоматический вход после успешной регистрации.

### Clients

Защищённая страница управления клиентами.

Доступны:

* просмотр клиентов;
* создание;
* редактирование;
* удаление;
* logout.

## 📁 Структура проекта

```text
src/
├── api/
│   └── axios.ts
│
├── components/
│   └── ProtectedRoute.tsx
│
├── pages/
│   ├── Login.tsx
│   ├── Register.tsx
│   └── Clients.tsx
│
├── routes/
│   └── AppRoutes.tsx
│
├── services/
│   ├── authService.ts
│   └── clientService.ts
│
├── types/
│
├── App.tsx
├── App.css
├── index.css
└── main.tsx
```

## 🔗 Backend Repository

Backend часть проекта находится в отдельном репозитории:

```text
<backend_repository_url>
```

Backend построен на:

```text
FastAPI
SQLAlchemy
PostgreSQL
Alembic
JWT
Pydantic
```

## 📸 Screenshots

Добавьте сюда скриншоты интерфейса.

Рекомендуемые скриншоты:

* Login
* Register
* Clients
* Создание клиента
* Редактирование клиента

## 🔒 Environment Variables

Секретные данные не хранятся в репозитории.

Для production используются environment variables.

Пример:

```text
VITE_API_URL=https://your-backend-url
```

Не добавляйте реальные токены, пароли или секретные ключи в GitHub.

## 📌 Project Status

Проект находится в рабочем состоянии.

Реализованы:

* Authentication
* JWT
* Protected routes
* Client CRUD
* API integration
* PostgreSQL
* Alembic migrations
* Production deployment

## 🔮 Future Improvements

* Поиск клиентов
* Фильтрация и сортировка
* Карточка клиента
* Пагинация
* Dashboard
* Статистика
* Улучшение UX
* Дополнительные CRM-функции

## 👨‍💻 Author

**Rinat**

GitHub:

https://github.com/rinat2304