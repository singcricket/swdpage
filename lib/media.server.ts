import fs from "node:fs";
import path from "node:path";

import type { Img } from "@/lib/images";
import { illustrationSpecs } from "@/lib/illustrations";
import { photoSpecs } from "@/lib/photos";

/**
 * 폴더에 실제로 들어 있는 삽화 · 컨셉 사진만 골라 자리 정보와 함께 돌려준다.
 * 등록부: lib/illustrations.ts (삽화), lib/photos.ts (컨셉 사진)
 *
 * 서버에서만 실행된다(파일 시스템을 읽는다). 개발 서버에서는 요청마다 다시 읽으므로
 * 파일을 넣고 새로고침하면 바로 보이고, 배포본은 빌드할 때 한 번 읽는다.
 */

const PUBLIC = path.join(process.cwd(), "public");
const EXTS = ["png", "jpg", "jpeg", "webp"] as const;

export type PlacedFigure = {
  kind: "illustration" | "photo";
  section: string;
  item?: string;
  image: Img;
};

export type PageMedia = {
  /** 컨셉 사진 히어로. 없으면 페이지에 적힌 원래 사진을 쓴다. */
  hero?: Img;
  /** 섹션 · 항목 자리에 놓일 사진과 삽화. 사진이 삽화보다 앞에 온다. */
  figures: PlacedFigure[];
};

export function mediaForPage(page: string): PageMedia {
  const photos: PlacedFigure[] = [];
  let hero: Img | undefined;

  for (const spec of photoSpecs) {
    if (spec.page !== page) continue;
    const image = loadImage("images/photos", `photo-${spec.id}`, spec.alt);
    if (!image) continue;
    if (spec.section === "hero") hero = image;
    else photos.push({ kind: "photo", section: spec.section, item: spec.item, image });
  }

  const illustrations: PlacedFigure[] = [];
  for (const spec of illustrationSpecs) {
    const places = spec.places.filter((place) => place.page === page);
    if (places.length === 0) continue;
    const image = loadImage("images/illustrations", `illust-${spec.id}`, spec.alt);
    if (!image) continue;
    for (const place of places) {
      illustrations.push({
        kind: "illustration",
        section: place.section,
        item: place.item,
        image,
      });
    }
  }

  return { hero, figures: [...photos, ...illustrations] };
}

/** 허브 카드처럼 다른 페이지의 히어로 사진만 필요할 때 */
export function heroPhotoFor(page: string): Img | undefined {
  return mediaForPage(page).hero;
}

/** public/<folder>/<base>.<ext> 를 찾아 크기까지 읽은 Img 로 돌려준다. */
function loadImage(folder: string, base: string, alt: string): Img | null {
  for (const ext of EXTS) {
    const file = path.join(PUBLIC, folder, `${base}.${ext}`);
    if (!fs.existsSync(file)) continue;
    const size = readSize(file);
    return { src: `/${folder}/${base}.${ext}`, alt, ...(size ?? {}) };
  }
  return null;
}

/**
 * 이미지 머리 부분만 읽어 가로·세로를 얻는다 (PNG · JPEG · WebP).
 * 읽지 못하면 null — 그때는 사각 프레임 기본 비율로 놓인다.
 */
function readSize(file: string): { width: number; height: number } | null {
  let buffer: Buffer;
  try {
    buffer = fs.readFileSync(file);
  } catch {
    return null;
  }

  // PNG: 16~23 바이트가 IHDR 의 가로·세로
  if (buffer.length > 24 && buffer.readUInt32BE(0) === 0x89504e47) {
    return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
  }

  // JPEG: SOF 마커를 찾는다
  if (buffer.length > 4 && buffer[0] === 0xff && buffer[1] === 0xd8) {
    let offset = 2;
    while (offset + 9 < buffer.length) {
      if (buffer[offset] !== 0xff) {
        offset += 1;
        continue;
      }
      const marker = buffer[offset + 1];
      const length = buffer.readUInt16BE(offset + 2);
      const isSof =
        marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker);
      if (isSof) {
        return {
          height: buffer.readUInt16BE(offset + 5),
          width: buffer.readUInt16BE(offset + 7),
        };
      }
      offset += 2 + length;
    }
    return null;
  }

  // WebP: RIFF....WEBP 다음 청크 종류에 따라 위치가 다르다
  if (
    buffer.length > 30 &&
    buffer.toString("ascii", 0, 4) === "RIFF" &&
    buffer.toString("ascii", 8, 12) === "WEBP"
  ) {
    const chunk = buffer.toString("ascii", 12, 16);
    if (chunk === "VP8X") {
      return {
        width: 1 + buffer.readUIntLE(24, 3),
        height: 1 + buffer.readUIntLE(27, 3),
      };
    }
    if (chunk === "VP8 ") {
      return {
        width: buffer.readUInt16LE(26) & 0x3fff,
        height: buffer.readUInt16LE(28) & 0x3fff,
      };
    }
    if (chunk === "VP8L") {
      const bits = buffer.readUInt32LE(21);
      return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 };
    }
  }

  return null;
}
