// Mock data for CreatorCoPilot dashboard
export const mockData = [
  {
    id: "gen-001",
    type: "BLOG",
    title: "10 Ways AI is Transforming Content Creation",
    status: "SUCCESS",
    createdAt: "2024-12-22T10:30:00Z",
    updatedAt: "2024-12-22T11:45:00Z",
    content: `Artificial Intelligence is revolutionizing how we create content. From automated writing assistants to smart editing tools, here are 10 ways AI is changing the game...

## 1. Automated First Drafts
AI can generate initial drafts based on your outline, saving hours of writing time.

## 2. Smart Editing
Grammar and style suggestions powered by machine learning help polish your content.

## 3. SEO Optimization
AI tools analyze search trends and suggest keywords to improve visibility.

## 4. Content Personalization
Tailor your message to different audiences automatically.

## 5. Image Generation
Create custom visuals without hiring a designer.`,
    ctaLink: "https://example.com/ai-content",
    platforms: ["LinkedIn", "Twitter", "Medium"],
    outputs: {
      linkedin:
        "🚀 AI is revolutionizing content creation! Here are 10 game-changing ways artificial intelligence is helping creators work smarter, not harder. From automated drafts to smart SEO optimization, the future is here. #AI #ContentCreation #FutureOfWork",
      twitter:
        "AI is changing content creation forever 🤖\n\n10 ways it's helping creators:\n• Automated first drafts\n• Smart editing\n• SEO optimization\n• Content personalization\n• Image generation\n\nThread 🧵👇",
      instagram:
        "The future of content creation is here! 🎯✨\n\nAI isn't replacing creators – it's empowering them. Swipe to see 10 ways AI is transforming how we create content.\n\n#AIContentCreation #DigitalMarketing #ContentStrategy #CreatorEconomy #AITools",
    },
  },
  {
    id: "gen-002",
    type: "VIDEO",
    title: "Product Demo - CreatorCoPilot Features",
    status: "PROCESSING",
    createdAt: "2024-12-23T14:20:00Z",
    updatedAt: "2024-12-23T14:25:00Z",
    videoUrl:
      "https://res.cloudinary.com/demo/video/upload/v1234567890/product-demo.mp4",
    fileName: "product-demo-v2.mp4",
    duration: "3:45",
    fileSize: "48.2 MB",
    captions:
      "In this video, we walk through the key features of CreatorCoPilot...",
    hashtags: ["#ProductDemo", "#SaaS", "#CreatorTools", "#AI"],
    platforms: ["YouTube", "TikTok", "Instagram"],
    outputs: {
      youtube: {
        title: "CreatorCoPilot Full Demo | AI-Powered Content Creation",
        description:
          "Watch the complete walkthrough of CreatorCoPilot features. Learn how to 10x your content creation workflow with AI.\n\n⏱️ Timestamps:\n0:00 Introduction\n0:45 Dashboard Overview\n1:30 Blog Generation\n2:15 Video Tools\n3:00 Integrations",
      },
      tiktok:
        "POV: You just discovered the ultimate content creation tool 🤯 #CreatorCoPilot #AITools #ContentCreator",
      instagram:
        "The tool every creator needs in 2025 👀✨ Watch the full demo on our YouTube! Link in bio 🔗",
    },
  },
  {
    id: "gen-003",
    type: "BLOG",
    title: "Building a Personal Brand on LinkedIn",
    status: "SUCCESS",
    createdAt: "2024-12-21T09:15:00Z",
    updatedAt: "2024-12-21T10:00:00Z",
    content: `Your personal brand is your professional superpower. Here's how to build one that opens doors...

## Why Personal Branding Matters
In today's digital age, your online presence is often your first impression.

## Getting Started
1. Define your unique value proposition
2. Choose your content pillars
3. Be consistent with your posting schedule
4. Engage authentically with your network`,
    ctaLink: "https://example.com/linkedin-brand",
    platforms: ["LinkedIn"],
    outputs: {
      linkedin:
        "Your personal brand is your career's secret weapon 🎯\n\nI spent 2 years building mine on LinkedIn. Here's what I learned:\n\n→ Consistency beats perfection\n→ Authenticity attracts the right people\n→ Value-first content wins\n\nWhat's your personal branding strategy?",
    },
  },
  {
    id: "gen-004",
    type: "VIDEO",
    title: "Quick Tips: Content Batching",
    status: "SUCCESS",
    createdAt: "2024-12-20T16:00:00Z",
    updatedAt: "2024-12-20T17:30:00Z",
    videoUrl:
      "https://res.cloudinary.com/demo/video/upload/v1234567890/content-batching.mp4",
    fileName: "content-batching-tips.mp4",
    duration: "1:22",
    fileSize: "15.8 MB",
    captions:
      "Content batching changed my life as a creator. Here's how you can do it too...",
    hashtags: ["#ContentBatching", "#CreatorTips", "#Productivity"],
    platforms: ["TikTok", "Instagram", "YouTube"],
    outputs: {
      youtube: {
        title: "Content Batching 101 | Create a Week of Content in One Day",
        description:
          "Learn the content batching method that helped me grow to 100k followers while working just 4 hours a week on content.",
      },
      tiktok:
        "The content batching method that changed everything 📱✨ Save this for later! #ContentTips #CreatorHacks",
      instagram:
        "Stop creating content daily. Start batching instead 🧠\n\nHere's my exact process:\n1️⃣ Ideation day\n2️⃣ Filming day\n3️⃣ Editing day\n4️⃣ Scheduling day\n\nResult? A full month of content in 4 days 🔥",
    },
  },
  {
    id: "gen-005",
    type: "BLOG",
    title: "The Creator Economy in 2025",
    status: "DRAFT",
    createdAt: "2024-12-23T08:00:00Z",
    updatedAt: "2024-12-23T08:00:00Z",
    content: "Draft: Exploring trends in the creator economy...",
    ctaLink: "",
    platforms: [],
    outputs: {},
  },
  {
    id: "gen-006",
    type: "VIDEO",
    title: "Behind the Scenes - Studio Setup",
    status: "FAILED",
    createdAt: "2024-12-19T11:00:00Z",
    updatedAt: "2024-12-19T11:05:00Z",
    videoUrl: "",
    fileName: "studio-setup-bts.mp4",
    duration: "",
    fileSize: "125 MB",
    captions: "",
    hashtags: [],
    platforms: ["YouTube"],
    outputs: {},
    error: "Video processing failed. File may be corrupted.",
  },
];

export const notifications = [
  {
    id: "notif-1",
    title: "Generation Complete",
    message: "Your blog 'AI Content Creation' is ready",
    createdAt: "2024-12-23T10:30:00Z",
    read: false,
    type: "success",
  },
  {
    id: "notif-2",
    title: "Processing Started",
    message: "Video 'Product Demo' is being processed",
    createdAt: "2024-12-23T14:20:00Z",
    read: false,
    type: "info",
  },
  {
    id: "notif-3",
    title: "Generation Failed",
    message: "Video 'Studio Setup' failed to process",
    createdAt: "2024-12-19T11:05:00Z",
    read: true,
    type: "error",
  },
];

export const integrations = [
  {
    id: "youtube",
    name: "YouTube",
    description: "Publish videos directly to your YouTube channel",
    icon: "Youtube",
    connected: true,
    connectedAt: "2024-12-01T10:00:00Z",
  },
  {
    id: "google-drive",
    name: "Google Drive",
    description: "Backup and sync your content to Google Drive",
    icon: "HardDrive",
    connected: true,
    connectedAt: "2024-11-15T14:30:00Z",
  },
  {
    id: "medium",
    name: "Medium",
    description: "Cross-post your blogs to Medium automatically",
    icon: "FileText",
    connected: false,
    connectedAt: null,
  },
  {
    id: "twitter",
    name: "Twitter / X",
    description: "Share content snippets on Twitter",
    icon: "Twitter",
    connected: false,
    connectedAt: null,
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    description: "Post professional content to LinkedIn",
    icon: "Linkedin",
    connected: true,
    connectedAt: "2024-12-10T09:00:00Z",
  },
];

export const user = {
  name: "Alex Creator",
  email: "alex@creatorcopilot.com",
  avatar: "/professional-avatar.png",
};
