import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

// Mock subject data per dept/year
const subjectsByDeptYear: Record<string, Record<number, { sem: number; subjects: { id: string; name: string; code: string; resourceCount: number; vivaCount: number }[] }[]>> = {
  cse: {
    3: [
      {
        sem: 5,
        subjects: [
          { id: "dbms", name: "Database Management Systems", code: "CS501", resourceCount: 24, vivaCount: 87 },
          { id: "os", name: "Operating Systems", code: "CS502", resourceCount: 18, vivaCount: 65 },
          { id: "cn", name: "Computer Networks", code: "CS503", resourceCount: 15, vivaCount: 52 },
          { id: "toc", name: "Theory of Computation", code: "CS504", resourceCount: 10, vivaCount: 34 },
        ],
      },
      {
        sem: 6,
        subjects: [
          { id: "se", name: "Software Engineering", code: "CS601", resourceCount: 12, vivaCount: 41 },
          { id: "ml", name: "Machine Learning", code: "CS602", resourceCount: 20, vivaCount: 29 },
          { id: "cg", name: "Computer Graphics", code: "CS603", resourceCount: 8, vivaCount: 22 },
          { id: "daa", name: "Design & Analysis of Algorithms", code: "CS604", resourceCount: 14, vivaCount: 56 },
        ],
      },
    ],
  },
};

export default async function YearPage({
  params,
}: {
  params: Promise<{ deptId: string; year: string }>;
}) {
  const { deptId, year } = await params;
  const yearNum = parseInt(year);

  const semesters = subjectsByDeptYear[deptId]?.[yearNum] ?? [
    {
      sem: yearNum * 2 - 1,
      subjects: [
        { id: "sub1", name: "Subject 1", code: "XX001", resourceCount: 0, vivaCount: 0 },
        { id: "sub2", name: "Subject 2", code: "XX002", resourceCount: 0, vivaCount: 0 },
      ],
    },
    {
      sem: yearNum * 2,
      subjects: [
        { id: "sub3", name: "Subject 3", code: "XX003", resourceCount: 0, vivaCount: 0 },
        { id: "sub4", name: "Subject 4", code: "XX004", resourceCount: 0, vivaCount: 0 },
      ],
    },
  ];

  const yearLabel = ["1st", "2nd", "3rd", "4th"][yearNum - 1] ?? `${yearNum}th`;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-slate-500">
        <Link href="/academics" className="hover:text-indigo-600">Academics</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="uppercase font-medium text-slate-700">{deptId}</span>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-700">{yearLabel} Year</span>
      </nav>

      <div>
        <h1 className="text-xl font-bold text-slate-900">
          {yearLabel} Year — {deptId.toUpperCase()}
        </h1>
        <p className="text-sm text-slate-500 mt-1">Select a subject to view resources, papers, and viva questions.</p>
      </div>

      {semesters.map(({ sem, subjects }) => (
        <div key={sem}>
          <h2 className="text-sm font-semibold text-slate-600 mb-3 flex items-center gap-2">
            <span className="px-2.5 py-1 bg-slate-100 rounded-md">Semester {sem}</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {subjects.map((subject) => (
              <Link
                key={subject.id}
                href={`/academics/${deptId}/subjects/${subject.id}`}
                className="block"
              >
                <Card className="hover:border-indigo-200 hover:shadow-md transition-all cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-semibold text-slate-800">{subject.name}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{subject.code}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                      <Badge variant="secondary">{subject.resourceCount} resources</Badge>
                      <Badge variant="warning">{subject.vivaCount} viva Qs</Badge>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
