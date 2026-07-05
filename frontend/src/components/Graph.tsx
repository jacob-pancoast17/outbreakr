import { useEffect, useState } from 'react'
import { CartesianGrid, Line, LineChart, XAxis, YAxis, Legend } from 'recharts';
import Slider from './Slider'


/**
 * Creates a Graph component using the FastAPI backend.
 * 
 * @returns Graph component for React used in App.tsx.
 */
export default function Chart() {
    const [outbreak, setOutbreak] = useState([])

    const fetchOutbreak = async () => {
        const response = await fetch("http://localhost:8000/api")
        const outbreak = await response.json()
        setOutbreak(outbreak.outbreaks)
    }

    useEffect(() => {
        fetchOutbreak()
    }, [])

    return (
        <div>
            {/* Graph */}
            <LineChart style={{ width: '100%', aspectRatio: 1.618, maxWidth: 800, margin: 'auto'}} responsive data={outbreak}>
                <CartesianGrid strokeDasharray="5 5" />
                <XAxis dataKey="day" />
                <YAxis width="auto" />
                <Legend />

                {/* Lines for S, I, R */}
                <Line type="monotone" dataKey="susceptible" stroke="#2846a8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="infectious" stroke="#d18d26" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="recovered" stroke="#219e1b" activeDot={{ r: 8 }} />
                    
            </LineChart>

            {/* Sliders */}
            <Slider name="days" max={ 100 } min={ 1 } onUpdate ={ fetchOutbreak }/>
            <Slider name="Transmission Rate" max = { 2 } />
        </div>
    )
}

