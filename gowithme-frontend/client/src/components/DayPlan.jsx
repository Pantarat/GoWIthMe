import React, { useState, useEffect } from 'react';
import Destination from './Destination.jsx';
import TravelTo from './TravelTo.jsx';

export default function DayPlan(props) {
    const [isOpen, setOpen] = useState(false);

    const handleClick = () => {
        props.setActiveDay(props.dayNum);
        setTimeout(() => {
            setOpen(!isOpen);
          }, 300);
    };

    useEffect(() => {
        if (props.dayNum !== props.activeDay) setOpen(false);
    }, [props.activeDay])

    return (
        <div className="pb-4 text-left flex flex-col">
            <button
                className={`px-5 py-1 drop-shadow border-2 border-transparent text-left rounded-xl transition-colors duration-300 ease-in-out hover:border-mainblue ${isOpen ? 'bg-mainblue text-white' : 'bg-white text-black'}`}
                onClick={handleClick}
            >
                {props.dayNum}
            </button>
            <div
                className={`overflow-hidden transition-max-height duration-500 ease-in-out`} style={{ maxHeight: isOpen ? '10000px' : '0' }}
            >
                {props.detail.map((des, index) => {
                    let travel = (des.means_of_travel === "Walk" ? "" : "Take ") + des.means_of_travel + " for " + des.travel_time;
                    let travels = null;
                    if (des.means_of_travel === "N/A") {
                        if (des.travel_to === "N/A") {
                            travels = (
                                <div className="mb-5"></div>
                            );
                        } else {
                            travels = (
                                <div className="relative top-0 ml-[60px] w-20 h-6 bg-transparent border-dashed border-mainblue border-l-2"></div>
                            );
                        }
                    } else {
                        travels = (
                            <React.Fragment key={index}>
                                <div className="relative top-0 ml-[60px] w-20 h-6 bg-transparent border-dashed border-mainblue border-l-2"></div>
                                <TravelTo key={index} travel={travel} />
                            </React.Fragment>
                        );
                    }

                    return (
                        <React.Fragment key={index}>
                            <div className="relative top-0 ml-[60px] w-20 h-6 bg-transparent border-dashed border-mainblue border-l-2"></div>
                            <Destination key={des} time={des.time} name={des.name} description={des.description} />
                            {travels}
                        </React.Fragment>
                    );
                })}
            </div>
        </div>
    );
}
