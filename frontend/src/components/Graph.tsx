import { CartesianGrid, Line, LineChart, XAxis, YAxis, Legend } from 'recharts';
import { dummyData } from '../data/sample';

export default function Chart() {
    return (
        <LineChart style={{ width: '100%', aspectRatio: 1.618, maxWidth: 800, margin: 'auto'}} responsive data={dummyData}>
            <CartesianGrid strokeDasharray="5 5" />
            <XAxis dataKey="day" />
            <YAxis width="auto" />
            <Legend />
            <Line type="monotone" dataKey="susceptible" stroke="#2846a8" activeDot={{ r: 8}}/>
                
        </LineChart>
    )
}

