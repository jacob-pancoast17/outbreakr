import Slider from './Slider'
import NumericInput from './NumericInput'
import { NumberInputParam } from '../types/NumberInputParam'
import { SliderInputParam } from '../types/SliderInputParam'

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
                    inputParam={ { min:1, max:1000, start:100 } as NumberInputParam }  
                    onUpdate={ onUpdate } 
                    description="Outbreak Length"
                    unit="days"/>

                <div className="grid grid-cols-2">
                    <Slider 
                        name="beta" 
                        inputParam={ { max:2, by:0.1, start:0.5 } as SliderInputParam } 
                        onUpdate={ onUpdate }
                        title="Transmission Rate (β)"
                        description="The average number of new infections an infected person creates per unit time."
                        unit="per person, per day" />
                    <Slider 
                        name="gamma" 
                        inputParam={ { max:2, by:0.1, start:0.2 } as SliderInputParam } 
                        onUpdate={ onUpdate } 
                        title="Recovery Rate (γ)"
                        description="The chance an infected person has to recover per unit time."
                        unit="recover per day" />
                </div>
                <Slider 
                    name="N" 
                    inputParam={ { max:1000, by:20, start:population } as SliderInputParam } 
                    onUpdate={ onUpdate } 
                    onChangeValue={ onChange } 
                    title="Population Size"/>
                <Slider 
                    name="I0" 
                    inputParam={ { max:population, by:1, start:0 } as SliderInputParam } 
                    onUpdate={ onUpdate } 
                    title="Initial Infected Population"/>
            </div>
        </div>
    )
}