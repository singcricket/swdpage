import type { Metadata } from "next";

import { surgeryHub, surgerySubClinics } from "@/lib/content/clinics/surgery";
import { ClinicHubLayout } from "@/components/site/clinic-hub";

export const metadata: Metadata = {
  title: surgeryHub.title,
  description: surgeryHub.description,
  alternates: { canonical: surgeryHub.href },
};

export default function SurgeryHubPage() {
  return (
    <ClinicHubLayout
      title={surgeryHub.headline}
      lede={surgeryHub.lede}
      hero={surgeryHub.hero}
      crumbs={[{ label: surgeryHub.title, href: surgeryHub.href }]}
      childrenTitle="두 개의 외과"
      childrenLede="어떤 수술이 필요한지 아직 모르셔도 됩니다. 증상을 말씀해 주시면 검사부터 안내해 드립니다."
      principles={surgeryHub.principles}
      principlesTitle="수술을 결정하는 방식"
      equipment={surgeryHub.equipment}
      equipmentTitle="마취 장비"
      equipmentLede="수술 내내 다섯 가지 수치를 실시간으로 확인합니다."
    >
      {surgerySubClinics}
    </ClinicHubLayout>
  );
}
