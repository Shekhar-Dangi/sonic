# Sonic - SPEAK IT, LOG IT

**Focus on your form, not your phone.**

Sonic lets you log workouts just by speaking. No typing, no fumbling with your phone between sets - just talk naturally about your workout and let our AI handle the rest.

## What Makes Sonic Special

### From Voice to Insight in Seconds

- **Just Talk Naturally**: No need to learn special commands - describe your workout like you'd tell a friend
- **Instant Understanding**: Our AI gets what you mean, whether you say "bench press" or "benching"
- **Smart Organization**: Everything gets sorted automatically into the right categories
- **Works Your Way**: Handle different speaking styles and fitness terminology with ease

### Track Everything That Matters

- **Workout Logging**: Sets, reps, weights, time - capture it all with your voice
- **Body Metrics**: Quick weigh-ins and body composition tracking
- **Visual Progress**: See your gains with charts that actually make sense
- **Smart Insights**: Get weekly, monthly, and yearly summaries of your fitness journey

### Your Data, Secure & Private

- **Rock-Solid Security**: Your workout data stays yours, protected by enterprise-grade authentication
- **Personal Space**: Every user gets their own isolated data - no mixing, no sharing
- **Always Protected**: Secure API endpoints ensure your information never falls into the wrong hands

### Built for Real Workouts

- **Works Everywhere**: From your phone in the gym to your computer at home
- **Real-Time Feedback**: See your words turn into data as you speak
- **Clean & Simple**: No clutter, just the features you actually need
- **Lightning Fast**: Optimized for quick logging between sets

## How Sonic Works

**From voice to insight in seconds**

### Step 1: Speak Your Workout

Just talk naturally about your exercises, sets, and reps. No typing required.
_"I did bench press today, 3 sets of 8 reps at 185 pounds"_

### Step 2: Structured And Stored

Our AI instantly converts your speech into structured workout data and saves it securely.

### Step 3: Get Insights

View every metric and receive smart AI suggestions to improve your training.

---

### The Tech Behind the Magic

### Frontend (React + TypeScript)

```
client/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── InteractiveContinuousChart.tsx  # Flexible charting component
│   │   ├── SideBar.tsx      # Voice input interface
│   │   └── MainDash.tsx     # Dashboard overview
│   ├── hooks/               # Custom React hooks
│   │   ├── useAuthSync.tsx  # Authentication state management
│   │   ├── useGenericChart.ts # Chart data processing
│   │   └── useSummary.ts    # Fitness metrics calculations
│   ├── stores/              # Zustand state management
│   │   ├── userStore.ts     # Global user state
│   │   └── types.ts         # TypeScript definitions
│   ├── lib/                 # Utility functions
│   │   ├── charts.ts        # Chart data transformations
│   │   └── summary.ts       # Fitness calculations
│   └── pages/               # Route components
```

### Backend (Node.js + Express + TypeScript)

```
server/
├── src/
│   ├── controllers/         # Request handlers
│   │   ├── voicelogController.ts # AI-powered voice processing
│   │   ├── logsController.ts     # Workout CRUD operations
│   │   └── metricsController.ts  # Body metrics management
│   ├── middleware/          # Express middleware
│   │   └── auth.ts          # Clerk authentication
│   ├── routes/              # API route definitions
│   │   ├── logs.ts
│   │   ├── metrics.ts
│   │   └── voicelog.ts
│   ├── lib/                 # Utilities
│   │   └── prisma.ts        # Database client
│   └── prisma/              # Database schema and migrations
```

## Getting Started

**Ready to ditch the notepad? Let's get you set up.**

### What You'll Need

- Node.js 18+ and npm (the basics)
- A PostgreSQL database (where your gains live)
- Clerk account (keeps things secure)
- Google AI Studio account (powers the voice magic)

### Set It Up in 5 Minutes

1. **Grab the code**

   ```bash
   git clone <repository-url>
   cd sonic
   ```

2. **Install the good stuff**

   ```bash
   # Backend dependencies
   cd server
   npm install

   # Frontend dependencies
   cd ../client
   npm install
   ```

3. **Add your secret keys**

   **Server (.env)**

   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/sonic_db"
   CLERK_PUBLISHABLE_KEY="pk_test_..."
   CLERK_SECRET_KEY="sk_test_..."
   GEMINI_API_KEY="your_gemini_api_key"
   PORT=4000
   ```

   **Client (.env)**

   ```env
   VITE_CLERK_PUBLISHABLE_KEY="pk_test_..."
   ```

4. **Set up your database**

   ```bash
   cd server
   npx prisma generate
   npx prisma db push
   ```

5. **Fire it up!**

   ```bash
   # Start the backend (Terminal 1)
   cd server
   npm run dev

   # Start the frontend (Terminal 2)
   cd client
   npm run dev
   ```

That's it! Open your browser and start talking to your workout tracker. 🎉

## Try It Out

**Here's how easy it is:**

### Logging Workouts

Just hit the mic button and say things like:

- _"I did bench press today, 3 sets of 8 reps at 185 pounds"_
- _"Ran 3 miles in 25 minutes, then did push-ups, about 50 total"_
- _"Squats: 5 sets of 5 at 225 pounds"_

### Tracking Body Stats

Quick check-ins work too:

- _"I weigh 175 pounds today"_
- _"Weighed myself this morning, 178.5 pounds, body fat 15.2%"_
- _"Body weight 180, muscle mass 45 pounds"_

### Mix It Up

Sonic handles complex entries like a pro:

- _"I weigh 175 today and did squats, 5 sets of 5 at 225"_

**The best part?** Sonic understands natural speech. Talk however feels comfortable - no robot commands needed.

### API Endpoints

#### Authentication Required

- `GET /api/logs` - Retrieve workout logs
- `POST /api/logs` - Create workout log
- `GET /api/metrics` - Retrieve body metrics
- `POST /api/metrics` - Create body metric
- `POST /api/voice-log` - Process voice input

## 🛠️ What's Under the Hood

**For the curious developers:**

### Frontend Stack

- **React 18** with TypeScript (modern & type-safe)
- **Zustand** for state management (simple & powerful)
- **Recharts** for beautiful visualizations
- **Tailwind CSS** for clean styling
- **Clerk React** for hassle-free auth
- **React Speech Recognition** for voice magic

### Backend Power

- **Node.js** with Express and TypeScript
- **Prisma** ORM with PostgreSQL (type-safe database ops)
- **Clerk** authentication middleware
- **Google Gemini AI** for understanding natural language
- **CORS** enabled for seamless frontend-backend communication

## The AI Magic Explained

**Ever wonder how Sonic "gets" what you're saying?**

### The Voice Processing Journey

1. **You Speak** → Your browser captures the audio and converts it to text
2. **AI Analyzes** → Gemini AI figures out if you're talking about workouts, body stats, or both
3. **Data Gets Structured** → Natural language becomes organized fitness data
4. **Everything's Saved** → Your info gets stored securely with all the right connections

### Smart AI Features

- **Context Understanding**: Knows the difference between "I did 3 sets" vs "I weigh 3 times what I should"
- **Flexible Language**: Whether you say "bench press," "benching," or "BP" - it gets it
- **Error Recovery**: If something's unclear, it asks for clarification instead of guessing wrong
- **Learning**: Gets better at understanding your specific way of talking over time

## Charts That Actually Help

**Because pretty graphs should also be useful graphs.**

### What You Can Visualize

- **Progress Over Time**: See your strength gains, weight changes, or any metric you're tracking
- **Custom Comparisons**: Want to see if your squat correlates with your body weight? Easy.
- **Flexible Time Ranges**: Last week, last month, last year, or any custom period
- **Multiple Chart Types**: Line graphs, scatter plots, whatever shows your data best

### Smart Insights You'll Actually Use

- **Volume Tracking**: How much total weight you're moving over time
- **Consistency Metrics**: Are you actually sticking to your routine?
- **Progress Indicators**: Clear visual feedback when you're improving (or not)
- **Pattern Recognition**: Spot trends you might miss just looking at numbers

## Want to Contribute?

**Found a bug? Have a cool idea? I'd love your help!**

1. Fork this repo
2. Create your feature branch (`git checkout -b feature/awesome-feature`)
3. Make your changes and test them
4. Commit with a clear message (`git commit -m 'feat: add awesome feature'`)
5. Push to your branch (`git push origin feature/awesome-feature`)
6. Open a Pull Request and tell us what you built!

## License

This project is MIT licensed. Basically, do what you want with it.
