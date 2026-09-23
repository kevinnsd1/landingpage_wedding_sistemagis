import { db } from './src/db/index.js';
import { packages, themes } from './src/db/schema.js';

async function seed() {
  console.log('Seeding packages...');
  const [freePkg] = await db.insert(packages).values({
    name: 'Free',
    price: 0,
    features: ['Basic UI', '1 Gallery Photo', 'No Custom Domain']
  }).returning();

  const [premiumPkg] = await db.insert(packages).values({
    name: 'Premium',
    price: 150000,
    features: ['Advanced UI', 'Unlimited Gallery', 'Custom Domain']
  }).returning();

  const [exclusivePkg] = await db.insert(packages).values({
    name: 'Exclusive',
    price: 500000,
    features: ['Custom Design', 'Dedicated Support', 'Priority Setup']
  }).returning();

  console.log('Seeding themes...');
  await db.insert(themes).values([
    {
      id: 'aurora',
      name: 'Aurora Minimal',
      description: 'Tema minimalis dan elegan dengan grid bento',
      isActive: true,
      isCustom: false,
      packageId: freePkg.id,
    },
    {
      id: 'bloom',
      name: 'Floral Bloom',
      description: 'Tema romantis dengan hiasan bunga dan warna lembut',
      isActive: true,
      isCustom: false,
      packageId: premiumPkg.id,
    },
    {
      id: 'cinematic',
      name: 'Cinematic Film',
      description: 'Tema video layar penuh yang memukau',
      isActive: true,
      isCustom: false,
      packageId: premiumPkg.id,
    },
    {
      id: 'custom-exclusive',
      name: 'Full Custom Design',
      description: 'Tema kustom 100% dibuat khusus untuk pernikahan Anda',
      isActive: true,
      isCustom: true,
      packageId: exclusivePkg.id,
    }
  ]);
  
  console.log('Seeding complete!');
  process.exit(0);
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
