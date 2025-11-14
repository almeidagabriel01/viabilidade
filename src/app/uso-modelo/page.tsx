import MainLayout from "@/components/layout/main-layout";
import { CompanyForm } from "@/components/forms/company-form";
import { PageTransition } from "@/components/layout/page-transition";
import { ProtectedRoute } from "@/components/auth/protected-route";

export default function UsoModeloPage() {
  return (
    <ProtectedRoute>
      <MainLayout>
        <PageTransition>
          <CompanyForm />
        </PageTransition>
      </MainLayout>
    </ProtectedRoute>
  );
}