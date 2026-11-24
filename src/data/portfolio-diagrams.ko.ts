import {
  projectDiagrams as originals,
  researchDiagrams as researchOriginals,
} from "./portfolio-diagrams.ts";

type Diagram = (typeof researchOriginals)[number];
type FigureText = Pick<Diagram, "alt" | "caption">;

const projectText: Record<string, FigureText> = {
  inference: {
    alt: "요청을 접수해 실행 작업을 배정하면 모델이 결과를 생성해 반환한다. 부하 테스트로 이 경로의 서빙 성능을 측정한다.",
    caption: "Token Factory의 요청 처리 흐름과 성능 평가",
  },
  "app-document-sharing": {
    alt: "에이전트가 MCP로 OpenAPI 앱을 찾고 문서를 검색한다. OpenFGA가 접근 권한을 확인하고, 문서 검색은 벡터 검색과 키워드 검색 결과를 결합한다.",
    caption: "앱·문서 공유 플랫폼의 등록 및 검색 흐름",
  },
  delivery: {
    alt: "NetsPresso의 애플리케이션 서비스, 작업 대기열, 모델 최적화 워커, 모니터링 구성 요소가 연결된 모습.",
    caption: "NetsPresso 서비스 및 배포 아키텍처",
  },
  gpu: {
    alt: "Next.js와 FastAPI가 Proxmox의 GPU 인스턴스를 관리한다. 본사와 데이터센터에서 수집한 사용량을 관리 플랫폼으로 보낸다.",
    caption: "본사와 데이터센터의 GPU 할당 및 사용량 수집 예시",
  },
  gateway: {
    alt: "EasyLLM이 MLflow 기반 모델 관리, 추론 런타임, 오브젝트 스토리지, LiteLLM 게이트웨이를 연결한다.",
    caption: "EasyLLM 모델 관리, 서빙 및 게이트웨이 구성",
  },
  "edge-operations": {
    alt: "CI/CD를 통해 Linux 현장 장비에 서비스를 배포한다. Vector가 로그를 수집하고, Loki와 Prometheus로 모은 로그와 지표를 Grafana에서 확인한다.",
    caption: "지능형 교통 시스템의 현장 배포 및 상태 모니터링",
  },
  sunrise: {
    alt: "Sunrise 에이전트 관리자가 명령 처리기, 자격 증명 관리, Amazon Bedrock과 인프라 API를 연결한다.",
    caption: "Sunrise 인프라 운영 에이전트 구성",
  },
  "multicluster-logging": {
    alt: "Fluent Bit에서 수집한 로그가 Kafka와 Fluentd를 거쳐 Elasticsearch와 S3에 저장된다. Flux로 수집 설정을 관리한다.",
    caption: "여러 Kubernetes 클러스터의 중앙 로그 수집 흐름",
  },
  "ci-optimization": {
    alt: "Jenkins 공유 라이브러리와 자동 확장 에이전트가 EFS 캐시를 이용해 이미지를 빌드하고, ECR에 올린 이미지를 배포한다.",
    caption: "이미지 빌드 파이프라인과 캐시 재사용",
  },
  "code-judging": {
    alt: "Kubernetes 코드 실행 시스템이 Kafka로 작업을 전달하고, KEDA와 Karpenter로 실행 용량을 조정하며, 데이터를 계층별로 저장한다.",
    caption: "코드 채점 시스템의 실행 및 확장 구조",
  },
};

export const projectDiagrams: Record<string, Diagram> = Object.fromEntries(
  Object.entries(originals).map(([id, diagram]) => [id, { ...diagram, ...projectText[id] }]),
);

const researchText: Record<string, FigureText> = {
  AccessMap: {
    alt: "AccessMap을 병렬로 초기화하고 페이지 접근 기록을 조회하는 과정.",
    caption: "AccessMap의 병렬 초기화와 페이지 접근 기록 조회",
  },
  "Pipelined-Tree": {
    alt: "여러 코어가 캐시 시뮬레이션을 단계별로 나누어 수행하는 Pipelined-Tree의 동작 방식.",
    caption: "Pipelined-Tree를 이용한 캐시 시뮬레이션",
  },
};

export const researchDiagrams: Diagram[] = researchOriginals.map((diagram) => ({
  ...diagram,
  ...researchText[diagram.caption],
}));
