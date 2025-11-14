import RegisterForm from "@/components/forms/register-form";
import { PublicRoute } from "@/components/auth/public-route";

export default function CadastroPage() {
  return (
    <PublicRoute>
      <RegisterForm />
    </PublicRoute>
  );
}
