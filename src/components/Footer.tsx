import { ADMIN_NAME, ADMIN_EMAIL, SITE_NAME } from '../data/constants'

export default function Footer() {
  const footerStyle = { fontFamily: "'LXGW WenKai', sans-serif" }

  return (
    <footer className="w-full py-6 px-4 relative z-10 text-center" style={{ maxWidth: 960 }}>
      <div className="pixel-divider mb-4" />
      <p className="text-xs text-[#6088a8] mb-1" style={footerStyle}>
        {SITE_NAME} · 非商业个人项目 · 不营利、不众筹
      </p>
      <p className="text-xs text-[#6088a8] mb-1" style={footerStyle}>
        照片素材来源于公开报道，版权归原作者所有
        {' · '}
        <a href={`mailto:${ADMIN_EMAIL}`} className="text-[#7eb8da] hover:text-[#f0d080] underline">
          侵权/纠错联系
        </a>
      </p>
      <p className="text-xs text-[#486880]" style={footerStyle}>
        由 {ADMIN_NAME} 维护 · &copy; {new Date().getFullYear()}
      </p>
    </footer>
  )
}
