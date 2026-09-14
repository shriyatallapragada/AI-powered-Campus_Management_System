import Link from "next/link";
import { Users, FileText, BookOpen, Briefcase, Flag, CheckCircle, XCircle, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const stats = [
  { label: "Total Users", value: "1,248", icon: Users, color: "text-blue-600 bg-blue-50" },
  { label: "Pending Resources", value: "14", icon: FileText, color: "text-amber-600 bg-amber-50" },
  { label: "Pending Opportunities", value: "7", icon: Briefcase, color: "text-green-600 bg-green-50" },
  { label: "Open Reports", value: "3", icon: Flag, color: "text-red-600 bg-red-50" },
];

const pendingItems = [
  { id: "1", type: "resource", title: "DBMS Notes by Rahul K.", submittedBy: "Rahul K.", time: "2h ago" },
  { id: "2", type: "opportunity", title: "Razorpay Backend Intern", submittedBy: "Aryan M.", time: "3h ago" },
  { id: "3", type: "resource", title: "OS Previous Papers 2023", submittedBy: "Priya S.", time: "5h ago" },
  { id: "4", type: "insight", title: "Prof. Nair — Viva Pattern", submittedBy: "Anonymous", time: "1d ago" },
  { id: "5", type: "placement", title: "Microsoft SDE Intern Experience", submittedBy: "Sneha R.", time: "1d ago" },
];

const reports = [
  { id: "1", reason: "MISINFORMATION", description: "Claims unit 5 will not come in exam", content: "Discussion post", reporter: "Student A", time: "4h ago" },
  { id: "2", reason: "INAPPROPRIATE", description: "Disrespectful comment about professor", content: "Community answer", reporter: "Anonymous", time: "1d ago" },
];

const typeColors: Record<string, string> = {
  resource: "bg-blue-50 text-blue-700",
  opportunity: "bg-green-50 text-green-700",
  insight: "bg-purple-50 text-purple-700",
  placement: "bg-indigo-50 text-indigo-700",
};

export default function AdminPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Admin Panel</h1>
        <p className="text-sm text-slate-500 mt-1">Manage submissions, users, and reports.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <Card key={label}>
            <CardContent className="p-4 flex items-center gap-3">
              <div className={`p-2 rounded-lg ${color}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xl font-bold text-slate-900">{value}</p>
                <p className="text-xs text-slate-500">{label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Approvals */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-500" />
              Pending Approvals
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {pendingItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100"
              >
                <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${typeColors[item.type]}`}>
                  {item.type}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-slate-800 truncate">{item.title}</p>
                  <p className="text-xs text-slate-400">by {item.submittedBy} · {item.time}</p>
                </div>
                <div className="flex gap-1 shrink-0">
                  <button
                    className="p-1.5 rounded-md text-green-600 hover:bg-green-50 transition-colors"
                    title="Approve"
                  >
                    <CheckCircle className="w-4 h-4" />
                  </button>
                  <button
                    className="p-1.5 rounded-md text-red-500 hover:bg-red-50 transition-colors"
                    title="Reject"
                  >
                    <XCircle className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Reports */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Flag className="w-4 h-4 text-red-500" />
              Open Reports
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {reports.map((r) => (
              <div key={r.id} className="p-3 rounded-lg bg-red-50 border border-red-100">
                <div className="flex items-center justify-between mb-1">
                  <Badge variant="destructive">{r.reason}</Badge>
                  <span className="text-xs text-slate-400">{r.time}</span>
                </div>
                <p className="text-xs text-slate-700 font-medium">{r.description}</p>
                <p className="text-xs text-slate-500 mt-0.5">{r.content} · Reported by {r.reporter}</p>
                <div className="flex gap-2 mt-2">
                  <Button size="sm" variant="outline" className="text-xs h-7">View Content</Button>
                  <Button size="sm" variant="destructive" className="text-xs h-7">Remove</Button>
                  <Button size="sm" variant="ghost" className="text-xs h-7">Dismiss</Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Admin nav */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Manage Users", href: "/admin/users", icon: Users },
          { label: "Manage Subjects", href: "/admin/subjects", icon: BookOpen },
          { label: "Manage Events", href: "/admin/events", icon: FileText },
          { label: "Manage Opportunities", href: "/admin/opportunities", icon: Briefcase },
        ].map(({ label, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-2.5 p-3 rounded-lg border border-slate-200 bg-white hover:border-indigo-200 hover:shadow-sm transition-all text-sm font-medium text-slate-700"
          >
            <Icon className="w-4 h-4 text-slate-400" />
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}
