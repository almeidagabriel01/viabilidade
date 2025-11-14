import MainLayout from "@/components/layout/main-layout";
import { PageTransition } from "@/components/layout/page-transition";
import { ProfileContent } from "@/components/profile/profile-content";
import { ProtectedRoute } from "@/components/auth/protected-route";

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <MainLayout>
        <PageTransition>
          <ProfileContent />
        </PageTransition>
      </MainLayout>
    </ProtectedRoute>
  );
}
