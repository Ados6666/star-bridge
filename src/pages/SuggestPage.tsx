import { useState, type FormEvent } from 'react'
import { WEB3FORMS_KEY, ADMIN_EMAIL } from '../data/constants'

export default function SuggestPage() {
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')

    if (WEB3FORMS_KEY === 'YOUR_WEB3FORMS_ACCESS_KEY') {
      setError('⚠️ 表单尚未配置 Web3Forms Access Key，请先获取 Key 后再使用。')
      return
    }

    setLoading(true)
    const form = e.currentTarget
    const data = new FormData(form)

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data,
      })
      const json = await res.json()
      if (json.success) {
        setSubmitted(true)
      } else {
        setError('提交失败，请稍后再试。如果持续失败，可以直接发送邮件至 ' + ADMIN_EMAIL)
      }
    } catch {
      setError('网络错误，请稍后再试。')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="py-20" style={{ textAlign: 'center', maxWidth: 480, margin: '0 auto' }}>
        <span className="text-5xl inline-block">✨</span>
        <h2 className="text-2xl text-[#f0d080] mt-4 mb-2" style={{ fontFamily: "'LXGW WenKai', sans-serif" }}>
          感谢你的建议！
        </h2>
        <p className="text-sm text-[#c0a870] mb-6 leading-relaxed" style={{ fontFamily: "'LXGW WenKai', sans-serif" }}>
          我们已经收到了你的提交。每一份建议都会被认真对待——
          也许下一个来到星桥的小伙伴，就来自你的推荐。
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="pixel-btn text-sm"
        >
          继续提交
        </button>
      </div>
    )
  }

  return (
    <div className="py-8" style={{ maxWidth: 560, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ textAlign: 'center' }} className="mb-8">
        <span className="text-4xl inline-block">💡</span>
        <h2 className="text-2xl text-[#f0d080] mt-4 mb-2" style={{ fontFamily: "'LXGW WenKai', sans-serif" }}>
          建议新增动物
        </h2>
        <p className="text-sm text-[#c0a870] leading-relaxed" style={{ fontFamily: "'LXGW WenKai', sans-serif" }}>
          你觉得还有哪些离开的小动物值得被记住？
          <br />
          请告诉我们，我们会认真评估每一条建议。
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Web3Forms hidden fields */}
        <input type="hidden" name="access_key" value={WEB3FORMS_KEY} />
        <input type="hidden" name="subject" value="星桥 - 新增动物建议" />
        <input type="hidden" name="from_name" value="星桥" />
        <input type="checkbox" name="botcheck" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

        {/* 动物名称 */}
        <div>
          <label className="block text-sm text-[#e8a840] mb-1.5 pixel-text">
            动物名称 <span className="text-[#ff6b6b]">*</span>
          </label>
          <input
            type="text"
            name="animal_name"
            required
            placeholder="例如：大壮"
            className="w-full px-4 py-2.5 bg-[#1a1a2e]/80 border-2 border-[#e8a840]/30 text-[#e2e8f0] text-sm placeholder-[#c4a97d]/40 focus:border-[#e8a840] focus:outline-none"
          />
        </div>

        {/* 物种 */}
        <div>
          <label className="block text-sm text-[#e8a840] mb-1.5 pixel-text">
            物种 / 类型
          </label>
          <input
            type="text"
            name="species"
            placeholder="例如：橘猫、大熊猫、黑帽悬猴"
            className="w-full px-4 py-2.5 bg-[#1a1a2e]/80 border-2 border-[#e8a840]/30 text-[#e2e8f0] text-sm placeholder-[#c4a97d]/40 focus:border-[#e8a840] focus:outline-none"
          />
        </div>

        {/* 建议理由 */}
        <div>
          <label className="block text-sm text-[#e8a840] mb-1.5 pixel-text">
            建议理由 / 走红故事 <span className="text-[#ff6b6b]">*</span>
          </label>
          <textarea
            name="reason"
            required
            rows={4}
            placeholder="请简要说说这只动物的故事、为什么它值得被记住……"
            className="w-full px-4 py-2.5 bg-[#1a1a2e]/80 border-2 border-[#e8a840]/30 text-[#e2e8f0] text-sm placeholder-[#c4a97d]/40 focus:border-[#e8a840] focus:outline-none resize-y"
          />
        </div>

        {/* 信息来源 */}
        <div>
          <label className="block text-sm text-[#e8a840] mb-1.5 pixel-text">
            信息来源链接
          </label>
          <input
            type="url"
            name="source_url"
            placeholder="新闻报道、视频链接等（可选）"
            className="w-full px-4 py-2.5 bg-[#1a1a2e]/80 border-2 border-[#e8a840]/30 text-[#e2e8f0] text-sm placeholder-[#c4a97d]/40 focus:border-[#e8a840] focus:outline-none"
          />
        </div>

        {/* 昵称 */}
        <div>
          <label className="block text-sm text-[#e8a840] mb-1.5 pixel-text">
            你的昵称 <span className="text-[#c4a97d]/60 text-xs">（选填）</span>
          </label>
          <input
            type="text"
            name="nickname"
            placeholder="怎么称呼你？"
            className="w-full px-4 py-2.5 bg-[#1a1a2e]/80 border-2 border-[#e8a840]/30 text-[#e2e8f0] text-sm placeholder-[#c4a97d]/40 focus:border-[#e8a840] focus:outline-none"
          />
        </div>

        {/* 邮箱 */}
        <div>
          <label className="block text-sm text-[#e8a840] mb-1.5 pixel-text">
            你的邮箱 <span className="text-[#c4a97d]/60 text-xs">（选填，用于回复）</span>
          </label>
          <input
            type="email"
            name="email"
            placeholder="如需回复请留下邮箱"
            className="w-full px-4 py-2.5 bg-[#1a1a2e]/80 border-2 border-[#e8a840]/30 text-[#e2e8f0] text-sm placeholder-[#c4a97d]/40 focus:border-[#e8a840] focus:outline-none"
          />
        </div>

        {/* Error */}
        {error && (
          <div className="p-3 border border-[#ff6b6b]/50 bg-[#ff6b6b]/10 text-sm text-[#ff6b6b]">
            {error}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="pixel-btn w-full text-sm py-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? '提交中……' : '✨ 提交建议'}
        </button>
      </form>

      {/* Privacy notice */}
      <div className="mt-8 p-4 border border-[#e8a840]/20 bg-[#1a1a2e]/50 text-xs text-[#c4a97d]/70 leading-relaxed">
        <p className="mb-1"><strong className="text-[#c4a97d]">🔒 隐私声明</strong></p>
        <p>
          你提交的信息仅用于网站内容更新参考。昵称和邮箱为非必填项。
          我们不会公开你的提交内容，不会将信息用于任何商业用途，也不会分享给第三方。
          提交即表示你同意我们基于你提供的信息进行内容更新。
        </p>
        <p className="mt-2">
          如需撤回建议或删除已提交的信息，请发送邮件至{' '}
          <a href={`mailto:${ADMIN_EMAIL}`} className="text-[#e8a840] hover:text-[#ffcd6a] underline">
            {ADMIN_EMAIL}
          </a>
          ，我们将在 48 小时内处理。本表单使用 Web3Forms 作为邮件转发服务。
        </p>
      </div>
    </div>
  )
}
