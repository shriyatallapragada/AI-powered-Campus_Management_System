"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Plus, X, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { use } from "react";

export default function AddVivaFromSubjectPage({ params }: { params: Promise<{ deptId: string; subjectId: string }> }) {
  const { deptId, subjectId } = use(params);
  const router = useRouter();
  const [questions, setQuestions] = useState([{ question: "", answer: "" }]);
  const [professor, setProfessor] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const updateQ = (i: number, field: "question" | "answer", val: string) =>
    setQuestions((p) => p.map((q, idx) => idx === i ? { ...q, [field]: val } : q));

  const addQ = () => questions.length < 10 && setQuestions((p) => [...p, { question: "", answer: "" }]);
  const removeQ = (i: number) => questions.length > 1 && setQuestions((p) => p.filter((_, idx) => idx !== i));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 700));
    setIsSubmitting(false);
    setSuccess(true);
    setTimeout(() => router.push(`/academics/${deptId}/subjects/${subjectId}`), 2000);
  };

  if (success) {
    return (
      <div className="max-w-xl mx-auto py-16 text-center space-y-3">
        <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto" />
        <h2 className="text-lg font-bold text-slate-900">Questions added!</h2>
        <p className="text-sm text-slate-500">You earned +{questions.filter((q) => q.question.trim()).length * 5} points.</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto space-y-5">
      <div className="flex items-center gap-3">
        <Link href={`/academics/${deptId}/subjects/${subjectId}`} className="text-slate-400 hover:text-slate-700">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-slate-900">Add Viva Questions</h1>
          <p className="text-sm text-slate-500">for {subjectId.toUpperCase()}</p>
        </div>
      </div>

      <Card>
        <CardContent className="p-5">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-700 mb-1.5 block">
                Professor <span className="text-slate-400 font-normal">(optional)</span>
              </label>
              <Input placeholder="Who asked these questions?" value={professor} onChange={(e) => setProfessor(e.target.value)} />
            </div>

            <hr className="border-slate-100" />

            <div className="space-y-4">
              {questions.map((q, i) => (
                <div key={i} className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500">Question {i + 1}</span>
                    {questions.length > 1 && (
                      <button type="button" onClick={() => removeQ(i)} className="text-slate-400 hover:text-red-500">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                  <textarea
                    className="w-full min-h-[70px] px-3 py-2 text-sm rounded-lg border border-slate-200 bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                    placeholder="What did the examiner ask?"
                    value={q.question}
                    onChange={(e) => updateQ(i, "question", e.target.value)}
                    required={i === 0}
                  />
                  <textarea
                    className="w-full min-h-[55px] px-3 py-2 text-sm rounded-lg border border-slate-200 bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                    placeholder="Expected answer (optional but very helpful)"
                    value={q.answer}
                    onChange={(e) => updateQ(i, "answer", e.target.value)}
                  />
                </div>
              ))}
            </div>

            <Button type="button" variant="outline" size="sm" onClick={addQ} disabled={questions.length >= 10} className="w-full">
              <Plus className="w-3.5 h-3.5" /> Add Another Question
            </Button>

            <div className="flex items-center gap-2 p-3 rounded-lg bg-slate-50 border border-slate-200">
              <input id="anon" type="checkbox" checked={isAnonymous} onChange={(e) => setIsAnonymous(e.target.checked)} className="w-4 h-4 accent-indigo-600" />
              <label htmlFor="anon" className="text-sm text-slate-700 cursor-pointer">Submit anonymously</label>
            </div>

            <div className="p-3 rounded-lg bg-indigo-50 text-xs text-indigo-700">
              ✓ Each question earns <strong>+5 contribution points</strong>.
            </div>

            <div className="flex gap-3">
              <Button type="submit" disabled={!questions[0].question.trim() || isSubmitting} className="flex-1">
                {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Submitting…</> : "Submit Questions"}
              </Button>
              <Button type="button" variant="outline" asChild>
                <Link href={`/academics/${deptId}/subjects/${subjectId}`}>Cancel</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
