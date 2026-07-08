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
        <div className="max-w-lg space-y-3">

            {/* Title */}
            <h1 className="font-bold text-2xl text-center">
                Parameters
            </h1>

            {/* Parameters */}
            <div className="">
                <NumericInput 
                    name="days" 
                    inputParam={ { min:1, max:1000, start:100 } as NumberInputParam }  
                    onUpdate={ onUpdate } 
                    description="Outbreak length (in days):"/>

                <div className="grid grid-cols-2">
                    <Slider 
                        name="beta" 
                        inputParam={ { max:2, by:0.1, start:0.5 } as SliderInputParam } 
                        onUpdate={ onUpdate } />
                    <Slider 
                        name="gamma" 
                        inputParam={ { max:2, by:0.1, start:0.2 } as SliderInputParam } 
                        onUpdate={ onUpdate } />
                </div>
                <Slider 
                    name="N" 
                    inputParam={ { max:1000, by:20, start:population } as SliderInputParam } 
                    onUpdate={ onUpdate } 
                    onChangeValue={ onChange } />
                <Slider 
                    name="I0" 
                    inputParam={ { max:population, by:1, start:0 } as SliderInputParam } 
                    onUpdate={ onUpdate } />
            </div>
        </div>
    )
}