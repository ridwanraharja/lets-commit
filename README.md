# Let's Commit

A modern web application built with React, TypeScript, and Vite for managing events and community engagement.

## Features

- 🎯 Event Management
- 🔐 User Authentication
- 📱 Responsive Design
- 🌐 Web3 Integration
- 📊 Dashboard Analytics
- 🎨 Modern UI/UX

## Tech Stack

- **Frontend**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **State Management**: TanStack Query
- **Web3**: Wagmi + Viem
- **UI Components**: Framer Motion, Lucide React
- **Routing**: React Router DOM

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd lets-commit
```

2. Install dependencies:

```bash
npm install
```

3. Create environment variables:

```bash
cp .env.example .env.local
```

4. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
VITE_API_BASE_URL=your_api_base_url_here
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run host` - Start dev server with host access

## Deployment

### Vercel Deployment

This project is configured for easy deployment on Vercel:

1. **Connect to Vercel**:

   - Install Vercel CLI: `npm i -g vercel`
   - Login: `vercel login`
   - Deploy: `vercel`

2. **Environment Variables**:

   - Go to your Vercel project dashboard
   - Navigate to Settings > Environment Variables
   - Add your environment variables:
     - `VITE_API_BASE_URL`: Your production API URL

3. **Automatic Deployments**:
   - Connect your GitHub repository to Vercel
   - Every push to main branch will trigger automatic deployment

### Manual Deployment

1. Build the project:

```bash
npm run build
```

2. The built files will be in the `dist/` directory

3. Deploy the `dist/` folder to your hosting provider

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Page components
├── hooks/         # Custom React hooks
├── services/      # API services
├── types/         # TypeScript type definitions
├── utils/         # Utility functions
├── constants/     # App constants
├── context/       # React context providers
├── contracts/     # Web3 contract configurations
└── assets/        # Static assets
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is licensed under the MIT License.

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    "react-x": reactX,
    "react-dom": reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs["recommended-typescript"].rules,
    ...reactDom.configs.recommended.rules,
  },
});
```
