import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q")?.trim();

  if (!q || q.length < 2) {
    return NextResponse.json({ results: [] });
  }

  try {
    const [subjects, vivaQuestions, discussions, opportunities, professors] = await Promise.all([
      prisma.subject.findMany({
        where: { OR: [{ name: { contains: q, mode: "insensitive" } }, { code: { contains: q, mode: "insensitive" } }] },
        take: 5,
        include: { department: { select: { code: true } } },
      }),
      prisma.vivaQuestion.findMany({
        where: { question: { contains: q, mode: "insensitive" }, status: "APPROVED" },
        take: 5,
        include: { subject: { select: { name: true } } },
      }),
      prisma.discussion.findMany({
        where: {
          status: "APPROVED",
          OR: [
            { title: { contains: q, mode: "insensitive" } },
            { tags: { has: q } },
          ],
        },
        take: 5,
      }),
      prisma.opportunity.findMany({
        where: {
          contentStatus: "APPROVED",
          OR: [
            { title: { contains: q, mode: "insensitive" } },
            { companyName: { contains: q, mode: "insensitive" } },
          ],
        },
        take: 5,
      }),
      prisma.professor.findMany({
        where: { name: { contains: q, mode: "insensitive" } },
        take: 3,
        include: { department: { select: { code: true } } },
      }),
    ]);

    const results = [
      ...subjects.map((s) => ({
        type: "subject",
        title: s.name,
        subtitle: `${s.department.code} · Year ${s.year} · Sem ${s.semester}`,
        href: `/academics/${s.department.code.toLowerCase()}/subjects/${s.id}`,
        tags: [s.department.code, `Sem ${s.semester}`],
      })),
      ...vivaQuestions.map((v) => ({
        type: "viva",
        title: v.question,
        subtitle: `${v.subject.name} Viva · ${v.upvotes} upvotes`,
        href: `/academics/viva/${v.id}`,
        tags: ["Viva", v.subject.name],
      })),
      ...discussions.map((d) => ({
        type: "discussion",
        title: d.title,
        subtitle: `Community · ${d.views} views`,
        href: `/community/${d.id}`,
        tags: d.tags.slice(0, 3),
      })),
      ...opportunities.map((o) => ({
        type: "placement",
        title: `${o.companyName ?? "Company"} — ${o.title}`,
        subtitle: `${o.type} · ${o.status}`,
        href: `/placements`,
        tags: [o.type, o.eligibleBranches[0] ?? ""],
      })),
      ...professors.map((p) => ({
        type: "professor",
        title: p.name,
        subtitle: `${p.department.code} Department`,
        href: `/academics/professors/${p.id}`,
        tags: ["Professor", p.department.code],
      })),
    ];

    return NextResponse.json({ results, query: q });
  } catch (error) {
    console.error("GET /api/search error:", error);
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}
