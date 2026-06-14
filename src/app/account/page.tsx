import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import AccountDashboard from "./AccountDashboard";

export default async function AccountPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/login");
  }

  const avatarUrl = session.user.image || "/default-avatar.png";

  return <AccountDashboard user={session.user} avatarUrl={avatarUrl} />;
}
