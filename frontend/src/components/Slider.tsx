import { useState, useEffect } from 'react'
import { SliderInputParam } from '../types/SliderInputParam'
import  Advanced from './Advanced'
import { AdvancedInputParam } from '../types/AdvancedInputParam';

/**
 * Creates a Slider component with a title.
 * 
 * @param name - The name of the value the Slider changes (string). 
 * @param inputParam - The values to be used for the input box (NumberInputParam interface).
 * @param onUpdate - The function that runs whenever an input is updated (function).
 * @param onChange - The function that runs when the population is changed (function).
 * @param title - The value the slider changes (string).
 * @param description - The description of the value the slider changes (string).
 * @param unit - The units for the measurement (string).
 * @param advanced - The information for advanced settings for a slider (AdvancedInputParam interface).
 * 
 * @returns Slider component for React used in App.tsx
 */
export default function Slider({ name, inputParam, onUpdate, onChangeValue, title, description, unit, advanced }: { 
    name: string; 
    inputParam: SliderInputParam;
    onUpdate: () => void;
    onChangeValue?: (value: number) => void ;
    title: string;
    description?: string;
    unit?: string;
    advanced?: AdvancedInputParam}) {

        const { min = 0, max, by, start } = inputParam

        const [count, setCount] = useState(() => {
            const saved = localStorage.getItem(`param-${name}`)
            return saved !== null ? Number(saved) : start
        })

        const [change, setChange] = useState(false)

        useEffect(() => {
            if (count > max) {
                setCount(max)
                onChangeValue?.(max)
            }
        }, [max])

        const handleSubmit = async (event: React.ChangeEvent<HTMLInputElement>) => {
            const value = Number(event.currentTarget.value)

            setCount(value)
            localStorage.setItem(`param-${name}`, String(value))
            onChangeValue?.(value)

            await fetch("http://localhost:8000/api", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, value })
            })
            
            onUpdate()
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

                { advanced !== undefined && (
                    <div className="hover:bg-amber-300">
                        <button type="button" onClick={ () => setChange(true) }>Click</button>
                    </div>
                )}

                { change && advanced !== undefined && (
                    <div>
                        <Advanced advancedInputParam={ advanced }/>
                    </div>
                )}
            </div>
        )
}