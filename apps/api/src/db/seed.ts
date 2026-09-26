import { db } from './index.js';
import { packages, themes } from './schema.js';
import { seedDemoData } from '../server/seed.js';

export async function runDatabaseSeed() {
  console.log('----------------------------------------------------');
  console.log('🌱 KisahMagis — Inisialisasi & Seeding Database...');
  console.log('----------------------------------------------------');

  try {
    // 1. Seed Packages
    console.log('📦 Memeriksa paket tema (packages)...');
    let existingPackages = await db.select().from(packages);

    if (existingPackages.length === 0) {
      console.log('   Menambahkan paket Free, Premium, & Exclusive...');
      const [freePkg] = await db.insert(packages).values({
        name: 'Free',
        price: 0,
        features: ['Basic UI', '1 Gallery Photo', 'No Custom Domain'],
      }).returning();

      const [premiumPkg] = await db.insert(packages).values({
        name: 'Premium',
        price: 150000,
        features: ['Advanced UI', 'Unlimited Gallery', 'Custom Domain'],
      }).returning();

      const [exclusivePkg] = await db.insert(packages).values({
        name: 'Exclusive',
        price: 500000,
        features: ['Custom Design', 'Dedicated Support', 'Priority Setup'],
      }).returning();

      existingPackages = [freePkg, premiumPkg, exclusivePkg];
    } else {
      console.log(`   ${existingPackages.length} paket telah terdaftar.`);
    }

    const freePkg = existingPackages.find(p => p.name === 'Free') || existingPackages[0];
    const premiumPkg = existingPackages.find(p => p.name === 'Premium') || existingPackages[0];
    const exclusivePkg = existingPackages.find(p => p.name === 'Exclusive') || existingPackages[0];

    // 2. Seed Themes
    console.log('🎨 Memeriksa katalog tema (themes)...');
    const existingThemes = await db.select().from(themes);
    const themeList = [
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
      },
    ];

    for (const t of themeList) {
      const found = existingThemes.find(et => et.id === t.id);
      if (!found) {
        console.log(`   Menambahkan tema: ${t.name} (${t.id})...`);
        await db.insert(themes).values(t);
      }
    }

    // 3. Seed Demo Data (forceReset = true to ensure fresh consistent state)
    console.log('💍 Memasukkan data demo pernikahan (Users, Weddings, Guests, Planner, Budget, Vendors)...');
    const { user, wedding } = await seedDemoData(true);

    console.log('----------------------------------------------------');
    console.log('✅ Seeding Selesai dengan Sukses!');
    console.log('----------------------------------------------------');
    console.log(`👤 Pengguna Demo : ${user.email}`);
    console.log(`🔑 Kata Sandi    : password123`);
    console.log(`💒 Pernikahan    : ${wedding.title} (Slug: ${wedding.slug})`);
    console.log(`🌐 Dashboard URL : http://localhost:3000/dashboard`);
    console.log(`💌 Undangan URL  : http://localhost:3000/?wedding=${wedding.slug}`);
    console.log('----------------------------------------------------');

    process.exit(0);
  } catch (error) {
    console.error('❌ Gagal menjalankan seeding database:', error);
    process.exit(1);
  }
}

// Auto-run when executed directly via CLI
runDatabaseSeed();
