import React, { useState, useEffect } from 'react';

export default function APITest(props) {

    const [backendData, setBackendData] = useState({})

    var bodyData = {
        message: `You are an expert trip planner and a programmer for Javascript. You will carefully plan the trip from the given input from the user including the travel times, means of transportation, and what activity to do at that location.
        the input from the user will include destination, people count, relationship, duration, date range, budget, interest, and food preference. But when you give the output, since you're a programmer. You till write in the form of program for next person to link with their front end.
        
        (Example Input)
        
        input -> destination: Tokyo, Japan
        people count: 2
        relationship: couple
        duration: 3 days
        date range: 05/07/2023 - 07/07/2023
        budget: 20,000 - 40,000 ฿
        
        you must first generate the information in this form:
        
        (Example)
        [
        Day 1
        
        9 AM
        Meiji Shrine : Explore the largest Shinto shrine in Tokyo
        .
        .
        Walk 10-15 Minutes
        .
        .
        12 PM
        Tsukiji Fish Market : Try fresh sushi and seafood
        .
        .
        Walk 5-10 Minutes to Tsukiji Station
        .
        .
        Hibiya Line Subway 10-15 minutes to Ueno Station
        .
        .
        2 PM
        Sensoji Temple : Explore the oldest temple in Tokyo
        .
        .
        Walk 5-10 minutes to Asakusa Station
        .
        .
        Tobu Skytree Line 5 minutes to Tokyo Skytree Station
        .
        .
        5 PM
        Tokyo Skytree : Enjoy the view of Tokyo from the tallest tower in the world
        .
        .
        Ginza Line 15-20 minutes to Hiroo Station
        .
        .
        Walk 10-15 minutes
        .
        .
        7 PM 
        Gonpachi Nishiazabu : Try traditional Japanese cuisine in a stylish setting
        .
        .
        Walk 10-15 minutes to Roppongi Station
        .
        .
        Oedo Line 10-15 minutes to Shinjuku Station
        .
        .
        Walk 5-10 Minutes
        .
        .
        9 PM
        Golden Gai : Explore the narrow alleys and small bars in this unique area
        
        Day 2..... [iterative until filled the number of day from input]
        Before output the data must be turn into the form of javascript by
    {"day" = "number of day", "name" : "$place name", "description" : "$short detail", "travel_to" : "how to travel from the previous  place} 
    (Example for Output):  Trip = [
     "day" : "Day 1"
     "time" : "7 PM"
     "name" : "Gonpachi Nishiazabu"
     "description" : "Try traditional Japanese cuisine in a stylish setting"
     "travel_to" : ["Ginza Line 15-20 minutes to Hiroo Station", "Walk 10-15  minutes"]
        }, {}
        ]
    --------------------------
    Input -> destination: Chiangmai, Thailand
    people count:1
    relationship: solo
    duration: 2 days
    date range: 05/07/2023 - 06/07/2023
    budget: 10,000 - 15,000 ฿`,
        currentModel: "text-davinci-003",
        temperature: 0.5
    }

    useEffect(() => {
        fetch("http://localhost:3000/", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            mode: 'cors',
            body: JSON.stringify(bodyData)
        }).then(
            response => response.json()
        ).then(
            data => {
                setBackendData(data)
                console.log(data)
            }
        )
    }, [])

    return (
        <div>
            <p>Hello</p>
            <p>{JSON.stringify(backendData)}</p>
        </div>
    );
}