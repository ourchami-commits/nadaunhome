import { getSession } from "@/lib/session";
import AdminNav from "@/components/admin/AdminNav";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  if (!session.isAdmin) {
    return <div className="min-h-screen bg-bg">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-bg flex">
      <AdminNav />
      <main className="flex-1 p-8 overflow-auto">{children}</main>
    </div>
  );
}
