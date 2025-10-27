let state = { top: 0 }

export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json(state)
  } else if (req.method === 'POST') {
    const body = req.body || {}
    const s = Number(body.score || 0)
    if (s > state.top) state.top = s
    res.status(200).json({ ok: true, top: state.top })
  } else {
    res.status(405).end()
  }
}