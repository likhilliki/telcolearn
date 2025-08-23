import { Track, Quiz, RedemptionItem, LeaderboardEntry } from './types';

export const tracks: Track[] = [
  {
    id: 'ai-ml',
    name: 'AI/Machine Learning',
    description: 'Master artificial intelligence and machine learning fundamentals',
    icon: '🤖',
    color: 'bg-blue-500',
    modules: [
      {
        id: 'ai-basics',
        trackId: 'ai-ml',
        title: 'AI Fundamentals',
        description: 'Introduction to artificial intelligence concepts',
        isLocked: false,
        lessons: [
          {
            id: 'ai-intro',
            moduleId: 'ai-basics',
            title: 'What is Artificial Intelligence?',
            content: 'AI is the simulation of human intelligence in machines that are programmed to think and learn like humans.',
            isCompleted: false,
            tlcReward: 20
          },
          {
            id: 'ai-types',
            moduleId: 'ai-basics',
            title: 'Types of AI',
            content: 'Learn about narrow AI, general AI, and superintelligence.',
            isCompleted: false,
            tlcReward: 20
          }
        ]
      },
      {
        id: 'ml-basics',
        trackId: 'ai-ml',
        title: 'Machine Learning Basics',
        description: 'Core concepts of machine learning algorithms',
        isLocked: true,
        lessons: [
          {
            id: 'ml-intro',
            moduleId: 'ml-basics',
            title: 'Introduction to ML',
            content: 'Machine learning enables computers to learn and improve from experience without explicit programming.',
            isCompleted: false,
            tlcReward: 20
          }
        ]
      },
      {
        id: 'deep-learning',
        trackId: 'ai-ml',
        title: 'Deep Learning',
        description: 'Neural networks and deep learning techniques',
        isLocked: true,
        lessons: [
          {
            id: 'neural-networks',
            moduleId: 'deep-learning',
            title: 'Neural Networks',
            content: 'Understand the building blocks of deep learning - artificial neural networks.',
            isCompleted: false,
            tlcReward: 20
          }
        ]
      }
    ]
  },
  {
    id: 'data-science',
    name: 'Data Science',
    description: 'Learn to extract insights from data',
    icon: '📊',
    color: 'bg-green-500',
    modules: [
      {
        id: 'data-analysis',
        trackId: 'data-science',
        title: 'Data Analysis',
        description: 'Statistical analysis and data interpretation',
        isLocked: false,
        lessons: [
          {
            id: 'stats-basics',
            moduleId: 'data-analysis',
            title: 'Statistical Fundamentals',
            content: 'Learn basic statistical concepts for data analysis.',
            isCompleted: false,
            tlcReward: 20
          }
        ]
      },
      {
        id: 'data-viz',
        trackId: 'data-science',
        title: 'Data Visualization',
        description: 'Creating meaningful charts and graphs',
        isLocked: true,
        lessons: [
          {
            id: 'chart-types',
            moduleId: 'data-viz',
            title: 'Chart Types',
            content: 'Understand different types of charts and when to use them.',
            isCompleted: false,
            tlcReward: 20
          }
        ]
      },
      {
        id: 'big-data',
        trackId: 'data-science',
        title: 'Big Data',
        description: 'Handling large-scale data processing',
        isLocked: true,
        lessons: [
          {
            id: 'hadoop-intro',
            moduleId: 'big-data',
            title: 'Introduction to Hadoop',
            content: 'Learn about distributed computing with Hadoop ecosystem.',
            isCompleted: false,
            tlcReward: 20
          }
        ]
      }
    ]
  },
  {
    id: 'web-dev',
    name: 'Web Development',
    description: 'Build modern web applications',
    icon: '💻',
    color: 'bg-purple-500',
    modules: [
      {
        id: 'frontend',
        trackId: 'web-dev',
        title: 'Frontend Development',
        description: 'HTML, CSS, JavaScript fundamentals',
        isLocked: false,
        lessons: [
          {
            id: 'html-basics',
            moduleId: 'frontend',
            title: 'HTML Fundamentals',
            content: 'Learn the structure of web pages with HTML.',
            isCompleted: false,
            tlcReward: 20
          }
        ]
      },
      {
        id: 'backend',
        trackId: 'web-dev',
        title: 'Backend Development',
        description: 'Server-side programming and databases',
        isLocked: true,
        lessons: [
          {
            id: 'nodejs-intro',
            moduleId: 'backend',
            title: 'Node.js Introduction',
            content: 'Build server-side applications with Node.js.',
            isCompleted: false,
            tlcReward: 20
          }
        ]
      },
      {
        id: 'fullstack',
        trackId: 'web-dev',
        title: 'Full Stack',
        description: 'Connecting frontend and backend',
        isLocked: true,
        lessons: [
          {
            id: 'apis',
            moduleId: 'fullstack',
            title: 'REST APIs',
            content: 'Learn to build and consume REST APIs.',
            isCompleted: false,
            tlcReward: 20
          }
        ]
      }
    ]
  },
  {
    id: 'cybersecurity',
    name: 'Cybersecurity',
    description: 'Protect systems and data from threats',
    icon: '🔒',
    color: 'bg-red-500',
    modules: [
      {
        id: 'security-basics',
        trackId: 'cybersecurity',
        title: 'Security Fundamentals',
        description: 'Basic cybersecurity principles',
        isLocked: false,
        lessons: [
          {
            id: 'threats-overview',
            moduleId: 'security-basics',
            title: 'Common Threats',
            content: 'Understand different types of cybersecurity threats.',
            isCompleted: false,
            tlcReward: 20
          }
        ]
      },
      {
        id: 'network-security',
        trackId: 'cybersecurity',
        title: 'Network Security',
        description: 'Securing network infrastructure',
        isLocked: true,
        lessons: [
          {
            id: 'firewalls',
            moduleId: 'network-security',
            title: 'Firewalls and Intrusion Detection',
            content: 'Learn about network protection mechanisms.',
            isCompleted: false,
            tlcReward: 20
          }
        ]
      },
      {
        id: 'ethical-hacking',
        trackId: 'cybersecurity',
        title: 'Ethical Hacking',
        description: 'Penetration testing and vulnerability assessment',
        isLocked: true,
        lessons: [
          {
            id: 'pentest-basics',
            moduleId: 'ethical-hacking',
            title: 'Penetration Testing',
            content: 'Introduction to ethical hacking and penetration testing.',
            isCompleted: false,
            tlcReward: 20
          }
        ]
      }
    ]
  },
  {
    id: 'cloud',
    name: 'Cloud Computing',
    description: 'Master cloud technologies and services',
    icon: '☁️',
    color: 'bg-indigo-500',
    modules: [
      {
        id: 'cloud-basics',
        trackId: 'cloud',
        title: 'Cloud Fundamentals',
        description: 'Introduction to cloud computing',
        isLocked: false,
        lessons: [
          {
            id: 'cloud-intro',
            moduleId: 'cloud-basics',
            title: 'What is Cloud Computing?',
            content: 'Learn about cloud computing models and services.',
            isCompleted: false,
            tlcReward: 20
          }
        ]
      },
      {
        id: 'aws-basics',
        trackId: 'cloud',
        title: 'AWS Fundamentals',
        description: 'Amazon Web Services basics',
        isLocked: true,
        lessons: [
          {
            id: 'ec2-intro',
            moduleId: 'aws-basics',
            title: 'EC2 Introduction',
            content: 'Learn about Amazon Elastic Compute Cloud.',
            isCompleted: false,
            tlcReward: 20
          }
        ]
      },
      {
        id: 'devops',
        trackId: 'cloud',
        title: 'DevOps',
        description: 'Deployment and infrastructure automation',
        isLocked: true,
        lessons: [
          {
            id: 'ci-cd',
            moduleId: 'devops',
            title: 'CI/CD Pipelines',
            content: 'Continuous integration and deployment practices.',
            isCompleted: false,
            tlcReward: 20
          }
        ]
      }
    ]
  }
];

export const quizzes: Quiz[] = [
  {
    id: 'ai-ml-quiz',
    trackId: 'ai-ml',
    dailyDate: '2025-01-16',
    questions: [
      {
        id: 'q1',
        question: 'What does AI stand for?',
        options: ['Artificial Intelligence', 'Automated Intelligence', 'Advanced Intelligence', 'Applied Intelligence'],
        correctAnswer: 0
      },
      {
        id: 'q2',
        question: 'Which is NOT a type of machine learning?',
        options: ['Supervised Learning', 'Unsupervised Learning', 'Reinforcement Learning', 'Deterministic Learning'],
        correctAnswer: 3
      },
      {
        id: 'q3',
        question: 'What is a neural network inspired by?',
        options: ['Computer circuits', 'Human brain', 'Mathematical equations', 'Statistical models'],
        correctAnswer: 1
      },
      {
        id: 'q4',
        question: 'Which algorithm is commonly used for classification?',
        options: ['Linear Regression', 'K-Means', 'Decision Tree', 'PCA'],
        correctAnswer: 2
      },
      {
        id: 'q5',
        question: 'What is overfitting in machine learning?',
        options: ['Model performs well on training data but poorly on test data', 'Model performs poorly on both training and test data', 'Model performs well on test data but poorly on training data', 'Model takes too long to train'],
        correctAnswer: 0
      }
    ]
  },
  {
    id: 'data-science-quiz',
    trackId: 'data-science',
    dailyDate: '2025-01-16',
    questions: [
      {
        id: 'q1',
        question: 'What is the first step in data analysis?',
        options: ['Data visualization', 'Data collection', 'Data cleaning', 'Model building'],
        correctAnswer: 1
      },
      {
        id: 'q2',
        question: 'Which chart is best for showing correlation?',
        options: ['Bar chart', 'Pie chart', 'Scatter plot', 'Line chart'],
        correctAnswer: 2
      },
      {
        id: 'q3',
        question: 'What does SQL stand for?',
        options: ['Structured Query Language', 'Sequential Query Language', 'Standard Query Language', 'Simple Query Language'],
        correctAnswer: 0
      },
      {
        id: 'q4',
        question: 'What is the median of [1, 3, 5, 7, 9]?',
        options: ['3', '5', '7', '25'],
        correctAnswer: 1
      },
      {
        id: 'q5',
        question: 'What is Big Data characterized by?',
        options: ['Volume, Velocity, Variety', 'Speed, Scale, Storage', 'Database, Analytics, Visualization', 'Collection, Processing, Analysis'],
        correctAnswer: 0
      }
    ]
  }
];

export const redemptionItems: RedemptionItem[] = [
  {
    id: 'recharge-50',
    title: '₹50 Mobile Recharge',
    description: 'Instant mobile recharge for any operator',
    cost: 250,
    category: 'recharge',
    icon: '📱'
  },
  {
    id: 'data-1gb',
    title: '1 GB Data Pack',
    description: '1 GB high-speed data valid for 30 days',
    cost: 180,
    category: 'data',
    icon: '📶'
  },
  {
    id: 'credit-100',
    title: '₹100 Bill Credit',
    description: 'Credit towards your monthly bill payment',
    cost: 500,
    category: 'credit',
    icon: '💰'
  },
  {
    id: 'recharge-100',
    title: '₹100 Mobile Recharge',
    description: 'Instant mobile recharge for any operator',
    cost: 480,
    category: 'recharge',
    icon: '📱'
  },
  {
    id: 'data-2gb',
    title: '2 GB Data Pack',
    description: '2 GB high-speed data valid for 30 days',
    cost: 350,
    category: 'data',
    icon: '📶'
  },
  {
    id: 'credit-200',
    title: '₹200 Bill Credit',
    description: 'Credit towards your monthly bill payment',
    cost: 950,
    category: 'credit',
    icon: '💰'
  }
];

export const mockLeaderboard: LeaderboardEntry[] = [
  { rank: 1, name: 'Priya Sharma', tlcBalance: 1250, streak: 15 },
  { rank: 2, name: 'Rahul Kumar', tlcBalance: 1100, streak: 12 },
  { rank: 3, name: 'Sneha Patel', tlcBalance: 950, streak: 10 },
  { rank: 4, name: 'Amit Singh', tlcBalance: 875, streak: 8 },
  { rank: 5, name: 'Kavya Nair', tlcBalance: 825, streak: 11 },
  { rank: 6, name: 'Rohit Gupta', tlcBalance: 775, streak: 7 },
  { rank: 7, name: 'Ananya Joshi', tlcBalance: 720, streak: 9 },
  { rank: 8, name: 'Vikram Reddy', tlcBalance: 680, streak: 6 },
  { rank: 9, name: 'Meera Iyer', tlcBalance: 650, streak: 5 },
  { rank: 10, name: 'Arjun Mehta', tlcBalance: 600, streak: 8 }
];