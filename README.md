# Virtue LLM Frontend - Figma Mirror Next

## Overview

Welcome to the frontend interface for **Virtue LLM**! This application, "Figma Mirror Next," serves as a modern, intuitive wrapper to interact with the powerful capabilities of Virtue, your custom-built Large Language Model. It provides a responsive, user-friendly chat interface, reminiscent of design tools like Figma, for seamless communication and task execution with Virtue.

Built with React, TypeScript, and Vite, this frontend is designed for performance, scalability, and a great user experience, supporting both light and dark themes.

## ✨ Virtue LLM & This Frontend

Virtue LLM is designed to assist with creative writing, generate code, answer complex queries, and more. This frontend aims to:

*   Provide a clean and engaging chat interface for users to interact with Virtue.
*   Streamline common tasks and workflows performed with Virtue.
*   Offer a platform for showcasing Virtue's unique features and strengths.
*   Enable developers, testers, and end-users to easily leverage Virtue's power.

## 🚀 Key Features

*   **Direct Interaction with Virtue LLM**: Seamlessly send prompts and receive responses from Virtue.
*   **Intuitive Chat Interface**: A modern, responsive UI for clear and efficient communication.
*   **Sidebar Navigation**: Quick access to chat history, prompt libraries, and Virtue settings.
*   **Dark/Light Mode Support**: Full theming for user preference.
*   **Responsive Design**: Optimized for desktops, tablets, and mobile devices.
*   **Local Storage Persistence**: Chat history and user settings are saved locally for convenience.
*   **Built with Modern Technologies**: React, TypeScript, Vite, shadcn/ui for a robust and maintainable codebase.

## 📋 Project Structure

```
├── public/                 # Static assets (e.g., Virtue logo, icons)
│   ├── uploads/           # Default user/system icons
│   └── placeholder.svg
├── src/
│   ├── components/        # UI Components
│   │   ├── chat/          # Components specific to the Virtue chat interface
│   │   ├── layout/        # Sidebar, main layout structure
│   │   ├── providers/     # ThemeProvider, etc.
│   │   └── ui/            # General reusable UI elements (buttons, inputs)
│   ├── hooks/             # Custom React hooks (e.g., useChatActions, useChatState for Virtue interaction)
│   ├── lib/               # Utility functions (e.g., formatting Virtue responses)
│   ├── pages/             # Top-level page components
│   │   ├── ChatPage.tsx     # Main interface for chatting with Virtue
│   │   └── [OtherPages].tsx # If any (e.g., Virtue settings, prompt examples)
│   ├── services/          # API integrations (e.g., llmService for Virtue communication)
│   ├── utils/             # General utility functions
│   ├── App.tsx            # Main application component, routing
│   └── main.tsx           # Application entry point
├── package.json           # Project dependencies and scripts
├── vite.config.ts         # Vite build configuration
└── tsconfig.json          # TypeScript configuration
```

## 🔧 Getting Started

### Prerequisites

*   Node.js (v18+ recommended)
*   npm or yarn package manager
*   Access to the Virtue LLM backend (if running locally or a specific endpoint)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [[your-repository-url]](https://github.com/austin207/figma-mirror-next.git)
    cd figma-mirror-next
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Configure Virtue LLM Endpoint (if applicable):**
    You might need to set up an environment variable or update a configuration file in `src/services/llmService.ts` or a similar location to point to your Virtue LLM backend API.
    ```env
    # Example .env file
    VITE_VIRTUE_API_ENDPOINT=http://localhost:xxxx/api/virtue
    ```

4.  **Start the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```

5.  **Open in your browser:**
    The application will typically be available at `http://localhost:8080` (or the port specified by Vite).

## 📝 Interacting with Virtue

Once the application is running:

1.  Navigate to the main chat interface.
2.  Type your prompts or questions for Virtue in the input field.
3.  Press Enter or click the send button.
4.  Virtue's responses will appear in the chat log.

## ⚙️ Available Scripts

*   `npm run dev`: Starts the development server with hot reloading.
*   `npm run build`: Builds the application for production.
*   `npm run preview`: Serves the production build locally for testing.
*   `npm run lint`: Lints the codebase using ESLint.

## 🎨 Customization

*   **Branding**: Update logos and color schemes in `public/` and CSS files to match Virtue's branding.
*   **Virtue-Specific Components**: Enhance or add components in `src/components/chat/` to better support Virtue's output formats or interaction styles.
*   **Prompt Engineering**: If applicable, you can build features for managing and using predefined prompts for Virtue.

## 🔍 Troubleshooting

*   **Connection to Virtue Fails**: 
    *   Ensure your Virtue LLM backend is running and accessible.
    *   Verify the API endpoint configuration in the frontend.
    *   Check browser console for network errors.
*   **UI Issues**: 
    *   Clear browser cache.
    *   Ensure all dependencies are correctly installed.

## 🤝 Contributing

Contributions to enhance this frontend for Virtue LLM are welcome!

1.  Fork the repository.
2.  Create your feature branch (`git checkout -b feature/enhance-virtue-interaction`).
3.  Commit your changes (`git commit -m 'Add feature to improve Virtue experience'`).
4.  Push to the branch (`git push origin feature/enhance-virtue-interaction`).
5.  Open a Pull Request.

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

**This frontend is dedicated to providing an exceptional interface for the Virtue LLM.**
We hope it helps you and your users fully leverage Virtue's capabilities!
