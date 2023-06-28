import React, { useState } from "react";

export default function CuiSineSlider(props) {
    const [value, setValue] = useState(50);

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <div className="my-3 flex items-center">
            <span className="mr-3 w-28 text-right text-gray-700">{props.min}</span>
            <input
                type="range"
                min="0"
                max="100"
                value={value}
                onChange={handleChange}
                className="appearance-none w-96 h-2 bg-gray-300 rounded-full
                    [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-[20px] [&::-webkit-slider-thumb]:w-[20px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-gray-300 [&::-webkit-slider-thumb]:border-solid"
                style={{
                    background: `linear-gradient(to right, #79E0EE 0%, #79E0EE ${value}%, #d1d5db ${value}%, #d1d5db 100%)`
                    }
                }
            />
            <span className="ml-3 w-28 text-left text-gray-700">{props.max}</span>
        </div>
    );
}
