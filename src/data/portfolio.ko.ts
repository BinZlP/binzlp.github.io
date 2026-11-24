import * as en from "./portfolio.ts";
import type { PortfolioExperience, PortfolioProject, PortfolioPublication } from "./portfolio.ts";
import { projectCopyKo } from "./portfolio-projects.ko.ts";
import { projectMetrics } from "./portfolio-metrics.ts";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function koreanPeriod(period: string) {
  return period
    .replace(/\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4})/g,
      (_, month: string, year: string) => `${year}.${String(months.indexOf(month) + 1).padStart(2, "0")}`)
    .replace(" - ", " – ")
    .replace("Present", "현재");
}

const companies: Record<string, string> = { goorm: "구름" };

export const profile = {
  ...en.profile,
  name: "한형석",
  role: "AI 인프라 / 플랫폼 엔지니어",
  intro: "분산 시스템과 운영체제를 연구한 DevOps 엔지니어입니다. 클라우드와 온프레미스 환경에서 LLM 추론 인프라와 개발자 플랫폼을 구축하고, 고객이 서비스를 배포하고 운영할 수 있도록 시스템을 설계합니다.",
};

const experienceCopy: Record<string, Pick<PortfolioExperience, "role" | "description" | "bullets">> = {
  "Nota AI": {
    role: "DevOps 엔지니어",
    description: "온프레미스 및 클라우드 GPU 인프라 운영, 사내 AI 플랫폼 개발, 고객 환경 배포",
    bullets: [
      "GPU 클러스터 및 클라우드 인프라 설계와 운영, 자원 할당 및 용량 계획",
      "LLM 추론 플랫폼 구축, 추론팀과 성능 병목 공동 분석 및 개선",
      "사내 셀프서비스 플랫폼과 MCP 도구 개발, 클라우드와 온프레미스에서 재사용 가능한 배포 구조 설계(접근 제한 환경 포함)",
      "서비스 모니터링 및 운영 자동화 구축, 보안 심사와 기술 검토를 위한 인프라 통제 구현",
    ],
  },
  goorm: {
    role: "인프라 엔지니어",
    description: "수천 건의 동시 코드 실행을 지원하는 웹 IDE와 코드 채점 서비스의 인프라 운영",
    bullets: [
      "멀티 리전 및 멀티 클라우드 인프라 설계와 운영, 서비스 안정성과 확장성 개선",
      "Terraform, Ansible, Python을 활용한 인프라 구축 및 고객 납품 절차 표준화",
      `Kubernetes 로그 통합 수집 및 서비스 모니터링 체계 구축(${projectMetrics.logging.regions}개 리전, 클러스터 ${projectMetrics.logging.minClusters}개 이상)`,
      "CSAP와 ISMS 요구사항을 반영한 인프라 설계, CI/CD 및 운영 도구 개발",
    ],
  },
};

export const experience = en.experience.map((item) => ({
  ...item,
  ...experienceCopy[item.company],
  company: companies[item.company] ?? item.company,
  period: koreanPeriod(item.period),
}));

const technologyTerms: Record<string, string> = {
  Observability: "옵저버빌리티",
  "Capacity planning": "용량 계획",
  "State machines": "상태 머신",
  "Build caching": "빌드 캐싱",
  Validation: "구성 검증",
  "Tiered storage": "계층형 스토리지",
  Namespaces: "네임스페이스",
};

export const projects: PortfolioProject[] = en.projects.map((project) => {
  const { linkLabels, ...copy } = projectCopyKo[project.id];
  return {
    ...project,
    ...copy,
    company: companies[project.company] ?? project.company,
    period: koreanPeriod(project.period),
    tags: project.tags?.map((tag) => technologyTerms[tag] ?? tag),
    links: project.links.map((link, index) => ({ ...link, label: linkLabels?.[index] ?? link.label })),
  };
});

const earlierCopy: Record<string, {title: string; description: string}> = {
  "F2FS metadata updates on ZNS with a skiplist key-value store": {
    title: "ZNS에서 스킵 리스트로 F2FS 메타데이터 갱신",
    description: "스킵 리스트를 관리하는 커널 모듈을 개발했습니다. F2FS의 노드 주소 테이블(NAT) 변경분을 새 위치에 기록하고, 모아 둔 데이터를 존에 순차적으로 쓸 수 있도록 했습니다.",
  },
  "Braille navigation service": {
    title: "시각장애인을 위한 점자 내비게이션",
    description: "지도 경로를 점자로 변환하는 API와 서비스 구조를 설계했습니다. Raspberry Pi와 LED 디스플레이로 경로와 이동 방향을 안내하는 시제품을 만들었습니다.",
  },
  "Bluetooth beacon smart-gate platform": {
    title: "블루투스 비콘 기반 스마트 게이트",
    description: "Raspberry Pi 게이트와 Firebase 백엔드를 구축해 비콘 감지, 결제, GPIO를 통한 게이트 개폐를 연결했습니다. 광운대학교 참빛설계학기 전시회에서 장려상을 받았습니다.",
  },
  "Real-time home yoga assistant service": {
    title: "실시간 홈 요가 어시스트 서비스",
    description: "SW마에스트로 팀장으로 서비스 아키텍처를 설계하고 백엔드를 개발했습니다. 학습 데이터를 준비해 자세 안내용 모델을 트리플릿 손실 함수로 학습하고 일정과 예산, 문서를 관리했습니다.",
  },
  "Bluetooth smart door lock": {
    title: "블루투스 스마트 도어록",
    description: "Raspberry Pi의 GPIO로 모터를 제어하는 API를 개발하고 Android 앱과 블루투스로 연결했습니다. 광운대학교 소프트웨어학부 졸업작품전시회에서 장려상을 받았습니다.",
  },
  "Popular travel destination service": {
    title: "인기 여행지 정보 서비스",
    description: "Python과 Selenium으로 해시태그를 수집하는 크롤러를 개발하고 저장 구조를 설계했습니다. 웹사이트와 채팅 기능 일부를 구현했으며 KW 해커톤에서 3위를 차지했습니다.",
  },
  "Online programming contest platform": {
    title: "온라인 프로그래밍 대회 채점 플랫폼",
    description: "AWS EC2와 MySQL 환경에서 소켓으로 워커를 연결하고 대기열로 채점 작업을 분산했습니다. SW Championship 알고리즘 부문에서 약 100명이 동시에 참가하는 대회에 사용했습니다.",
  },
};

export const earlierProjects = en.earlierProjects.map((item) => ({
  ...item,
  ...earlierCopy[item.title],
  period: koreanPeriod(item.period),
}));

type PublicationCopy = Pick<PortfolioPublication, "meta" | "description"> & { title?: string };
const publicationCopy: Record<string, PublicationCopy> = {
  "Build with AI Seoul 2026 with Google DeepMind": {
    meta: "초청 발표 / 2026년 5월",
    description: `${projectMetrics.gpu.prototypeDays}일간의 개념 검증에서 사내 정식 서비스로 이어진 GPU 셀프서비스 플랫폼의 개발 과정을 발표했습니다. 설계 문서와 테스트 주도 개발을 바탕으로 Claude Code와 Codex를 활용하고, 에이전트가 작성한 코드를 지속적으로 검증한 경험을 공유했습니다.`,
  },
  "Persistent Context Management & Retrieval for LLM Agents": {
    meta: "개인 연구 / 미출판 원고 / 2026년",
    description: "제한된 토큰 예산 안에서 에이전트가 참고할 문서를 유지하도록 ARC에서 착안한 컨텍스트 관리자와 Python MCP 서버를 설계했습니다. 같은 워크로드에서 BM25 및 밀집 벡터 검색과 비교하고, 토큰 사용량과 캐시 동작, 비용을 재현 가능한 방식으로 집계했습니다.",
  },
  "ScaleOPT: A Scalable Optimal Page Replacement Policy Simulator": {
    meta: "제1저자 / ACM SIGMETRICS 2025",
    description: "AccessMap으로 전처리를 병렬화하고 Pipelined-Tree로 최적 페이지 교체 시뮬레이션을 파이프라인화했습니다. 72스레드 환경에서 기존 기준 시뮬레이터 대비 최대 약 6배, 오픈소스 시뮬레이터 대비 최대 약 20배의 속도를 기록했습니다.",
  },
  "Improving optimal page replacement for multicore systems": {
    title: "멀티코어 환경을 고려한 최적 페이지 교체 알고리즘 향상 기법",
    meta: "제1저자 / KCC 2022 최우수논문상",
    description: "최적 페이지 교체 시뮬레이션의 전처리 과정에서 확장성을 제한하는 연산을 분석하고, 해당 연산의 시간 복잡도를 낮추는 자료구조를 제안했습니다. 한국정보과학회 KCC 2022 최우수논문상을 받았습니다.",
  },
  "Attentive Multi-Task Prediction of Atmospheric Particulate Matter: Effect of the COVID-19 Pandemic": {
    meta: "공동저자 / IEEE Access",
    description: "국내 주요 도시의 미세먼지 농도를 예측하는 다중 과제 학습 연구에 참여해 아이디어 구상, 데이터 전처리, 결과 시각화를 맡았습니다.",
  },
};

const publicationLinks: Record<string, string> = { "Full paper": "논문 전문", "Conference abstract": "학회 초록", Paper: "논문" };
function localizePublication(item: PortfolioPublication): PortfolioPublication {
  return {
    ...item,
    ...publicationCopy[item.title],
    links: item.links.map((link) => ({ ...link, label: publicationLinks[link.label] ?? link.label })),
  };
}
export const presentations = en.presentations.map(localizePublication);
export const writings = en.writings.map(localizePublication);

export const activities: typeof en.activities = [
  {
    title: "SW마에스트로",
    description: "2019년 5월부터 12월까지 10기 연수생으로 참여했습니다. 실시간 홈 요가 어시스트 서비스 프로젝트의 팀장을 맡아 서비스 구조를 설계하고 백엔드와 인프라를 개발했습니다.",
  },
  {
    title: "교육 및 멘토링",
    description: "2024년 구름톤 in Jeju 11기와 12기에서 클라우드 엔지니어 멘토로 활동했습니다. 경신고등학교에서 컴퓨팅 사고와 C 프로그래밍을 가르쳤으며, 서울대학교 시스템프로그래밍 수업과 광운대학교 SW학교에서 조교를 맡았습니다.",
  },
  {
    title: "행사 기획 및 기술 공유",
    description: "KSCON과 대학 연합 SW Championship의 기획과 기술 운영, 알고리즘 문제 출제에 참여했습니다. 구름 사내 세미나 STRIDE에서 인프라 운영 도구 Sunrise의 개발 경험을 발표했습니다.",
  },
  {
    title: "광운대학교 학생회",
    description: [
      "제47대 총학생회 비상대책위원장 (2020년 상반기)",
      "소프트웨어융합대학 제3대 학생회장 (2019년)",
      "소프트웨어학부 제2대 부학생회장 (2018년)",
    ],
  },
];

const skillNames: Record<string, string> = {
  "Virtualization & storage": "가상화 / 스토리지",
  "Containers & orchestration": "컨테이너 / 오케스트레이션",
  "Cloud & provisioning": "클라우드 / 프로비저닝",
  "CI/CD & GitOps": "CI/CD 및 GitOps",
  "LLM serving": "LLM 서빙",
  "Agent development": "에이전트 개발",
  "Databases & caching": "데이터베이스 / 캐싱",
  Messaging: "메시징",
  "Log pipelines": "로그 파이프라인",
  Monitoring: "모니터링",
  "Web frameworks": "웹 프레임워크",
  "Programming languages": "프로그래밍 언어",
  "Performance & data analysis": "성능 분석 / 데이터 분석",
  "Collaboration tools": "협업 도구",
  "Spoken languages": "구사 언어",
};
const skillTerms: Record<string, string> = {
  "Ceph and cluster networking": "Ceph 및 클러스터 네트워킹",
  "Inference and load testing (vLLM)": "추론 및 부하 테스트(vLLM)",
  "Model gateways (LiteLLM)": "모델 게이트웨이(LiteLLM)",
  "MCP tools": "MCP 도구",
  "Document embeddings and retrieval": "문서 임베딩과 검색",
  "Shell scripting": "셸 스크립팅",
  "Parallel programming and performance profiling": "병렬 프로그래밍과 성능 프로파일링",
  "Korean (native), English (business-level fluency)": "한국어(모국어), 영어(업무 소통)",
};
export const skills = en.skills.map(({ title, items }) => ({
  title: skillNames[title] ?? title,
  items: items.map((item) => skillTerms[item] ?? item),
}));

const schools: Record<string, { school: string; degree: string }> = {
  "Seoul National University": { school: "서울대학교", degree: "컴퓨터공학부 공학석사" },
  "Kwangwoon University": { school: "광운대학교", degree: "소프트웨어학부 공학사" },
};
export const education = en.education.map((item) => ({
  ...item,
  ...schools[item.school],
  period: koreanPeriod(item.period),
}));

const awardNames: Record<string, string> = {
  "KCC Best Paper Award, Korean Institute of Information Scientists and Engineers": "한국정보과학회 KCC 최우수논문상",
  "Meritorious Service Award, President of Kwangwoon University": "광운대학교 총장 공로상",
  "Dean's List and encouragement award at the project exhibition, Kwangwoon University": "광운대학교 소프트웨어융합대학 Dean’s List(성적 우수), 참빛설계학기 전시회 장려상",
  "Graduation-project exhibition encouragement award, Kwangwoon University": "광운대학교 소프트웨어학부 졸업작품전시회 장려상",
  "Third place, KW Hackathon; KWEF creative software competition encouragement award": "KW 해커톤 3위, 광운엔지니어링페스티벌(KWEF) 창의융합소프트웨어경진대회 장려상",
  "Dean's List, software excellence, academic merit, and service scholarships, Kwangwoon University": "광운대학교 Dean’s List, SW능력우수, 성적우수, 봉사 장학금",
  "National Science and Engineering Scholarship, Korea Student Aid Foundation": "한국장학재단 국가우수장학금(이공계)",
};
export const awards = en.awards.map((item) => ({ ...item, title: awardNames[item.title] ?? item.title }));
