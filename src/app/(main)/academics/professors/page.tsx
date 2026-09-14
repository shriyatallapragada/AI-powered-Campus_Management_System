import Link from "next/link";
import { Search, BookOpen, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";

const professors = [
  {
    id: "sharma",
    name: "Prof. R. K. Sharma",
    dept: "CSE",
    subjects: ["DBMS", "Operating Systems"],
    insightCount: 24,
    vivaCount: 87,
  },
  {
    id: "nair",
    name: "Prof. S. Nair",
    dept: "CSE",
    subjects: ["Operating Systems", "Computer Networks"],
    insightCount: 18,
    vivaCount: 61,
  },
  {
    id: "reddy",
    name: "Prof. V. Reddy",
    dept: "CSE",
    subjects: ["Machine Learning", "Data Structures"],
    insightCount: 12,
    vivaCount: 34,
  },
  {
    id: "mehta",
    name: "Prof. A. Mehta",
    dept: "CSE",
    subjects: ["Software Engineering", "Web Technologies"],
    insightCount: 9,
    vivaCount: 28,
  },
];

export default function ProfessorsPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Professor Insights</h1>
        <p className="text-sm text-slate-500 mt-1">
          Academic insights contributed by students — exam patterns, viva styles, preparation tips.
          Focus is on useful academic information, not ratings.
        </p>
      </div>

      {/* Search hint */}
      <Link
        href="/search?q=professor"
        className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-400 text-sm hover:border-indigo-300 transition-colors"
      >
        <Search className="w-4 h-4 shrink-0" />
        <span>Search professors by name or subject…</span>
      </Link>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {professors.map((prof) => (
          <Link key={prof.id} href={`/academics/professors/${prof.id}`}>
            <Card className="hover:border-indigo-200 hover:shadow-md transition-all cursor-pointer h-full">
              <CardContent className="p-4 flex items-start gap-3">
                <Avatar className="w-11 h-11 shrink-0">
                  <AvatarFallback className="text-sm">{getInitials(prof.name)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-slate-900">{prof.name}</p>
                    <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                  </div>
                  <Badge variant="secondary" className="mt-0.5">{prof.dept}</Badge>

                  <div className="flex flex-wrap gap-1 mt-2">
                    {prof.subjects.map((s) => (
                      <span key={s} className="flex items-center gap-1 text-xs text-slate-500">
                        <BookOpen className="w-3 h-3" /> {s}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3 mt-2 text-xs text-slate-400">
                    <span>{prof.insightCount} insights</span>
                    <span>{prof.vivaCount} viva Qs</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
