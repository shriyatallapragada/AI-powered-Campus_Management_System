import Link from "next/link";
import { ChevronRight, Plus, Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const subjects = [
  { id: "dbms",  name: "Database Management Systems", code: "CS501", dept: "CSE", year: 3, sem: 5, resources: 24, viva: 87 },
  { id: "os",    name: "Operating Systems",            code: "CS502", dept: "CSE", year: 3, sem: 5, resources: 18, viva: 65 },
  { id: "cn",    name: "Computer Networks",            code: "CS503", dept: "CSE", year: 3, sem: 5, resources: 15, viva: 52 },
  { id: "ml",    name: "Machine Learning",             code: "CS601", dept: "CSE", year: 3, sem: 6, resources: 20, viva: 29 },
  { id: "se",    name: "Software Engineering",         code: "CS602", dept: "CSE", year: 3, sem: 6, resources: 12, viva: 41 },
];

export default function AdminSubjectsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <nav className="flex items-center gap-1.5 text-sm text-slate-500">
        <Link href="/admin" className="hover:text-indigo-600">Admin</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-700">Subjects</span>
      </nav>

      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-slate-900">Manage Subjects</h1>
        <Button size="sm">
          <Plus className="w-4 h-4" /> Add Subject
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm text-slate-500 font-medium">{subjects.length} subjects</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-slate-100">
            {subjects.map((s) => (
              <div key={s.id} className="flex items-center gap-3 px-5 py-3 hover:bg-slate-50">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-slate-900">{s.name}</p>
                    <Badge variant="secondary">{s.code}</Badge>
                  </div>
                  <p className="text-xs text-slate-500">{s.dept} · Year {s.year} · Sem {s.sem}</p>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-400 shrink-0">
                  <span>{s.resources} resources</span>
                  <span>{s.viva} viva Qs</span>
                  <button className="p-1.5 rounded text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors">
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button className="p-1.5 rounded text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
