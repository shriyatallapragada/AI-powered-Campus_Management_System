import Link from "next/link";
import { ChevronRight, CheckCircle, XCircle, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";

const events = [
  { id: "1", title: "AI/ML Workshop — GDSC",        type: "WORKSHOP",   date: "2026-09-20", organizer: "GDSC",             status: "APPROVED", source: "OFFICIAL" },
  { id: "2", title: "24-Hour Hackathon — IEEE",      type: "HACKATHON",  date: "2026-09-28", organizer: "IEEE Student Branch", status: "APPROVED", source: "OFFICIAL" },
  { id: "3", title: "Photography Club — Campus Walk",type: "CLUB_EVENT", date: "2026-09-21", organizer: "Photography Club", status: "PENDING",  source: "COMMUNITY" },
  { id: "4", title: "Coding Bootcamp — CSE Dept",   type: "WORKSHOP",   date: "2026-10-05", organizer: "CSE Dept",          status: "PENDING",  source: "OFFICIAL" },
];

const statusConfig: Record<string, { icon: React.ElementType; color: string }> = {
  APPROVED: { icon: CheckCircle, color: "text-green-600" },
  PENDING:  { icon: Clock,       color: "text-amber-500" },
  REJECTED: { icon: XCircle,     color: "text-red-500" },
};

export default function AdminEventsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <nav className="flex items-center gap-1.5 text-sm text-slate-500">
        <Link href="/admin" className="hover:text-indigo-600">Admin</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-700">Events</span>
      </nav>

      <h1 className="text-xl font-bold text-slate-900">Manage Events</h1>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm text-slate-500 font-medium">{events.length} events</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-slate-100">
            {events.map((ev) => {
              const cfg = statusConfig[ev.status];
              const StatusIcon = cfg.icon;
              return (
                <div key={ev.id} className="flex items-center gap-3 px-5 py-3 hover:bg-slate-50">
                  <StatusIcon className={`w-4 h-4 shrink-0 ${cfg.color}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-slate-900">{ev.title}</p>
                      <Badge variant={ev.source === "OFFICIAL" ? "official" : "community"}>{ev.source}</Badge>
                    </div>
                    <p className="text-xs text-slate-500">{ev.type.replace("_", " ")} · {formatDate(ev.date)} · {ev.organizer}</p>
                  </div>
                  {ev.status === "PENDING" && (
                    <div className="flex gap-1 shrink-0">
                      <button className="p-1.5 rounded text-green-600 hover:bg-green-50 transition-colors"><CheckCircle className="w-4 h-4" /></button>
                      <button className="p-1.5 rounded text-red-500 hover:bg-red-50 transition-colors"><XCircle className="w-4 h-4" /></button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
