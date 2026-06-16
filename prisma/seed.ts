import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

async function main() {
  // This script seeds Greg's historical data
  // Run with: npx tsx prisma/seed.ts GREG_USER_ID
  const userId = process.argv[2];
  if (!userId) {
    console.error('Usage: npx tsx prisma/seed.ts <userId>');
    console.error('Get your userId from the database after first login.');
    process.exit(1);
  }

  const seedPath = path.join(__dirname, '..', 'database', 'seed-data.json');
  const data = JSON.parse(fs.readFileSync(seedPath, 'utf-8'));

  console.log(`Seeding ${data.sessions.length} historical sessions for user ${userId}...`);

  for (const s of data.sessions) {
    const existing = await prisma.sabbatical.findFirst({
      where: { userId, title: s.title },
    });
    if (existing) {
      console.log(`  ⏭ Skipping "${s.title}" (already exists)`);
      continue;
    }

    const sabbatical = await prisma.sabbatical.create({
      data: {
        userId,
        title: s.title,
        date: new Date(s.date),
        status: s.status || 'completed',
        isDemo: false,
      },
    });

    // Day 1 Keys
    const moduleMap: Record<string, string> = {
      'Reverence': 'reverence', 'Release': 'release', 'Repent': 'repent',
      'Respond': 'respond', 'Receive': 'receive',
    };
    const keys = s.day1?.keysToTheKingdom || [];
    for (let i = 0; i < keys.length; i++) {
      const k = keys[i];
      const mk = moduleMap[k.name] || k.name.toLowerCase().replace(/\s+/g, '-');
      if (mk === 'day-1-overview') continue;
      await prisma.keyEntry.create({
        data: {
          sabbaticalId: sabbatical.id,
          moduleKey: mk,
          name: k.name,
          tags: JSON.stringify(k.tags || []),
          timeAllotted: k.time || '',
          completed: true,
          sortOrder: i,
        },
      });
    }

    // Day 2 Health
    const health = s.day2?.hi5Health || [];
    for (const h of health) {
      if (h.name === 'Day 2 Overview') continue;
      await prisma.healthEntry.create({
        data: {
          sabbaticalId: sabbatical.id,
          area: h.name,
          completed: true,
          feelIfAccomplish: h.feelIfAccomplish || '',
          whatIfDont: h.whatIfDont || '',
        },
      });
    }

    // Health Goals
    const healthGoals = s.day2?.healthGoals || [];
    for (const hg of healthGoals) {
      await prisma.healthGoal.create({
        data: {
          sabbaticalId: sabbatical.id,
          area: hg.area || '',
          goalText: hg.goalText || hg.name || '',
          status: hg.status || 'Not started',
          dueDate: hg.dueDate ? new Date(hg.dueDate) : null,
          sortOrder: hg.sortOrder || 0,
        },
      });
    }

    // Goals
    const goals = s.day2?.highFiveGoals || [];
    for (const g of goals) {
      await prisma.goal.create({
        data: {
          sabbaticalId: sabbatical.id,
          name: g.name,
          area: g.tag || '',
          dueDate: g.dueDate ? new Date(g.dueDate) : null,
          completed: g.completed || false,
        },
      });
    }

    // People
    const people = s.day2?.highFivePeople || [];
    for (const p of people) {
      await prisma.person.create({
        data: {
          sabbaticalId: sabbatical.id,
          name: p.name,
          area: p.tag || '',
          contacted: p.contacted || false,
        },
      });
    }

    // Reflection
    const ref = s.day2?.reflections;
    if (ref) {
      await prisma.reflection.create({
        data: {
          sabbaticalId: sabbatical.id,
          howWillIFeel: ref.howWillIFeel || '',
          whatIfIDont: ref.whatHappensIfIDont || '',
        },
      });
    }

    console.log(`  ✅ Seeded "${s.title}"`);
  }

  console.log('\nDone! 🎉');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
