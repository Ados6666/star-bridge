import { Link } from 'react-router-dom'
import type { Animal } from '../data/types'

export default function AnimalCard({ animal }: { animal: Animal }) {
  return (
    <Link
      to={`/animal/${animal.id}`}
      className="no-underline pixel-card rounded-lg overflow-hidden flex flex-col h-full"
    >
      {/* Cover Image */}
      <div className="relative w-full aspect-[4/3] bg-[#1a1a2e] overflow-hidden">
        <img
          src={animal.coverImage}
          alt={animal.name}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={(e) => {
            // Fallback: pixel-style placeholder
            const t = e.target as HTMLImageElement
            t.style.display = 'none'
            if (t.parentElement) {
              t.parentElement.classList.add('flex', 'items-center', 'justify-center')
              t.parentElement.innerHTML = `<span style="font-size:48px">🐾</span>`
            }
          }}
        />
        {/* Type badge */}
        <span className="absolute top-2 right-2 px-2 py-0.5 text-xs bg-[#1a1a2e]/80 text-[#e8a840] border border-[#e8a840]/40">
          {animal.tags[0]}
        </span>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        <div className="flex items-baseline gap-2">
          <h3 className="text-lg text-[#e8a840] pixel-text m-0">
            {animal.name}
          </h3>
          <span className="text-xs text-[#c4a97d]">{animal.species}</span>
        </div>
        <p className="text-sm text-[#e2e8f0]/70 leading-relaxed line-clamp-2 m-0">
          {animal.introduction}
        </p>
        <div className="mt-auto pt-2 flex items-center justify-between text-xs text-[#c4a97d]">
          <span>{animal.age || animal.deathDate}</span>
          <span className="text-[#e8a840] pixel-text">
            🕯️ 缅怀 &gt;
          </span>
        </div>
      </div>
    </Link>
  )
}
