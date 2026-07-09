import { useState, useEffect } from 'react'
import { SliderInputParam } from '../types/SliderInputParam';

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
 * 
 * @returns Slider component for React used in App.tsx
 */
export default function Slider({ name, inputParam, onUpdate, onChangeValue, title, description, unit }: { 
    name: string; 
    inputParam: SliderInputParam;
    onUpdate: () => void;
    onChangeValue?: (value: number) => void ;
    title: string;
    description: string;
    unit: string; }) {

        const { min = 0, max, by, start } = inputParam

        const [count, setCount] = useState(start)

        useEffect(() => {
            if (count > max) {
                setCount(max)
                onChangeValue?.(max)
            }
        }, [max])

        const handleSubmit = async (event: React.ChangeEvent<HTMLInputElement>) => {
            const value = Number(event.currentTarget.value)
            setCount(value)
            onChangeValue?.(value)

            await fetch("http://localhost:8000/api", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, value })
            })
            
            onUpdate()
        }

        return (
            <div className="grid grid-rows-[auto_1fr_auto_auto] items-center justify-center p-2 gap-2 border border-gray-400 rounded-md shadow">
                
                <div className="font-bold text-center">
                    { title }
                </div>

                <div className="text-center">
                    { description }
                </div>    
                    
                <div className="flex flex-col gap-0">
                    <label className="flex flex-col items-center">
                        <input type="range" min={ min } max={ max } step={ by } defaultValue={ start } onChange={ handleSubmit }/>
                        <span>
                            {count}
                        </span>
                    </label>

                    <div className="text-center">
                        { unit }
                    </div>
                </div>
            </div>
        )
}