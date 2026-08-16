/**
 * 병원 기본 정보와 전역 내비게이션.
 *
 * 여기 있는 값은 실제 확인된 것만 담는다. 아직 확보하지 못한 항목은
 * `null` 로 두고, UI는 null 을 만나면 해당 줄을 그리지 않는다.
 * 추측한 값을 채워 넣지 않는다 — 병원 연락처는 틀리면 안 되는 정보다.
 */

export const site = {
  name: "신원당동물의료센터",
  nameEn: "SINWONDANG ANIMAL MEDICAL CENTER",
  shortName: "신원당",
  tagline: "진료실 문을 열면, 진심이 보입니다",
  description:
    "경기 고양시 덕양구 원당역 인근 신원당동물의료센터. 만성질환·고양이·외과·종양·치과·건강검진 클리닉을 운영하며 365일 연중무휴로 진료합니다.",
  url: "https://www.sinwondang.co.kr",
} as const;

export const contact = {
  /** 간판과 입구 안내판에서 확인 */
  tel: "031-963-0075",
  telHref: "tel:+82319630075",
  address: "경기 고양시 덕양구 호국로790번길 88 덕산빌딩",
  addressDetail: "1층 유치원·호텔·미용 / 2층 동물의료센터",
  addressShort: "고양시 덕양구 호국로790번길 88",
  /** 온라인 예약 창구는 아직 없다. 값이 생기면 여기만 채우면 된다. */
  naverBooking: null as string | null,
} as const;

/**
 * 외부 채널.
 *
 * 하는 일이 다르므로 종류를 나눠 둔다.
 *   contact — 병원에 말을 거는 창구. 전화 옆에 놓는다.
 *   follow  — 병원이 소식을 올리는 곳. 둘러보는 자리에 놓는다.
 * 같은 무게의 버튼으로 늘어놓으면 무엇을 눌러야 하는지 흐려진다.
 */
export type Channel = {
  key: string;
  label: string;
  href: string;
  /** 이 채널을 눌렀을 때 무엇을 할 수 있는지 */
  blurb: string;
  kind: "contact" | "follow";
};

export const channels: Channel[] = [
  {
    key: "kakao",
    label: "카카오톡 채널",
    href: "https://pf.kakao.com/_pdCgxj",
    blurb: "채팅으로 예약·문의",
    kind: "contact",
  },
  {
    key: "naver-blog",
    label: "네이버 블로그",
    href: "https://blog.naver.com/swdamc",
    blurb: "진료 사례와 건강 정보",
    kind: "follow",
  },
  {
    key: "instagram",
    label: "인스타그램",
    href: "https://www.instagram.com/365sinwondang_a.h/",
    blurb: "병원 소식과 일상",
    kind: "follow",
  },
];

export const contactChannels = channels.filter((c) => c.kind === "contact");
export const followChannels = channels.filter((c) => c.kind === "follow");

export const hours = {
  summary: "365일 연중무휴",
  weekday: "오전 10:00 – 오후 8:00",
  lunch: "오후 12:00 – 오후 1:00",
  lastReception: "오후 7:30",
  note: "예약하시면 대기 시간은 줄고, 진료 시간은 늘어납니다.",
} as const;

export const directions = {
  transit: "지하철 3호선 원당역 6번 출구 도보 3분",
  transitDetail:
    "6번 출구로 나와 횡단보도를 건넌 뒤 ‘성사혁신센터’ 방향으로 내려오시면 됩니다.",
  parking: "건물 뒤편 동물병원 전용 주차구역",
  /** 키 없이 동작하는 임베드. 길찾기는 국내 지도 서비스로 넘긴다. */
  googleEmbedSrc:
    "https://maps.google.com/maps?q=" +
    encodeURIComponent("경기 고양시 덕양구 호국로790번길 88") +
    "&hl=ko&z=17&output=embed",
  kakaoMapUrl:
    "https://map.kakao.com/?q=" +
    encodeURIComponent("경기 고양시 덕양구 호국로790번길 88"),
  naverMapUrl:
    "https://map.naver.com/p/search/" +
    encodeURIComponent("경기 고양시 덕양구 호국로790번길 88"),
} as const;

export const credentials = [
  "ISFM Cat Friendly Clinic 골드 인증",
  "수술 전문 · 심장 진료",
  "치과 진료 · 건강검진",
] as const;

/* ------------------------------------------------------------------ */
/* 내비게이션                                                          */
/* ------------------------------------------------------------------ */

export type NavLink = {
  label: string;
  href: string;
  /** 드롭다운에서 항목을 한 줄로 설명한다. 상위 메뉴에는 붙이지 않는다. */
  blurb?: string;
};

export type NavGroup = {
  label: string;
  href: string;
  children?: NavLink[];
};

export const nav: NavGroup[] = [
  {
    label: "병원 소개",
    href: "/about",
    children: [
      {
        label: "병원 소개",
        href: "/about",
        blurb: "원장 인사말과 진료 철학",
      },
      {
        label: "진료시간 · 오시는 길",
        href: "/about/visit",
        blurb: "연중무휴 진료시간, 주차와 대중교통",
      },
      {
        label: "의료진 소개",
        href: "/about/team",
        blurb: "네 명의 수의사와 각자의 진료 분야",
      },
      {
        label: "병원 시설",
        href: "/about/facility",
        blurb: "대기실부터 수술실까지 공간별 안내",
      },
      {
        label: "의료장비",
        href: "/about/equipment",
        blurb: "영상·수술·검사실 장비 17종",
      },
    ],
  },
  {
    label: "만성질환 클리닉",
    href: "/clinics/chronic",
    children: [
      {
        label: "만성질환 클리닉",
        href: "/clinics/chronic",
        blurb: "담당 수의사가 처음부터 끝까지 봅니다",
      },
      {
        label: "심혈관계 클리닉",
        href: "/clinics/chronic/cardio",
        blurb: "MVD, DCM, HCM, 부정맥",
      },
      {
        label: "신장 · 비뇨기 클리닉",
        href: "/clinics/chronic/renal",
        blurb: "만성 신부전, 방광염, 요석증",
      },
      {
        label: "소화기 클리닉",
        href: "/clinics/chronic/gi",
        blurb: "IBD, 췌장염, 간담도 질환",
      },
      {
        label: "피부과 클리닉",
        href: "/clinics/chronic/derm",
        blurb: "아토피, 식이 알러지, 외이도염",
      },
      {
        label: "노령견 · 노령묘 관리",
        href: "/clinics/chronic/senior",
        blurb: "관절염, 인지기능장애, 말기 돌봄",
      },
    ],
  },
  {
    label: "고양이 병원",
    href: "/clinics/cat",
  },
  {
    label: "외과 센터",
    href: "/clinics/surgery",
    children: [
      {
        label: "외과 센터",
        href: "/clinics/surgery",
        blurb: "수술은 쉽게 권하지 않습니다",
      },
      {
        label: "정형외과",
        href: "/clinics/surgery/orthopedic",
        blurb: "슬개골 탈구, 십자인대, 골절",
      },
      {
        label: "일반외과",
        href: "/clinics/surgery/general",
        blurb: "위장관, 비장, 간담도, 비뇨기",
      },
    ],
  },
  {
    label: "전문 클리닉",
    href: "/clinics/oncology",
    children: [
      {
        label: "종양 클리닉",
        href: "/clinics/oncology",
        blurb: "진단부터 항암, 완화치료까지",
      },
      {
        label: "치과 병원",
        href: "/clinics/dental",
        blurb: "스케일링, 치주 치료, 발치",
      },
      {
        label: "건강검진 센터",
        href: "/clinics/checkup",
        blurb: "기본 · 심화 검진 패키지",
      },
      {
        label: "입원 · 케어 센터",
        href: "/clinics/care",
        blurb: "의료진이 상주하는 입원과 호텔",
      },
    ],
  },
];

/** 푸터의 전체 사이트맵 — 헤더 드롭다운과 같은 데이터를 평평하게 편다. */
export const footerNav = nav.map((group) => ({
  label: group.label,
  links: group.children ?? [{ label: group.label, href: group.href }],
}));
