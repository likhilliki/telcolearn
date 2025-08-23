import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Book, ExternalLink, Github, Rocket } from 'lucide-react';

export const Docs: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <ArrowLeft size={20} />
            </Link>
            <Book className="w-8 h-8 text-blue-500" />
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800">Documentation</h1>
              <p className="text-gray-600">Learn about TelcoLearn platform</p>
            </div>
          </div>
        </div>

        {/* README Content */}
        <div className="bg-white rounded-2xl shadow-md p-8">
          <div className="prose max-w-none">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                📚 TelcoLearn Platform
                <span className="text-lg font-normal text-gray-500">v1.0.0</span>
              </h1>
              <p className="text-lg text-gray-600">
                A student-first Web3-inspired loyalty platform where learning pays off with real telco rewards.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">🎯 Problem Statement</h2>
              <p className="text-gray-600 mb-4">
                Traditional education lacks tangible rewards, while telecom companies seek innovative ways to engage young customers. 
                Students need motivation to learn consistently, and telcos need to build loyalty among the next generation of users.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">💡 Solution</h2>
              <p className="text-gray-600 mb-4">
                TelcoLearn bridges this gap by creating a gamified learning platform where students earn TLC (TelcoLearn Credits) 
                tokens through educational activities and redeem them for real telco benefits like mobile recharges, data packs, 
                and bill credits.
              </p>
              
              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6">
                <h3 className="font-semibold text-blue-800 mb-2">The Learning-to-Earning Flow</h3>
                <div className="text-blue-700">
                  <strong>Learn</strong> courses → <strong>Take</strong> quizzes → <strong>Play</strong> games → 
                  <strong>Earn</strong> TLC tokens → <strong>Redeem</strong> telco rewards
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">🏗️ Core Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">📖 Multi-Track Learning</h4>
                  <p className="text-sm text-gray-600">5 specializations: AI/ML, Data Science, Web Development, Cybersecurity, Cloud Computing</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">🧠 Daily Quizzes</h4>
                  <p className="text-sm text-gray-600">Track-specific MCQ questions with scoring and bonus rewards</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">🎮 Mini Games</h4>
                  <p className="text-sm text-gray-600">Speed Quiz and Memory Match games for extra token earning</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">🎁 Redemption Store</h4>
                  <p className="text-sm text-gray-600">Real telco benefits: recharges, data packs, bill credits</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">🏆 Leaderboard</h4>
                  <p className="text-sm text-gray-600">Competitive rankings with achievement badges</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">📊 Wallet & Analytics</h4>
                  <p className="text-sm text-gray-600">Transaction history, earning patterns, and balance tracking</p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">💰 Token Economics</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300 rounded-lg">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Activity</th>
                      <th className="border border-gray-300 px-4 py-2 text-left font-semibold">TLC Reward</th>
                      <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Welcome Bonus</td>
                      <td className="border border-gray-300 px-4 py-2 font-semibold text-green-600">+100 TLC</td>
                      <td className="border border-gray-300 px-4 py-2">One-time signup reward</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2">Course Lesson Completion</td>
                      <td className="border border-gray-300 px-4 py-2 font-semibold text-green-600">+20 TLC</td>
                      <td className="border border-gray-300 px-4 py-2">Per lesson completed</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Quiz Attempt</td>
                      <td className="border border-gray-300 px-4 py-2 font-semibold text-green-600">+5 TLC base</td>
                      <td className="border border-gray-300 px-4 py-2">+2 TLC per correct answer</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2">Perfect Quiz Score</td>
                      <td className="border border-gray-300 px-4 py-2 font-semibold text-green-600">+10 TLC bonus</td>
                      <td className="border border-gray-300 px-4 py-2">100% accuracy bonus</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">Daily Login Streak</td>
                      <td className="border border-gray-300 px-4 py-2 font-semibold text-green-600">+5-35 TLC</td>
                      <td className="border border-gray-300 px-4 py-2">5 TLC × streak day (max 7)</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2">Mini-Game Score</td>
                      <td className="border border-gray-300 px-4 py-2 font-semibold text-green-600">Up to +30 TLC</td>
                      <td className="border border-gray-300 px-4 py-2">Score ÷ 10, capped at 30</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">🎁 Redemption Options</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="text-2xl mb-2">📱</div>
                  <h4 className="font-semibold text-blue-800">₹50 Mobile Recharge</h4>
                  <p className="text-sm text-blue-600">Cost: 250 TLC</p>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="text-2xl mb-2">📶</div>
                  <h4 className="font-semibold text-green-800">1 GB Data Pack</h4>
                  <p className="text-sm text-green-600">Cost: 180 TLC</p>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <div className="text-2xl mb-2">💰</div>
                  <h4 className="font-semibold text-purple-800">₹100 Bill Credit</h4>
                  <p className="text-sm text-purple-600">Cost: 500 TLC</p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">🚀 Getting Started</h2>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-800 mb-3">For Development:</h3>
                <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto mb-4">
{`# Clone the repository
git clone <repository-url>

# Install dependencies  
npm install

# Start development server
npm run dev

# Build for production
npm run build`}
                </pre>
                
                <h3 className="font-semibold text-gray-800 mb-3">For Users:</h3>
                <ol className="space-y-2 text-gray-600">
                  <li>1. Sign up with your name and phone/email</li>
                  <li>2. Choose your learning track during onboarding</li>
                  <li>3. Complete lessons, take quizzes, and play games</li>
                  <li>4. Earn TLC tokens for every activity</li>
                  <li>5. Redeem tokens for real telco benefits</li>
                </ol>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">🎯 Future Roadmap</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 text-sm font-bold mt-0.5">1</div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Blockchain Integration</h4>
                    <p className="text-gray-600 text-sm">Move from localStorage to real blockchain tokens (Polygon/Ethereum)</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-sm font-bold mt-0.5">2</div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Telco API Integration</h4>
                    <p className="text-gray-600 text-sm">Real-time mobile recharge and data pack processing</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-sm font-bold mt-0.5">3</div>
                  <div>
                    <h4 className="font-semibold text-gray-800">AI-Powered Personalization</h4>
                    <p className="text-gray-600 text-sm">Adaptive learning paths and intelligent content recommendations</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 text-sm font-bold mt-0.5">4</div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Social Features</h4>
                    <p className="text-gray-600 text-sm">Study groups, peer challenges, and collaborative learning</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">🛠️ Technology Stack</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="font-semibold text-blue-800">Frontend</div>
                  <div className="text-sm text-blue-600">React + Vite</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="font-semibold text-purple-800">Styling</div>
                  <div className="text-sm text-purple-600">Tailwind CSS</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="font-semibold text-green-800">Icons</div>
                  <div className="text-sm text-green-600">Lucide React</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="font-semibold text-orange-800">Storage</div>
                  <div className="text-sm text-orange-600">localStorage</div>
                </div>
              </div>
            </div>

            <div className="border-t pt-8">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <span>🏗️ Built with</span>
                  <span className="font-semibold">Bolt.new</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <span>⚡ Powered by</span>
                  <span className="font-semibold">Claude Sonnet 4</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <span>📅</span>
                  <span>{new Date().getFullYear()}</span>
                </div>
              </div>
              
              <div className="mt-6 flex flex-wrap gap-3">
                <button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                  <ExternalLink size={16} />
                  View Live Demo
                </button>
                <button className="flex items-center gap-2 bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                  <Github size={16} />
                  GitHub Repository
                </button>
                <Link 
                  to="/dashboard"
                  className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  <Rocket size={16} />
                  Start Learning Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};