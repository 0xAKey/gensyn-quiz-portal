import { useState } from 'react'
import useSWR from 'swr'

const fetcher = (url) => fetch(url).then((r) => r.json())

const sampleQuestions = [
  {
    id: 1,
    q: 'What is RL-Swarm primarily used for?',
    opts: ['Decentralized storage', 'Distributed AI training', 'NFT minting', 'DEX swaps'],
    a: 1,
  },
  {
    id: 2,
    q: 'Which Gensyn tool handles Minecraft play?',
    opts: ['Judge', 'BlockAssist', 'Swarm', 'Oracle'],
    a: 1,
  },
  {
    id: 3,
    q: 'Which metric matters most for node rewards?',
    opts: ['Raw GPU TFLOPs', 'Model size only', 'Uptime & valid rounds', 'Number of followers'],
    a: 2,
  },
]

export default function Quiz({ onComplete }) {
  const [idx, setIdx] = useState(0)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)
  const { data } = useSWR('/api/score', fetcher)

  function choose(i) {
    if (done) return
    const q = sampleQuestions[idx]
    if (i === q.a) setScore((s) => s + 1)
    if (idx + 1 >= sampleQuestions.length) {
      setDone(true)
      fetch('/api/score', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ score }),
      })
      onComplete && onComplete(score)
    } else setIdx(idx + 1)
  }

  if (done)
    return (
      <div>
        <div className="question card">
          Quiz complete — score: {score}/{sampleQuestions.length}
        </div>
        <div className="leader">Top score (live): {data?.top ?? '—'}</div>
      </div>
    )

  const q = sampleQuestions[idx]
  return (
    <div>
      <div className="question">{q.q}</div>
      <div className="options">
        {q.opts.map((o, i) => (
          <div key={i} className="opt" onClick={() => choose(i)}>
            {o}
          </div>
        ))}
      </div>
    </div>
  )
}