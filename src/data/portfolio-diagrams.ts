import type { PortfolioProject } from "./portfolio";

type Diagram = NonNullable<PortfolioProject["image"]>;

export const projectDiagrams: Record<string, Diagram> = {
  inference: {
    src: "/portfolio/diagrams/inference-architecture.svg",
    width: 1120,
    height: 760,
    alt: "Requests move from intake through work assignment to model execution. Responses return to the caller, while load testing measures serving performance.",
    caption: "Token Factory · Serving and performance evaluation",
  },
  "app-document-sharing": {
    src: "/portfolio/diagrams/app-document-sharing.svg",
    width: 1120,
    height: 760,
    alt: "Agents discover OpenAPI apps and search documents through an MCP interface. OpenFGA checks access, and hybrid search combines vector and keyword matches.",
    caption: "App and document sharing · Publishing and discovery",
  },
  delivery: {
    src: "/portfolio/diagrams/netspresso-architecture.svg",
    width: 960,
    height: 650,
    alt: "NetsPresso service architecture showing application services, task queues, optimization workers, and observability components.",
    caption: "NetsPresso service and deployment architecture.",
  },
  gpu: {
    src: "/portfolio/diagrams/gpu-self-service-architecture.svg",
    width: 960,
    height: 650,
    alt: "Next.js and FastAPI manage GPU instances on Proxmox. The diagram shows how usage data flows back from headquarters and the data center.",
    caption: "GPU provisioning and usage reporting at headquarters and the data center (example deployment).",
  },
  gateway: {
    src: "/portfolio/diagrams/easyllm-architecture.svg",
    width: 960,
    height: 620,
    alt: "EasyLLM integrates model management, MLflow, inference runtimes, object storage, and the LiteLLM gateway.",
    caption: "EasyLLM model management, serving, and gateway architecture.",
  },
  "edge-operations": {
    src: "/portfolio/diagrams/intelligent-transportation.svg",
    width: 1120,
    height: 720,
    alt: "CI/CD deploys services to Linux edge devices. Vector collects logs, Loki and Prometheus handle telemetry, and Grafana displays service health.",
    caption: "Intelligent transportation · Field deployment and health monitoring",
  },
  sunrise: {
    src: "/portfolio/diagrams/sunrise-architecture.svg",
    width: 960,
    height: 700,
    alt: "Sunrise agent manager connects command processors, credential management, Amazon Bedrock, and infrastructure APIs.",
    caption: "Sunrise infrastructure agent architecture.",
  },
  "multicluster-logging": {
    src: "/portfolio/diagrams/multicluster-logging.svg",
    width: 960,
    height: 560,
    alt: "Logs pass from Fluent Bit through Kafka and Fluentd to Elasticsearch and S3, with Flux managing configuration.",
    caption: "Centralized logging across Kubernetes clusters.",
  },
  "ci-optimization": {
    src: "/portfolio/diagrams/ci-build-system.svg",
    width: 960,
    height: 640,
    alt: "Jenkins shared libraries and autoscaling agents build images with EFS caches, push to ECR, and deploy.",
    caption: "Build pipeline and cache reuse.",
  },
  "code-judging": {
    src: "/portfolio/diagrams/code-judging.svg",
    width: 960,
    height: 700,
    alt: "Kubernetes code execution system with Kafka messaging, KEDA and Karpenter scaling, and tiered storage.",
    caption: "Code judging system architecture.",
  },
};

export const researchDiagrams: Diagram[] = [
  {
    src: "/portfolio/diagrams/scaleopt-access-map.png",
    width: 886,
    height: 154,
    alt: "AccessMap parallel initialization and page access lookup.",
    caption: "AccessMap",
  },
  {
    src: "/portfolio/diagrams/scaleopt-pipelined-tree.png",
    width: 2220,
    height: 326,
    alt: "Pipelined-Tree shows cache simulation operations running in a pipeline across cores.",
    caption: "Pipelined-Tree",
  },
];
