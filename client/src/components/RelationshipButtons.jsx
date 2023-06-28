import { useState } from 'react';

export default function RelationshipButtons(props) {

    const [isSelected, setIsSelected] = useState(null);

    const handleClick = (choice) => {
        if (isSelected !== choice) {
            setIsSelected(choice);
            props.setStyles({
                ...props.styles,
                relationship : choice
            })
        }
    };

    return (
        <div className="text-left mt-2 mb-2">
            <button
                className={`px-5 py-1 mx-1 my-1 drop-shadow border-2 border-transparent text-left rounded-xl transition-colors duration-150 ease-in-out hover:border-mainblue ${(isSelected === 'Solo') ? 'bg-mainblue text-white' : 'bg-white text-black'}`}
                onClick={() => handleClick('Solo')}
            >
                Solo
            </button>
            <button
                className={`px-5 py-1 mx-1 my-1 drop-shadow border-2 border-transparent text-left rounded-xl transition-colors duration-150 ease-in-out hover:border-mainblue ${(isSelected === 'Friends') ? 'bg-mainblue text-white' : 'bg-white text-black'}`}
                onClick={() => handleClick('Friends')}
            >
                Friends
            </button>
            <button
                className={`px-5 py-1 mx-1 my-1 drop-shadow border-2 border-transparent text-left rounded-xl transition-colors duration-150 ease-in-out hover:border-mainblue ${(isSelected === 'Family') ? 'bg-mainblue text-white' : 'bg-white text-black'}`}
                onClick={() => handleClick('Family')}
            >
                Family
            </button>
            <button
                className={`px-5 py-1 mx-1 my-1 drop-shadow border-2 border-transparent text-left rounded-xl transition-colors duration-150 ease-in-out hover:border-mainblue ${(isSelected === 'Couple') ? 'bg-mainblue text-white' : 'bg-white text-black'}`}
                onClick={() => handleClick('Couple')}
            >
                Couple
            </button>
        </div>

    );
}