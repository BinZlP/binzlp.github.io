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
  tags: string[];
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
  updated: "2026-11-06",
};

export const experience: PortfolioExperience[] = [
  {
    company: "Nota AI",
    role: "DevOps Engineer",
    period: "Oct 2025 - Present",
    description:
      "Hybrid GPU infrastructure, AI platforms, and customer deployment engineering.",
    bullets: [
      "Design and operate on-premises GPU clusters and cloud infrastructure, including resource allocation and capacity planning.",
      "Build inference platforms and KV-aware routing; jointly investigate and improve KV-cache offloading.",
      "Develop internal self-service and MCP platforms, and reusable deployment architectures for cloud, on-premises, and restricted customer environments.",
      "Implement observability, operational automation, and infrastructure controls supporting security and service reviews.",
    ],
  },
  {
    company: "goorm",
    role: "Infrastructure Engineer",
    period: "Feb 2023 - Oct 2025",
    description:
      "Production infrastructure for web IDE and code-judging services supporting thousands of concurrent code-execution workloads.",
    bullets: [
      "Designed and operated multi-region, multi-cloud service infrastructure and improved reliability and scalability.",
      "Standardized provisioning and customer delivery with Terraform, Ansible, and Python.",
      "Built centralized logging and observability across 10+ Kubernetes clusters in four regions.",
      "Implemented infrastructure designs reflecting CSAP and ISMS requirements, alongside CI/CD and operations tooling.",
    ],
  },
];

export const projects: PortfolioProject[] = [
  {
    id: "inference",
    title: "Token Factory: LLM inference platform and KV-cache optimization",
    company: "Nota AI",
    period: "Oct 2026 - Nov 2026",
    role: "Platform Engineer / Inference Systems Engineer",
    summary:
      "Platform engineering and KV-aware routing, with joint contributions to offloading diagnosis and optimization.",
    motivation: [
      "Establish a deployable inference platform that considers GPU cost efficiency, request routing, and cache reuse together.",
      "Select routing policies against actual model and engine support, then validate performance through load testing.",
    ],
    description: [
      "Compared llm-d and NVIDIA Dynamo architectures, model KV-event support, and measured policy behavior; selected llm-d and used approx-affinity in the evaluated configuration.",
      "Compared offloading options and jointly investigated LMCache runtime behavior. After NUMA-based instance separation reduced cache hit rate, traced a bottleneck to GIL contention in the GPU-transfer path.",
      "Co-developed changes to temporary GPU-buffer handling and repeated identity checks. Integrated a request-cancellation crash fix into a customized serving image.",
    ],
    achievements: [
      {
        title: "Measured optimization",
        text: "Validated improvements in patch comparisons and completed load testing on one DGX-B300 node.",
      },
      {
        title: "Contribution and scope",
        text: "Owned the platform and routing work; offloading changes were joint contributions. Kernel optimization, speculative decoding, and KV quantization belonged to other contributors. Multi-node performance was outside the measured scope.",
      },
    ],
    tags: ["vLLM", "llm-d", "LMCache", "KV-cache", "NUMA", "Python GIL"],
    links: [],
  },
  {
    id: "mcp-platform",
    title: "Internal app and document sharing platform with MCP",
    company: "Nota AI",
    period: "Oct 2026 - Present",
    role: "Service Architect / Full-Stack Developer",
    summary:
      "A shared access layer for coding agents to discover internal applications and retrieve authorized documents.",
    motivation: [
      "Make AI-assisted applications and documents reusable across the organization instead of leaving them in individual environments.",
      "Apply user permissions consistently to app invocation and document retrieval while keeping extraction and embeddings on internal infrastructure.",
    ],
    description: [
      "Implemented application publishing and execution, document sharing, and authenticated MCP tools for discovery, OpenAPI inspection, API calls, and retrieval.",
      "Extracted text locally from office documents, split it using document headings, and generated self-hosted BAAI/bge-m3 embeddings through TEI.",
      "Combined pgvector similarity and PostgreSQL keyword search with RRF. Integrated OpenFGA authorization, repeated permission checks, and application deployment lifecycle controls.",
    ],
    achievements: [
      {
        title: "Independent delivery",
        text: "Designed, implemented, and deployed the platform independently in two days in October 2026.",
      },
      {
        title: "Internal launch",
        text: "The platform is available internally, with wider adoption being prepared. Usage growth and productivity outcomes have not yet been established.",
      },
    ],
    tags: ["FastAPI", "MCP", "OpenFGA", "pgvector", "BAAI/bge-m3", "RRF"],
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
      "Designed the Kubernetes service and deployment architecture and coordinated customer delivery through early-access production operations.",
    motivation: [
      "Support different cloud and on-premises requirements through a common product architecture.",
      "Establish repeatable validation, packaging, and delivery processes across customer environments.",
    ],
    description: [
      "Designed the Kubernetes service structure and separated shared infrastructure from environment-specific configuration with Terraform, Helm, and Kustomize.",
      "Agreed validation and code-freeze checkpoints with developers, and coordinated requirements, acceptance criteria, and schedules directly with overseas customers.",
      "Proposed trace-ID logging, adopted by the development team, and built operational dashboards. Supported customer PoCs and technical reviews, then adapted observability and workload-specific instance types after launch.",
    ],
    achievements: [
      {
        title: "Customer delivery",
        text: "Delivered parallel AWS and on-premises projects on schedule. After code freeze, final validation and packaging could be completed within two days.",
      },
      {
        title: "Production operations",
        text: "The Arm deployment entered production early access as Arm AI Model Optimizer on October 19, 2026. Continued with security review and operational stabilization; this is distinct from the hosted-service AWS migration below.",
      },
    ],
    tags: ["Kubernetes", "Terraform", "Helm", "Kustomize", "Observability"],
    links: [
      {
        label: "Arm product announcement",
        href: "https://developer.arm.com/community/arm-community-blogs/b/ai-blog/posts/arm-ai-model-optimizer-agent-ready-tools-to-make-your-models-run-better-on-arm",
      },
    ],
  },
  {
    id: "aws-migration",
    title: "NetsPresso: AWS infrastructure migration and FTR",
    company: "Nota AI",
    period: "Jan 2026 - Feb 2026",
    role: "Infrastructure Architect / DevOps Engineer",
    summary:
      "Redesigned and migrated the existing hosted production service, separately from the Kubernetes customer-delivery architecture.",
    motivation: [
      "Improve the production infrastructure and operating policies against AWS Foundational Technical Review requirements.",
      "Plan a controlled transition to a reproducible environment with clear recovery and validation procedures.",
    ],
    description: [
      "Rebuilt development, staging, and production network separation, database clustering and snapshots, and AMI-based Auto Scaling using Terraform and Ansible.",
      "Used AWS DMS for test migrations and checked data consistency and application behavior before the production change.",
      "Planned the Route 53 cutover around source-database replication constraints and coordinated execution with developers. Shared the infrastructure code and an introductory technical session with the team.",
    ],
    achievements: [
      {
        title: "Production migration",
        text: "Completed the migration work in approximately two hours. This describes the change window, not a zero-downtime claim.",
      },
      {
        title: "Technical review",
        text: "The migrated service subsequently passed AWS FTR. The review result applies to the service, rather than a personal certification.",
      },
    ],
    tags: ["AWS", "Terraform", "Ansible", "DMS", "Auto Scaling"],
    links: [],
  },
  {
    id: "gateway",
    title: "EasyLLM: internal AI gateway and model-serving platform",
    company: "Nota AI",
    period: "May 2026 - Jul 2026",
    role: "Service Architect / Developer",
    summary:
      "An internal platform for model access, serving, benchmarking, and user-level budget management.",
    motivation: [
      "Provide a common interface to internal GPU resources, commercial APIs, and open-weight models.",
      "Support model comparison and restricted project environments without separate workflows for each runtime.",
    ],
    description: [
      "Designed a Python/FastAPI backend with Kubernetes, MLflow, and LiteLLM to standardize model access and serving.",
      "Automated Hugging Face model mirroring and deployment onto available GPU resources, supporting vLLM and llama.cpp.",
      "Automated serving and quality benchmarks. Connected coding agents and model APIs through one gateway, with user-level budgets and isolated serving paths where required.",
    ],
    achievements: [
      {
        title: "Adoption",
        text: "Used by 70+ internal users, with 20+ open-weight models served and eight in active operation at the reported snapshot.",
      },
      {
        title: "Developer workflows",
        text: "Enabled AI-assisted development in projects with data and network restrictions. Developers also built debugging automation using the internal models.",
      },
    ],
    tags: ["FastAPI", "LiteLLM", "MLflow", "vLLM", "llama.cpp"],
    links: [],
  },
  {
    id: "gpu",
    title: "On-premises GPU resource self-service platform",
    company: "Nota AI",
    period: "Feb 2026 - Present",
    role: "Service Architect / Infrastructure Architect / Developer",
    summary:
      "A FastAPI and Next.js control plane for GPU instance lifecycle, resource administration, and capacity planning.",
    motivation: [
      "Reduce routine provisioning and resource-management requests handled by the infrastructure team.",
      "Make team allocation, actual usage, and future capacity needs visible to developers and leadership.",
    ],
    description: [
      "Built self-service controls over Proxmox, team quotas, usage-based cost reporting, and routine infrastructure administration.",
      "Worked with leadership on monthly and quarterly planning requirements and implemented demand, capacity, and configurable risk views.",
      "Investigated VM degradation and node instability, tracing the cause to Ceph traffic saturation. Reconfigured data and management traffic paths to stabilize the cluster.",
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
    tags: ["FastAPI", "Next.js", "Proxmox", "Ceph", "Capacity planning"],
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
      "Provide remote deployment and health visibility across dozens of edge devices, reducing repeated on-site setup and inspection work.",
    ],
    description: [
      "Designed the operating environment and centralized metrics and log collection.",
      "Implemented deployment connectivity for constrained site networks and connected it with CI/CD workflows.",
      "Automated initial setup, service deployment, and system checks, and standardized delivery procedures.",
    ],
    achievements: [
      {
        title: "Delivery automation",
        text: "Reduced initial setup and deployment time by 70% in the recorded delivery workflow.",
      },
      {
        title: "Remote operations",
        text: "Established deployment and observability paths that reduced dependence on dispatching engineers to the site.",
      },
    ],
    tags: ["Linux", "Vector", "Loki", "Prometheus", "Grafana", "CI/CD"],
    links: [],
  },
  {
    id: "sunrise",
    title: "Sunrise: conversational infrastructure operations tool",
    company: "goorm",
    period: "May 2025 - Aug 2025",
    role: "Service Architect / Developer",
    summary:
      "An AWS Bedrock and Python agent for natural-language infrastructure inspection and operational tasks.",
    motivation: [
      "Provide a reusable tool for resource maintenance and internal support, with an explicit process for diagnosing and executing operational requests.",
    ],
    description: [
      "Modeled request classification, inspection, command generation and execution, and error analysis as a state machine.",
      "Separated AWS, Kubernetes, and Ansible domain agents so additional operational capabilities could be introduced independently.",
      "Built a Django interface and an error-feedback loop that analyzes command results and attempts corrected execution within the user's existing credentials.",
    ],
    achievements: [
      {
        title: "Operational use",
        text: "Supported natural-language inspection across thousands of cloud resources, including Kubernetes latency checks and configuration diagnostics.",
      },
      {
        title: "Team adoption",
        text: "Adopted as an internal operations support tool, with execution constrained to permissions granted by the existing access-control system.",
      },
    ],
    tags: ["AWS Bedrock", "Python", "Django", "State machines"],
    links: [],
  },
  {
    id: "multicluster-logging",
    title: "Kubernetes multi-cluster logging pipeline",
    company: "goorm",
    period: "Jan 2025 - Apr 2025",
    role: "Infrastructure Engineer",
    summary:
      "Centralized log collection and analysis across 10+ EKS clusters in four AWS regions.",
    motivation: [
      "Adapt log collection to Kubernetes scheduling and preserve incoming data when downstream processing or storage is unavailable.",
    ],
    description: [
      "Designed a Fluent Bit → Kafka → Fluentd → Elasticsearch/S3 pipeline, separating ingestion, processing, and storage.",
      "Used Kafka to buffer raw logs before processing and absorb differences in throughput between stages.",
      "Managed collection and processing configuration consistently across clusters with FluxCD.",
    ],
    achievements: [
      {
        title: "Failure tolerance",
        text: "Buffered raw logs through processor failures and maintained a storage path through S3 when Elasticsearch was unavailable.",
      },
      {
        title: "Scalability",
        text: "Designed Fluentd processing to scale with Kafka message volume, independently of collection.",
      },
    ],
    tags: ["EKS", "Kafka", "Fluent Bit", "Fluentd", "Elasticsearch", "S3"],
    links: [],
  },
  {
    id: "ci-optimization",
    title: "CI build-system optimization",
    company: "goorm",
    period: "Jun 2024 - Oct 2024",
    role: "DevOps Engineer",
    summary:
      "Container-image and build-pipeline improvements for growing Node.js monorepos.",
    motivation: [
      "Reduce build delays, image transfer overhead, and duplicated pipeline logic as the application codebase grew.",
    ],
    description: [
      "Reworked container layers and dependencies, retaining only the data needed by the running service.",
      "Implemented remote reuse of Webpack, Babel, and Turbo caches and compared build-agent configurations for cost and throughput.",
      "Moved reusable Node.js image-build logic into Jenkins Shared Libraries and separately improved the deployment pipeline.",
    ],
    achievements: [
      {
        title: "Build performance",
        text: "Reduced image size from over 23 GB to 5 GB. Application build time decreased by about 60% on average and up to 90%; total pipeline time decreased by up to 80% in measured workloads.",
      },
      {
        title: "Release operations",
        text: "Shared Libraries standardized builds. The separate deployment improvement shortened rollback response from about 30 minutes to five minutes.",
      },
    ],
    tags: ["Jenkins", "Docker", "EFS", "Node.js", "Build caching"],
    links: [],
  },
  {
    id: "operations-cli",
    title: "Infrastructure configuration and validation CLI",
    company: "goorm",
    period: "Mar 2024 - Jun 2024",
    role: "Developer",
    summary:
      "A Python CLI combining large-scale provisioning, configuration, and readiness validation.",
    motivation: [
      "Accelerate resource preparation on Naver Cloud and verify the actual infrastructure and application configuration before high-concurrency events.",
    ],
    description: [
      "Implemented parallel scale-out using the cloud API, complementing the existing Terraform workflow.",
      "Combined operations on hundreds of resources with host configuration, command execution, and state checks.",
      "Compared backend registrations and running application settings against each event's expected configuration, beyond basic functional tests.",
    ],
    achievements: [
      {
        title: "Preparation time",
        text: "Shortened the operational preparation period by one week through automated scale-out and repeated configuration.",
      },
      {
        title: "Readiness validation",
        text: "Established repeatable checks for infrastructure topology and host-level application settings before live events.",
      },
    ],
    tags: ["Python", "Ansible", "Naver Cloud", "Validation"],
    links: [],
  },
  {
    id: "code-judging",
    title: "Kubernetes-based highly available code-judging system",
    company: "goorm",
    period: "Jan 2024 - May 2024",
    role: "Service Architect / DevOps Engineer / Backend Developer",
    summary:
      "A Kubernetes architecture and prototype for reliable, resource-controlled code execution.",
    motivation: [
      "Evaluate execution isolation, storage availability, workload spikes, and operating costs together when redesigning the judging platform.",
    ],
    description: [
      "Compared retaining the VM execution path with introducing Kubernetes, considering code reuse, storage operations, resource limits, and team adoption.",
      "Designed a tiered-storage gateway with backend failover and health checks, and replaced direct socket coordination with Kafka events for replay and execution tracking.",
      "Implemented a Nest.js allocation and judging API and designed dynamic scaling using CPU, pending pods, and consumer lag. Presented the architecture to leadership and built the prototype.",
    ],
    achievements: [
      {
        title: "Architecture",
        text: "Addressed execution resource control, storage recovery, and workload-driven scaling in a combined design.",
      },
      {
        title: "Subsequent product use",
        text: "The architecture prototyped during my tenure was later incorporated into the product; the initial contribution was design and prototype implementation.",
      },
    ],
    tags: ["Kubernetes", "Kafka", "Nest.js", "Redis", "Tiered storage"],
    links: [],
  },
  {
    id: "container-security",
    title: "Container isolation and runtime security",
    company: "goorm",
    period: "Oct 2023 - Nov 2023",
    role: "Infrastructure Engineer / Developer",
    summary:
      "Reduced runtime privilege boundaries for user-code execution and updated the supporting application paths.",
    motivation: [
      "Limit the host privileges available to untrusted code while preserving the required execution and networking behavior.",
    ],
    description: [
      "Configured and validated containers running under a user-level daemon.",
      "Updated application networking to communicate with virtual interfaces inside the runtime namespace.",
      "Migrated the container filesystem from AUFS to Overlay2 and adapted execution logic to the changed behavior.",
    ],
    achievements: [
      {
        title: "Runtime integration",
        text: "Validated the privilege-reduced execution path and filesystem transition with the surrounding application logic.",
      },
    ],
    tags: ["Docker", "Node.js", "Namespaces", "Overlay2"],
    links: [],
  },
  {
    id: "infrastructure-as-code",
    title: "Service provisioning with infrastructure as code",
    company: "goorm",
    period: "May 2023 - Dec 2023",
    role: "Infrastructure Engineer",
    summary:
      "Terraform and Terragrunt adoption for repeatable service infrastructure.",
    motivation: [
      "Reduce repeated setup work for customer installations and periodic environment rebuilds.",
    ],
    description: [
      "Implemented service infrastructure as code across AWS and Naver Cloud Platform environments.",
    ],
    achievements: [
      {
        title: "Provisioning effort",
        text: "Reduced the required setup period from approximately one month to one week for the documented installation and rebuilding workflows.",
      },
    ],
    tags: ["Terraform", "Terragrunt", "AWS", "Naver Cloud"],
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
      "Created image-build scripts and Compose definitions for running services.",
      "Developed a container scale-out tool with CPU affinity configured for server capacity.",
      "Updated CI/CD workflows for container-based operations and rollback handling.",
    ],
    achievements: [
      {
        title: "Operational integration",
        text: "Applied container build and scaling tools to service operations. Related rollback work is described with the CI and deployment improvements above.",
      },
    ],
    tags: ["Docker", "Compose", "CI/CD", "CPU affinity"],
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
      "Presented the on-premises GPU self-service platform from a five-day PoC to internal production. Discussed using Claude Code and Codex with design documents, test-driven development, and continuous validation of agent output.",
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
      "MLflow, LiteLLM, AWS Bedrock, Hugging Face",
      "vLLM, llama.cpp, llm-d, LMCache",
      "KV-aware routing, offloading, inference load testing",
      "MCP, OpenFGA, BAAI/bge-m3, TEI, pgvector, RRF",
      "Claude Code, Codex; BM25 and dense retrieval",
      "Evaluation experience with NVIDIA Dynamo and Mooncake",
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
