"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const suggestedTags = ["DBMS", "OS", "Placements", "Viva", "Internship", "Amazon", "Electives", "ML", "Exams", "CSE"];

export default function AskQuestionPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag].slice(0, 5)
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    setIsSubmitting(true);
    // TODO: POST to /api/community
    await new Promise((r) => setTimeout(r, 500)); // Simulate API call
    router.push("/community");
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/community" className="text-slate-400 hover:text-slate-700">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-xl font-bold text-slate-900">Ask a Question</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">What would you like to know?</CardTitle>
          <p className="text-xs text-slate-500">
            Your question will be visible to all verified students on this platform.
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-700 mb-1.5 block">
                Question Title <span className="text-red-500">*</span>
              </label>
              <Input
                placeholder="e.g. What topics does Prof. Sharma focus on in DBMS viva?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={200}
                required
              />
              <p className="text-xs text-slate-400 mt-1">{title.length}/200</p>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700 mb-1.5 block">
                Details <span className="text-slate-400 font-normal">(optional)</span>
              </label>
              <textarea
                className="w-full min-h-[120px] px-3 py-2 text-sm rounded-lg border border-slate-200 bg-white placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-1 resize-none"
                placeholder="Add more context to your question…"
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700 mb-1.5 block">
                Tags <span className="text-slate-400 font-normal">(up to 5)</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {suggestedTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                      selectedTags.includes(tag)
                        ? "bg-indigo-600 text-white border-indigo-600"
                        : "bg-white text-slate-600 border-slate-200 hover:border-indigo-300"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 p-3 rounded-lg bg-slate-50 border border-slate-200">
              <input
                id="anonymous"
                type="checkbox"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="w-4 h-4 accent-indigo-600"
              />
              <label htmlFor="anonymous" className="text-sm text-slate-700 cursor-pointer">
                Post anonymously
              </label>
              <p className="text-xs text-slate-400 ml-auto">
                Your identity is hidden from other students, but you remain verified.
              </p>
            </div>

            <div className="flex gap-3">
              <Button type="submit" disabled={!title.trim() || isSubmitting} className="flex-1">
                {isSubmitting ? "Posting…" : "Post Question"}
              </Button>
              <Button type="button" variant="outline" asChild>
                <Link href="/community">Cancel</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
