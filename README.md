# Telegram Clone

A modern Telegram web client clone built with Next.js 15, React 18, and TailwindCSS.

## Features

- Modern and responsive UI design
- Real-time messaging capabilities
- QR code authentication
- Dark/Light theme support
- Mobile-friendly interface
- Fast development with Turbopack

## Tech Stack

- **Framework:** Next.js 15
- **Language:** TypeScript
- **Styling:** TailwindCSS
- **UI Components:** Custom components with class-variance-authority
- **Icons:** Lucide React
- **Code Quality:** Biome (linting and formatting)
- **Authentication:** QR Code based (using qrcode library)
- **SMS Integration:** Twilio

## Getting Started

### Prerequisites

- Node.js (Latest LTS version recommended)
- npm or bun package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/telegram-clone.git
cd telegram-clone
```

2. Install dependencies:
```bash
npm install
# or
bun install
```

3. Set up environment variables:
   - Copy `.env.example` to `.env.local`
   - Fill in the required environment variables

4. Run the development server:
```bash
npm run dev
# or
bun run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start production server
- `npm run lint` - Run linting and type checking
- `npm run format` - Format code using Biome

## Project Structure

```
telegram-clone/
├── src/              # Source files
├── public/           # Static assets
├── out/             # Build output
├── logs/            # Application logs
└── ...config files
```


## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by Telegram Web
- Built with modern web technologies
- Special thanks to all contributors 
