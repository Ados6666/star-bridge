// Pages Functions: /api/candle/:animalId
// GET  → 获取计数
// POST → 点蜡烛（IP限制）

export async function onRequest(context) {
  const { request, env } = context
  const url = new URL(request.url)
  const animalId = url.pathname.split('/').pop()

  const validIds = ['wu-kong', 'da-zhuang', 'a-zhai', 'sun-da-niang', 'cheng-gong', 'sun-si-miao']
  if (!validIds.includes(animalId)) {
    return new Response(JSON.stringify({ error: 'unknown animal' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    })
  }

  // Use KV if available, otherwise fallback to the VAR store
  const store = env.COUNTERS
  const countKey = `count:${animalId}`
  const ipKey = `ip:${animalId}:${request.headers.get('CF-Connecting-IP') || 'unknown'}`

  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    })
  }

  if (request.method === 'GET') {
    const count = await store.get(countKey)
    return new Response(JSON.stringify({ count: parseInt(count || '0') }), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Cache-Control': 'no-cache' },
    })
  }

  if (request.method === 'POST') {
    const alreadyLit = await store.get(ipKey)
    if (alreadyLit) {
      const count = await store.get(countKey)
      return new Response(JSON.stringify({ count: parseInt(count || '0'), alreadyLit: true }), {
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      })
    }

    await store.put(ipKey, '1')
    const current = await store.get(countKey)
    const next = parseInt(current || '0') + 1
    await store.put(countKey, next.toString())

    return new Response(JSON.stringify({ count: next, success: true }), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    })
  }

  return new Response('Method not allowed', { status: 405 })
}
