import { useState } from 'react'
import type { Photo } from '../data/types'

export default function PhotoGallery({ photos }: { photos: Photo[] }) {
  const [lightbox, setLightbox] = useState<number | null>(null)

  if (photos.length === 0) {
    return (
      <div className="text-center py-8 pixel-border border-dashed">
        <p className="text-[#c4a97d] text-sm">📷 照片采集中……</p>
        <p className="text-[#c4a97d]/60 text-xs mt-1">
          如果你有它的照片，欢迎通过 /suggest 页面分享
        </p>
      </div>
    )
  }

  const current = lightbox !== null ? photos[lightbox] : null

  return (
    <>
      {/* Gallery grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {photos.map((photo, i) => (
          <button
            key={i}
            onClick={() => setLightbox(i)}
            className="pixel-card overflow-hidden aspect-square cursor-pointer border-0 bg-transparent p-0"
          >
            <img
              src={photo.src}
              alt={photo.alt}
              className="w-full h-full object-cover hover:scale-105 transition-transform"
              loading="lazy"
            />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {current && (
        <div
          className="fixed inset-0 z-50 bg-[#1a1a2e]/95 flex flex-col items-center justify-center p-4 cursor-pointer"
          onClick={() => setLightbox(null)}
        >
          <img
            src={current.src}
            alt={current.alt}
            className="max-w-full max-h-[80vh] object-contain pixel-border"
          />
          {current.caption && (
            <p className="text-sm text-[#c4a97d] mt-3 text-center pixel-text">
              {current.caption}
            </p>
          )}
          {current.date && (
            <p className="text-xs text-[#c4a97d]/60 mt-1">{current.date}</p>
          )}
          <div className="mt-4 flex gap-4">
            <button
              onClick={(e) => {
                e.stopPropagation()
                setLightbox((prev) =>
                  prev !== null && prev > 0 ? prev - 1 : photos.length - 1
                )
              }}
              className="pixel-btn text-xs"
            >
              ◀ 上一张
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setLightbox(null)
              }}
              className="pixel-btn text-xs"
            >
              ✕ 关闭
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setLightbox((prev) =>
                  prev !== null && prev < photos.length - 1 ? prev + 1 : 0
                )
              }}
              className="pixel-btn text-xs"
            >
              下一张 ▶
            </button>
          </div>
        </div>
      )}
    </>
  )
}
