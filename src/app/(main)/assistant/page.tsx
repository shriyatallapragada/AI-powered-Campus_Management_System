"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { ArrowUp, BookOpen, Briefcase, CalendarDays, FileText, LoaderCircle, MessageCircle, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type Source = { type: string; title: string; detail: string; href: string };
type Message = { role: "user" | "assistant"; text: string; sources?: Source[] };

const prompts = [
  { text: "Find DBMS viva questions", icon: FileText },
  { text: "What internships are open?", icon: Briefcase },
  { text: "Show upcoming campus events", icon: CalendarDays },
  { text: "Find notes and previous papers", icon: BookOpen },
];

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function ask(text: string, event?: FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    const submitted = text.trim();
    if (!submitted || loading) return;
    setQuestion("");
    setError("");
    setMessages((current) => [...current, { role: "user", text: submitted }]);
    setLoading(true);
    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: submitted }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? "Could not search right now.");
      setMessages((current) => [...current, { role: "assistant", text: result.answer, sources: result.sources }]);
    } catch (cause) {
      const message = cause instanceof Error ? cause.message : "Could not search right now.";
      setError(message);
      setMessages((current) => [...current, { role: "assistant", text: message }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto min-h-[calc(100vh-8rem)] flex flex-col">
      <div className="mb-6">
        <div className="flex items-center gap-2 text-indigo-700 mb-2"><Sparkles className="w-5 h-5" /><span className="text-sm font-semibold">COLLEGE KNOWLEDGE HUB</span></div>
        <h1 className="text-2xl font-bold text-slate-900">Ask the campus assistant</h1>
        <p className="text-sm text-slate-500 mt-1">Find study material, senior advice, opportunities, and campus updates in one place.</p>
      </div>

      <div className="flex-1 space-y-5 pb-5">
        {messages.length === 0 ? (
          <Card className="border-indigo-100 bg-gradient-to-br from-indigo-50/80 to-white">
            <CardContent className="p-6 sm:p-8">
              <div className="w-11 h-11 rounded-2xl bg-indigo-600 text-white flex items-center justify-center mb-4"><Sparkles className="w-5 h-5" /></div>
              <h2 className="text-lg font-semibold text-slate-900">Your college knowledge, easier to find.</h2>
              <p className="text-sm text-slate-600 mt-1 max-w-xl">Ask a question and I’ll look through available College Hub posts. Answers include links to the original sources.</p>
              <div className="grid sm:grid-cols-2 gap-2 mt-6">
                {prompts.map(({ text, icon: Icon }) => <button key={text} onClick={() => ask(text)} className="flex items-center gap-2.5 text-left text-sm text-slate-700 bg-white hover:border-indigo-300 border border-slate-200 rounded-xl p-3 transition-colors"><Icon className="w-4 h-4 text-indigo-600 shrink-0" />{text}</button>)}
              </div>
            </CardContent>
          </Card>
        ) : messages.map((message, index) => (
          <div key={`${message.role}-${index}`} className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}>
            {message.role === "assistant" && <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0 mt-1"><Sparkles className="w-4 h-4" /></div>}
            <div className={`max-w-[88%] ${message.role === "user" ? "bg-indigo-600 text-white rounded-2xl rounded-tr-sm px-4 py-3" : "space-y-3"}`}>
              {message.role === "assistant" && <p className="text-sm leading-6 text-slate-700">{message.text}</p>}
              {message.role === "user" && <p className="text-sm leading-6">{message.text}</p>}
              {message.sources && message.sources.length > 0 && <div className="space-y-2">{message.sources.map((source, sourceIndex) => <Link href={source.href} key={`${source.title}-${sourceIndex}`} className="block rounded-xl border border-slate-200 bg-white hover:border-indigo-300 p-3 transition-colors"><span className="text-[11px] font-semibold uppercase tracking-wide text-indigo-600">{source.type}</span><span className="block text-sm font-medium text-slate-800 mt-0.5">{source.title}</span><span className="block text-xs text-slate-500 mt-1 line-clamp-2">{source.detail}</span></Link>)}</div>}
            </div>
          </div>
        ))}
        {loading && <div className="flex items-center gap-2 text-sm text-slate-500 ml-11"><LoaderCircle className="w-4 h-4 animate-spin" />Searching College Hub…</div>}
      </div>

      <div className="sticky bottom-16 lg:bottom-0 bg-slate-50/95 pt-3 pb-2">
        {error && <p className="text-xs text-rose-600 mb-2">{error}</p>}
        <form onSubmit={(event) => ask(question, event)} className="flex gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm focus-within:border-indigo-300">
          <Input value={question} onChange={(event) => setQuestion(event.target.value)} placeholder="Ask about exams, notes, placements, campus…" maxLength={300} className="border-0 shadow-none focus-visible:ring-0" aria-label="Ask the campus assistant" />
          <button type="submit" disabled={!question.trim() || loading} aria-label="Send question" className="w-10 h-10 shrink-0 rounded-xl bg-indigo-600 text-white flex items-center justify-center hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed"><ArrowUp className="w-5 h-5" /></button>
        </form>
        <p className="text-center text-[11px] text-slate-400 mt-2 flex justify-center items-center gap-1"><MessageCircle className="w-3 h-3" />Answers come from content available in the hub; check source posts for full details.</p>
      </div>
    </div>
  );
}
