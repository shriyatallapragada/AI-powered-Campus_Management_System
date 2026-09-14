"use client";

import Link from "next/link";
import { Plus, ThumbsUp, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getInitials, formatRelativeTime } from "@/lib/utils";

const experiences = [
  {
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
    rounds: ["Online Assessment (DSA)", "Technical Interview 1", "Technical Interview 2", "HR"],
    preparation: ["DSA", "OOP", "DBMS", "OS", "System Design basics"],
    summary: "The OA had 2 DSA problems — medium difficulty. Tech interviews focused on trees, graphs, and one design question.",
  },
  {
    id: "2",
    company: "Razorpay",
    role: "Backend Engineering Intern",
    type: "INTERNSHIP",
    year: 2026,
    outcome: "selected",
    author: "Anonymous",
    isAnonymous: true,
    upvotes: 31,
    createdAt: new Date(Date.now() - 8 * 24 * 3600 * 1000).toISOString(),
    rounds: ["Coding Test", "Technical Interview", "Culture Fit"],
    preparation: ["DSA", "System Design", "Databases", "REST APIs"],
    summary: "Coding test had 3 problems — one easy, two medium. Tech interview was deep on database design and API design.",
  },
  {
    id: "3",
    company: "Infosys",
    role: "Systems Engineer",
    type: "PLACEMENT",
    year: 2025,
    outcome: "selected",
    author: "Priya S.",
    isAnonymous: false,
    upvotes: 22,
    createdAt: new Date(Date.now() - 15 * 24 * 3600 * 1000).toISOString(),
    rounds: ["Online Test (Aptitude + Coding)", "HR Interview"],
    preparation: ["Aptitude", "Verbal", "Basic coding", "Resume prep"],
    summary: "Fairly straightforward. OT has quantitative aptitude, verbal, and 2 basic coding questions.",
  },
];

const outcomeColors: Record<string, string> = {
  selected: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
  waitlisted: "bg-amber-100 text-amber-700",
};

export default function PlacementExperiencesPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <nav className="flex items-center gap-1.5 text-sm text-slate-500 mb-1">
            <Link href="/placements" className="hover:text-indigo-600">Placements</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-700">Experiences</span>
          </nav>
          <h1 className="text-xl font-bold text-slate-900">Placement Experiences</h1>
          <p className="text-sm text-slate-500 mt-1">Real stories from students who went through the process.</p>
        </div>
        <Button asChild>
          <Link href="/placements/experiences/add">
            <Plus className="w-4 h-4" /> Share Your Experience
          </Link>
        </Button>
      </div>

      <div className="space-y-4">
        {experiences.map((exp) => (
          <Link key={exp.id} href={`/placements/experiences/${exp.id}`}>
            <Card className="hover:border-indigo-200 hover:shadow-md transition-all cursor-pointer">
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 className="text-base font-bold text-slate-900">{exp.company}</h3>
                      <Badge variant={exp.type === "INTERNSHIP" ? "default" : "warning"}>{exp.type}</Badge>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${outcomeColors[exp.outcome]}`}>
                        {exp.outcome}
                      </span>
                    </div>
                    <p className="text-sm text-slate-700">{exp.role} · {exp.year}</p>
                    <p className="text-sm text-slate-600 mt-2 line-clamp-2">{exp.summary}</p>
                    <div className="flex items-center gap-2 mt-3 flex-wrap">
                      <span className="text-xs text-slate-500">{exp.rounds.length} rounds:</span>
                      {exp.rounds.map((r, i) => <Badge key={i} variant="secondary">{r}</Badge>)}
                    </div>
                    <div className="flex items-center gap-3 mt-3 text-xs text-slate-400">
                      <Avatar className="w-5 h-5">
                        <AvatarFallback className="text-[9px]">
                          {exp.isAnonymous ? "?" : getInitials(exp.author)}
                        </AvatarFallback>
                      </Avatar>
                      <span>{exp.isAnonymous ? "Anonymous" : exp.author}</span>
                      <span>{formatRelativeTime(exp.createdAt)}</span>
                    </div>
                  </div>
                  {/* Upvote count — no onClick needed on list view */}
                  <div className="flex flex-col items-center gap-1 shrink-0 p-2 rounded-lg">
                    <ThumbsUp className="w-4 h-4 text-slate-400" />
                    <span className="text-sm font-semibold text-slate-600">{exp.upvotes}</span>
                    <span className="text-xs text-slate-400">helpful</span>
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
