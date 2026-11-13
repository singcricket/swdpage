/**
 * 컨셉 사진 등록부 — 「사진 촬영 · AI 삽화 기획안」의 컨셉 사진 48컷.
 *
 * 사진 파일을 아래 폴더에 규칙대로 넣기만 하면 정해 둔 자리에 자동으로 나타난다.
 * 파일이 없으면 지금 쓰는 사진(시설 사진)이 그대로 남는다. 코드를 고칠 필요가 없다.
 *
 *   웹용   public/images/photos/photo-CA-1.jpg         ← 사이트가 읽는 곳
 *   원본   public/assets/images/photos/photo-CA-1.jpg  ← 보관용
 *
 * 확장자는 jpg · jpeg · png · webp 중 하나면 된다. 웹용은 긴 변 2,000px 정도로 줄여 넣는다.
 *
 * 자리:
 *   page     페이지 주소
 *   section  "hero"       페이지 맨 위 대표 사진을 바꾼다. 허브의 하위 클리닉 카드 사진도 함께 바뀐다.
 *            "principles" 허브 페이지(만성질환 · 외과 센터)의 「일하는 방식」 섹션
 *            그 밖에는     섹션 id. 섹션 제목 바로 아래에 놓인다.
 *   item     항목 이름. 적으면 그 항목 설명 바로 아래에 놓인다 (「치료 방향」 같은 이름-설명 목록).
 *   focus    프레임에 사진이 잘려 들어갈 때 남길 위치 (CSS object-position). 기본은 가운데.
 *            예: "50% 80%" 는 아래쪽을 남긴다.
 *
 * alt 는 스크린리더·검색엔진이 읽는 사진 설명이다. 실제 사진과 다르면 여기만 고친다.
 */

export type PhotoSpec = {
  /** 기획안 컷 번호. 파일 이름이 된다: photo-CA-1.jpg */
  id: string;
  page: string;
  section: string;
  item?: string;
  focus?: string;
  alt: string;
};

const CHRONIC = "/clinics/chronic";
const CARDIO = "/clinics/chronic/cardio";
const RENAL = "/clinics/chronic/renal";
const GI = "/clinics/chronic/gi";
const DERM = "/clinics/chronic/derm";
const SENIOR = "/clinics/chronic/senior";
const CAT = "/clinics/cat";
const SURGERY = "/clinics/surgery";
const ORTHO = "/clinics/surgery/orthopedic";
const GENERAL = "/clinics/surgery/general";
const ONCOLOGY = "/clinics/oncology";
const DENTAL = "/clinics/dental";
const CHECKUP = "/clinics/checkup";
const CARE = "/clinics/care";

export const photoSpecs: PhotoSpec[] = [
  /* 만성질환 클리닉 소개 */
  { id: "C-1", page: CHRONIC, section: "hero", alt: "수의사와 보호자가 나란히 앉아 모니터의 검사 수치 그래프를 함께 보는 모습. 보호자 무릎에 노령견이 엎드려 있다." },
  { id: "C-2", page: CHRONIC, section: "principles", alt: "여러 달에 걸친 진료 기록을 넘겨 보는 수의사의 손." },

  /* 심혈관계 */
  { id: "CA-1", page: CARDIO, section: "hero", alt: "수의사가 엎드린 소형견의 가슴에 청진기를 대고 눈을 감은 채 심장 소리를 듣는 모습." },
  { id: "CA-2", page: CARDIO, section: "tests", alt: "어두운 초음파실에서 심장 초음파 화면의 빛이 수의사의 얼굴을 비추는 모습." },
  { id: "CA-3", page: CARDIO, section: "symptoms", alt: "잠든 강아지 옆에서 보호자가 휴대폰 타이머로 수면 호흡수를 세는 모습." },

  /* 신장 · 비뇨기 */
  { id: "RE-1", page: RENAL, section: "hero", alt: "노령 고양이가 물그릇에서 물을 마시는 옆모습." },
  { id: "RE-2", page: RENAL, section: "tests", alt: "담요 위에 엎드린 고양이의 앞발에 수의사가 혈압 측정 커프를 채우는 모습." },
  { id: "RE-3", page: RENAL, section: "treatments", item: "수액 관리", alt: "입원실 담요 위에서 수액을 맞으며 편안히 누운 고양이와 수액줄을 정리하는 간호 스태프의 손." },

  /* 소화기 */
  { id: "GI-1", page: GI, section: "hero", alt: "수의사가 서 있는 중형견의 배를 두 손으로 부드럽게 만져 보는 모습." },
  { id: "GI-2", page: GI, section: "treatments", item: "식이 관리", alt: "수의사가 처방식 몇 가지를 테이블에 놓고 보호자에게 차이를 설명하는 손." },
  { id: "GI-3", page: GI, section: "risk", alt: "밥그릇 앞에 엎드려 밥을 먹지 않는 강아지." },

  /* 피부과 */
  { id: "DE-1", page: DERM, section: "hero", alt: "수의사가 장갑 낀 손으로 강아지의 털을 갈라 피부를 살피는 모습." },
  { id: "DE-2", page: DERM, section: "tests", alt: "현미경에 검사 슬라이드를 올리는 수의사의 손." },
  { id: "DE-3", page: DERM, section: "treatments", item: "외이도 관리", alt: "보호자가 강아지 귀에 세정제를 넣는 방법을 수의사가 옆에서 알려주는 모습." },

  /* 노령견 · 노령묘 */
  { id: "SE-1", page: SENIOR, section: "hero", alt: "주둥이가 하얗게 센 노령견의 얼굴을 보호자의 두 손이 감싸는 모습." },
  { id: "SE-2", page: SENIOR, section: "checkup", alt: "수의사가 바닥에 엎드린 노령견 옆에 앉아 뒷다리 관절을 천천히 구부려 보는 모습." },
  { id: "SE-3", page: SENIOR, section: "environment", alt: "미끄럼 방지 매트 위를 걷는 노령견과 소파 옆에 놓인 반려동물 계단." },
  { id: "SE-4", page: SENIOR, section: "hospice", alt: "담요 위에 잠든 노령 고양이의 등에 얹은 보호자의 손." },

  /* 고양이 병원 */
  { id: "CAT-1", page: CAT, section: "hero", alt: "윗부분을 분리한 이동장 안에 앉은 고양이에게 수의사가 그대로 청진기를 대는 모습." },
  { id: "CAT-2", page: CAT, section: "spaces", alt: "고양이 전용 대기실에서 수건을 덮은 이동장 옆에 앉아 기다리는 보호자." },
  { id: "CAT-3", page: CAT, section: "fear-free", alt: "수의사가 고양이를 수건으로 부드럽게 감싸 안은 모습." },
  { id: "CAT-4", page: CAT, section: "fear-free", alt: "진료를 마친 고양이가 수의사 손끝의 간식을 핥는 모습." },
  { id: "CAT-5", page: CAT, section: "guide", alt: "집 거실에 문을 열어 둔 이동장 안 담요 위에 고양이가 스스로 들어가 누워 있는 모습." },

  /* 외과 센터 소개 */
  { id: "SU-1", page: SURGERY, section: "hero", alt: "수술복과 마스크를 갖춘 수의사가 수술등 아래에서 수술을 준비하는 모습." },
  { id: "SU-2", page: SURGERY, section: "principles", alt: "수의사가 보호자에게 X-ray 영상을 가리키며 수술에 대해 설명하는 모습." },

  /* 정형외과 */
  { id: "OR-1", page: ORTHO, section: "hero", alt: "수의사가 소형견의 무릎을 손가락으로 잡고 슬개골 위치를 확인하는 모습." },
  { id: "OR-2", page: ORTHO, section: "assessment", alt: "리드줄을 매고 걷는 강아지를 수의사가 낮은 자세로 관찰하는 보행 평가." },
  { id: "OR-3", page: ORTHO, section: "rehab", alt: "수술 후 회복 중인 강아지가 밸런스 쿠션 위에 서고 스태프가 몸을 가볍게 받쳐 주는 모습." },

  /* 일반외과 */
  { id: "GS-1", page: GENERAL, section: "hero", alt: "수술대를 사이에 두고 두 수의사가 마주 보며 수술하는 모습." },
  { id: "GS-2", page: GENERAL, section: "monitoring", focus: "50% 80%", alt: "마취 담당 스태프가 모니터의 파형을 보며 마취 기록지에 수치를 적는 모습." },
  { id: "GS-3", page: GENERAL, section: "anesthesia", alt: "마취에서 깨어나 따뜻한 담요에 싸인 강아지 곁에서 스태프가 체온을 확인하는 모습." },

  /* 종양 클리닉 */
  { id: "ON-1", page: ONCOLOGY, section: "hero", alt: "진료실에서 수의사가 보호자 쪽으로 몸을 기울여 이야기를 듣는 모습." },
  { id: "ON-2", page: ONCOLOGY, section: "diagnosis", alt: "세포 검사용 주사기와 슬라이드 유리를 정리하는 손." },
  { id: "ON-3", page: ONCOLOGY, section: "treatments", item: "항암 화학요법", alt: "담요 위에 편안히 엎드려 항암 치료를 받는 강아지." },
  { id: "ON-4", page: ONCOLOGY, section: "qol", alt: "잔디 위에서 공을 물고 뛰노는 강아지." },

  /* 치과 병원 */
  { id: "DN-1", page: DENTAL, section: "hero", alt: "수의사가 강아지의 입술을 엄지로 살짝 들어 잇몸을 확인하는 모습." },
  { id: "DN-2", page: DENTAL, section: "why", alt: "스케일링을 마친 강아지가 회복실에서 하품하며 깨어나는 모습." },
  { id: "DN-3", page: DENTAL, section: "home-care", alt: "보호자가 손가락 칫솔로 강아지의 어금니를 닦아 주는 모습." },
  { id: "DN-4", page: DENTAL, section: "risk", alt: "입을 다물고 정면을 바라보는 단두종 강아지의 얼굴." },

  /* 건강검진 센터 */
  { id: "CH-1", page: CHECKUP, section: "hero", alt: "진료대 위의 강아지와 고양이, 체중계를 확인하며 미소 짓는 수의사." },
  { id: "CH-2", page: CHECKUP, section: "advanced", alt: "초음파 검사 중 담요 위에 편안히 누운 강아지의 머리를 스태프가 쓰다듬는 모습." },
  { id: "CH-3", page: CHECKUP, section: "consult", alt: "수의사가 검진 리포트를 펜으로 짚으며 보호자에게 결과를 설명하는 손." },
  { id: "CH-4", page: CHECKUP, section: "booking", alt: "현관에서 강아지에게 리드줄을 채우며 소변 채취 통을 든 보호자." },

  /* 입원 · 케어 센터 */
  { id: "CR-1", page: CARE, section: "hero", alt: "호텔 객실에서 스태프가 무릎을 꿇고 강아지와 눈을 맞추며 쓰다듬는 모습." },
  { id: "CR-2", page: CARE, section: "difference", alt: "수의사가 1층 호텔로 내려와 청진기로 호텔에 머무는 강아지를 살피는 모습." },
  { id: "CR-3", page: CARE, section: "facility", alt: "야외 놀이터 인조잔디 위에서 뛰노는 강아지들." },
  { id: "CR-4", page: CARE, section: "eligibility", alt: "입원 중인 노령견에게 스태프가 손으로 밥을 내밀어 주는 모습." },
  { id: "CR-5", page: CARE, section: "preparation", alt: "입실 준비물 — 담요, 장난감, 사료, 약봉투를 나란히 놓은 모습." },
];
