import React, { useState, useEffect, useRef } from "react";

export default function DestinationDropdown(props) {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState("Enter your destination...");
    const dropdownRef = useRef(null);

    const toggleMenu = () => {
        if (isOpen) setIsOpen(false);
        else setIsOpen(true);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    const handleOptionSelect = (option) => {
        setSelected(option);
        props.setStyles({
            ...props.styles,
            destination: option
        });
        setIsOpen(false);
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative inline-block" ref={dropdownRef}>
            <button ref={dropdownRef}
                className="w-96 px-4 py-2 border-solid shadow text-gray-400 rounded-l text-left"
                onClick={toggleMenu}
            >
                {selected}
                <img className="absolute right-5 top-5" src="./src/assets/Chevron.png" />
            </button>
            <div
                ref={dropdownRef}
                className={`absolute z-50 mt-2 bg-white text-gray-700 drop-shadow rounded-l overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "opacity-100 h-auto" : "opacity-0 h-0"
                    }`}
                style={{
                    transform: isOpen ? "translateY(0)" : "translateY(-30%)",
                }}
            >
                <ul>
                    <li
                        className="w-96 px-4 py-2 hover:bg-gray-200"
                        onClick={() => handleOptionSelect("Bangkok, Thailand")}
                    >
                        Bangkok, Thailand
                    </li>
                    <li
                        className="w-96 px-4 py-2 hover:bg-gray-200"
                        onClick={() => handleOptionSelect("Tokyo, Japan")}
                    >
                        Tokyo, Japan
                    </li>
                    <li
                        className="w-96 px-4 py-2 hover:bg-gray-200"
                        onClick={() => handleOptionSelect("Seoul, South Korea")}
                    >
                        Seoul, South Korea
                    </li>
                </ul>
            </div>
        </div>
    );
}
