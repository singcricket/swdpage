/**
 * AI 삽화 등록부 — 「사진 촬영 · AI 삽화 기획안」 IL-01 ~ IL-22.
 *
 * 그림 파일을 아래 폴더에 규칙대로 넣기만 하면 정해 둔 자리에 자동으로 나타난다.
 * 파일이 없으면 그 자리는 아무것도 그리지 않는다. 코드를 고칠 필요가 없다.
 *
 *   웹용   public/images/illustrations/illust-IL-05.png   ← 사이트가 읽는 곳
 *   원본   public/assets/images/illustrations/illust-IL-05.png  ← 보관용
 *
 * 확장자는 png · jpg · jpeg · webp 중 하나면 된다.
 * 가로·세로 크기는 파일에서 직접 읽으므로 적지 않는다.
 *
 * 자리(places):
 *   page    클리닉 페이지 주소 (ClinicPage.href)
 *   section 섹션 id
 *   item    항목 이름. 적으면 그 항목 설명 바로 아래에, 비우면 섹션 제목 아래에 놓인다.
 *           항목 단위는 「주요 진료 질환」「치료 방향」처럼 이름-설명 목록에서만 쓴다.
 *
 * alt 는 화면에 그림 설명(캡션)으로도 보이고, 스크린리더·검색엔진이 읽는다.
 * 그림을 받은 뒤 그림 속 내용과 다르면 여기만 고치면 된다.
 */

export type IllustrationPlace = {
  page: string;
  section: string;
  item?: string;
};

export type IllustrationSpec = {
  /** 기획안 번호. 파일 이름이 된다: illust-IL-01.png */
  id: string;
  alt: string;
  places: IllustrationPlace[];
};

export const illustrationSpecs: IllustrationSpec[] = [
  /* 심혈관계 클리닉 ------------------------------------------------- */
  {
    id: "IL-01",
    alt: "정상 승모판과 승모판 폐쇄부전증 비교. 정상 판막은 완전히 닫히지만, 폐쇄부전에서는 판막이 다 닫히지 않아 혈액이 좌심방으로 역류하고 좌심방이 커진다.",
    places: [
      { page: "/clinics/chronic/cardio", section: "diseases", item: "승모판 폐쇄부전증" },
    ],
  },
  {
    id: "IL-02",
    alt: "고양이 정상 심장과 비대성 심근증 비교. 비대성 심근증에서는 좌심실 벽이 두꺼워지고 좌심실 안쪽 공간이 좁아진다.",
    places: [
      { page: "/clinics/chronic/cardio", section: "diseases", item: "비대성 심근증 / 제한성 심근증" },
      { page: "/clinics/cat", section: "diseases", item: "비대성 심근증" },
    ],
  },
  {
    id: "IL-03",
    alt: "심장병 진행 단계 B1, B2, C, D. 병기가 진행될수록 심장이 커진다.",
    places: [{ page: "/clinics/chronic/cardio", section: "treatments" }],
  },

  /* 신장 · 비뇨기 클리닉 --------------------------------------------- */
  {
    id: "IL-04",
    alt: "만성 신부전 IRIS 병기 1기부터 4기. 병기가 진행될수록 신장이 작아지고 기능하는 부분이 줄어든다.",
    places: [
      { page: "/clinics/chronic/renal", section: "treatments", item: "IRIS 병기별 맞춤 관리" },
    ],
  },
  {
    id: "IL-05",
    alt: "요로 결석이 생길 수 있는 자리. 신장, 요관, 방광, 요도.",
    places: [
      { page: "/clinics/chronic/renal", section: "diseases", item: "요석증 (결석)" },
    ],
  },

  /* 소화기 클리닉 ---------------------------------------------------- */
  {
    id: "IL-06",
    alt: "소화기 장기의 위치. 위, 장, 췌장, 간, 담낭.",
    places: [{ page: "/clinics/chronic/gi", section: "diseases" }],
  },
  {
    id: "IL-07",
    alt: "내시경 검사의 원리. 마취한 상태에서 입으로 내시경을 넣어 배를 가르지 않고 위 안을 살핀다.",
    places: [{ page: "/clinics/chronic/gi", section: "tests" }],
  },

  /* 피부과 클리닉 ---------------------------------------------------- */
  {
    id: "IL-08",
    alt: "개의 귀 구조. 외이도가 L자로 꺾여 있어 안쪽이 잘 마르지 않는다.",
    places: [
      { page: "/clinics/chronic/derm", section: "treatments", item: "외이도 관리" },
    ],
  },
  {
    id: "IL-09",
    alt: "아토피 가려움이 주로 나타나는 부위. 발, 귀, 겨드랑이, 배, 눈과 입 주변.",
    places: [
      { page: "/clinics/chronic/derm", section: "diseases", item: "아토피성 피부염" },
    ],
  },

  /* 노령견 · 노령묘 관리 --------------------------------------------- */
  {
    id: "IL-10",
    alt: "강아지와 고양이가 자라 노령이 되기까지의 나이 흐름.",
    places: [{ page: "/clinics/chronic/senior", section: "age-dog" }],
  },
  {
    id: "IL-11",
    alt: "노령 동물을 위한 집 환경. 미끄럼 방지 매트, 소파 옆 계단, 낮은 화장실, 여러 곳의 물그릇, 야간등.",
    places: [{ page: "/clinics/chronic/senior", section: "environment" }],
  },

  /* 고양이 병원 ------------------------------------------------------ */
  {
    id: "IL-12",
    alt: "윗부분이 분리되는 이동장. 고양이를 꺼내지 않고 이동장 안에서 진찰할 수 있다.",
    places: [{ page: "/clinics/cat", section: "guide" }],
  },
  {
    id: "IL-13",
    alt: "고양이 몸짓 읽기. 편안함, 긴장, 공포에 따라 귀와 눈, 꼬리가 달라진다.",
    places: [{ page: "/clinics/cat", section: "fear-free" }],
  },

  /* 정형외과 --------------------------------------------------------- */
  {
    id: "IL-14",
    alt: "슬개골 탈구 1등급부터 4등급. 등급이 높을수록 무릎뼈가 제자리에서 더 많이 벗어난다.",
    places: [
      { page: "/clinics/surgery/orthopedic", section: "surgeries", item: "슬개골 탈구 교정술" },
    ],
  },
  {
    id: "IL-15",
    alt: "정상 전방 십자인대와 끊어진 십자인대 비교. 인대가 끊어지면 무릎이 앞뒤로 흔들린다.",
    places: [
      { page: "/clinics/surgery/orthopedic", section: "surgeries", item: "십자인대 파열" },
    ],
  },

  /* 일반외과 --------------------------------------------------------- */
  {
    id: "IL-16",
    alt: "삼킨 양말이나 장난감 조각이 장을 막는 모습.",
    places: [
      { page: "/clinics/surgery/general", section: "surgeries", item: "위장관 수술" },
    ],
  },

  /* 종양 클리닉 ------------------------------------------------------ */
  {
    id: "IL-17",
    alt: "종양 진단에서 치료까지. 세포검사, 조직검사, 병기 결정, 치료 계획.",
    places: [{ page: "/clinics/oncology", section: "diagnosis" }],
  },
  {
    id: "IL-18",
    alt: "집에서 볼 수 있는 삶의 질 항목. 식욕, 활동, 통증, 위생, 가족과의 교감.",
    places: [{ page: "/clinics/oncology", section: "qol" }],
  },

  /* 치과 병원 -------------------------------------------------------- */
  {
    id: "IL-19",
    alt: "치주 질환 0등급부터 4등급. 등급이 높을수록 잇몸 아래 치조골이 더 많이 녹는다.",
    places: [{ page: "/clinics/dental", section: "grades" }],
  },
  {
    id: "IL-20",
    alt: "강아지 칫솔질 3단계. 입술 들기, 45도 각도로 잇몸 경계 닦기, 어금니 바깥면 위주로 닦기.",
    places: [{ page: "/clinics/dental", section: "home-care" }],
  },

  /* 건강검진 센터 ---------------------------------------------------- */
  {
    id: "IL-21",
    alt: "나이에 따라 달라지는 검진 주기. 나이가 들수록 검진 간격이 좁아진다.",
    places: [{ page: "/clinics/checkup", section: "cycle" }],
  },

  /* 입원 · 케어 센터 ------------------------------------------------- */
  {
    id: "IL-22",
    alt: "같은 건물 2층은 동물의료센터, 1층은 호텔·유치원·미용. 의료진이 바로 내려올 수 있다.",
    places: [{ page: "/clinics/care", section: "difference" }],
  },
];
