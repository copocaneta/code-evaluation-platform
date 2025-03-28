# AI Code Evaluation Game

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
git clone git@github.com:copocaneta/code-evaluation-platform.git
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

## Technical Details

### AI Evaluation System
The platform uses a dual-call approach to GPT-4 for code evaluation:
1. **Detailed Evaluation Call**: Gets comprehensive feedback about the code
2. **Status Validation Call**: Makes a separate call specifically for PASS/FAIL determination
   ```typescript
   // First call for detailed feedback
   const evaluationResponse = await makeOpenAIRequest(
     systemPrompt,
     `Please evaluate this ${language} code:\n\n${code}`
   );

   // Second call for status
   const statusResponse = await makeOpenAIRequest(
     "You are a code validator. Respond with ONLY 'PASS' or 'FAIL'.",
     `Does this code meet the requirements?...`
   );
   ```

### Rate Limiting
Implements a token bucket algorithm for API rate limiting:
```typescript
class RateLimiter {
  private tokens: number;
  private lastRefill: number;
  private refillRate: number;
  private capacity: number;

  constructor(capacity: number, refillRate: number) {
    this.tokens = capacity;
    this.capacity = capacity;
    this.refillRate = refillRate;
    this.lastRefill = Date.now();
  }

  async check(res: NextApiResponse, cost: number, period: string): Promise<boolean> {
    // Refills tokens based on time passed
    const now = Date.now();
    const timePassed = now - this.lastRefill;
    this.tokens = Math.min(this.capacity, this.tokens + timePassed * this.refillRate);
    this.lastRefill = now;

    if (this.tokens < cost) {
      return false; // Rate limit exceeded
    }

    this.tokens -= cost;
    return true;
  }
}
```

### State Management
Uses Zustand for efficient state management with multiple stores:

1. **Challenge Store**
```typescript
interface ChallengeStore {
  challenges: Challenge[];
  activeChallenge: Challenge | null;
  setActiveChallenge: (challengeId: string) => void;
  loadChallenges: () => void;
}
```

2. **Editor Store**
```typescript
interface EditorStore {
  code: string;
  language: string;
  setCode: (code: string) => void;
  setLanguage: (language: string) => void;
  clearEditor: () => void;
}
```

3. **Evaluation Store**
```typescript
interface EvaluationStore {
  results: EvaluationResult[];
  isLoading: boolean;
  error: string | null;
  addResult: (result: EvaluationResult) => void;
  clearResults: () => void;
}
```

### Code Editor Integration
- Uses Monaco Editor with custom configuration
- Supports multiple languages
- Implements keyboard shortcuts
```typescript
const editorOptions: EditorProps['options'] = {
  minimap: { enabled: editor.showMinimap },
  fontSize: theme.fontSize,
  fontFamily: editor.fontFamily,
  fontLigatures: editor.fontFamily.includes('Fira Code'),
  tabSize: editor.tabSize,
  wordWrap: editor.lineWrapping ? 'on' : 'off',
  lineNumbers: editor.showLineNumbers ? 'on' : 'off',
};
```

### API Architecture
- Next.js API routes for backend functionality
- Azure OpenAI integration with error handling
- Rate limiting middleware
```typescript
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await rateLimiter.check(res, 3, '10 s');
    // ... API logic
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}
```

### Markdown Rendering
Custom markdown renderer with syntax highlighting:
```typescript
const components: Components = {
  code({ children, className, node, ...props }) {
    const isInline = !className;
    if (isInline) {
      return <code {...props}>{children}</code>;
    }
    // Block code rendering with syntax highlighting
    return <SyntaxHighlighter language={language} style={theme}>{children}</SyntaxHighlighter>;
  }
};
```

### Type Safety
- Comprehensive TypeScript types for all components
- Strict type checking enabled
- Custom type definitions for external libraries

### Performance Optimizations
- Code splitting with Next.js
- Efficient state updates with Zustand
- Debounced editor updates
- Memoized components where beneficial

### Security Features
- API rate limiting
- Input sanitization
- Environment variable protection
- Secure API key handling

### Error Handling
- Graceful degradation
- User-friendly error messages
- Comprehensive error logging
- Recovery mechanisms

### Testing Considerations
- Component isolation
- State management testing
- API integration testing
- Error scenario coverage

## Development Guidelines

### Code Style
- Consistent formatting with Prettier
- ESLint rules enforcement
- Component organization patterns
- State management patterns

### Best Practices
- Component composition
- State isolation
- Error boundary implementation
- Performance monitoring

### Deployment
- Environment configuration
- Build optimization
- Monitoring setup
- Error tracking
