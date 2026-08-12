import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding Artron Sports OS database...')

  // 1. Primary Tenant ('artron-global')
  const tenant = await prisma.tenant.upsert({
    where: { slug: 'artron-global' },
    update: {},
    create: {
      name: 'Artron Global Sports Academy',
      slug: 'artron-global',
      academyType: 'FOOTBALL',
      plan: 'ENTERPRISE',
      contactEmail: 'admin@artron.ge',
    },
  })

  // 2. Facility ('Dinamo Arena Training Grounds')
  const facility = await prisma.facility.create({
    data: {
      tenantId: tenant.id,
      name: 'Dinamo Arena Training Grounds',
      location: 'Tbilisi, Georgia',
      capacity: 500,
    },
  })

  // 3. Group ('U-17 Elite Squad')
  const group = await prisma.group.create({
    data: {
      tenantId: tenant.id,
      facilityId: facility.id,
      name: 'U-17 Elite Squad',
      ageCategory: 'U-17',
      discipline: 'Football',
    },
  })

  // 4. Athlete Profile ('Giorgi Demetradze')
  await prisma.athleteProfile.create({
    data: {
      tenantId: tenant.id,
      groupId: group.id,
      firstName: 'Giorgi',
      lastName: 'Demetradze',
      dateOfBirth: new Date('2008-05-15'),
      gender: 'Male',
      isMinor: true,
      coppaConsentGranted: true,
      coppaConsentDate: new Date(),
      piiEncrypted: 'sample_aes256_encrypted_national_id',
    },
  })

  // 5. System Audit Log entry
  await prisma.auditLog.create({
    data: {
      tenantId: tenant.id,
      action: 'SYSTEM_DATABASE_SEED_COMPLETE',
      ipAddress: '127.0.0.1',
    },
  })

  console.log('Database seeding completed successfully.')
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
