import Link from "next/link";
import { ChevronRight, Shield, UserCheck, UserX, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";

const users = [
  { id: "1", name: "Rahul Kumar",  email: "rahul@college.edu",  role: "CONTRIBUTOR", dept: "CSE", year: 4, points: 348, isVerified: true,  joined: "Aug 2026" },
  { id: "2", name: "Priya Singh",  email: "priya@college.edu",  role: "STUDENT",     dept: "CSE", year: 3, points: 85,  isVerified: true,  joined: "Aug 2026" },
  { id: "3", name: "Aryan Mehta",  email: "aryan@college.edu",  role: "STUDENT",     dept: "ECE", year: 3, points: 42,  isVerified: true,  joined: "Sep 2026" },
  { id: "4", name: "Sneha Reddy",  email: "sneha@college.edu",  role: "STUDENT",     dept: "CSE", year: 4, points: 110, isVerified: true,  joined: "Aug 2026" },
  { id: "5", name: "GDSC Chapter", email: "gdsc@college.edu",   role: "ORGANIZATION",dept: "—",   year: 0, points: 0,   isVerified: true,  joined: "Jul 2026" },
  { id: "6", name: "Unknown User", email: "test@gmail.com",     role: "STUDENT",     dept: "—",   year: 1, points: 0,   isVerified: false, joined: "Sep 2026" },
];

const roleColors: Record<string, string> = {
  ADMIN:        "bg-red-100 text-red-700",
  CONTRIBUTOR:  "bg-indigo-100 text-indigo-700",
  ORGANIZATION: "bg-purple-100 text-purple-700",
  STUDENT:      "bg-slate-100 text-slate-700",
};

export default function AdminUsersPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <nav className="flex items-center gap-1.5 text-sm text-slate-500">
        <Link href="/admin" className="hover:text-indigo-600">Admin</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-700">Users</span>
      </nav>

      <div className="flex items-center justify-between gap-3">
        <h1 className="text-xl font-bold text-slate-900">Manage Users</h1>
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-400 text-sm w-64">
          <Search className="w-4 h-4 shrink-0" />
          <span>Search users…</span>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm text-slate-500 font-medium">{users.length} total users</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-slate-100">
            {users.map((user) => (
              <div key={user.id} className="flex items-center gap-3 px-5 py-3 hover:bg-slate-50 transition-colors">
                <Avatar className="w-9 h-9 shrink-0">
                  <AvatarFallback className="text-xs">{getInitials(user.name)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-medium text-slate-900">{user.name}</p>
                    {!user.isVerified && (
                      <Badge variant="warning">Unverified</Badge>
                    )}
                  </div>
                  <p className="text-xs text-slate-500">{user.email} · {user.dept}{user.year > 0 ? ` · Year ${user.year}` : ""} · Joined {user.joined}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs text-slate-500">{user.points} pts</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${roleColors[user.role]}`}>
                    {user.role}
                  </span>
                  {user.isVerified ? (
                    <button className="p-1.5 rounded-md text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors" title="Revoke access">
                      <UserX className="w-4 h-4" />
                    </button>
                  ) : (
                    <button className="p-1.5 rounded-md text-slate-400 hover:text-green-600 hover:bg-green-50 transition-colors" title="Verify user">
                      <UserCheck className="w-4 h-4" />
                    </button>
                  )}
                  <button className="p-1.5 rounded-md text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors" title="Change role">
                    <Shield className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button variant="outline" size="sm">Load more</Button>
      </div>
    </div>
  );
}
