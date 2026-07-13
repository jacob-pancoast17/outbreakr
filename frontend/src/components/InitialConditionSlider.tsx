import { useState, useEffect } from 'react'
import { SliderInputParam } from '../types/SliderInputParam'

/**
 * Creates a InitialConditionSlider component with a title.
 * 
 * @param name - The name of the value the Slider changes (string). 
 * @param inputParam - The values to be used for the input box (NumberInputParam interface).
 * @param onUpdate - The function that runs whenever an input is updated (function).
 * @param onChange - The function that runs when the population is changed (function).
 * @param title - The value the slider changes (string).
 * 
 * @returns Slider component for React used in App.tsx
 */
export default function InitialConditionSlider({ name, inputParam, onUpdate, onChangeValue, title }: { 
    name: string; 
    inputParam: SliderInputParam;
    onUpdate: () => void;
    onChangeValue?: (value: number) => void ;
    title: string;}) {

        const { min = 0, max, by, start } = inputParam

        const [count, setCount] = useState(() => {
            const saved = localStorage.getItem(`param-${name}`)
            return saved !== null ? Number(saved) : start
        })

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

            await fetch("http://localhost:8000/sir", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, value })
            })
            
            onUpdate()
        }

        return (
            <div className="flex gap-5">
                <div className="font-bold text-center">
                    { title }
                </div>  
                    
                <div className="flex flex-col gap-0">
                    <label className="flex flex-col items-center">
                        <input type="range" min={ min } max={ max } step={ by } defaultValue={ count } onChange={ handleSubmit }/>
                        <span>
                            {count}
                        </span>
                    </label>
                </div>
            </div>
        )
}