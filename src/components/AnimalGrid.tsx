import type { Animal } from '../data/types'
import AnimalCard from './AnimalCard'

export default function AnimalGrid({ animals }: { animals: Animal[] }) {
  if (animals.length === 0) {
    return (
      <p className="text-center text-[#7eb8da] py-12" style={{ fontFamily: "'LXGW WenKai', sans-serif" }}>
        还没有小伙伴入驻星桥……
      </p>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 justify-center">
      {animals.map((animal) => (
        <AnimalCard key={animal.id} animal={animal} />
      ))}
    </div>
  )
}
