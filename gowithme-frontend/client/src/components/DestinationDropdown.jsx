import React, { useState, useEffect, useRef } from "react";

export default function DestinationDropdown(props) {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const dropdownRef = useRef(null);

    const toggleMenu = () => {
        if (isOpen) setIsOpen(false);
        else setIsOpen(true);
        setIsFocused(false);
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

    useEffect(() => {
        handleOptionSelect(selected);
    }, [selected])

    return (
        <div className="relative inline-block" ref={dropdownRef}>
            <input
                ref={dropdownRef}
                className={`w-96 px-4 py-2 border border-solid shadow outline-none text-gray-400 rounded-l text-left`}
                value={selected}
                onChange={(e) => setSelected(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder={isFocused ? "" : "Enter your destination..."}
            />
            <button
                className="absolute right-0 top-0 w-12 h-full bg-white text-gray-500 rounded-r flex items-center justify-center border border-solid"
                onClick={toggleMenu}
            >
                <img className="w-4 h-2" src="./src/assets/Chevron.png" alt="Dropdown Icon" />
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
