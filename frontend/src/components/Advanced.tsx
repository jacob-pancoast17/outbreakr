import { useState } from 'react'
import { AdvancedInputParam } from "../types/AdvancedInputParam";

export default function Advanced({advancedInputParam}: {
    advancedInputParam: AdvancedInputParam;
}) {

    const { expression, inputParam } = advancedInputParam
    const parts = expression.split("*")

    const [count, setCount] = useState(0)

    const handleSubmit = async (event: React.ChangeEvent<HTMLInputElement>) => {
            const value = Number(event.currentTarget.value)

            setCount(value)
            localStorage.setItem(`param-${name}`, String(value))

            /** Local dev
            await fetch("http://localhost:8000/sir", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, value })
            })
            */

            /** Server dev */
            await fetch("https://outbreakr.onrender.com/sir", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, value })
            })
            
        }

    return(
        <div>
            { parts.map((part, index) => (
                <div key={index} className="flex flex-col items-center">

                    {part.trim()}
                    <input type="range" 
                        onChange={ handleSubmit } 
                        min={ inputParam[index].min }
                        max={ inputParam[index].max }
                        step={ inputParam[index].by } />
                    { count }

                </div>
            )) }
        </div>
    )
}