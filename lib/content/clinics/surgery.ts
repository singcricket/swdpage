import type { ClinicPage, Section } from "@/lib/content/types";
import type { Img } from "@/lib/images";
import { equipment, facility } from "@/lib/images";

import { orthopedicPage } from "./orthopedic";
import { generalSurgeryPage } from "./general-surgery";

type SubClinic = {
  href: string;
  title: string;
  claim: string;
  covers: string[];
  image: Img;
};

/** 하위 페이지의 「주요 수술」 목록을 그대로 가져온다. */
function surgeryNames(sections: Section[], limit = 5) {
  const list = sections.find((section) => section.kind === "diseases");
  if (!list || list.kind !== "diseases") return [];
  return list.items.slice(0, limit).map((item) => item.name);
}

/** 카드 사진은 하위 페이지 히어로를 그대로 쓴다. 두 곳이 어긋나지 않게. */
function toSubClinic(page: ClinicPage): SubClinic {
  return {
    href: page.href,
    title: page.title,
    claim: page.headline,
    covers: surgeryNames(page.sections),
    image: page.hero,
  };
}

export const surgerySubClinics: SubClinic[] = [
  toSubClinic(orthopedicPage),
  toSubClinic(generalSurgeryPage),
];

/** 원고 「4. 외과 센터」 대표 페이지 */
export const surgeryHub = {
  href: "/clinics/surgery",
  title: "외과 센터",
  headline:
    "수술은 쉽게 권하지 않습니다. 하지만 필요한 수술 앞에서는 물러서지 않습니다",
  lede: "수술은 보호자에게도, 아이에게도 큰 결정입니다. 저희는 수술이 꼭 필요한지 먼저 고민합니다. 내과적 치료로 해결할 수 있다면 그 방향을 먼저 찾습니다. 하지만 수술이 필요하다고 판단되면, 그때는 물러서지 않습니다.",
  description:
    "정형외과와 일반외과를 운영합니다. 신중한 판단과 정확한 집도, 두 가지를 함께 지킵니다. 마취는 수술 전 과정에 걸쳐 다섯 항목을 실시간 모니터링합니다.",
  hero: facility.surgeryRoom[0],
  principles: [
    {
      title: "먼저 수술을 피할 길을 찾습니다",
      body: "내과적 치료로 해결할 수 있다면 그 방향을 먼저 봅니다. 등급이 높아도 무증상이면 경과 관찰을 택하는 경우가 있습니다.",
    },
    {
      title: "평가를 마친 뒤에 결정합니다",
      body: "신체검사, 영상, 혈액검사, 보호자 상담을 거쳐 수술 계획을 확정합니다. 마지막 결정은 보호자와 함께 합니다.",
    },
    {
      title: "마취를 집도만큼 중요하게 봅니다",
      body: "심전도·산소포화도·호기말 이산화탄소·혈압·체온을 수술 내내 확인하고, 마취에서 깨어나 안정될 때까지 곁을 지킵니다.",
    },
  ],
  /** 「마취를 집도만큼」을 뒷받침하는 장비 */
  equipment: [equipment.anesthesia, equipment.monitor],
} as const;

export { orthopedicPage, generalSurgeryPage };
