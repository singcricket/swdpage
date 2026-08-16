import { dentalPage as page } from "@/lib/content/clinics/dental";
import { ClinicPageLayout, clinicMetadata } from "@/components/site/clinic-page";

export const metadata = clinicMetadata(page);

export default function Page() {
  return (
    <ClinicPageLayout
      page={page}
      crumbs={[{ label: page.title, href: page.href }]}
    />
  );
}
