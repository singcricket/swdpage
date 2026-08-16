import { cardioPage as page } from "@/lib/content/clinics/cardio";
import { ClinicPageLayout, clinicMetadata } from "@/components/site/clinic-page";

export const metadata = clinicMetadata(page);

export default function Page() {
  return (
    <ClinicPageLayout
      page={page}
      crumbs={[
        { label: "만성질환 클리닉", href: "/clinics/chronic" },
        { label: page.title, href: page.href },
      ]}
    />
  );
}
