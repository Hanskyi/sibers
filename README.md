# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
# Test Task / Тестовое задание

## Technologies Used / Используемые технологии:
- **React.js** — для разработки фронтенда.
- **Tailwind CSS** — для стилизации.
- **Shadcn** — для UI-компонентов.
- **MobX** — для управления состоянием.
- **Firebase** — ,база данных.

## File Structure / Структура файлов:
- **main.store**: Отвечает за аутентификацию и управление данными пользователей.
- Хранилище приложения: Управляет состоянием приложения (чаты, каналы и т.д.).

## authentication / аутентификация
- Базовая аунтификация, вход только по полному имени пользователя из json
- Пользователь храниться в localstorage

Я решил не разделять логику хранилища для чатов и каналов, поэтому все методы и API находятся внутри одного хранилища для простоты и целостности.
Firebase настроен, Вам только нужно ввести команду запуска -  npm run dev
На странице авторизации Вам нужно ввести имя поьзователя из json. Данные я вывел в консоли разработчика.
Mock каналы уже есть.
Я не успел поработать со стилизацией, и рефакторингом кода так как я сейчас работаю.
Поставил заглушки на аватарки так как ссылки не работают и нагружают систему
---
# Test Task

## Technologies Used:
- **React.js** — for frontend development.
- **Tailwind CSS** — for styling.
- **Shadcn** — for UI components.
- **MobX** — for state management.
- **Firebase** — for the database.

## File Structure:
- **main.store**: Responsible for authentication and managing user data.
- **App Store**: Manages the application state (chats, channels, etc.).

## Authentication:
- Basic authentication, login is allowed only with the full name of the user from the JSON.
- User data is stored in `localStorage`.

I decided not to separate the logic for chats and channels, so all methods and APIs are inside a single store for simplicity and coherence.
Firebase is set up, you only need to run the command `npm run dev`.
On the login page, you need to enter a username from the JSON. The data is displayed in the developer console.
Mock channels are already available.
I didn't have time to work on the styling and refactoring since I'm currently working.
I put placeholders on the author's page because the links don't work and load the system


## If I don't pass the test task, can I count on your feedback on it?

If I don't pass the test task, I would appreciate any feedback or suggestions on what could be improved or where I may have made mistakes.