export const ssoCaseStudy = {
  id: "enterprise-sso",
  title: "Enterprise SSO System",
  company: "SeeBiz PVT LTD",
  role: "Software Engineer — identity platform implementation",
  timeframe: "2022 – Present",
  problem:
    "Multiple product apps needed one secure sign-in experience. Teams faced login friction, inconsistent sessions, and slow admin search across user records.",
  approach: [
    "Designed centralized SSO with Node.js and Next.js for web clients across the product suite.",
    "Implemented MFA, cryptographic account lifecycle flows, and audit trails for compliance-ready access control.",
    "Integrated Elasticsearch for admin search and migrated legacy flows to serverless to cut cost and deploy time.",
  ],
  outcomes: [
    { value: "15K+", label: "Active users on unified auth" },
    { value: "99.9%", label: "Reduction in unauthorized access attempts" },
    { value: "40%", label: "Faster admin search queries" },
    { value: "30%", label: "Lower cloud infrastructure cost" },
  ],
  stack: ["Node.js", "Next.js", "Elasticsearch", "AWS", "Serverless", "MFA"],
};
