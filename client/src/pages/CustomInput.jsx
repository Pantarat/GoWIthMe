import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import ButtonInterest from '../components/ButtonInterest';
import RelationshipButtons from '../components/RelationshipButtons';
import IncrementDecrementButtons from '../components/IncrementDecrementButtons';
import BudgetDropdown from '../components/BudgetDropdown';
import CuiSineSlider from '../components/CuisineSlider';
import DestinationDropdown from '../components/DestinationDropdown';

export default function CustomInput(props) {

    const [adults, setAdults] = useState(0);
    const [children, setChildren] = useState(0);
    const [duration, setDuration] = useState(0);
    const [interests, setInterests] = useState({
        'Shopping': false,
        'Museum': false,
        'Fashion': false,
        'Adventure': false,
        'Architecture': false,
        'Culture': false,
        'Night-Life': false,
        'Nature': false,
        'Sport': false,
        'Art': false,
        'Cuisine': false,
        'History': false,
        'Cafe': false
    })

    let navigate = useNavigate();

    const handleNext = () => {
        let path = `/results`; 
        navigate(path);
        console.log(props.styles)
    }

    const handlePeopleCount = () => {
        let people_count = adults + children;
        let updatedStyle = {
            ...props.styles,
            people_count: people_count
        }
        props.setStyles(updatedStyle)
    }

    const handleDuration = () => {
        let updatedStyle = {
            ...props.styles,
            duration: duration
        }
        props.setStyles(updatedStyle)
    }

    useEffect(() => {
        handlePeopleCount();
    }, [adults,children])

    useEffect(() => {
        handleDuration();
    }, [duration])

    return (
        <div className="text-left">
            <h1 className="text-center text-mainblue font-bold text-4xl mb-5">Choose Your Style</h1>

            <div className="mb-10">
                <h2 className="font-bold text-2xl mb-3 text-left">Destination</h2>
                <DestinationDropdown styles={props.styles} setStyles={props.setStyles} />
            </div>

            <div className="mb-10">
                <span className="font-bold mb-5 mr-5 text-2xl text-left">Adults</span>
                <IncrementDecrementButtons setNum={setAdults}/>
                <span className="font-bold mb-5 mr-5 ml-5 text-2xl text-left">Children</span>
                <IncrementDecrementButtons setNum={setChildren} />
                <RelationshipButtons styles={props.styles} setStyles={props.setStyles} />
                
            </div>

            <div className="mb-10">
                <span className="font-bold mb-5 mr-5 text-2xl text-left">Durations</span>
                <IncrementDecrementButtons setNum={setDuration} />
            </div>

            <div className="mb-10">
                <h2 className="mb-3 font-bold text-2xl text-left">Budget</h2>
                <BudgetDropdown styles={props.styles} setStyles={props.setStyles} />
            </div>

            <div className="mb-10">
                <h2 className="font-bold text-2xl mb-5 text-left">Interests</h2>
                {Object.keys(interests).map(key => (
                    <ButtonInterest name={key} key={key} />
                ))}
            </div>

            <div className="mb-10">
                <h2 className="font-bold text-2xl text-left">Cuisine</h2>
                <CuiSineSlider min="Vegan" max="Meat-Lover" />
                <CuiSineSlider min="Non-Spicy" max="Spicy" />
                <CuiSineSlider min="Local" max="International" />
            </div>

            <div className="mb-10">
                <h2 className="font-bold text-2xl mb-5 text-left">Transportation</h2>
                <ButtonInterest name="Public" />
                <ButtonInterest name="Private" />
                <ButtonInterest name="Walking" />
            </div>

            <div className="text-center">
                <button className={`px-5 py-1 mx-1 my-1 bg-yellow-400 font-bold text-white text-xl drop-shadow border-2 border-transparent text-left rounded-xl transition-colors duration-150 ease-in-out hover:border-gray-300`}
                    onClick={handleNext}>Next
                </button>
            </div>

        </div>
    );
}