import { team as portraits } from "@/lib/images";
import type { Img } from "@/lib/images";

export type Vet = {
  slug: string;
  name: string;
  role: string;
  /** 진료 분야 한 줄 */
  focus: string;
  /** 본인의 말. 원고의 큰따옴표 문장을 그대로 쓴다. */
  statement: string;
  credentials: string[];
  portrait: Img;
};

export const vets: Vet[] = [
  {
    slug: "choi-yunho",
    name: "최윤호",
    role: "대표원장",
    focus: "외과수술 · 치과진료",
    statement:
      "15년 마취 사고 0건, 수천 건의 수술 경험. 경험의 깊이가 수술의 결과가 됩니다.",
    credentials: [
      "대한수의외과 정회원",
      "AO VET(국제수의 정형외과) 이수",
      "국내외 수의 외과 코스 다수 이수",
      "수의 치과 코스 이수",
    ],
    portrait: portraits.choiYunho,
  },
  {
    slug: "kim-bangchang",
    name: "김방창",
    role: "원장",
    focus: "노령 · 중증 내과진료",
    statement:
      "심장질환, 종양, 난치성 질환 등 진단부터 치료까지 One stop care.",
    credentials: [
      "(전) 동물메디컬센터W 원장",
      "(전) 한국수의임상피부학회 임원",
      "한국순환기학회 교육과정 수료",
      "국내외 수의 내과 코스 다수 이수",
    ],
    portrait: portraits.kimBangchang,
  },
  {
    slug: "lee-nayoung",
    name: "이나영",
    role: "부원장",
    focus: "고양이 특화 진료 · 행동학 상담",
    statement:
      "분리된 고양이 진료 공간에서, 고양이 서적 저자가 직접 행동학 상담을 진행합니다.",
    credentials: [
      "한국 고양이 수의사회 부회장 역임, (현) 자문위원",
      "미국 고양이 수의사회 회원",
      "국내 고양이 질환 세미나 다수 발표",
      "저서 「수의사는 고양이를 이렇게 키운다」",
      "저서 「동물병원 119: 고양이편」",
    ],
    portrait: portraits.leeNayoung,
  },
  {
    slug: "kim-mincheol",
    name: "김민철",
    role: "진료과장",
    focus: "건강검진 · 수의침치료",
    statement:
      "아이의 건강 상태를 언제든 확인하실 수 있도록, 프리미엄 건강검진 리포트를 제공합니다.",
    credentials: [
      "CVA(수의침치료) 코스 이수",
      "국내외 수의 내과 코스 다수 이수",
    ],
    portrait: portraits.kimMincheol,
  },
];
