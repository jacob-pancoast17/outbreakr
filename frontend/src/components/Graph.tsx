import { useEffect, useState } from 'react'
import { ResponsiveContainer, CartesianGrid, Line, LineChart, XAxis, YAxis, Legend, Tooltip } from 'recharts';
import Dashboard from './Dashboard'

/**
 * Creates a Graph component using the FastAPI backend.
 * 
 * @returns Graph component for React used in App.tsx.
 */
export default function Chart() {
    const [outbreak, setOutbreak] = useState([])
    const [pop, setPop] = useState(1000)

    const fetchOutbreak = async () => {
        const response = await fetch("http://localhost:8000/api")
        const outbreak = await response.json()
        setOutbreak(outbreak.outbreaks)
    }

    useEffect(() => {
        fetchOutbreak()
    }, [])

    return (
        <div className="grid grid-cols-[1.5fr_1fr] gap-10 p-4 md:p-7 lg:p-10">
            {/* Graph */}
            <div className="min-w-0">
                <ResponsiveContainer width="100%" aspect={1.618}>
                    <LineChart 
                        responsive 
                        data={outbreak}>
                        <CartesianGrid strokeDasharray="5 5" />
                        <XAxis dataKey="day" />
                        <YAxis width={40} />
                        <Tooltip formatter={(value) => Number(value).toFixed(2)} />
                        <Legend />

                        {/* Lines for S, I, R */}
                        <Line type="monotone" dataKey="susceptible" stroke="#2846a8" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="infectious" stroke="#d18d26" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="recovered" stroke="#219e1b" activeDot={{ r: 8 }} />
                            
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <Dashboard population={ pop } onUpdate={ fetchOutbreak } onChange={ setPop }/>
            
        </div>
    )
}

