import { Link } from 'react-router-dom'
import { ADMIN_EMAIL, ADMIN_NAME } from '../data/constants'
import { ABOUT } from '../data/content'

export default function AboutPage() {
  const sc = { fontFamily: "'LXGW WenKai', sans-serif", textAlign: 'center' as const }
  const h3s = { fontFamily: "'LXGW WenKai', sans-serif" }
  const txt = 'text-sm text-[#d0c8b8]/80 leading-relaxed'

  return (
    <div className="py-8" style={{ maxWidth: 640, margin: '0 auto' }}>
      <div style={sc} className="mb-10">
        <span className="text-5xl inline-block">{ABOUT.icon}</span>
        <h2 className="text-2xl md:text-3xl text-[#f0d080] mt-4" style={h3s}>{ABOUT.title}</h2>
      </div>

      <section className="mb-8" style={sc}>
        <h3 className="text-lg text-[#f0d080] mb-3" style={h3s}>{ABOUT.storyTitle}</h3>
        <div className={`${txt} space-y-3`}>
          <p>{ABOUT.story1}</p>
          <p>{ABOUT.story2}</p>
        </div>
      </section>

      <section className="mb-8" style={sc}>
        <h3 className="text-lg text-[#f0d080] mb-3" style={h3s}>{ABOUT.designTitle}</h3>
        <div className={`${txt} space-y-3`}>
          <p>{ABOUT.design1}</p>
          <p>{ABOUT.design2}</p>
        </div>
      </section>

      <section className="mb-8" style={sc}>
        <h3 className="text-lg text-[#f0d080] mb-3" style={h3s}>{ABOUT.thanksTitle}</h3>
        <ul className={`${txt} space-y-1 list-disc list-inside`}>
          <li>{ABOUT.thanks1}</li>
          <li>{ABOUT.thanks2}</li>
          <li>网站由 {ADMIN_NAME} 发起和维护</li>
        </ul>
      </section>

      <section className="mb-8 pixel-border p-6" style={{ textAlign: 'center' }}>
        <h3 className="text-lg text-[#f0d080] mb-3" style={h3s}>{ABOUT.contactTitle}</h3>
        <ul className={txt} style={{ listStyle: 'none', padding: 0, space: '8px' } as React.CSSProperties}>
          <li style={{ marginBottom: 8 }}>
            {ABOUT.contactSuggest}：
            <Link to="/suggest" className="text-[#e8a840] hover:text-[#ffcd6a] underline ml-1">前往建议页面</Link>
          </li>
          <li style={{ marginBottom: 8 }}>
            {ABOUT.contactInfringe}：{ABOUT.contactInfringeText}{' '}
            <a href={`mailto:${ADMIN_EMAIL}`} className="text-[#e8a840] hover:text-[#ffcd6a] underline">{ADMIN_EMAIL}</a>
            ，{ABOUT.contactResponse}
          </li>
          <li>{ABOUT.contactNonprofit}</li>
        </ul>
      </section>

      <section style={sc}>
        <h3 className="text-lg text-[#f0d080] mb-3" style={h3s}>{ABOUT.copyrightTitle}</h3>
        <div className={`${txt} space-y-2`}>
          <p>{ABOUT.copyright1}</p>
          <p>{ABOUT.copyright2}{' '}<a href={`mailto:${ADMIN_EMAIL}`} className="text-[#e8a840] hover:text-[#ffcd6a] underline">{ADMIN_EMAIL}</a>，{ABOUT.copyright3}</p>
        </div>
      </section>
    </div>
  )
}
