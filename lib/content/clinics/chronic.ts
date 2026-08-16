import type { ClinicPage, Section } from "@/lib/content/types";
import type { Img } from "@/lib/images";
import { facility } from "@/lib/images";

import { cardioPage } from "./cardio";
import { renalPage } from "./renal";
import { giPage } from "./gi";
import { dermPage } from "./derm";
import { seniorPage } from "./senior";

/**
 * 허브 페이지가 하위 클리닉을 소개할 때 쓰는 요약.
 *
 * 질환 목록은 각 페이지 데이터에서 뽑아 쓴다. 손으로 다시 적으면 원고가
 * 바뀔 때 두 곳이 어긋난다.
 */
export type SubClinic = {
  href: string;
  title: string;
  claim: string;
  /** 그 클리닉에서 보는 질환 이름들 */
  covers: string[];
  image: Img;
};

function diseaseNames(sections: Section[], limit = 5) {
  const diseases = sections.find((section) => section.kind === "diseases");
  if (!diseases || diseases.kind !== "diseases") return [];
  return diseases.items.slice(0, limit).map((item) => item.name);
}

function toSubClinic(page: ClinicPage, image: Img): SubClinic {
  return {
    href: page.href,
    title: page.title,
    claim: page.headline,
    covers: diseaseNames(page.sections),
    image,
  };
}

export const chronicSubClinics: SubClinic[] = [
  toSubClinic(cardioPage, facility.ultrasoundRoom[0]),
  toSubClinic(renalPage, facility.labRoom[1]),
  toSubClinic(giPage, facility.treatmentRoom[0]),
  toSubClinic(dermPage, facility.examRoom[4]),
  toSubClinic(seniorPage, facility.consultRoom[0]),
];

/** 원고 「2. 만성질환 클리닉」 대표 페이지 */
export const chronicHub = {
  href: "/clinics/chronic",
  title: "만성질환 클리닉",
  headline: "한 번의 완치가 아니라, 긴 시간을 함께 관리합니다",
  lede: "만성질환은 담당 수의사가 처음부터 끝까지 봅니다. 매번 다른 사람에게 처음부터 설명하지 않으셔도 됩니다.",
  description:
    "심혈관계, 신장·비뇨기, 소화기, 피부과, 노령 관리 다섯 개 클리닉을 운영합니다. 만성질환은 담당 수의사가 처음부터 끝까지 봅니다.",
  hero: facility.examRoom[0],
  /** 만성질환을 대하는 방식 — 원고 전체에서 반복되는 태도를 세 가지로 정리 */
  principles: [
    {
      title: "담당이 바뀌지 않습니다",
      body: "만성질환은 지난 몇 달의 변화를 아는 사람이 봐야 판단이 정확해집니다. 한 분의 수의사가 처음부터 끝까지 맡습니다.",
    },
    {
      title: "병기에 맞춰 조절합니다",
      body: "같은 병명이라도 지금 어느 단계인지에 따라 치료 강도와 검사 주기가 달라집니다. 수치가 바뀌면 처방도 바꿉니다.",
    },
    {
      title: "증상 전에 확인합니다",
      body: "만성질환 대부분은 증상이 나타났을 때 이미 진행된 상태입니다. 고위험 품종과 노령 동물은 증상이 없어도 정기 검진을 권합니다.",
    },
  ],
} as const;

export { cardioPage, renalPage, giPage, dermPage, seniorPage };
