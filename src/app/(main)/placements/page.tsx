import Link from "next/link";
import { Plus, Bookmark, ExternalLink, TrendingUp, Users, Building2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";

const opportunities = [
  {
    id: "1",
    company: "Amazon",
    role: "SDE Intern",
    type: "INTERNSHIP",
    branches: ["CSE", "ECE"],
    minCGPA: 8.0,
    targetYear: [3],
    deadline: "2026-09-20",
    location: "Bangalore",
    stipend: "₹80,000/month",
    source: "OFFICIAL",
    status: "OPEN",
    link: "#",
  },
  {
    id: "2",
    company: "Microsoft",
    role: "Software Engineer",
    type: "PLACEMENT",
    branches: ["CSE", "ECE", "IT"],
    minCGPA: 7.5,
    targetYear: [4],
    deadline: "2026-09-25",
    location: "Hyderabad",
    stipend: "₹16 LPA",
    source: "OFFICIAL",
    status: "OPEN",
    link: "#",
  },
  {
    id: "3",
    company: "Infosys",
    role: "Systems Engineer",
    type: "PLACEMENT",
    branches: ["CSE", "ECE", "ME", "CE"],
    minCGPA: 6.0,
    targetYear: [4],
    deadline: "2026-10-01",
    location: "Multiple",
    stipend: "₹6.5 LPA",
    source: "OFFICIAL",
    status: "OPEN",
    link: "#",
  },
  {
    id: "4",
    company: "Razorpay",
    role: "Backend Intern",
    type: "INTERNSHIP",
    branches: ["CSE"],
    minCGPA: 7.0,
    targetYear: [3, 4],
    deadline: "2026-09-18",
    location: "Bangalore",
    stipend: "₹50,000/month",
    source: "COMMUNITY",
    status: "OPEN",
    link: "#",
  },
];

const stats = [
  { label: "Students Placed", value: "142", icon: Users, color: "text-green-600 bg-green-50" },
  { label: "Companies Visited", value: "38", icon: Building2, color: "text-blue-600 bg-blue-50" },
  { label: "Avg. Package", value: "₹9.2 LPA", icon: TrendingUp, color: "text-indigo-600 bg-indigo-50" },
];

export default function PlacementsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Placements & Opportunities</h1>
          <p className="text-sm text-slate-500 mt-1">
            Internships, placements, and experiences — all in one place.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="/placements/experiences">Experiences</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/opportunities/add">
              <Plus className="w-3.5 h-3.5" /> Share Opportunity
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <Card key={label}>
            <CardContent className="p-4 flex items-center gap-3">
              <div className={`p-2 rounded-lg ${color}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div>
                <p className="text-lg font-bold text-slate-900">{value}</p>
                <p className="text-xs text-slate-500">{label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters (static for prototype) */}
      <div className="flex items-center gap-2 flex-wrap">
        {["All", "Internships", "Placements", "Open Only", "CSE", "ECE"].map((f) => (
          <button
            key={f}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
              f === "All"
                ? "bg-indigo-600 text-white border-indigo-600"
                : "bg-white text-slate-600 border-slate-200 hover:border-indigo-300"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Opportunity Cards */}
      <div className="space-y-3">
        {opportunities.map((opp) => (
          <Card key={opp.id} className="hover:border-indigo-200 hover:shadow-md transition-all">
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm font-bold text-slate-900">{opp.company}</h3>
                    <Badge variant={opp.source === "OFFICIAL" ? "official" : "community"}>
                      {opp.source === "OFFICIAL" ? "Official" : "Community"}
                    </Badge>
                    <Badge variant={opp.status === "OPEN" ? "success" : "destructive"}>
                      {opp.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-700 mt-0.5">{opp.role}</p>

                  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-slate-500">
                    <span>📍 {opp.location}</span>
                    <span>💰 {opp.stipend}</span>
                    <span>📅 Deadline: {formatDate(opp.deadline)}</span>
                    <span>🎓 CGPA ≥ {opp.minCGPA}</span>
                    <span>📚 Year: {opp.targetYear.join(", ")}</span>
                  </div>

                  <div className="flex gap-1.5 mt-2 flex-wrap">
                    {opp.branches.map((b) => (
                      <Badge key={b} variant="secondary">{b}</Badge>
                    ))}
                    <Badge variant={opp.type === "INTERNSHIP" ? "default" : "warning"}>
                      {opp.type}
                    </Badge>
                  </div>
                </div>

                <div className="flex flex-col gap-2 shrink-0">
                  <Button size="sm" asChild>
                    <a href={opp.link} target="_blank" rel="noopener noreferrer">
                      Apply <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  </Button>
                  <Button variant="outline" size="sm">
                    <Bookmark className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
