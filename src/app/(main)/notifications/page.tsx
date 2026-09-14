import Link from "next/link";
import { Bell, CheckCheck, Briefcase, Calendar, MessageSquare, BookOpen, Megaphone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatRelativeTime } from "@/lib/utils";

const notifications = [
  {
    id: "1",
    type: "placement",
    title: "New opportunity: Amazon SDE Intern",
    body: "Applications open. Deadline: Sep 20. Eligible: CSE/ECE, CGPA ≥ 8.0",
    link: "/placements",
    read: false,
    createdAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
  },
  {
    id: "2",
    type: "answer",
    title: "New answer on your question",
    body: "Rahul K. answered: \"What topics did Prof. Sharma focus on in DBMS viva?\"",
    link: "/community/1",
    read: false,
    createdAt: new Date(Date.now() - 5 * 3600 * 1000).toISOString(),
  },
  {
    id: "3",
    type: "event",
    title: "AI/ML Workshop starts tomorrow",
    body: "GDSC Workshop — Sep 20, 10 AM, Seminar Hall B",
    link: "/campus",
    read: false,
    createdAt: new Date(Date.now() - 20 * 3600 * 1000).toISOString(),
  },
  {
    id: "4",
    type: "resource",
    title: "New resource for DBMS",
    body: "Rahul K. uploaded: \"DBMS Complete Notes — Unit 1 to 5\"",
    link: "/academics/cse/subjects/dbms",
    read: true,
    createdAt: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString(),
  },
  {
    id: "5",
    type: "announcement",
    title: "End Semester Exam Schedule Released",
    body: "Check the official exam schedule for Semester 5 & 6.",
    link: "/campus",
    read: true,
    createdAt: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString(),
  },
  {
    id: "6",
    type: "placement",
    title: "Deadline approaching: Razorpay Intern",
    body: "Application deadline is tomorrow — Sep 18.",
    link: "/opportunities",
    read: true,
    createdAt: new Date(Date.now() - 3 * 24 * 3600 * 1000).toISOString(),
  },
];

const typeIcon: Record<string, React.ElementType> = {
  placement:    Briefcase,
  answer:       MessageSquare,
  event:        Calendar,
  resource:     BookOpen,
  announcement: Megaphone,
};

const typeColor: Record<string, string> = {
  placement:    "bg-green-50 text-green-600",
  answer:       "bg-violet-50 text-violet-600",
  event:        "bg-indigo-50 text-indigo-600",
  resource:     "bg-blue-50 text-blue-600",
  announcement: "bg-amber-50 text-amber-600",
};

export default function NotificationsPage() {
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Bell className="w-5 h-5 text-indigo-500" />
            Notifications
            {unreadCount > 0 && (
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-indigo-600 text-white text-xs font-bold">
                {unreadCount}
              </span>
            )}
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">Stay updated on what matters to you.</p>
        </div>
        <Button variant="ghost" size="sm" className="text-slate-500">
          <CheckCheck className="w-4 h-4 mr-1" /> Mark all read
        </Button>
      </div>

      {/* Unread */}
      {notifications.some((n) => !n.read) && (
        <div className="space-y-2">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">New</p>
          {notifications.filter((n) => !n.read).map((notif) => {
            const Icon = typeIcon[notif.type] ?? Bell;
            return (
              <Link key={notif.id} href={notif.link}>
                <Card className="border-indigo-100 bg-indigo-50/20 hover:border-indigo-200 hover:shadow-sm transition-all cursor-pointer">
                  <CardContent className="p-4 flex items-start gap-3">
                    <span className={`p-2 rounded-lg shrink-0 ${typeColor[notif.type]}`}>
                      <Icon className="w-4 h-4" />
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-900">{notif.title}</p>
                      <p className="text-xs text-slate-600 mt-0.5">{notif.body}</p>
                      <p className="text-xs text-slate-400 mt-1">{formatRelativeTime(notif.createdAt)}</p>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      )}

      {/* Read */}
      {notifications.some((n) => n.read) && (
        <div className="space-y-2">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Earlier</p>
          {notifications.filter((n) => n.read).map((notif) => {
            const Icon = typeIcon[notif.type] ?? Bell;
            return (
              <Link key={notif.id} href={notif.link}>
                <Card className="hover:border-slate-300 hover:shadow-sm transition-all cursor-pointer opacity-70 hover:opacity-100">
                  <CardContent className="p-4 flex items-start gap-3">
                    <span className="p-2 rounded-lg shrink-0 bg-slate-100 text-slate-500">
                      <Icon className="w-4 h-4" />
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-800">{notif.title}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{notif.body}</p>
                      <p className="text-xs text-slate-400 mt-1">{formatRelativeTime(notif.createdAt)}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      )}

      {/* Notification preferences */}
      <Card className="bg-slate-50 border-dashed">
        <CardContent className="p-4 flex items-center justify-between gap-3">
          <p className="text-sm text-slate-600">Manage what notifications you receive.</p>
          <Button variant="outline" size="sm" asChild>
            <Link href="/profile#notifications">Preferences</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
