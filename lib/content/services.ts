import { facility } from "@/lib/images";
import type { Img } from "@/lib/images";

/**
 * 진료 분야 요약.
 * 홈과 병원 소개 페이지에서 각 클리닉으로 들어가는 입구 역할을 한다.
 * 문구는 각 원고의 대표 카피에서 가져왔다.
 */

export type Service = {
  href: string;
  title: string;
  /** 원고의 대표 카피 */
  claim: string;
  /** 무엇을 보는 곳인지 한 줄 */
  scope: string;
  image: Img;
};

export const services: Service[] = [
  {
    href: "/clinics/chronic",
    title: "만성질환 클리닉",
    claim: "한 번의 완치가 아니라, 긴 시간을 함께 관리합니다",
    scope: "심혈관계 · 신장/비뇨기 · 소화기 · 피부과 · 노령 관리",
    image: facility.examRoom[0],
  },
  {
    href: "/clinics/cat",
    title: "고양이 병원",
    claim: "고양이에게는 고양이를 아는 병원이 필요합니다",
    scope: "ISFM Cat Friendly 인증 · 개와 완전히 분리된 전용 공간",
    image: facility.catWaiting[0],
  },
  {
    href: "/clinics/surgery",
    title: "외과 센터",
    claim: "수술은 쉽게 권하지 않습니다",
    scope: "정형외과 · 일반외과 · 마취 안전 관리",
    image: facility.surgeryRoom[0],
  },
  {
    href: "/clinics/oncology",
    title: "종양 클리닉",
    claim: "암 진단이 끝이 아닙니다",
    scope: "진단과 병기 결정 · 항암 · 완화치료",
    image: facility.consultRoom[0],
  },
  {
    href: "/clinics/dental",
    title: "치과 병원",
    claim: "말 못 하는 아이의 고통, 더 이상 미루지 마세요",
    scope: "스케일링 · 치주 치료 · 발치 · 치과 전용 방사선",
    image: facility.dentalRoom[0],
  },
  {
    href: "/clinics/checkup",
    title: "건강검진 센터",
    claim: "괜찮다는 것을 확인하는 것이 진짜 안심입니다",
    scope: "기본 · 심화 검진 패키지 · 맞춤형 건강검진 리포트",
    image: facility.labRoom[0],
  },
  {
    href: "/clinics/care",
    title: "입원 · 케어 센터",
    claim: "맡겨야 하는 순간이 온다면, 믿을 수 있는 곳이어야 합니다",
    scope: "의료진 상주 · 개·고양이 완전 분리 · 24시간 CCTV",
    image: facility.catHotel[2],
  },
];
