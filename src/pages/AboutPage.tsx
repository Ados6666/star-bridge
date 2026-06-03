import { Link } from 'react-router-dom'
import { ADMIN_EMAIL, ADMIN_NAME, SITE_NAME } from '../data/constants'

export default function AboutPage() {
  return (
    <div className="py-8 max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center mb-10">
        <span className="text-5xl pixel-text">🌉</span>
        <h2 className="text-2xl md:text-3xl text-[#e8a840] pixel-text mt-4">
          关于{ SITE_NAME }
        </h2>
      </div>

      {/* 项目缘起 */}
      <section className="mb-8">
        <h3 className="text-lg text-[#e8a840] pixel-text mb-3">📖 项目缘起</h3>
        <div className="text-sm text-[#e2e8f0]/80 leading-relaxed space-y-3">
          <p>
            2022 年到 2025 年间，许多陪伴我们日常的小动物陆续离开了。
            它们有的在动物园里治愈过无数游客，有的在主人镜头下温暖了数百万网友，
            有的因一个表情、一张照片被大家记住。
          </p>
          <p>
            它们来过，被爱过，也留下过痕迹。{SITE_NAME}是这些痕迹的归处——
            一个安静、温暖的地方，让我们记得它们曾经在。
          </p>
        </div>
      </section>

      {/* 设计理念 */}
      <section className="mb-8">
        <h3 className="text-lg text-[#e8a840] pixel-text mb-3">🎨 设计理念</h3>
        <div className="text-sm text-[#e2e8f0]/80 leading-relaxed space-y-3">
          <p>
            <strong className="text-[#e8a840]">星桥</strong>是一个隐喻：
            动物们没有消失，只是走过了一座发光的桥，去往属于它们的星球。
            每当你点亮一支蜡烛，夜空就多了一颗星。
          </p>
          <p>
            我们希望这里的氛围是「怀念」而非「悲伤」，「感谢」而非「哀悼」。
            因此在设计上选择了像素田园风格 + 星空背景——像深夜在农场抬头看星星时的那份宁静与温暖。
          </p>
        </div>
      </section>

      {/* 致谢 */}
      <section className="mb-8">
        <h3 className="text-lg text-[#e8a840] pixel-text mb-3">🙏 致谢</h3>
        <ul className="text-sm text-[#e2e8f0]/80 space-y-1 list-disc list-inside">
          <li>照片和故事素材来源于公开新闻报道、动物园官方公告及动物主人的公开分享</li>
          <li>设计灵感参考：Stardew Valley、Pet Stellar、Blessed Bridge、Crossing Template</li>
          <li>网站由 {ADMIN_NAME} 发起和维护</li>
        </ul>
      </section>

      {/* 联系方式 */}
      <section className="mb-8 pixel-border p-6">
        <h3 className="text-lg text-[#e8a840] pixel-text mb-3">📬 联系方式</h3>
        <ul className="text-sm text-[#e2e8f0]/80 space-y-2 list-none p-0">
          <li>
            💡 <strong className="text-[#e8a840]">建议新增动物</strong>：
            <Link to="/suggest" className="text-[#e8a840] hover:text-[#ffcd6a] underline ml-1">
              前往建议页面
            </Link>
          </li>
          <li>
            ⚠️ <strong className="text-[#e8a840]">侵权/纠错</strong>：
            如您是照片权利人或发现信息有误，请发邮件至{' '}
            <a href={`mailto:${ADMIN_EMAIL}`} className="text-[#e8a840] hover:text-[#ffcd6a] underline">
              {ADMIN_EMAIL}
            </a>
            ，我们会在 48 小时内处理。
          </li>
          <li>
            🔗 本网站为非商业个人项目，不营利、不众筹、不接受捐赠。
          </li>
        </ul>
      </section>

      {/* 版权声明 */}
      <section>
        <h3 className="text-lg text-[#e8a840] pixel-text mb-3">⚖️ 版权声明</h3>
        <div className="text-sm text-[#e2e8f0]/80 leading-relaxed space-y-2">
          <p>
            本网站使用的动物照片均来源于公开新闻报道、动物园/机构官方公告及动物主人的公开分享。
            我们尽可能在每只动物的详情页注明信息来源。
          </p>
          <p>
            如果您是照片的权利人，认为本网站对您作品的使用超出了合理引用范围，
            请发送邮件至{' '}
            <a href={`mailto:${ADMIN_EMAIL}`} className="text-[#e8a840] hover:text-[#ffcd6a] underline">
              {ADMIN_EMAIL}
            </a>
            ，我们承诺在 48 小时内响应并处理。
          </p>
        </div>
      </section>
    </div>
  )
}
