import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { CONTRIBUTION_POINTS } from "@/lib/utils";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const subjectId = searchParams.get("subjectId");
  const professorId = searchParams.get("professorId");

  try {
    const questions = await prisma.vivaQuestion.findMany({
      where: {
        status: "APPROVED",
        ...(subjectId ? { subjectId } : {}),
        ...(professorId ? { professorId } : {}),
      },
      orderBy: { upvotes: "desc" },
      include: {
        professor: { select: { name: true } },
        _count: { select: { answers: true } },
      },
    });
    return NextResponse.json({ questions });
  } catch (error) {
    console.error("GET /api/viva error:", error);
    return NextResponse.json({ error: "Failed to fetch viva questions" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  }

  try {
    const { questions, subjectId, professorId, semester, year, isAnonymous } = await req.json();

    if (!questions?.length || !subjectId) {
      return NextResponse.json({ error: "Questions and subjectId are required" }, { status: 400 });
    }

    const created = await prisma.$transaction(
      questions
        .filter((q: { question: string }) => q.question?.trim())
        .map((q: { question: string }) =>
          prisma.vivaQuestion.create({
            data: {
              question: q.question.trim(),
              subjectId,
              professorId: professorId ?? null,
              semester: semester ? parseInt(semester) : null,
              year: year ? parseInt(year) : null,
              authorId: session.user.id,
              isAnonymous: isAnonymous ?? false,
              status: "APPROVED",
            },
          })
        )
    );

    const points = created.length * CONTRIBUTION_POINTS.add_viva_question;
    await prisma.contribution.create({
      data: { userId: session.user.id, type: "add_viva_question", points, referenceId: created[0]?.id },
    });
    await prisma.profile.update({
      where: { userId: session.user.id },
      data: { points: { increment: points } },
    });

    return NextResponse.json({ questions: created, pointsEarned: points }, { status: 201 });
  } catch (error) {
    console.error("POST /api/viva error:", error);
    return NextResponse.json({ error: "Failed to add viva questions" }, { status: 500 });
  }
}
