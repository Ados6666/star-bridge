import type { TimelineEvent } from '../data/types'

const TYPE_ICONS: Record<TimelineEvent['type'], string> = {
  birth: '🌟',
  milestone: '📍',
  fame: '⭐',
  memory: '💛',
  farewell: '🕯️',
}

export default function Timeline({ events }: { events: TimelineEvent[] }) {
  return (
    <div className="relative pl-6">
      {/* Vertical line */}
      <div className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-[#e8a840]/30" />

      <div className="space-y-6">
        {events.map((event, i) => (
          <div key={i} className="relative">
            {/* Dot */}
            <div
              className={`absolute left-[-18px] top-1.5 w-[10px] h-[10px] border-2 border-[#e8a840] bg-[#1a1a2e] ${
                event.type === 'farewell' ? 'bg-[#ffcd6a] border-[#ffcd6a]' : ''
              }`}
            />

            <div className="ml-2">
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#c4a97d] font-mono">
                  {event.date}
                </span>
                <span className="text-xs" title={event.type}>
                  {TYPE_ICONS[event.type]}
                </span>
              </div>
              <h4 className="text-sm text-[#e2e8f0] mt-0.5 mb-0 pixel-text">
                {event.title}
              </h4>
              {event.description && (
                <p className="text-xs text-[#c4a97d] mt-1 m-0">
                  {event.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
