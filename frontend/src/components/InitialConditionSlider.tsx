import { useState, useEffect } from 'react'
import { SliderInputParam } from '../types/SliderInputParam'

/**
 * Creates a InitialConditionSlider component with a title.
 * 
 * @param name - The name of the value the Slider changes (string). 
 * @param inputParam - The values to be used for the input box (NumberInputParam interface).
 * @param onUpdate - The function that runs whenever an input is updated (function).
 * @param title - The value the slider changes (string).
 * 
 * @returns Slider component for React used in App.tsx
 */
export default function InitialConditionSlider({ name, inputParam, onUpdate, title }: { 
    name: string; 
    inputParam: SliderInputParam;
    onUpdate: (name: string, value: number) => void;
    title: string;}) {

        const { min = 0, max, by, start } = inputParam

        const [count, setCount] = useState(start)

        useEffect(() => {
            if (count > max) {
                setCount(max)
            }
        }, [max])

        const handleSubmit = async (event: React.ChangeEvent<HTMLInputElement>) => {

            const value = Number(event.currentTarget.value)
            setCount(value)
            onUpdate(name, value)
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