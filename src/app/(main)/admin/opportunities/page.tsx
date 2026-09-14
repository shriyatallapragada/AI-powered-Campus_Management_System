import Link from "next/link";
import { ChevronRight, CheckCircle, XCircle, Clock, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";

const opportunities = [
  { id: "1", company: "Amazon",    role: "SDE Intern",              type: "INTERNSHIP", deadline: "2026-09-20", source: "OFFICIAL",   status: "APPROVED", submittedBy: "Admin" },
  { id: "2", company: "Microsoft", role: "Software Engineer",        type: "PLACEMENT",  deadline: "2026-09-25", source: "OFFICIAL",   status: "APPROVED", submittedBy: "Admin" },
  { id: "3", company: "Razorpay",  role: "Backend Engineering Intern",type: "INTERNSHIP", deadline: "2026-09-18", source: "COMMUNITY",  status: "PENDING",  submittedBy: "Aryan M." },
  { id: "4", company: "Josh Tech", role: "Full Stack Developer Intern",type: "INTERNSHIP", deadline: "2026-09-25", source: "COMMUNITY", status: "PENDING",  submittedBy: "Sneha R." },
];

const statusConfig: Record<string, { icon: React.ElementType; color: string }> = {
  APPROVED: { icon: CheckCircle, color: "text-green-600" },
  PENDING:  { icon: Clock,       color: "text-amber-500" },
  REJECTED: { icon: XCircle,     color: "text-red-500" },
};

export default function AdminOpportunitiesPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <nav className="flex items-center gap-1.5 text-sm text-slate-500">
        <Link href="/admin" className="hover:text-indigo-600">Admin</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-700">Opportunities</span>
      </nav>

      <h1 className="text-xl font-bold text-slate-900">Manage Opportunities</h1>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm text-slate-500 font-medium">{opportunities.length} opportunities</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-slate-100">
            {opportunities.map((opp) => {
              const cfg = statusConfig[opp.status];
              const StatusIcon = cfg.icon;
              return (
                <div key={opp.id} className="flex items-center gap-3 px-5 py-3 hover:bg-slate-50">
                  <StatusIcon className={`w-4 h-4 shrink-0 ${cfg.color}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-medium text-slate-900">{opp.company} — {opp.role}</p>
                      <Badge variant={opp.source === "OFFICIAL" ? "official" : "community"}>{opp.source}</Badge>
                    </div>
                    <p className="text-xs text-slate-500">
                      {opp.type} · Deadline: {formatDate(opp.deadline)} · Submitted by: {opp.submittedBy}
                    </p>
                  </div>
                  <div className="flex gap-1.5 shrink-0 items-center">
                    <button className="text-slate-400 hover:text-indigo-600 p-1.5 rounded transition-colors">
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                    {opp.status === "PENDING" && (
                      <>
                        <button className="p-1.5 rounded text-green-600 hover:bg-green-50 transition-colors"><CheckCircle className="w-4 h-4" /></button>
                        <button className="p-1.5 rounded text-red-500 hover:bg-red-50 transition-colors"><XCircle className="w-4 h-4" /></button>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
