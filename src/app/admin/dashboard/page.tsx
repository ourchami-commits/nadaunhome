import { db } from "@/lib/firebase";

async function getStats() {
  const [allSnap, unreadSnap] = await Promise.all([
    db.collection("inquiries").count().get(),
    db.collection("inquiries").where("read", "==", false).count().get(),
  ]);

  // Today's count
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todaySnap = await db
    .collection("inquiries")
    .where("createdAt", ">=", today)
    .count()
    .get();

  // By type
  const types = ["교육문의", "협업제안", "강의문의", "기타"];
  const typeCounts = await Promise.all(
    types.map(async (type) => {
      const snap = await db
        .collection("inquiries")
        .where("type", "==", type)
        .count()
        .get();
      return { type, count: snap.data().count };
    })
  );

  return {
    total: allSnap.data().count,
    unread: unreadSnap.data().count,
    today: todaySnap.data().count,
    byType: typeCounts,
  };
}

export default async function Dashboard() {
  const stats = await getStats();

  return (
    <div>
      <h1 className="font-heading text-dark text-2xl font-bold mb-8">대시보드</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <StatCard label="전체 문의" value={stats.total} />
        <StatCard label="미확인 문의" value={stats.unread} highlight />
        <StatCard label="오늘 문의" value={stats.today} />
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
        <h2 className="font-semibold text-dark mb-4">유형별 문의</h2>
        <div className="space-y-3">
          {stats.byType.map(({ type, count }) => (
            <div key={type} className="flex items-center gap-3">
              <span className="text-sm text-subtext w-20">{type}</span>
              <div className="flex-1 bg-bg rounded-full h-2 overflow-hidden">
                <div
                  className="bg-primary h-2 rounded-full"
                  style={{ width: stats.total ? `${(count / stats.total) * 100}%` : "0%" }}
                />
              </div>
              <span className="text-sm font-medium text-dark w-6 text-right">{count}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="font-semibold text-dark mb-3">방문자 통계</h2>
        <p className="text-subtext text-sm mb-4">Vercel Analytics에서 상세 방문자 통계를 확인하세요.</p>
        <a
          href="https://vercel.com/dashboard"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-dark text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-dark/80 transition-colors"
        >
          Vercel Analytics 열기 →
        </a>
      </div>
    </div>
  );
}

function StatCard({ label, value, highlight }: { label: string; value: number; highlight?: boolean }) {
  return (
    <div className={`rounded-2xl p-6 shadow-sm ${highlight ? "bg-primary text-white" : "bg-white"}`}>
      <p className={`text-sm mb-1 ${highlight ? "text-white/70" : "text-subtext"}`}>{label}</p>
      <p className={`text-4xl font-bold font-heading ${highlight ? "text-white" : "text-dark"}`}>{value}</p>
    </div>
  );
}
