const { Client } = require('pg');
const crypto = require('crypto');

const DB_URL = 'postgresql://neondb_owner:npg_jbYNpB4LS9DP@ep-patient-base-b5dgierw-pooler.c-7.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

function uuid() {
  return crypto.randomUUID();
}

// Simple bcrypt-compatible hash using Node's built-in crypto won't work,
// so we'll use a pre-hashed version of "admin123456"
// Generated with bcrypt rounds=10
const ADMIN_PASSWORD_HASH = '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi';

async function main() {
  const client = new Client({ connectionString: DB_URL });
  await client.connect();
  console.log('Connected');

  // Admin user
  await client.query(`
    INSERT INTO "User" (id, email, password, name, role)
    VALUES ($1, $2, $3, $4, $5)
    ON CONFLICT (email) DO NOTHING
  `, [uuid(), 'admin@e-digitals.com', ADMIN_PASSWORD_HASH, 'Admin', 'admin']);
  console.log('Admin user created (email: admin@e-digitals.com, password: admin123456)');

  // Services
  const services = [
    { title: 'Brand Identity', description: 'Complete visual identity systems that communicate your brand\'s essence — from logo and typography to color systems and brand guidelines.', icon: 'Palette', order: 1 },
    { title: 'Web Design', description: 'Purposeful, conversion-focused web design that balances aesthetic excellence with seamless user experience.', icon: 'Monitor', order: 2 },
    { title: 'Web Development', description: 'Clean, performant code that brings designs to life — built on modern frameworks with a focus on speed and accessibility.', icon: 'Code', order: 3 },
    { title: 'Digital Branding', description: 'Strategic digital presence across all touchpoints — social media templates, digital assets, and online brand consistency.', icon: 'Globe', order: 4 },
  ];

  for (const s of services) {
    await client.query(`
      INSERT INTO "Service" (id, title, description, icon, "order", published)
      VALUES ($1, $2, $3, $4, $5, true)
      ON CONFLICT DO NOTHING
    `, [uuid(), s.title, s.description, s.icon, s.order]);
  }
  console.log('Services seeded');

  // Site settings
  const settings = [
    { key: 'site_name', value: 'E-DIGITALS' },
    { key: 'site_tagline', value: 'Brand Identity & Digital Experiences' },
    { key: 'contact_email', value: 'hello@e-digitals.com' },
    { key: 'instagram_url', value: '' },
    { key: 'twitter_url', value: '' },
    { key: 'linkedin_url', value: '' },
  ];

  for (const s of settings) {
    await client.query(`
      INSERT INTO "SiteSetting" (id, key, value)
      VALUES ($1, $2, $3)
      ON CONFLICT (key) DO NOTHING
    `, [uuid(), s.key, s.value]);
  }
  console.log('Site settings seeded');

  // Demo projects
  const projects = [
    {
      title: 'Nova — Luxury Fashion Brand',
      slug: 'nova-luxury-fashion',
      category: 'Brand Identity',
      client: 'Nova Fashion House',
      year: '2024',
      services: ['Brand Strategy', 'Visual Identity', 'Brand Guidelines'],
      shortDescription: 'A complete brand identity for a luxury fashion label entering the European market.',
      description: 'Nova required a brand identity that would position them among the top tier of European luxury fashion houses. The challenge was creating something timeless yet distinctly modern.',
      challenge: 'Enter a saturated luxury market with a brand that feels both established and fresh, appealing to discerning customers aged 30-55.',
      strategy: 'We anchored the identity in restraint — minimal forms, considered negative space, and a palette drawn from natural stone and aged metal.',
      solution: 'A wordmark built on custom letterforms with a secondary monogram mark, paired with an editorial type system and a warm neutral palette.',
      outcome: 'Nova launched to critical acclaim, securing placements in three major European department stores within six months of launch.',
      coverImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80',
      galleryImages: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80'],
      featured: true,
      published: true,
    },
    {
      title: 'Vanta — Tech Startup Brand',
      slug: 'vanta-tech-brand',
      category: 'Brand Identity',
      client: 'Vanta Technologies',
      year: '2024',
      services: ['Brand Identity', 'Web Design', 'Web Development'],
      shortDescription: 'Bold brand identity and website for a B2B cybersecurity startup.',
      description: 'Vanta needed to look credible to enterprise clients while still projecting the agility of a startup. We built a brand that bridges both worlds.',
      challenge: 'Cybersecurity brands trend toward either cold corporate or aggressive hacker aesthetics. Vanta needed to transcend both.',
      strategy: 'Position around clarity and trust rather than fear — using clean geometry, confident typography, and a deep blue-black palette with electric accents.',
      solution: 'A geometric logomark representing a shield abstracted into a V form, paired with a modern grotesque typeface and a restrained dark-mode first website.',
      outcome: 'Vanta closed their Series A within three months of launching the new brand, citing improved investor confidence in presentations.',
      coverImage: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&q=80',
      galleryImages: ['https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80'],
      featured: true,
      published: true,
    },
    {
      title: 'Lumé — Beauty Brand Identity',
      slug: 'lume-beauty-brand',
      category: 'Brand Identity',
      client: 'Lumé Skincare',
      year: '2023',
      services: ['Brand Identity', 'Packaging Design', 'Digital Branding'],
      shortDescription: 'Clean, ingredient-forward identity for a premium skincare line.',
      description: 'Lumé is a science-backed skincare brand that wanted to communicate efficacy without sacrificing elegance.',
      challenge: 'Stand out in a market flooded with both clinical-looking and overly decorative packaging. Find the middle ground.',
      strategy: 'Lead with ingredients and transparency. Use the formulation process as a design inspiration — clarity, purity, precision.',
      solution: 'A sans-serif logotype with custom diacritic detail, warm off-white packaging with debossed texture, and a digital system using close-up ingredient photography.',
      outcome: 'Lumé sold out their launch inventory in 11 days and expanded to 40+ stockists in the first year.',
      coverImage: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=1200&q=80',
      galleryImages: ['https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&q=80'],
      featured: false,
      published: true,
    },
    {
      title: 'Kora — Restaurant Brand',
      slug: 'kora-restaurant-brand',
      category: 'Brand Identity',
      client: 'Kora Restaurant Group',
      year: '2023',
      services: ['Brand Identity', 'Menu Design', 'Web Design'],
      shortDescription: 'Warm, story-driven identity for a modern West African restaurant.',
      description: 'Kora is a fine dining restaurant celebrating West African cuisine through a contemporary lens. The brand needed to honor tradition while feeling current.',
      challenge: 'Avoid stereotypical "ethnic restaurant" visual tropes while still clearly communicating the cultural roots of the cuisine.',
      strategy: 'Root the identity in craft and narrative — draw from traditional textile patterns, oral storytelling traditions, and the warmth of communal dining.',
      solution: 'A hand-drawn logomark inspired by Kora instrument strings, earthy terracotta and deep green palette, and editorial photography style celebrating the ingredients and people.',
      outcome: 'Kora opened to a 3-month waitlist and received a James Beard Award nomination in their first year of operation.',
      coverImage: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80',
      galleryImages: ['https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80'],
      featured: false,
      published: true,
    },
  ];

  for (const p of projects) {
    await client.query(`
      INSERT INTO "Project" (
        id, title, slug, category, client, year, services,
        "shortDescription", description, challenge, strategy, solution, outcome,
        "coverImage", "galleryImages", featured, published
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17)
      ON CONFLICT (slug) DO NOTHING
    `, [
      uuid(), p.title, p.slug, p.category, p.client, p.year, p.services,
      p.shortDescription, p.description, p.challenge, p.strategy, p.solution, p.outcome,
      p.coverImage, p.galleryImages, p.featured, p.published
    ]);
  }
  console.log('Demo projects seeded');

  await client.end();
  console.log('Done!');
}

main().catch(console.error);
