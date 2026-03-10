export type Track = {
  name: string;
  duration: string;
  outcome: string;
  curriculum: { week: string; title: string }[];
  applyUrl: string;
};

export type ClassItem = {
  id: string;
  tabLabel: string;
  title: string;
  subtitle: string;
  target: string[];
  tracks: {
    regular: Track;
    challenge: Track | null;
  };
};

export const classes: ClassItem[] = [
  {
    id: "basic",
    tabLabel: "AI 기초",
    title: "AI활용 기초 클래스",
    subtitle: "처음 시작하는 분을 위한 AI 활용 입문",
    target: [
      "AI가 처음인 분",
      "스마트폰으로 시작하고 싶은 분",
      "ChatGPT·이미지 AI를 직접 써보고 싶은 분",
    ],
    tracks: {
      regular: {
        name: "6주 정규 과정",
        duration: "6주",
        outcome: "나만의 AI 활용 루틴 + 이미지 결과물",
        curriculum: [
          { week: "1주차", title: "AI가 뭔지 알아보기 — ChatGPT 처음 써보기" },
          { week: "2주차", title: "AI에게 내 이야기 전달하는 법" },
          { week: "3주차", title: "이미지 AI로 그림 만들기 (Ideogram)" },
          { week: "4주차", title: "만든 이미지 활용하기 — 카드뉴스·프로필" },
          { week: "5주차", title: "AI 도구 비교 — ChatGPT vs Copilot vs 기타" },
          { week: "6주차", title: "나만의 AI 활용 루틴 완성 + 결과물 발표" },
        ],
        applyUrl: "",
      },
      challenge: {
        name: "2주 챌린지",
        duration: "2주",
        outcome: "AI 핵심 도구 체험 + 간단한 이미지 결과물",
        curriculum: [
          { week: "1주차", title: "ChatGPT + 이미지 AI 핵심만 빠르게" },
          { week: "2주차", title: "나만의 결과물 완성 + 공유" },
        ],
        applyUrl: "",
      },
    },
  },
  {
    id: "poem-picturebook",
    tabLabel: "시 그림책",
    title: "AI활용 시 그림책 출판 클래스",
    subtitle: "내 시와 AI 그림으로 나만의 그림책 만들기",
    target: [
      "글쓰기를 좋아하는 분",
      "시나 짧은 글을 그림책으로 만들고 싶은 분",
      "출판까지 경험해보고 싶은 분",
    ],
    tracks: {
      regular: {
        name: "6주 정규 과정",
        duration: "6주",
        outcome: "내 시로 완성한 그림책 1권",
        curriculum: [
          { week: "1주차", title: "내 이야기 꺼내기 — 시 소재 찾기" },
          { week: "2주차", title: "ChatGPT로 시 다듬기" },
          { week: "3주차", title: "AI 이미지로 그림 그리기" },
          { week: "4주차", title: "그림책 구조 완성하기" },
          { week: "5주차", title: "디자인 손보고 편집하기" },
          { week: "6주차", title: "출판 & 완성본 공유" },
        ],
        applyUrl: "",
      },
      challenge: {
        name: "2주 챌린지",
        duration: "2주",
        outcome: "미니 시 그림책 1편",
        curriculum: [
          { week: "1주차", title: "소재 찾기 + AI로 시와 그림 완성" },
          { week: "2주차", title: "미니 그림책 편집 + 공유" },
        ],
        applyUrl: "",
      },
    },
  },
  {
    id: "picturebook",
    tabLabel: "그림책 출판",
    title: "AI활용 그림책 출판 클래스",
    subtitle: "기획부터 출판까지, 나만의 그림책 완성",
    target: [
      "그림책을 직접 만들어 출판하고 싶은 분",
      "손주·자녀를 위한 그림책을 만들고 싶은 분",
      "창작 결과물로 새로운 역할을 찾는 분",
    ],
    tracks: {
      regular: {
        name: "6주 정규 과정",
        duration: "6주",
        outcome: "실제 출판 가능한 그림책 1권",
        curriculum: [
          { week: "1주차", title: "나만의 그림책 기획하기 — 주제 & 스토리 구조" },
          { week: "2주차", title: "ChatGPT로 스토리 완성하기" },
          { week: "3주차", title: "Ideogram으로 그림 만들기" },
          { week: "4주차", title: "책 구조 완성 — 표지·내지 배치" },
          { week: "5주차", title: "디자인 손보기 + 인쇄 파일 준비" },
          { week: "6주차", title: "출판 & 완성본 공유" },
        ],
        applyUrl: "",
      },
      challenge: {
        name: "2주 챌린지",
        duration: "2주",
        outcome: "미니 그림책 1권 (8페이지)",
        curriculum: [
          { week: "1주차", title: "스토리 기획 + AI로 그림 완성" },
          { week: "2주차", title: "편집 + 미니 그림책 출판" },
        ],
        applyUrl: "",
      },
    },
  },
  {
    id: "video",
    tabLabel: "AI 영상제작",
    title: "AI활용 영상제작 클래스",
    subtitle: "AI로 영상·음악·유튜브 채널까지",
    target: [
      "영상을 만들어보고 싶었던 분",
      "음악을 만들거나 유튜브를 시작하고 싶은 분",
      "창작 콘텐츠로 온라인 활동을 시작하고 싶은 분",
    ],
    tracks: {
      regular: {
        name: "6주 정규 과정",
        duration: "6주",
        outcome: "유튜브 채널 개설 + 영상 1편 완성",
        curriculum: [
          { week: "1주차", title: "AI 영상 도구 알아보기 + 채널 기획" },
          { week: "2주차", title: "AI 음악 만들기 — Suno 활용" },
          { week: "3주차", title: "AI 이미지·영상 소스 만들기" },
          { week: "4주차", title: "영상 편집 기초 + 자막 넣기" },
          { week: "5주차", title: "유튜브 채널 개설 + 썸네일 만들기" },
          { week: "6주차", title: "첫 영상 업로드 + 발표" },
        ],
        applyUrl: "",
      },
      challenge: {
        name: "2주 챌린지",
        duration: "2주",
        outcome: "쇼츠 영상 1편 + 채널 개설",
        curriculum: [
          { week: "1주차", title: "AI 음악·이미지 소스 제작" },
          { week: "2주차", title: "쇼츠 편집 + 채널 개설" },
        ],
        applyUrl: "",
      },
    },
  },
  {
    id: "institution",
    tabLabel: "기관 특강",
    title: "기관·단체 AI 창작 특강",
    subtitle: "복지관·도서관·문화센터 등 현장 맞춤 강의",
    target: [
      "어르신·중장년 대상 AI 교육이 필요한 기관",
      "직장인 창작 역량 강화 프로그램을 찾는 곳",
      "1회 특강부터 정규 시리즈까지 운영하고 싶은 기관",
    ],
    tracks: {
      regular: {
        name: "맞춤형 운영",
        duration: "협의",
        outcome: "기관 맞춤 창작 결과물",
        curriculum: [
          { week: "1회 특강", title: "AI 기초 체험 — ChatGPT·이미지 AI 한 번에" },
          { week: "단기 시리즈", title: "3~5회 구성 — 기관 대상·목표에 맞게 설계" },
          { week: "정규 과정", title: "6주 이상 — 결과물 완성까지 함께" },
        ],
        applyUrl: "#contact",
      },
      challenge: null,
    },
  },
];
