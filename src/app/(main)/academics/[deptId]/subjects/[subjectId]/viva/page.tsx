import Link from "next/link";
import { ChevronRight, Plus, ThumbsUp, MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const vivaQuestions = [
  { id: "v1", question: "What is normalization? Explain 1NF, 2NF, 3NF with an example.", answers: 11, upvotes: 52, professor: "Prof. Sharma", semester: 5, year: 2025 },
  { id: "v2", question: "Explain ACID properties with real-world examples.", answers: 6, upvotes: 38, professor: "Prof. Sharma", semester: 5, year: 2025 },
  { id: "v3", question: "Write a SQL query to find the second highest salary from an Employee table.", answers: 5, upvotes: 31, professor: "Prof. Sharma", semester: 5, year: 2024 },
  { id: "v4", question: "What is the difference between a primary key and a unique key?", answers: 4, upvotes: 27, professor: null, semester: 5, year: 2024 },
  { id: "v5", question: "What is a view? When would you use one?", answers: 3, upvotes: 22, professor: "Prof. Sharma", semester: 5, year: 2025 },
  { id: "v6", question: "Explain the difference between DELETE, DROP, and TRUNCATE.", answers: 8, upvotes: 45, professor: null, semester: 5, year: 2024 },
  { id: "v7", question: "What is a transaction? What are the states of a transaction?", answers: 4, upvotes: 28, professor: "Prof. Sharma", semester: 5, year: 2025 },
  { id: "v8", question: "What is an index? How does it improve query performance?", answers: 3, upvotes: 19, professor: null, semester: 5, year: 2023 },
];

export default async function SubjectVivaPage({ params }: { params: Promise<{ deptId: string; subjectId: string }> }) {
  const { deptId, subjectId } = await params;
  const subjectName = subjectId.toUpperCase();

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-slate-500 flex-wrap">
        <Link href="/academics" className="hover:text-indigo-600">Academics</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="uppercase">{deptId}</span>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href={`/academics/${deptId}/subjects/${subjectId}`} className="hover:text-indigo-600">{subjectName}</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-700">Viva Questions</span>
      </nav>

      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900">{subjectName} — Viva Bank</h1>
          <p className="text-sm text-slate-500 mt-0.5">{vivaQuestions.length} questions contributed by students</p>
        </div>
        <Button asChild>
          <Link href={`/academics/${deptId}/subjects/${subjectId}/viva/add`}>
            <Plus className="w-4 h-4" /> Add Question
          </Link>
        </Button>
      </div>

      <div className="space-y-3">
        {vivaQuestions
          .sort((a, b) => b.upvotes - a.upvotes)
          .map((vq) => (
            <Card key={vq.id} className="hover:border-indigo-200 hover:shadow-sm transition-all">
              <CardContent className="p-4">
                <p className="text-sm font-medium text-slate-900 leading-relaxed">{vq.question}</p>
                <div className="flex items-center gap-3 mt-3 flex-wrap text-xs text-slate-400">
                  {vq.professor && (
                    <Badge variant="secondary">{vq.professor}</Badge>
                  )}
                  <Badge variant="outline">Sem {vq.semester}</Badge>
                  <Badge variant="outline">{vq.year}</Badge>
                  <span className="flex items-center gap-1 ml-auto">
                    <ThumbsUp className="w-3 h-3" /> {vq.upvotes}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageSquare className="w-3 h-3" /> {vq.answers} answers
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>

      <Button variant="outline" className="w-full" asChild>
        <Link href={`/academics/${deptId}/subjects/${subjectId}/viva/add`}>
          <Plus className="w-4 h-4" /> Add a Viva Question You Were Asked
        </Link>
      </Button>
    </div>
  );
}
