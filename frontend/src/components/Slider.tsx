import { useState } from 'react'

/**
 * Creates a Slider component with a title.
 * 
 * @param name - The name of the value the Slider changes (string).
 * @param min - The minimum value of the slider (number).
 * @param max - The maximum value of the slider (number).
 * 
 * @returns Slider component for React used in App.tsx
 */
export default function Slider({ name, min = 0, max }: { name: string; min: number; max: number }) {

    const [count, setCount] = useState(0)

    return (
        <div>
            <h2>{ name }</h2>        

            <div>
            <label>
            <input type="range" min={ min } max={ max } step="1" value={count} onChange={(e) => setCount(Number(e.currentTarget.value))}/>
            <span>
                {count}
            </span>
            </label>
            </div>
        </div>
    )
}