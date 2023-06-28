import { useState } from 'react';

export default function ButtonInterest(props) {

    const [isToggled, setIsToggled] = useState(false);

    const handleClick = () => {
        setIsToggled(!isToggled);
    };

    return (
        <button
            className={`px-5 py-1 mx-1 my-1 drop-shadow border-2 border-transparent text-left rounded-xl transition-colors duration-150 ease-in-out hover:border-mainblue ${isToggled ? 'bg-mainblue text-white' : 'bg-white text-black'}`}
            onClick={handleClick}
        >
            {props.name}
        </button>
    );
}