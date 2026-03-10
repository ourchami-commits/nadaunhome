import { db } from "@/lib/firebase";

export default async function AnnouncementBanner() {
  try {
    const [enabledDoc, textDoc] = await Promise.all([
      db.collection("settings").doc("banner_enabled").get(),
      db.collection("settings").doc("banner_text").get(),
    ]);

    const enabled = enabledDoc.data()?.value === "true";
    const text = textDoc.data()?.value || "";

    if (!enabled || !text) return null;

    return (
      <div className="bg-primary text-white text-center text-sm py-2.5 px-4">
        {text}
      </div>
    );
  } catch {
    return null;
  }
}
