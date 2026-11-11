/**
 * 이미지 카탈로그
 *
 * `public/images/` 아래의 웹 최적화본만 참조한다.
 * 원본은 `public/assets/` 에 그대로 있으며(약 646MB) 사이트에서 직접 쓰지 않는다.
 * 재생성 스크립트: `scripts/build-assets.sh`
 */

export type Img = {
  /** public 기준 절대 경로 */
  src: string;
  /** 스크린리더·SEO용 대체 텍스트. 비워두지 말 것 */
  alt: string;
  /** 원본 픽셀 치수. RectImage의 ratio="auto"처럼 크롭 없이 원본 비율대로 배치할 때 필요 */
  width?: number;
  height?: number;
};

const f = (name: string, alt: string): Img => ({
  src: `/images/facility/${name}`,
  alt,
});

/* ------------------------------------------------------------------ */
/* 브랜드                                                              */
/* ------------------------------------------------------------------ */

export const brand = {
  /** 심볼 마크 (人 + 청진기 + 고양이 + 십자) */
  symbol: { src: "/images/brand/symbol.png", alt: "신원당동물의료센터 심볼" },
  /** 가로 조합형 로고 */
  logoHorizontal: {
    src: "/images/brand/logo-horizontal.png",
    alt: "신원당동물의료센터",
  },
  /** 세로 조합형 로고 */
  logoStacked: {
    src: "/images/brand/logo-stacked.png",
    alt: "신원당동물의료센터",
  },
  /** 모토 카드 이미지 */
  mottoCard: {
    src: "/images/brand/motto-card.png",
    alt: "신뢰와 따뜻함을 담아 원칙을 지키며 당신의 소중한 가족을 돌보겠습니다",
  },
  /** 건물 외관 (야간) */
  buildingNight: {
    src: "/images/brand/building-night.jpg",
    alt: "야간에 불이 켜진 신원당동물의료센터 건물 외관",
  },
  /** 간판 클로즈업 */
  signboard: {
    src: "/images/brand/signboard.jpg",
    alt: "신원당동물의료센터 간판",
  },
  /**
   * 병원이 만든 약도. 원본 아래쪽에 붙어 있던 주소·층·주차 안내 패널은
   * 잘라냈다 — 그 내용은 「오시는 길」 페이지에 HTML 텍스트로 있고,
   * 이미지에 박힌 글자는 스크린리더도 검색엔진도 읽지 못한다.
   */
  routeMap: {
    src: "/images/brand/route-map.png",
    alt: "원당역 6번 출구에서 신원당동물의료센터까지의 약도. 6번 출구로 나와 횡단보도를 건너 성사혁신센터 방향으로 내려오면 도보 3분 거리이며, 주차장은 건물 뒤편에 있습니다.",
  },
} satisfies Record<string, Img>;

/* ------------------------------------------------------------------ */
/* 의료진                                                              */
/*                                                                     */
/* 원본은 이름·경력 카피가 이미지에 박힌 완성 배너였다. 검색엔진이 읽지  */
/* 못하고 모바일에서 글씨가 뭉개져서, 인물 영역만 크롭해 인물 사진으로   */
/* 쓰고 텍스트는 HTML로 다시 조판한다. (크롭 좌표는 build-assets.sh)     */
/* ------------------------------------------------------------------ */

export const team = {
  choiYunho: {
    src: "/images/team/choi-yunho2.png",
    alt: "대표원장 최윤호",
    width: 606,
    height: 900,
  },
  kimBangchang: {
    src: "/images/team/kim-bangchang3.png",
    alt: "원장 김방창",
    width: 606,
    height: 900,
  },
  leeNayoung: {
    src: "/images/team/lee-nayoung2.png",
    alt: "부원장 이나영",
    width: 606,
    height: 900,
  },
  kimMincheol: {
    src: "/images/team/kim-mincheol.png",
    alt: "진료과장 김민철",
    width: 606,
    height: 900,
  },
} satisfies Record<string, Img>;

/* ------------------------------------------------------------------ */
/* 의료장비                                                            */
/* ------------------------------------------------------------------ */

export const equipment = {
  xray: {
    src: "/images/equipment/xray-ire-200hf.jpg",
    alt: "디지털 방사선 장비 IRETECH IRE-200HF",
  },
  ultrasound: {
    src: "/images/equipment/ultrasound-acuson-maple.jpg",
    alt: "초음파 장비 Siemens ACUSON Maple",
  },
  endoscope: {
    src: "/images/equipment/endoscope-pentax-epm.jpg",
    alt: "내시경 장비 PENTAX EPM",
  },
  anesthesia: {
    src: "/images/equipment/anesthesia-mindray-veta5.jpg",
    alt: "호흡 마취기 Mindray Veta 5",
  },
  monitor: {
    src: "/images/equipment/monitor-mindray-umec12.jpg",
    alt: "환축 모니터 Mindray uMEC12 Vet",
  },
  ligasure: {
    src: "/images/equipment/ligasure-valleylab-ls10.jpg",
    alt: "혈관 밀봉 전기수술 장비 Covidien Valleylab LS10 (LigaSure)",
  },
  ligasureHandpiece: {
    src: "/images/equipment/ligasure-ls10.jpg",
    alt: "LigaSure 전기수술 장비",
  },
  electrosurgery: {
    src: "/images/equipment/electrosurgery-zerone-zeus.png",
    alt: "전기수술기기 Zerone Zeus",
  },
  dentalXray: {
    src: "/images/equipment/dental-xray-remex.png",
    alt: "치과 전용 방사선 장비 REMEDI REMEX",
  },
  dentalUnit: {
    src: "/images/equipment/dental-unit-hanilinus-dolce.jpg",
    alt: "덴탈 머신 Hanilinus Dolce",
  },
  dentalCuring: {
    src: "/images/equipment/dental-curing-dte-lux.jpg",
    alt: "치과 광중합기 DTE",
  },
  labCatalystOne: {
    src: "/images/equipment/lab-idexx-catalyst-one.jpg",
    alt: "혈청화학 분석 장비 IDEXX Catalyst One",
  },
  labFujiNx600: {
    src: "/images/equipment/lab-fuji-nx600i.png",
    alt: "생화학 분석기 Fuji NX600i",
  },
  labProcyteOne: {
    src: "/images/equipment/lab-procyte-one.jpg",
    alt: "혈구혈액 검사기 Procyte ONE",
  },
  labVetStat: {
    src: "/images/equipment/lab-idexx-vetstat.jpg",
    alt: "혈액가스 분석기 IDEXX VetStat",
  },
  labVcheck: {
    src: "/images/equipment/lab-bionote-vcheck-v200.jpg",
    alt: "호르몬 및 특수 검사기 BIONOTE Vcheck V200",
  },
  otoscope: {
    src: "/images/equipment/otoscope-cms-smart-ent.png",
    alt: "검이경 CMS Smart ENT Scope",
  },
} satisfies Record<string, Img>;

/* ------------------------------------------------------------------ */
/* 시설                                                                */
/* ------------------------------------------------------------------ */

export const facility = {
  /** 건물 정면 (주간) */
  exterior: [f("exterior-01.jpg", "신원당동물의료센터 건물 정면")],

  /** 병원 입구 계단·출입문 */
  entrance: [
    f("entrance-01.jpg", "신원당동물의료센터 2층 입구"),
    f("entrance-02.jpg", "신원당동물의료센터 입구 사인"),
    f("entrance-03.jpg", "신원당동물의료센터 출입문"),
  ],

  /** 입구 진료 안내판 (진료과목·진료시간·전화번호) */
  entranceInfo: [
    f("entrance-info-01.jpg", "진료과목과 진료시간이 적힌 입구 안내판"),
  ],

  /** 모토가 새겨진 벽면 그래픽 */
  mottoWall: [
    f(
      "motto-wall-01.jpg",
      "「신뢰와 따뜻함을 담아 원칙을 지키며 당신의 소중한 가족을 돌보겠습니다」 벽면 그래픽",
    ),
  ],

  /** 병원 로비 전경 */
  lobby: [
    f("lobby-01.jpg", "곡선 데스크와 진열장이 있는 병원 로비"),
    f("lobby-02.jpg", "병원 로비 전경"),
    f("lobby-03.jpg", "리셉션에서 바라본 로비"),
    f("lobby-04.jpg", "아치형 창이 있는 로비"),
    f("lobby-05.jpg", "로비와 대기 공간"),
    f("lobby-06.jpg", "로비 전경"),
    f("lobby-07.jpg", "밝은 조명의 로비"),
    f("lobby-08.jpg", "로비에서 바라본 대기 공간"),
  ],

  /** 접수 데스크 */
  reception: [
    f("reception-01.jpg", "곡선형 접수 데스크"),
    f("reception-02.jpg", "접수 데스크와 진료실 입구"),
    f("reception-03.jpg", "간접조명이 들어간 접수 데스크"),
    f("reception-04.jpg", "접수 데스크와 병원 사인"),
    f("reception-05.jpg", "접수 데스크"),
    f("reception-06.jpg", "병원 사인이 걸린 접수 공간"),
    f("reception-07.jpg", "접수 데스크 정면"),
    f("reception-08.jpg", "접수 데스크와 대기 통로"),
    f("reception-09.jpg", "접수 데스크 측면"),
  ],

  /** 대기실 (일반) */
  waiting: [
    f("waiting-01.jpg", "아치형 창과 곡선 벤치가 있는 대기실"),
    f("waiting-02.jpg", "대기실 소파와 진열장"),
    f("waiting-03.jpg", "대기실 전경"),
    f("waiting-04.jpg", "창가 벤치가 있는 대기실"),
    f("waiting-05.jpg", "대기실과 TV"),
    f("waiting-06.jpg", "제품 진열장이 있는 대기 공간"),
    f("waiting-07.jpg", "대기실 벤치"),
    f("waiting-08.jpg", "밝은 대기실 전경"),
    f("waiting-09.jpg", "대기실 좌석"),
    f("waiting-10.jpg", "아치창 너머로 보이는 대기 공간"),
    f("waiting-11.jpg", "야간 조명의 대기실"),
    f("waiting-12.jpg", "대기실과 진료실 통로"),
    f("waiting-13.jpg", "대기실 전경"),
    f("waiting-14.jpg", "곡선 벤치가 있는 대기 라운지"),
    f("waiting-15.jpg", "대기 라운지"),
  ],

  /** 대기실 디테일 컷 */
  waitingDetail: [
    f("waiting-detail-01.jpg", "대기실 벤치 위 화분"),
    f("waiting-detail-02.jpg", "대기실 제품 진열장"),
  ],

  /** 고양이 전용 대기실 (ISFM Cat Friendly Clinic) */
  catWaiting: [
    f("cat-waiting-01.jpg", "Cat Friendly Clinic 사인이 있는 고양이 전용 대기실"),
    f("cat-waiting-02.jpg", "고양이 전용 대기실 벤치"),
    f("cat-waiting-03.jpg", "조용한 조명의 고양이 전용 대기 공간"),
    f("cat-waiting-04.jpg", "고양이 전용 대기실 전경"),
    f("cat-waiting-05.jpg", "고양이 전용 대기실 코너"),
    f("cat-waiting-06.jpg", "고양이 전용 대기실 디테일"),
  ],

  /** 진료실 */
  examRoom: [
    f("exam-room-01.jpg", "상담 테이블이 있는 진료실"),
    f("exam-room-02.jpg", "진료실 데스크"),
    f("exam-room-03.jpg", "진료실 데스크 디테일"),
    f("exam-room-04.jpg", "진료실 전경"),
    f("exam-room-05.jpg", "모니터가 설치된 진료실"),
  ],

  /** 1층 호텔·유치원 상담실 */
  consultRoom: [
    f("consult-room-01.jpg", "1층 호텔·유치원 보호자 상담실"),
    f("consult-room-02.jpg", "상담 테이블이 놓인 1층 상담실"),
  ],

  /** 처치실 */
  treatmentRoom: [
    f("treatment-room-01.jpg", "무영등과 처치대가 있는 처치실"),
    f("treatment-room-02.jpg", "처치실 전경"),
    f("treatment-room-03.jpg", "처치 준비 공간"),
    f("treatment-room-04.jpg", "약품과 기구가 정리된 처치실"),
    f("treatment-room-05.jpg", "처치실 중앙 작업대"),
    f("treatment-room-06.jpg", "소모품이 정리된 처치 준비실"),
  ],

  /** 치과실 */
  dentalRoom: [
    f("dental-room-01.jpg", "치과 무영등과 덴탈 유닛이 있는 치과실"),
    f("dental-room-02.jpg", "덴탈 머신과 마취 장비가 있는 치과실"),
    f("dental-room-03.jpg", "치과실 전경"),
  ],

  /** 수술실 */
  surgeryRoom: [
    f("surgery-room-01.jpg", "두 개의 무영등이 설치된 수술실"),
    f("surgery-room-02.jpg", "수술대와 모니터가 있는 수술실"),
    f("surgery-room-03.jpg", "수술실 전경"),
  ],

  /** 방사선실 */
  xrayRoom: [
    f("xray-room-01.jpg", "X-ray실 출입문"),
    f("xray-room-02.jpg", "촬영대와 방호복이 있는 방사선실"),
  ],

  /** 초음파 / 안과 검사실 */
  ultrasoundRoom: [
    f("ultrasound-room-01.jpg", "초음파 장비가 놓인 검사실"),
    f("ultrasound-room-02.jpg", "초음파·안과 검사실 전경"),
  ],

  /** 진료 구역 복도 */
  corridor: [f("corridor-01.jpg", "안과실·초음파실로 이어지는 진료 구역 복도")],

  /** 임상병리실 */
  labRoom: [
    f("lab-room-01.jpg", "현미경과 분석 장비가 있는 임상병리실"),
    f("lab-room-02.jpg", "임상병리실 전경"),
  ],

  /** 약제실 */
  pharmacy: [f("pharmacy-01.jpg", "약품이 정리된 약제실")],

  /** 입원실 */
  ward: [
    f("ward-01.jpg", "개별 입원 케이지가 배치된 입원실"),
    f("ward-02.jpg", "입원실 전경"),
  ],

  /** 보호자 편의 공간 (급수대 등) */
  amenity: [
    f("amenity-01.jpg", "정수기와 물그릇이 준비된 보호자 편의 공간"),
    f("amenity-02.jpg", "급수 코너"),
    f("amenity-03.jpg", "물그릇 스테이션 디테일"),
  ],

  /** 인증서·수료증 */
  certificates: [f("certificates-01.jpg", "진열된 학회 수료증과 인증서")],

  /** 1층 올래 반려동물 유치원·호텔 라운지 */
  hotelLobby: [
    f("hotel-lobby-01.jpg", "1층 유치원·호텔 라운지"),
    f("hotel-lobby-02.jpg", "유치원·호텔 프론트 데스크"),
    f("hotel-lobby-03.jpg", "올래 반려동물 유치원 & 호텔 사인"),
    f("hotel-lobby-04.jpg", "유치원·호텔 라운지 전경"),
    f("hotel-lobby-05.jpg", "프론트 데스크와 대기 벤치"),
    f("hotel-lobby-06.jpg", "라운지 진열장"),
    f("hotel-lobby-07.jpg", "유치원·호텔 입구"),
    f("hotel-lobby-08.jpg", "유치원·호텔 라운지 야간"),
  ],

  /** 미용실 */
  grooming: [
    f("grooming-01.jpg", "미용실 입구"),
    f("grooming-02.jpg", "미용실로 이어지는 복도"),
    f("grooming-03.jpg", "그루밍룸 통로"),
    f("grooming-04.jpg", "미용·목욕 공간"),
  ],

  /** 고양이 호텔 */
  catHotel: [
    f("cat-hotel-01.jpg", "CAT HOTEL 사인이 있는 고양이 호텔 입구"),
    f("cat-hotel-02.jpg", "고양이 호텔 안내 사인"),
    f("cat-hotel-03.jpg", "유리로 분리된 개별 고양이 객실"),
    f("cat-hotel-04.jpg", "고양이 호텔 개별 객실"),
    f("cat-hotel-05.jpg", "은신처가 마련된 고양이 객실"),
    f("cat-hotel-06.jpg", "고양이 호텔 복도"),
    f("cat-hotel-07.jpg", "고양이 전용 객실 출입문"),
  ],

  /** 강아지 호텔 */
  dogHotel: [
    f("dog-hotel-01.jpg", "개별 객실이 배치된 강아지 호텔"),
    f("dog-hotel-02.jpg", "강아지 호텔 객실"),
    f("dog-hotel-03.jpg", "야외 놀이터로 이어지는 강아지 호텔"),
  ],

  /** 야외 놀이터 */
  playground: [
    f("playground-01.jpg", "PLAYGROUND 사인이 걸린 야외 놀이터 입구"),
    f("playground-02.jpg", "인조잔디가 깔린 야외 놀이터"),
    f("playground-03.jpg", "야간 조명이 켜진 야외 놀이터"),
    f("playground-04.jpg", "야외 놀이터 전경"),
    f("playground-05.jpg", "나무가 보이는 야외 놀이터"),
    f("playground-06.jpg", "실내와 이어진 야외 놀이터"),
  ],

  /** 의료진 휴게 공간 */
  staffRoom: [f("staff-room-01.jpg", "의료진 휴게 공간")],
} satisfies Record<string, Img[]>;

/** 페이지 히어로에 자주 쓰는 대표 컷 */
export const hero = {
  home: facility.exterior[0],
  about: facility.mottoWall[0],
  visit: facility.entrance[0],
  facility: facility.lobby[0],
  equipment: facility.treatmentRoom[3],
  chronic: facility.examRoom[0],
  cat: facility.catWaiting[0],
  surgery: facility.surgeryRoom[0],
  oncology: facility.examRoom[1],
  dental: facility.dentalRoom[0],
  checkup: facility.labRoom[0],
  care: facility.catHotel[2],
} satisfies Record<string, Img>;

/* ------------------------------------------------------------------ */
/* 건강검진 리포트 예시 (건강검진 센터 「신원당 건강검진 리포트」)        */
/* ------------------------------------------------------------------ */

/** 실제 발송되는 리포트를 캡처한 것. 순서대로 넘겨 본다. */
export const checkupReport: Img[] = [
  { src: "/images/report/report-1.png", alt: "건강검진 리포트 1쪽 예시 — 표지, 종합 건강검진 결과 보고서", width: 3784, height: 2004 },
  { src: "/images/report/report-2.png", alt: "건강검진 리포트 2쪽 예시 — 품종 · 나이 · 성별 기반 리스크 분석", width: 3794, height: 2124 },
  { src: "/images/report/report-3.png", alt: "건강검진 리포트 3쪽 예시 — 나이에 맞춘 관리 포인트", width: 3784, height: 2110 },
  { src: "/images/report/report-4.png", alt: "건강검진 리포트 4쪽 예시 — 신체검사: 체중과 신체충실지수(BCS)", width: 3794, height: 2114 },
  { src: "/images/report/report-5.png", alt: "건강검진 리포트 5쪽 예시 — 신체검사: 피부 · 구강 · 이과", width: 3800, height: 2112 },
  { src: "/images/report/report-6.png", alt: "건강검진 리포트 6쪽 예시 — 혈액검사: CBC 백혈구 계열", width: 3798, height: 2126 },
  { src: "/images/report/report-7.png", alt: "건강검진 리포트 7쪽 예시 — 혈액검사: 신장 기능 검사", width: 3800, height: 2124 },
  { src: "/images/report/report-8.png", alt: "건강검진 리포트 8쪽 예시 — 흉부 방사선 검사", width: 3796, height: 2118 },
  { src: "/images/report/report-9.png", alt: "건강검진 리포트 9쪽 예시 — 초음파 검사: 간과 담낭", width: 3796, height: 2114 },
  { src: "/images/report/report-10.png", alt: "건강검진 리포트 10쪽 예시 — 종합 소견", width: 3802, height: 2120 },
  { src: "/images/report/report-11.png", alt: "건강검진 리포트 11쪽 예시 — 치료 및 관리 계획", width: 3798, height: 2120 },
  { src: "/images/report/report-12.png", alt: "건강검진 리포트 12쪽 예시 — 맺음말과 병원 안내", width: 3804, height: 2130 },
];
