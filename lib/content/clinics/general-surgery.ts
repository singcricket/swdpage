import type { ClinicPage } from "@/lib/content/types";
import { equipment, facility } from "@/lib/images";

/** 원고 「4-2. 일반외과」 */
export const generalSurgeryPage: ClinicPage = {
  href: "/clinics/surgery/general",
  title: "일반외과",
  eyebrow: "외과 센터",
  headline: "수술 전부터 회복까지, 곁에서 지켜봅니다",
  lede: "배 안에서 일어나는 일은 겉으로 보이지 않습니다. 그렇기 때문에 더 정확한 진단과 신중한 판단이 필요합니다. 신원당 일반외과는 수술 전 충분한 검사와 평가를 바탕으로 가장 안전하고 효과적인 방법을 선택합니다. 수술 후 회복까지 의료진이 함께 지켜봅니다.",
  description:
    "위장관·비장·간담도·탈장·제왕절개·비뇨기 수술을 시행합니다. 심전도, 산소포화도, 호기말 이산화탄소, 혈압, 체온을 수술 전 과정에 걸쳐 실시간 모니터링합니다.",
  hero: facility.surgeryRoom[2],
  sections: [
    {
      kind: "diseases",
      id: "surgeries",
      title: "주요 수술",
      items: [
        {
          name: "위장관 수술",
          body: "이물 섭취로 인한 장폐쇄, 장중첩, 위확장-꼬임증후군(GDV) 등 응급 상황부터 장 절제·문합술까지 진행합니다. 위확장-꼬임증후군은 즉각적인 처치가 생명을 좌우합니다.",
        },
        {
          name: "비장 수술",
          body: "비장 종양이나 비장 파열로 인한 내출혈 등에서 비장 절제술을 시행합니다. 혈관육종 등 악성 종양의 경우 종양 클리닉과 연계하여 치료 방향을 결정합니다.",
        },
        {
          name: "간담도 수술",
          body: "담낭 점액종, 담석, 간 종양 등에 대한 수술을 진행합니다. 담낭 점액종은 파열 전 수술이 예후에 결정적입니다.",
        },
        {
          name: "탈장 교정술",
          body: "서혜부 탈장, 회음부 탈장, 배꼽 탈장 등 다양한 탈장을 교정합니다.",
        },
        {
          name: "제왕절개",
          body: "난산 또는 계획 제왕절개가 필요한 경우 시행합니다. 어미와 새끼 모두의 안전을 최우선으로 합니다.",
        },
        {
          name: "비뇨기 수술",
          body: "요로 결석, 방광 종양, 요도 폐쇄 등 비뇨기 질환에 대한 외과적 처치를 진행합니다. 방광절개술(Cystotomy)은 방광 내 결석 제거 또는 방광 종양 절제 시, 요도루 조성술(Urethrostomy)은 요도 폐쇄가 반복되거나 요도가 심하게 좁아진 경우 시행합니다. 신장 적출술(Nephrectomy)은 신장 기능 회복이 불가능한 경우에 한하며, 반드시 반대쪽 신장 기능을 사전에 확인한 후 진행합니다.",
        },
      ],
    },
    {
      kind: "treatments",
      id: "anesthesia",
      title: "마취 안전 관리",
      intro: "수술에서 마취는 집도만큼 중요합니다.",
      items: [
        {
          name: "수술 전 평가",
          body: "혈액검사, 흉부 방사선, 심전도 등 수술 전 검사를 통해 마취 위험도를 사전에 파악합니다.",
        },
        {
          name: "수술 후 회복 관리",
          body: "마취에서 깨어나는 회복 과정도 집중 모니터링합니다. 완전히 안정될 때까지 의료진이 곁에서 지켜봅니다.",
        },
        {
          name: "고위험 환자 마취",
          body: "노령 동물, 심장 질환, 호흡기 질환 등 마취 위험도가 높은 환자는 더욱 세밀하게 계획하고 관리합니다.",
        },
      ],
      note: "마취가 걱정되신다면 수술 전 상담에서 충분히 여쭤보세요. 저희는 보호자분이 이해하고 안심할 수 있을 때까지 설명해 드립니다.",
    },
    {
      kind: "tests",
      id: "monitoring",
      title: "마취 중 모니터링",
      intro: "수술 전 과정에 걸쳐 다음 항목을 실시간으로 확인합니다.",
      rows: [
        { name: "심전도 (ECG)", detail: "심장 리듬 실시간 확인" },
        { name: "산소포화도 (SpO₂)", detail: "산소 공급 상태 확인" },
        { name: "호기말 이산화탄소 (EtCO₂)", detail: "호흡 적정성 확인" },
        { name: "혈압", detail: "순환 상태 실시간 확인" },
        { name: "체온", detail: "저체온 예방 및 관리" },
      ],
    },
    {
      kind: "equipment",
      id: "equipment",
      title: "수술 · 마취 장비",
      intro: "출혈을 줄이는 혈관 밀봉 장비와 마취 모니터링 장비를 갖추고 있습니다.",
      items: [equipment.ligasure, equipment.electrosurgery, equipment.anesthesia, equipment.monitor],
    },
    {
      kind: "photos",
      id: "space-photos",
      title: "수술과 회복 공간",
      intro: "수술을 마친 아이는 마취에서 깨어나 안정될 때까지 입원실에서 지켜봅니다.",
      images: [facility.surgeryRoom[1], facility.ward[1]],
    },
    {
      kind: "symptoms",
      id: "symptoms",
      title: "이런 증상이 있다면 내원을 권장합니다",
      items: [
        { text: "이물을 삼킨 것이 의심된다" },
        {
          text: "구토가 반복되고 아무것도 못 먹는다",
          hint: "응급일 수 있습니다",
          urgent: true,
        },
        { text: "배가 갑자기 부풀어 올랐다", urgent: true },
        { text: "피부나 몸에 혹이 생겼다" },
        { text: "항문 주변이 부어있거나 탈출이 있다" },
      ],
    },
  ],
};
