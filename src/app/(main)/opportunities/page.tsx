import Link from "next/link";
import { Plus, ExternalLink, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";

const opportunities = [
  {
    id: "1",
    company: "Razorpay",
    role: "Backend Engineering Intern",
    type: "INTERNSHIP",
    branches: ["CSE"],
    targetYear: [3, 4],
    deadline: "2026-09-18",
    location: "Bangalore",
    stipend: "₹50,000/month",
    source: "COMMUNITY",
    submittedBy: "Aryan M.",
    link: "#",
  },
  {
    id: "2",
    company: "Josh Technology",
    role: "Full Stack Developer Intern",
    type: "INTERNSHIP",
    branches: ["CSE", "IT"],
    targetYear: [3],
    deadline: "2026-09-25",
    location: "Gurugram",
    stipend: "₹30,000/month",
    source: "COMMUNITY",
    submittedBy: "Sneha R.",
    link: "#",
  },
  {
    id: "3",
    company: "ISRO",
    role: "Research Intern",
    type: "INTERNSHIP",
    branches: ["CSE", "ECE", "ME"],
    targetYear: [3, 4],
    deadline: "2026-10-01",
    location: "Bangalore / Remote",
    stipend: "Stipend available",
    source: "OFFICIAL",
    submittedBy: "Placement Cell",
    link: "#",
  },
];

export default function OpportunitiesPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Opportunities</h1>
          <p className="text-sm text-slate-500 mt-1">
            Internships and opportunities shared by the community and placement cell.
          </p>
        </div>
        <Button asChild>
          <Link href="/opportunities/add">
            <Plus className="w-4 h-4" /> Share an Opportunity
          </Link>
        </Button>
      </div>

      {/* Disclaimer */}
      <div className="flex items-start gap-2.5 p-3 rounded-lg bg-amber-50 border border-amber-200 text-sm text-amber-800">
        <Info className="w-4 h-4 mt-0.5 shrink-0" />
        <p>
          Community-submitted opportunities are sourced from students and are not officially verified. 
          Always confirm details with the official source before applying.
        </p>
      </div>

      <div className="space-y-3">
        {opportunities.map((opp) => (
          <Card key={opp.id} className="hover:border-indigo-200 hover:shadow-md transition-all">
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className="text-sm font-bold text-slate-900">{opp.company}</h3>
                    <Badge variant={opp.source === "OFFICIAL" ? "official" : "community"}>
                      {opp.source === "OFFICIAL" ? "Official" : "Community Sourced"}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-700">{opp.role}</p>

                  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-slate-500">
                    <span>📍 {opp.location}</span>
                    <span>💰 {opp.stipend}</span>
                    <span>📅 Deadline: {formatDate(opp.deadline)}</span>
                    <span>👤 Shared by: {opp.submittedBy}</span>
                  </div>

                  <div className="flex gap-1.5 mt-2 flex-wrap">
                    {opp.branches.map((b) => (
                      <Badge key={b} variant="secondary">{b}</Badge>
                    ))}
                    <Badge variant="default">{opp.type}</Badge>
                    <span className="text-xs text-slate-400">Year: {opp.targetYear.join(", ")}</span>
                  </div>
                </div>

                <Button size="sm" asChild className="shrink-0">
                  <a href={opp.link} target="_blank" rel="noopener noreferrer">
                    Apply <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
