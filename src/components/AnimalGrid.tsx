import type { Animal } from '../data/types'
import AnimalCard from './AnimalCard'

export default function AnimalGrid({ animals }: { animals: Animal[] }) {
  if (animals.length === 0) {
    return (
      <p className="text-center text-[#c4a97d] py-12">
        还没有小伙伴入驻星桥……
      </p>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {animals.map((animal) => (
        <AnimalCard key={animal.id} animal={animal} />
      ))}
    </div>
  )
}
