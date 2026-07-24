import { useState, useEffect } from 'react'
import { ResponsiveContainer, CartesianGrid, Line, LineChart, XAxis, YAxis, Legend, Tooltip, Label } from 'recharts';
import Dashboard from './Dashboard'
import { ModelParam } from '../types/ModelParam'
import { Day } from '../types/Day'

/**
 * Creates a Graph component using the FastAPI backend.
 * 
 * @returns Graph component for React used in App.tsx.
 */
export default function Chart() {
    const [model, setModel] = useState()
    const [maxInfectious, setMaxInfectious] = useState<Day>({day: 0, susceptible: 0, exposed: 0, infectious: 0, recovered: 0})
    const [totalInfected, setTotalInfected] = useState<number>(0)
    const [seir, setSeir] = useState(false)

    const [params, setParams] = useState<ModelParam>({days: 50, beta: 1/2, gamma: 1/5, N: 1000, I0: 6})

    const updateParam = (name: string, value: number) => {
        {/* Change a parameter */}
        setParams({ ...params, [name]: value })
    }

    const changeSEIR = () => {
        const next = !seir
        setSeir(next)

        if (next == true) {
            setParams({ ...params, E0: 6, sigma: 1/5 })
        } else {
            setParams((prev: ModelParam) => {
                const copy = { ...prev }
                delete copy.E0
                delete copy.sigma
                return copy
            })
        }
    }

    const fitModel = async () => {
        {/* Fit the model and grab the results from POST */}
        const endpoint = seir ? "seir" : "sir"
        console.log(JSON.stringify(params))
        const response = await fetch(`http://localhost:8000/${endpoint}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(params)
        })
        const model = await response.json()
        setModel(model.outbreaks)

        {/* Find the day with the most infectious people */}
        setMaxInfectious(model.outbreaks.reduce((max: Day, curr: Day) => curr.infectious > max.infectious ? curr : max))

        {/* Find how many people were infected in total */}
        setTotalInfected(params.N - model.outbreaks.at(-1).susceptible)
    }

    useEffect(() => {
        fitModel()
    }, [params, seir])

    return (
        <div className="grid grid-cols-[1.5fr_1fr] gap-10 p-4 md:p-7 lg:p-10">
            
            {/* Graph */}
            <div className="min-w-0">
                <div className="grid grid-cols-3 p-5">

                    <div></div> { /* Placeholder */ }

                    <h1 className="text-3xl text-center">S{ seir === true ? "E" : "" }IR Model</h1>
                
                    <label className="flex justify-end">
                            SEIR mode { seir === true ? "enabled" : "disabled" }
                            <input type="checkbox" className="appearance-none peer" onChange={ () => { changeSEIR() } } />
                            <span className="w-16 h-10 flex items-center shrink-0 ml-4 p-1 bg-gray-300 rounded-full after:w-8 after:h-8 after:bg-white after:rounded-full after:shadow-md peer-checked:bg-green-400 duration-300 ease-in-out after:duration-300 peer-checked:after:translate-x-6"></span>
                    </label>
                </div>
                
                <div className="grid grid-cols-4">
                    <div className="text-center text-xl gap-1 p-2 border border-gray-400 rounded-md shadow">
                        <div className="font-bold">
                            R0:<br></br>
                        </div>
                        { (params.beta / params.gamma).toFixed(2) } <br></br>
                    </div>
                    <div className="text-center text-xl gap-1 p-2 border border-gray-400 rounded-md shadow">
                        <div className="font-bold">
                            Peak infectious:<br></br>
                        </div>
                        { Math.round(maxInfectious.infectious) } <br></br>
                    </div>
                    <div className="text-center text-xl gap-1 p-2 border border-gray-400 rounded-md shadow">
                        <div className="font-bold">
                            Peak day:<br></br> 
                        </div>
                        { maxInfectious.day } <br></br>
                    </div>
                    <div className="text-center text-xl gap-1 p-2 border border-gray-400 rounded-md shadow">
                        <div className="font-bold">
                            Total infected:<br></br> 
                        </div>
                        { Math.round(totalInfected) } ({ (totalInfected / params.N * 100).toFixed(1) }%)
                    </div>
                </div>

                <ResponsiveContainer width="100%" aspect={1.618}>
                    <LineChart
                        data={ model }
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

                        {/* Lines for S, E?, I, R */}
                        <Line type="monotone" dataKey="susceptible" stroke="#2846a8" activeDot={{ r: 8 }} />
                        {seir && <Line type="monotone" dataKey="exposed" stroke="#db25b7" activeDot={{ r: 8 }} />}
                        <Line type="monotone" dataKey="infectious" stroke="#d18d26" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="recovered" stroke="#219e1b" activeDot={{ r: 8 }} />
                            
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Dashboard */}
            <div className="self-center">
                <Dashboard params = { params } seir={ seir } onUpdate={ updateParam } />
            </div>
            
        </div>
    )
}

