import { useState, useEffect } from 'react'
import { SliderInputParam } from '../types/SliderInputParam'
/*import  Advanced from './Advanced'*/
import { AdvancedInputParam } from '../types/AdvancedInputParam';

/**
 * Creates a ModelParamterSlider component with a title.
 * 
 * @param name - The name of the value the Slider changes (string). 
 * @param inputParam - The values to be used for the input box (NumberInputParam interface).
 * @param onUpdate - The function that runs whenever an input is updated (function).
 * @param title - The value the slider changes (string).
 * @param description - The description of the value the slider changes (string).
 * @param unit - The units for the measurement (string).
 * @param advanced - The information for advanced settings for a slider (AdvancedInputParam interface).
 * 
 * @returns Slider component for React used in App.tsx
 */
export default function ModelParameterSlider({ name, inputParam, onUpdate, title, description, unit }: { 
    name: string; 
    inputParam: SliderInputParam;
    onUpdate: (name: string, value: number) => void;
    title: string;
    description?: string;
    unit?: string;
    advanced?: AdvancedInputParam;}) {

        const { min = 0, max, by, start } = inputParam

        const [count, setCount] = useState(start)

        /*const [change, setChange] = useState(false)*/

        useEffect(() => {
            if (count > max) {
                setCount(max)
            }
        }, [max, count])

        const handleSubmit = async (event: React.ChangeEvent<HTMLInputElement>) => {

            const value = Number(event.currentTarget.value)
            setCount(value)
            onUpdate(name, value)
        }

        return (
            <div className="grid grid-rows-[auto_1fr_auto_auto] items-center justify-center p-2 gap-2 border border-gray-400' rounded-md shadow">
                
                <div className="font-bold text-center">
                    { title }
                </div>

                <div className="text-center">
                    { description }
                </div>    
                    
                <div className="flex flex-col gap-0">
                    <label className="flex flex-col items-center">
                        <input type="range" min={ min } max={ max } step={ by } defaultValue={ count } onChange={ handleSubmit }/>
                        <span>
                            {count}
                        </span>
                    </label>

                    <div className="text-center">
                        { unit }
                    </div>
                </div>
                
                {/** Advanced options button (OPTIONAL) */}
                {/* { advanced !== undefined && (
                    <div className="flex text-sm text-slate-500 italic hover:bg-gray-100 px-4 w-fit items-center justify-self-center">
                        <button type="button" onClick={ () => setChange(!change) }>Advanced Options</button>
                    </div>
                )}

                { change && advanced !== undefined && (
                    <div>
                        <Advanced advancedInputParam={ advanced }/>
                    </div>
                )} */}
            </div>
        )
}