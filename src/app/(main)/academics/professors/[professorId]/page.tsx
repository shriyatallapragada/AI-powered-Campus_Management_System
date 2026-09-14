import Link from "next/link";
import { ChevronRight, Plus, ThumbsUp, BookOpen, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";

const professorData: Record<string, {
  name: string; dept: string; designation: string;
  subjects: string[];
  insights: { id: string; category: string; content: string; author: string; upvotes: number }[];
  topVivaQuestions: { id: string; question: string; subject: string; upvotes: number }[];
}> = {
  sharma: {
    name: "Prof. R. K. Sharma",
    dept: "CSE",
    designation: "Associate Professor",
    subjects: ["DBMS", "Operating Systems"],
    insights: [
      {
        id: "i1",
        category: "viva_pattern",
        content: "Viva usually starts with ER diagrams and normalization. Always be ready to normalize a table on the spot up to 3NF. Lab programs are mandatory — he checks if you actually ran all queries.",
        author: "Rahul K.",
        upvotes: 32,
      },
      {
        id: "i2",
        category: "exam_pattern",
        content: "Internal exams always have a 10-mark SQL query question. Units 3 (Normalization) and 4 (SQL) appear in every exam. Unit 5 (Transactions) appears in about 3 out of 4 papers.",
        author: "Anonymous",
        upvotes: 28,
      },
      {
        id: "i3",
        category: "preparation_tip",
        content: "Study the lab programs thoroughly — he often converts lab questions into viva questions. Make sure you understand the output of each query, not just write it.",
        author: "Priya S.",
        upvotes: 19,
      },
      {
        id: "i4",
        category: "assignment_style",
        content: "Assignments are submitted on paper. He checks for proper schema diagrams in DB design assignments. Late submissions are accepted but marks are deducted.",
        author: "Anonymous",
        upvotes: 11,
      },
    ],
    topVivaQuestions: [
      { id: "v1", question: "What is normalization? Explain 1NF, 2NF, 3NF with example.", subject: "DBMS", upvotes: 52 },
      { id: "v2", question: "Write a SQL query to find the second highest salary.", subject: "DBMS", upvotes: 38 },
      { id: "v3", question: "What are ACID properties? Explain each briefly.", subject: "DBMS", upvotes: 31 },
      { id: "v4", question: "What is the difference between a process and a thread?", subject: "OS", upvotes: 27 },
    ],
  },
};

const categoryLabels: Record<string, { label: string; color: string }> = {
  viva_pattern:     { label: "Viva Pattern",     color: "bg-amber-50 text-amber-700 border-amber-200" },
  exam_pattern:     { label: "Exam Pattern",     color: "bg-blue-50 text-blue-700 border-blue-200" },
  preparation_tip:  { label: "Preparation Tip",  color: "bg-green-50 text-green-700 border-green-200" },
  assignment_style: { label: "Assignment Style", color: "bg-purple-50 text-purple-700 border-purple-200" },
};

export default async function ProfessorPage({ params }: { params: Promise<{ professorId: string }> }) {
  const { professorId } = await params;
  const prof = professorData[professorId];

  if (!prof) {
    return (
      <div className="max-w-3xl mx-auto py-12 text-center">
        <p className="text-slate-500">Professor not found.</p>
        <Link href="/academics/professors" className="text-indigo-600 hover:underline text-sm mt-2 inline-block">Back</Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-slate-500">
        <Link href="/academics" className="hover:text-indigo-600">Academics</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/academics/professors" className="hover:text-indigo-600">Professors</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-700">{prof.name}</span>
      </nav>

      {/* Header */}
      <Card>
        <CardContent className="p-5 flex items-start gap-4">
          <Avatar className="w-14 h-14 shrink-0">
            <AvatarFallback className="text-lg">{getInitials(prof.name)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-slate-900">{prof.name}</h1>
            <p className="text-sm text-slate-500">{prof.designation} · {prof.dept}</p>
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              {prof.subjects.map((s) => (
                <span key={s} className="flex items-center gap-1 text-xs text-slate-600 bg-slate-100 px-2 py-1 rounded-full">
                  <BookOpen className="w-3 h-3" /> {s}
                </span>
              ))}
            </div>
          </div>
          <Button size="sm" asChild>
            <Link href={`/academics/professors/${professorId}/add-insight`}>
              <Plus className="w-3.5 h-3.5" /> Add Insight
            </Link>
          </Button>
        </CardContent>
      </Card>

      {/* Disclaimer */}
      <div className="flex items-start gap-2 p-3 rounded-lg bg-blue-50 border border-blue-100 text-xs text-blue-700">
        <Info className="w-4 h-4 shrink-0 mt-0.5" />
        <p>These insights are contributed by students and focus on academic patterns. Inappropriate content is removed by moderators.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Insights */}
        <div className="lg:col-span-2 space-y-3">
          <h2 className="text-sm font-semibold text-slate-700">Student Insights</h2>
          {prof.insights.map((ins) => {
            const cat = categoryLabels[ins.category] ?? { label: ins.category, color: "bg-slate-100 text-slate-600 border-slate-200" };
            return (
              <Card key={ins.id}>
                <CardContent className="p-4">
                  <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium border mb-2 ${cat.color}`}>
                    {cat.label}
                  </span>
                  <p className="text-sm text-slate-700 leading-relaxed">{ins.content}</p>
                  <div className="flex items-center gap-3 mt-3 text-xs text-slate-400">
                    <button className="flex items-center gap-1 hover:text-indigo-600 transition-colors">
                      <ThumbsUp className="w-3 h-3" /> {ins.upvotes}
                    </button>
                    <span>— {ins.author}</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Top Viva Qs */}
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-slate-700">Top Viva Questions</h2>
          {prof.topVivaQuestions.map((vq) => (
            <Card key={vq.id} className="hover:border-indigo-200 transition-all">
              <CardContent className="p-3">
                <Badge variant="secondary" className="mb-1.5">{vq.subject}</Badge>
                <p className="text-xs font-medium text-slate-800 leading-relaxed">{vq.question}</p>
                <div className="flex items-center gap-1 mt-2 text-xs text-slate-400">
                  <ThumbsUp className="w-3 h-3" /> {vq.upvotes}
                </div>
              </CardContent>
            </Card>
          ))}
          <Button variant="outline" size="sm" className="w-full" asChild>
            <Link href="/academics/viva/add">
              <Plus className="w-3.5 h-3.5" /> Add a Viva Question
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
