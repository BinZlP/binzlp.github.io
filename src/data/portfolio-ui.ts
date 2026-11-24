export type PortfolioLocale = "en" | "ko";

export const portfolioPaths = { en: "/portfolio/", ko: "/portfolio/ko/" } as const;

export const portfolioUi = {
  en: {
    profile: "Profile", experience: "Work experience", projects: "Projects",
    presentations: "Presentations", writings: "Writings", activities: "Other activities",
    skills: "Skills", awards: "Awards & honors", education: "Education",
    role: "Role", technologies: "Technologies", motivation: "Motivation",
    description: "Description", achievements: "Challenges & achievements",
    contents: "Contents", documentTitle: "Engineering portfolio", portfolio: "Portfolio",
    pageDescription: "Projects, experience, and research in AI infrastructure, distributed systems, and developer platforms.",
    skip: "Skip to content", downloads: "PDF downloads", resume: "Résumé",
    language: "Portfolio language", updated: "Content updated", top: "Back to top",
    index: "Portfolio contents", mobileIndex: "In this portfolio", email: "Email",
    expand: "Expand all", collapse: "Collapse all", earlier: "Earlier projects",
    projectIntro: "Architecture, implementation, and operations.", researchDiagrams: "Research diagrams",
    fullSize: "View full size", permalink: "Link to this project",
    openDiagram: (title: string) => `Open ${title} architecture diagram in a new tab`,
  },
  ko: {
    profile: "소개", experience: "경력", projects: "프로젝트",
    presentations: "발표", writings: "논문과 글", activities: "기타 활동",
    skills: "기술", awards: "수상 및 장학", education: "학력",
    role: "역할", technologies: "사용 기술", motivation: "배경",
    description: "맡은 일", achievements: "성과",
    contents: "목차", documentTitle: "엔지니어 포트폴리오", portfolio: "포트폴리오",
    pageDescription: "AI 인프라와 개발자 플랫폼을 설계하고 운영해 온 한형석의 프로젝트, 경력, 분산 시스템 연구를 소개합니다.",
    skip: "본문으로 건너뛰기", downloads: "PDF 다운로드", resume: "영문 이력서",
    language: "포트폴리오 언어", updated: "마지막 수정", top: "맨 위로",
    index: "포트폴리오 목차", mobileIndex: "포트폴리오 목차", email: "이메일",
    expand: "모두 펼치기", collapse: "모두 접기", earlier: "이전 프로젝트",
    projectIntro: "서비스별 설계와 구현, 운영 과정에서 맡은 일과 성과를 정리했습니다.", researchDiagrams: "연구 도식",
    fullSize: "원본 보기", permalink: "이 프로젝트 링크",
    openDiagram: (title: string) => `${title} 아키텍처 도식을 새 탭에서 열기`,
  },
} as const;
