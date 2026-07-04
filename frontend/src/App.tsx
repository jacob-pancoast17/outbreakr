import { useState } from 'react'
import Chart from './components/Graph'

function App() {
  const [days, setDays] = useState(0)
  const [count, setCount] = useState(0)

  return (
    <main className="py-10">
      {/* Header */}
      <h1 className = "font-bold text-3xl text-center">Outbreakr</h1>

      {/* Interactive chart */}
      <Chart />

      {/* Slider */}
      <div>
        <label>
          <input type="range" min="0" max="5" step="1" value={days} onChange={(e) => setDays(Number(e.currentTarget.value))}/>
          <span>
            {days}
          </span>
        </label>
      </div>

      <div>
        <label>
          <input type="range" min="0" max="5" step="1" value={count} onChange={(e) => setCount(Number(e.currentTarget.value))}/>
          <span>
            {count}
          </span>
        </label>
      </div>

    </main>
  )
}

export default App
