export type ProjectCategory =
  | 'Brand Identity'
  | 'Logo Design'
  | 'Web Design'
  | 'Web Development'
  | 'UI/UX'
  | 'Social Media'
  | 'Digital Experience'
  | 'Other'

export type MessageStatus = 'new' | 'read' | 'replied' | 'archived'

export interface Project {
  id: string
  title: string
  slug: string
  category: string
  client?: string | null
  year?: string | null
  services: string[]
  shortDescription?: string | null
  description?: string | null
  challenge?: string | null
  strategy?: string | null
  solution?: string | null
  outcome?: string | null
  coverImage?: string | null
  galleryImages: string[]
  projectUrl?: string | null
  featured: boolean
  published: boolean
  seoTitle?: string | null
  seoDescription?: string | null
  createdAt: Date
  updatedAt: Date
}

export interface Service {
  id: string
  title: string
  description?: string | null
  icon?: string | null
  order: number
  published: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Testimonial {
  id: string
  name: string
  role?: string | null
  company?: string | null
  avatar?: string | null
  message: string
  published: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Message {
  id: string
  name: string
  email: string
  company?: string | null
  projectType?: string | null
  budget?: string | null
  message: string
  status: MessageStatus
  createdAt: Date
  updatedAt: Date
}

export interface SiteSetting {
  id: string
  key: string
  value?: string | null
}

export interface Media {
  id: string
  url: string
  publicId?: string | null
  filename?: string | null
  size?: number | null
  type?: string | null
  createdAt: Date
}

export const PROJECT_CATEGORIES: ProjectCategory[] = [
  'Brand Identity',
  'Logo Design',
  'Web Design',
  'Web Development',
  'UI/UX',
  'Social Media',
  'Digital Experience',
  'Other',
]

export const BUDGET_RANGES = [
  'Under $500',
  '$500 - $1,000',
  '$1,000 - $2,500',
  '$2,500 - $5,000',
  '$5,000 - $10,000',
  '$10,000+',
  'Let\'s discuss',
]

export const PROJECT_TYPES = [
  'Brand Identity',
  'Logo Design',
  'Website Design',
  'Website Development',
  'Full Brand + Website',
  'Social Media Design',
  'UI/UX Design',
  'Other',
]
