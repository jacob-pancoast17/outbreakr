import { React } from 'react';
import { CartesianGrid, Line, LineChart, XAxis, YAxis, Legend } from 'recharts';
import { dummyData } from '../data/sample';

export default function Chart() {
    return (
        <LineChart style={{ width: '100%', aspectRatio: 1.618, maxWidth: 800, margin: 'auto'}} responsive data={dummyData}>
            <CartesianGrid strokeDasharray="5 5" />
            <XAxis dataKey="name" />
            <YAxis width="auto" />
            <Legend />
            <Line type="monotone" dataKey="susceptible" stroke=""/>
                
        </LineChart>
    )
}

