import MainLayout from "@/components/layout/main-layout";
import { PageTransition } from "@/components/layout/page-transition";
import { ProfileContent } from "@/components/profile/profile-content";

export default function ProfilePage() {
  return (
    <MainLayout>
      <PageTransition>
        <ProfileContent />
      </PageTransition>
    </MainLayout>
  );
}
