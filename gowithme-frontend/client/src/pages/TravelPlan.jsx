import TravelPlanHead from '../components/TravelPlanHead.jsx';
import DayPlan from '../components/DayPlan.jsx';
import ChangePlan from '../components/ChangePlan.jsx';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import LoadingSpinner from '../components/LoadingSpinner.jsx';

export default function TravelPlan(props) {

    const [trip, setTrip] = useState([])
    const [activeDay, setActiveDay] = useState("Day 1");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [mapReady, setMapReady] = useState(false);
    const [map, setMap] = useState(<div></div>);
    const [regionCode, setRegionCode] = useState("");

    let day = {};
    let origin = "";
    let waypoints = [];
    let destination = "";
    let mapString = "";
    let town = props.styles.destination.split(",")[0];

    const body = {
        message: `You are an expert trip planner and Javascript programmer. You will carefully plan the trip from the given input from the user including the travel times, means of transportation, and what activity to do at that location.
        the input from the user will include destination, people count, relationship, duration, date range, budget, interest, and food preference.
For food preference variables, there will be a special scale for each one.

Including but not limited to:

food_meat -> with 0 being Vegan and 100 being a Meat-lover
food_spice -> with 0 being not spicy and and 100 being spicy
food_region -> with 0 being Local and 100 being international

The middle of these variables will be the balance between the two extremes. Such as food_spice = 50 means the food would have a bit of spice or there are meals that are spicy and meals that are don't, mixed in the trip.

Make sure the output is in JSON format.
        (Example Input)
        
        input -> destination: Tokyo, Japan
        people count: 2
        relationship: couple
        duration: 3 days
        budget: 20,000 - 40,000 ฿
        interests: Shopping, Culture, Historical
        food_meat: 50
        food_spice: 80
        food_region: 0
        
        You "must" generate the output in this format, you must make sure every destination is unique and not repeated in each trip. Do Not copy the destinations from the example. Also generate 2 letter country code for the input destination :
        
    "$country_code" {"day" = "number of day", "itinerary": ["time" : "$time", "name" : "$place name", "description" : "$short detail" ,"travel_to" : "next place to go to", "means_of_travel" : "The recommended means of transport" ,"travel_time" : "time it takes to travel to the next destination using the recommended means of transport"]} 
        (Example for Output): "JP" Trip = [
            {
                "day" : "Day 1",
                "itinerary" : [
                    {
                        "time" : "9 AM",
                        "name" : "Meiji Shrine",
                        "description" : "Explore the largest Shinto shrine in Tokyo",
                        "travel_to" : "Tsukiji Fish Market",
                        "means_of_travel" : "Walk",
                        "travel_time" : "10-15  minutes"
                        
                    }
    
                    {
                    "day" : "Day 2",
            
                        ... (continue until the last day from the input)
    
            }
    
                ]
            }
        ]
        Important note: If the value is blank, you put in "N/A"
        
    --------------------------
    Input -> destination: ${props.styles.destination}
    people count: ${props.styles.people_count}
    relationship: ${props.styles.relationship}
    duration: ${props.styles.duration}
    budget: ${props.styles.budget}
    interests: ${props.styles.interests}
    food_meat: ${props.styles.food_meat}
    food_spice: ${props.styles.food_spice}
    food_region: ${props.styles.food_region}`,
        currentModel: "text-davinci-003",
        temperature: 0.5
    }

    let navigate = useNavigate();

    const handleBack = () => {
        let path = `/`;
        navigate(path);
    }

    useEffect(() => {
        fetch("http://localhost:80/", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            mode: 'cors',
            body: JSON.stringify(body)
        }).then(
            response => response.json()
        ).then(
            data => {
                let trip = data.message;
                let trimmed = trip.substring(trip.indexOf('['));
                setRegionCode(trip.substring(trip.indexOf('"')).slice(1,3));
                console.log(regionCode);
                console.log(trimmed);
                setTrip(JSON.parse(trimmed));
                setLoading(false); // Data is loaded, set loading to false
            }
        ).catch(err => {
            console.error(err);
            setError(true); // Set error to true if there's an error
            setLoading(false); // Set loading to false
        })

    }, []);

    useEffect(() => {
        day = trip[parseInt(activeDay.substring(3)) - 1];
        console.log(day);
        if(!loading) try {
            origin = day.itinerary.slice(0, 1)[0].name;
            destination = day.itinerary.slice(day.itinerary.length - 1)[0].name;
            waypoints = day.itinerary.slice(1, -1);

            origin = origin.replace(/[ &]/g, "+");
            destination = destination.replace(/[ &]/g, "+");
            waypoints = 

            mapString = "";
            mapString = mapString + "&origin=" + origin + "," + town;
            if (waypoints.length > 0) mapString = mapString + "&waypoints=" + waypoints.join(`,${town}|`);
            mapString = mapString + "&destination=" + destination + "," + town;
            mapString = mapString + "&region=" + regionCode;
            console.log(mapString);
            setMap(<iframe
                width="600"
                height="600"
                style={{ border: 0, borderRadius: "15px", marginRight: "20px" }}
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps/embed/v1/directions?key=AIzaSyDekSo2PTpwTY-hMWTsciLi6aGKIDsN_4o${mapString}&avoid=tolls|highways`}
                allowFullScreen>
            </iframe>);
            setMapReady(true);
        }
        catch (err) {
            console.error(err);
        }

    }, [trip, activeDay]);



    if (error) {
        return (
            <div>
                <div className="text-left">
                    <button className="inline-block" onClick={handleBack}>
                        <img src="./src/assets/Home.png" alt="Home" />
                    </button>
                </div>
                <div>
                    There has been an error, please press the home button and try again.
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div>
                <div className="text-left">
                    <button className="inline-block" onClick={handleBack}>
                        <img src="./src/assets/Home.png" alt="Home" />
                    </button>
                </div>
                <div>
                    <p>Loading...</p>
                    <LoadingSpinner />
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="text-left">
                <button className="inline-block" onClick={handleBack}>
                    <img src="./src/assets/Home.png" />
                </button>
            </div>
            <div>
                {trip.length > 0 ? (
                    <div>
                        <div className="flex">
                            <div className="flex-grow min-w-[935px]">
                                <TravelPlanHead
                                    place={props.styles.destination}
                                    duration={props.styles.duration}
                                    numberofPeople={props.styles.people_count}
                                    peopleRelation={props.styles.relationship}
                                    budget={props.styles.budget}
                                />
                            </div>
                            <ChangePlan />
                        </div>
                        <div className="flex">
                            <div className="flex-grow min-w-[500px] mr-[50px]">
                                {trip.map((day, index) => (
                                    <DayPlan key={index} dayNum={day.day} detail={day.itinerary} activeDay={activeDay} setActiveDay={setActiveDay} />
                                ))}
                            </div>
                            <div className="flex-shrink-0" style={{ width: '500px' }}>
                                {mapReady && (map)}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div>
                        <p>Loading...</p>
                        <LoadingSpinner />
                    </div>
                )}
            </div>
        </div>
    );
}


