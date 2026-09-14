import Link from "next/link";
import { Calendar, MapPin, Clock, ExternalLink, Megaphone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";

const events = [
  {
    id: "1",
    title: "AI/ML Workshop by Google Developer Students Club",
    type: "WORKSHOP",
    startDate: "2026-09-20T10:00:00",
    location: "Seminar Hall B",
    organizer: "GDSC",
    registrationDeadline: "2026-09-19",
    registrationLink: "#",
    source: "OFFICIAL",
  },
  {
    id: "2",
    title: "Hackathon 2026 — 24-Hour Internal Hackathon",
    type: "HACKATHON",
    startDate: "2026-09-28T09:00:00",
    location: "CSE Labs",
    organizer: "IEEE Student Branch",
    registrationDeadline: "2026-09-22",
    registrationLink: "#",
    source: "OFFICIAL",
  },
  {
    id: "3",
    title: "Guest Lecture: Career in Product Management",
    type: "GUEST_LECTURE",
    startDate: "2026-09-17T02:00:00",
    location: "Main Auditorium",
    organizer: "Training & Placement Cell",
    registrationDeadline: null,
    registrationLink: null,
    source: "OFFICIAL",
  },
  {
    id: "4",
    title: "Photography Club — Campus Walk",
    type: "CLUB_EVENT",
    startDate: "2026-09-21T07:00:00",
    location: "College Gate",
    organizer: "Photography Club",
    registrationDeadline: "2026-09-20",
    registrationLink: "#",
    source: "COMMUNITY",
  },
];

const announcements = [
  {
    id: "1",
    title: "End Semester Exam Schedule Released",
    body: "The end semester exam schedule for Semester 5 & 6 has been published. Check the examination cell portal for your timetable.",
    source: "OFFICIAL",
    pinned: true,
    date: "2 hours ago",
  },
  {
    id: "2",
    title: "Fee Payment Deadline — October 10",
    body: "The deadline for semester fee payment is October 10, 2026. Late payment will attract a fine.",
    source: "OFFICIAL",
    pinned: true,
    date: "1 day ago",
  },
  {
    id: "3",
    title: "Library Timings Changed",
    body: "Library will now be open from 8 AM to 9 PM on weekdays and 9 AM to 5 PM on weekends.",
    source: "OFFICIAL",
    pinned: false,
    date: "2 days ago",
  },
];

const typeColors: Record<string, string> = {
  WORKSHOP: "bg-blue-50 text-blue-700",
  HACKATHON: "bg-purple-50 text-purple-700",
  GUEST_LECTURE: "bg-green-50 text-green-700",
  CLUB_EVENT: "bg-pink-50 text-pink-700",
  COMPETITION: "bg-orange-50 text-orange-700",
  EXAM: "bg-red-50 text-red-700",
};

export default function CampusPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Campus</h1>
          <p className="text-sm text-slate-500 mt-1">Events, announcements, notices, and campus calendar.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="/campus/calendar">
              <Calendar className="w-3.5 h-3.5 mr-1" /> Calendar
            </Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/campus/events/add">Add Event</Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Events */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-indigo-500" />
            Upcoming Events
          </h2>

          {events.map((event) => (
            <Card key={event.id} className="hover:border-indigo-200 hover:shadow-md transition-all">
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${typeColors[event.type]}`}>
                        {event.type.replace("_", " ")}
                      </span>
                      <Badge variant={event.source === "OFFICIAL" ? "official" : "community"}>
                        {event.source}
                      </Badge>
                    </div>

                    <h3 className="text-sm font-semibold text-slate-900">{event.title}</h3>

                    <div className="flex flex-col gap-1 mt-2 text-xs text-slate-500">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3 h-3" />
                        {formatDate(event.startDate)}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3 h-3" />
                        {event.location}
                      </span>
                      <span className="text-slate-400">Organised by: {event.organizer}</span>
                    </div>
                  </div>

                  {event.registrationLink && (
                    <Button size="sm" variant="outline" asChild className="shrink-0">
                      <a href={event.registrationLink} target="_blank" rel="noopener noreferrer">
                        Register <ExternalLink className="w-3 h-3 ml-1" />
                      </a>
                    </Button>
                  )}
                </div>

                {event.registrationDeadline && (
                  <p className="text-xs text-red-500 mt-2">
                    Registration closes: {formatDate(event.registrationDeadline)}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Announcements */}
        <div className="space-y-4">
          <h2 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
            <Megaphone className="w-4 h-4 text-amber-500" />
            Notices
          </h2>

          {announcements.map((a) => (
            <Card key={a.id} className={a.pinned ? "border-amber-200 bg-amber-50/30" : ""}>
              <CardContent className="p-4">
                {a.pinned && (
                  <span className="text-xs font-medium text-amber-700 mb-2 block">📌 Pinned</span>
                )}
                <h3 className="text-sm font-semibold text-slate-800">{a.title}</h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">{a.body}</p>
                <div className="flex items-center justify-between mt-2">
                  <Badge variant={a.source === "OFFICIAL" ? "official" : "community"}>
                    {a.source}
                  </Badge>
                  <span className="text-xs text-slate-400">{a.date}</span>
                </div>
              </CardContent>
            </Card>
          ))}

          <Link href="/campus/notices" className="text-xs text-indigo-600 hover:underline block text-center">
            View all notices →
          </Link>
        </div>
      </div>
    </div>
  );
}
