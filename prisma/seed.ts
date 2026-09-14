import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding College Hub database...");

  // ── Departments ───────────────────────────────────────────────────────────
  const cse = await prisma.department.upsert({
    where: { code: "CSE" },
    update: {},
    create: { name: "Computer Science Engineering", code: "CSE", description: "Dept. of Computer Science & Engineering" },
  });
  const ece = await prisma.department.upsert({
    where: { code: "ECE" },
    update: {},
    create: { name: "Electronics & Communication Engineering", code: "ECE" },
  });
  await prisma.department.upsert({
    where: { code: "ME" },
    update: {},
    create: { name: "Mechanical Engineering", code: "ME" },
  });
  await prisma.department.upsert({
    where: { code: "CE" },
    update: {},
    create: { name: "Civil Engineering", code: "CE" },
  });
  console.log("✓ Departments");

  // ── Subjects ─────────────────────────────────────────────────────────────
  const dbms = await prisma.subject.upsert({
    where: { code_departmentId: { code: "CS501", departmentId: cse.id } },
    update: {},
    create: { name: "Database Management Systems", code: "CS501", year: 3, semester: 5, departmentId: cse.id, description: "RDBMS, SQL, Normalization, Transactions" },
  });
  const os = await prisma.subject.upsert({
    where: { code_departmentId: { code: "CS502", departmentId: cse.id } },
    update: {},
    create: { name: "Operating Systems", code: "CS502", year: 3, semester: 5, departmentId: cse.id },
  });
  const cn = await prisma.subject.upsert({
    where: { code_departmentId: { code: "CS503", departmentId: cse.id } },
    update: {},
    create: { name: "Computer Networks", code: "CS503", year: 3, semester: 5, departmentId: cse.id },
  });
  const ml = await prisma.subject.upsert({
    where: { code_departmentId: { code: "CS601", departmentId: cse.id } },
    update: {},
    create: { name: "Machine Learning", code: "CS601", year: 3, semester: 6, departmentId: cse.id },
  });
  console.log("✓ Subjects");

  // ── Professors ────────────────────────────────────────────────────────────
  const sharma = await prisma.professor.upsert({
    where: { id: "prof-sharma-1" },
    update: {},
    create: { id: "prof-sharma-1", name: "Prof. R. K. Sharma", departmentId: cse.id, designation: "Associate Professor" },
  });
  const nair = await prisma.professor.upsert({
    where: { id: "prof-nair-1" },
    update: {},
    create: { id: "prof-nair-1", name: "Prof. S. Nair", departmentId: cse.id, designation: "Assistant Professor" },
  });

  // Link professors to subjects
  await prisma.professorSubject.upsert({
    where: { professorId_subjectId: { professorId: sharma.id, subjectId: dbms.id } },
    update: {},
    create: { professorId: sharma.id, subjectId: dbms.id },
  });
  await prisma.professorSubject.upsert({
    where: { professorId_subjectId: { professorId: sharma.id, subjectId: os.id } },
    update: {},
    create: { professorId: sharma.id, subjectId: os.id },
  });
  await prisma.professorSubject.upsert({
    where: { professorId_subjectId: { professorId: nair.id, subjectId: os.id } },
    update: {},
    create: { professorId: nair.id, subjectId: os.id },
  });
  await prisma.professorSubject.upsert({
    where: { professorId_subjectId: { professorId: nair.id, subjectId: cn.id } },
    update: {},
    create: { professorId: nair.id, subjectId: cn.id },
  });
  console.log("✓ Professors");

  // ── Demo Users ────────────────────────────────────────────────────────────
  const password = await bcrypt.hash("password123", 12);

  const admin = await prisma.user.upsert({
    where: { email: "admin@college.edu" },
    update: {},
    create: {
      email: "admin@college.edu",
      name: "Admin",
      password,
      role: "ADMIN",
      isVerified: true,
      profile: { create: { departmentId: cse.id, year: 4, points: 0 } },
    },
  });

  const rahul = await prisma.user.upsert({
    where: { email: "rahul@college.edu" },
    update: {},
    create: {
      email: "rahul@college.edu",
      name: "Rahul Kumar",
      password,
      role: "CONTRIBUTOR",
      isVerified: true,
      profile: { create: { departmentId: cse.id, year: 4, semester: 7, points: 348, skills: ["DSA", "Web Dev", "Python"], interests: ["Placements", "ML"] } },
    },
  });

  const priya = await prisma.user.upsert({
    where: { email: "priya@college.edu" },
    update: {},
    create: {
      email: "priya@college.edu",
      name: "Priya Singh",
      password,
      role: "STUDENT",
      isVerified: true,
      profile: { create: { departmentId: cse.id, year: 3, semester: 5, points: 85 } },
    },
  });
  console.log("✓ Users (admin / rahul / priya — all password: password123)");

  // ── Companies ─────────────────────────────────────────────────────────────
  const microsoft = await prisma.company.upsert({
    where: { name: "Microsoft" },
    update: {},
    create: { name: "Microsoft", website: "https://microsoft.com" },
  });
  const amazon = await prisma.company.upsert({
    where: { name: "Amazon" },
    update: {},
    create: { name: "Amazon", website: "https://amazon.com" },
  });
  console.log("✓ Companies");

  // ── Opportunities ─────────────────────────────────────────────────────────
  await prisma.opportunity.create({
    data: {
      title: "SDE Intern",
      companyId: amazon.id,
      companyName: "Amazon",
      type: "INTERNSHIP",
      eligibleBranches: ["CSE", "ECE"],
      minCGPA: 8.0,
      targetYear: [3],
      location: "Bangalore",
      stipend: "₹80,000/month",
      applicationDeadline: new Date("2026-09-20"),
      applicationLink: "https://amazon.jobs",
      source: "OFFICIAL",
      contentStatus: "APPROVED",
      status: "OPEN",
      submittedBy: admin.id,
    },
  });
  await prisma.opportunity.create({
    data: {
      title: "Software Engineer",
      companyId: microsoft.id,
      companyName: "Microsoft",
      type: "PLACEMENT",
      eligibleBranches: ["CSE", "ECE", "IT"],
      minCGPA: 7.5,
      targetYear: [4],
      location: "Hyderabad",
      stipend: "₹16 LPA",
      applicationDeadline: new Date("2026-09-25"),
      applicationLink: "https://careers.microsoft.com",
      source: "OFFICIAL",
      contentStatus: "APPROVED",
      status: "OPEN",
      submittedBy: admin.id,
    },
  });
  console.log("✓ Opportunities");

  // ── Viva Questions ────────────────────────────────────────────────────────
  const vivaData = [
    { question: "What is normalization? Explain 1NF, 2NF, 3NF with an example.", upvotes: 52 },
    { question: "Explain ACID properties with real-world examples.", upvotes: 38 },
    { question: "Write a SQL query to find the second highest salary.", upvotes: 31 },
    { question: "What is a view? When would you use one?", upvotes: 22 },
    { question: "Explain the difference between DELETE, DROP, and TRUNCATE.", upvotes: 45 },
    { question: "What is a transaction? What are the different states?", upvotes: 28 },
  ];

  for (const vq of vivaData) {
    await prisma.vivaQuestion.create({
      data: {
        question: vq.question,
        subjectId: dbms.id,
        professorId: sharma.id,
        semester: 5,
        year: 2025,
        authorId: rahul.id,
        status: "APPROVED",
        upvotes: vq.upvotes,
      },
    });
  }
  console.log("✓ Viva questions");

  // ── Resources ─────────────────────────────────────────────────────────────
  await prisma.resource.createMany({
    data: [
      { title: "DBMS Complete Notes by Rahul", type: "notes", subjectId: dbms.id, uploadedBy: rahul.id, source: "VERIFIED_STUDENT", status: "APPROVED", downloads: 234 },
      { title: "Lab Programs 1–10 with SQL Solutions", type: "lab_material", subjectId: dbms.id, uploadedBy: priya.id, source: "VERIFIED_STUDENT", status: "APPROVED", downloads: 312 },
      { title: "OS Notes — Process Management", type: "notes", subjectId: os.id, uploadedBy: rahul.id, source: "VERIFIED_STUDENT", status: "APPROVED", downloads: 178 },
    ],
  });
  console.log("✓ Resources");

  // ── Discussions ───────────────────────────────────────────────────────────
  const d1 = await prisma.discussion.create({
    data: {
      title: "What topics did Prof. Sharma focus on in DBMS viva this semester?",
      body: "I have my DBMS viva next week. Anyone who's already given it, what questions did prof ask?",
      tags: ["DBMS", "Viva", "CSE"],
      subjectId: dbms.id,
      authorId: priya.id,
      isAnonymous: true,
      status: "APPROVED",
      upvotes: 34,
      views: 340,
    },
  });
  await prisma.answer.create({
    data: {
      discussionId: d1.id,
      content: "Just gave my viva last week. Prof. Sharma focused heavily on normalization, SQL queries, and ER diagrams. He asked me to normalize a table to 3NF step by step.",
      authorId: rahul.id,
      isAccepted: true,
      upvotes: 28,
    },
  });

  await prisma.discussion.create({
    data: {
      title: "Which elective is easier to manage alongside placements — Cloud or InfoSec?",
      body: "I'm in 6th sem with placements going on. Which elective has less workload?",
      tags: ["Electives", "Placements", "CSE"],
      authorId: priya.id,
      isAnonymous: false,
      status: "APPROVED",
      upvotes: 27,
      views: 210,
    },
  });
  console.log("✓ Discussions & answers");

  // ── Placement Experience ──────────────────────────────────────────────────
  await prisma.placementExperience.create({
    data: {
      companyId: microsoft.id,
      companyName: "Microsoft",
      role: "SDE Intern",
      type: "INTERNSHIP",
      year: 2026,
      selectionRounds: [
        { round: 1, type: "Online Assessment", description: "2 DSA problems on HackerRank — 90 minutes." },
        { round: 2, type: "Technical Interview 1", description: "Trees, graphs, complexity analysis." },
        { round: 3, type: "Technical Interview 2", description: "OOP, system design basics, DBMS." },
        { round: 4, type: "HR", description: "Standard behavioural questions." },
      ],
      preparation: ["DSA", "OOP", "DBMS", "OS", "System Design basics"],
      experience: "The process took 3 weeks from OA to offer. Microsoft's interviews are collaborative — they give hints if you're stuck.",
      outcome: "selected",
      authorId: rahul.id,
      isAnonymous: false,
      status: "APPROVED",
      upvotes: 48,
    },
  });
  console.log("✓ Placement experience");

  // ── Events ────────────────────────────────────────────────────────────────
  await prisma.event.createMany({
    data: [
      { title: "AI/ML Workshop — GDSC", type: "WORKSHOP", startDate: new Date("2026-09-20T10:00:00"), location: "Seminar Hall B", organizer: "GDSC", registrationDeadline: new Date("2026-09-19"), source: "OFFICIAL", status: "APPROVED" },
      { title: "24-Hour Hackathon — IEEE", type: "HACKATHON", startDate: new Date("2026-09-28T09:00:00"), location: "CSE Labs", organizer: "IEEE Student Branch", registrationDeadline: new Date("2026-09-22"), source: "OFFICIAL", status: "APPROVED" },
    ],
  });
  console.log("✓ Events");

  // ── Announcements ─────────────────────────────────────────────────────────
  await prisma.announcement.createMany({
    data: [
      { title: "End Semester Exam Schedule Released", body: "The end semester exam schedule for Semester 5 & 6 has been published.", source: "OFFICIAL", authorId: admin.id, pinned: true, status: "APPROVED" },
      { title: "Fee Payment Deadline — October 10", body: "Semester fee payment deadline is October 10, 2026. Late payment attracts a fine.", source: "OFFICIAL", authorId: admin.id, pinned: true, status: "APPROVED" },
    ],
  });
  console.log("✓ Announcements");

  // ── Badges ────────────────────────────────────────────────────────────────
  const badges = [
    { name: "First Contribution", description: "Made your first contribution", icon: "🌱", threshold: 1 },
    { name: "Helper", description: "Earned 50 contribution points", icon: "🤝", threshold: 50 },
    { name: "Contributor", description: "Earned 150 contribution points", icon: "⭐", threshold: 150 },
    { name: "Trusted Contributor", description: "Earned 300 contribution points", icon: "🏆", threshold: 300 },
    { name: "Knowledge Champion", description: "Earned 500 contribution points", icon: "🎓", threshold: 500 },
  ];
  for (const badge of badges) {
    await prisma.badge.upsert({
      where: { name: badge.name },
      update: {},
      create: badge,
    });
  }
  console.log("✓ Badges");

  // ── Admin Info ────────────────────────────────────────────────────────────
  await prisma.adminInfo.createMany({
    data: [
      { category: "fee_office", title: "Fee Office Timings", content: "Monday to Friday: 10 AM – 4 PM\nSaturday: 10 AM – 1 PM\nLocation: Admin Block, Ground Floor, Room 102" },
      { category: "exam_cell", title: "Examination Cell", content: "Monday to Friday: 9 AM – 5 PM\nLocation: Admin Block, First Floor, Room 201\nContact: examcell@college.edu" },
      { category: "library", title: "Library Timings", content: "Monday to Friday: 8 AM – 9 PM\nSaturday & Sunday: 9 AM – 5 PM" },
    ],
  });
  console.log("✓ Admin info");

  console.log("\n✅ Seeding complete!");
  console.log("   Demo accounts:");
  console.log("   admin@college.edu / password123 (Admin)");
  console.log("   rahul@college.edu / password123 (Contributor)");
  console.log("   priya@college.edu / password123 (Student)");
}

main()
  .catch((e) => { console.error("Seed error:", e); process.exit(1); })
  .finally(() => prisma.$disconnect());
