const config = {
  title: "Muhammad Rizwan | Full Stack & Mobile Developer",
  description: {
    long: "Portfolio of Muhammad Rizwan, a Full Stack & Mobile Developer with 4+ years experience in Lahore building secure backends, cross-platform mobile apps, and AI-integrated products with Node.js, Next.js, React Native, and Python.",
    short:
      "Muhammad Rizwan — Full Stack & Mobile Developer (4+ years) shipping SSO, search, and real-time products for 15K+ users.",
  },
  keywords: [
    "Muhammad Rizwan",
    "portfolio",
    "software engineer",
    "full stack developer",
    "React Native developer",
    "Node.js developer",
    "Next.js",
    "FastAPI",
    "Lahore",
    "Pakistan",
    "Turnfeat",
    "SeeBiz",
    "SeeCard",
    "SeeTask",
    "HiveTalk",
    "vibe coding",
    "Cursor",
  ],
  author: "Muhammad Rizwan",
  email: "muhammadrizwaneng@gmail.com",
  site: "https://rizwan-portfolio-eight.vercel.app/attractive",

  githubUsername: "muhammadrizwaneng",
  githubRepo: "HiveTalk",

  get ogImg() {
    return this.site + "/assets/seo/og-image.png";
  },
  calendly: "",

  social: {
    linkedin: "https://linkedin.com/in/muhammad-rizwan-fullstack",
    github: "https://github.com/muhammadrizwaneng",
  },
};
export { config };