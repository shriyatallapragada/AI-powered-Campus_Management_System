import Link from "next/link";
import { BookOpen, Briefcase, MessageSquare, Upload, Star, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// Mock profile — will come from session + DB
const profile = {
  name: "Rahul Kumar",
  email: "rahul.kumar@college.edu",
  branch: "CSE",
  year: 4,
  semester: 7,
  points: 348,
  role: "CONTRIBUTOR",
  badges: [
    { name: "First Contribution", icon: "🌱" },
    { name: "Helper", icon: "🤝" },
    { name: "Contributor", icon: "⭐" },
    { name: "Trusted Contributor", icon: "🏆" },
  ],
  stats: {
    resourcesUploaded: 12,
    questionsAnswered: 48,
    vivaQuestionsAdded: 23,
    placementExperiences: 5,
  },
  recentContributions: [
    { type: "upload", title: "DBMS Complete Notes", points: 10, date: "2 days ago" },
    { type: "answer", title: "Answered: What topics did Prof. Sharma cover?", points: 5, date: "3 days ago" },
    { type: "viva", title: "Added viva question: Explain 3NF normalization", points: 5, date: "5 days ago" },
    { type: "placement", title: "Shared Microsoft intern experience", points: 15, date: "1 week ago" },
  ],
};

const contributionIcons: Record<string, React.ElementType> = {
  upload: Upload,
  answer: MessageSquare,
  viva: BookOpen,
  placement: Briefcase,
};

const nextBadge = { name: "Knowledge Champion", threshold: 500, icon: "🎓" };
const progress = Math.min((profile.points / nextBadge.threshold) * 100, 100);

export default function ProfilePage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Profile header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Avatar className="w-16 h-16 text-xl">
              <AvatarFallback>RK</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl font-bold text-slate-900">{profile.name}</h1>
                <Badge variant={profile.role === "CONTRIBUTOR" ? "default" : "secondary"}>
                  {profile.role}
                </Badge>
              </div>
              <p className="text-sm text-slate-500 mt-0.5">
                {profile.branch} · {profile.year}th Year · {profile.email}
              </p>

              {/* Badges */}
              <div className="flex gap-1.5 mt-2 flex-wrap">
                {profile.badges.map((b) => (
                  <span
                    key={b.name}
                    title={b.name}
                    className="text-lg cursor-help"
                  >
                    {b.icon}
                  </span>
                ))}
              </div>
            </div>
            <Button variant="outline" size="sm" asChild>
            <Link href="/profile/edit">Edit Profile</Link>
          </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Points & Progress */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-400" />
              Contribution Points
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-indigo-600">{profile.points}</p>
            <p className="text-xs text-slate-500 mt-1">points earned</p>

            <div className="mt-4">
              <div className="flex justify-between text-xs text-slate-500 mb-1">
                <span>Progress to {nextBadge.name} {nextBadge.icon}</span>
                <span>{profile.points}/{nextBadge.threshold}</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div
                  className="bg-indigo-600 h-2 rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Award className="w-4 h-4 text-green-500" />
              Contributions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Resources Uploaded", value: profile.stats.resourcesUploaded, icon: Upload },
                { label: "Questions Answered", value: profile.stats.questionsAnswered, icon: MessageSquare },
                { label: "Viva Questions Added", value: profile.stats.vivaQuestionsAdded, icon: BookOpen },
                { label: "Placement Experiences", value: profile.stats.placementExperiences, icon: Briefcase },
              ].map(({ label, value, icon: Icon }) => (
                <div key={label} className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50">
                  <Icon className="w-4 h-4 text-slate-400 shrink-0" />
                  <div>
                    <p className="text-lg font-bold text-slate-900">{value}</p>
                    <p className="text-xs text-slate-500 leading-tight">{label}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Contributions */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Recent Contributions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {profile.recentContributions.map((c, i) => {
            const Icon = contributionIcons[c.type] ?? Upload;
            return (
              <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-slate-50">
                <span className="p-1.5 rounded-md bg-white border border-slate-200">
                  <Icon className="w-3.5 h-3.5 text-slate-500" />
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-700 truncate">{c.title}</p>
                  <p className="text-xs text-slate-400">{c.date}</p>
                </div>
                <span className="text-xs font-medium text-green-600 shrink-0">+{c.points} pts</span>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
