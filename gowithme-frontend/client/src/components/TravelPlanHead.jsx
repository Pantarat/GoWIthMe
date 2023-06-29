
export default function TravelPlanHead(props) {

    return (
        <div className="py-10 text-left">
            <h1 className="mb-3 text-3xl font-bold">{props.place}</h1>
            <div className="flex items-end mb-3">
                <img src="./src/assets/calendarIcon.png" className="mr-2"/>
                <p>{props.duration} day{props.duration>1 ? "s" : ""}</p>
            </div>
            <div className="flex items-end mb-3">
                <img src="./src/assets/userIcon.png" className="mr-2"/>
                <p>{props.numberofPeople} {props.numberofPeople>1 ? "People" : "Person"} ({props.peopleRelation})</p>
            </div>
            <div className="flex items-end mb-3">
                <img src="./src/assets/moneyIcon.png" className="mr-2"/>
                <p>{props.budget}</p>
            </div>
        </div>

    )
}


