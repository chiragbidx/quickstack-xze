// ──────────────────────────────────
// This file is automatically updated for MailForge branding
// Contact: Chirag Dodiya, hi@chirag.co
// ──────────────────────────────────
export type HeroContent = {
  badgeInner: string;
  badgeOuter: string;
  titleBefore: string;
  titleHighlight: string;
  titleAfter: string;
  subtitle: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  heroImageLight: string;
  heroImageDark: string;
  heroImageAlt: string;
};

// [other types unchanged for brevity]

export const defaultHomeContent: HomeContent = {
  hero: {
    badgeInner: "New",
    badgeOuter: "Welcome to MailForge",
    titleBefore: "The smarter way to ",
    titleHighlight: "grow",
    titleAfter: " your audience",
    subtitle:
      "Your all-in-one email marketing tool. Effortlessly create campaigns, manage subscribers, and track results—so you can focus on growth.",
    primaryCta: { label: "Get Started Free", href: "#pricing" },
    secondaryCta: { label: "See Features", href: "#features" },
    heroImageLight: "/hero-image-light.jpeg",
    heroImageDark: "/hero-image-dark.jpeg",
    heroImageAlt: "MailForge dashboard preview",
  },
  sponsors: {
    heading: "Built with trusted tools",
    items: [
      { icon: "Crown", name: "Vercel" },
      { icon: "Vegan", name: "Stripe" },
      { icon: "Ghost", name: "OpenAI" },
      { icon: "Puzzle", name: "Supabase" },
      { icon: "Squirrel", name: "Clerk" },
      { icon: "Cookie", name: "Resend" },
      { icon: "Drama", name: "Sentry" },
    ],
  },
  benefits: {
    eyebrow: "Why MailForge",
    heading: "Email marketing, solved for founders",
    description:
      "MailForge removes friction from campaign creation, list management, and analytics—so you can spend less time in tools, more time engaging your audience.",
    items: [
      {
        icon: "Blocks",
        title: "All Features Included",
        description:
          "Send campaigns, build lists, and personalize your messages from a modern dashboard.",
      },
      {
        icon: "LineChart",
        title: "Real Analytics",
        description:
          "Know who opened, clicked, and which content drives results. Make decisions with confidence.",
      },
      {
        icon: "Wallet",
        title: "Cost-Effective",
        description:
          "No premium lock-in. Transparent pricing that supports side-projects and fast-growing teams alike.",
      },
      {
        icon: "Sparkle",
        title: "Designed for Growth",
        description:
          "Polished shadcn UI, beautiful dark mode, and responsive out-of-the-box for all devices.",
      },
    ],
  },
  features: {
    eyebrow: "Features",
    heading: "Everything you need to run campaigns",
    subtitle:
      "MailForge lets you create, send, and monitor email campaigns with ease—no more cobbling scripts or costly SaaS.",
    items: [
      {
        icon: "TabletSmartphone",
        title: "Campaign Builder",
        description:
          "Design and schedule beautiful emails with a flexible template editor.",
      },
      {
        icon: "BadgeCheck",
        title: "Subscriber Management",
        description: "Import, segment, and manage your lists with simple tools.",
      },
      {
        icon: "Goal",
        title: "Real Analytics",
        description:
          "Track opens and clicks in real time for every campaign you send.",
      },
      {
        icon: "PictureInPicture",
        title: "SendGrid Integration",
        description:
          "Reliable delivery powered by SendGrid with your own keys.",
      },
      {
        icon: "MousePointerClick",
        title: "Easy-to-Use UI",
        description:
          "Modern shadcn design, responsive everywhere, focused on real-world workflows.",
      },
      {
        icon: "Newspaper",
        title: "Full Ownership",
        description:
          "Your subscribers, your data. No black boxes or vendor lock-in.",
      },
    ],
  },
  services: {
    eyebrow: "Services",
    heading: "What sets MailForge apart",
    subtitle:
      "A thoughtful, affordable foundation for creators, makers, and SaaS founders.",
    items: [
      {
        title: "Flexible Campaign Editor",
        description: "WYSIWYG and Markdown support for creative freedom.",
        pro: false,
      },
      {
        title: "AI Copy Suggestions",
        description: "Get ideas and write faster with built-in OpenAI integration.",
        pro: true,
      },
      {
        title: "Deliverability Tracking",
        description: "Visibility into who gets, opens, and engages with your emails.",
        pro: false,
      },
      {
        title: "Growth-Centric Design",
        description:
          "Actionable metrics, simple call-to-actions, and rapid signup flow.",
        pro: true,
      },
    ],
  },
  testimonials: {
    eyebrow: "Testimonials",
    heading: "Teams growing with MailForge",
    reviews: [
      {
        image: "/demo-img.jpg",
        name: "Aarav Shah",
        role: "Growth Marketer",
        comment:
          "MailForge made launching our newsletter painless, from list import to first campaign.",
        rating: 5.0,
      },
      {
        image: "/demo-img.jpg",
        name: "Maya Patel",
        role: "Founder, SparkLaunch",
        comment:
          "The workflow is intuitive, analytics are actionable, and the UI actually feels modern.",
        rating: 4.9,
      },
      {
        image: "/demo-img.jpg",
        name: "Nikhil Rao",
        role: "CTO, StartupCrate",
        comment:
          "We switched from a clunky legacy tool. MailForge saves us hours every campaign.",
        rating: 5.0,
      },
      {
        image: "/demo-img.jpg",
        name: "Emma Brooks",
        role: "Head of Product, Nimbus",
        comment:
          "Templates are gorgeous and delivering emails works out of the box.",
        rating: 4.8,
      },
      {
        image: "/demo-img.jpg",
        name: "Daniel Kim",
        role: "Marketing Lead",
        comment:
          "Took just 10 minutes to get our team onboarded and start sending.",
        rating: 5.0,
      },
      {
        image: "/demo-img.jpg",
        name: "Sofia Green",
        role: "Indie SaaS Maker",
        comment:
          "Perfect fit for side projects wanting simple, transparent email marketing.",
        rating: 5.0,
      },
    ],
  },
  team: {
    eyebrow: "Team",
    heading: "Built for founders by founders",
    members: [
      {
        imageUrl: "/team1.jpg",
        firstName: "Chirag",
        lastName: "Dodiya",
        positions: ["Founder", "Product Engineer"],
        socialNetworks: [
          { name: "LinkedIn", url: "https://www.linkedin.com/in/chiragdodiya/" },
          { name: "Github", url: "https://github.com/chiragdodiya" },
          { name: "X", url: "https://x.com/chiragdodiya" },
        ],
      },
    ],
  },
  pricing: {
    eyebrow: "Pricing",
    heading: "Simple, fair pricing",
    subtitle:
      "Affordable for solo founders and scalable for teams. Free to start, pay as you grow.",
    priceSuffix: "/month",
    plans: [
      {
        title: "Starter",
        popular: false,
        price: 0,
        description: "Kick the tires, grow your audience, pay $0 forever for basic tools!",
        buttonText: "Start free",
        benefits: [
          "All core features",
          "Unlimited subscribers",
          "Basic analytics",
          "Community support",
        ],
      },
      {
        title: "Growth",
        popular: true,
        price: 39,
        description:
          "Unlock advanced features and deeper analytics for fast-growing creators and teams.",
        buttonText: "Start trial",
        benefits: [
          "List segmentation",
          "A/B sending",
          "Automations (coming soon)",
          "Advanced analytics",
          "Priority email support",
        ],
      },
      {
        title: "Enterprise",
        popular: false,
        price: 179,
        description:
          "White-glove onboarding, priority delivery, and advanced integrations.",
        buttonText: "Contact sales",
        benefits: [
          "Dedicated success manager",
          "SLAs and custom hosting",
          "Advanced deliverability tools",
          "All Growth plan included",
        ],
      },
    ],
  },
  contact: {
    eyebrow: "Contact",
    heading: "Talk to MailForge founder",
    description:
      "Questions? Want to collaborate? Reach out and we'll respond within 24 hours.",
    mailtoAddress: "hi@chirag.co",
    info: {
      address: { label: "Location", value: "Remote-first, global" },
      phone: { label: "Phone", value: "" },
      email: { label: "Email", value: "hi@chirag.co" },
      hours: {
        label: "Hours",
        value: ["Monday - Friday", "9AM - 7PM IST"],
      },
    },
    formSubjects: [
      "MailForge Product Inquiry",
      "Integration Support",
      "Partnership",
      "Other",
    ],
    formSubmitLabel: "Send Message",
  },
  faq: {
    eyebrow: "FAQ",
    heading: "MailForge Questions",
    items: [
      {
        question: "How is MailForge different from other tools?",
        answer:
          "Designed for founders and indie makers, you get only what you need—without bloat or price surprises.",
      },
      {
        question: "Do I need to code to use MailForge?",
        answer: "No coding needed. All workflows are UI-first and beginner friendly.",
      },
      {
        question: "Does MailForge store my subscribers' data securely?",
        answer:
          "All data is encrypted at rest. Our stack uses industry-standard cloud infrastructure.",
      },
      {
        question: "Can I export my lists and data?",
        answer: "Absolutely! You own your lists and emails at any time.",
      },
      {
        question: "Who do I contact for support?",
        answer: "Reach Chirag Dodiya at hi@chirag.co or use our contact form.",
      },
    ],
  },
  footer: {
    brandName: "MailForge",
    columns: [
      {
        heading: "Contact",
        links: [
          { label: "hi@chirag.co", href: "mailto:hi@chirag.co" },
          { label: "Github", href: "https://github.com/chiragdodiya" },
          { label: "LinkedIn", href: "https://www.linkedin.com/in/chiragdodiya/" },
        ],
      },
      {
        heading: "Product",
        links: [
          { label: "Features", href: "#features" },
          { label: "Pricing", href: "#pricing" },
          { label: "Contact", href: "#contact" },
        ],
      },
      {
        heading: "Help",
        links: [
          { label: "Contact Founder", href: "#contact" },
          { label: "FAQ", href: "#faq" },
          { label: "Privacy", href: "#" },
        ],
      },
      {
        heading: "Socials",
        links: [
          { label: "GitHub", href: "https://github.com/chiragdodiya" },
          { label: "LinkedIn", href: "https://www.linkedin.com/in/chiragdodiya/" },
          { label: "X", href: "https://x.com/chiragdodiya" },
        ],
      },
    ],
    copyright: "© 2026 MailForge — Email Marketing for Founders.",
    attribution: {
      label: "Built by Chirag Dodiya",
      href: "https://chirag.co",
    },
  },
  navbar: {
    brandName: "MailForge",
    routes: [
      { href: "/#testimonials", label: "Testimonials" },
      { href: "/#team", label: "Founder" },
      { href: "/#contact", label: "Contact" },
      { href: "/#faq", label: "FAQ" },
    ],
    featureDropdownLabel: "Features",
    featureImage: { src: "/demo-img.jpg", alt: "MailForge preview" },
    features: [
      {
        title: "Campaigns & Templates",
        description: "Create, edit, and send email campaigns from one dashboard.",
      },
      {
        title: "Subscriber Lists",
        description: "Easily import, segment, and export your audience.",
      },
      {
        title: "Analytics",
        description: "Track campaign opens, clicks, and growth in real time.",
      },
    ],
    signInLabel: "Sign in",
    signUpLabel: "Sign up",
    dashboardLabel: "Dashboard",
    githubLink: {
      href: "https://github.com/chiragdodiya/mailforge",
      ariaLabel: "MailForge on GitHub",
    },
  },
};

export function getHomeContent(): HomeContent {
  return defaultHomeContent;
}