/**
 * CYBER // RISHABH — single source of truth.
 *
 * Everything personal lives here. Components read from this file so that
 * updating a URL, the resume, or the profile photo never requires touching JSX.
 *
 * Empty strings are intentional: email, GitHub, and LinkedIn have not been
 * provided. The UI hides or disables actions that depend on them rather than
 * inventing values.
 */

export const portfolio = {
  identity: {
    name: "Rishabh Aggarwal",
    brand: "CYBER // RISHABH",
    title: "Aspiring Penetration Tester & Developer",
    primaryRole: "Aspiring Penetration Tester",
    subtitle: "Cybersecurity Enthusiast | Full-Stack Developer",
    tagline:
      "Think Like an Attacker. Build Like a Developer. Secure Like a Professional.",
    bio: "I am a BCA student passionate about cybersecurity, ethical hacking, and software development. I enjoy exploring systems, understanding vulnerabilities, and building secure digital experiences.",
    roles: [
      "Aspiring Penetration Tester",
      "Cybersecurity Enthusiast",
      "Full-Stack Developer",
      "BCA Student",
    ],
  },

  /* Contact channels — intentionally empty until provided. */
  contact: {
    email: "",
    github: "",
    linkedin: "",
    /**
     * Optional secure form endpoint (for example a serverless function or a
     * privacy-conscious form provider). Leave empty and the form will clearly
     * report that nothing was sent instead of faking success.
     */
    endpoint: "",
    endpointNote:
      "Connect a serverless function or form provider, then set contact.endpoint in src/data/portfolio.js.",
  },

  media: {
    profileImage: "/images/profile.jpg",
    resume: "/resume/rishabh-resume.pdf",
    resumeFilename: "Rishabh-Aggarwal-Resume.pdf",
  },

  meta: {
    siteName: "CYBER // RISHABH",
    title: "CYBER // RISHABH — Aspiring Penetration Tester & Developer",
    description:
      "Portfolio of Rishabh Aggarwal, a BCA student focused on cybersecurity, penetration testing fundamentals, and full-stack development.",
    themeColor: "#080B0A",
  },

  nav: [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "security-labs", label: "Security Labs" },
    { id: "certifications", label: "Certifications" },
    { id: "resume", label: "Resume" },
    { id: "contact", label: "Contact" },
  ],

  about: {
    paragraphs: [
      "I am Rishabh Aggarwal, a Bachelor of Computer Applications student at Hi-Tech Institute of Engineering and Technology, Ghaziabad.",
      "My primary interest is cybersecurity, particularly penetration testing, ethical hacking, and web application security.",
      "I am continuously developing my understanding of Linux, computer networks, programming, and security fundamentals.",
      "Alongside cybersecurity, I enjoy full-stack development and building practical applications.",
      "My goal is to develop strong technical skills through hands-on projects, authorized security labs, and continuous learning.",
    ],
    interests: [
      "Penetration Testing",
      "Ethical Hacking",
      "Cybersecurity",
      "Web Application Security",
      "Full-Stack Development",
    ],
    journey: [
      {
        phase: "Foundations",
        note: "Strengthening Linux, networking, and programming fundamentals.",
        state: "In progress",
      },
      {
        phase: "Applied practice",
        note: "Applying concepts through personal projects and learning labs.",
        state: "In progress",
      },
      {
        phase: "Specialization",
        note: "Working toward deeper web application security knowledge and future certifications.",
        state: "Upcoming",
      },
    ],
    focusPoints: [
      "Linux fundamentals",
      "Network fundamentals",
      "Web application security",
      "Secure full-stack development",
    ],
  },

  education: {
    degree: "Bachelor of Computer Applications (BCA)",
    institution: "Hi-Tech Institute of Engineering and Technology, Ghaziabad",
    status: "Currently Pursuing",
    focus:
      "Programming, web development, computer networks, and cybersecurity fundamentals.",
  },

  certifications: {
    earned: [
      {
        name: "NIELIT O Level",
        issuer: "National Institute of Electronics and Information Technology (NIELIT)",
        status: "Theory and Practical Passed",
        credentialId: "",
        verifyUrl: "",
        note: "Theory and practical examinations passed. No public credential URL has been added yet.",
      },
    ],
    upcoming: [
      {
        name: "Future cybersecurity certification",
        note: "Reserved for a certification only after it has actually been earned.",
      },
    ],
  },

  /**
   * Skill labels are deliberately qualitative. No percentages, scores, or
   * invented years of experience.
   */
  skillLevels: {
    Learning: "Actively studying the fundamentals",
    Practicing: "Applying it in personal projects",
    Familiar: "Comfortable with the basics",
  },

  skills: [
    {
      id: "programming",
      title: "Programming",
      icon: "code",
      caption: "Languages I use to build and understand systems.",
      items: [
        { name: "C", level: "Familiar" },
        { name: "Python", level: "Learning" },
        { name: "JavaScript", level: "Practicing" },
      ],
    },
    {
      id: "web",
      title: "Web Development",
      icon: "globe",
      caption: "Front-end foundations and interface implementation.",
      items: [
        { name: "HTML5", level: "Practicing" },
        { name: "CSS3", level: "Practicing" },
        { name: "React", level: "Learning" },
        { name: "Tailwind CSS", level: "Learning" },
      ],
    },
    {
      id: "cybersecurity",
      title: "Cybersecurity",
      icon: "shield",
      caption: "Fundamentals I am building through study and practice.",
      items: [
        { name: "Networking Fundamentals", level: "Learning" },
        { name: "Linux Fundamentals", level: "Learning" },
        { name: "Ethical Hacking Fundamentals", level: "Learning" },
        { name: "Web Application Security Fundamentals", level: "Learning" },
        { name: "OWASP Top 10 Fundamentals", level: "Learning" },
      ],
    },
    {
      id: "tools",
      title: "Tools & Environment",
      icon: "wrench",
      caption: "The working environment behind the projects and labs.",
      items: [
        { name: "Git", level: "Familiar" },
        { name: "GitHub", level: "Familiar" },
        { name: "Parrot OS", level: "Learning" },
        { name: "VMware", level: "Familiar" },
        { name: "VS Code", level: "Practicing" },
      ],
    },
  ],

  projects: {
    featured: {
      id: "flarex",
      name: "FlareX",
      category: "Full-Stack Development / Security-Focused Platform",
      description:
        "FlareX is a FastAPI and React-based intelligence and dataset management platform designed for authentication, session management, user roles, search logging, and dataset exploration.",
      technologies: [
        "React",
        "Vite",
        "Tailwind CSS",
        "FastAPI",
        "PostgreSQL",
        "SQLAlchemy",
      ],
      features: [
        "Authentication and session management",
        "Role-based access control",
        "Dataset exploration",
        "Search logging",
        "Security-focused application architecture",
      ],
      visibility: "Private by default",
      status: "Private",
      /* Add only verified URLs. Empty values keep the buttons hidden. */
      github: "",
      liveDemo: "",
      note: "Source code, credentials, backups, environment variables, and internal endpoints are intentionally not published.",
    },
    future: [
      {
        id: "future-security-tool",
        name: "Security Tooling Project",
        category: "Planned build",
        description:
          "A reserved slot for a future security-focused utility. It will appear here only after it is built, reviewed, and documented.",
      },
      {
        id: "future-web-app",
        name: "Full-Stack Web Application",
        category: "Planned build",
        description:
          "A reserved slot for a future full-stack application with security considered from the design stage.",
      },
    ],
  },

  /**
   * Learning labs only. Nothing is marked "Completed" until it genuinely is.
   * Never add real client targets, sensitive findings, or unauthorized scans.
   */
  labs: {
    categories: [
      "Linux Practice",
      "Networking Labs",
      "Web Security Labs",
      "CTF Practice",
      "Authorized Vulnerability Assessment",
      "Security Writeups",
    ],
    entries: [
      {
        id: "linux-fundamentals",
        name: "Linux Command Line & Permissions Practice",
        category: "Linux Practice",
        status: "Learning",
        objective:
          "Build confidence with the Linux filesystem hierarchy, permissions, process control, and everyday command-line workflows.",
        tools: ["Parrot OS", "VMware", "Bash"],
        methodology: [
          "Practising navigation, file operations, permissions, ownership, and process management inside a local VM.",
          "Verifying command behaviour with man pages and official documentation.",
          "Keeping personal notes on commands, outcomes, and mistakes.",
        ],
        findings: "No formal findings — this is a practice and learning lab.",
        lessons:
          "Developing a stronger mental model of the Linux filesystem and permission model. Practice is ongoing.",
      },
      {
        id: "network-fundamentals",
        name: "Networking Fundamentals Lab",
        category: "Networking Labs",
        status: "Planned",
        objective:
          "Understand TCP/IP, the OSI model, common protocols, and safe traffic analysis on equipment I own.",
        tools: ["Wireshark (planned)", "ip / ifconfig", "Own home network"],
        methodology: [
          "Review networking theory before capturing any traffic.",
          "Analyse traffic only from a personal, isolated lab environment.",
          "Document protocol behaviour without publishing sensitive network details.",
        ],
        findings: "Not started — no capture or scan has been performed for this entry.",
        lessons:
          "Planned. This entry will be updated only after the lab has actually been carried out.",
      },
      {
        id: "owasp-study",
        name: "OWASP Top 10 Concept Study",
        category: "Web Security Labs",
        status: "Learning",
        objective:
          "Understand the OWASP Top 10 categories, why they matter, and how they are mitigated in modern web applications.",
        tools: ["OWASP documentation", "Browser DevTools"],
        methodology: [
          "Reading the official OWASP Top 10 documentation and mitigation guidance.",
          "Reviewing how each risk relates to authentication, session handling, input handling, and access control.",
          "Connecting concepts to defensive patterns used in full-stack development.",
        ],
        findings: "No findings — documentation study only; no live targets were tested.",
        lessons:
          "Building a structured understanding of common web application risk categories and defensive design.",
      },
      {
        id: "ctf-practice",
        name: "Beginner CTF Track",
        category: "CTF Practice",
        status: "Planned",
        objective:
          "Develop practical problem-solving skills through beginner-friendly, legal Capture the Flag challenges.",
        tools: ["Beginner CTF platforms (planned)"],
        methodology: [
          "Start with introductory challenges covering Linux, web basics, and encoding.",
          "Write short personal notes for each challenge attempted.",
          "Publish only sanitized writeups for retired or clearly permitted challenges.",
        ],
        findings: "Not started — no CTF completion is claimed.",
        lessons:
          "Planned. Results will be added only after challenges are completed.",
      },
      {
        id: "authorized-assessment",
        name: "Authorized Vulnerability Assessment",
        category: "Authorized Vulnerability Assessment",
        status: "Planned",
        objective:
          "Apply a structured assessment methodology against an intentionally vulnerable lab application with explicit authorization.",
        tools: ["Local vulnerable lab (planned)", "OWASP ZAP (planned)", "Burp Suite (planned)"],
        methodology: [
          "Obtain written permission or use a purpose-built local practice target.",
          "Define scope, rules of engagement, and a safe testing window.",
          "Test only in scope, record reproducible evidence, and report remediation guidance.",
        ],
        findings:
          "Not started. No third-party system has been assessed, and no client findings exist.",
        lessons:
          "Planned. Ethics and authorization are prerequisites, not optional steps.",
      },
      {
        id: "security-writeups",
        name: "Lab Notes & Security Writeups",
        category: "Security Writeups",
        status: "Planned",
        objective:
          "Document completed learning labs in a clear, sanitized, and reproducible format.",
        tools: ["Markdown", "Git"],
        methodology: [
          "Record objective, environment, and methodology for completed labs.",
          "Remove credentials, real host details, and sensitive findings before publishing.",
          "Focus writeups on lessons learned and defensive takeaways.",
        ],
        findings: "No writeups published yet.",
        lessons:
          "Planned. Writeups will reference only completed, authorized, and sanitized work.",
      },
    ],
  },

  resume: {
    note: "The PDF is intentionally not generated or fabricated. Upload the real resume to the configured path to enable the download.",
    sections: [
      "Education — BCA, currently pursuing",
      "Technical skills — honest, qualitative levels",
      "Project — FlareX, private build",
      "Certification — NIELIT O Level",
    ],
  },

  /**
   * Optional secure contact-form integration point.
   *
   * The component POSTs JSON to `contact.endpoint` when configured:
   *   { name, email, subject, message, website }
   * `website` is a honeypot field and must always be empty.
   *
   * Recommended: a serverless function that validates input server-side,
   * applies rate limiting, and sends mail through a transactional provider.
   * Never put API secrets in this frontend file.
   */
};

export const socialLinks = [
  {
    id: "github",
    label: "GitHub",
    href: portfolio.contact.github,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: portfolio.contact.linkedin,
  },
  {
    id: "email",
    label: "Email",
    href: portfolio.contact.email ? `mailto:${portfolio.contact.email}` : "",
  },
].filter((link) => link.href);
