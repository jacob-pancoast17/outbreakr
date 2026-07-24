import { useState, useEffect } from 'react'
import { NumberInputParam } from '../types/NumberInputParam'

/**
 * Creates a Slider component with a title.
 * 
 * @param name - The name of the value the Slider changes (string).
 * @param inputParam - The values to be used for the input box (NumberInputParam interface).
 * @param onUpdate - The function that runs whenever an input is updated (function).
 * 
 * @returns Slider component for React used in App.tsx
 */
export default function NumericInput({ name, inputParam, onUpdate, description, unit, vertical }: { 
    name: string;
    inputParam: NumberInputParam;
    onUpdate: (name: string, value: number) => void;
    description: string;
    unit?: string;
    vertical?: boolean }) {

        const { min, max, start } = inputParam

        const [count, setCount] = useState(start)

        useEffect(() => {
            if (count > max) {
                setCount(max)
            }
        }, [max])

        const handleSubmit = async (event: React.ChangeEvent<HTMLInputElement>) => {

            let value = Number(event.currentTarget.value)
            value = Math.max(Math.min(max, value), min)
            setCount(value)
            onUpdate(name, value)
        }

        return (
            <div className={`flex ${vertical ? 'flex-col' : ''} items-center justify-center gap-1 p-2 border border-gray-400 rounded-md shadow`} >
                <div className="flex flex-row gap-1">
                    <div className="font-bold">
                        { description } 
                    </div>
                    
                    { unit && (
                        <div>
                            ({ unit })
                            { ":" }
                        </div>
                    )}
                </div>
                
                <label className="flex justify-center">
                    <input type="number" min={ min } max={ max } defaultValue={ count } placeholder={ String(min) } onChange={ handleSubmit }/>
                </label>
            </div>
        )
}