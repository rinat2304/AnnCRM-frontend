# AnnCRM Frontend

Frontend часть CRM-системы AnnCRM, разработанная на React и TypeScript.

## Возможности

* Регистрация пользователей
* Авторизация пользователей
* JWT authentication
* Защищённые маршруты
* Управление клиентами
* Создание клиентов
* Редактирование клиентов
* Удаление клиентов
* Loading и error states
* Logout
* Адаптивный интерфейс

## Стек технологий

* React
* TypeScript
* Vite
* React Router
* Axios
* Tailwind CSS

## Backend

Frontend работает совместно с backend на FastAPI.

Backend:

* FastAPI
* SQLAlchemy
* PostgreSQL
* JWT

## Запуск проекта

### 1. Клонировать проект

```bash
git clone <repository_url>
cd crm_frontend
```

### 2. Установить зависимости

```bash
npm install
```

### 3. Настроить API

По умолчанию frontend использует локальный backend:

```text
http://127.0.0.1:8000
```

URL backend настраивается в `src/api/axios.ts`.

### 4. Запустить проект

```bash
npm run dev
```

Frontend будет доступен по адресу:

```text
http://localhost:5173
```

## Основные страницы

### Login

Авторизация существующего пользователя.

### Register

Регистрация нового пользователя с последующим автоматическим входом.

### Clients

Защищённая страница управления клиентами.

Доступны:

* просмотр клиентов;
* создание;
* редактирование;
* удаление;
* выход из аккаунта.

## Авторизация

Для авторизации используется JWT.

После успешного входа токен сохраняется в `localStorage`.

Axios автоматически добавляет JWT в запросы:

```text
Authorization: Bearer <JWT>
```

Страница `/clients` защищена и доступна только авторизованным пользователям.

## Структура проекта

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

## Backend API

Frontend взаимодействует с backend API:

```text
POST /auth/register
POST /auth/login

GET /clients
POST /clients
PUT /clients/{id}
DELETE /clients/{id}
```

## Live Demo

Будет добавлено после публикации приложения:

```text
<live_demo_url>
```

## Backend Repository

Backend часть проекта находится в отдельном репозитории:

```text
<backend_repository_url>
```

## Планы развития

* Поиск клиентов
* Фильтрация и сортировка
* Карточка клиента
* Пагинация
* Дополнительные CRM-функции
* Улучшение UX

