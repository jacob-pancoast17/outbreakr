import { useState, useEffect } from 'react'
import { SliderInputParam } from '../types/SliderInputParam';

/**
 * Creates a Slider component with a title.
 * 
 * @param name - The name of the value the Slider changes (string). 
 * @param inputParam - The values to be used for the input box (NumberInputParam interface).
 * @param onUpdate - The function that runs whenever an input is updated (function).
 * @param onChange - The function that runs when the population is changed (function).
 * 
 * @returns Slider component for React used in App.tsx
 */
export default function Slider({ name, inputParam, onUpdate, onChangeValue }: { 
    name: string; 
    inputParam: SliderInputParam;
    onUpdate: () => void;
    onChangeValue?: (value: number) => void }) {

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
            <div>
                <label className="flex items-center justify-center gap-3 p-2">
                    <label className="font-bold">
                        <h2>{ name }</h2>    
                    </label>
                    
                    <label className="">
                        <input type="range" min={ min } max={ max } step={ by } defaultValue={ start } onChange={ handleSubmit }/>
                        <span>
                            {count}
                        </span>
                    </label>
                </label>
            </div>
        )
}