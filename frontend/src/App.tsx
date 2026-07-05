import { useState, useEffect } from 'react'
import Chart from './components/Graph'
import Slider from './components/Slider'

function App() {

  return (
    <main className="py-10">
      {/* Header */}
      <h1 className = "font-bold text-3xl text-center">Outbreakr</h1>

      {/* Interactive chart */}
      <Chart />

      {/* Slider2 */}
      <Slider name="Days" max={ 5 } />
      <Slider name="Transmission Rate" max = { 2 } />

    </main>
  )
}

export default App
