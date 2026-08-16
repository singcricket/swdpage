import { equipment as photos } from "@/lib/images";
import type { Img } from "@/lib/images";

/**
 * 의료장비.
 *
 * 분류와 설명문은 「장비설명」 원고를 그대로 따랐다.
 * 장비명 표기도 원고 표기를 유지한다 — 제품 사진의 각인과 다른 항목이
 * 몇 개 있는데, 어느 쪽이 맞는지는 병원이 확인할 일이지 임의로 고칠 일이 아니다.
 */

export type EquipmentItem = {
  /** 원고 표기 그대로 */
  name: string;
  /** 제조사·모델명 */
  model?: string;
  body: string;
  image: Img;
};

export type EquipmentGroup = {
  id: string;
  title: string;
  summary: string;
  items: EquipmentItem[];
};

export const equipmentGroups: EquipmentGroup[] = [
  {
    id: "imaging",
    title: "진단 영상 장비",
    summary:
      "복부·심장·구강 등 신체 내부를 정밀하게 들여다볼 수 있는 핵심 장비입니다.",
    items: [
      {
        name: "초음파",
        model: "Siemens ACUSON Maple",
        body: "글로벌 의료기업 지멘스의 기술력이 집약된 장비로, 아주 미세한 장기 구조와 미세 혈류의 흐름까지 고해상도 이미지로 선명하게 진단합니다. AI 기술과 원클릭 이미지 최적화 기능(eSieImage)을 통해 검사 대기 및 진행 시간을 획기적으로 줄이고 진단의 정확도를 높였습니다. 빠르고 정교한 검사 프로세스 덕분에 움직임이 많거나 예민한 아이들도 스트레스를 최소화하며 편안하고 안전하게 검사받을 수 있습니다.",
        image: photos.ultrasound,
      },
      {
        name: "디지털 방사선 (X-ray)",
        model: "IRETECH IRE-200HF",
        body: "소형견은 물론 대형견까지 모두 적용 가능하며, 촬영과 영상 처리 속도가 매우 빠릅니다. 고해상도의 디지털 영상은 뼈와 관절, 장기 내부의 상태를 정확하게 보여주며, 빠르고 정확한 진단을 도와줍니다. 진료 속도와 신뢰도를 모두 갖춘 영상 장비로서, 반려동물의 건강 이상 징후를 조기에 파악하는 데 큰 도움이 됩니다.",
        image: photos.xray,
      },
      {
        name: "내시경",
        model: "PENTAX EPM",
        body: "식도부터 위, 십이지장까지 직접 내부를 확인할 수 있어 이물질 제거뿐만 아니라 점막의 염증, 궤양 여부까지 정밀하게 검사할 수 있습니다. 마취하에 진행되는 비침습적 검사로 절개가 필요 없어 회복이 빠르며, 보호자분께도 검사 결과를 영상으로 직접 설명드릴 수 있어 진료의 투명성과 신뢰도를 동시에 높여줍니다.",
        image: photos.endoscope,
      },
    ],
  },
  {
    id: "surgery",
    title: "수술 · 마취 장비",
    summary:
      "수술 중 출혈을 최소화하고 마취 안정성을 높이기 위한 필수 장비입니다.",
    items: [
      {
        name: "호흡 마취기",
        model: "Mindray Veta 5",
        body: "동물용 마취기 최초로 VS 모드가 탑재되어 초소형 반려동물도 안전하게 호흡 마취가 가능합니다. 최소한의 가스 사용으로도 안정적인 마취가 가능하며, 마취 깊이의 미세 조절도 정밀하게 이루어집니다. 자발호흡·환기모드 자동 감지 기능이 있어 수술 중 체계적인 호흡 관리가 가능하며, 마취 중 위험 요소를 줄이는 데 효과적입니다.",
        image: photos.anesthesia,
      },
      {
        name: "환축 모니터",
        model: "Mindray uMEC12 Vet",
        body: "심전도, 산소포화도, 호흡, 체온, 혈압 등 필수 생체 신호를 동시에 모니터링할 수 있는 장비입니다. 동물 특화 알고리즘을 적용해 작은 움직임에도 정확한 수치를 측정할 수 있으며, 하나의 화면에서 다양한 데이터를 확인할 수 있어 수술 중 이상 징후를 빠르게 감지할 수 있습니다.",
        image: photos.monitor,
      },
      {
        name: "혈관 밀봉 장비 (LigaSure)",
        model: "Covidien Valleylab LS10",
        body: "최대 7mm 혈관까지 강하게 밀봉하는 기술이 적용된 전기수술 장비입니다. 절개 부위의 출혈을 거의 없이 마무리할 수 있도록 해 회복 부담을 줄여주며, 주변 조직 손상을 최소화해 수술 후 통증과 회복 기간을 줄이는 데 효과적입니다. 외과 수술의 정밀성과 안전성을 함께 확보할 수 있는 필수 장비입니다.",
        image: photos.ligasure,
      },
      {
        name: "전기수술기기",
        model: "Zerone Zeus",
        body: "조직을 빠르고 정확하게 절개하면서 동시에 출혈을 최소화할 수 있어, 수술 시간을 단축시키고 회복 부담을 줄이는 데 효과적입니다. 고출력이 필요한 부위부터 섬세한 절개가 필요한 부위까지 안전하고 정밀하게 조작할 수 있어 다양한 수술 상황에 유연하게 대응할 수 있습니다. 출혈이 적고 절개 부위 손상이 최소화되기 때문에 반려동물의 통증과 회복 기간도 줄일 수 있습니다.",
        image: photos.electrosurgery,
      },
    ],
  },
  {
    id: "laboratory",
    title: "검사실 장비",
    summary:
      "혈액 및 생화학 분석을 통해 질병을 조기에 발견하고 정확히 진단할 수 있도록 돕는 핵심 장비입니다. 원내 검사로 당일 결과 확인이 가능합니다.",
    items: [
      {
        name: "혈청화학 분석기",
        model: "IDEXX Catalyst One",
        body: "간 기능, 신장 기능, 전해질 균형, 혈당 등 다양한 항목을 단시간에 분석할 수 있는 혈청화학 분석 장비입니다.",
        image: photos.labCatalystOne,
      },
      {
        name: "생화학 분석기",
        model: "Fuji NX600i",
        body: "31가지 항목을 자동 분석할 수 있는 고성능 장비로, 간 기능, 고지혈증, 신장 기능, 당뇨, 갑상선 관련 수치까지 폭넓게 확인할 수 있습니다.",
        image: photos.labFujiNx600,
      },
      {
        name: "혈구혈액 검사기",
        model: "Procyte ONE",
        body: "혈액 속 적혈구, 백혈구, 혈소판을 정밀하게 분석하여 감염, 빈혈, 염증 등 다양한 질환을 빠르게 파악할 수 있는 장비입니다. 정확하고 세밀한 분석이 가능해 초기 증상이 뚜렷하지 않은 질환까지 조기 발견할 수 있다는 점이 큰 장점입니다.",
        image: photos.labProcyteOne,
      },
      {
        name: "혈액가스 분석기",
        model: "IDEXX VetStat",
        body: "pH, 전해질, 산소·이산화탄소 분압 등 혈액가스 분석을 통해 중환자 및 응급환자의 상태를 빠르게 파악할 수 있도록 도와주는 장비입니다.",
        image: photos.labVetStat,
      },
      {
        name: "호르몬 및 특수 검사기",
        model: "BIOLINE Vcheck V200",
        body: "갑상선 호르몬 및 코티솔, SDMA, CRP 등 호르몬 검사를 비롯하여 신장질환, 심장질환, 췌장염에 대한 진단 마커 등 다양한 특수 혈액검사를 실시할 수 있는 장비입니다.",
        image: photos.labVcheck,
      },
    ],
  },
  {
    id: "dental",
    title: "치과 장비",
    summary:
      "치아 구조와 구강 건강 상태를 세밀하게 파악하고 정밀한 처치가 가능하도록 돕는 치과 전용 장비입니다.",
    items: [
      {
        name: "치과 전용 방사선",
        model: "REMI REMEX",
        body: "반려동물 치과용 방사선 장비로, 외부에서 보이지 않는 치아 뿌리와 치조골 상태를 고해상도로 확인할 수 있습니다. 움직임에도 흔들림 없는 선명한 영상을 제공해 진단의 정확도를 높이며, 수의사가 치료 계획을 빠르게 수립하는 데 큰 도움을 줍니다.",
        image: photos.dentalXray,
      },
      {
        name: "덴탈 머신",
        model: "Hanilinus Dolce",
        body: "스케일링부터 발치까지 하나의 장비로 통합된 치과 치료가 가능한 장비입니다. 초정밀 수압 제어 시스템을 통해 치아에 가해지는 손상을 최소화하고, 마취 시간을 줄여 회복 시간을 단축할 수 있어 반려동물의 부담을 줄이는 데 유리합니다. 특히 잇몸이 약한 고령 반려동물에게도 안전한 진료를 제공할 수 있습니다.",
        image: photos.dentalUnit,
      },
      {
        name: "치과 광중합기",
        model: "DTE",
        body: "레진, 복합레진, 접착제 등 치과용 재료를 빠르게 경화시켜주는 장비로 치료 시간을 단축시켜줍니다. 짧은 시술 시간은 곧 마취 시간 단축으로 이어져 반려동물의 전신 컨디션 회복에 긍정적인 영향을 미칩니다. 세밀한 치과 치료가 필요한 상황에서 매우 유용하게 활용되고 있습니다.",
        image: photos.dentalCuring,
      },
    ],
  },
  {
    id: "support",
    title: "진단 보조 장비",
    summary:
      "특정 구조나 이물 검사 등 필요에 따라 정밀 진단을 도와주는 장비입니다.",
    items: [
      {
        name: "검이경",
        model: "CMS Smart ENT Scope",
        body: "1920×1080 Full HD 영상으로 귀, 비강, 인후부를 선명하게 관찰할 수 있는 검이경입니다. 탈부착이 가능한 다양한 렌즈를 통해 피부, 각막, 치아 등 여러 부위의 영상 촬영이 가능하며, 보호자에게 화면을 함께 보여주며 설명할 수 있어 진료 신뢰도를 높여줍니다.",
        image: photos.otoscope,
      },
    ],
  },
];

export const equipmentCount = equipmentGroups.reduce(
  (total, group) => total + group.items.length,
  0,
);
