import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <main className="py-10">
      <h1 className = "font-bold text-3xl text-center">Outbreakr</h1>
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
