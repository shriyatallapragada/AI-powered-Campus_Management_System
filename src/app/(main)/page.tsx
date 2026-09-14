import {
  BookOpen,
  Briefcase,
  Compass,
  MessageSquare,
  Plus,
  Upload,
  FileQuestion,
  ClipboardList,
  ArrowRight,
  Calendar,
  Bell,
  TrendingUp,
  Star,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";

// Mock data — will be replaced with real DB queries
const recentUpdates = [
  {
    id: "1",
    type: "placement",
    title: "Amazon SDE Intern — Applications Open",
    subtitle: "CSE/ECE | CGPA > 8.0 | 3rd Year",
    time: "2 hours ago",
    badge: "official",
    href: "/placements/1",
  },
  {
    id: "2",
    type: "event",
    title: "AI/ML Workshop by Google Developer Students",
    subtitle: "Sep 20, 2026 · Seminar Hall B",
    time: "4 hours ago",
    badge: "event",
    href: "/campus/events/2",
  },
  {
    id: "3",
    type: "notice",
    title: "End Semester Exam Schedule Released",
    subtitle: "Exam cell announcement",
    time: "1 day ago",
    badge: "official",
    href: "/campus/notices/3",
  },
  {
    id: "4",
    type: "resource",
    title: "DBMS Previous Year Papers 2022–2025 uploaded",
    subtitle: "CSE 3rd Year · Sem 5",
    time: "2 days ago",
    badge: "community",
    href: "/academics/subjects/dbms",
  },
];

const upcomingItems = [
  {
    id: "1",
    label: "DBMS Internal Exam",
    date: "Sep 18, 2026",
    type: "exam",
    href: "/academics/subjects/dbms",
  },
  {
    id: "2",
    label: "Amazon Internship Deadline",
    date: "Sep 20, 2026",
    type: "deadline",
    href: "/placements/1",
  },
  {
    id: "3",
    label: "AI Workshop Registration Closes",
    date: "Sep 19, 2026",
    type: "event",
    href: "/campus/events/2",
  },
  {
    id: "4",
    label: "OS Internal Exam",
    date: "Sep 22, 2026",
    type: "exam",
    href: "/academics/subjects/os",
  },
];

const quickActions = [
  {
    label: "Ask a Question",
    icon: MessageSquare,
    href: "/community/ask",
    color: "bg-violet-50 text-violet-600",
  },
  {
    label: "Upload Resource",
    icon: Upload,
    href: "/academics/upload",
    color: "bg-blue-50 text-blue-600",
  },
  {
    label: "Share Opportunity",
    icon: Compass,
    href: "/opportunities/add",
    color: "bg-green-50 text-green-600",
  },
  {
    label: "Add Viva Question",
    icon: FileQuestion,
    href: "/academics/viva/add",
    color: "bg-amber-50 text-amber-600",
  },
  {
    label: "Add Exam Experience",
    icon: ClipboardList,
    href: "/academics/exam-experience/add",
    color: "bg-pink-50 text-pink-600",
  },
  {
    label: "Share Placement Exp",
    icon: Briefcase,
    href: "/placements/experiences/add",
    color: "bg-indigo-50 text-indigo-600",
  },
];

const hotDiscussions = [
  {
    id: "1",
    title: "What topics did Prof. Sharma focus on in DBMS viva?",
    answers: 12,
    views: 340,
    tags: ["DBMS", "Viva"],
    href: "/community/1",
  },
  {
    id: "2",
    title: "Which elective is easier — Cloud Computing or Information Security?",
    answers: 8,
    views: 210,
    tags: ["Electives"],
    href: "/community/2",
  },
  {
    id: "3",
    title: "Has anyone received the Amazon intern offer letter?",
    answers: 5,
    views: 180,
    tags: ["Placements", "Amazon"],
    href: "/community/3",
  },
];

const typeColors: Record<string, string> = {
  exam: "bg-red-50 text-red-600",
  deadline: "bg-amber-50 text-amber-700",
  event: "bg-indigo-50 text-indigo-600",
  holiday: "bg-green-50 text-green-600",
};

const badgeVariants: Record<string, "official" | "community" | "default" | "warning"> = {
  official: "official",
  community: "community",
  event: "default",
};

export default function HomePage() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Good morning 👋</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Here&apos;s what&apos;s happening at your college today.
          </p>
        </div>
        <Button asChild size="sm">
          <Link href="/community/ask">
            <Plus className="w-4 h-4" />
            Contribute
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-5">

          {/* Quick Actions */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-slate-500 font-medium">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {quickActions.map(({ label, icon: Icon, href, color }) => (
                  <Link
                    key={href}
                    href={href}
                    className="flex items-center gap-2.5 p-3 rounded-lg border border-slate-100 hover:border-indigo-200 hover:shadow-sm transition-all group"
                  >
                    <span className={`p-1.5 rounded-md ${color}`}>
                      <Icon className="w-3.5 h-3.5" />
                    </span>
                    <span className="text-xs font-medium text-slate-700 group-hover:text-slate-900">
                      {label}
                    </span>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Updates */}
          <Card>
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Bell className="w-4 h-4 text-indigo-500" />
                Recent Updates
              </CardTitle>
              <Link href="/campus/notices" className="text-xs text-indigo-600 hover:underline">
                View all
              </Link>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentUpdates.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors group"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-medium text-slate-800 group-hover:text-indigo-700 truncate">
                        {item.title}
                      </span>
                      <Badge variant={badgeVariants[item.badge] ?? "secondary"}>
                        {item.badge}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">{item.subtitle}</p>
                  </div>
                  <span className="text-xs text-slate-400 shrink-0">{item.time}</span>
                </Link>
              ))}
            </CardContent>
          </Card>

          {/* Hot Discussions */}
          <Card>
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-violet-500" />
                Active Discussions
              </CardTitle>
              <Link href="/community" className="text-xs text-indigo-600 hover:underline">
                View all
              </Link>
            </CardHeader>
            <CardContent className="space-y-3">
              {hotDiscussions.map((d) => (
                <Link
                  key={d.id}
                  href={d.href}
                  className="block p-3 rounded-lg hover:bg-slate-50 transition-colors group"
                >
                  <p className="text-sm font-medium text-slate-800 group-hover:text-indigo-700">
                    {d.title}
                  </p>
                  <div className="flex items-center gap-3 mt-1.5">
                    <div className="flex gap-1.5">
                      {d.tags.map((t) => (
                        <Badge key={t} variant="secondary">{t}</Badge>
                      ))}
                    </div>
                    <span className="text-xs text-slate-400 ml-auto">
                      {d.answers} answers · {d.views} views
                    </span>
                  </div>
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right column */}
        <div className="space-y-5">
          {/* Upcoming */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Calendar className="w-4 h-4 text-green-500" />
                Upcoming
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {upcomingItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-50 transition-colors group"
                >
                  <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${typeColors[item.type]}`}>
                    {item.type}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-slate-700 truncate group-hover:text-indigo-700">
                      {item.label}
                    </p>
                    <p className="text-xs text-slate-400">{item.date}</p>
                  </div>
                </Link>
              ))}
              <Link
                href="/campus/calendar"
                className="flex items-center gap-1 text-xs text-indigo-600 hover:underline mt-1 pt-1"
              >
                Full calendar <ArrowRight className="w-3 h-3" />
              </Link>
            </CardContent>
          </Card>

          {/* Recommended */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-400" />
                Recommended for You
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                { label: "DBMS Viva Questions", href: "/academics/subjects/dbms/viva", icon: BookOpen },
                { label: "Amazon Internship", href: "/placements/1", icon: Briefcase },
                { label: "CSE Placement Stats 2025", href: "/placements/stats", icon: TrendingUp },
                { label: "OS Important Questions", href: "/academics/subjects/os", icon: BookOpen },
              ].map(({ label, href, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center gap-2.5 p-2.5 rounded-lg hover:bg-slate-50 transition-colors group text-sm"
                >
                  <Icon className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 shrink-0" />
                  <span className="text-slate-700 group-hover:text-slate-900 truncate">{label}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-indigo-400 ml-auto shrink-0" />
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
