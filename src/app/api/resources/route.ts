import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { CONTRIBUTION_POINTS } from "@/lib/utils";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const subjectId = searchParams.get("subjectId");
  const type = searchParams.get("type");

  try {
    const resources = await prisma.resource.findMany({
      where: {
        status: "APPROVED",
        ...(subjectId ? { subjectId } : {}),
        ...(type ? { type } : {}),
      },
      orderBy: { downloads: "desc" },
      include: {
        uploader: { select: { name: true } },
        subject: { select: { name: true, code: true } },
      },
    });
    return NextResponse.json({ resources });
  } catch (error) {
    console.error("GET /api/resources error:", error);
    return NextResponse.json({ error: "Failed to fetch resources" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  }

  try {
    const { title, description, type, subjectId, externalUrl, fileUrl, fileType } = await req.json();

    if (!title?.trim() || !subjectId || (!externalUrl && !fileUrl)) {
      return NextResponse.json({ error: "Title, subjectId, and file/link are required" }, { status: 400 });
    }

    const resource = await prisma.resource.create({
      data: {
        title: title.trim(),
        description: description?.trim() ?? null,
        type: type ?? "notes",
        subjectId,
        uploadedBy: session.user.id,
        externalUrl: externalUrl ?? null,
        fileUrl: fileUrl ?? null,
        fileType: fileType ?? null,
        source: "COMMUNITY",
        status: "PENDING",
      },
    });

    await prisma.contribution.create({
      data: {
        userId: session.user.id,
        type: "upload_resource",
        points: CONTRIBUTION_POINTS.upload_resource,
        referenceId: resource.id,
      },
    });
    await prisma.profile.update({
      where: { userId: session.user.id },
      data: { points: { increment: CONTRIBUTION_POINTS.upload_resource } },
    });

    return NextResponse.json({ resource, pointsEarned: CONTRIBUTION_POINTS.upload_resource }, { status: 201 });
  } catch (error) {
    console.error("POST /api/resources error:", error);
    return NextResponse.json({ error: "Failed to submit resource" }, { status: 500 });
  }
}
