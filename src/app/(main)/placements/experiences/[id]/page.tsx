import Link from "next/link";
import { ChevronRight, ThumbsUp, CheckCircle2, XCircle, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getInitials, formatRelativeTime } from "@/lib/utils";

const experiences: Record<string, {
  id: string; company: string; role: string; type: string; year: number;
  outcome: string; author: string; isAnonymous: boolean; upvotes: number;
  createdAt: string; rounds: { name: string; description: string }[];
  preparation: string[]; experience: string; tips: string;
}> = {
  "1": {
    id: "1",
    company: "Microsoft",
    role: "SDE Intern",
    type: "INTERNSHIP",
    year: 2026,
    outcome: "selected",
    author: "Rahul K.",
    isAnonymous: false,
    upvotes: 48,
    createdAt: new Date(Date.now() - 5 * 24 * 3600 * 1000).toISOString(),
    rounds: [
      { name: "Online Assessment", description: "2 DSA problems on HackerRank. 90 minutes. First was medium (Two Sum variant), second was medium-hard (graph BFS). About 60% of applicants cleared this." },
      { name: "Technical Interview 1", description: "45 minutes on Teams. Started with intro, then one DSA problem (reverse a linked list in groups of K). Then questions on time/space complexity. Asked me to optimize the solution." },
      { name: "Technical Interview 2", description: "Same format. Asked about OOP concepts — inheritance, polymorphism. Then a system design question: design a URL shortener (basic level, no deep dive needed for intern). Ended with questions about DBMS — joins and indexing." },
      { name: "HR Round", description: "20 minutes. Standard questions — why Microsoft, strength/weakness, team conflict situation. Very relaxed and conversational." },
    ],
    preparation: ["DSA — LeetCode 150 problems", "OOP concepts", "DBMS basics", "Basic System Design", "OS — Process vs Thread"],
    experience: "The whole process took about 3 weeks from OA to offer letter. Microsoft's interview culture felt very collaborative — interviewers give hints if you're stuck rather than just watching you fail. The team was friendly and genuinely interested in whether you can think through a problem, not just whether you know the perfect algorithm.\n\nI was 3rd year CSE with 8.6 CGPA. I had done 2 mini projects which came up in the HR round.",
    tips: "Focus on medium-level LeetCode problems — trees, graphs, two pointers, and sliding window. Don't panic if you get stuck; think out loud. Microsoft interviewers appreciate problem-solving approach over perfect answers.",
  },
};

const outcomeConfig: Record<string, { icon: React.ElementType; color: string; label: string }> = {
  selected:   { icon: CheckCircle2, color: "text-green-600", label: "Selected" },
  rejected:   { icon: XCircle,      color: "text-red-500",   label: "Rejected" },
  waitlisted: { icon: Clock,        color: "text-amber-500", label: "Waitlisted" },
};

export default async function ExperiencePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const exp = experiences[id];

  if (!exp) {
    return (
      <div className="max-w-3xl mx-auto py-12 text-center">
        <p className="text-slate-500">Experience not found.</p>
        <Link href="/placements/experiences" className="text-indigo-600 hover:underline text-sm mt-2 inline-block">Back</Link>
      </div>
    );
  }

  const outcome = outcomeConfig[exp.outcome] ?? outcomeConfig.rejected;
  const OutcomeIcon = outcome.icon;

  return (
    <div className="max-w-3xl mx-auto space-y-5">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-slate-500 flex-wrap">
        <Link href="/placements" className="hover:text-indigo-600">Placements</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/placements/experiences" className="hover:text-indigo-600">Experiences</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-700">{exp.company} — {exp.role}</span>
      </nav>

      {/* Header */}
      <Card>
        <CardContent className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl font-bold text-slate-900">{exp.company}</h1>
                <Badge variant={exp.type === "INTERNSHIP" ? "default" : "warning"}>{exp.type}</Badge>
                <span className={`flex items-center gap-1 text-sm font-medium ${outcome.color}`}>
                  <OutcomeIcon className="w-4 h-4" /> {outcome.label}
                </span>
              </div>
              <p className="text-slate-600 mt-0.5">{exp.role} · {exp.year}</p>

              <div className="flex items-center gap-3 mt-3 text-sm text-slate-500">
                <Avatar className="w-6 h-6">
                  <AvatarFallback className="text-[10px]">
                    {exp.isAnonymous ? "?" : getInitials(exp.author)}
                  </AvatarFallback>
                </Avatar>
                <span>{exp.isAnonymous ? "Anonymous" : exp.author}</span>
                <span className="text-slate-400">·</span>
                <span className="text-slate-400">{formatRelativeTime(exp.createdAt)}</span>
              </div>
            </div>

            <button className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-indigo-50 transition-colors">
              <ThumbsUp className="w-5 h-5 text-slate-400" />
              <span className="text-sm font-semibold text-slate-600">{exp.upvotes}</span>
              <span className="text-xs text-slate-400">helpful</span>
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Selection Process */}
      <div>
        <h2 className="text-base font-bold text-slate-900 mb-3">Selection Process</h2>
        <div className="space-y-3">
          {exp.rounds.map((round, i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center font-bold shrink-0">
                    {i + 1}
                  </span>
                  <h3 className="text-sm font-semibold text-slate-900">{round.name}</h3>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed pl-8">{round.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Preparation */}
      <Card>
        <CardContent className="p-5">
          <h2 className="text-base font-bold text-slate-900 mb-3">What I Prepared</h2>
          <div className="flex flex-wrap gap-2">
            {exp.preparation.map((topic, i) => (
              <Badge key={i} variant="secondary">{topic}</Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Full experience */}
      <Card>
        <CardContent className="p-5">
          <h2 className="text-base font-bold text-slate-900 mb-3">Full Experience</h2>
          <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">{exp.experience}</p>
        </CardContent>
      </Card>

      {/* Tips */}
      <Card className="border-green-200 bg-green-50/30">
        <CardContent className="p-5">
          <h2 className="text-base font-bold text-slate-900 mb-2">💡 Tips for Future Applicants</h2>
          <p className="text-sm text-slate-700 leading-relaxed">{exp.tips}</p>
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button asChild className="flex-1">
          <Link href="/placements/experiences/add">Share Your Experience</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/placements/experiences">All Experiences</Link>
        </Button>
      </div>
    </div>
  );
}
