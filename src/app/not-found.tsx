import Link from "next/link";
import { GraduationCap, Home, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
      <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-600 mb-6">
        <GraduationCap className="w-7 h-7 text-white" />
      </div>
      <h1 className="text-4xl font-bold text-slate-900 mb-2">404</h1>
      <p className="text-lg font-semibold text-slate-700 mb-1">Page not found</p>
      <p className="text-sm text-slate-500 mb-8 max-w-sm">
        The page you&apos;re looking for doesn&apos;t exist. It may have been removed or the link is incorrect.
      </p>
      <div className="flex items-center gap-3">
        <Button asChild>
          <Link href="/"><Home className="w-4 h-4" /> Go Home</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/search"><Search className="w-4 h-4" /> Search</Link>
        </Button>
      </div>
    </div>
  );
}
