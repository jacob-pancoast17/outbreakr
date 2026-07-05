import { useState, useEffect } from 'react'

/**
 * Creates a Slider component with a title.
 * 
 * @param name - The name of the value the Slider changes (string).
 * @param min - The minimum value of the slider (number).
 * @param max - The maximum value of the slider (number).
 * 
 * @returns Slider component for React used in App.tsx
 */
export default function Slider({ name, min = 0, max, by, start, onUpdate, onChangeValue }: { 
    name: string; 
    min?: number; 
    max: number; 
    by: number; 
    start: number;
    onUpdate: () => void;
    onChangeValue?: (value: number) => void }) {

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
            <h2>{ name }</h2>        

            <div>
            <label>
            <input type="range" min={ min } max={ max } step={ by } defaultValue={ start } onChange={handleSubmit}/>
            <span>
                {count}
            </span>
            </label>
            </div>
        </div>
    )
}