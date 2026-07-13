import Chart from './components/Graph'

function App() {

  return (
    <main className="py-10 space-y-10">
      {/* Header */}
      <h1 className = "font-bold text-4xl text-center">Outbreakr</h1>

      {/* Interactive chart */}
      <Chart />

    </main>
  )
}

export default App
