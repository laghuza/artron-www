import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Artron Sports OS database...');

  // 1. SuperAdmin Tenant ('artron-global')
  const tenant = await prisma.tenant.upsert({
    where: { slug: 'artron-global' },
    update: {},
    create: {
      name: 'Artron Global',
      slug: 'artron-global',
      plan: 'ENTERPRISE',
    },
  });

  // 2. Federation ('Georgian Football Federation', code: 'GFF')
  const federation = await prisma.federation.upsert({
    where: { code: 'GFF' },
    update: {},
    create: {
      tenantId: tenant.id,
      name: 'Georgian Football Federation',
      code: 'GFF',
      country: 'Georgia',
    },
  });

  // 3. Club ('FC Dinamo Academy')
  const club = await prisma.club.create({
    data: {
      tenantId: tenant.id,
      federationId: federation.id,
      name: 'FC Dinamo Academy',
      academyType: 'Pro Academy',
    },
  });

  // 4. Athlete ('Giorgi Demetradze')
  await prisma.athlete.create({
    data: {
      tenantId: tenant.id,
      clubId: club.id,
      firstName: 'Giorgi',
      lastName: 'Demetradze',
      biometricsJson: { heartRateAvg: 68, vo2Max: 58, topSpeedKmH: 32.4 },
      piiEncrypted: 'encrypted_pii_sample_demetradze',
    },
  });

  // 5. System Audit Log entry
  await prisma.auditLog.create({
    data: {
      tenantId: tenant.id,
      action: 'SYSTEM_DATABASE_SEED',
      ipAddress: '127.0.0.1',
    },
  });

  console.log('Database seeding completed successfully.');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
