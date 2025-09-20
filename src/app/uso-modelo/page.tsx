import MainLayout from "@/components/layout/main-layout";
import { CompanyForm } from "@/components/forms/company-form";
import { PageTransition } from "@/components/layout/page-transition";

export default function UsoModeloPage() {
  return (
    <MainLayout>
      <PageTransition>
        <CompanyForm />
      </PageTransition>
    </MainLayout>
  );
}