import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { CONTRIBUTION_POINTS } from "@/lib/utils";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const answers = await prisma.answer.findMany({
      where: { discussionId: id },
      orderBy: [{ isAccepted: "desc" }, { upvotes: "desc" }],
      include: {
        author: { select: { name: true, profile: { select: { year: true } } } },
      },
    });
    return NextResponse.json({ answers });
  } catch (error) {
    console.error("GET answers error:", error);
    return NextResponse.json({ error: "Failed to fetch answers" }, { status: 500 });
  }
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  }

  try {
    const { content, isAnonymous } = await req.json();
    if (!content?.trim()) {
      return NextResponse.json({ error: "Content is required" }, { status: 400 });
    }

    const answer = await prisma.answer.create({
      data: {
        discussionId: id,
        content: content.trim(),
        authorId: session.user.id,
        isAnonymous: isAnonymous ?? false,
      },
    });

    // Award contribution points
    await prisma.contribution.create({
      data: {
        userId: session.user.id,
        type: "answer_question",
        points: CONTRIBUTION_POINTS.answer_question,
        referenceId: answer.id,
      },
    });
    await prisma.profile.update({
      where: { userId: session.user.id },
      data: { points: { increment: CONTRIBUTION_POINTS.answer_question } },
    });

    return NextResponse.json({ answer }, { status: 201 });
  } catch (error) {
    console.error("POST answer error:", error);
    return NextResponse.json({ error: "Failed to post answer" }, { status: 500 });
  }
}
