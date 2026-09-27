import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const email = process.env.ADMIN_EMAIL || 'admin@e-digitals.com'
  const password = process.env.ADMIN_PASSWORD || 'admin123456'
  const name = process.env.ADMIN_NAME || 'E-DIGITALS Admin'

  const hashedPassword = await bcrypt.hash(password, 12)

  const user = await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      password: hashedPassword,
      name,
      role: 'admin',
    },
  })

  console.log('Admin user created:', user.email)

  // Seed default services
  const services = [
    {
      title: 'Brand Identity',
      description: 'Strategic visual identities designed to make brands recognizable, memorable and consistent across every touchpoint.',
      icon: 'Palette',
      order: 1,
    },
    {
      title: 'Web Design',
      description: 'Modern interfaces designed around usability, clarity and conversion. Every pixel is intentional.',
      icon: 'Monitor',
      order: 2,
    },
    {
      title: 'Web Development',
      description: 'Fast, responsive and scalable websites and web applications built with modern technologies.',
      icon: 'Code',
      order: 3,
    },
    {
      title: 'Digital Branding',
      description: 'Complete digital systems connecting visual identity with online presence for a cohesive brand experience.',
      icon: 'Globe',
      order: 4,
    },
  ]

  for (const service of services) {
    await prisma.service.upsert({
      where: { id: service.title },
      update: {},
      create: { ...service, published: true },
    })
  }

  console.log('Default services created.')

  // Seed default site settings
  const settings = [
    { key: 'brand_name', value: 'E-DIGITALS' },
    { key: 'tagline', value: 'Brand Identity Designer • Web Developer' },
    { key: 'email', value: 'hello@e-digitals.com' },
    { key: 'phone', value: '' },
    { key: 'whatsapp', value: '' },
    { key: 'location', value: 'Nigeria' },
    { key: 'instagram', value: '' },
    { key: 'linkedin', value: '' },
    { key: 'behance', value: '' },
    { key: 'github', value: '' },
    { key: 'default_seo_title', value: 'E-DIGITALS — Brand Identity Designer & Web Developer' },
    { key: 'default_seo_description', value: 'Brand identity designer and web developer creating distinctive visual identities, modern websites and digital experiences for ambitious businesses.' },
    { key: 'availability', value: 'available' },
  ]

  for (const setting of settings) {
    await prisma.siteSetting.upsert({
      where: { key: setting.key },
      update: {},
      create: setting,
    })
  }

  console.log('Default settings created.')

  // Seed demo projects
  const projects = [
    {
      title: 'Nova',
      slug: 'nova-luxury-fashion-brand',
      category: 'Brand Identity',
      client: 'Demo Client',
      year: '2024',
      services: ['Brand Identity', 'Logo Design', 'Style Guide'],
      shortDescription: 'A luxury fashion brand identity built around elegance, restraint and timeless appeal.',
      description: 'Nova required a complete visual identity system that could communicate luxury without being loud. The result is a refined typographic mark supported by a monochromatic palette and editorial visual language.',
      challenge: 'Create a brand identity that positions Nova in the luxury fashion space without relying on clichéd luxury visual tropes.',
      strategy: 'Research into luxury fashion houses revealed that the most enduring brands communicate exclusivity through restraint rather than excess. We built the identity around negative space and typography.',
      solution: 'A custom logotype using a modified serif typeface, paired with a strict monochromatic palette of off-white and deep charcoal. The supporting design system includes editorial layouts and refined typography guidelines.',
      outcome: 'Nova launched with a strong brand identity that positioned them clearly in the premium fashion market.',
      featured: true,
      published: true,
    },
    {
      title: 'Vanta',
      slug: 'vanta-technology-brand',
      category: 'Web Development',
      client: 'Demo Client',
      year: '2024',
      services: ['Brand Identity', 'Web Design', 'Web Development'],
      shortDescription: 'A technology brand and website built for a B2B SaaS company entering a competitive market.',
      description: 'Vanta needed to establish credibility and trust while differentiating from competitors in a crowded technology market.',
      challenge: 'Stand out in a saturated B2B technology market while communicating trustworthiness and technical capability.',
      strategy: 'Position Vanta as the intelligent, calm alternative to noisy competitors. Use precision and clarity as design values.',
      solution: 'A dark-mode first brand system with electric blue accents. Clean information architecture and a website optimized for conversion.',
      outcome: 'The new brand and website contributed to a significant increase in qualified lead generation within the first quarter.',
      featured: true,
      published: true,
    },
    {
      title: 'Lumé',
      slug: 'lume-beauty-brand',
      category: 'Brand Identity',
      client: 'Demo Client',
      year: '2024',
      services: ['Brand Identity', 'Packaging Design', 'Social Media'],
      shortDescription: 'A clean beauty brand identity designed around purity, transparency and natural elegance.',
      description: 'Lumé is a clean beauty brand that needed an identity reflecting its commitment to natural ingredients and sustainable practices.',
      challenge: 'Create a brand that communicates clean beauty authentically without falling into generic "natural" design clichés.',
      strategy: 'Build the identity around the concept of light and clarity — reflecting both the product philosophy and the brand name.',
      solution: 'A soft, luminous visual identity using warm whites, sage green and gold. Custom typography and organic shapes create a premium yet approachable aesthetic.',
      outcome: 'Lumé successfully launched across retail and e-commerce with a cohesive brand presence.',
      featured: false,
      published: true,
    },
    {
      title: 'Kora',
      slug: 'kora-restaurant-brand',
      category: 'Digital Experience',
      client: 'Demo Client',
      year: '2024',
      services: ['Brand Identity', 'Web Design', 'Web Development', 'Menu Design'],
      shortDescription: 'A restaurant brand and digital experience celebrating West African cuisine and culture.',
      description: 'Kora needed a brand identity and website that could celebrate West African culinary heritage while appealing to a modern, international dining audience.',
      challenge: 'Authentically represent West African culture in a way that feels contemporary and premium rather than folksy or clichéd.',
      strategy: 'Root the visual language in traditional West African textile patterns and colour while translating them through a modern design lens.',
      solution: 'A warm, bold identity using terracotta, gold and deep green. The website combines editorial food photography with cultural storytelling.',
      outcome: 'Kora opened to strong reviews and their online reservation system drove significant booking volume from launch.',
      featured: false,
      published: true,
    },
  ]

  for (const project of projects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: {},
      create: project,
    })
  }

  console.log('Demo projects created.')
  console.log('\n✅ Seed complete.')
  console.log('Admin email:', email)
  console.log('Admin password:', password)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
