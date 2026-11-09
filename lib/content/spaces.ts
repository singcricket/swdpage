import { facility } from "@/lib/images";
import type { Img } from "@/lib/images";

/**
 * 병원 시설.
 *
 * 원고 1-3 의 공간 목록을 기준으로 하되, 실제 촬영본이 있는 공간만 싣는다.
 * 사진이 없는 공간을 이름만 올려두면 보호자가 기대한 것과 다른 것을 보게 된다.
 */

export type Space = {
  id: string;
  /** 공간 이름 */
  name: string;
  /** 이 공간이 하는 일 */
  body: string;
  floor: "2F" | "1F";
  images: Img[];
};

export type SpaceGroup = {
  id: string;
  title: string;
  summary: string;
  spaces: Space[];
};

export const spaceGroups: SpaceGroup[] = [
  {
    id: "welcome",
    title: "맞이하는 공간",
    summary:
      "낯선 병원이 조금 덜 무섭도록, 처음 들어서는 곳부터 신경 썼습니다.",
    spaces: [
      {
        id: "reception",
        name: "접수 데스크",
        body: "곡선으로 이어진 데스크에서 접수와 안내를 받습니다. 진료실과 대기 공간이 한눈에 보이는 자리에 있어 순서를 기다리는 동안에도 상황을 알 수 있습니다.",
        floor: "2F",
        images: [facility.reception[0], facility.reception[3]],
      },
      {
        id: "waiting",
        name: "대기실",
        body: "반원 창이 늘어선 대기 공간입니다. 창가를 따라 긴 벤치를 두어 이동장을 올려두거나 아이를 앉힐 수 있고, 바깥 빛이 들어와 병원 특유의 답답함을 덜었습니다.",
        floor: "2F",
        images: [facility.waiting[0], facility.waiting[5], facility.waiting[13]],
      },
      {
        id: "cat-waiting",
        name: "고양이 전용 대기실",
        body: "개와 완전히 분리된 조용한 대기 공간입니다. 개의 소리와 냄새만으로도 고양이는 극심한 스트레스를 받기 때문에, 도착하는 순간부터 동선을 나눴습니다. ISFM Cat Friendly Clinic 인증 기준을 충족하는 공간입니다.",
        floor: "2F",
        images: [facility.catWaiting[0], facility.catWaiting[4]],
      },
      {
        id: "amenity",
        name: "보호자 편의 공간",
        body: "정수기와 함께 아이가 마실 물그릇을 준비해 두었습니다. 대기 시간이 길어질 때 이용하실 수 있습니다.",
        floor: "2F",
        images: [facility.amenity[0]],
      },
    ],
  },
  {
    id: "consult",
    title: "진료하는 공간",
    summary:
      "설명을 듣는 자리와 처치를 받는 자리를 나눴습니다. 이야기는 앉아서, 처치는 전용 공간에서 합니다.",
    spaces: [
      {
        id: "exam",
        name: "진료실",
        body: "보호자와 마주 앉아 증상을 듣고 검사 결과를 함께 보는 공간입니다. 모니터로 영상과 수치를 직접 보여드리며 설명합니다.",
        floor: "2F",
        images: [facility.examRoom[0], facility.examRoom[4]],
      },
      {
        id: "treatment",
        name: "처치실",
        body: "주사, 채혈, 상처 처치 등 일상적인 처치가 이루어지는 공간입니다. 약품과 기구를 손 닿는 곳에 정리해 처치 시간을 줄였습니다.",
        floor: "2F",
        images: [facility.treatmentRoom[0], facility.treatmentRoom[3]],
      },
      {
        id: "pharmacy",
        name: "약제실",
        body: "처방약을 조제하고 보관하는 공간입니다. 냉장 보관이 필요한 약품은 별도 관리합니다.",
        floor: "2F",
        images: [facility.pharmacy[0]],
      },
    ],
  },
  {
    id: "diagnosis",
    title: "검사하는 공간",
    summary:
      "원내에서 처리할 수 있는 검사를 늘려 결과를 기다리는 시간을 줄였습니다.",
    spaces: [
      {
        id: "xray",
        name: "방사선실",
        body: "디지털 방사선 촬영을 하는 공간입니다. 촬영대와 방호 장비를 갖추고 있으며, 촬영 직후 바로 영상을 확인할 수 있습니다.",
        floor: "2F",
        images: [facility.xrayRoom[1], facility.xrayRoom[0]],
      },
      {
        id: "ultrasound",
        name: "초음파 · 안과 검사실",
        body: "조명을 낮춰 화면이 잘 보이도록 만든 검사실입니다. 복부·심장 초음파와 안과 검사를 이곳에서 진행합니다.",
        floor: "2F",
        images: [facility.ultrasoundRoom[0], facility.ultrasoundRoom[1]],
      },
      {
        id: "lab",
        name: "임상병리실",
        body: "혈액·소변·세포 검사를 처리하는 공간입니다. 원내 분석 장비로 당일 결과 확인이 가능합니다.",
        floor: "2F",
        images: [facility.labRoom[0], facility.labRoom[1]],
      },
    ],
  },
  {
    id: "surgery",
    title: "수술하는 공간",
    summary: "수술실과 치과실을 따로 두어 감염 관리와 장비 동선을 분리했습니다.",
    spaces: [
      {
        id: "surgery-room",
        name: "수술실",
        body: "두 개의 무영등과 이동식 수술대를 갖춘 독립 공간입니다. 마취 모니터링 장비가 수술대 옆에 상시 배치되어 있습니다.",
        floor: "2F",
        images: [facility.surgeryRoom[0], facility.surgeryRoom[2]],
      },
      {
        id: "dental-room",
        name: "치과실",
        body: "스케일링부터 발치까지 처리하는 치과 전용 공간입니다. 치과 전용 방사선 장비를 함께 두어 촬영과 처치를 한자리에서 진행합니다.",
        floor: "2F",
        images: [facility.dentalRoom[0], facility.dentalRoom[1]],
      },
      {
        id: "ward",
        name: "입원실",
        body: "개별 입원 케이지를 갖춘 공간입니다. 산소 공급과 수액 처치가 가능하며, 의료진이 상시 상태를 확인합니다.",
        floor: "2F",
        images: [facility.ward[0], facility.ward[1]],
      },
    ],
  },
  {
    id: "care",
    title: "머무는 공간 · 1층",
    summary:
      "같은 건물 1층에서 유치원·호텔·미용을 함께 운영합니다. 이상이 생기면 2층 의료진이 바로 내려옵니다.",
    spaces: [
      {
        id: "hotel-lobby",
        name: "유치원 · 호텔 라운지",
        body: "1층 「올래(All 來)」 반려동물 유치원·호텔의 프론트와 라운지입니다. 입·퇴실과 상담이 이곳에서 이루어집니다.",
        floor: "1F",
        images: [facility.hotelLobby[0], facility.hotelLobby[6]],
      },
      {
        id: "consult-room",
        name: "상담실",
        body: "호텔·유치원을 이용하는 아이의 보호자와 마주 앉아 이야기하는 별도의 방입니다. 입실 전 건강 상태와 예방접종, 먹는 약과 식습관, 성격과 주의할 점을 미리 여쭙고, 머무는 동안의 생활과 퇴실 시 전달 사항을 이곳에서 안내해 드립니다.",
        floor: "1F",
        images: [facility.consultRoom[0], facility.consultRoom[1]],
      },
      {
        id: "cat-hotel",
        name: "고양이 호텔",
        body: "개와 완전히 분리된 고양이 전용 객실입니다. 유리로 나뉜 개별 공간에 은신처와 수직 공간을 두어 안정감을 줍니다.",
        floor: "1F",
        images: [facility.catHotel[2], facility.catHotel[4]],
      },
      {
        id: "dog-hotel",
        name: "강아지 호텔",
        body: "개별 객실로 운영합니다. 야외 놀이터와 바로 이어져 있어 하루 중 활동 시간을 확보할 수 있습니다.",
        floor: "1F",
        images: [facility.dogHotel[0], facility.dogHotel[2]],
      },
      {
        id: "playground",
        name: "야외 놀이터",
        body: "인조잔디를 깐 옥외 공간입니다. 장시간 머무는 아이들에게 활동과 자극을 제공합니다.",
        floor: "1F",
        images: [facility.playground[3], facility.playground[0]],
      },
      {
        id: "grooming",
        name: "미용실",
        body: "미용과 목욕을 진행하는 공간입니다. 진료나 호텔 이용과 함께 예약하실 수 있습니다.",
        floor: "1F",
        images: [facility.grooming[3], facility.grooming[0]],
      },
    ],
  },
];
