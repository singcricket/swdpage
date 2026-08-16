/**
 * 모션 상수.
 *
 * `Reveal` 은 클라이언트 컴포넌트라 여기서 분리해 둔다. 서버 컴포넌트가
 * 목록을 렌더하면서 지연값을 계산하므로, 클라이언트 모듈에서 export 하면
 * 「client 함수를 server 에서 호출했다」는 빌드 에러가 난다.
 */

/**
 * 목록 항목이 순서대로 나타나는 간격(ms).
 *
 * 이 값 하나가 사이트 전체의 리듬을 정한다. 크게 잡을수록 항목이 또렷하게
 * 하나씩 세워지고, 작게 잡을수록 한 덩어리로 흘러간다.
 * 애니메이션 길이(`--reveal-duration`)와 함께 보고 조절할 것.
 */
export const STAGGER_STEP = 300;

/**
 * 지연을 몇 번째 항목까지 늘릴지.
 *
 * 뒤로 갈수록 무한정 밀리면 스크롤이 빠른 사람에게는 «아직 안 뜬 목록»이
 * 된다. 이 값 이후로는 같은 지연을 쓴다. STEP 이 클수록 낮게 잡아야 한다 —
 * 400ms × 3 이면 네 번째부터 1.2초로 고정된다.
 */
export const STAGGER_CAP = 5;

/** 목록 인덱스를 등장 지연(ms)으로 바꾼다. */
export function stagger(index: number) {
  return Math.min(index, STAGGER_CAP) * STAGGER_STEP;
}
