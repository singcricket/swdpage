/**
 * 클리닉 페이지 콘텐츠 모델.
 *
 * 원고 8편은 전부 같은 5악장으로 쓰였다.
 *   주요 질환 → 검사 항목 → 치료 방향 → 고위험 품종 → 내원 권장 증상
 * 페이지마다 JSX를 새로 짜는 대신 이 타입으로 원고를 담고,
 * 블록 컴포넌트가 렌더링을 맡는다. 문구 수정은 데이터 파일 한 곳에서 끝난다.
 */

import type { Img } from "@/lib/images";

/* ------------------------------------------------------------------ */
/* 섹션                                                                */
/* ------------------------------------------------------------------ */

type Base = {
  /** 앵커 id. 좌측 인덱스 레일이 이 값으로 링크를 만든다. */
  id: string;
  /** 인덱스 레일과 섹션 제목에 함께 쓰인다. */
  title: string;
  /** 제목 위 작은 라벨 */
  eyebrow?: string;
};

/** 문단 몇 개. 강조가 필요 없는 설명글. */
export type ProseSection = Base & {
  kind: "prose";
  body: string[];
};

/** 주요 진료 질환 — 질환명 + 설명 */
export type DiseaseSection = Base & {
  kind: "diseases";
  intro?: string;
  items: {
    name: string;
    /** 약어나 영문명. 「승모판 폐쇄부전증」의 "MVD" 처럼. */
    code?: string;
    body: string;
  }[];
  note?: string;
};

/** 검사 항목 — 검사명 + 내용. 원고에서 전부 2열 표로 쓰였다. */
export type TestSection = Base & {
  kind: "tests";
  intro?: string;
  rows: { name: string; detail: string }[];
  note?: string;
};

/** 치료 방향 — 접근법 + 설명 */
export type TreatmentSection = Base & {
  kind: "treatments";
  intro?: string;
  items: { name: string; body: string }[];
  note?: string;
};

/** 고위험 품종 안내 */
export type RiskSection = Base & {
  kind: "risk";
  intro?: string;
  groups: { label: string; body: string }[];
  note?: string;
};

/**
 * 내원 권장 증상.
 * `urgent` 는 원고에서 *(응급)* 으로 표시된 항목이다.
 * 이 표시는 장식이 아니라 보호자가 지금 당장 움직여야 하는지를 가르는
 * 정보라서, 사이트 전체에서 coral 색을 쓰는 유일한 자리다.
 */
export type SymptomSection = Base & {
  kind: "symptoms";
  intro?: string;
  items: { text: string; urgent?: boolean; hint?: string }[];
  note?: string;
};

/** 자유 표 — 나이 환산표, 치주 등급표, 항암 프로토콜 등 */
export type TableSection = Base & {
  kind: "table";
  intro?: string;
  head: string[];
  rows: string[][];
  note?: string;
};

/** 사진 묶음 */
export type PhotoSection = Base & {
  kind: "photos";
  intro?: string;
  images: Img[];
};

/** 병원의 목소리를 그대로 보여주는 자리 */
export type QuoteSection = Base & {
  kind: "quote";
  text: string;
  attribution?: string;
};

export type Section =
  | ProseSection
  | DiseaseSection
  | TestSection
  | TreatmentSection
  | RiskSection
  | SymptomSection
  | TableSection
  | PhotoSection
  | QuoteSection;

/* ------------------------------------------------------------------ */
/* 페이지                                                              */
/* ------------------------------------------------------------------ */

export type ClinicPage = {
  /** 라우트 경로 */
  href: string;
  /** 페이지 제목 — 브라우저 탭과 h1 */
  title: string;
  /** 상위 분류. 「만성질환 클리닉」 아래 「심혈관계 클리닉」 같은 관계. */
  eyebrow?: string;
  /** 히어로 헤드라인. 원고의 대표 카피를 그대로 쓴다. */
  headline: string;
  /** 히어로 아래 도입문 */
  lede: string;
  /** 메타 description */
  description: string;
  hero: Img;
  sections: Section[];
};

/** 인덱스 레일이 쓸 목차. 인용 섹션은 목차에 넣지 않는다. */
export function tableOfContents(sections: Section[]) {
  return sections
    .filter((section) => section.kind !== "quote")
    .map((section) => ({ id: section.id, title: section.title }));
}
