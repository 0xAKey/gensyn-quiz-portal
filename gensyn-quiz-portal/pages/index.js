import Head from 'next/head'
import Quiz from '../components/Quiz'
import { useState } from 'react'

export default function Home() {
  const [doneScore, setDoneScore] = useState(null)

  return (
    <div className="container">
      <Head>
        <title>Gensyn IQ — Quiz Portal</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="card">
        <div className="header">
          <div className="logo">G</div>
          <div>
            <h1 className="h1">Gensyn IQ — Quick Quiz</h1>
            <div className="leadin">Test your Gensyn knowledge. Earn badges locally.</div>
          </div>
        </div>

        <div style={{ marginTop: 18 }}>
          <Quiz onComplete={(s) => setDoneScore(s)} />
        </div>

        {doneScore !== null && (
          <div style={{ marginTop: 16 }} className="row">
            <button
              className="btn"
              onClick={() =>
                alert('Demo: You can extend this to issue badges or roles via webhook!')
              }
            >
              Claim (demo)
            </button>
            <div className="leader">Your score: {doneScore}</div>
          </div>
        )}
      </div>
    </div>
  )
}