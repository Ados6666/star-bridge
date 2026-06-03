// ===== 星桥蜡烛计数器 Worker =====
// POST /:animalId   → 点蜡烛（IP限制每只动物1次）
// GET  /:animalId   → 获取当前计数

export default {
  async fetch(request, env) {
    const url = new URL(request.url)
    const pathParts = url.pathname.split('/').filter(Boolean)
    const animalId = pathParts[0] || ''

    // Validate animal ID
    const validIds = ['wu-kong', 'da-zhuang', 'a-zhai', 'sun-da-niang', 'cheng-gong', 'sun-si-miao']
    if (!validIds.includes(animalId)) {
      return new Response(JSON.stringify({ error: 'unknown animal' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      })
    }

    const countKey = `count:${animalId}`
    const ipKey = `ip:${animalId}:${request.headers.get('CF-Connecting-IP') || 'unknown'}`

    // GET — return current count
    if (request.method === 'GET') {
      const count = await env.COUNTERS.get(countKey)
      return new Response(JSON.stringify({ count: parseInt(count || '0', 10) }), {
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Cache-Control': 'no-cache' },
      })
    }

    // POST — light a candle
    if (request.method === 'POST') {
      // Check if this IP already lit a candle for this animal
      const alreadyLit = await env.COUNTERS.get(ipKey)
      if (alreadyLit) {
        const count = await env.COUNTERS.get(countKey)
        return new Response(JSON.stringify({ count: parseInt(count || '0', 10), alreadyLit: true }), {
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        })
      }

      // Mark IP as lit + increment count
      await env.COUNTERS.put(ipKey, '1')
      const newCount = await env.COUNTERS.get(countKey)
      const next = parseInt(newCount || '0', 10) + 1
      await env.COUNTERS.put(countKey, next.toString())

      return new Response(JSON.stringify({ count: next, success: true }), {
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      })
    }

    // OPTIONS — CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      })
    }

    return new Response('Method not allowed', { status: 405 })
  },
}
