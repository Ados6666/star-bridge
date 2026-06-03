import type { TimelineEvent } from '../data/types'

const TYPE_ICONS: Record<TimelineEvent['type'], string> = {
  birth: '🌟', milestone: '📍', fame: '⭐', memory: '💛', farewell: '🕯️',
}

const fontStyle = { fontFamily: "'LXGW WenKai', sans-serif" }

export default function Timeline({ events }: { events: TimelineEvent[] }) {
  return (
    <div className="relative pl-6">
      <div className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-[#e8a840]/20" />
      <div className="space-y-5">
        {events.map((event, i) => (
          <div key={i} className="relative">
            <div
              className={`absolute left-[-18px] top-1.5 w-[10px] h-[10px] border-2 border-[#e8a840] bg-[#0b1a30]`}
              style={{ borderRadius: '50%' }}
            />
            <div className="ml-2">
              <span className="text-xs text-[#6088a8]" style={fontStyle}>
                {TYPE_ICONS[event.type]} {event.date}
              </span>
              <h4 className="text-sm text-[#dce6f0] mt-0.5 mb-0" style={fontStyle}>
                {event.title}
              </h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
