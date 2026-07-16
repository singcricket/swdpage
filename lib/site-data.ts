/**
 * 신원당동물병원 사이트 콘텐츠 데이터.
 * 실제 운영 정보(사진, 의료진, 진료시간, 연락처)로 교체해서 사용하세요.
 * 이미지는 데모용 Unsplash 링크입니다 — 병원 실제 사진으로 바꿔주세요.
 */

const U = "https://images.unsplash.com";
export const img = (id: string, w = 1200) =>
  `${U}/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const clinic = {
  name: "신원당동물병원",
  slogan: "우리 아이의 평생 주치의",
  phone: "031-000-0000",
  phoneHref: "tel:031-000-0000",
  address: "경기도 고양시 덕양구 신원당로 00, 1층",
  email: "hello@sinwondang.co.kr",
  kakao: "@신원당동물병원",
  hours: [
    { day: "평일", time: "09:30 – 20:00", note: "" },
    { day: "토요일", time: "09:30 – 17:00", note: "" },
    { day: "일요일 · 공휴일", time: "10:00 – 14:00", note: "점심 휴진 없음" },
    { day: "점심시간 (평일)", time: "13:00 – 14:30", note: "" },
  ],
} as const;

export type NavItem = { label: string; href: string };
export const nav: NavItem[] = [
  { label: "병원소개", href: "#about" },
  { label: "진료안내", href: "#services" },
  { label: "신원당의 약속", href: "#why" },
  { label: "의료진", href: "#team" },
  { label: "시설안내", href: "#facility" },
  { label: "오시는길", href: "#visit" },
];

export type Service = {
  title: string;
  desc: string;
  icon: string; // lucide icon name key (mapped in component)
  image: string;
};

export const services: Service[] = [
  {
    title: "예방접종 · 기생충 관리",
    desc: "종합백신, 광견병, 심장사상충 예방까지 아이의 생애주기에 맞춘 예방 프로그램을 제안합니다.",
    icon: "syringe",
    image: img("photo-1425082661705-1834bfd09dca", 900),
  },
  {
    title: "건강검진 · 노령동물 케어",
    desc: "혈액검사, 영상검사를 통해 질병을 조기에 발견하고 노령 반려동물의 삶의 질을 지킵니다.",
    icon: "heartPulse",
    image: img("photo-1583337130417-3346a1be7dee", 900),
  },
  {
    title: "내과 진료",
    desc: "소화기, 피부, 호흡기 등 다양한 내과 질환을 정확한 검사 기반으로 진료합니다.",
    icon: "stethoscope",
    image: img("photo-1514888286974-6c03e2ca1dba", 900),
  },
  {
    title: "외과 · 수술",
    desc: "중성화부터 연부조직 수술까지, 안전한 마취 모니터링 아래 진행합니다.",
    icon: "scissors",
    image: img("photo-1548199973-03cce0bbc87b", 900),
  },
  {
    title: "치과 진료",
    desc: "스케일링과 발치 등 구강 건강 관리를 통해 전신 건강까지 함께 살핍니다.",
    icon: "tooth",
    image: img("photo-1543466835-00a7907e9de1", 900),
  },
  {
    title: "영상 진단",
    desc: "디지털 X-ray와 초음파로 눈에 보이지 않는 곳까지 꼼꼼하게 확인합니다.",
    icon: "scan",
    image: img("photo-1518717758536-85ae29035b6d", 900),
  },
];

export type Promise_ = { title: string; desc: string; icon: string };
export const promises: Promise_[] = [
  {
    title: "보호자와 함께하는 진료",
    desc: "충분한 설명과 상담으로 보호자가 이해하고 결정할 수 있도록 돕습니다.",
    icon: "messageHeart",
  },
  {
    title: "과잉진료 없는 정직함",
    desc: "꼭 필요한 검사와 치료만, 투명하게 안내드립니다.",
    icon: "shieldCheck",
  },
  {
    title: "아이의 스트레스 최소화",
    desc: "저자극 핸들링과 편안한 환경으로 병원을 무서워하지 않게 합니다.",
    icon: "pawPrint",
  },
  {
    title: "평생 건강 파트너",
    desc: "태어나 노령이 될 때까지, 아이의 기록을 이어가며 함께합니다.",
    icon: "calendarHeart",
  },
];

export type Doctor = {
  name: string;
  role: string;
  specialties: string[];
  initial: string;
};
export const doctors: Doctor[] = [
  {
    name: "원장 김O수",
    role: "대표원장 · 수의학박사",
    specialties: ["내과", "영상진단"],
    initial: "김",
  },
  {
    name: "부원장 이O연",
    role: "진료수의사",
    specialties: ["외과", "치과"],
    initial: "이",
  },
  {
    name: "수의사 박O진",
    role: "진료수의사",
    specialties: ["예방의학", "노령동물"],
    initial: "박",
  },
];

export const gallery: { src: string; alt: string; span?: boolean }[] = [
  { src: img("photo-1628009368231-7bb7cfcb0def", 1000), alt: "진료실에서 반려견을 진찰하는 모습", span: true },
  { src: img("photo-1552053831-71594a27632d", 800), alt: "밝고 아늑한 대기 공간" },
  { src: img("photo-1601758228041-f3b2795255f1", 800), alt: "건강한 반려동물들" },
  { src: img("photo-1583512603805-3cc6b41f3edb", 800), alt: "고양이 진료 모습" },
  { src: img("photo-1587300003388-59208cc962cb", 1000), alt: "수의사와 반려동물", span: true },
  { src: img("photo-1573435567032-ff5982925350", 800), alt: "편안하게 쉬는 고양이" },
];

export const stats = [
  { value: "15년+", label: "지역 진료 경험" },
  { value: "30,000+", label: "누적 진료 케이스" },
  { value: "365일", label: "연중무휴 진료" },
  { value: "98%", label: "보호자 재방문율" },
];

export const notices = [
  {
    tag: "공지",
    title: "여름철 심장사상충 예방접종 안내",
    date: "2026.07.01",
  },
  {
    tag: "이벤트",
    title: "7월 노령동물 건강검진 패키지 할인",
    date: "2026.07.05",
  },
  {
    tag: "안내",
    title: "일요일·공휴일 진료시간 변경 안내",
    date: "2026.06.20",
  },
];
