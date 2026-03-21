import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";

const SEED = [
  {
    id: "basic",
    tabLabel: "AI 기초",
    title: "AI활용 기초 클래스",
    subtitle: "처음 시작하는 분을 위한 AI 활용 입문",
    target: ["AI가 처음인 분", "스마트폰으로 시작하고 싶은 분", "ChatGPT·이미지 AI를 직접 써보고 싶은 분"],
    durationLabel: "6주 정규 과정",
    outcome: "나만의 AI 활용 루틴 + 이미지 결과물",
    applyUrl: "",
    imageUrl: "",
    visible: true,
    sortOrder: 1,
  },
  {
    id: "poem-picturebook",
    tabLabel: "시 그림책",
    title: "AI활용 시 그림책 출판 클래스",
    subtitle: "내 시와 AI 그림으로 나만의 그림책 만들기",
    target: ["글쓰기를 좋아하는 분", "시나 짧은 글을 그림책으로 만들고 싶은 분", "출판까지 경험해보고 싶은 분"],
    durationLabel: "6주 정규 과정",
    outcome: "내 시로 완성한 그림책 1권",
    applyUrl: "",
    imageUrl: "",
    visible: true,
    sortOrder: 2,
  },
  {
    id: "picturebook",
    tabLabel: "그림책 출판",
    title: "AI활용 그림책 출판 클래스",
    subtitle: "기획부터 출판까지, 나만의 그림책 완성",
    target: ["그림책을 직접 만들어 출판하고 싶은 분", "손주·자녀를 위한 그림책을 만들고 싶은 분", "창작 결과물로 새로운 역할을 찾는 분"],
    durationLabel: "6주 정규 과정",
    outcome: "실제 출판 가능한 그림책 1권",
    applyUrl: "",
    imageUrl: "",
    visible: true,
    sortOrder: 3,
  },
  {
    id: "video",
    tabLabel: "AI 영상제작",
    title: "AI활용 영상제작 클래스",
    subtitle: "AI로 영상·음악·유튜브 채널까지",
    target: ["영상을 만들어보고 싶었던 분", "음악을 만들거나 유튜브를 시작하고 싶은 분", "창작 콘텐츠로 온라인 활동을 시작하고 싶은 분"],
    durationLabel: "6주 정규 과정",
    outcome: "유튜브 채널 개설 + 영상 1편 완성",
    applyUrl: "",
    imageUrl: "",
    visible: true,
    sortOrder: 4,
  },
  {
    id: "institution",
    tabLabel: "기관 특강",
    title: "기관·단체 AI 창작 특강",
    subtitle: "복지관·도서관·문화센터 등 현장 맞춤 강의",
    target: ["어르신·중장년 대상 AI 교육이 필요한 기관", "직장인 창작 역량 강화 프로그램을 찾는 곳", "1회 특강부터 정규 시리즈까지 운영하고 싶은 기관"],
    durationLabel: "운영 방식 · 기간 협의",
    outcome: "기관 맞춤 창작 결과물",
    applyUrl: "#contact",
    imageUrl: "",
    visible: true,
    sortOrder: 5,
  },
];

export async function POST() {
  const batch = db.batch();
  for (const item of SEED) {
    const { id, ...data } = item;
    const ref = db.collection("classes").doc(id);
    const doc = await ref.get();
    if (!doc.exists) {
      batch.set(ref, data);
    }
  }
  await batch.commit();
  return NextResponse.json({ success: true });
}
