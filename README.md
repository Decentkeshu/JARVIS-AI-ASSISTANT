
# JARVIS — AI ASSISTANT

An intelligent real-time chat application powered by Groq API, built with Next.js and TypeScript. Jarvis delivers lightning-fast AI responses with support for image and file uploads.

## Features

- Real-time AI responses powered by Groq
- Image upload and analysis
- File upload and processing
- Clean, minimal chat interface
- Fully responsive design

## Tech Stack

- **Frontend:** Next.js, TypeScript, CSS
- **Backend:** Next.js API Routes
- **AI:** Groq API
- **Language:** TypeScript

## Getting Started

### Prerequisites

- Node.js 18+
- Groq API Key — get one free at [console.groq.com](https://console.groq.com)

### Installation

```bash
git clone https://github.com/Decentkeshu/JARVIS-AI-ASSISTANT.git
cd ai-chat-app
npm install
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
GROQ_API_KEY=your_groq_api_key_here
```

### Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/api/chat` | POST | Sends message and streams AI response |

## Usage

1. Open the app in your browser
2. Type your message and hit Enter
3. Upload an image or file using the attachment button
4. Jarvis responds in real time

## Screenshots

> Coming soon

## License

MIT

page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
