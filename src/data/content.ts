// ========================================
// 星桥 · 所有页面文案集中管理
// 直接编辑这个文件 → 我帮你重新部署
// ========================================

// ===== 首页 =====
export const HOME = {
  heroStar: '⭐',
  title: '星桥',
  subtitle: '记住那些温暖过我们人生的伙伴',
  description: '它们来过、被爱过、留下过痕迹。这里是它们的星之归处——一座连接人间与动物星球的温暖桥梁。',
  gridTitle: '🕯️ 星桥上的小伙伴们',
  footerQuote: '「它们没有消失，只是走过了那座星光之桥。每当有人点亮烛光，夜空就多了一颗星。」',
}

// ===== 卡片 =====
export const CARD = {
  candleCountText: (n: number) => `点亮蜡烛的小伙伴：${n}人`,
}

// ===== 详情页 =====
export const DETAIL = {
  backToHome: '← 回到星桥',
  notFoundTitle: '这个小伙伴还没来到星桥',
  notFoundDesc: '也许它正在路上，请再等等……',
  birthLabel: '🌟 来到这个世界',
  deathLabel: '🕯️ 回到动物星球',
  sourceLabel: '信息来源：',
  viewOriginal: '[查看原文]',
  funFactsTitle: '💛 趣事',
  timelineTitle: '⏳ 生命旅程',
  photoTitle: '📷 影像记忆',
  photoEmpty: '📷 照片采集中……',
  photoEmptyHint: '如果你有它的照片，欢迎通过 /suggest 页面分享',
  prevPhoto: '◀ 上一张',
  closePhoto: '✕ 关闭',
  nextPhoto: '下一张 ▶',
}

// ===== 关于页 =====
export const ABOUT = {
  icon: '🌉',
  title: '关于星桥',
  storyTitle: '📖 项目缘起',
  story1: '2022 年到 2025 年间，许多陪伴我们日常的小动物陆续离开了。它们有的在动物园里治愈过无数游客，有的在主人镜头下温暖了数百万网友，有的因一个表情、一张照片被大家记住。',
  story2: '它们来过，被爱过，也留下过痕迹。星桥是这些痕迹的归处——一个安静、温暖的地方，让我们记得它们曾经在。',
  designTitle: '🎨 设计理念',
  design1: '星桥是一个隐喻：动物们没有消失，只是走过了一座发光的桥，去往属于它们的星球。每当你点亮一支蜡烛，夜空就多了一颗星。',
  design2: '我们希望这里的氛围是「怀念」而非「悲伤」，「感谢」而非「哀悼」。因此在设计上选择了手绘星空风格——像深夜抬头看星星时的那份宁静与温暖。',
  thanksTitle: '🙏 致谢',
  thanks1: '照片和故事素材来源于公开新闻报道、动物园官方公告及动物主人的公开分享',
  thanks2: '设计灵感参考：Stardew Valley、Pet Stellar、Crossing Template',
  contactTitle: '📬 联系方式',
  contactSuggest: '💡 建议新增动物',
  contactInfringe: '⚠️ 侵权/纠错',
  contactInfringeText: '请发邮件至',
  contactResponse: '我们会在 48 小时内处理。',
  contactNonprofit: '🔗 本网站为非商业个人项目，不营利、不众筹、不接受捐赠。',
  copyrightTitle: '⚖️ 版权声明',
  copyright1: '本网站使用的动物照片均来源于公开新闻报道、动物园/机构官方公告及动物主人的公开分享。我们尽可能在每只动物的详情页注明信息来源。',
  copyright2: '如果您是照片的权利人，认为本网站对您作品的使用超出了合理引用范围，请发送邮件至',
  copyright3: '我们承诺在 48 小时内响应并处理。',
}

// ===== 建议页 =====
export const SUGGEST = {
  icon: '💡',
  title: '建议新增动物',
  intro: '你觉得还有哪些离开的小动物值得被记住？请告诉我们，我们会认真评估每一条建议。',
  labelName: '动物名称',
  labelSpecies: '物种 / 类型',
  labelReason: '建议理由 / 走红故事',
  labelSource: '信息来源链接',
  labelNickname: '你的昵称',
  labelEmail: '你的邮箱',
  placeholderName: '例如：大壮',
  placeholderSpecies: '例如：橘猫、大熊猫、黑帽悬猴',
  placeholderReason: '请简要说说这只动物的故事、为什么它值得被记住……',
  placeholderSource: '新闻报道、视频链接等（可选）',
  placeholderNickname: '怎么称呼你？',
  placeholderEmail: '如需回复请留下邮箱',
  submitBtn: '✨ 提交建议',
  submitting: '提交中……',
  successIcon: '✨',
  successTitle: '感谢你的建议！',
  successText: '我们已经收到了你的提交。每一份建议都会被认真对待——也许下一个来到星桥的小伙伴，就来自你的推荐。',
  continueBtn: '继续提交',
  privacyTitle: '🔒 隐私声明',
  privacy1: '你提交的信息仅用于网站内容更新参考。昵称和邮箱为非必填项。我们不会公开你的提交内容，不会将信息用于任何商业用途，也不会分享给第三方。提交即表示你同意我们基于你提供的信息进行内容更新。',
  privacy1b: '本网站使用 IP 地址仅用于防止蜡烛重复计数，不存储或分析任何个人数据，不上传浏览行为。',
  privacy2: '如需撤回建议或删除已提交的信息，请发送邮件至',
  privacy3: '我们将在 48 小时内处理。本表单使用 Web3Forms 作为邮件转发服务。',
  errorNoKey: '⚠️ 表单尚未配置 Web3Forms Access Key，请先获取 Key 后再使用。',
  errorSubmit: '提交失败，请稍后再试。',
  errorNetwork: '网络错误，请稍后再试。',
}

// ===== 导航和页脚 =====
export const NAV = {
  home: '🏠 星桥',
  about: '📖 关于',
  suggest: '💡 建议',
}

export const FOOTER = {
  line1: '星桥 · 非商业个人项目 · 不营利、不众筹',
  line2_photos: '照片素材来源于公开报道，版权归原作者所有',
  line2_contact: '侵权/纠错联系',
}
