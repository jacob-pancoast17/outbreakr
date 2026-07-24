import { useEffect } from 'react'
import ModelParameterSlider from './ModelParameterSlider'
import InitialConditionSlider from './InitialConditionSlider'
import NumericInput from './NumericInput'
import { NumberInputParam } from '../types/NumberInputParam'
import { SliderInputParam } from '../types/SliderInputParam'
import { AdvancedInputParam } from '../types/AdvancedInputParam'

/**
 * Creates a Dashboard component with graph inputs.
 * 
 * @param params - The model parameters (dictionary).
 * @param onUpdate - The function that runs whenever an input is updated (function).
 * @param seir - Is the dashboard currently in SEIR mode? (boolean)
 * 
 * @returns Dashboard component for React used in Graph.tsx.
 */
export default function Dashboard({ params, seir, onUpdate }: {
    params: {days: number, beta: number, gamma: number, N: number, I0: number};
    seir: boolean;
    onUpdate: (name: string, value: number) => void }) {
        
        useEffect(() => {
        }, [])

        return (
            <div className="flex flex-col max-w-lg gap-y-3">

                {/* Title */}
                <h1 className="font-bold text-2xl text-center">
                    Parameters
                </h1>

            {/* Parameters */}
                {/* Days input */}
                <NumericInput 
                    name="days" 
                    inputParam={ { min:1, max:1000, start:params.days } as NumberInputParam }  
                    onUpdate={ onUpdate } 
                    description="Outbreak Length"
                    unit="days"/>
                
                {/* Pop size input (N) */}
                <NumericInput 
                    name="N" 
                    inputParam={ { min:0, max:1000, start:params.N } as NumberInputParam } 
                    onUpdate={ onUpdate } 
                    description="Population Size (N)"
                    vertical={ true }/>

                <div className="flex flex-col items-center justify-center p-2 gap-2 border border-gray-400' rounded-md shadow">
                    {/* Initial exposed pop (E₀) */}
                    { seir === true && (
                    <InitialConditionSlider
                        name="E0" 
                        inputParam={ { max:params.N, by:1, start:0 } as SliderInputParam } 
                        onUpdate={ onUpdate } 
                        title="Initial Exposed Population (E₀)"/>
                    )}

                    {/* Initial infected pop (I₀) */}
                    <InitialConditionSlider
                        name="I0" 
                        inputParam={ { max:params.N, by:1, start:params.I0 } as SliderInputParam } 
                        onUpdate={ onUpdate } 
                        title="Initial Infected Population (I₀)"/>

                </div>

                <div className={`grid ${seir ? 'grid-cols-3' : 'grid-cols-2'}`}>
                    {/* Transmission Rate (β) */}
                    <ModelParameterSlider 
                        name="beta" 
                        inputParam={ { max:2, by:0.1, start:params.beta } as SliderInputParam } 
                        onUpdate={ onUpdate }
                        title="Transmission Rate (β)"
                        description="The average number of new infections an infected person creates per unit time."
                        unit="per person, per day"
                        advanced={ {
                            expression:"contacts per person per day * transmissivity",
                            inputParam:[{ max:2, by:0.1, start:0.5 } as SliderInputParam,
                            { max:1, by:0.1, start:0.5 } as SliderInputParam] 
                        } as AdvancedInputParam }/>


                    {/* Recovery Rate (γ) */}
                    <ModelParameterSlider 
                        name="gamma" 
                        inputParam={ { max:2, by:0.1, start:params.gamma } as SliderInputParam } 
                        onUpdate={ onUpdate } 
                        title="Recovery Rate (γ)"
                        description="The chance an infected person has to recover per unit time."
                        unit="recover per day" />

                    {/* Incubation Rate (σ) */}
                    {seir &&
                        <ModelParameterSlider 
                            name="sigma" 
                            inputParam={ { max:2, by:0.1, start:params.sigma } as SliderInputParam } 
                            onUpdate={ onUpdate } 
                            title="Incubation Rate (σ)"
                            description="The rate at which exposed individuals become infectious." />
                    }
                </div>

                <div className="p-2 gap-2 border border-gray-400' rounded-md shadow" >
                    <div className="flex justify-center gap-1">
                        <div className="">
                            R0: 
                        </div>
                        { (params.beta / params.gamma).toFixed(2) }
                    </div>
                    Peak infections occurred on day
                </div>
            </div>
        )
}