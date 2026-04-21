import { getUserProfileData } from "@/services/audience";
import UserProfile from "./_components/UserProfile";

export default async function AudienceProfilePage({ params }) {
  const { id } = await params;

  // Call your isolated service function
  const userData = await getUserProfileData(id);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-10">
      <UserProfile userData={userData} />
    </div>
  );
}
