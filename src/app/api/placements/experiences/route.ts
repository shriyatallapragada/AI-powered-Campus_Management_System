import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { CONTRIBUTION_POINTS } from "@/lib/utils";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const company = searchParams.get("company");
  const type = searchParams.get("type");
  const page = parseInt(searchParams.get("page") ?? "1");
  const limit = parseInt(searchParams.get("limit") ?? "10");

  try {
    const where = {
      status: "APPROVED" as const,
      ...(type ? { type: type as "INTERNSHIP" | "PLACEMENT" | "PROJECT" | "COMPETITION" } : {}),
      ...(company ? { companyName: { contains: company, mode: "insensitive" as const } } : {}),
    };

    const [experiences, total] = await Promise.all([
      prisma.placementExperience.findMany({
        where,
        orderBy: { upvotes: "desc" },
        skip: (page - 1) * limit,
        take: limit,
        include: {
          company: { select: { name: true } },
          author: { select: { name: true } },
        },
      }),
      prisma.placementExperience.count({ where }),
    ]);

    return NextResponse.json({ experiences, total, page, pages: Math.ceil(total / limit) });
  } catch (error) {
    console.error("GET /api/placements/experiences error:", error);
    return NextResponse.json({ error: "Failed to fetch experiences" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  }

  try {
    const { company, role, type, year, rounds, preparation, experience, outcome, tips, isAnonymous } = await req.json();

    if (!role?.trim() || !experience?.trim()) {
      return NextResponse.json({ error: "Role and experience are required" }, { status: 400 });
    }

    const exp = await prisma.placementExperience.create({
      data: {
        companyName: company?.trim() ?? null,
        role: role.trim(),
        type: type ?? "INTERNSHIP",
        year: year ? parseInt(year) : new Date().getFullYear(),
        selectionRounds: rounds ?? [],
        preparation: preparation ?? [],
        experience: `${experience.trim()}${tips ? `\n\n**Tips:** ${tips}` : ""}`,
        outcome: outcome ?? null,
        authorId: session.user.id,
        isAnonymous: isAnonymous ?? false,
        status: "PENDING",
      },
    });

    await prisma.contribution.create({
      data: {
        userId: session.user.id,
        type: "placement_experience",
        points: CONTRIBUTION_POINTS.placement_experience,
        referenceId: exp.id,
      },
    });
    await prisma.profile.update({
      where: { userId: session.user.id },
      data: { points: { increment: CONTRIBUTION_POINTS.placement_experience } },
    });

    return NextResponse.json({ experience: exp, pointsEarned: CONTRIBUTION_POINTS.placement_experience }, { status: 201 });
  } catch (error) {
    console.error("POST /api/placements/experiences error:", error);
    return NextResponse.json({ error: "Failed to submit experience" }, { status: 500 });
  }
}
