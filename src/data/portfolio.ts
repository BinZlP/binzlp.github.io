export type PortfolioLink = { label: string; href: string };
export type PortfolioProfile = {
  name: string;
  role: string;
  intro: string;
  email: string;
  github: string;
  linkedin: string;
  updated: string;
};
export type PortfolioProject = {
  id: string;
  title: string;
  company: string;
  period: string;
  role: string;
  summary: string;
  motivation: string[];
  description: string[];
  achievements: { title: string; text: string }[];
  links: PortfolioLink[];
  image?: {
    src: string;
    alt: string;
    caption: string;
    width: number;
    height: number;
  };
};
export type PortfolioExperience = {
  company: string;
  role: string;
  period: string;
  description: string;
  bullets?: string[];
};
export type PortfolioPublication = {
  title: string;
  meta: string;
  description: string;
  links: PortfolioLink[];
};
export type PortfolioEducation = {
  degree: string;
  school: string;
  period: string;
};

export const profile: PortfolioProfile = {
  name: "Hyungseok Han",
  role: "AI Infrastructure & Platform Engineer",
  intro:
    "I am a DevOps engineer with a background in distributed systems and operating systems research. I design and implement LLM inference infrastructure, developer platforms, and customer deployment architectures across cloud and on-premises environments.",
  email: "dfafqfdaes159@gmail.com",
  github: "https://github.com/BinZlP",
  linkedin: "https://www.linkedin.com/in/hyungseok-han-aba694196/",
  updated: "2026-11-18",
};

export const experience: PortfolioExperience[] = [
  {
    company: "Nota AI",
    role: "DevOps Engineer",
    period: "Oct 2025 - Present",
    description:
      "Hybrid GPU infrastructure, AI platforms, and customer deployment engineering.",
    bullets: [
      "Design and operate GPU and cloud infrastructure, and support capacity planning for AI workloads.",
      "Build inference platforms and jointly investigate and improve system performance.",
      "Develop self-service and agent-enabled platforms, and adapt service deployments to customer requirements.",
      "Improve observability, operational automation, and readiness for technical and security reviews.",
    ],
  },
  {
    company: "goorm",
    role: "Infrastructure Engineer",
    period: "Feb 2023 - Oct 2025",
    description:
      "Production infrastructure for web IDE and code-judging services supporting thousands of concurrent code-execution workloads.",
    bullets: [
      "Designed and operated production service infrastructure and improved reliability and scalability.",
      "Automated provisioning and standardized customer delivery.",
      "Built centralized logging and observability for distributed production environments.",
      "Supported service security requirements and developed build, release, and operations tooling.",
    ],
  },
];

export const projects: PortfolioProject[] = [
  {
    id: "inference",
    title: "Token Factory: LLM inference platform optimization",
    company: "Nota AI",
    period: "Oct 2026 - Nov 2026",
    role: "Platform Engineer / Inference Systems Engineer",
    summary:
      "Built the foundation for serving multiple language models and worked with the inference team to improve throughput and reliability.",
    motivation: [
      "Different models placed different demands on the serving platform. We needed to understand how those differences affected performance and cost.",
    ],
    description: [
      "Designed the serving platform and its request-routing layer. Compared how candidate designs performed on the workloads they needed to support.",
      "Worked with teammates to trace a throughput bottleneck and load-tested the changes against the original behavior.",
    ],
    achievements: [
      {
        title: "Throughput",
        text: "Helped identify and remove repeated work from the serving path, improving throughput in load tests.",
      },
      {
        title: "Reliability",
        text: "Integrated a fix that let the service keep running when a client canceled a request.",
      },
    ],
    links: [],
  },
  {
    id: "app-document-sharing",
    title: "Internal application and document sharing platform",
    company: "Nota AI",
    period: "Oct 2026 - Present",
    role: "Service Architect / Full-Stack Developer",
    summary:
      "Built a shared catalog where coding agents can find a colleague’s app, use it, or look up an answer in team documents.",
    motivation: [
      "Useful apps and documents often stayed in their creators’ workspaces. Colleagues needed a way to find and reuse them.",
    ],
    description: [
      "Created the publishing flow for app authors and a way for agents to discover what each app does and invoke it.",
      "Connected document upload, indexing, and search so agents can retrieve relevant passages from shared material.",
    ],
    achievements: [
      {
        title: "Independent delivery",
        text: "Designed, implemented, and deployed the platform independently in two days in October 2026.",
      },
    ],
    links: [],
  },
  {
    id: "delivery",
    title:
      "NetsPresso / Arm AI Model Optimizer: architecture, delivery, and operations",
    company: "Nota AI",
    period: "Jun 2026 - Present",
    role: "Service Architect / DevOps Engineer",
    summary:
      "Designed the service and deployment architecture and coordinated customer delivery through early-access production operations.",
    motivation: [
      "Adapt a common product to different customer deployment requirements.",
      "Establish repeatable validation, packaging, and delivery processes across customer environments.",
    ],
    description: [
      "Designed the service deployment architecture and standardized preparation across customer environments.",
      "Coordinated requirements, acceptance criteria, and schedules directly with overseas customers and the development team.",
      "Improved operational visibility, supported customer evaluations and technical reviews, and continued service stabilization after launch.",
    ],
    achievements: [
      {
        title: "Customer delivery",
        text: "Delivered parallel customer projects on schedule and reduced final validation and packaging to a process that could be completed within two days.",
      },
      {
        title: "Production operations",
        text: "The delivered system entered production early access as Arm AI Model Optimizer on October 19, 2026. Continued with security review and operational stabilization.",
      },
    ],
    links: [
      {
        label: "Arm product announcement",
        href: "https://developer.arm.com/community/arm-community-blogs/b/ai-blog/posts/arm-ai-model-optimizer-agent-ready-tools-to-make-your-models-run-better-on-arm",
      },
    ],
  },
  {
    id: "service-migration",
    title: "NetsPresso: production infrastructure migration",
    company: "Nota AI",
    period: "Jan 2026 - Feb 2026",
    role: "Infrastructure Architect / DevOps Engineer",
    summary:
      "Redesigned and migrated the existing hosted production service in a separate project from customer delivery.",
    motivation: [
      "Improve production infrastructure readiness for a cloud-provider technical review.",
      "Plan and validate the transition of an operating service to a redesigned environment.",
    ],
    description: [
      "Redesigned the service infrastructure and automated its setup.",
      "Tested the migration and verified data consistency and application behavior before the production change.",
      "Coordinated the transition with developers and shared the redesigned environment through documentation and a technical session.",
    ],
    achievements: [
      {
        title: "Production migration",
        text: "Completed the production migration work within an approximately two-hour change window.",
      },
      {
        title: "Technical review",
        text: "The migrated service subsequently passed the cloud provider's technical review.",
      },
    ],
    links: [],
  },
  {
    id: "gateway",
    title: "EasyLLM: internal AI gateway and model-serving platform",
    company: "Nota AI",
    period: "May 2026 - Jul 2026",
    role: "Service Architect / Developer",
    summary:
      "An internal platform for model access, serving, and evaluation.",
    motivation: [
      "Give developers a consistent way to access and compare models.",
      "Reduce repeated model setup work and support a wider range of development workflows.",
    ],
    description: [
      "Designed and implemented the platform's backend and model access workflows.",
      "Automated model preparation, deployment, and evaluation tasks.",
      "Connected model access with coding-agent workflows and developed features for managing platform use.",
    ],
    achievements: [
      {
        title: "Adoption",
        text: "At least 70 colleagues used the platform to access and compare models.",
      },
      {
        title: "Developer workflows",
        text: "Supported AI-assisted development across internal projects. Developers also built debugging automation using the available models.",
      },
    ],
    links: [],
  },
  {
    id: "gpu",
    title: "On-premises GPU resource self-service platform",
    company: "Nota AI",
    period: "Feb 2026 - Present",
    role: "Service Architect / Infrastructure Architect / Developer",
    summary:
      "A self-service platform for GPU resources, routine administration, and capacity planning.",
    motivation: [
      "Reduce routine provisioning and resource-management requests handled by the infrastructure team.",
      "Make team allocation, actual usage, and future capacity needs visible to developers and leadership.",
    ],
    description: [
      "Designed and implemented resource management and routine administration features for developers.",
      "Worked with leadership to translate capacity-planning requirements into resource visibility and reporting features.",
      "Diagnosed performance issues affecting developers’ workspaces and improved service stability.",
    ],
    achievements: [
      {
        title: "Internal production",
        text: "Built a five-day PoC and moved to internal production within about a month, using coding agents with design documents and validation throughout implementation.",
      },
      {
        title: "Operational change",
        text: "Recorded three consecutive weeks without system-level support requests, excluding hardware failures. Planning data informed capacity expansion decisions.",
      },
    ],
    links: [],
  },
  {
    id: "edge-operations",
    title: "Intelligent transportation system deployment and operations",
    company: "Nota AI",
    period: "Jan 2026 - Feb 2026",
    role: "DevOps Engineer / Infrastructure Architect",
    summary:
      "Deployment automation and observability for services running on edge devices at overseas industrial sites.",
    motivation: [
      "Support remote deployment and health visibility while reducing repeated on-site setup and inspection work.",
    ],
    description: [
      "Designed the operating environment and tools for service health monitoring.",
      "Developed deployment workflows suited to the delivery environment.",
      "Automated initial setup, service deployment, and system checks, and standardized delivery procedures.",
    ],
    achievements: [
      {
        title: "Delivery automation",
        text: "Reduced initial setup and deployment time by 70% in the recorded delivery workflow.",
      },
      {
        title: "Remote operations",
        text: "Enabled remote deployment and operational checks, reducing dependence on dispatching engineers to the site.",
      },
    ],
    links: [],
  },
  {
    id: "sunrise",
    title: "Sunrise: conversational infrastructure operations tool",
    company: "goorm",
    period: "May 2025 - Aug 2025",
    role: "Service Architect / Developer",
    summary:
      "An agent for natural-language infrastructure inspection and operational tasks.",
    motivation: [
      "Provide a reusable tool for resource maintenance and internal support, with an explicit process for diagnosing and executing operational requests.",
    ],
    description: [
      "Designed and implemented workflows for interpreting operational requests, inspecting service state, and performing routine tasks.",
      "Made the tool extensible to additional infrastructure operations.",
      "Built the user interface and integrated error handling and access checks into the operational workflow.",
    ],
    achievements: [
      {
        title: "Operational use",
        text: "Operators could ask about service latency and diagnose configuration problems through the same interface.",
      },
      {
        title: "Team adoption",
        text: "Adopted as an internal operations support tool.",
      },
    ],
    links: [],
  },
  {
    id: "multicluster-logging",
    title: "Kubernetes multi-cluster logging pipeline",
    company: "goorm",
    period: "Jan 2025 - Apr 2025",
    role: "DevOps",
    summary:
      "Centralized log collection and analysis for a multi-cluster production environment.",
    motivation: [
      "Make logs accessible across clusters and improve collection reliability during operational failures.",
    ],
    description: [
      "Designed and implemented a centralized logging pipeline for distributed service operations.",
      "Improved how the system handles changes in log volume and interruptions in processing.",
      "Standardized log collection and processing across clusters.",
    ],
    achievements: [
      {
        title: "Failure tolerance",
        text: "Improved log retention and continuity when processing or storage components were unavailable.",
      },
      {
        title: "Scalability",
        text: "Designed the logging system to accommodate changes in workload volume.",
      },
    ],
    links: [],
  },
  {
    id: "ci-optimization",
    title: "CI build-system optimization",
    company: "goorm",
    period: "Jun 2024 - Oct 2024",
    role: "DevOps Engineer",
    summary:
      "Container-image and build-pipeline improvements for a growing application codebase.",
    motivation: [
      "Reduce build delays, image transfer overhead, and duplicated pipeline logic as the application codebase grew.",
    ],
    description: [
      "Analyzed image size and build performance, then reduced unnecessary work and deployment overhead.",
      "Improved build reuse and evaluated performance against operating cost.",
      "Standardized reusable build workflows and separately improved deployment operations.",
    ],
    achievements: [
      {
        title: "Build performance",
        text: "Reduced image size from over 23 GB to 5 GB. Application build time decreased by about 60% on average and up to 90%; total pipeline time decreased by up to 80% in measured workloads.",
      },
      {
        title: "Release operations",
        text: "Standardized build workflows. The separate deployment improvement shortened rollback response from about 30 minutes to five minutes.",
      },
    ],
    links: [],
  },
  {
    id: "operations-cli",
    title: "Infrastructure configuration and validation CLI",
    company: "goorm",
    period: "Mar 2024 - Jun 2024",
    role: "Developer",
    summary:
      "A CLI combining large-scale provisioning, configuration, and readiness validation.",
    motivation: [
      "Accelerate resource preparation and verify operational readiness before high-concurrency events.",
    ],
    description: [
      "Automated resource preparation and repeated setup tasks.",
      "Combined provisioning, configuration, and state checks into a consistent operator workflow.",
      "Added readiness checks that compare the running environment with the requirements of each event.",
    ],
    achievements: [
      {
        title: "Preparation time",
        text: "Shortened the operational preparation period by one week through automation.",
      },
      {
        title: "Readiness validation",
        text: "Established repeatable operational readiness checks before live events.",
      },
    ],
    links: [],
  },
  {
    id: "code-judging",
    title: "Highly available code-judging system",
    company: "goorm",
    period: "Jan 2024 - May 2024",
    role: "Service Architect / DevOps Engineer / Backend Developer",
    summary:
      "An architecture and prototype for reliable, resource-controlled code execution.",
    motivation: [
      "Evaluate execution isolation, storage availability, workload spikes, and operating costs together when redesigning the judging platform.",
    ],
    description: [
      "Compared architecture options against reliability, scalability, code reuse, and operational requirements.",
      "Designed a prototype addressing execution isolation, failure handling, and operational visibility.",
      "Presented the proposed architecture to leadership and implemented the prototype's resource allocation and code-judging workflows.",
    ],
    achievements: [
      {
        title: "Architecture",
        text: "Addressed execution reliability and capacity requirements in a combined design.",
      },
      {
        title: "Subsequent product use",
        text: "The team later incorporated the architecture I prototyped into the product.",
      },
    ],
    links: [],
  },
  {
    id: "container-security",
    title: "Container isolation and runtime security",
    company: "goorm",
    period: "Oct 2023 - Nov 2023",
    role: "Infrastructure Engineer / Developer",
    summary:
      "Improved isolation for user-code execution while preserving application compatibility.",
    motivation: [
      "Limit the host privileges available to untrusted code while preserving the required execution and networking behavior.",
    ],
    description: [
      "Reviewed execution isolation requirements and implemented runtime improvements.",
      "Updated the surrounding application to support the runtime changes.",
      "Validated execution behavior and compatibility through the transition.",
    ],
    achievements: [
      {
        title: "Runtime integration",
        text: "Integrated and validated runtime security improvements with the surrounding application.",
      },
    ],
    links: [],
  },
  {
    id: "infrastructure-as-code",
    title: "Service provisioning with infrastructure as code",
    company: "goorm",
    period: "May 2023 - Dec 2023",
    role: "Infrastructure Engineer",
    summary:
      "Repeatable service infrastructure through infrastructure as code.",
    motivation: [
      "Reduce repeated setup work for customer installations and periodic environment rebuilds.",
    ],
    description: [
      "Implemented reusable infrastructure definitions for service setup and customer installations.",
    ],
    achievements: [
      {
        title: "Provisioning effort",
        text: "Reduced the required setup period from approximately one month to one week for the documented installation and rebuilding workflows.",
      },
    ],
    links: [],
  },
  {
    id: "containerization",
    title: "Service application containerization",
    company: "goorm",
    period: "May 2023 - Oct 2023",
    role: "Infrastructure Engineer",
    summary:
      "Container build, deployment, and scaling workflows for existing services.",
    motivation: [
      "Move service operations toward repeatable container-based builds and deployment.",
    ],
    description: [
      "Created repeatable container build and deployment workflows for running services.",
      "Developed tooling to support container operations and service capacity.",
      "Updated CI/CD workflows for container-based operations and rollback handling.",
    ],
    achievements: [
      {
        title: "Operational integration",
        text: "Teams could build, deploy, and scale their services through a repeatable workflow.",
      },
    ],
    links: [],
  },
];

export const earlierProjects: {
  title: string;
  period: string;
  description: string;
}[] = [
  {
    title: "F2FS metadata updates on ZNS with a skiplist key-value store",
    period: "Sep 2021 - Dec 2021",
    description:
      "Developed the kernel module for skiplist management, supporting out-of-place NAT metadata updates and sequential zone flushing in an F2FS research project.",
  },
  {
    title: "Braille navigation service",
    period: "Sep 2021 - Dec 2021",
    description:
      "Designed the service architecture and route-to-braille APIs using map data. Built a Raspberry Pi and LED-display prototype for spatial route information and navigation instructions.",
  },
  {
    title: "Bluetooth beacon smart-gate platform",
    period: "Mar 2020 - Jun 2020",
    description:
      "Built a Raspberry Pi gate and Firebase backend, connecting beacon proximity, payment, and GPIO-driven gate control. Received an encouragement award at the university project exhibition.",
  },
  {
    title: "Real-time home yoga assistant",
    period: "May 2019 - Nov 2019",
    description:
      "Led a SW Maestro team, designed the architecture and backend, prepared training data, and trained a triplet-loss model for posture guidance. Managed project schedules, costs, and documentation.",
  },
  {
    title: "Bluetooth smart door lock",
    period: "Jul 2019 - Oct 2019",
    description:
      "Built a Raspberry Pi GPIO motor-control API and Bluetooth communication with an Android application. Received an encouragement award at the software department's graduation-project exhibition.",
  },
  {
    title: "Popular travel destination service",
    period: "Aug 2018 - Nov 2018",
    description:
      "Built a Python/Selenium hashtag-data crawler, designed its storage schema, and implemented parts of the website and chat interface. Placed third at the KW Hackathon.",
  },
  {
    title: "Online programming contest platform",
    period: "Aug 2018 - Nov 2018",
    description:
      "Implemented socket-based worker coordination and queued load distribution on AWS EC2 and MySQL. Used for a SW Championship algorithm session with approximately 100 concurrent participants.",
  },
];

export const presentations: PortfolioPublication[] = [
  {
    title: "Build with AI Seoul 2026 with Google DeepMind",
    meta: "Invited speaker · May 2026",
    description:
      "Presented the on-premises GPU self-service platform from a five-day PoC to internal production. Discussed AI-assisted development, design documentation, testing, and validation of generated work.",
    links: [],
  },
];

export const writings: PortfolioPublication[] = [
  {
    title: "Persistent Context Management & Retrieval for LLM Agents",
    meta: "Independent research · Manuscript under review · 2026",
    description:
      "Designed an ARC-inspired context manager and Python MCP server to maintain a document-level evidence set within a token budget. Compared managed context with BM25 and dense-retrieval baselines, focusing on reproducible token, cache, and cost accounting. Conclusions are limited to the observed workloads.",
    links: [],
  },
  {
    title: "ScaleOPT: A Scalable Optimal Page Replacement Policy Simulator",
    meta: "First author · ACM SIGMETRICS 2025",
    description:
      "Introduced AccessMap and Pipelined-Tree to parallelize preprocessing and pipeline optimal page-replacement simulation. Evaluations on a 72-thread system showed up to approximately 6× speedup over the existing baseline and 20× over an open-source simulator.",
    links: [
      { label: "Full paper", href: "https://dl.acm.org/doi/10.1145/3700426" },
      {
        label: "Conference abstract",
        href: "https://dl.acm.org/doi/10.1145/3726854.3727316",
      },
    ],
  },
  {
    title: "Improving optimal page replacement for multicore systems",
    meta: "First author · KCC 2022 · Best Paper Award",
    description:
      "Investigated preprocessing scalability in optimal page-replacement simulation and introduced a data structure that improved the relevant operation's complexity. Received the KCC 2022 Best Paper Award from the Korean Institute of Information Scientists and Engineers.",
    links: [
      {
        label: "Paper",
        href: "https://www.dbpia.co.kr/journal/articleDetail?nodeId=NODE11113215",
      },
    ],
  },
  {
    title:
      "Attentive Multi-Task Prediction of Atmospheric Particulate Matter: Effect of the COVID-19 Pandemic",
    meta: "Co-author · IEEE Access",
    description:
      "Contributed to ideation, data preprocessing, and visualization for multi-task learning research on particulate-matter prediction across major cities in South Korea.",
    links: [
      {
        label: "Paper",
        href: "https://ieeexplore.ieee.org/abstract/document/9684856",
      },
    ],
  },
];

export const activities: { title: string; description: string }[] = [
  {
    title: "SW Maestro",
    description:
      "10th cohort, May-Dec 2019. Led the home yoga assistant project, including service architecture, backend development, infrastructure, and project coordination.",
  },
  {
    title: "Teaching and mentoring",
    description:
      "Cloud engineering mentor for goormthon in Jeju, cohorts 11 and 12 (2024). Taught computing and C programming at Kyungshin High School; served as a systems programming TA at Seoul National University and a software-school TA at Kwangwoon University.",
  },
  {
    title: "Community and knowledge sharing",
    description:
      "Organized KSCON and inter-university SW Championship events, contributing direction, technical operations, and programming problems. Presented Sunrise in goorm's internal STRIDE seminar series.",
  },
  {
    title: "Student leadership",
    description:
      "Chair of Kwangwoon University's student emergency committee in the first half of 2020; College of Software and Convergence student president in 2019; Software Department student vice-president in 2018.",
  },
];

export const skills: { title: string; items: string[] }[] = [
  {
    title: "Systems & infrastructure",
    items: [
      "Linux; Kubernetes, Docker, containerd",
      "KVM, Proxmox VE, Ceph, cluster networking",
      "AWS, GCP, Naver Cloud Platform",
      "Terraform, Terragrunt, Helm, Kustomize",
    ],
  },
  {
    title: "Databases & messaging",
    items: [
      "MySQL / MariaDB, PostgreSQL, MongoDB",
      "Redis, memcached, Kafka, RabbitMQ",
    ],
  },
  {
    title: "CI/CD",
    items: ["Jenkins, GitHub Actions", "Ansible, AWX, ArgoCD, FluxCD"],
  },
  {
    title: "Application development",
    items: [
      "FastAPI, Django, Flask",
      "Nest.js, Next.js, Express.js",
      "Parallel programming and performance profiling",
    ],
  },
  {
    title: "AI platforms & agents",
    items: [
      "LLM serving and benchmarking",
      "Request routing, cache management, and performance analysis",
      "Agent integration, tool interfaces, and access control",
      "Sparse and dense retrieval, context management",
      "AI-assisted development and evaluation",
    ],
  },
  {
    title: "Observability",
    items: [
      "Elasticsearch / OpenSearch, Logstash, Kibana",
      "Fluentd, Fluent Bit, Vector, Loki, Alloy",
      "Zabbix, Prometheus, Grafana",
    ],
  },
  {
    title: "Languages & data tools",
    items: [
      "Python, TypeScript / JavaScript, C / C++, Go",
      "Java / Kotlin, shell scripting",
      "Jupyter Notebook, RStudio",
    ],
  },
  {
    title: "Collaboration",
    items: [
      "Git, Jira / Confluence, Notion, ClickUp, Slack",
      "Korean (native), English (business-level fluency)",
    ],
  },
];

export const education: PortfolioEducation[] = [
  {
    degree: "M.S. in Computer Science and Engineering",
    school: "Seoul National University",
    period: "Mar 2021 - Feb 2023",
  },
  {
    degree: "B.S. in Software",
    school: "Kwangwoon University",
    period: "Mar 2017 - Feb 2021",
  },
];

export const awards: { year: string; title: string }[] = [
  {
    year: "2022",
    title:
      "KCC Best Paper Award, Korean Institute of Information Scientists and Engineers",
  },
  {
    year: "2021",
    title: "Meritorious Service Award, President of Kwangwoon University",
  },
  {
    year: "2020",
    title:
      "Dean's List and encouragement award at the project exhibition, Kwangwoon University",
  },
  {
    year: "2019",
    title:
      "Graduation-project exhibition encouragement award, Kwangwoon University",
  },
  {
    year: "2018",
    title:
      "Third place, KW Hackathon; KWEF creative software competition encouragement award",
  },
  {
    year: "2017-2020",
    title:
      "Dean's List, software excellence, academic merit, and service scholarships, Kwangwoon University",
  },
  {
    year: "2019-2020",
    title:
      "National Science and Engineering Scholarship, Korea Student Aid Foundation",
  },
];
