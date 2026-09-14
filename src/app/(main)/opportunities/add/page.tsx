"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2, CheckCircle2, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const branchOptions = ["CSE", "ECE", "ME", "CE", "IT", "EEE", "All Branches"];
const yearOptions = [1, 2, 3, 4];

export default function AddOpportunityPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    company: "", role: "", type: "INTERNSHIP", location: "", stipend: "",
    applicationLink: "", deadline: "", minCGPA: "", description: "",
  });
  const [branches, setBranches] = useState<string[]>([]);
  const [targetYears, setTargetYears] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const update = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));
  const toggleBranch = (b: string) => setBranches((p) => p.includes(b) ? p.filter((x) => x !== b) : [...p, b]);
  const toggleYear = (y: number) => setTargetYears((p) => p.includes(y) ? p.filter((x) => x !== y) : [...p, y]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 700));
    setIsSubmitting(false);
    setSuccess(true);
    setTimeout(() => router.push("/opportunities"), 2000);
  };

  if (success) {
    return (
      <div className="max-w-xl mx-auto py-16 text-center space-y-3">
        <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto" />
        <h2 className="text-lg font-bold text-slate-900">Opportunity shared!</h2>
        <p className="text-sm text-slate-500">Pending review. You earned <strong>+8 contribution points</strong>.</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto space-y-5">
      <div className="flex items-center gap-3">
        <Link href="/opportunities" className="text-slate-400 hover:text-slate-700">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-slate-900">Share an Opportunity</h1>
          <p className="text-sm text-slate-500">Internship or job you found? Share it with batchmates.</p>
        </div>
      </div>

      <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-800">
        <Info className="w-4 h-4 shrink-0 mt-0.5" />
        <p>Community submissions are marked as &quot;Community Sourced&quot; and go through a quick review before going live.</p>
      </div>

      <Card>
        <CardContent className="p-5">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2">
                <label className="text-sm font-medium text-slate-700 mb-1.5 block">Company <span className="text-red-500">*</span></label>
                <Input placeholder="e.g. Razorpay" value={form.company} onChange={(e) => update("company", e.target.value)} required />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 mb-1.5 block">Role <span className="text-red-500">*</span></label>
                <Input placeholder="e.g. Backend Intern" value={form.role} onChange={(e) => update("role", e.target.value)} required />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 mb-1.5 block">Type</label>
                <select value={form.type} onChange={(e) => update("type", e.target.value)}
                  className="w-full h-9 px-3 text-sm rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option value="INTERNSHIP">Internship</option>
                  <option value="PLACEMENT">Placement</option>
                  <option value="PROJECT">Project / Research</option>
                  <option value="COMPETITION">Competition</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 mb-1.5 block">Location</label>
                <Input placeholder="e.g. Bangalore / Remote" value={form.location} onChange={(e) => update("location", e.target.value)} />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 mb-1.5 block">Stipend / Package</label>
                <Input placeholder="e.g. ₹50,000/month" value={form.stipend} onChange={(e) => update("stipend", e.target.value)} />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 mb-1.5 block">Min. CGPA</label>
                <Input type="number" placeholder="e.g. 7.5" step="0.1" min="0" max="10" value={form.minCGPA} onChange={(e) => update("minCGPA", e.target.value)} />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 mb-1.5 block">Application Deadline</label>
                <Input type="date" value={form.deadline} onChange={(e) => update("deadline", e.target.value)} />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700 mb-1.5 block">Application Link <span className="text-red-500">*</span></label>
              <Input type="url" placeholder="https://..." value={form.applicationLink} onChange={(e) => update("applicationLink", e.target.value)} required />
            </div>

            {/* Eligible branches */}
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">Eligible Branches</label>
              <div className="flex flex-wrap gap-2">
                {branchOptions.map((b) => (
                  <button key={b} type="button" onClick={() => toggleBranch(b)}
                    className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                      branches.includes(b) ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-slate-600 border-slate-200 hover:border-indigo-300"
                    }`}>
                    {b}
                  </button>
                ))}
              </div>
            </div>

            {/* Target years */}
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">Target Year(s)</label>
              <div className="flex gap-2">
                {yearOptions.map((y) => (
                  <button key={y} type="button" onClick={() => toggleYear(y)}
                    className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                      targetYears.includes(y) ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-slate-600 border-slate-200 hover:border-indigo-300"
                    }`}>
                    Year {y}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700 mb-1.5 block">Additional Details <span className="text-slate-400 font-normal">(optional)</span></label>
              <textarea
                className="w-full min-h-[80px] px-3 py-2 text-sm rounded-lg border border-slate-200 bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                placeholder="Any additional info about this opportunity…"
                value={form.description}
                onChange={(e) => update("description", e.target.value)}
              />
            </div>

            <div className="p-3 rounded-lg bg-indigo-50 text-xs text-indigo-700">
              ✓ Sharing this opportunity earns you <strong>+8 contribution points</strong> once approved.
            </div>

            <div className="flex gap-3">
              <Button type="submit" disabled={!form.company || !form.role || !form.applicationLink || isSubmitting} className="flex-1">
                {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Submitting…</> : "Share Opportunity"}
              </Button>
              <Button type="button" variant="outline" asChild>
                <Link href="/opportunities">Cancel</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
