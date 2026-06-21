import { verifyAdminSession } from '@/lib/admin-auth';
import { LoginForm } from './_components/LoginForm';
import { SmsDashboard } from './_components/SmsDashboard';

export default async function AdminSmsPage() {
  const isAuthenticated = await verifyAdminSession();

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  return <SmsDashboard />;
}
