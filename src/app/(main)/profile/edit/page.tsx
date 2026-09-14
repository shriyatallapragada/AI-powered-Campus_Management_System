"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Loader2, CheckCircle2, X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const departments = [
  { id: "cse", name: "CSE" }, { id: "ece", name: "ECE" },
  { id: "me",  name: "ME"  }, { id: "ce",  name: "CE"  },
];
const skillSuggestions = ["DSA", "Web Dev", "Python", "Java", "ML", "React", "Node.js", "SQL", "System Design", "DevOps"];
const interestSuggestions = ["Placements", "Internships", "Research", "Open Source", "Competitive Programming", "ML/AI", "Web Dev", "Mobile Dev"];

export default function ProfileEditPage() {
  const [form, setForm] = useState({
    name: "Rahul Kumar",
    bio: "",
    year: "4",
    semester: "7",
    deptId: "cse",
    rollNumber: "",
  });
  const [skills, setSkills] = useState(["DSA", "Web Dev", "Python"]);
  const [interests, setInterests] = useState(["Placements", "ML/AI"]);
  const [customSkill, setCustomSkill] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [saved, setSaved] = useState(false);

  const update = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));
  const toggleSkill = (s: string) => setSkills((p) => p.includes(s) ? p.filter((x) => x !== s) : [...p, s]);
  const toggleInterest = (i: string) => setInterests((p) => p.includes(i) ? p.filter((x) => x !== i) : [...p, i]);
  const addCustomSkill = () => {
    const s = customSkill.trim();
    if (s && !skills.includes(s)) { setSkills((p) => [...p, s]); setCustomSkill(""); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 600));
    setIsSubmitting(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-xl mx-auto space-y-5">
      <div className="flex items-center gap-3">
        <Link href="/profile" className="text-slate-400 hover:text-slate-700">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-xl font-bold text-slate-900">Edit Profile</h1>
      </div>

      <Card>
        <CardContent className="p-5">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Basic info */}
            <div>
              <label className="text-sm font-medium text-slate-700 mb-1.5 block">Full Name</label>
              <Input value={form.name} onChange={(e) => update("name", e.target.value)} required />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700 mb-1.5 block">Bio <span className="text-slate-400 font-normal">(optional)</span></label>
              <textarea
                className="w-full min-h-[80px] px-3 py-2 text-sm rounded-lg border border-slate-200 bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                placeholder="Tell your batchmates a bit about yourself…"
                value={form.bio}
                onChange={(e) => update("bio", e.target.value)}
                maxLength={200}
              />
              <p className="text-xs text-slate-400 mt-0.5">{form.bio.length}/200</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-slate-700 mb-1.5 block">Department</label>
                <select value={form.deptId} onChange={(e) => update("deptId", e.target.value)}
                  className="w-full h-9 px-3 text-sm rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  {departments.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 mb-1.5 block">Year</label>
                <select value={form.year} onChange={(e) => update("year", e.target.value)}
                  className="w-full h-9 px-3 text-sm rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  {[1,2,3,4].map((y) => <option key={y} value={y}>Year {y}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 mb-1.5 block">Semester</label>
                <select value={form.semester} onChange={(e) => update("semester", e.target.value)}
                  className="w-full h-9 px-3 text-sm rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  {[1,2,3,4,5,6,7,8].map((s) => <option key={s} value={s}>Sem {s}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 mb-1.5 block">Roll Number <span className="text-slate-400 font-normal">(optional)</span></label>
                <Input placeholder="e.g. 21CSE042" value={form.rollNumber} onChange={(e) => update("rollNumber", e.target.value)} />
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* Skills */}
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">Skills</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {skillSuggestions.map((s) => (
                  <button key={s} type="button" onClick={() => toggleSkill(s)}
                    className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                      skills.includes(s) ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-slate-600 border-slate-200 hover:border-indigo-300"
                    }`}>
                    {s}
                  </button>
                ))}
              </div>
              {/* Custom skills added but not in suggestions */}
              {skills.filter((s) => !skillSuggestions.includes(s)).map((s) => (
                <span key={s} className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-indigo-600 text-white mr-2 mb-2">
                  {s}
                  <button type="button" onClick={() => toggleSkill(s)}><X className="w-3 h-3" /></button>
                </span>
              ))}
              <div className="flex gap-2 mt-1">
                <Input placeholder="Add custom skill…" value={customSkill} onChange={(e) => setCustomSkill(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addCustomSkill())} />
                <Button type="button" variant="outline" size="sm" onClick={addCustomSkill}>
                  <Plus className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>

            {/* Interests */}
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">Interests</label>
              <div className="flex flex-wrap gap-2">
                {interestSuggestions.map((i) => (
                  <button key={i} type="button" onClick={() => toggleInterest(i)}
                    className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                      interests.includes(i) ? "bg-violet-600 text-white border-violet-600" : "bg-white text-slate-600 border-slate-200 hover:border-violet-300"
                    }`}>
                    {i}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <Button type="submit" disabled={isSubmitting} className="flex-1">
                {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving…</>
                  : saved ? <><CheckCircle2 className="w-4 h-4" /> Saved!</>
                  : "Save Changes"}
              </Button>
              <Button type="button" variant="outline" asChild>
                <Link href="/profile">Cancel</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
