"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Search, BookOpen, FileText, Briefcase, MessageSquare, User, Loader2 } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

// Mock search results — will be replaced with real DB search API
const allResults = [
  { type: "subject", title: "Database Management Systems (DBMS)", subtitle: "CSE · Year 3 · Sem 5", href: "/academics/cse/subjects/dbms", tags: ["DBMS", "CSE", "Database"] },
  { type: "subject", title: "Operating Systems", subtitle: "CSE · Year 3 · Sem 5", href: "/academics/cse/subjects/os", tags: ["OS", "CSE", "Systems"] },
  { type: "viva", title: "What is normalization? Explain 1NF, 2NF, 3NF.", subtitle: "DBMS Viva · Prof. Sharma · 52 upvotes", href: "/academics/viva/v1", tags: ["DBMS", "Viva"] },
  { type: "viva", title: "Explain ACID properties with examples.", subtitle: "DBMS Viva · 38 upvotes", href: "/academics/viva/v2", tags: ["DBMS", "Viva"] },
  { type: "placement", title: "Amazon SDE Intern", subtitle: "INTERNSHIP · CSE/ECE · CGPA ≥ 8.0 · Deadline Sep 20", href: "/placements", tags: ["Amazon", "Internship"] },
  { type: "placement", title: "Microsoft Software Engineer", subtitle: "PLACEMENT · CSE/ECE/IT · CGPA ≥ 7.5", href: "/placements", tags: ["Microsoft", "Placement"] },
  { type: "discussion", title: "What topics did Prof. Sharma focus on in DBMS viva?", subtitle: "Community · 12 answers · 340 views", href: "/community/1", tags: ["DBMS", "Viva"] },
  { type: "professor", title: "Prof. Sharma", subtitle: "DBMS, Operating Systems · CSE Department", href: "/academics/professors/sharma", tags: ["Professor", "DBMS"] },
  { type: "resource", title: "DBMS Complete Notes", subtitle: "Notes · CSE Year 3 · 234 downloads", href: "/academics/cse/subjects/dbms", tags: ["DBMS", "Notes"] },
  { type: "resource", title: "DBMS Previous Papers 2022–2025", subtitle: "Question Papers · CSE Year 3", href: "/academics/cse/subjects/dbms", tags: ["DBMS", "Papers"] },
];

const typeIcons: Record<string, React.ElementType> = {
  subject: BookOpen,
  viva: FileText,
  placement: Briefcase,
  discussion: MessageSquare,
  professor: User,
  resource: FileText,
};

const typeColors: Record<string, string> = {
  subject: "bg-blue-50 text-blue-700",
  viva: "bg-amber-50 text-amber-700",
  placement: "bg-green-50 text-green-700",
  discussion: "bg-violet-50 text-violet-700",
  professor: "bg-pink-50 text-pink-700",
  resource: "bg-slate-100 text-slate-700",
};

function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

export default function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") ?? "";
  const [query, setQuery] = useState(initialQuery);
  const [isSearching, setIsSearching] = useState(false);
  const debouncedQuery = useDebounce(query, 300);

  const results = debouncedQuery.trim()
    ? allResults.filter((r) => {
        const q = debouncedQuery.toLowerCase();
        return (
          r.title.toLowerCase().includes(q) ||
          r.subtitle.toLowerCase().includes(q) ||
          r.tags.some((t) => t.toLowerCase().includes(q))
        );
      })
    : [];

  useEffect(() => {
    if (debouncedQuery) {
      setIsSearching(true);
      const t = setTimeout(() => setIsSearching(false), 200);
      return () => clearTimeout(t);
    }
  }, [debouncedQuery]);

  const popularSearches = [
    "DBMS viva questions",
    "Amazon internship",
    "Prof. Sharma",
    "OS previous papers",
    "3rd year CSE internships",
    "placement experiences Microsoft",
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900">Search</h1>
        <p className="text-sm text-slate-500 mt-1">
          Find anything — subjects, viva questions, placements, discussions, professors.
        </p>
      </div>

      {/* Search input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <Input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search — e.g. DBMS viva questions, Amazon internship…"
          className="pl-9 h-11 text-base"
        />
        {isSearching && (
          <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 animate-spin" />
        )}
      </div>

      {/* Results */}
      {query.trim() ? (
        <div className="space-y-2">
          <p className="text-xs text-slate-500">
            {results.length} result{results.length !== 1 ? "s" : ""} for &quot;{debouncedQuery}&quot;
          </p>

          {results.length === 0 && !isSearching && (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-slate-500 text-sm">No results found.</p>
                <p className="text-slate-400 text-xs mt-1">
                  Try different keywords, or{" "}
                  <Link href="/community/ask" className="text-indigo-600 hover:underline">
                    ask the community
                  </Link>
                  .
                </p>
              </CardContent>
            </Card>
          )}

          {results.map((result, i) => {
            const Icon = typeIcons[result.type] ?? FileText;
            return (
              <Link key={i} href={result.href}>
                <Card className="hover:border-indigo-200 hover:shadow-md transition-all cursor-pointer">
                  <CardContent className="p-4 flex items-start gap-3">
                    <span className={`p-2 rounded-lg shrink-0 ${typeColors[result.type]}`}>
                      <Icon className="w-4 h-4" />
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900">{result.title}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{result.subtitle}</p>
                      <div className="flex gap-1.5 mt-1.5 flex-wrap">
                        {result.tags.map((t) => (
                          <Badge key={t} variant="secondary">{t}</Badge>
                        ))}
                      </div>
                    </div>
                    <Badge variant="outline" className="shrink-0 capitalize">{result.type}</Badge>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-sm font-medium text-slate-600">Popular searches</p>
          <div className="flex flex-wrap gap-2">
            {popularSearches.map((s) => (
              <button
                key={s}
                onClick={() => setQuery(s)}
                className="px-3 py-1.5 rounded-full text-xs font-medium border border-slate-200 bg-white text-slate-600 hover:border-indigo-300 hover:text-indigo-700 transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
