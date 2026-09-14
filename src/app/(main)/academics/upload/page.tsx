"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Upload, FileText, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Suspense } from "react";

const departments = [
  { id: "cse", name: "CSE" }, { id: "ece", name: "ECE" },
  { id: "me", name: "ME" }, { id: "ce", name: "CE" },
];
const years = [1, 2, 3, 4];
const semesters = [1, 2, 3, 4, 5, 6, 7, 8];
const resourceTypes = [
  { value: "notes", label: "Notes" },
  { value: "previous_paper", label: "Previous Year Paper" },
  { value: "lab_material", label: "Lab Material" },
  { value: "reference", label: "Reference / Book" },
  { value: "other", label: "Other" },
];

function UploadForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const prefilledSubject = searchParams.get("subject") ?? "";

  const [form, setForm] = useState({
    title: "",
    description: "",
    type: "notes",
    deptId: "cse",
    year: "3",
    semester: "5",
    subject: prefilledSubject,
    externalUrl: "",
    examYear: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const update = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    setIsSubmitting(false);
    setSuccess(true);
    setTimeout(() => router.push("/academics"), 2000);
  };

  if (success) {
    return (
      <div className="max-w-xl mx-auto py-16 text-center space-y-3">
        <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto" />
        <h2 className="text-lg font-bold text-slate-900">Resource submitted!</h2>
        <p className="text-sm text-slate-500">It will be visible after a quick review. You earned +10 points.</p>
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
          <h1 className="text-xl font-bold text-slate-900">Upload a Resource</h1>
          <p className="text-sm text-slate-500 mt-0.5">Notes, papers, lab material — help your batchmates.</p>
        </div>
      </div>

      <Card>
        <CardContent className="p-5">
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Resource type */}
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">Resource Type</label>
              <div className="flex flex-wrap gap-2">
                {resourceTypes.map((rt) => (
                  <button
                    key={rt.value}
                    type="button"
                    onClick={() => update("type", rt.value)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                      form.type === rt.value
                        ? "bg-indigo-600 text-white border-indigo-600"
                        : "bg-white text-slate-600 border-slate-200 hover:border-indigo-300"
                    }`}
                  >
                    {rt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="text-sm font-medium text-slate-700 mb-1.5 block">
                Title <span className="text-red-500">*</span>
              </label>
              <Input
                placeholder="e.g. DBMS Complete Notes — Unit 1 to 5"
                value={form.title}
                onChange={(e) => update("title", e.target.value)}
                required
              />
            </div>

            {/* Subject location */}
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
                <label className="text-sm font-medium text-slate-700 mb-1.5 block">Year</label>
                <select
                  value={form.year}
                  onChange={(e) => update("year", e.target.value)}
                  className="w-full h-9 px-3 text-sm rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {years.map((y) => <option key={y} value={y}>Year {y}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 mb-1.5 block">Semester</label>
                <select
                  value={form.semester}
                  onChange={(e) => update("semester", e.target.value)}
                  className="w-full h-9 px-3 text-sm rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {semesters.map((s) => <option key={s} value={s}>Sem {s}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 mb-1.5 block">Subject Name</label>
                <Input
                  placeholder="e.g. DBMS"
                  value={form.subject}
                  onChange={(e) => update("subject", e.target.value)}
                />
              </div>
            </div>

            {/* For previous papers: exam year */}
            {form.type === "previous_paper" && (
              <div>
                <label className="text-sm font-medium text-slate-700 mb-1.5 block">Exam Year</label>
                <Input
                  type="number"
                  placeholder="e.g. 2024"
                  value={form.examYear}
                  onChange={(e) => update("examYear", e.target.value)}
                  min={2000}
                  max={2100}
                />
              </div>
            )}

            {/* File upload */}
            <div>
              <label className="text-sm font-medium text-slate-700 mb-1.5 block">Upload File (PDF, Image)</label>
              <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-slate-200 rounded-lg cursor-pointer hover:border-indigo-300 hover:bg-indigo-50/30 transition-colors">
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
                  onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                />
                {file ? (
                  <div className="flex items-center gap-2 text-sm text-indigo-700">
                    <FileText className="w-5 h-5" />
                    <span>{file.name}</span>
                  </div>
                ) : (
                  <div className="text-center">
                    <Upload className="w-6 h-6 text-slate-400 mx-auto mb-1" />
                    <p className="text-xs text-slate-500">Click to upload or drag & drop</p>
                    <p className="text-xs text-slate-400">PDF, Word, Images up to 20MB</p>
                  </div>
                )}
              </label>
            </div>

            {/* Or external link */}
            <div>
              <label className="text-sm font-medium text-slate-700 mb-1.5 block">
                Or paste a link <span className="text-slate-400 font-normal">(Google Drive, etc.)</span>
              </label>
              <Input
                type="url"
                placeholder="https://drive.google.com/..."
                value={form.externalUrl}
                onChange={(e) => update("externalUrl", e.target.value)}
              />
            </div>

            {/* Description */}
            <div>
              <label className="text-sm font-medium text-slate-700 mb-1.5 block">
                Description <span className="text-slate-400 font-normal">(optional)</span>
              </label>
              <textarea
                className="w-full min-h-[80px] px-3 py-2 text-sm rounded-lg border border-slate-200 bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                placeholder="What does this resource cover? Any tips?"
                value={form.description}
                onChange={(e) => update("description", e.target.value)}
              />
            </div>

            <div className="p-3 rounded-lg bg-indigo-50 text-xs text-indigo-700">
              ✓ Uploading this resource earns you <strong>+10 contribution points</strong>.
            </div>

            <div className="flex gap-3">
              <Button
                type="submit"
                disabled={!form.title.trim() || (!file && !form.externalUrl) || isSubmitting}
                className="flex-1"
              >
                {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Uploading…</> : "Submit Resource"}
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

export default function UploadPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-slate-400" /></div>}>
      <UploadForm />
    </Suspense>
  );
}
