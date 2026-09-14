import Link from "next/link";
import { BookOpen, FileText, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Mock departments — will come from DB
const departments = [
  {
    id: "cse",
    name: "Computer Science Engineering",
    code: "CSE",
    years: [1, 2, 3, 4],
    subjectCount: 48,
  },
  {
    id: "ece",
    name: "Electronics & Communication Engineering",
    code: "ECE",
    years: [1, 2, 3, 4],
    subjectCount: 45,
  },
  {
    id: "me",
    name: "Mechanical Engineering",
    code: "ME",
    years: [1, 2, 3, 4],
    subjectCount: 44,
  },
  {
    id: "ce",
    name: "Civil Engineering",
    code: "CE",
    years: [1, 2, 3, 4],
    subjectCount: 42,
  },
];

export default function AcademicsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Academics</h1>
        <p className="text-sm text-slate-500 mt-1">
          Browse subjects, resources, previous papers, viva questions, and exam insights.
        </p>
      </div>

      {/* Department Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {departments.map((dept) => (
          <Card key={dept.id} className="hover:border-indigo-200 hover:shadow-md transition-all">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Badge variant="default">{dept.code}</Badge>
                <span className="text-xs text-slate-400">{dept.subjectCount} subjects</span>
              </div>
              <CardTitle className="text-base mt-2">{dept.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-2">
                {dept.years.map((year) => (
                  <Link
                    key={year}
                    href={`/academics/${dept.id}/year/${year}`}
                    className="flex flex-col items-center justify-center p-3 rounded-lg bg-slate-50 hover:bg-indigo-50 hover:text-indigo-700 transition-colors text-center group"
                  >
                    <span className="text-lg font-bold text-slate-700 group-hover:text-indigo-700">
                      {year}
                    </span>
                    <span className="text-xs text-slate-500 group-hover:text-indigo-600">
                      {year === 1 ? "1st" : year === 2 ? "2nd" : year === 3 ? "3rd" : "4th"} Year
                    </span>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick access */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link
          href="/academics/viva"
          className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 bg-white hover:border-indigo-200 hover:shadow-sm transition-all"
        >
          <span className="p-2 rounded-lg bg-amber-50">
            <FileText className="w-5 h-5 text-amber-600" />
          </span>
          <div>
            <p className="text-sm font-semibold text-slate-800">Viva Bank</p>
            <p className="text-xs text-slate-500">Browse viva questions by subject</p>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400 ml-auto" />
        </Link>

        <Link
          href="/academics/papers"
          className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 bg-white hover:border-indigo-200 hover:shadow-sm transition-all"
        >
          <span className="p-2 rounded-lg bg-blue-50">
            <BookOpen className="w-5 h-5 text-blue-600" />
          </span>
          <div>
            <p className="text-sm font-semibold text-slate-800">Previous Papers</p>
            <p className="text-xs text-slate-500">Past exam question papers</p>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400 ml-auto" />
        </Link>

        <Link
          href="/academics/professors"
          className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 bg-white hover:border-indigo-200 hover:shadow-sm transition-all"
        >
          <span className="p-2 rounded-lg bg-purple-50">
            <BookOpen className="w-5 h-5 text-purple-600" />
          </span>
          <div>
            <p className="text-sm font-semibold text-slate-800">Professor Insights</p>
            <p className="text-xs text-slate-500">Exam & viva patterns by faculty</p>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400 ml-auto" />
        </Link>
      </div>
    </div>
  );
}
