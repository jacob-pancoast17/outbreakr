import { useState } from 'react'

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