import { useEffect, useState } from 'react'
import { ResponsiveContainer, CartesianGrid, Line, LineChart, XAxis, YAxis, Legend, Tooltip, Label } from 'recharts';
import Dashboard from './Dashboard'

/**
 * Creates a Graph component using the FastAPI backend.
 * 
 * @returns Graph component for React used in App.tsx.
 */
export default function Chart() {
    const [outbreak, setOutbreak] = useState([])
    const [pop, setPop] = useState(1000)
    const [seir, setSeir] = useState(false)

    const fetchOutbreak = async () => {
        const endpoint = seir ? "seir" : "sir"
        const response = await fetch(`http://localhost:8000/${endpoint}`)
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
                <div className="grid grid-cols-3">

                    <div></div> { /* Placeholder */ }
                    <h1 className="text-3xl text-center">S{ seir === true ? "E" : "" }IR Model</h1>
                
                    <label className="flex justify-end items-center p-2">
                            SEIR mode { seir === true ? "enabled" : "disabled" }
                            <input type="checkbox" className="appearance-none peer" onChange={ () => setSeir(!seir) } />
                            <span className="w-16 h-10 flex items-center flex-shrink-0 ml-4 p-1 bg-gray-300 rounded-full after:w-8 after:h-8 after:bg-white after:rounded-full after:shadow-md peer-checked:bg-green-400 duration-300 ease-in-out after:duration-300 peer-checked:after:translate-x-6"></span>
                    </label>
                </div>
                <ResponsiveContainer width="100%" aspect={1.618}>
                    <LineChart
                        data={outbreak}
                        margin={ {bottom: 20, top: 20, left:20} }>
                        <CartesianGrid strokeDasharray="5 5" />
                        <XAxis dataKey="day">
                            <Label value="Days" position="bottom" offset={ 10 } />
                        </XAxis>
                        <YAxis width={40}>
                            <Label value="Number of People" position="left" angle={ -90 } offset={ 10 } style={ {textAnchor: "middle"} }/>
                        </YAxis>
                        <Tooltip formatter={(value) => Number(value).toFixed(2)} />
                        <Legend wrapperStyle={ {paddingTop: 25} }/>

                        {/* Lines for S, I, R */}
                        <Line type="monotone" dataKey="susceptible" stroke="#2846a8" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="infectious" stroke="#d18d26" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="recovered" stroke="#219e1b" activeDot={{ r: 8 }} />
                            
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <Dashboard population={ pop } seir={ seir } onUpdate={ fetchOutbreak } onChange={ setPop }/>
            
        </div>
    )
}

