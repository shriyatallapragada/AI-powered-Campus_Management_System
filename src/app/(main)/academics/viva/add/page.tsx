"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2, CheckCircle2, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const departments = [
  { id: "cse", name: "CSE" }, { id: "ece", name: "ECE" },
  { id: "me", name: "ME" }, { id: "ce", name: "CE" },
];

export default function AddVivaQuestionPage() {
  const router = useRouter();
  const [questions, setQuestions] = useState([{ question: "", answer: "" }]);
  const [form, setForm] = useState({
    deptId: "cse",
    subject: "",
    professor: "",
    semester: "5",
    year: new Date().getFullYear().toString(),
    isAnonymous: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const update = (k: string, v: string | boolean) => setForm((p) => ({ ...p, [k]: v }));

  const updateQuestion = (i: number, field: "question" | "answer", val: string) => {
    setQuestions((prev) => prev.map((q, idx) => idx === i ? { ...q, [field]: val } : q));
  };

  const addQuestion = () => {
    if (questions.length < 10) setQuestions((p) => [...p, { question: "", answer: "" }]);
  };

  const removeQuestion = (i: number) => {
    if (questions.length > 1) setQuestions((p) => p.filter((_, idx) => idx !== i));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const valid = questions.filter((q) => q.question.trim());
    if (!valid.length || !form.subject) return;
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 700));
    setIsSubmitting(false);
    setSuccess(true);
    setTimeout(() => router.push("/academics"), 2000);
  };

  if (success) {
    return (
      <div className="max-w-xl mx-auto py-16 text-center space-y-3">
        <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto" />
        <h2 className="text-lg font-bold text-slate-900">Viva questions added!</h2>
        <p className="text-sm text-slate-500">
          You earned <strong>+{questions.filter((q) => q.question.trim()).length * 5} points</strong>. These will help future students prepare.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto space-y-5">
      <div className="flex items-center gap-3">
        <Link href="/academics" className="text-slate-400 hover:text-slate-700">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-slate-900">Add Viva Questions</h1>
          <p className="text-sm text-slate-500 mt-0.5">Takes less than a minute. Helps hundreds of juniors.</p>
        </div>
      </div>

      <Card>
        <CardContent className="p-5">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Subject info */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-slate-700 mb-1.5 block">Department</label>
                <select
                  value={form.deptId}
                  onChange={(e) => update("deptId", e.target.value)}
                  className="w-full h-9 px-3 text-sm rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {departments.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 mb-1.5 block">
                  Subject <span className="text-red-500">*</span>
                </label>
                <Input
                  placeholder="e.g. DBMS"
                  value={form.subject}
                  onChange={(e) => update("subject", e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 mb-1.5 block">Semester</label>
                <select
                  value={form.semester}
                  onChange={(e) => update("semester", e.target.value)}
                  className="w-full h-9 px-3 text-sm rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {[1,2,3,4,5,6,7,8].map((s) => <option key={s} value={s}>Sem {s}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 mb-1.5 block">
                  Professor <span className="text-slate-400 font-normal">(optional)</span>
                </label>
                <Input
                  placeholder="e.g. Prof. Sharma"
                  value={form.professor}
                  onChange={(e) => update("professor", e.target.value)}
                />
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* Questions */}
            <div className="space-y-4">
              {questions.map((q, i) => (
                <div key={i} className="relative p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500">Question {i + 1}</span>
                    {questions.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeQuestion(i)}
                        className="text-slate-400 hover:text-red-500 transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                  <textarea
                    className="w-full min-h-[70px] px-3 py-2 text-sm rounded-lg border border-slate-200 bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                    placeholder="What question did the examiner ask?"
                    value={q.question}
                    onChange={(e) => updateQuestion(i, "question", e.target.value)}
                    required={i === 0}
                  />
                  <textarea
                    className="w-full min-h-[60px] px-3 py-2 text-sm rounded-lg border border-slate-200 bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                    placeholder="Answer / expected response (optional but helpful)"
                    value={q.answer}
                    onChange={(e) => updateQuestion(i, "answer", e.target.value)}
                  />
                </div>
              ))}
            </div>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addQuestion}
              disabled={questions.length >= 10}
              className="w-full"
            >
              <Plus className="w-3.5 h-3.5" /> Add Another Question
            </Button>

            {/* Anonymous */}
            <div className="flex items-center gap-2 p-3 rounded-lg bg-slate-50 border border-slate-200">
              <input
                id="anon-viva"
                type="checkbox"
                checked={form.isAnonymous}
                onChange={(e) => update("isAnonymous", e.target.checked)}
                className="w-4 h-4 accent-indigo-600"
              />
              <label htmlFor="anon-viva" className="text-sm text-slate-700 cursor-pointer">
                Submit anonymously
              </label>
            </div>

            <div className="p-3 rounded-lg bg-indigo-50 text-xs text-indigo-700">
              ✓ Each question earns you <strong>+5 contribution points</strong>.
            </div>

            <div className="flex gap-3">
              <Button
                type="submit"
                disabled={!form.subject || !questions[0].question.trim() || isSubmitting}
                className="flex-1"
              >
                {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Submitting…</> : "Submit Questions"}
              </Button>
              <Button type="button" variant="outline" asChild>
                <Link href="/academics">Cancel</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
