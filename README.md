# 📚 TelcoLearn Platform

A student-first Web3-inspired loyalty platform where learning pays off with real telco rewards.

## 🎯 Problem Statement

Traditional education lacks tangible rewards, while telecom companies seek innovative ways to engage young customers. Students need motivation to learn consistently, and telcos need to build loyalty among the next generation of users.

## 💡 Solution

TelcoLearn bridges this gap by creating a gamified learning platform where students earn TLC (TelcoLearn Credits) tokens through educational activities and redeem them for real telco benefits like mobile recharges, data packs, and bill credits.

### The Learning-to-Earning Flow
**Learn** courses → **Take** quizzes → **Play** games → **Earn** TLC tokens → **Redeem** telco rewards

## 🏗️ Core Features

- **📖 Multi-Track Learning**: 5 specializations (AI/ML, Data Science, Web Dev, Cybersecurity, Cloud)
- **🧠 Daily Quizzes**: Track-specific MCQ questions with scoring and bonus rewards
- **🎮 Mini Games**: Speed Quiz and Memory Match games for extra token earning
- **🎁 Redemption Store**: Real telco benefits (recharges, data packs, bill credits)
- **🏆 Leaderboard**: Competitive rankings with achievement badges
- **📊 Wallet & Analytics**: Transaction history, earning patterns, and balance tracking

## 💰 Token Economics

| Activity | TLC Reward | Notes |
|----------|------------|--------|
| Welcome Bonus | +100 TLC | One-time signup reward |
| Course Lesson Completion | +20 TLC | Per lesson completed |
| Quiz Attempt | +5 TLC base | +2 TLC per correct answer |
| Perfect Quiz Score | +10 TLC bonus | 100% accuracy bonus |
| Daily Login Streak | +5-35 TLC | 5 TLC × streak day (max 7) |
| Mini-Game Score | Up to +30 TLC | Score ÷ 10, capped at 30 |

## 🎁 Redemption Options

- **📱 ₹50 Mobile Recharge** - 250 TLC
- **📶 1 GB Data Pack** - 180 TLC  
- **💰 ₹100 Bill Credit** - 500 TLC
- **📱 ₹100 Mobile Recharge** - 480 TLC
- **📶 2 GB Data Pack** - 350 TLC
- **💰 ₹200 Bill Credit** - 950 TLC

## 🚀 Getting Started

### For Development
```bash
# Clone the repository
git clone <repository-url>

# Install dependencies  
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### For Users
1. Sign up with your name and phone/email
2. Choose your learning track during onboarding
3. Complete lessons, take quizzes, and play games
4. Earn TLC tokens for every activity
5. Redeem tokens for real telco benefits

## 🛠️ Technology Stack

- **Frontend**: React + Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Storage**: localStorage (demo) → Blockchain (future)
- **Routing**: React Router
- **Animations**: React Confetti

## 📱 Pages & Features

### Core Pages
- **Login** (`/login`) - Simple phone/email authentication
- **Onboarding** (`/onboarding`) - Track selection interface
- **Dashboard** (`/dashboard`) - Main hub with stats and quick actions
- **Courses** (`/courses`) - Learning modules and lesson completion
- **Quiz** (`/quiz`) - Daily track-specific quiz challenges
- **Games** (`/games`) - Speed Quiz and Memory Match mini-games
- **Wallet** (`/wallet`) - TLC balance and transaction history
- **Redeem** (`/redeem`) - Telco rewards marketplace
- **Leaderboard** (`/leaderboard`) - Student rankings and achievements
- **Admin** (`/admin`) - Data management and system controls
- **Docs** (`/docs`) - Platform documentation

### Components
- **TokenBadge** - TLC balance display with animations
- **ProgressBar** - Learning progress visualization  
- **QuizRunner** - Interactive quiz interface
- **GameSpeedMCQ** - Fast-paced question game
- **GameMemory** - Memory matching card game
- **RedeemModal** - Reward confirmation with confetti

## 🎯 Future Roadmap

1. **Blockchain Integration** - Move from localStorage to real blockchain tokens (Polygon/Ethereum)
2. **Telco API Integration** - Real-time mobile recharge and data pack processing
3. **AI-Powered Personalization** - Adaptive learning paths and intelligent content recommendations
4. **Social Features** - Study groups, peer challenges, and collaborative learning
5. **Advanced Analytics** - Learning insights and performance tracking
6. **Mobile App** - Native iOS and Android applications
7. **Corporate Partnerships** - Integration with major telecom operators

## 🌟 Key Innovations

- **Web3 UX without Complexity** - Token rewards without requiring crypto knowledge
- **Educational Gamification** - Making learning intrinsically rewarding
- **Real-World Value** - Tokens have immediate utility for everyday needs
- **Telco Integration Ready** - Designed for seamless operator partnerships

## 🔒 Security & Privacy

- All user data stored locally in browser (localStorage)
- No sensitive financial information processed
- Mock redemptions with order ID generation
- GDPR-compliant data handling (future enhancement)

## 📈 Metrics & KPIs

- **Student Engagement**: Daily active users, session duration, completion rates
- **Token Economics**: TLC earned vs. redeemed, average balance, redemption patterns
- **Learning Outcomes**: Quiz scores, streak lengths, skill progression
- **Platform Growth**: New registrations, track popularity, user retention

## 🤝 Contributing

This is a demonstration project built with Bolt.new. For production deployment:

1. Set up proper user authentication
2. Integrate with real blockchain networks
3. Connect to telecom operator APIs
4. Implement proper database storage
5. Add comprehensive testing suite

## 📄 License

MIT License - See LICENSE file for details

## 🏗️ Built With

- **Bolt.new** - AI-powered development platform
- **Claude Sonnet 4** - Advanced AI assistance
- **Modern React Stack** - Latest web technologies

---

**Ready to revolutionize education with blockchain rewards? Start learning and earning today!** 🚀