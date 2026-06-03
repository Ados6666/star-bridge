import { ADMIN_NAME, ADMIN_EMAIL, SITE_NAME } from '../data/constants'

export default function Footer() {
  return (
    <footer className="w-full py-6 px-4 md:px-8 relative z-10 mt-auto">
      <div className="pixel-divider mb-6" />
      <div className="max-w-5xl mx-auto text-center text-xs text-[#c4a97d] space-y-2">
        <p>
          {SITE_NAME} · 非商业个人项目 · 不营利、不众筹
        </p>
        <p>
          照片素材来源于公开报道，版权归原作者所有
          {' · '}
          <a href={`mailto:${ADMIN_EMAIL}`} className="text-[#e8a840] hover:text-[#ffcd6a] underline">
            侵权/纠错联系
          </a>
        </p>
        <p>
          由 {ADMIN_NAME} 维护 · &copy; {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  )
}
