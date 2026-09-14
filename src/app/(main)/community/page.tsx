import Link from "next/link";
import { Plus, ThumbsUp, MessageCircle, Eye, User2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatRelativeTime } from "@/lib/utils";

const discussions = [
  {
    id: "1",
    title: "What topics did Prof. Sharma focus on in DBMS viva this semester?",
    body: "I have my DBMS viva next week. Anyone who's already given it, what questions did prof ask?",
    tags: ["DBMS", "Viva", "CSE"],
    author: "Anonymous",
    isAnonymous: true,
    upvotes: 34,
    answers: 12,
    views: 340,
    createdAt: new Date(Date.now() - 3 * 3600 * 1000).toISOString(),
  },
  {
    id: "2",
    title: "Which elective is easier to manage alongside placements — Cloud or InfoSec?",
    body: "I'm in 6th sem and have placements going on. Which elective has less workload?",
    tags: ["Electives", "Placements", "CSE"],
    author: "Aryan M.",
    isAnonymous: false,
    upvotes: 27,
    answers: 8,
    views: 210,
    createdAt: new Date(Date.now() - 6 * 3600 * 1000).toISOString(),
  },
  {
    id: "3",
    title: "Has anyone received the Amazon internship offer letter yet?",
    body: "The interview was 2 weeks ago. I haven't heard back. Anyone got a response?",
    tags: ["Placements", "Amazon", "Internship"],
    author: "Anonymous",
    isAnonymous: true,
    upvotes: 19,
    answers: 5,
    views: 180,
    createdAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
  },
  {
    id: "4",
    title: "Best resources to prepare for OS viva? Prof. Nair specifically.",
    body: "Prof. Nair is known to ask a lot about processes and scheduling. Any tips?",
    tags: ["OS", "Viva", "CSE"],
    author: "Sneha R.",
    isAnonymous: false,
    upvotes: 41,
    answers: 15,
    views: 520,
    createdAt: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString(),
  },
  {
    id: "5",
    title: "Is the ML elective actually worth it or just heavy on grading?",
    body: "Everyone says ML is interesting but some seniors told me the internal marks are strict.",
    tags: ["ML", "Electives"],
    author: "Anonymous",
    isAnonymous: true,
    upvotes: 15,
    answers: 9,
    views: 145,
    createdAt: new Date(Date.now() - 3 * 24 * 3600 * 1000).toISOString(),
  },
];

const popularTags = ["DBMS", "Placements", "Viva", "OS", "Internship", "Amazon", "Electives", "CSE", "ML", "Exams"];

export default function CommunityPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Community</h1>
          <p className="text-sm text-slate-500 mt-1">
            Ask questions, share knowledge, help juniors — anonymously if you prefer.
          </p>
        </div>
        <Button asChild>
          <Link href="/community/ask">
            <Plus className="w-4 h-4" /> Ask a Question
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Questions */}
        <div className="lg:col-span-3 space-y-3">
          {discussions.map((d) => (
            <Link key={d.id} href={`/community/${d.id}`} className="block">
              <Card className="hover:border-indigo-200 hover:shadow-md transition-all cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    {/* Votes/stats column */}
                    <div className="flex flex-col items-center gap-3 text-center shrink-0 min-w-[48px]">
                      <div>
                        <p className="text-base font-bold text-slate-800">{d.upvotes}</p>
                        <p className="text-xs text-slate-400">votes</p>
                      </div>
                      <div>
                        <p className="text-base font-bold text-slate-800">{d.answers}</p>
                        <p className="text-xs text-slate-400">ans</p>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-slate-900 leading-snug">
                        {d.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-1">{d.body}</p>

                      <div className="flex items-center gap-2 mt-2 flex-wrap">
                        {d.tags.map((t) => (
                          <Badge key={t} variant="secondary">{t}</Badge>
                        ))}
                      </div>

                      <div className="flex items-center gap-3 mt-2 text-xs text-slate-400">
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" /> {d.views}
                        </span>
                        <span className="flex items-center gap-1">
                          {d.isAnonymous ? (
                            <><User2 className="w-3 h-3" /> Anonymous</>
                          ) : (
                            <>{d.author}</>
                          )}
                        </span>
                        <span className="ml-auto">{formatRelativeTime(d.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <p className="text-sm font-semibold text-slate-700 mb-3">Popular Tags</p>
              <div className="flex flex-wrap gap-1.5">
                {popularTags.map((tag) => (
                  <Link key={tag} href={`/community?tag=${tag}`}>
                    <Badge variant="secondary" className="cursor-pointer hover:bg-indigo-100 hover:text-indigo-700 transition-colors">
                      {tag}
                    </Badge>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <p className="text-sm font-semibold text-slate-700 mb-2">Ask anonymously</p>
              <p className="text-xs text-slate-500 mb-3">
                You can post questions without showing your name. You still need to be a verified student.
              </p>
              <Button size="sm" className="w-full" asChild>
                <Link href="/community/ask">Ask a Question</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
