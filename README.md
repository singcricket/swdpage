# 신원당동물의료센터 홈페이지

경기 고양시 덕양구 신원당동물의료센터의 안내 사이트. Next.js 16 · React 19 · Tailwind v4 · Base UI.

```bash
pnpm dev      # 개발 서버 (http://localhost:3000)
pnpm build    # 프로덕션 빌드
pnpm start    # 빌드 결과 서빙
pnpm lint     # ESLint
```

## 문구를 고치려면

페이지 파일이 아니라 **데이터 파일**을 고칩니다. `app/` 아래의 `page.tsx` 들은 데이터를 조립기에 넘기는 역할만 합니다.

| 고치고 싶은 것 | 파일 |
| --- | --- |
| 전화번호 · 주소 · 진료시간 · 외부 채널 | `lib/site.ts` |
| 상단 메뉴 · 푸터 사이트맵 · sitemap.xml | `lib/site.ts` 의 `nav` |
| 원장 인사말 · 병원 철학 | `lib/content/about.ts` |
| 의료진 이름 · 이력 | `lib/content/team.ts` |
| 의료장비 | `lib/content/equipment.ts` |
| 병원 시설 공간 설명 | `lib/content/spaces.ts` |
| 홈·소개의 진료 분야 카드 | `lib/content/services.ts` |
| 각 클리닉 페이지 본문 | `lib/content/clinics/*.ts` |
| 이미지 경로 · 대체 텍스트 | `lib/images.ts` |

`nav` 에 경로를 추가하면 헤더 드롭다운, 푸터 사이트맵, `sitemap.xml` 이 함께 갱신됩니다.

## 클리닉 페이지 구조

원고 8편이 모두 같은 5악장(주요 질환 → 검사 항목 → 치료 방향 → 고위험 품종 → 내원 권장 증상)으로 쓰여 있어, 이 구조를 `lib/content/types.ts` 의 `Section` 타입으로 고정했습니다. 페이지는 데이터일 뿐이고 렌더링은 `components/site/blocks/sections.tsx` 가 맡습니다.

섹션 종류: `prose` `list` `diseases` `tests` `treatments` `risk` `symptoms` `table` `photos` `quote`

증상 항목의 `urgent: true` 는 사이트에서 유일하게 coral(`#B4442F`)을 쓰는 자리입니다. 보호자가 지금 움직여야 하는지를 가르는 표시이므로 장식용으로 쓰지 마세요.

## 이미지

- `public/assets/` — 촬영 원본. 시설 사진은 약 646MB 라 `.gitignore` 에 있습니다.
- `public/images/` — 사이트가 실제로 쓰는 웹 최적화본(약 41MB). 커밋 대상입니다.
- `bash scripts/build-assets.sh` — 원본에서 최적화본을 다시 만듭니다. 사진을 교체했다면 이 스크립트의 목록을 함께 고치세요.

## 디자인 토큰

`app/globals.css` 한 곳에 있습니다.

- `teal` `#5CAABE` 는 병원이 지정한 primary 이지만 흰 글씨 대비가 2.6:1 이라 **그래픽 전용**입니다. 글자가 올라가는 자리는 `teal-deep` `#2E6E82`(대비 5.8:1)을 씁니다.
- 아치(`arch` 유틸리티)는 건물의 반원 창에서 가져온 이 사이트의 시그니처입니다.
- 한국어 조판: 본문 행간 1.85~1.95, `word-break: keep-all`, 본문 폭 46rem.

스크롤 애니메이션 속도는 `:root` 의 토큰 세 개로만 조절합니다.

```css
--reveal-ease: cubic-bezier(0.33, 1, 0.68, 1); /* easeOutCubic */
--reveal-duration: 1.1s;      /* 일반 요소 */
--reveal-arch-duration: 1.6s; /* 히어로 아치 */
```

이징을 expo 계열(앞머리에 진행이 몰린 곡선)로 되돌리면 지속시간을 늘려도 «툭» 나타나는 인상이 남습니다. 항목 간 지연은 각 `Reveal` 의 `delay` prop 입니다.

## 배포 전 확인

`lib/site.ts` 의 `site.url` 이 실제 도메인과 같은지 확인하세요. 이 값으로 `sitemap.xml`, canonical, OG 이미지의 절대 주소가 만들어집니다.
