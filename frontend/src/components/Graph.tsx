import { useEffect, useState } from 'react'
import { CartesianGrid, Line, LineChart, XAxis, YAxis, Legend } from 'recharts';


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
        <LineChart style={{ width: '100%', aspectRatio: 1.618, maxWidth: 800, margin: 'auto'}} responsive data={outbreak}>
            <CartesianGrid strokeDasharray="5 5" />
            <XAxis dataKey="day" />
            <YAxis width="auto" />
            <Legend />
            <Line type="monotone" dataKey="susceptible" stroke="#2846a8" activeDot={{ r: 8}}/>
                
        </LineChart>
    )
}

