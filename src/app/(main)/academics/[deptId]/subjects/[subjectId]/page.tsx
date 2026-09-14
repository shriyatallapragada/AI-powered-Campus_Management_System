import Link from "next/link";
import {
  ChevronRight,
  FileText,
  BookOpen,
  Upload,
  Plus,
  Download,
  ThumbsUp,
  Info,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Mock subject data
const subjectData: Record<string, {
  name: string;
  code: string;
  dept: string;
  year: number;
  sem: number;
  resources: { id: string; title: string; type: string; uploadedBy: string; source: string; downloads: number }[];
  papers: { id: string; title: string; year: number; examType: string }[];
  vivaQuestions: { id: string; question: string; upvotes: number; answers: number; professor?: string }[];
  examInsights: { unit: string; frequency: string; papers: number }[];
}> = {
  dbms: {
    name: "Database Management Systems",
    code: "CS501",
    dept: "CSE",
    year: 3,
    sem: 5,
    resources: [
      { id: "r1", title: "DBMS Complete Notes by Rahul", type: "notes", uploadedBy: "Rahul K.", source: "verified_student", downloads: 234 },
      { id: "r2", title: "Navathe Textbook Reference — Chapter 4-7", type: "reference", uploadedBy: "Admin", source: "official", downloads: 178 },
      { id: "r3", title: "Lab Programs 1–10 with Solutions", type: "lab_material", uploadedBy: "Priya S.", source: "verified_student", downloads: 312 },
    ],
    papers: [
      { id: "p1", title: "DBMS End Sem 2024", year: 2024, examType: "external" },
      { id: "p2", title: "DBMS End Sem 2023", year: 2023, examType: "external" },
      { id: "p3", title: "DBMS Internal 1 — 2024", year: 2024, examType: "internal" },
      { id: "p4", title: "DBMS End Sem 2022", year: 2022, examType: "external" },
    ],
    vivaQuestions: [
      { id: "v1", question: "What is the difference between DBMS and RDBMS?", upvotes: 45, answers: 8, professor: "Prof. Sharma" },
      { id: "v2", question: "Explain ACID properties with examples.", upvotes: 38, answers: 6, professor: "Prof. Sharma" },
      { id: "v3", question: "What is normalization? Explain 1NF, 2NF, 3NF.", upvotes: 52, answers: 11 },
      { id: "v4", question: "Write a SQL query to find the second highest salary.", upvotes: 31, answers: 5, professor: "Prof. Sharma" },
      { id: "v5", question: "What is a transaction? Explain concurrency control.", upvotes: 28, answers: 4 },
    ],
    examInsights: [
      { unit: "Unit 3 — Normalization", frequency: "appeared in 4/4 papers", papers: 4 },
      { unit: "Unit 1 — ER Diagrams", frequency: "appeared in 4/4 papers", papers: 4 },
      { unit: "Unit 5 — Transactions", frequency: "appeared in 3/4 papers", papers: 3 },
      { unit: "Unit 4 — SQL Queries", frequency: "appeared in 4/4 papers", papers: 4 },
    ],
  },
};

const sourceLabels: Record<string, { label: string; variant: "official" | "community" | "secondary" }> = {
  official: { label: "Official", variant: "official" },
  verified_student: { label: "Verified Student", variant: "secondary" },
  community: { label: "Community", variant: "community" },
};

const resourceTypeIcons: Record<string, string> = {
  notes: "📝",
  reference: "📚",
  lab_material: "🧪",
  previous_paper: "📄",
};

export default async function SubjectPage({
  params,
}: {
  params: Promise<{ deptId: string; subjectId: string }>;
}) {
  const { deptId, subjectId } = await params;
  const subject = subjectData[subjectId] ?? {
    name: subjectId.toUpperCase(),
    code: "—",
    dept: deptId.toUpperCase(),
    year: 1,
    sem: 1,
    resources: [],
    papers: [],
    vivaQuestions: [],
    examInsights: [],
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-slate-500 flex-wrap">
        <Link href="/academics" className="hover:text-indigo-600">Academics</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="uppercase">{deptId}</span>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href={`/academics/${deptId}/year/${subject.year}`} className="hover:text-indigo-600">
          Year {subject.year}
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-700 font-medium">{subject.name}</span>
      </nav>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900">{subject.name}</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            {subject.code} · {subject.dept} · Year {subject.year} · Sem {subject.sem}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/academics/${deptId}/subjects/${subjectId}/viva/add`}>
              <Plus className="w-3.5 h-3.5" /> Add Viva Q
            </Link>
          </Button>
          <Button size="sm" asChild>
            <Link href={`/academics/upload?subject=${subjectId}`}>
              <Upload className="w-3.5 h-3.5" /> Upload Resource
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">

          {/* Exam Insights */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Info className="w-4 h-4 text-amber-500" />
                Exam Insights
              </CardTitle>
              <p className="text-xs text-slate-500 flex items-center gap-1.5">
                <span className="inline-block w-3 h-3 rounded-full bg-amber-100 border border-amber-300" />
                Based on previous papers uploaded by students — not predictions.
              </p>
            </CardHeader>
            <CardContent className="space-y-2">
              {subject.examInsights.map((insight, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 rounded-lg bg-amber-50 border border-amber-100"
                >
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-800">{insight.unit}</p>
                    <p className="text-xs text-amber-700 mt-0.5">{insight.frequency}</p>
                  </div>
                  <div className="flex gap-1">
                    {Array.from({ length: 4 }).map((_, j) => (
                      <div
                        key={j}
                        className={`w-2 h-2 rounded-full ${j < insight.papers ? "bg-amber-500" : "bg-amber-200"}`}
                      />
                    ))}
                  </div>
                </div>
              ))}
              <p className="text-xs text-slate-400 mt-2">
                Based on {subject.papers.length} question papers uploaded on this platform.
              </p>
            </CardContent>
          </Card>

          {/* Resources */}
          <Card>
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-blue-500" />
                Resources
              </CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href={`/academics/upload?subject=${subjectId}`}>
                  <Upload className="w-3.5 h-3.5" /> Upload
                </Link>
              </Button>
            </CardHeader>
            <CardContent className="space-y-2">
              {subject.resources.length === 0 && (
                <p className="text-sm text-slate-400 text-center py-4">No resources yet — be the first to upload!</p>
              )}
              {subject.resources.map((r) => {
                const src = sourceLabels[r.source] ?? sourceLabels.community;
                return (
                  <div
                    key={r.id}
                    className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 hover:border-indigo-200 hover:bg-slate-50 transition-all"
                  >
                    <span className="text-lg">{resourceTypeIcons[r.type] ?? "📁"}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-800 truncate">{r.title}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <Badge variant={src.variant}>{src.label}</Badge>
                        <span className="text-xs text-slate-400">by {r.uploadedBy}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="shrink-0">
                      <Download className="w-3.5 h-3.5" />
                      <span className="text-xs text-slate-500 ml-1">{r.downloads}</span>
                    </Button>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-5">
          {/* Previous Papers */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <FileText className="w-4 h-4 text-slate-500" />
                Previous Papers
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {subject.papers.map((p) => (
                <Link
                  key={p.id}
                  href={`/academics/papers/${p.id}`}
                  className="flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <div>
                    <p className="text-xs font-medium text-slate-700">{p.title}</p>
                    <Badge variant={p.examType === "external" ? "default" : "secondary"} className="mt-1">
                      {p.examType}
                    </Badge>
                  </div>
                  <Download className="w-3.5 h-3.5 text-slate-400" />
                </Link>
              ))}
            </CardContent>
          </Card>

          {/* Top Viva Questions */}
          <Card>
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-semibold">Top Viva Questions</CardTitle>
              <Link href={`/academics/${deptId}/subjects/${subjectId}/viva`} className="text-xs text-indigo-600 hover:underline">
                View all
              </Link>
            </CardHeader>
            <CardContent className="space-y-3">
              {subject.vivaQuestions.slice(0, 4).map((vq) => (
                <Link
                  key={vq.id}
                  href={`/academics/viva/${vq.id}`}
                  className="block p-3 rounded-lg bg-slate-50 hover:bg-indigo-50 transition-colors"
                >
                  <p className="text-xs font-medium text-slate-800 leading-relaxed">{vq.question}</p>
                  <div className="flex items-center gap-2 mt-2">
                    {vq.professor && (
                      <span className="text-xs text-slate-500">{vq.professor}</span>
                    )}
                    <span className="flex items-center gap-0.5 text-xs text-slate-400 ml-auto">
                      <ThumbsUp className="w-3 h-3" /> {vq.upvotes}
                    </span>
                    <span className="text-xs text-slate-400">{vq.answers} ans</span>
                  </div>
                </Link>
              ))}
              <Button variant="outline" size="sm" className="w-full mt-1" asChild>
                <Link href={`/academics/${deptId}/subjects/${subjectId}/viva/add`}>
                  <Plus className="w-3.5 h-3.5" /> Add a Viva Question
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
