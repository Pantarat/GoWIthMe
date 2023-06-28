import React, { useState } from 'react';

export default function IncrementDecrementButtons(props) {
    const [count, setCount] = useState(0);

    const increment = () => {
        let updatedCount = count + 1;
        setCount(updatedCount);
        props.setNum(updatedCount)
    };

    const decrement = () => {
        if (count>0){
            let updatedCount = count - 1;
            setCount(updatedCount);
            props.setNum(updatedCount)
        } 
    };

    return (
        <span className="text-left mb-5">
            <button
                className="px-4 py-2 mr-2 bg-mainblue text-white rounded-full"
                onClick={decrement}
            >
                -
            </button>
            <span className="w-8 font-bold text-center inline-block">{count}</span>
            <button
                className="px-4 py-2 ml-2 bg-mainblue text-white rounded-full"
                onClick={increment}
            >
                +
            </button>
        </span>
    );
}
