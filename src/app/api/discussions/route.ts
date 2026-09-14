import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { CONTRIBUTION_POINTS } from "@/lib/utils";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const tag = searchParams.get("tag");
  const subjectId = searchParams.get("subjectId");
  const page = parseInt(searchParams.get("page") ?? "1");
  const limit = parseInt(searchParams.get("limit") ?? "20");

  try {
    const where = {
      status: "APPROVED" as const,
      ...(tag ? { tags: { has: tag } } : {}),
      ...(subjectId ? { subjectId } : {}),
    };

    const [discussions, total] = await Promise.all([
      prisma.discussion.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
        include: {
          author: { select: { name: true, profile: { select: { year: true, department: { select: { code: true } } } } } },
          _count: { select: { answers: true } },
        },
      }),
      prisma.discussion.count({ where }),
    ]);

    return NextResponse.json({ discussions, total, page, pages: Math.ceil(total / limit) });
  } catch (error) {
    console.error("GET /api/discussions error:", error);
    return NextResponse.json({ error: "Failed to fetch discussions" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  }

  try {
    const { title, body, tags, subjectId, isAnonymous } = await req.json();

    if (!title?.trim() || !body?.trim()) {
      return NextResponse.json({ error: "Title and body are required" }, { status: 400 });
    }

    const discussion = await prisma.discussion.create({
      data: {
        title: title.trim(),
        body: body.trim(),
        tags: tags ?? [],
        subjectId: subjectId ?? null,
        authorId: session.user.id,
        isAnonymous: isAnonymous ?? false,
        status: "APPROVED",
      },
    });

    // Award contribution points
    await prisma.contribution.create({
      data: {
        userId: session.user.id,
        type: "ask_question",
        points: CONTRIBUTION_POINTS.answer_question,
        referenceId: discussion.id,
      },
    });
    await prisma.profile.update({
      where: { userId: session.user.id },
      data: { points: { increment: CONTRIBUTION_POINTS.answer_question } },
    });

    return NextResponse.json({ discussion }, { status: 201 });
  } catch (error) {
    console.error("POST /api/discussions error:", error);
    return NextResponse.json({ error: "Failed to create discussion" }, { status: 500 });
  }
}
