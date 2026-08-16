import { orthopedicPage as page } from "@/lib/content/clinics/orthopedic";
import { ClinicPageLayout, clinicMetadata } from "@/components/site/clinic-page";

export const metadata = clinicMetadata(page);

export default function Page() {
  return (
    <ClinicPageLayout
      page={page}
      crumbs={[
        { label: "외과 센터", href: "/clinics/surgery" },
        { label: page.title, href: page.href },
      ]}
    />
  );
}
