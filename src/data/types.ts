export interface Photo {
  src: string
  alt: string
  caption?: string
  date?: string
}

export interface TimelineEvent {
  date: string
  title: string
  description?: string
  type: 'birth' | 'milestone' | 'fame' | 'memory' | 'farewell'
}

export interface Animal {
  id: string
  name: string
  species: string
  tags: string[]
  birthDate?: string
  deathDate: string
  age?: string
  coverImage: string
  photos: Photo[]
  introduction: string
  story: string
  funFacts: string[]
  timeline: TimelineEvent[]
  source: string
  sourceUrl?: string
}
