import Link from "next/link";
import { ChevronRight, ThumbsUp, Eye, User2, MessageSquare, Flag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { formatRelativeTime, getInitials } from "@/lib/utils";
import { AnswerForm } from "./AnswerForm";

const discussions: Record<string, {
  id: string; title: string; body: string; tags: string[];
  author: string; isAnonymous: boolean; upvotes: number;
  views: number; createdAt: string;
  answers: { id: string; content: string; author: string; isAnonymous: boolean; upvotes: number; isAccepted: boolean; createdAt: string }[];
}> = {
  "1": {
    id: "1",
    title: "What topics did Prof. Sharma focus on in DBMS viva this semester?",
    body: "I have my DBMS viva next week with Prof. Sharma. I've heard he asks a lot about specific topics. Has anyone given the viva recently? What did he ask?\n\nI've already gone through normalization and SQL queries but not sure if I should focus on transactions and concurrency too.",
    tags: ["DBMS", "Viva", "CSE"],
    author: "Anonymous",
    isAnonymous: true,
    upvotes: 34,
    views: 340,
    createdAt: new Date(Date.now() - 3 * 3600 * 1000).toISOString(),
    answers: [
      {
        id: "a1",
        content: "Just gave my viva last week. Prof. Sharma focused heavily on:\n1. Normalization — he asked me to normalize a given table to 3NF step by step\n2. SQL queries — subqueries and joins\n3. ER diagrams — converting ER to relational schema\n\nHe didn't ask much about transactions this batch but previous batches had it.",
        author: "Rahul K.",
        isAnonymous: false,
        upvotes: 28,
        isAccepted: true,
        createdAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
      },
      {
        id: "a2",
        content: "He asked me to write a query to find the second highest salary and explain indexing. Also asked what is a view and when to use it.",
        author: "Anonymous",
        isAnonymous: true,
        upvotes: 12,
        isAccepted: false,
        createdAt: new Date(Date.now() - 1.5 * 3600 * 1000).toISOString(),
      },
      {
        id: "a3",
        content: "My batch last sem — he focused on the lab programs mostly. Made sure you actually ran all the SQL queries during lab. Also asked about ACID properties briefly.",
        author: "Priya S.",
        isAnonymous: false,
        upvotes: 8,
        isAccepted: false,
        createdAt: new Date(Date.now() - 1 * 3600 * 1000).toISOString(),
      },
    ],
  },
};

export default async function DiscussionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const discussion = discussions[id];

  if (!discussion) {
    return (
      <div className="max-w-3xl mx-auto py-12 text-center">
        <p className="text-slate-500">Discussion not found.</p>
        <Link href="/community" className="text-indigo-600 hover:underline text-sm mt-2 inline-block">
          Back to Community
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-5">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-slate-500">
        <Link href="/community" className="hover:text-indigo-600">Community</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-700 truncate">{discussion.title.slice(0, 50)}…</span>
      </nav>

      {/* Question */}
      <Card>
        <CardContent className="p-5">
          <h1 className="text-lg font-bold text-slate-900 leading-snug">{discussion.title}</h1>

          <div className="flex items-center gap-3 mt-2 flex-wrap">
            {discussion.tags.map((t) => <Badge key={t} variant="secondary">{t}</Badge>)}
          </div>

          <p className="text-sm text-slate-700 mt-4 whitespace-pre-line leading-relaxed">
            {discussion.body}
          </p>

          <div className="flex items-center gap-4 mt-4 pt-4 border-t border-slate-100 text-xs text-slate-400">
            <button className="flex items-center gap-1.5 hover:text-indigo-600 transition-colors">
              <ThumbsUp className="w-3.5 h-3.5" /> {discussion.upvotes} upvotes
            </button>
            <span className="flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5" /> {discussion.views} views
            </span>
            <span className="flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5" /> {discussion.answers.length} answers
            </span>
            <span className="ml-auto flex items-center gap-1.5">
              {discussion.isAnonymous ? <User2 className="w-3 h-3" /> : null}
              {discussion.author} · {formatRelativeTime(discussion.createdAt)}
            </span>
            <button className="flex items-center gap-1 text-slate-300 hover:text-red-400 transition-colors">
              <Flag className="w-3 h-3" /> Report
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Answers */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-slate-700">
          {discussion.answers.length} Answer{discussion.answers.length !== 1 ? "s" : ""}
        </h2>

        {discussion.answers
          .sort((a, b) => (b.isAccepted ? 1 : 0) - (a.isAccepted ? 1 : 0) || b.upvotes - a.upvotes)
          .map((answer) => (
            <Card
              key={answer.id}
              className={answer.isAccepted ? "border-green-200 bg-green-50/30" : ""}
            >
              <CardContent className="p-5">
                {answer.isAccepted && (
                  <div className="flex items-center gap-1.5 text-xs text-green-700 font-medium mb-3">
                    <span className="w-4 h-4 rounded-full bg-green-500 text-white flex items-center justify-center text-[10px]">✓</span>
                    Accepted Answer
                  </div>
                )}

                <div className="flex items-start gap-3">
                  <Avatar className="w-8 h-8 shrink-0">
                    <AvatarFallback className="text-xs">
                      {answer.isAnonymous ? "?" : getInitials(answer.author)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm text-slate-700 whitespace-pre-line leading-relaxed">
                      {answer.content}
                    </p>
                    <div className="flex items-center gap-3 mt-3 text-xs text-slate-400">
                      <button className="flex items-center gap-1 hover:text-indigo-600 transition-colors">
                        <ThumbsUp className="w-3 h-3" /> {answer.upvotes}
                      </button>
                      <span>
                        {answer.isAnonymous ? "Anonymous" : answer.author}
                        {" · "}
                        {formatRelativeTime(answer.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>

      {/* Answer form */}
      <AnswerForm discussionId={id} />
    </div>
  );
}
