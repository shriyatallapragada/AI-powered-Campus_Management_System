"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export function AnswerForm({ discussionId }: { discussionId: string }) {
  const [content, setContent] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    setIsSubmitting(true);
    // TODO: POST to /api/community/[id]/answers
    await new Promise((r) => setTimeout(r, 600));
    setIsSubmitting(false);
    setSubmitted(true);
    setContent("");
  };

  if (submitted) {
    return (
      <Card className="border-green-200 bg-green-50/40">
        <CardContent className="p-5 text-center">
          <p className="text-sm font-medium text-green-700">
            ✓ Your answer has been posted. Thank you for helping!
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="text-xs text-slate-500 hover:underline mt-1"
          >
            Add another answer
          </button>
        </CardContent>
      </Card>
    );
  }

  // Suppress unused variable warning
  void discussionId;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Your Answer</CardTitle>
        <p className="text-xs text-slate-500">
          Share what you know. Even a short helpful answer makes a difference.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            className="w-full min-h-[120px] px-3 py-2 text-sm rounded-lg border border-slate-200 bg-white placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-1 resize-none"
            placeholder="Write your answer here…"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />

          <div className="flex items-center justify-between gap-3 flex-wrap">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="w-4 h-4 accent-indigo-600"
              />
              <span className="text-sm text-slate-600">Post anonymously</span>
            </label>

            <Button type="submit" disabled={!content.trim() || isSubmitting}>
              {isSubmitting ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Posting…</>
              ) : (
                "Post Answer"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
