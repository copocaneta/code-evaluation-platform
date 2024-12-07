# Code Evaluation Platform

A modern web application for coding challenges with real-time AI evaluation using GPT-4. Built with Next.js, TypeScript, and Chakra UI.

## Features

### Core Functionality
- 🎯 Multiple coding challenges with varying difficulty levels
- 🤖 Real-time code evaluation using Azure OpenAI GPT-4
- 💻 Syntax-highlighted code editor with language support
- 🌓 Dark/Light mode support
- 📱 Responsive design for all devices

### Editor Features
- 🔍 Multiple programming language support
- 📋 Copy/Paste functionality
- 🧹 Clear editor with confirmation
- ⌨️ Keyboard shortcuts
- 🔄 Auto-save support

### Evaluation System
- ✅ Clear Pass/Fail/Warning status indicators
- 📝 Detailed feedback from AI
- 📊 Evaluation history
- 🔄 Rate-limited API calls
- 🚫 Error handling

### UI/UX
- 📱 Mobile-friendly interface
- 🎨 Clean, modern design
- 🔄 Smooth transitions and animations
- 💾 Persistent settings
- 🏷️ Challenge difficulty badges

## Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn
- Azure OpenAI API key

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/code-evaluation-platform.git
cd code-evaluation-platform
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file:

```env
OPENAI_API_KEY=your_azure_openai_api_key
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. **Select a Challenge**
   - Choose from different difficulty levels
   - Read the challenge description
   - View challenge requirements

2. **Write Code**
   - Select your preferred programming language
   - Write or paste your solution
   - Use keyboard shortcuts for common actions

3. **Evaluate**
   - Click "Evaluate" or use the shortcut
   - View AI feedback in real-time
   - See Pass/Fail status

4. **Review History**
   - View previous evaluations
   - Track your progress
   - Learn from feedback

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Chakra UI
- **State Management**: Zustand
- **Code Editor**: Monaco Editor
- **AI**: Azure OpenAI GPT-4
- **Styling**: Chakra UI, Emotion
- **API**: Next.js API Routes

## Project Structure

```
src/
├── components/        # React components
├── pages/            # Next.js pages
├── store/            # Zustand state management
├── services/         # API services
├── types/            # TypeScript types
├── hooks/            # Custom React hooks
├── utils/            # Utility functions
├── data/            # Static data
└── middleware/       # API middleware
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Azure OpenAI for the GPT-4 API
- Next.js team for the amazing framework
- Chakra UI for the component library
- Monaco Editor team for the code editor
