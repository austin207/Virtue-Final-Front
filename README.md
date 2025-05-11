# Frontend README

Welcome to the frontend of your AI-powered productivity and chat application! This README will guide you through the structure, features, setup, and customization options for the frontend codebase.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Screenshots](#screenshots)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Customization](#customization)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

This frontend is a modern, responsive React application built with TypeScript and Vite. It provides an intuitive interface for AI chat, web search, collections management, and user profile/settings, with full support for both light and dark themes.

---

## Features

- **AI Chat Interface:**  
  Engage with an AI assistant in a sleek, conversational UI.  
- **Web Search:**  
  Integrated web search with dedicated results page.  
- **Collections:**  
  Organize resources, research, and ideas into collections.  
- **Profile Management:**  
  Update personal information, avatar, and notification preferences.  
- **Settings:**  
  Customize appearance (light/dark mode, font size), AI behavior, and privacy options.
- **Responsive Design:**  
  Optimized for both desktop and mobile devices.
- **Modern Tooling:**  
  Built with Vite, TypeScript, and modular React components.
- **Custom Hooks & Services:**  
  Clean state management and API integration.

---

## Project Structure

```
├── public/
│   └── index.html
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── chat/
│   │   ├── layout/
│   │   ├── providers/
│   │   └── ui/
│   ├── hooks/
│   ├── lib/
│   ├── pages/
│   │   ├── ChatPage.tsx
│   │   ├── BrowsePage.tsx
│   │   ├── CollectionsPage.tsx
│   │   ├── ProfilePage.tsx
│   │   └── SettingsPage.tsx
│   ├── services/
│   ├── utils/
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── package.json
├── vite.config.ts
├── tsconfig.json
└── ...other config files
```

---

## Screenshots

### Chat Interface (Dark Mode)
![Chat UI Screenshot](link-to-chat-screen Search
![Search UI Screenshot](link-to-searchections
![Collections UI Screenshot](link-to-colleile Settings (Light Mode)
![Profile Settings Screenshot](link-to-profilearance & Privacy Settings
![Settings Screenshot](link-to-settings-screening Started

### Prerequisites

- [Node.js](https://nodejs.org/) or [Bun](https://bun.sh/) installed

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   bun install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   # or
   bun run dev
   ```

4. **Open in your browser:**  
   Visit [http://localhost:8080](http://localhost:8080) (default Vite port).

---

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Lint codebase

---

## Customization

- **Themes:**  
  Switch between light and dark mode in the Settings page.
- **Components:**  
  Add or modify UI in `src/components/`.
- **Pages:**  
  Add new routes in `src/pages/`.
- **Services:**  
  Integrate APIs in `src/services/`.
- **Profile & Settings:**  
  Update profile fields and notification options in the Profile page.

---

## Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements, bug fixes, or new features.

---

## License

[MIT](LICENSE) (or your chosen license)

---

**Note:**  
This README covers only the frontend. For backend or full-stack setup, refer to their respective documentation.

---

Enjoy building and customizing your AI-powered productivity frontend! 🚀

---
Answer from Perplexity: pplx.ai/share