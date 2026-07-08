import { useState, useEffect } from 'react'
import { NumberInputParam } from '../types/NumberInputParam'

/**
 * Creates a Slider component with a title.
 * 
 * @param name - The name of the value the Slider changes (string).
 * @param min - The minimum value of the slider (number).
 * @param max - The maximum value of the slider (number).
 * 
 * @returns Slider component for React used in App.tsx
 */
export default function Slider({ name, inputParam, onUpdate, onChangeValue }: { 
    name: string;
    inputParam: NumberInputParam;
    onUpdate: () => void;
    onChangeValue?: (value: number) => void }) {

        const { min, max, start } = inputParam

        const [count, setCount] = useState(start)

        useEffect(() => {
            if (count > max) {
                setCount(max)
                onChangeValue?.(max)
            }

        }, [max])

        const handleSubmit = async (event: React.ChangeEvent<HTMLInputElement>) => {
            let value = Number(event.currentTarget.value)
            value = Math.max(Math.min(max, value), min)

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

                    <label className="hover:bg-neutral-200">
                        <input type="number" min={ min } max={ max } defaultValue={ start } onChange={ handleSubmit }/>
                    </label>
                </label>
            </div>
        )
}