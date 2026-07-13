import { useEffect, useState } from 'react'
import Slider from './Slider'
import NumericInput from './NumericInput'
import { NumberInputParam } from '../types/NumberInputParam'
import { SliderInputParam } from '../types/SliderInputParam'
import { AdvancedInputParam } from '../types/AdvancedInputParam'

/**
 * Creates a Dashboard component with graph inputs.
 * 
 * @param population - The current population size (number).
 * @param onUpdate - The function that runs whenever an input is updated (function).
 * @param onChange - The function that runs when the population is changed (function).
 * 
 * @returns Dashboard component for React used in Graph.tsx.
 */
export default function Dashboard({ population, onUpdate, onChange }: {
    population: number,
    onUpdate: () => void,
    onChange: (value: number) => void }) {

        const [R0, setR0] = useState(0)
    
        const fetchR0 = async () => {
            const response = await fetch("http://localhost:8000/params")
            const data = await response.json()
            const params = data.params
            setR0(params.beta / params.gamma)
        }

        useEffect(() => {
            fetchR0()
        }, [])

        const handleUpdate = () => {
            onUpdate()
            fetchR0()
        }

        return (
            <div className="flex flex-col max-w-lg gap-y-5">

                {/* Title */}
                <h1 className="font-bold text-2xl text-center">
                    Parameters
                </h1>

                {/* Parameters */}
                <div className="flex flex-col gap-y-2">
                    <NumericInput 
                        name="days" 
                        inputParam={ { min:1, max:1000, start:50 } as NumberInputParam }  
                        onUpdate={ handleUpdate } 
                        description="Outbreak Length"
                        unit="days"/>
                    
                    <div className="grid grid-cols-2 ">
                        <NumericInput 
                            name="N" 
                            inputParam={ { min:0, max:1000, start:population } as NumberInputParam } 
                            onUpdate={ handleUpdate } 
                            onChangeValue={ onChange }
                            description="Population Size (N)"
                            vertical={ true }/>

                        <Slider 
                            name="I0" 
                            inputParam={ { max:population, by:1, start:0 } as SliderInputParam } 
                            onUpdate={ handleUpdate } 
                            title="Initial Infected Population (I₀)"/>
                    </div>

                    <div className="grid grid-cols-2">
                        <Slider 
                            name="beta" 
                            inputParam={ { max:2, by:0.1, start:0.5 } as SliderInputParam } 
                            onUpdate={ handleUpdate }
                            title="Transmission Rate (β)"
                            description="The average number of new infections an infected person creates per unit time."
                            unit="per person, per day"
                            advanced={ {
                                expression:"contacts per person per day * transmissivity",
                                inputParam:[{ max:2, by:0.1, start:0.5 } as SliderInputParam,
                                { max:1, by:0.1, start:0.5 } as SliderInputParam] 
                            } as AdvancedInputParam }/>
                        <Slider 
                            name="gamma" 
                            inputParam={ { max:2, by:0.1, start:0.2 } as SliderInputParam } 
                            onUpdate={ handleUpdate } 
                            title="Recovery Rate (γ)"
                            description="The chance an infected person has to recover per unit time."
                            unit="recover per day" />
                    </div>

                    <div className="p-2 gap-2 border border-gray-400' rounded-md shadow" >
                        <div className="flex justify-center gap-1">
                            <div className="">
                                R0: 
                            </div>
                            { R0.toFixed(2) }
                        </div>
                        Peak infections occurred on day
                    </div>
                </div>
            </div>
        )
}