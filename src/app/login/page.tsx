import LoginForm from "@/components/forms/login-form";
import { PublicRoute } from "@/components/auth/public-route";

export default function LoginPage() {
  return (
    <PublicRoute>
      <LoginForm />
    </PublicRoute>
  );
}
