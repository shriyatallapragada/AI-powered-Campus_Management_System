"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Plus, X, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const topicSuggestions = ["DSA", "OOP", "DBMS", "OS", "CN", "System Design", "Aptitude", "SQL", "Verbal", "Resume Prep", "ML Basics"];

export default function AddPlacementExperiencePage() {
  const router = useRouter();
  const [form, setForm] = useState({
    company: "", role: "", type: "INTERNSHIP", year: new Date().getFullYear().toString(),
    outcome: "selected", experience: "", tips: "", isAnonymous: false,
  });
  const [rounds, setRounds] = useState([{ name: "", description: "" }]);
  const [preparation, setPreparation] = useState<string[]>([]);
  const [customTopic, setCustomTopic] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const update = (k: string, v: string | boolean) => setForm((p) => ({ ...p, [k]: v }));
  const updateRound = (i: number, field: "name" | "description", v: string) =>
    setRounds((p) => p.map((r, idx) => idx === i ? { ...r, [field]: v } : r));
  const addRound = () => rounds.length < 8 && setRounds((p) => [...p, { name: "", description: "" }]);
  const removeRound = (i: number) => rounds.length > 1 && setRounds((p) => p.filter((_, idx) => idx !== i));
  const toggleTopic = (t: string) => setPreparation((p) => p.includes(t) ? p.filter((x) => x !== t) : [...p, t]);
  const addCustomTopic = () => {
    if (customTopic.trim() && !preparation.includes(customTopic.trim())) {
      setPreparation((p) => [...p, customTopic.trim()]);
      setCustomTopic("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    setIsSubmitting(false);
    setSuccess(true);
    setTimeout(() => router.push("/placements/experiences"), 2500);
  };

  if (success) {
    return (
      <div className="max-w-xl mx-auto py-16 text-center space-y-3">
        <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto" />
        <h2 className="text-lg font-bold text-slate-900">Experience shared!</h2>
        <p className="text-sm text-slate-500">You earned <strong>+15 contribution points</strong>. This will help many future students.</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto space-y-5">
      <div className="flex items-center gap-3">
        <Link href="/placements/experiences" className="text-slate-400 hover:text-slate-700">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-slate-900">Share Your Experience</h1>
          <p className="text-sm text-slate-500">Help future batches prepare better.</p>
        </div>
      </div>

      <Card>
        <CardContent className="p-5">
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Basic info */}
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2">
                <label className="text-sm font-medium text-slate-700 mb-1.5 block">Company <span className="text-red-500">*</span></label>
                <Input placeholder="e.g. Microsoft" value={form.company} onChange={(e) => update("company", e.target.value)} required />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 mb-1.5 block">Role <span className="text-red-500">*</span></label>
                <Input placeholder="e.g. SDE Intern" value={form.role} onChange={(e) => update("role", e.target.value)} required />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 mb-1.5 block">Type</label>
                <select value={form.type} onChange={(e) => update("type", e.target.value)}
                  className="w-full h-9 px-3 text-sm rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option value="INTERNSHIP">Internship</option>
                  <option value="PLACEMENT">Placement</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 mb-1.5 block">Year</label>
                <Input type="number" value={form.year} onChange={(e) => update("year", e.target.value)} min={2000} max={2100} />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 mb-1.5 block">Outcome</label>
                <select value={form.outcome} onChange={(e) => update("outcome", e.target.value)}
                  className="w-full h-9 px-3 text-sm rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option value="selected">Selected</option>
                  <option value="rejected">Rejected</option>
                  <option value="waitlisted">Waitlisted</option>
                </select>
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* Rounds */}
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">Selection Rounds <span className="text-red-500">*</span></label>
              <div className="space-y-3">
                {rounds.map((r, i) => (
                  <div key={i} className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-500">Round {i + 1}</span>
                      {rounds.length > 1 && (
                        <button type="button" onClick={() => removeRound(i)} className="text-slate-400 hover:text-red-500">
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                    <Input placeholder="Round name (e.g. Online Assessment)" value={r.name} onChange={(e) => updateRound(i, "name", e.target.value)} required={i === 0} />
                    <textarea
                      className="w-full min-h-[70px] px-3 py-2 text-sm rounded-lg border border-slate-200 bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                      placeholder="Describe what happened in this round…"
                      value={r.description}
                      onChange={(e) => updateRound(i, "description", e.target.value)}
                    />
                  </div>
                ))}
              </div>
              <Button type="button" variant="outline" size="sm" onClick={addRound} disabled={rounds.length >= 8} className="w-full mt-2">
                <Plus className="w-3.5 h-3.5" /> Add Round
              </Button>
            </div>

            <hr className="border-slate-100" />

            {/* Preparation */}
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">What did you prepare?</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {topicSuggestions.map((t) => (
                  <button key={t} type="button" onClick={() => toggleTopic(t)}
                    className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                      preparation.includes(t) ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-slate-600 border-slate-200 hover:border-indigo-300"
                    }`}>
                    {t}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <Input placeholder="Add custom topic…" value={customTopic} onChange={(e) => setCustomTopic(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addCustomTopic())} />
                <Button type="button" variant="outline" size="sm" onClick={addCustomTopic}>Add</Button>
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* Full experience */}
            <div>
              <label className="text-sm font-medium text-slate-700 mb-1.5 block">Full Experience <span className="text-red-500">*</span></label>
              <textarea
                className="w-full min-h-[120px] px-3 py-2 text-sm rounded-lg border border-slate-200 bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                placeholder="Describe your overall experience — timeline, difficulty, atmosphere, what you wish you had known…"
                value={form.experience}
                onChange={(e) => update("experience", e.target.value)}
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700 mb-1.5 block">Tips for Future Applicants <span className="text-slate-400 font-normal">(optional)</span></label>
              <textarea
                className="w-full min-h-[80px] px-3 py-2 text-sm rounded-lg border border-slate-200 bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                placeholder="What advice would you give someone applying next year?"
                value={form.tips}
                onChange={(e) => update("tips", e.target.value)}
              />
            </div>

            {/* Anonymous */}
            <div className="flex items-center gap-2 p-3 rounded-lg bg-slate-50 border border-slate-200">
              <input id="anon-exp" type="checkbox" checked={form.isAnonymous}
                onChange={(e) => update("isAnonymous", e.target.checked)} className="w-4 h-4 accent-indigo-600" />
              <label htmlFor="anon-exp" className="text-sm text-slate-700 cursor-pointer">Share anonymously</label>
            </div>

            <div className="p-3 rounded-lg bg-indigo-50 text-xs text-indigo-700">
              ✓ Sharing this experience earns you <strong>+15 contribution points</strong>.
            </div>

            <div className="flex gap-3">
              <Button type="submit"
                disabled={!form.company || !form.role || !form.experience || !rounds[0].name || isSubmitting}
                className="flex-1">
                {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Submitting…</> : "Share Experience"}
              </Button>
              <Button type="button" variant="outline" asChild>
                <Link href="/placements/experiences">Cancel</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
