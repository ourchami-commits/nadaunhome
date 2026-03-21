import AnnouncementBanner from "@/components/admin/AnnouncementBanner";
import Navbar from "./Navbar";

export default async function SiteHeader() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <AnnouncementBanner />
      <Navbar />
    </div>
  );
}
