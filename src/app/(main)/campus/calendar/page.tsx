import Link from "next/link";
import { ChevronRight, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";

const calendarEvents = [
  // September
  { date: "2026-09-17", label: "Guest Lecture — Product Management", type: "event" },
  { date: "2026-09-18", label: "DBMS Internal Exam", type: "exam" },
  { date: "2026-09-19", label: "AI Workshop Registration Deadline", type: "deadline" },
  { date: "2026-09-20", label: "AI/ML Workshop — GDSC", type: "event" },
  { date: "2026-09-20", label: "Amazon Internship Application Deadline", type: "deadline" },
  { date: "2026-09-22", label: "OS Internal Exam", type: "exam" },
  { date: "2026-09-25", label: "Microsoft Placement Drive", type: "event" },
  { date: "2026-09-28", label: "24-Hour Hackathon — IEEE", type: "event" },
  // October
  { date: "2026-10-01", label: "Infosys Placement Drive", type: "event" },
  { date: "2026-10-02", label: "Gandhi Jayanti", type: "holiday" },
  { date: "2026-10-05", label: "End Semester Exams Begin — Sem 5", type: "exam" },
  { date: "2026-10-10", label: "Semester Fee Payment Deadline", type: "deadline" },
  { date: "2026-10-15", label: "End Semester Exams Begin — Sem 3", type: "exam" },
  { date: "2026-10-25", label: "Diwali Holidays Begin", type: "holiday" },
  { date: "2026-11-03", label: "College Reopens", type: "event" },
  { date: "2026-11-10", label: "Next Semester Registration Opens", type: "deadline" },
];

const typeConfig: Record<string, { color: string; label: string }> = {
  exam:     { color: "bg-red-100 text-red-700 border-red-200",     label: "Exam" },
  event:    { color: "bg-indigo-100 text-indigo-700 border-indigo-200", label: "Event" },
  deadline: { color: "bg-amber-100 text-amber-700 border-amber-200", label: "Deadline" },
  holiday:  { color: "bg-green-100 text-green-700 border-green-200",  label: "Holiday" },
};

// Group by month
const grouped = calendarEvents.reduce<Record<string, typeof calendarEvents>>((acc, ev) => {
  const month = new Date(ev.date).toLocaleDateString("en-IN", { month: "long", year: "numeric" });
  if (!acc[month]) acc[month] = [];
  acc[month].push(ev);
  return acc;
}, {});

export default function CalendarPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <nav className="flex items-center gap-1.5 text-sm text-slate-500">
        <Link href="/campus" className="hover:text-indigo-600">Campus</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-700">Academic Calendar</span>
      </nav>

      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-indigo-500" />
            Academic Calendar
          </h1>
          <p className="text-sm text-slate-500 mt-1">Exams, events, deadlines, and holidays.</p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-2 flex-wrap justify-end">
          {Object.entries(typeConfig).map(([type, cfg]) => (
            <span key={type} className={`px-2 py-0.5 rounded-full text-xs font-medium border ${cfg.color}`}>
              {cfg.label}
            </span>
          ))}
        </div>
      </div>

      {Object.entries(grouped).map(([month, events]) => (
        <div key={month}>
          <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wide mb-3">{month}</h2>
          <div className="space-y-2">
            {events.map((ev, i) => {
              const cfg = typeConfig[ev.type] ?? typeConfig.event;
              const d = new Date(ev.date);
              const isToday = d.toDateString() === new Date().toDateString();
              const isPast = d < new Date() && !isToday;
              return (
                <Card key={i} className={`transition-all ${isPast ? "opacity-50" : ""} ${isToday ? "border-indigo-300 bg-indigo-50/30" : ""}`}>
                  <CardContent className="p-3 flex items-center gap-3">
                    <div className="text-center shrink-0 w-10">
                      <p className="text-xs font-bold text-slate-500 uppercase">
                        {d.toLocaleDateString("en-IN", { weekday: "short" })}
                      </p>
                      <p className="text-lg font-bold text-slate-900 leading-tight">
                        {d.getDate()}
                      </p>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium ${isPast ? "text-slate-400" : "text-slate-800"}`}>
                        {ev.label}
                        {isToday && <span className="ml-2 text-xs text-indigo-600 font-semibold">Today</span>}
                      </p>
                      <p className="text-xs text-slate-400">{formatDate(ev.date)}</p>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium border shrink-0 ${cfg.color}`}>
                      {cfg.label}
                    </span>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
