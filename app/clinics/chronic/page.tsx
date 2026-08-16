import type { Metadata } from "next";

import { chronicHub, chronicSubClinics } from "@/lib/content/clinics/chronic";
import { ClinicHubLayout } from "@/components/site/clinic-hub";

export const metadata: Metadata = {
  title: chronicHub.title,
  description: chronicHub.description,
  alternates: { canonical: chronicHub.href },
};

export default function ChronicHubPage() {
  return (
    <ClinicHubLayout
      title={chronicHub.headline}
      lede={chronicHub.lede}
      hero={chronicHub.hero}
      crumbs={[{ label: chronicHub.title, href: chronicHub.href }]}
      childrenTitle="다섯 개 클리닉"
      childrenLede="어느 곳을 봐야 할지 모르겠다면 전화로 먼저 문의해 주세요. 증상을 듣고 담당 수의사에게 연결해 드립니다."
      principles={chronicHub.principles}
      principlesTitle="만성질환을 대하는 방식"
    >
      {chronicSubClinics}
    </ClinicHubLayout>
  );
}
