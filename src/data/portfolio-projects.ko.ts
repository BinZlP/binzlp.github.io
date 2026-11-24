import type { PortfolioProject } from "./portfolio";
import { projectMetrics } from "./portfolio-metrics.ts";

const {
  tokenFactory, appSharing, arm, netsPresso, easyLLM, gpu,
  transportation, logging, ci, operationsCli, infrastructureAsCode,
} = projectMetrics;

function koreanTokenCount(value: number) {
  const eok = Math.floor(value / 100_000_000);
  const man = (value % 100_000_000) / 10_000;
  const groups = [
    eok ? `${eok.toLocaleString("ko-KR")}억` : "",
    man ? `${man.toLocaleString("ko-KR", { maximumFractionDigits: 4 })}만` : "",
  ];
  return groups.filter(Boolean).join(" ") || "0";
}

type ProjectCopy = Pick<
  PortfolioProject,
  "title" | "role" | "summary" | "motivation" | "description" | "achievements"
> & { linkLabels?: string[] };

export const projectCopyKo: Record<string, ProjectCopy> = {
  inference: {
    title: "Token Factory LLM 추론 플랫폼 최적화",
    role: "플랫폼 엔지니어 / 추론 시스템 엔지니어",
    summary:
      `여러 언어 모델을 서비스하는 추론 플랫폼과 요청 라우팅 계층을 설계했습니다. 추론팀과 공동 개발한 패치를 적용한 뒤 부하 테스트에서 분당 토큰 처리량이 ${tokenFactory.tokensPerMinute.percent}% 늘었습니다.`,
    motivation: [
      "모델마다 자원 사용 특성이 달라, 서빙 구조에 따라 실제 처리 성능과 비용이 어떻게 달라지는지 확인해야 했습니다.",
    ],
    description: [
      "서빙 플랫폼과 요청 라우팅 계층을 설계하고, 후보 구조를 대상 워크로드에서 비교했습니다.",
      "추론팀과 병목을 추적하고, 요청 처리 과정에서 반복되던 연산을 제거하는 패치를 공동 개발했습니다.",
    ],
    achievements: [
      {
        title: "공동 패치의 성능",
        text: `패치 전후 부하 테스트에서 분당 처리량은 ${koreanTokenCount(tokenFactory.tokensPerMinute.before)} 토큰에서 ${koreanTokenCount(tokenFactory.tokensPerMinute.after)} 토큰으로 ${tokenFactory.tokensPerMinute.percent}% 늘었습니다. 측정된 최대 세션 수는 ${tokenFactory.peakSessions.before.toLocaleString('ko-KR')}개에서 ${tokenFactory.peakSessions.after.toLocaleString('ko-KR')}개로 ${tokenFactory.peakSessions.percent}% 증가했습니다.`,
      },
      {
        title: "팀 전체 최적화 성과",
        text: `별도의 단일 노드 테스트에서 팀의 최적화를 모두 적용했을 때, 모델 제작사 패치를 적용한 기준 엔진 대비 약 ${tokenFactory.teamThroughputMultiple}배의 처리량을 기록했습니다.`,
      },
      {
        title: "요청 취소 처리",
        text: "클라이언트가 추론 요청을 취소해도 서비스가 계속 동작하도록 수정 사항을 반영했습니다.",
      },
    ],
  },
  "app-document-sharing": {
    title: "MCP 기반 사내 앱·문서 공유 플랫폼",
    role: "서비스 아키텍트 / 풀스택 개발자",
    summary:
      "코딩 에이전트가 사내 앱을 찾아 실행하고, 사용자에게 열람 권한이 있는 문서를 검색할 수 있는 플랫폼을 개발했습니다.",
    motivation: [
      "개인이 AI를 활용해 만든 앱과 문서를 다른 구성원도 업무에 활용할 수 있도록 공유할 공간이 필요했습니다.",
      "앱 호출과 문서 검색에 같은 사용자 권한을 적용하고, 문서 추출과 임베딩은 사내 인프라에서 처리해야 했습니다.",
    ],
    description: [
      "앱 게시·실행과 문서 공유 기능을 구현했습니다. 에이전트가 인증된 MCP 도구로 앱을 찾고, OpenAPI 명세를 조회하고, API를 호출하거나 문서를 검색할 수 있도록 했습니다.",
      "오피스 문서에서 텍스트를 추출해 제목 단위로 나누고, 사내에서 TEI로 구동한 BAAI/bge-m3 모델로 임베딩을 생성했습니다.",
      "pgvector 벡터 검색과 PostgreSQL 키워드 검색 결과를 RRF로 결합했습니다. 앱 호출과 검색 과정에서 OpenFGA로 권한을 재확인하고, 앱 배포 상태도 관리할 수 있도록 했습니다.",
    ],
    achievements: [
      {
        title: "단독 개발 및 배포",
        text: `2026년 10월, 설계부터 구현과 사내 배포까지 ${appSharing.deliveryDays}일 만에 단독으로 마쳤습니다.`,
      },
      {
        title: "사내 공개",
        text: "구성원이 사용할 수 있도록 서비스를 공개했고, 사내 사용 확대를 준비하고 있습니다. 이용 증가와 생산성 효과는 아직 측정 전입니다.",
      },
    ],
  },
  delivery: {
    title: "NetsPresso / Arm AI Model Optimizer 아키텍처 설계·납품·운영",
    role: "서비스 아키텍트 / DevOps 엔지니어",
    summary:
      "AWS와 온프레미스 고객 환경에 NetsPresso를 배포할 Kubernetes 아키텍처를 설계했습니다. 모델 최적화 과정의 CPU 작업과 GPU 작업을 분리해 필요한 자원만 늘릴 수 있도록 했습니다.",
    motivation: [
      "단일 호스트에서 구동하던 제품을 확장하고, 고객 환경이 달라도 같은 절차로 릴리스할 수 있어야 했습니다.",
    ],
    description: [
      "Terraform, Helm, Kustomize로 공통 설정과 고객별 설정을 분리했습니다. 운영 대시보드를 구축하고 로그에 trace ID를 남기도록 제안해, 개발팀이 요청 단위로 문제를 추적할 수 있게 했습니다.",
      `잠재 고객사 ${arm.prospectiveCustomers}곳의 도입 검증을 지원했습니다. AWS 고객사에는 IAM 권한 경계 안에서 다른 계정의 ECR 이미지와 S3 모델 자산에 접근하는 방식을 제안해 합의 후 구현했습니다. 검증용 PoC와 SCA 보고서도 제공했습니다.`,
      "고객사 정책과 사내 법무 검토를 거친 정책을 대조해 허용 라이선스 목록을 정리했습니다. CI/CD에서 SBOM과 SCA 보고서를 자동 생성해 릴리스 전에 교체할 의존성을 확인하도록 했습니다.",
    ],
    achievements: [
      {
        title: "고객 납품",
        text: `고객과 검수 기준을 합의하고 일정이 겹친 AWS·온프레미스 프로젝트 ${arm.parallelDeliveries}건을 기한 내 납품했습니다. 코드 동결 이후 최종 검증과 패키징을 ${arm.packagingDays}일 안에 마칠 수 있게 했습니다.`,
      },
      {
        title: "CPU·GPU 독립 확장",
        text: "GPU 비용을 우려한 고객과 설계안을 조율하고, CPU 작업과 GPU 작업을 각각 확장하는 최적화 파이프라인을 납품했습니다.",
      },
      {
        title: "상용 서비스 운영",
        text: "Arm AI Model Optimizer는 2026년 10월 19일 얼리 액세스 서비스로 출시됐습니다. 출시 후 보안 검토와 운영 안정화를 지원했습니다.",
      },
    ],
    linkLabels: ["Arm 제품 발표"],
  },
  "service-migration": {
    title: "NetsPresso 운영 인프라 이전 및 AWS Foundational Technical Review(FTR) 통과",
    role: "인프라 아키텍트 / DevOps 엔지니어",
    summary:
      "NetsPresso 호스팅 서비스의 인프라를 재설계해 새 AWS 환경으로 이전했습니다. 이전을 마친 서비스는 AWS FTR을 통과했습니다.",
    motivation: [
      "AWS FTR 기준에 맞게 운영 인프라와 운영 정책을 개선해야 했습니다.",
      "새 환경을 재현할 수 있도록 구성하고, 전환 전에 검증·복구 절차를 마련할 필요가 있었습니다.",
    ],
    description: [
      "Terraform과 Ansible로 개발·스테이징·운영 네트워크를 분리하고, 데이터베이스 클러스터와 스냅샷, AMI 기반 Auto Scaling을 재구성했습니다.",
      "AWS DMS로 시험 이전을 진행해 데이터 정합성과 애플리케이션 동작을 검증했습니다.",
      "원본 데이터베이스의 복제 제약을 고려해 Route 53 전환 계획을 세우고 개발팀과 실행 일정을 조율했습니다. 팀에 인프라 코드를 공유하고 기술 세션을 진행했습니다.",
    ],
    achievements: [
      {
        title: "AWS FTR 통과",
        text: "이전한 NetsPresso 서비스가 AWS의 Foundational Technical Review를 통과했습니다.",
      },
      {
        title: "프로덕션 이전",
        text: `약 ${netsPresso.migrationHours}시간의 작업 시간 안에 운영 환경 전환을 완료했습니다.`,
      },
    ],
  },
  gateway: {
    title: "EasyLLM 사내 AI 게이트웨이·모델 서빙 플랫폼",
    role: "서비스 아키텍트 / 개발자",
    summary:
      "사내 GPU에서 구동하는 모델과 상용 모델 API를 한곳에서 쓰는 플랫폼을 개발했습니다. 모델 배포·벤치마크를 자동화하고 사용자별 예산을 관리할 수 있도록 했습니다.",
    motivation: [
      "사내 GPU 자원과 상용 API, 가중치 공개 모델에 공통 인터페이스로 접근할 수 있어야 했습니다.",
      "런타임별로 작업 절차를 따로 만들지 않고도 모델을 비교하고, 데이터나 네트워크 제약이 있는 프로젝트를 지원해야 했습니다.",
    ],
    description: [
      "Python과 FastAPI로 백엔드를 설계하고 Kubernetes, MLflow, LiteLLM을 연동해 모델 접근과 서빙 절차를 표준화했습니다.",
      "Hugging Face의 모델을 사내에 미러링하고 가용 GPU에 배포하는 과정을 자동화했습니다. vLLM과 llama.cpp를 지원했습니다.",
      "서빙 성능과 모델 품질 벤치마크를 자동화하고, 코딩 에이전트가 한 게이트웨이에서 여러 모델 API를 호출하도록 했습니다. 사용자별 예산을 적용하고 필요한 프로젝트에는 격리된 서빙 경로를 제공했습니다.",
    ],
    achievements: [
      {
        title: "사내 사용 규모",
        text: `사내 사용자 ${easyLLM.minUsers}명 이상이 이용했습니다. 가중치 공개 모델을 ${easyLLM.minModelsServed}종 이상 서빙했고, 집계 시점에는 ${easyLLM.activeModels}종을 운영했습니다.`,
      },
      {
        title: "개발 현장 활용",
        text: "데이터·네트워크 제약이 있는 프로젝트에서도 AI를 활용한 개발이 가능해졌습니다. 개발자들은 사내 모델을 활용해 디버깅 작업도 자동화했습니다.",
      },
    ],
  },
  gpu: {
    title: "온프레미스 GPU 자원 셀프서비스 플랫폼",
    role: "서비스·인프라 아키텍트 / 개발자",
    summary:
      `개발자가 온프레미스 GPU 인스턴스를 직접 할당받는 플랫폼을 만들었습니다. 2026년 11월 기준 ${gpu.minTeams}개 이상 팀이 사용하며, 클러스터 ${gpu.clusters}개에서 GPU·NPU ${gpu.minModels}종 이상, 가속기 ${gpu.minAccelerators}개 이상과 인스턴스 ${gpu.minInstances}개 이상을 운영합니다.`,
    motivation: [
      "인스턴스를 만들 때마다 인프라팀에 요청하는 절차를 줄이고, 한정된 GPU 자원을 여러 팀에 일관된 기준으로 배분해야 했습니다.",
    ],
    description: [
      "FastAPI와 Next.js로 Proxmox 인스턴스, 팀별 할당량, 사용량 기반 비용을 관리하는 기능을 개발했습니다. 대시보드에서 팀·프로젝트별 할당량과 실제 사용률을 확인하고, 사용률 기준에 따른 유휴 자원 회수를 시범 운영했습니다.",
      "여러 요청이 겹치면 사용 목적에 따라 0~3등급을 부여하고 0등급부터 자원을 배분하도록 했습니다. 이견을 심의할 협의체도 마련했으며, 2026년 11월 기준 정식 심의에 상정된 건은 없습니다.",
      "경영진과 월별·분기별 자원 계획을 수립했습니다. 수요와 가용 용량, 용량 부족 위험을 대시보드에 표시해 증설 판단에 활용했습니다.",
    ],
    achievements: [
      {
        title: "셀프서비스 도입",
        text: `${gpu.prototypeDays}일 만에 만든 프로토타입을 약 ${gpu.monthsToProduction}개월 만에 사내 서비스로 전환했습니다. 최근 측정한 한 달 동안 개발자가 직접 자원을 할당받은 건수는 약 ${gpu.monthlyProvisioningOperations}건이었습니다.`,
      },
      {
        title: "호스트 지원 시간",
        text: `Jira와 Slack으로 접수된 호스트 지원 요청에 엔지니어가 투입한 시간은 배포 직전 한 주 ${gpu.weeklySupportHoursBefore}시간에서 최근 측정한 한 주 ${gpu.weeklySupportHoursAfter}시간으로 줄었습니다. 하드웨어 장애를 제외한 시스템 지원 요청이 ${gpu.supportRequestFreeWeeks}주 연속 0건이었던 기간도 있었습니다.`,
      },
      {
        title: "클러스터 안정화",
        text: "VM 성능 저하와 노드 불안정의 원인이 Ceph 트래픽 포화임을 확인했습니다. 데이터 트래픽과 관리 트래픽을 분리해 클러스터를 안정화했습니다.",
      },
    ],
  },
  "edge-operations": {
    title: "지능형 교통 시스템 배포 자동화 및 운영",
    role: "DevOps 엔지니어 / 인프라 아키텍트",
    summary:
      `해외 산업 현장의 엣지 장비에 지능형 교통 서비스를 원격으로 배포하고 상태를 확인하는 환경을 구축했습니다. 현장 장비의 초기 설정과 배포에 걸리는 시간을 ${transportation.deploymentTimeReduction}% 줄였습니다.`,
    motivation: [
      "수십 대의 장비를 매번 현장에서 설치하고 점검하는 부담을 줄이려면, 원격 배포와 상태 확인이 가능해야 했습니다.",
    ],
    description: [
      "장비 운영 환경을 설계하고 장비별 메트릭과 로그를 한곳에 수집했습니다.",
      "현장의 네트워크 제약에 맞는 배포 경로를 구성해 CI/CD에 연결했습니다.",
      "초기 설정, 서비스 배포, 시스템 점검을 자동화하고 납품 절차를 표준화했습니다.",
    ],
    achievements: [
      {
        title: "설치·배포 시간 단축",
        text: `납품 과정에서 측정한 초기 설정 및 배포 시간을 ${transportation.deploymentTimeReduction}% 줄였습니다.`,
      },
      {
        title: "원격 운영",
        text: "원격으로 배포하고 장비 상태를 확인할 수 있게 되면서 엔지니어가 현장에 출동해야 하는 부담을 줄였습니다.",
      },
    ],
  },
  sunrise: {
    title: "Sunrise 대화형 인프라 운영 도구",
    role: "서비스 아키텍트 / 개발자",
    summary:
      "운영자가 자연어로 인프라를 점검하고 작업을 실행할 수 있도록 AWS Bedrock과 Python으로 에이전트를 개발했습니다.",
    motivation: [
      "반복되는 자원 관리와 사내 지원 업무를 한 도구에서 처리하고, 운영 요청을 진단하고 실행하는 절차를 명확히 할 필요가 있었습니다.",
    ],
    description: [
      "요청 분류, 상태 점검, 명령 생성·실행, 오류 분석 과정을 상태 머신으로 설계했습니다.",
      "AWS, Kubernetes, Ansible 에이전트를 분리해 각 영역의 운영 기능을 독립적으로 추가할 수 있게 했습니다.",
      "Django로 인터페이스를 만들고, 실행 결과에서 오류를 분석해 명령을 수정한 뒤 사용자의 기존 권한 안에서 재시도하도록 했습니다.",
    ],
    achievements: [
      {
        title: "자연어 인프라 점검",
        text: "수천 개의 클라우드 자원을 대상으로 Kubernetes 지연 시간 확인, 구성 진단 등의 작업을 자연어로 요청할 수 있게 했습니다.",
      },
      {
        title: "팀 운영 도구로 도입",
        text: "팀의 내부 운영 지원 도구로 채택됐습니다. 모든 작업에는 기존 접근 제어 시스템이 사용자에게 부여한 권한을 적용했습니다.",
      },
    ],
  },
  "multicluster-logging": {
    title: "Kubernetes 멀티클러스터 로그 수집·분석 파이프라인",
    role: "DevOps",
    summary:
      `AWS 리전 ${logging.regions}곳에 분산된 EKS 클러스터 ${logging.minClusters}개 이상의 로그를 한곳에서 수집하고 분석할 수 있게 했습니다.`,
    motivation: [
      "Kubernetes 스케줄링에 맞춰 로그를 수집하고, 후속 처리기나 저장소가 중단돼도 들어온 로그를 보존해야 했습니다.",
    ],
    description: [
      "Fluent Bit에서 수집한 로그를 Kafka에 쌓고, Fluentd가 처리해 Elasticsearch와 S3에 저장하도록 수집·처리·저장 단계를 분리했습니다.",
      "Kafka에 원본 로그를 버퍼링해 단계별 처리량 차이를 흡수했습니다.",
      "FluxCD로 여러 클러스터의 수집·처리 설정을 일관되게 관리했습니다.",
    ],
    achievements: [
      {
        title: "장애 시 로그 보존",
        text: "처리기가 중단돼도 원본 로그가 버퍼에 남도록 했습니다. Elasticsearch를 사용할 수 없을 때도 S3에 로그를 저장할 수 있도록 했습니다.",
      },
      {
        title: "처리 용량 확장",
        text: "Kafka 메시지 양에 따라 수집기와 독립적으로 Fluentd 처리 용량을 늘릴 수 있도록 설계했습니다.",
      },
    ],
  },
  "ci-optimization": {
    title: "CI 빌드 시스템 최적화",
    role: "DevOps 엔지니어",
    summary:
      `Node.js 모노레포의 컨테이너 이미지를 경량화하고 빌드 에이전트 간에 캐시를 재사용하도록 CI 파이프라인을 개선했습니다. 애플리케이션 빌드 시간은 평균 약 ${ci.averageBuildTimeReduction}% 줄었습니다.`,
    motivation: [
      "코드베이스가 커지면서 빌드 대기와 이미지 전송에 걸리는 시간이 늘었고, 여러 파이프라인에 같은 빌드 로직이 중복됐습니다.",
    ],
    description: [
      "컨테이너 레이어와 의존성을 재구성해 구동에 필요한 데이터만 이미지에 남겼습니다.",
      "Webpack, Babel, Turbo 캐시를 원격 저장소에서 재사용하도록 구현하고, 빌드 에이전트 구성별 비용과 처리 성능을 비교했습니다.",
      "Node.js 이미지 빌드 로직을 Jenkins Shared Libraries로 옮겨 재사용하고, 별도로 배포 파이프라인도 개선했습니다.",
    ],
    achievements: [
      {
        title: "이미지 크기와 빌드 시간",
        text: `${ci.imageGbBefore}GB가 넘던 이미지를 ${ci.imageGbAfter}GB로 줄였습니다. 측정한 워크로드에서 애플리케이션 빌드 시간은 평균 약 ${ci.averageBuildTimeReduction}%, 최대 ${ci.maxBuildTimeReduction}% 줄었고, 전체 파이프라인 실행 시간은 최대 ${ci.maxPipelineTimeReduction}% 줄었습니다.`,
      },
      {
        title: "빌드 표준화 및 롤백",
        text: `공통 라이브러리로 빌드 절차를 표준화했습니다. 별도로 진행한 배포 파이프라인 개선으로 롤백 대응 시간도 약 ${ci.rollbackMinutesBefore}분에서 ${ci.rollbackMinutesAfter}분으로 줄었습니다.`,
      },
    ],
  },
  "operations-cli": {
    title: "인프라 구성·검증 자동화 CLI",
    role: "개발자",
    summary:
      "대규모 인프라를 준비할 때 자원 생성부터 서버 설정, 운영 전 검증까지 한 번에 수행할 수 있는 Python CLI를 개발했습니다.",
    motivation: [
      "동시 접속자가 몰리는 행사 전에 네이버 클라우드 자원을 신속하게 준비하고, 인프라와 애플리케이션의 실제 설정이 행사 조건에 맞는지 확인해야 했습니다.",
    ],
    description: [
      "클라우드 API로 여러 자원을 병렬로 생성하는 기능을 구현해 기존 Terraform 기반 확장 절차를 보완했습니다.",
      "수백 개 자원의 조작과 호스트 설정, 명령 실행, 상태 확인을 CLI 하나로 통합했습니다.",
      "기능 테스트와 별개로 백엔드 등록 상태와 실행 중인 애플리케이션의 설정을 수집해 행사별로 미리 정의한 값과 대조했습니다.",
    ],
    achievements: [
      {
        title: "운영 준비 기간",
        text: `자원 확장과 반복 설정을 자동화해 준비 기간을 ${operationsCli.weeksSaved}주 단축했습니다.`,
      },
      {
        title: "행사 전 검증",
        text: "행사 전에 인프라 구성과 개별 호스트의 애플리케이션 설정을 같은 절차로 반복 점검할 수 있게 했습니다.",
      },
    ],
  },
  "code-judging": {
    title: "Kubernetes 기반 고가용성 코드 채점 시스템",
    role: "서비스 아키텍트 / DevOps 엔지니어 / 백엔드 개발자",
    summary:
      "사용자 코드의 실행 자원을 제한하고 저장소 장애에 대응할 수 있도록 Kubernetes 기반 채점 시스템을 설계하고 프로토타입을 구현했습니다.",
    motivation: [
      "채점 플랫폼을 재설계하면서 실행 환경의 격리, 저장소 가용성, 급격한 요청 증가, 운영 비용을 함께 고려해야 했습니다.",
    ],
    description: [
      "기존 VM 기반 실행 방식을 유지하는 안과 Kubernetes 전환안을 비교했습니다. 기존 코드의 재사용 범위, 저장소 운영, 실행 자원 제한, 팀의 도입 부담을 검토했습니다.",
      "백엔드 상태를 확인하고 장애 시 다른 저장소로 전환하는 계층형 스토리지 게이트웨이를 설계했습니다. 직접 소켓 통신하던 실행 요청을 Kafka 이벤트로 바꿔 재처리와 상태 추적이 가능하게 했습니다.",
      "NestJS로 자원 할당·채점 API를 구현하고 CPU 사용량, 대기 중인 파드, Kafka 컨슈머 지연에 따라 클러스터를 확장하도록 설계했습니다. 경영진에 아키텍처를 제안하고 프로토타입을 만들었습니다.",
    ],
    achievements: [
      {
        title: "실행·저장소 설계",
        text: "코드 실행 자원의 제한, 저장소 장애 복구, 요청량에 따른 확장을 하나의 구조에서 다루도록 설계했습니다.",
      },
      {
        title: "후속 제품 반영",
        text: "재직 중 담당한 범위는 아키텍처 설계와 프로토타입 구현이었으며, 이후 해당 구조가 실제 제품에 반영됐습니다.",
      },
    ],
  },
  "container-security": {
    title: "사용자 코드 실행 환경의 컨테이너 격리 및 보안 개선",
    role: "인프라 엔지니어 / 개발자",
    summary:
      "사용자 코드 실행에 쓰이는 컨테이너의 호스트 권한을 줄이고, 이에 맞춰 애플리케이션의 네트워크와 파일시스템 처리 로직을 수정했습니다.",
    motivation: [
      "사용자 코드가 이용할 수 있는 호스트 권한을 최소화하면서 기존 코드 실행과 네트워크 동작을 유지해야 했습니다.",
    ],
    description: [
      "일반 사용자 권한의 데몬으로 컨테이너를 구동하도록 구성하고 실행을 검증했습니다.",
      "런타임 네임스페이스 안의 가상 네트워크 인터페이스와 통신할 수 있도록 애플리케이션을 수정했습니다.",
      "컨테이너 파일시스템을 AUFS에서 Overlay2로 이전하고, 달라진 파일시스템 동작에 맞춰 실행 로직을 수정했습니다.",
    ],
    achievements: [
      {
        title: "런타임 연동 검증",
        text: "권한을 줄인 실행 환경과 새 파일시스템에서 기존 애플리케이션이 정상적으로 동작하는지 검증했습니다.",
      },
    ],
  },
  "infrastructure-as-code": {
    title: "서비스 인프라 구축 자동화",
    role: "인프라 엔지니어",
    summary:
      "Terraform과 Terragrunt로 서비스 인프라를 코드화해 고객사 설치와 정기 재구축에 같은 구성을 재사용할 수 있게 했습니다.",
    motivation: [
      "고객사에 서비스를 설치하거나 환경을 정기적으로 재구축할 때마다 반복하던 설정 작업을 줄여야 했습니다.",
    ],
    description: [
      "AWS와 네이버 클라우드 플랫폼에서 운영하는 서비스 인프라를 코드로 구현했습니다.",
    ],
    achievements: [
      {
        title: "구축 기간 단축",
        text: `고객사 설치와 정기 재구축에 필요한 기간을 약 ${infrastructureAsCode.monthsBefore}개월에서 ${infrastructureAsCode.weeksAfter}주로 줄였습니다.`,
      },
    ],
  },
  containerization: {
    title: "서비스 애플리케이션 컨테이너화",
    role: "인프라 엔지니어",
    summary:
      "운영 중인 서비스를 컨테이너로 빌드·배포하고, 서버 사양에 맞춰 인스턴스를 늘릴 수 있는 도구를 개발했습니다.",
    motivation: [
      "서비스를 운영하면서 컨테이너 빌드와 배포를 같은 절차로 반복할 수 있어야 했습니다.",
    ],
    description: [
      "서비스별 컨테이너 이미지 빌드 스크립트와 Compose 구성을 작성했습니다.",
      "서버 사양에 맞춰 CPU affinity를 지정하는 컨테이너 확장 도구를 개발했습니다.",
      "컨테이너 기반 배포와 롤백을 지원하도록 CI/CD를 수정했습니다.",
    ],
    achievements: [
      {
        title: "운영 적용",
        text: "컨테이너 빌드와 확장 도구를 실제 서비스 운영에 적용했습니다. 롤백 시간 단축 성과는 CI 빌드 시스템 최적화 프로젝트에 함께 기록했습니다.",
      },
    ],
  },
};
