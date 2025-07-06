# 🚀 Commit Learn - Revolutionary Learning Platform

<div align="center">

![Commit Learn Logo](public/CommitLearnFix.svg)

**A revolutionary commitment-based learning platform that secures both organizers and participants through escrow smart contracts with session-based rewards.**

[![React](https://img.shields.io/badge/React-19.0.0-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2.0-purple.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.17-38B2AC.svg)](https://tailwindcss.com/)
[![Ethereum](https://img.shields.io/badge/Ethereum-Smart%20Contracts-627EEA.svg)](https://ethereum.org/)

[Live Demo](#) • [Documentation](#) • [Report Bug](https://github.com/yourusername/lets-commit/issues)

</div>

---

## 📖 Table of Contents

- [About The Project](#about-the-project)
- [Key Features](#key-features)
- [How It Works](#how-it-works)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Smart Contracts](#smart-contracts)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 About The Project

**Commit Learn** is a groundbreaking learning platform that revolutionizes how people engage in educational events. By leveraging blockchain technology and smart contracts, we create a trustless environment where both event organizers and participants are incentivized to fulfill their commitments.

### The Problem We Solve

Traditional learning platforms often face issues with:

- ❌ No-show participants wasting organizers' time
- ❌ Unreliable organizers leaving participants disappointed
- ❌ Lack of accountability and commitment
- ❌ No financial incentives for consistent participation

### Our Solution

✅ **Escrow Smart Contracts**: Secure commitment payments that are only released upon successful completion  
✅ **Session-Based Rewards**: Earn USDC cashback for each session attended  
✅ **Real-time Check-ins**: Prove attendance and participation instantly  
✅ **Dual Incentives**: Both organizers and participants are rewarded for consistency

---

## ✨ Key Features

### 🎪 Event Management

- **Create Events**: Organizers can create learning events with customizable parameters
- **Browse Events**: Participants can discover and join events based on their interests
- **Session Tracking**: Real-time session management with attendance verification
- **QR Code Check-ins**: Secure attendance verification system

### 💰 Commitment System

- **Escrow Payments**: Commitment fees held in smart contracts until completion
- **Automatic Rewards**: USDC cashback distributed based on attendance
- **Vesting Mechanism**: Gradual release of rewards over time
- **Penalty System**: Fees redistributed to attendees if commitments aren't met

### 📊 Dashboard & Analytics

- **Personal Dashboard**: Track your events, attendance, and earnings
- **Real-time Statistics**: Monitor platform growth and engagement
- **Performance Metrics**: View attendance rates and reward distributions
- **Role Switching**: Seamlessly switch between organizer and participant views

### 🎨 Modern UI/UX

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Dark/Light Mode**: Toggle between themes for comfortable viewing
- **Smooth Animations**: Engaging user experience with Framer Motion
- **Accessibility**: Built with accessibility best practices

---

## 🔄 How It Works

### 1. Create or Join Events

Anyone can create learning events as an organizer, or browse and join existing events as a participant. Participants require commitment payment.

### 2. Attend & Commit Together

Organizers run sessions while participants attend. Both parties use real-time check-ins to prove their commitment and active participation.

### 3. Earn Session-Based Rewards

Both organizers and participants earn USDC cashback for each session they fulfill. Consistency = Maximum rewards for everyone!

---

## 🛠 Technology Stack

### Frontend

- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **React Router** - Client-side routing
- **React Query** - Server state management

### Blockchain & Web3

- **Wagmi** - React hooks for Ethereum
- **Viem** - TypeScript interface for Ethereum
- **Smart Contracts** - Solidity contracts for escrow and rewards
- **USDC Integration** - Stablecoin for rewards

### Development Tools

- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MetaMask or other Web3 wallet
- USDC tokens for testing

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/lets-commit.git
   cd lets-commit
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` with your configuration:

   ```env
   VITE_CONTRACT_ADDRESS=0xB5D5D1575F8Db2532034b24DB1f288fC937E2120
   VITE_TOKEN_ADDRESS=0xaF82cB6085A05A609F86003B2EC12825a21037A8
   VITE_NETWORK_ID=1
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run host         # Start dev server with host access
```

---

## 📁 Project Structure

```
lets-commit/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   ├── pages/             # Page components
│   ├── hooks/             # Custom React hooks
│   ├── services/          # API and external services
│   ├── contracts/         # Smart contract ABIs and addresses
│   ├── constants/         # Application constants
│   ├── types/             # TypeScript type definitions
│   ├── utils/             # Utility functions
│   ├── context/           # React context providers
│   ├── providers/         # App providers
│   └── routes/            # Routing configuration
├── contracts/             # Smart contract source code
└── docs/                  # Documentation
```

### Key Components

- **HeroSection** - Landing page hero with animated background
- **EventFormCard** - Event creation and management
- **SessionCard** - Session tracking and attendance
- **DashboardTabs** - User dashboard with role switching
- **QRGenerator** - QR code generation for check-ins
- **StatsSection** - Platform statistics and metrics

---

## 🔗 Smart Contracts

### Contract Addresses

- **LetsCommit Contract**: `0xB5D5D1575F8Db2532034b24DB1f288fC937E2120`
- **MIDRX Token**: `0xaF82cB6085A05A609F86003B2EC12825a21037A8`

### Key Functions

#### Event Management

- `createEvent()` - Create new learning events
- `enrollParticipant()` - Join events as participant
- `setSessionCode()` - Generate session codes for attendance

#### Attendance & Rewards

- `attendEventSession()` - Mark attendance for sessions
- `claimSessionRewards()` - Claim USDC rewards
- `claimUnattendedFees()` - Claim fees from no-shows

#### Escrow Management

- `releaseVestedCommitmentFees()` - Release vested commitment fees
- `claimEventFees()` - Claim organizer fees

---

## 📊 Platform Statistics

- **Total Events**: 2,847+ successfully completed learning events
- **Total Participants**: 15,632+ community members learning together
- **Total Cashback**: $127k+ distributed to participants
- **Growth Rate**: 12-23% monthly growth across all metrics

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Development Setup

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Contribution Guidelines

- Follow the existing code style and conventions
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

### Areas for Contribution

- 🐛 Bug fixes and improvements
- ✨ New features and enhancements
- 📚 Documentation updates
- 🎨 UI/UX improvements
- 🔧 Performance optimizations
- 🧪 Test coverage

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Ethereum Community** - For the blockchain infrastructure
- **React Team** - For the amazing frontend framework
- **Tailwind CSS** - For the utility-first CSS framework
- **Framer Motion** - For smooth animations
- **All Contributors** - For making this project better

---

## 📞 Support & Contact

- **Website**: [Commit Learn](https://commitlearn.com)
- **Email**: support@commitlearn.com
- **Discord**: [Join our community](https://discord.gg/commitlearn)
- **Twitter**: [@CommitLearn](https://twitter.com/CommitLearn)

---

<div align="center">

**Made with ❤️ by the Commit Learn Team**

[![GitHub stars](https://img.shields.io/github/stars/yourusername/lets-commit?style=social)](https://github.com/yourusername/lets-commit)
[![GitHub forks](https://img.shields.io/github/forks/yourusername/lets-commit?style=social)](https://github.com/yourusername/lets-commit)

</div>
