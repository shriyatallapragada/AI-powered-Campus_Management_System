import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { CONTRIBUTION_POINTS } from "@/lib/utils";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");
  const branch = searchParams.get("branch");
  const year = searchParams.get("year");

  try {
    const opportunities = await prisma.opportunity.findMany({
      where: {
        contentStatus: "APPROVED",
        status: "OPEN",
        ...(type ? { type: type as "INTERNSHIP" | "PLACEMENT" | "PROJECT" | "COMPETITION" } : {}),
        ...(branch ? { eligibleBranches: { has: branch } } : {}),
        ...(year ? { targetYear: { has: parseInt(year) } } : {}),
      },
      orderBy: { createdAt: "desc" },
      include: {
        company: { select: { name: true, logoUrl: true } },
        submitter: { select: { name: true } },
      },
    });
    return NextResponse.json({ opportunities });
  } catch (error) {
    console.error("GET /api/opportunities error:", error);
    return NextResponse.json({ error: "Failed to fetch opportunities" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  }

  try {
    const {
      company, role, type, location, stipend, applicationLink,
      deadline, minCGPA, description, eligibleBranches, targetYear,
    } = await req.json();

    if (!role?.trim() || !applicationLink?.trim()) {
      return NextResponse.json({ error: "Role and application link are required" }, { status: 400 });
    }

    const opportunity = await prisma.opportunity.create({
      data: {
        title: role.trim(),
        companyName: company?.trim() ?? null,
        type: type ?? "INTERNSHIP",
        location: location ?? null,
        stipend: stipend ?? null,
        applicationLink: applicationLink.trim(),
        applicationDeadline: deadline ? new Date(deadline) : null,
        minCGPA: minCGPA ? parseFloat(minCGPA) : null,
        description: description ?? null,
        eligibleBranches: eligibleBranches ?? [],
        targetYear: targetYear ?? [],
        submittedBy: session.user.id,
        source: "COMMUNITY",
        contentStatus: "PENDING",
        status: "OPEN",
      },
    });

    await prisma.contribution.create({
      data: {
        userId: session.user.id,
        type: "internship_opportunity",
        points: CONTRIBUTION_POINTS.internship_opportunity,
        referenceId: opportunity.id,
      },
    });
    await prisma.profile.update({
      where: { userId: session.user.id },
      data: { points: { increment: CONTRIBUTION_POINTS.internship_opportunity } },
    });

    return NextResponse.json({ opportunity, pointsEarned: CONTRIBUTION_POINTS.internship_opportunity }, { status: 201 });
  } catch (error) {
    console.error("POST /api/opportunities error:", error);
    return NextResponse.json({ error: "Failed to submit opportunity" }, { status: 500 });
  }
}
