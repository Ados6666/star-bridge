import { useState } from 'react'
import type { Photo } from '../data/types'

const fontStyle = { fontFamily: "'LXGW WenKai', sans-serif" }

export default function PhotoGallery({ photos }: { photos: Photo[] }) {
  const [lightbox, setLightbox] = useState<number | null>(null)

  if (photos.length === 0) {
    return (
      <div className="text-center py-8 border-2 border-dashed border-[#e8a840]/20 rounded-lg">
        <p className="text-[#7eb8da] text-sm" style={fontStyle}>📷 照片采集中……</p>
        <p className="text-[#486880] text-xs mt-1" style={fontStyle}>
          如果你有它的照片，欢迎通过 /suggest 页面分享
        </p>
      </div>
    )
  }

  const current = lightbox !== null ? photos[lightbox] : null

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {photos.map((photo, i) => (
          <button
            key={i}
            onClick={() => setLightbox(i)}
            className="photo-frame cursor-pointer bg-transparent p-0 border-0"
          >
            <img src={photo.src} alt={photo.alt} className="w-full h-full object-cover hover:scale-105 transition-transform" loading="lazy" />
          </button>
        ))}
      </div>

      {current && (
        <div className="fixed inset-0 z-50 bg-[#060d1a]/95 flex flex-col items-center justify-center p-4 cursor-pointer" onClick={() => setLightbox(null)}>
          <img src={current.src} alt={current.alt} className="max-w-full max-h-[80vh] object-contain pixel-border" />
          {current.caption && <p className="text-sm text-[#7eb8da] mt-3 text-center" style={fontStyle}>{current.caption}</p>}
          <div className="mt-4 flex gap-4">
            <button onClick={(e) => { e.stopPropagation(); setLightbox((p) => p !== null && p > 0 ? p - 1 : photos.length - 1) }} className="pixel-btn text-xs">◀ 上一张</button>
            <button onClick={(e) => { e.stopPropagation(); setLightbox(null) }} className="pixel-btn text-xs">✕ 关闭</button>
            <button onClick={(e) => { e.stopPropagation(); setLightbox((p) => p !== null && p < photos.length - 1 ? p + 1 : 0) }} className="pixel-btn text-xs">下一张 ▶</button>
          </div>
        </div>
      )}
    </>
  )
}
